import Comment from "./CommentType";

type Article = {
    id: number;
    userId: number;
    userName: string;
    title: string;
    content: string;
    createdAt: string;
    likesCount: number;
    comments: Comment[];
    liked: boolean;
    isOwner: boolean;
};

export default Article;