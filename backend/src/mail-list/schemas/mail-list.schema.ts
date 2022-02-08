import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";

export type MailListDocument = MailList & Document

@Schema()
export class MailList {

  @Prop({ type: MongooseSchema.Types.ObjectId })
  id: string;

  @Prop({ type: [String] })
  emails: string[];
}


export const MailListSchema = SchemaFactory.createForClass(MailList);
