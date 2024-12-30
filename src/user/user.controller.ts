import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-guard';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
    constructor(private userService : UserService) {}

    @Get()
    async getAll() {
        return await this.userService.getAll();
    }

    @Get('profile/:uniqueId')
    async getProfile(@Param('uniqueId') uniqueId: string) {
        return await this.userService.getProfile(uniqueId);
    }
}
