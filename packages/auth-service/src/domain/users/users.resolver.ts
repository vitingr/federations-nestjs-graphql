// import { Query } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UsersService) {}

  // @Query('users')
  // async users() {
  //   return await this.userService.getAllUsers();
  // }

  // @Mutation('createUser')
  // async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {}
}
