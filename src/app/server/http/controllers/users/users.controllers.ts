import { ExpressCreateUsersController } from './express/express-create-users.controllers';
import { ExpressUpdateUsersController } from './express/express-update-users.controllers';

export const createUsersController = new ExpressCreateUsersController();
export const updateUsersController = new ExpressUpdateUsersController();
