import { TagsRepository } from '../../repositories';
import { ListTagsUseCase } from '../list-tags.useCase';

export const makeListTags = (): ListTagsUseCase => {
  const tagsRepository = new TagsRepository();
  const lisTagsUseCase = new ListTagsUseCase(tagsRepository);
  return lisTagsUseCase;
};
