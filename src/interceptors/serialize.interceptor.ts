import{
    UseInterceptors,
    NestInterceptor,
    ExecutionContext,
    CallHandler
}from '@nestjs/common'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
// import { UserDto } from '../users/dtos/user.dto';


//使用该接口，则调用的时候必须是类传入，因此如果只是输入数字、文本则会报错
interface ClassConstructor{
    new (...args: any[]):{}
}

//导出为装饰器，为了更简单地引用，而不用写冗长的创建对象
export function Serialize(dto: ClassConstructor){
    return UseInterceptors(new SerializerInterceptor(dto));
}

export class SerializerInterceptor implements NestInterceptor{
    constructor(private dto: any){}
   
    intercept(context: ExecutionContext, handler: CallHandler): Observable<any>  {
        //返回请求前
        // console.log('Im running before the handler', context);

        return handler.handle().pipe(
            map((data:any) =>{
                //返回请求后
                // console.log('Im running before response is sent out', data);
                return plainToClass(this.dto,data,{
                    //排除无关值，因此需要 Expose 或 Exclude 装饰器的才有可能输出
                    excludeExtraneousValues: true,
                })
            }),
        )
    }
}