import { Get, Post, Body, Put, Delete, Param, UseGuards, Controller, UsePipes } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ValidationPipe } from '@control/common/pipes/validation.pipe';
import { UserService } from '@control/api/services/user.service';
import { UserModel } from '@control/api/models/user.model';
import { UserSettingDto } from '@control/api/dto/user-settings.dto';
import { UserStarredDto } from '@control/api/dto/user-starred.dto';
import { UserFrequentDto } from '@control/api/dto/user-frequent.dto';

@Controller('user')
export class UserController {
    constructor(public readonly service: UserService) {}

    @Put('settings')
    @UsePipes(new ValidationPipe())
    async settings(@Body() user: UserSettingDto): Promise<any> {
        return this.service.saveSettings(user);
        // return user;
    }

    @Put('starred')
    @UsePipes(new ValidationPipe())
    async starred(@Body() user: UserStarredDto): Promise<UserModel> {
        return this.service.saveStarred(user);
    }

    @Put('frequent')
    @UsePipes(new ValidationPipe())
    async frequent(@Body() user: UserFrequentDto): Promise<UserModel> {
        return this.service.saveFrequent(user);
    }
}
