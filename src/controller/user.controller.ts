import {Body, Controller, Post} from "@nestjs/common";
import {ApiTags} from "@nestjs/swagger";
import {AddUserRequestDto} from "src/core";
import {UserService} from "src/service";

@Controller('user')
@ApiTags('user')
export class UserController {

  constructor(
    private userService: UserService
  ) {
  }

  @Post('add')
  async addUser(
    @Body() addUserRequestDto: AddUserRequestDto,
  ) {
    const addUserResponse = await this.userService.addUser(addUserRequestDto);
    return addUserResponse;
  }
}