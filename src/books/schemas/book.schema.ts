
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


export type bookDocument = HydratedDocument<book>;

@Schema()
export class book {
  @Prop({
    required:true,
  })
  name: string;

  @Prop({
    required:true,
  })
 author : string

  @Prop({
    required:true,
  })
  price : number
}

export const bookSchema = SchemaFactory.createForClass(book);