import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { book, bookSchema } from './schemas/book.schema';

@Module({
 
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: book.name, schema: bookSchema }])
  ],
  controllers: [BooksController],
  providers: [BooksService],
  
})
export class BooksModule {}
