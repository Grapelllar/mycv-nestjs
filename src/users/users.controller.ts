import { Body, Controller, Post, Get, Patch, Param, Query, Delete, NotFoundException, UseInterceptors, ClassSerializerInterceptor，Session } from '@nestjs/common';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
// import { SerializerInterceptor } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';



@Controller('auth')
@Serialize(UserDto)
export class UsersController {
    constructor(
        private usersService: UsersService,
        private authService: AuthService
    ) { }
    static id;
    @Post('/signup')
    createUser(@Body() body: CreateUserDto) {
        // console.log(body);
        //原来没有加密的方法
        // this.usersService.create(body.email, body.password);
        
        //哈希加密密码创建用户
        return this.authService.signup(body.email, body.password)
    
    }

    @Post('/signin')
    signin(@Body() body: CreateUserDto){
        return this.authService.signin(body.email,body.password)
    }


    // @UseInterceptors(new SerializerInterceptor(UserDto))
    // @UseInterceptors(new SerializerInterceptor(UserDto))
    @Get('/:id')
    async findUser(@Param('id') id: string) {
        console.log('handler is running');
        const user = await this.usersService.findOne(parseInt(id));
        if (!user) {
            throw new NotFoundException('user not found');
        }
        return user;
    }


    @Get()
    findAllUsers(@Query('email') email: string) {
        // console.log(email)
        return this.usersService.find(email);
    }

    @Delete('/:id')
    removeUser(@Param('id') id: string) {
        return this.usersService.remove(parseInt(id));
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.usersService.update(parseInt(id), body);

    }
}
