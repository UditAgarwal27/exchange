import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import {InjectConnection, InjectModel} from '@nestjs/mongoose';
import {Connection, Model} from 'mongoose';
import {MongoRepository} from "./mongo-repository";
import {UserDocument, UserModel} from "./models";

@Injectable()
export class MongoDataServices
  implements OnApplicationBootstrap
{
  connection: Connection;
  user: MongoRepository<UserDocument>

  constructor(
    @InjectConnection('exchange')
    private _conn: Connection,

    @InjectModel(UserModel.name, 'exchange')
    private _user: Model<UserDocument>
  ) {}

  onApplicationBootstrap() {
    this.connection = this._conn;
    this.user = new MongoRepository<UserDocument>(this._user);
  }
}
