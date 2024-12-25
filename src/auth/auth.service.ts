import { Injectable, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { LoginDto } from "./dto/login-dto";
import { UserService } from "src/user/user.service";
import { JwtService } from "@nestjs/jwt";
@Injectable()
export class AuthService {
constructor(private userService: UserService,private jwtService: JwtService) {}

        async login(loginDTO: LoginDto): Promise<{ accessToken: string }>  {
        const user = await this.userService.getByUniqueId(loginDTO.uniqueId); 
        const passwordMatched = await bcrypt.compare(loginDTO.password,user.password);
        if (passwordMatched) 
        {
            delete user.password;
            const response = {uniqueId : user.uniqueId, id: user.id};
            return {
                accessToken: this.jwtService.sign(response)
            };
        } 
        else 
        {
            throw new UnauthorizedException("Password does not match"); 
        }

    }

    async validateUser(payload: any) {
        return await this.userService.getByUniqueId(payload.uniqueId);
    }
}