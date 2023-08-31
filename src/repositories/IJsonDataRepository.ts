export interface IJsonDataRepository {
  save(data: string): Promise<string>;
  get(): Promise<string>;
}
