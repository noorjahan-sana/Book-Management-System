import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { book } from './schemas/book.schema';

@Injectable()
export class BooksService {
  logger: any;

  constructor(private  configService: ConfigService, @InjectModel(book.name) private bookModel: Model<book>){

  }

 async create(CreateBookDto: CreateBookDto):Promise<book> {
    const createdBook =  new this.bookModel(CreateBookDto);
    return await createdBook.save();
  }

  findAll() {
    return this.bookModel.find().exec();
  }

  async findById(id: string) {
    try {
      const book = await this.bookModel.findById(id);
      if(!book){
        throw new NotFoundException(`Feature not found with ID ${id}`);

      }

      return book;

    } catch (error) {
      this.logger.error(error);
      this.logger.error(`An error occurred in fetching feature by Id ${id}. ${error?.message}`);
      // throw new UnprocessableEntityException(`May be invalid id format ${id}`);
      throw error;

    }
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    const updated = await this.bookModel.findByIdAndUpdate(id, updateBookDto);
    return await this.findById(id);
  }

  remove(id: string) {
    return this.bookModel.findByIdAndDelete(id);
  }
}
