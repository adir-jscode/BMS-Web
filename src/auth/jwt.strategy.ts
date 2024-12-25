import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "./auth.service";
import { authConstants } from "./auth.constants";
@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) 
    {
        super
        (
            {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: authConstants.secret
        }
    );
    }
    
    async validate(payload: any) 
    {
        return this.authService.validateUser(payload);
    }
}
