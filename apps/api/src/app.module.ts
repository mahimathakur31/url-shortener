import { Module } from "@nestjs/common";
import { Controller, Get } from "@nestjs/common";
import { UrlsModule } from "./urls/urls.module";
import { DatabaseModule } from "./database/database.module";
import { ConfigModule } from "@nestjs/config";

@Controller("health")
class HealthController {
  @Get()
  check() {
    return { status: "ok" };
  }
}
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UrlsModule,
    DatabaseModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
