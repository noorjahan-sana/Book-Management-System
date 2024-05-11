import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


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


}

export const BasicUserSchema = SchemaFactory.createForClass(BasicUser);