import { container } from 'tsyringe';

import { UsersRepository } from '@/modules/accounts/repositories/implementations/users';
import { type IUsersRepository } from '@/modules/accounts/repositories/interfaces/IUsersRepository';
import { NotesRepository } from '@/modules/notes/repositories/implementations/notes';
import { type INotesRepository } from '@/modules/notes/repositories/interfaces/INotesRepository';
container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);
container.registerSingleton<INotesRepository>('NotesRepository', NotesRepository);
