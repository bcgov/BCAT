export interface CommentRo {
  userId: number;
  displayName: string;
  commentId: number;
  comment: string;
  createdAt: string;
}

export class CommentResultRo {
  comments: CommentRo[];
  constructor(data: CommentRo[]) {
    this.comments = data;
  }
}
