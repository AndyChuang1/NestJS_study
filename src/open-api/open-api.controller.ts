import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OpenApiService } from './open-api.service';
import { CreateOpenApiDto } from './dto/create-open-api.dto';
import { OpenApiRes } from './entities/open-api.entity';

import { translatrToRes } from './translator/postTranslator';
import { PostsResponse } from './dto/postsResponse.dto';

@Controller('open-api')
export class OpenApiController {
  constructor(private readonly openApiService: OpenApiService) {}

  @Post()
  async create(
    @Body() createOpenApiDto: CreateOpenApiDto,
  ): Promise<PostsResponse> {
    const results = await this.openApiService.create(createOpenApiDto);

    const resData = translatrToRes(results);

    return resData;
  }

  @Get()
  findAll() {
    return this.openApiService.findAll();
  }
}
