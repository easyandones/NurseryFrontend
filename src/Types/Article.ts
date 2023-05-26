import User from "./User";
import Comment from "./Comment";

type Article = {
    id: number;
    boardType: string;
    user: User;
    title: string;
    content: string;
    attachedImageURL: string[];
    createdAt: string;
    likesCount: number;
    comments: Comment[];
    liked: boolean;
    isOwner: boolean;
};

export default Article;