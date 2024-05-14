import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from 'src/auth/enums/role.enum';


export type BasicUserDocument = HydratedDocument<BasicUser>;


@Schema({
    timestamps: true
})
export class BasicUser {

  @Prop({
    required:true,
    unique:true,

  })
  email: string;


  @Prop({
    required:false,
  })
  fullName?: string;

  @Prop({
    required:false,
  })
  isVerified: boolean;

  @Prop({
    required:true,
  })
  password: string;

  @Prop({
    required:false,
    default: [Role.User]
  })
  roles: Role[];

}

export const BasicUserSchema = SchemaFactory.createForClass(BasicUser);