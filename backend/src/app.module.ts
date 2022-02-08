import { Module } from "@nestjs/common";
import { TweetsModule } from "./tweets/tweets.module";
import { MongooseModule } from "@nestjs/mongoose";
import { ScheduleModule } from "@nestjs/schedule";
import { MailListModule } from "./mail-list/mail-list.module";
import { BullModule } from "@nestjs/bull";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    // Application Modules
    TweetsModule,
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT)
      }
    }),

    // External Modules
    MongooseModule.forRoot(process.env.MONGO_DSN, {
      useNewUrlParser: true
    }),

    MailListModule
  ]
})
export class AppModule {
}
