import {Module} from "@nestjs/common";
import {UserService} from "./user.service";
import {UserController} from "src/controller";
import {DatabaseModule} from "src/infrastructure/database/database.module";

@Module({
  imports: [DatabaseModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})

export class UserModule {}