import { Resolver, Args, Query, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthenticationError } from 'apollo-server-core';
import { UserEntity } from '../users/entity/user';
import { LoginResult, LoginUserInput } from 'src/graphql.classes';

@Resolver('Auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query('login')
  async login(@Args('user') user: LoginUserInput): Promise<LoginResult> {
    try {
      const result = await this.authService.validateUserByPassword(user);

      if (result) return result;
      throw new AuthenticationError(
        'Could not log-in with the provided credentials',
      );
    } catch (err) {
      throw err;
    }
  }

  // There is no username guard here because if the person has the token, they can be any user
  @Query('refreshToken')
  // @UseGuards(JwtAuthGuard)
  async refreshToken(@Context('req') request: any): Promise<string> {
    const user: UserEntity = request.user;
    if (!user)
      throw new AuthenticationError(
        'Could not log-in with the provided credentials',
      );
    const result = await this.authService.createJwt(user);
    if (result) return result.token;
    throw new AuthenticationError(
      'Could not log-in with the provided credentials',
    );
  }
}
