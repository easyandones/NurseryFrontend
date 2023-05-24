type Comment = {
    id: number;
    userId: number;
    userName: string;
    userProfileImage: string;
    content: string;
    createdAt: string;
    isOwner: boolean;
};

export default Comment;