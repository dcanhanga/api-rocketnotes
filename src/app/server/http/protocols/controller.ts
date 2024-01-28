export interface IController<TRequest, TResponse> {
  handle: (request: TRequest, response: TResponse) => Promise<TResponse>;
}
