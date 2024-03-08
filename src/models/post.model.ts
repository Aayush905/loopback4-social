import {Entity, belongsTo, hasMany, model, property} from '@loopback/repository';
import {Comment} from './comment.model';
import {User} from './user.model';

@model({
  settings: {
    foreignKeys: {
      fk_post_userId: {
        name: 'fk_post_userId',
        entity: 'User',
        entityKey: 'id',
        foreignKey: 'userid',
      },
    },
  },
})
export class Post extends Entity {
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
  title: string;

  @property({
    type: 'string',
    required: true,
  })
  content: string;

  @belongsTo(() => User)
  userId: number;

  @hasMany(() => Comment)
  comments: Comment[];

  constructor(data?: Partial<Post>) {
    super(data);
  }
}

export interface PostRelations {
  // describe navigational properties here
}

export type PostWithRelations = Post & PostRelations;
