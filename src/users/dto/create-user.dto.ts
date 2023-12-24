import { IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  id: string;

  @IsString()
  username: string;

  @IsString()
  email: string;

  @IsString()
  passwordHash: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @MaxLength(40, { each: true })
  tags: Set<string>;
}
