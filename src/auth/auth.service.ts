import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, FormError } from 'src/interfaces/user.interface';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string) {
    const user = await this.userService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { user_id: user._id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(createUserDto: CreateUserDto) {
    // Duplicate user check
    if (await this.userService.findOne(createUserDto.username)) {
      const formError: FormError = {
        field: 'username',
        error_message: 'This username has already taken',
      };
      return formError;
    }

    if (createUserDto.password !== createUserDto.repeat_password) {
      const formError: FormError = {
        field: 'repeat_password',
        error_message: 'Repeat password not match',
      };
      return formError;
    }

    const user = await this.userService.createOne(createUserDto);

    const payload = { user_id: user._id, username: user.username };
    console.log(user);
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
