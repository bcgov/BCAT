import { IsOptional, Max, Min, IsInt } from 'class-validator';
import { SelectQueryBuilder } from 'typeorm';
import { Type } from 'class-transformer';

export class PaginationDto {
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  page = 1;

  @Min(0)
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  limit = 25;

  filter(query: SelectQueryBuilder<any>, forceNotSubquery = false): SelectQueryBuilder<any> {
    if (forceNotSubquery) {
      query.offset((this.page - 1) * this.limit);
      if (this.limit !== 0) {
        query.limit(this.limit);
      }
      return query;
    }

    query.skip((this.page - 1) * this.limit);
    if (this.limit !== 0) {
      query.take(this.limit);
    }
    query.take(this.limit);
    return query;
  }
}
