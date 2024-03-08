import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Comment, Post, User, UserRelations} from '../models';
import {CommentRepository} from './comment.repository';
import {PostRepository} from './post.repository';


export type Credentials={
  email:string;
  password:string;
};

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly posts: HasManyRepositoryFactory<Post, typeof User.prototype.id>;

  public readonly comments: HasManyRepositoryFactory<Comment, typeof User.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('PostRepository') protected postRepositoryGetter: Getter<PostRepository>, @repository.getter('CommentRepository') protected commentRepositoryGetter: Getter<CommentRepository>,
  ) {
    super(User, dataSource);
    this.comments = this.createHasManyRepositoryFactoryFor('comments', commentRepositoryGetter,);
    this.registerInclusionResolver('comments', this.comments.inclusionResolver);
    this.posts = this.createHasManyRepositoryFactoryFor('posts', postRepositoryGetter,);
    this.registerInclusionResolver('posts', this.posts.inclusionResolver);
  }
}
