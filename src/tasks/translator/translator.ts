import { Injectable } from '@nestjs/common';
import { OpenAPI, OpenAPIRes } from '../entity/openAPI.entity';

@Injectable()
export class Translator {
  public translatorToResponse(data: OpenAPI): OpenAPIRes {
    const res = new OpenAPIRes();
    const { userId, id, title } = data;
    res.id = id;
    res.title = title;
    res.userId = userId;
    return res;
  }
}
