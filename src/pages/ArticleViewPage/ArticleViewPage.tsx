import { StyleSheet, Text, TouchableOpacity, View, ScrollView, ActivityIndicator, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { Feather, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import LineEdit from '../../components/LineEdit/LineEdit';
import { useIsFocused } from '@react-navigation/native';
import Comment from '../../Types/Comment';
import CommentView from '../../components/Article/CommentView';
import Article from '../../Types/Article';


//REMOVE THIS TOKEN
const DEV_TMP_TOKEN = "";
//REMOVE THIS TOKEN


const ArticleViewPage = (props: any) => {
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState("");
    const [article, setArticle] = useState(props.route.params.article);
    const isFocused = useIsFocused();

    const refreshArticle = async() => {
        setLoading(true);
        try {
            const response = await fetch(
                `http://43.200.253.12:8080/api/article/${props.route.params.article.id}`,
                {
                    headers: {
                        Authorization: DEV_TMP_TOKEN //토큰 불러오는 함수로 교체
                    }
                }
            );
            const json = await response.json();
    
    
            //호환성 유지 데이터 변환
            json.article.user = {
                id: json.article.userId,
                displayName: json.article.userName,
                profileImageURL: `http://43.200.253.12:8080/home/ubuntu/${json.article.userProfileImage}`
            };
            json.article.comments = json.article.comments.map((value: any, index: number) => {
                let comment = {...value};
                comment.user = {
                    id: value.userId,
                    displayName: value.userName,
                    profileImageURL: `http://43.200.253.12:8080/home/ubuntu/${value.displayName}`
                };
                return comment;
            });
            json.article.attachedImageURLs = json.article.attachedImageURLs.map((value: any, index: number) => {
                return `http://43.200.253.12:8080/api/image/${value}`;
            });
            //호환성 유지 데이터 변환
    
            const article: Article = json.article;
            setArticle(article);
        }
        catch {
            alert("네트워크 오류");
        }
        setLoading(false);
    };
    useEffect(() => {
        if (isFocused) {
            refreshArticle();
        }
    }, [isFocused]);

    const toggleLike = async() => {
        try {
            const response = await fetch(
                `http://43.200.253.12:8080/api/article/${article.id}/heart`,
                {
                    method: article.liked ? "DELETE" : "POST",
                    headers: {
                        Authorization: DEV_TMP_TOKEN //토큰 불러오는 함수로 교체
                    },
                }
            );
            const json = await response.json();
            console.log(json);
        }
        catch (e) {
            console.log(e);
            alert("네트워크 오류");
        }
        if (article.liked) {
            setArticle({...article, liked: false, likesCount: article.likesCount - 1});
        }
        else {
            setArticle({...article, liked: true, likesCount: article.likesCount + 1});
        }
    };

    const editArticle = async() => {
        props.navigation.navigate('게시글 작성', {article});
    };

    const deleteArticle = async() => {
        setLoading(true);
        try {
            const response = await fetch(
                `http://43.200.253.12:8080/api/article/${article.id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: DEV_TMP_TOKEN //토큰 불러오는 함수로 교체
                    },
                }
            );
            const json = await response.json();
            console.log(json);
            props.navigation.navigate('게시글 목록');
        }
        catch (e) {
            console.log(e);
            alert("네트워크 오류");
        }
        setLoading(false);
    };

    const addComment = async() => {
        if (comment === "") {
            alert("댓글을 입력하세요.");
            return;
        }
        setLoading(true);
        try {
            const response = await fetch(
                `http://43.200.253.12:8080/api/article/${article.id}/comment`,
                {
                    method: "POST",
                    headers: {
                        Authorization: DEV_TMP_TOKEN, //토큰 불러오는 함수로 교체
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        content: comment,
                    }),
                }
            );
            const json = await response.json();
            console.log(json);
            setComment("");
        }
        catch (e) {
            console.log(e);
            alert("네트워크 오류");
        }
        setLoading(false);
        refreshArticle();
    };

    const deleteComment = async(commentId: number) => {
        setLoading(true);
        try {
            const response = await fetch(
                `http://43.200.253.12:8080/api/article/${article.id}/comment/${commentId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: DEV_TMP_TOKEN //토큰 불러오는 함수로 교체
                    },
                }
            );
            const json = await response.json();
            console.log(json);
        }
        catch (e) {
            console.log(e);
            alert("네트워크 오류");
        }
        setLoading(false);
        refreshArticle();
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator style={{padding: 10}} color="black" size="large" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.scrollArea}>
                    <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                        <View style={{flexDirection: "row", alignItems: "center", gap: 10}}>
                            <Image style={styles.userProfileImage} source={{uri: article.user.profileImageURL}} />
                            <View>
                                <Text style={{fontSize: 18, fontWeight: "500"}}>{article.user.displayName}</Text>
                                <Text style={{fontSize: 13, color: "gray"}}>{article.createdAt}</Text>
                            </View>
                        </View>
                        {article.isOwner ?
                            <View style={{flexDirection: "row", alignItems: "center", gap: 5}}>
                                <TouchableOpacity onPress={editArticle} style={{borderRadius: 10, backgroundColor: "orange", paddingHorizontal: 15, paddingVertical: 8}}>
                                    <FontAwesome name="edit" size={18} color="white" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={deleteArticle} style={{borderRadius: 10, backgroundColor: "red", paddingHorizontal: 15, paddingVertical: 8}}>
                                    <FontAwesome name="trash" size={18} color="white" />
                                </TouchableOpacity>
                            </View>
                        :
                            null
                        }
                    </View>
                    <View style={styles.contentArea}>
                        <Text style={styles.title}>
                            {article.title}
                        </Text>
                        <Text style={styles.content}>
                            {article.content}
                        </Text>
                        {
                            article.attachedImageURLs.map((url: string, index: number) => (
                                <Image key={index} style={styles.attatchedImage} source={{uri: url}} />
                            ))
                        }
                    </View>
                    <View style={{flexDirection: "row", marginVertical: 5, gap: 5}}>
                        <TouchableOpacity onPress={toggleLike} style={{flexDirection: "row", alignItems: "center", gap: 5, borderRadius: 10, backgroundColor: article.liked ? "#ffd9d9" : "#f0f0f0", paddingHorizontal: 10, paddingVertical: 4}}>
                            <FontAwesome name={article.liked ? "heart" : "heart-o"} size={18} color={article.liked ? "red" : "black"} />
                            <Text style={{fontSize: 16, fontWeight: "500", color: article.liked ? "red" : "black"}}>{article.likesCount}</Text>
                        </TouchableOpacity>
                        <View style={{flexDirection: "row", alignItems: "center", gap: 5, borderRadius: 10, backgroundColor: "#f0f0f0", paddingHorizontal: 10, paddingVertical: 4}}>
                            <MaterialIcons name="comment" size={18} color="black" />
                            <Text style={{fontSize: 16, fontWeight: "500", color: "black"}}>{article.comments.length}</Text>
                        </View>
                    </View>
                    <View style={styles.commentArea}>
                        {article.comments.length ?
                            <View style={{gap: 5}}>
                                {
                                    article.comments.map((comment: Comment, index: number) => (
                                        <CommentView key={comment.id} comment={comment} commentDeleteHandler={() => deleteComment(comment.id)} />
                                    ))
                                }
                            </View>
                        :
                            <Text style={{textAlign: "center", fontSize: 15, fontWeight: "bold", padding: 10}}>댓글이 없습니다.</Text>
                        }
                    </View>
                </View>
            </ScrollView>
            <View style={{flexDirection: "row", gap: 10, backgroundColor: "lightgray", borderRadius: 10, padding: 5}}>
                <LineEdit
                    value={comment}
                    onChangeText={setComment}
                    placeholder="댓글을 입력하세요."
                    autoCapitalize="none"
                    style={{...styles.lineEdit}}
                />
                <TouchableOpacity onPress={addComment} style={{padding: 10, justifyContent: "center"}}>
                    <Feather name="send" size={24} color="darkred" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingBottom: 10,
        backgroundColor: "white",
        gap: 10,
    },
    scrollArea: {
        gap: 10,
        paddingTop: 10,
    },
    userProfileImage: {
        width: 40,
        height: 40,
        borderRadius: 10,
    },
    contentArea: {
        gap: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: "500",
    },
    content: {
        fontSize: 16,
    },
    attatchedImage: {
        aspectRatio: 1,
        borderRadius: 10,
    },
    commentArea: {
        fontSize: 25,
        flex: 2,
    },
    lineEdit: {
        paddingHorizontal: 10,
        flex: 1,
    },
});

export default ArticleViewPage;