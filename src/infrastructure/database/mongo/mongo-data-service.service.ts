import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import {InjectConnection} from '@nestjs/mongoose';
import {Connection} from 'mongoose';

@Injectable()
export class MongoDataServices
  implements OnApplicationBootstrap
{
  connection: Connection;

  constructor(
    @InjectConnection('exchange')
    private _conn: Connection,
  ) {}

  onApplicationBootstrap() {
    this.connection = this._conn;
  }
}
