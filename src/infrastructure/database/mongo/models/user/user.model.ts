import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = UserModel & Document;

@Schema({
  collection: 'user',
  _id: true,
  versionKey: false,
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'lastModified',
  },
  toJSON: {
    transform(_doc, ret) {
      delete ret._id;
      delete ret.__v;
      delete ret.createdAt;
      delete ret.lastModified;
      return ret;
    },
  },
})
export class UserModel {
  @Prop()
  registrationNumber?: string

  @Prop()
  firstName?: string;

  @Prop()
  lastName?: string;

  @Prop()
  mobileNumber?: string

  @Prop()
  userName?: string;

  @Prop()
  email?: string;
}
export const UserModelSchema = SchemaFactory.createForClass(
  UserModel,
);

UserModelSchema.index({ mobileNumber: 1 }, { unique: true });
UserModelSchema.index({ registrationNumber: 1 }, { unique: true });
UserModelSchema.index({ userName: 1 }, { unique: true });
UserModelSchema.index(
  { mobileNumber: 1, registrationNumber: 1, userName: 1 },
  { unique: true }
);
