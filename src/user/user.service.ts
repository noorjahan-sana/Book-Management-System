import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ConfigService } from '@nestjs/config';
import { BasicUser } from './schemas/Basic-User.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {

  private readonly logger = new Logger(UserService.name);

  constructor(private  configService: ConfigService, @InjectModel(BasicUser.name) private basicUserModel: Model<BasicUser>){

  }

  async create(createUserDto: CreateUserDto) {
    const isThere = await this.findUserByEmailExists(createUserDto.email);
    if(isThere){
      throw new BadRequestException(`The user with email "${createUserDto.email}" already exists.`);
    }

    const createdBasicUser = new this.basicUserModel(createUserDto);
    return await createdBasicUser.save();
  }

  async findUserByEmailExists(email:string){
    this.logger.debug(`searching user with email ${email}`);
    const isThere = await this.basicUserModel.findOne({
      email: email
    });
    return Boolean(isThere);
  }



  findAll() {
    return this.basicUserModel.find();
  }

  async findOne(id: string) {
    try {
      const user = await this.basicUserModel.findById(id);
      if(!user){
        throw new NotFoundException(`User not found with ID ${id}`);
      }

      return user;

    } catch (error) {
      this.logger.error(error);
      this.logger.error(`An error occurred in fetching user by Id ${id}. ${error?.message}`);
      throw error;
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.basicUserModel.findById(id);
    if(!user){
      throw new NotFoundException(`Invalid user ID ${id}`);
    }
    this.logger.error(`updated the user ${id}`)
    const updated = await this.basicUserModel.findByIdAndUpdate(id, updateUserDto);
    return await this.basicUserModel.findById(id);
  }

  async remove(id: string) {
    const user = await this.basicUserModel.findById(id);
    if(!user){
      throw new NotFoundException(`Invalid user ID ${id}`);
    }
    return this.basicUserModel.findByIdAndDelete(id);
  }
}
