import { Inject, Injectable } from "@nestjs/common";
import { Pool } from "pg";
import { DATABASE_POOL } from "../database/database.module";
import { CreateUrlDto } from "./dto/create-url.dto";

@Injectable()
export class UrlsService {
  constructor(@Inject(DATABASE_POOL) private readonly db: Pool) {}

  async createShortCode(length = 6) {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let code = "";

    for (let i = 0; i < length; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }

    return code;
  }

  async createUrl(body: CreateUrlDto) {
    const query = `INSERT INTO urlshortner (user_id, long_url, short_url, expired_at) VALUES ($1, $2, $3, $4)`;

    const short_url = await this.createShortCode();

    try {
      const result = await this.db.query(query, [
        body.user_id,
        body.longUrl,
        short_url,
        body.expired_at,
      ]);
      console.log("result: ", result);
      return { code: `${process.env.HOST}/api/urls/${short_url}` };
    } catch (error) {
      console.log("error: ", error);
    }
  }

  async getLongUrl(short_url: string) {
    try {
      const query = `SELECT long_url, expired_at FROM urlshortner WHERE short_url= $1`;

      const res = await this.db.query(query, [short_url]);
      const expireDate = res.rows[0]?.expired_at;
      const currDate = new Date().getTime();
      if (expireDate && currDate > expireDate) {
        return "time is expired";
      } else {
        return res.rows[0]?.long_url;
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }
}
