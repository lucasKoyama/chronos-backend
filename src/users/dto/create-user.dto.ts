import { IsString, MaxLength, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  id: string;

  @IsString()
  username: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  passwordHash: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @MaxLength(40, { each: true })
  tags: string[];
}
