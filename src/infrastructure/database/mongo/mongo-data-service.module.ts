import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {MongoDataServices} from "src/infrastructure/database/mongo/mongo-data-service.service";
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
  ],
  providers: [MongoDataServices],
  exports: [MongoDataServices],
})

export class MongoDataServiceModule {}