import {Module} from "@nestjs/common";
import { ConfigModule } from '@nestjs/config';
import {join} from "path";
import {DatabaseModule} from "src/infrastructure";
import {UserModule} from "src/service/user/user.module";
@Module({
  imports: [
    ConfigModule.forRoot(
    process.env.NODE_ENV === 'local' ? {
        envFilePath: join(__dirname, `../${process.env.NODE_ENV}.env`),
      } : {},
    ),
    DatabaseModule,
    UserModule,
  ],
  providers: [],
})
export class AppModule {}