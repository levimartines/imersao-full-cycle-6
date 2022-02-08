import { Job } from "bull";
import { Process, Processor } from "@nestjs/bull";
import { MailListService } from "./mail-list.service";


@Processor("emails")
export class SendMailTweetsJob {

  constructor(private mailListService: MailListService) {
  }


  @Process()
  async handle(job: Job) {
    const mailList = this.mailListService.findOne();
    console.log("Mail List: ", mailList);
    console.log("Connect to Kafka to send the message");
  }
}
