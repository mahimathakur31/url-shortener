import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateUrlDto {
  @IsNumber()
  user_id: Number;

  @IsNumber()
  @IsOptional()
  expired_at?: Number;

  @IsString()
  longUrl: string;
}
