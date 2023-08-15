import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {MongoDataServices} from "src/infrastructure/database/mongo/mongo-data-service.service";
import {UserModel, UserModelSchema} from "./models";
@Module({
  imports: [
    MongooseModule.forRootAsync({
      connectionName: 'exchange',
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        return {
          uri: config.get('MONGO_CONNECTION_URI'),
          useNewUrlParser: true,
          useUnifiedTopology: true,
        };
      },
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      {
        name: UserModel.name,
        schema: UserModelSchema,
      }
    ],
      'exchange',
    )
  ],
  providers: [MongoDataServices],
  exports: [MongoDataServices],
})

export class MongoDataServiceModule {}