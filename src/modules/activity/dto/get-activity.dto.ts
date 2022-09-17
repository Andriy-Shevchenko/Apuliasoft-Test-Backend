import { IsArray, IsOptional } from 'class-validator';

export class GetActivityDto {
  @IsArray()
  @IsOptional()
  aggregations: string[];
}
