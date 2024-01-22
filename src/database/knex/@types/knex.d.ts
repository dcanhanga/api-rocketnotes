/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
import { Knex } from 'knex';

import { type IUser } from '@/modules/model/users';
import { type INotes, type ILinks } from '@/modules/notes/model/notes';
declare module 'knex/types/tables' {
  export interface Tables {
    users: IUser;
    notes: INotes;
    links: ILinks;
    tags: ITags;
  }
}
