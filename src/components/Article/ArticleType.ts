import Comment from "./CommentType";

type Article = {
    id: number;
    boardType: string;
    userId: number;
    userName: string;
    userProfileImage: string;
    title: string;
    content: string;
    createdAt: string;
    likesCount: number;
    comments: Comment[];
    liked: boolean;
    isOwner: boolean;
};

export default Article;