import { Module } from '@nestjs/common';

//导入 TypeOrm 模块
import { TypeOrmModule} from '@nestjs/typeorm'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/user.entity';
import { UsersService } from './users/users.service';
import { Report } from './reports/report.entity';

@Module({
  //导入sqlite
  imports: [TypeOrmModule.forRoot({
    //sql类型
    type: 'sqlite',
    //sql名称
    database: 'db.sqlite',
    entities: [User,Report],
    //同步,省去了当数据库增删一列的时候，或者修改属性类型时候，需要编写迁移数据库的代码来生成新的数据库。
    //但仅用于开发环境，在生产环境可能误删了一列有用的
    synchronize: true,
  }),
    UsersModule, 
    ReportsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
