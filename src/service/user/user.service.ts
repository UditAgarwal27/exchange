import {BadRequestException, Injectable} from "@nestjs/common";
import {AddUserRequestDto, UserEntity} from "src/core";
import {MongoDataServices} from "src/infrastructure/database/mongo/mongo-data-service.service";

@Injectable()
export class UserService {

  constructor(
    private databaseService: MongoDataServices
  ) {
  }

  async addUser(addUserRequestDto: AddUserRequestDto) {
    const {
      userName,
      mobileNumber,
      registrationNumber,
      email,
      firstName,
      lastName,
    } = addUserRequestDto;

    //CHECK IF USER WITH THESE 3 ALREADY EXIST
    const userAlreadyExist = await this.databaseService.user.findOne({userName, mobileNumber, registrationNumber});
    if (userAlreadyExist) {
      throw new BadRequestException('User Already Exist');
    }
    const newUser: UserEntity = {
      userName,
      mobileNumber,
      registrationNumber,
      email,
      firstName,
      lastName,
    }
    await this.databaseService.user.create(newUser);
    return 'User Successfully Added';
  }
}