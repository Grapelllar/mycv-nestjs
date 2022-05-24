import { Injectable, Query, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';


@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>){}
    create(email:string, password:string){

        //先创建实例再保存，用于实现hook钩子
        const user = this.repo.create({email, password});

        return this.repo.save(user);
    }

    // findOne(id: any){
    //     console.log("there" + id);
    //     return this.repo.findOne(id);
    // }\
    findOne(id: number){
        console.log(id)
        // return this.repo.findOne(id)
        return this.repo.findOne({where: {id : id}})
    }
    
    find(email: string){
        return this.repo.find({where: {email : email}});
    }

    // update(id: number, newEmail: string, newPassword: string, newAge: number, newName: number){

    // }

    //Partial 只需要实体的部分属性即可，不属于实体的属性会报错
    async update(id: number, attrs: Partial<User>){
        //这种update访问了两次数据库，如果没有钩子函数在实体中需要执行，可以只使用update来进行数据更新
        const user = await this.findOne(id);
        if(!user){
            throw new NotFoundException('user not found');
        }
        Object.assign(user, attrs);
        return this.repo.save(user);
    }

    async remove(id: number){
        const user = await this.findOne(id);
        if(!user){
            throw new NotFoundException('user not found');
        }
        return this.repo.remove(user);
    }
}