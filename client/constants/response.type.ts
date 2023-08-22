export type CommentType = {
  userId: number;
  displayName: string;
  commentId: number;
  OVERALL_COMMENTS: string;
  createdAt: string;
};

export type CommentResponseType = {
  comments: CommentType[];
};
