import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";

//randomBytes 产生盐值，scrypt 负责哈希,还需要导入promisify库
import { randomBytes,  scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt)

@Injectable()
export class AuthService {
    //注入UserService到容器
    constructor(private usersService: UsersService) { }

    //注册方法
    async signup(email: string, password: string) {
        //1、邮箱是否存在
        const users = await this.usersService.find(email);
        if (users.length) {
            throw new BadRequestException('email in use');
        }

        //2、哈希加密密码
        
        //1) 创建盐值 16字节文本
        const salt = randomBytes(8).toString('hex');

        //2) 将密码和盐值一起哈希
        const hash = (await scrypt(password, salt, 32)) as Buffer;

        //3) 将哈希结果和盐值串在一起
        const result = salt + '.' + hash.toString('hex');

        //3、创建一个新的用户并保存
        const user = await this.usersService.create(email, result);

        //4、返回用户
        return user;

    }

    //登录方法
    async signin (email: string, password: string){
        const [user] = await this.usersService.find(email);
        // console.log([user])
        if(!user){
            throw new NotFoundException('user not found');
        }

        const [salt , storedHash] = user.password.split('.');

        const hash = (await scrypt(password, salt, 32)) as Buffer;

        if(storedHash !== hash.toString('hex')){
            throw new BadRequestException('password error');
        }

        return user;
    }

}