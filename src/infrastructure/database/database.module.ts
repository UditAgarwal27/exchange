import {Module} from "@nestjs/common";
import {MongoDataServiceModule} from "src/infrastructure/database/mongo/mongo-data-service.module";

@Module({
  imports: [MongoDataServiceModule],
  exports: [MongoDataServiceModule],
})

export class DatabaseModule {}