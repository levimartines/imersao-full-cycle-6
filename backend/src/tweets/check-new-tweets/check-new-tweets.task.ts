import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { Interval } from "@nestjs/schedule";
import { TweetsService } from "../tweets.service";
import { Cache } from "cache-manager";
import { Queue } from "bull";
import { InjectQueue } from "@nestjs/bull";

@Injectable()
export class CheckNewTweetsTask {

  private limit = 10;

  constructor(
    private tweetsService: TweetsService,
    @Inject(CACHE_MANAGER) private cache: Cache,
    @InjectQueue("emails") private emailsQueue: Queue) {
  }

  @Interval(5000)
  async handle() {
    console.log("Looking for tweets");
    let offset = await this.cache.get<number>("tweet-offset");
    offset = offset === null || offset === undefined ? 0 : offset;
    console.log("Offset: " + offset);

    const tweets = await this.tweetsService.findAll({ offset, limit: this.limit });
    console.log(`Tweets count: ${tweets.length}`);

    if (tweets.length === this.limit) {
      console.log("More tweets were found!");
      await this.cache.set("tweet-offset", offset + this.limit, {
        ttl: 60 * 10
      });

      this.emailsQueue.add({});
    }

  }
}
