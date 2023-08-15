import {IsEmail, IsNotEmpty, IsString} from "class-validator";

export class AddUserRequestDto {
  @IsNotEmpty()
  @IsString()
  registrationNumber?: string

  @IsNotEmpty()
  @IsString()
  firstName?: string;

  @IsNotEmpty()
  @IsString()
  lastName?: string;

  @IsNotEmpty()
  @IsString()
  mobileNumber?: string

  @IsNotEmpty()
  @IsString()
  userName?: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email?: string;
}