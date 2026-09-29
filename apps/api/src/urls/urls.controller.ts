import { Body, Controller, Get, Param, Post, Res } from "@nestjs/common";
import { UrlsService } from "./urls.service";
import { CreateUrlDto } from "./dto/create-url.dto";

@Controller("urls")
export class UrlsController {
  constructor(private readonly urlService: UrlsService) {}

  @Post()
  createUrl(@Body() body: CreateUrlDto) {
    return this.urlService.createUrl(body);
  }

  @Get(":code")
  async getLongUrl(@Param("code") short_url: string, @Res() res: any) {
    const redirectUrl = await this.urlService.getLongUrl(short_url);

    if (redirectUrl === "time is expired") {
      return res.status(410).json({
        message: "Short URL has expired",
      });
    }

    return res.redirect(redirectUrl);
  }
}
