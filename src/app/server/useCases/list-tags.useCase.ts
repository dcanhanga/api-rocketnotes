import { type ITagsRepository } from '../repositories/protocols';

import { type ITags } from '@/app/model';

class ListTagsUseCase {
  constructor(private readonly tagsRepository: ITagsRepository) {}

  execute = async (userId: string): Promise<ITags[]> => {
    const tags = await this.tagsRepository.listTags(userId);
    return tags;
  };
}
export { ListTagsUseCase };
