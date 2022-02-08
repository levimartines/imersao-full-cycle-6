import { Body, Controller, Get, HttpStatus, Post, Res } from "@nestjs/common";
import { MailListService } from "./mail-list.service";
import { CreateMailListDto } from "./dto/create-mail-list.dto";

@Controller("mail-list")
export class MailListController {
  constructor(private readonly mailListService: MailListService) {
  }

  @Post()
  create(@Body() createMailListDto: CreateMailListDto) {
    return this.mailListService.create(createMailListDto);
  }

  @Get()
  async findOne(@Res() response) {
    const mail = await this.mailListService.findOne();
    return !mail ? response.status(HttpStatus.NO_CONTENT).json(null) : response.json(mail);
  }

}
