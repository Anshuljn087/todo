import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async createUser(email: string, password: string) {
    const user = new this.userModel({ email, password });
    return user.save();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new this.userModel(createUserDto);
    return user.save();
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<User | undefined> {
    return this.userModel.findById(id).exec();
  }

  async createWithGoogle(email: string, name: string): Promise<User> {
    // Check if the user already exists
    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser) {
      // If user exists, return the existing user
      return existingUser;
    }

    // If user doesn't exist, create a new user with the provided data
    const createdUser = new this.userModel({
      email,
      name,
      isActive: true, // You can set any default values here
      lastLogin: new Date(),
    });

    // Save the new user
    return createdUser.save();
  }
}
