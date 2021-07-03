import { OpenAPI, OpenAPIRes } from '../entity/openAPI.entity';
import { ITranslator } from './translator.interface';

export class TranslatorImpl implements ITranslator<OpenAPI, OpenAPIRes> {
  translatorToResponse(entity: OpenAPI): OpenAPIRes {
    throw new Error('Method not implemented.');
  }
}
