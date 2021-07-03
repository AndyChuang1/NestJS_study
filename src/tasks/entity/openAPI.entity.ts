import { Exclude, Expose, Type } from 'class-transformer';

export class OpenAPI {
  userId: number;
  id: number;
  title: string;
  completed: boolean;

  @Expose()
  get titleWithUserId(): string {
    return this.title + this.id;
  }

  constructor(partial: Partial<OpenAPI>) {
    Object.assign(this, partial);
  }
}

export class OpenAPIRes {
  userId: number;
  id: number;
  title: string;
}
