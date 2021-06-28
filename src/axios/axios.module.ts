import { Module, DynamicModule } from '@nestjs/common';
import { AxiosService } from './axios.service';
import Axios from 'axios';
import { AxiosConfig, HttpModuleOptionsFactory } from './interface';
import { AXIOS_INSTANCE_TOKEN } from './axios.constants';

@Module({
  providers: [
    AxiosService,
    {
      provide: AXIOS_INSTANCE_TOKEN,
      useValue: Axios,
    },
  ],
  exports: [AxiosService],
})
export class AxiosModule {
  static register(config: AxiosConfig): DynamicModule {
    return {
      module: AxiosModule,
      providers: [
        {
          provide: AXIOS_INSTANCE_TOKEN,
          useValue: Axios.create(config),
        },
      ],
      exports: [AxiosService],
    };
  }
}
