import { Repository, EntityRepository } from 'typeorm';

import Category from '../models/Category';

@EntityRepository(Category)
class CategoriesRepository extends Repository<Category> {
  public async findByTitle(title: string): Promise<Category | undefined> {
    const findCategory = await this.findOne({
      where: {
        title,
      },
    });

    return findCategory;
  }
}

export default CategoriesRepository;
