import { Injectable, Query, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';


@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>){}
    create(email:string, password:string){
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

    async update(id: number, attrs: Partial<User>){
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