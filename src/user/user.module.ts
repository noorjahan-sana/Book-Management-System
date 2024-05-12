import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BasicUser, BasicUserSchema } from './schemas/Basic-User.schema';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: BasicUser.name, schema: BasicUserSchema}])
  ],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}
