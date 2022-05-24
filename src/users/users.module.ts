import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
// import { Report } from 'src/reports/report.entity';
import { ReportsModule } from 'src/reports/reports.module';
import { AuthService } from './auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    // UsersModule,
    ReportsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthService]
})
export class UsersModule {}
// TypeOrmModule.forFeature([Report])