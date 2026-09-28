import { ConfigModule, ConfigService } from "@nestjs/config";
import { Global, Module } from "@nestjs/common";
import { Pool } from "pg";

export const DATABASE_POOL = "DATABASE_POOL";

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: DATABASE_POOL,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return new Pool({
          host: config.get<string>("DB_HOST"),
          port: config.get<number>("DB_PORT"),
          user: config.get<string>("DB_USERNAME"),
          password: config.get<string>("DB_PASSWORD"),
          database: config.get<string>("DB_NAME"),
        });
      },
    },
  ],
  exports: [DATABASE_POOL],
})
export class DatabaseModule {}
