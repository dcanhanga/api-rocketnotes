/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
import { Knex } from 'knex';

import { type IUser } from '@/modules/accounts/model/users';
declare module 'knex/types/tables' {
  export interface Tables {
    users: IUser;
  }
}
