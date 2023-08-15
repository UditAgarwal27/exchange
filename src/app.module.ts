import {Module} from "@nestjs/common";
import { ConfigModule } from '@nestjs/config';
import {join} from "path";
import {DatabaseModule} from "src/infrastructure";
@Module({
  imports: [
    ConfigModule.forRoot(
    process.env.NODE_ENV === 'local' ? {
        envFilePath: join(__dirname, `../${process.env.NODE_ENV}.env`),
      } : {},
    ),
    DatabaseModule,
  ],
  providers: [],
  exports: []
})
export class AppModule {}