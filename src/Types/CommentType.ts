import User from "./User";

type Comment = {
    id: number;
    user: User;
    content: string;
    createdAt: string;
    isOwner: boolean;
};

export default Comment;