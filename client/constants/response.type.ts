export type CommentType = {
  userId: number;
  displayName: string;
  commentId: string;
  comment: string;
  createdAt: string;
};

export type CommentResponseType = {
  comments: CommentType[];
};
