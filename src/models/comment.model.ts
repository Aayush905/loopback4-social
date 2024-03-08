import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Post} from './post.model';
import {User} from './user.model';

@model({
  settings: {
    foreignKeys: {
      fk_comment_userId: {
        name: 'fk_comment_userId',
        entity: 'User',
        entityKey: 'id',
        foreignKey: 'userid',
      },
      fk_comment_postId: {
        name: 'fk_comment_postId',
        entity: 'Post',
        entityKey: 'id',
        foreignKey: 'postid',
      },
    },
  },
})
export class Comment extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  content: string;

  @belongsTo(() => User)
  userId: number;

  @belongsTo(() => Post)
  postId: number;

  constructor(data?: Partial<Comment>) {
    super(data);
  }
}

export interface CommentRelations {
  // describe navigational properties here
}

export type CommentWithRelations = Comment & CommentRelations;
