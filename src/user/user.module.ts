import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BasicUser, BasicUserSchema } from './schemas/Basic-User.schema';
import { JwtModule } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Module({
  imports: [
    ConfigModule,
    JwtModule,
    // MongooseModule.forFeature([{ name: BasicUser.name, schema: BasicUserSchema}])
    MongooseModule.forFeatureAsync([
      {
        name: BasicUser.name,
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => {
          const schema = BasicUserSchema;
          schema.pre('save', async function (next:any) {
            try {
              if (!this.isModified('password')) {
                return next();
              }
              // tslint:disable-next-line:no-string-literal
              const hashed = await bcrypt.hash(this['password'], 10);
              // tslint:disable-next-line:no-string-literal
              this['password'] = hashed;
              return next();
            } catch (err) {
              return next(err);
            }
        });
          return schema;
        },
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}
