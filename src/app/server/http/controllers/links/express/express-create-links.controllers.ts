import { type Request, type Response } from 'express';

import { type IController } from '../../../protocols/controller';

export class ExpressCreateLinksController implements IController<Request, Response> {
  handle = async (request: Request, response: Response): Promise<Response> => {
    // Adicione a lógica específica do controlador aqui
    // Por exemplo, você pode acessar os dados da solicitação usando request.body
    // e então processar os dados conforme necessário.

    // Retorna uma resposta JSON de exemplo por enquanto
    return response.json({ message: 'Exemplo de resposta JSON' });
  };
}
