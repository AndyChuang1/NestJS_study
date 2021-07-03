export interface ITranslator<T, R> {
  translatorToResponse(entity: T): R;
}
