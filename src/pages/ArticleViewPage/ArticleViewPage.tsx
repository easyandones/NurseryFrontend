import { StyleSheet, Text, TouchableOpacity, View, ScrollView, ActivityIndicator, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { Feather, FontAwesome } from '@expo/vector-icons';
import LineEdit from '../../components/LineEdit/LineEdit';
import { useIsFocused } from '@react-navigation/native';
import Comment from '../../components/Article/CommentType';
import CommentView from '../../components/Article/CommentView';


const ArticleViewPage = (props: any) => {
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState("");
    const [article, setArticle] = useState(props.route.params.article);
    const isFocused = useIsFocused();

    const refreshArticle = async() => {
        setLoading(true);
        console.log("refresh article"); //게시글 불러오는 API
        const response = await fetch("https://hub.dummyapis.com/delay?seconds=1");
        //const response = await fetch(
            //`https://api.kmu_wink.com/article?id=${article.id}&token=${OAUTH_TOKEN}`,
            //{
                //method: "POST"
            //}
        //);
        //const json = await response.json();
        const json: any = props.route.params.article;
        setArticle(json);
        setLoading(false);
    };
    useEffect(() => {
        if (isFocused) {
            refreshArticle();
        }
    }, [isFocused]);

    const toggleLike = async() => {
        //좋아요 API
        console.log("toggle like", article.id);
        if (article.liked) {
            setArticle({...article, liked: false, likesCount: article.likesCount - 1});
        }
        else {
            setArticle({...article, liked: true, likesCount: article.likesCount + 1});
        }
    };


    const editArticle = async() => {
        //수정 API
        console.log("edit", article.id);
        props.navigation.navigate('게시글 작성', {article});
    };

    const deleteArticle = async() => {
        setLoading(true);
        //삭제 API
        console.log("delete", article.id);
        props.navigation.navigate('게시글 목록');
        setLoading(false);
    };

    const addComment = async() => {
        setLoading(true);
        //댓글 등록 API
        console.log("add comment", comment);
        setComment("");
        setLoading(false);
        refreshArticle();
    };

    const deleteComment = async(commentId: number) => {
        setLoading(true);
        //댓글 삭제 API
        console.log("delete comment", commentId);
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
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                <View style={{flexDirection: "row", alignItems: "center", gap: 10}}>
                    <Image style={styles.userProfileImage} source={{uri: article.userProfileImage}} />
                    <View>
                        <Text style={{fontSize: 18, fontWeight: "500"}}>{article.userName}</Text>
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
            </View>
            <View style={{flexDirection: "row", marginVertical: 5}}>
                <TouchableOpacity onPress={toggleLike} style={{flexDirection: "row", alignItems: "center", gap: 5, borderRadius: 10, backgroundColor: article.liked ? "#ffd9d9" : "#f0f0f0", paddingHorizontal: 10, paddingVertical: 4}}>
                    <FontAwesome name={article.liked ? "heart" : "heart-o"} size={18} color={article.liked ? "red" : "black"} />
                    <Text style={{fontSize: 16, fontWeight: "500", color: article.liked ? "red" : "black"}}>{article.likesCount}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.commentArea}>
                {article.comments.length ?
                    <ScrollView>
                        <View style={{gap: 5}}>
                            {
                                article.comments.map((comment: Comment, index: number) => (
                                    <CommentView key={comment.id} comment={comment} commentDeleteHandler={() => deleteComment(comment.id)} />
                                ))
                            }
                        </View>
                    </ScrollView>
                :
                    <Text style={{textAlign: "center", fontSize: 15, fontWeight: "bold", padding: 10}}>댓글이 없습니다.</Text>
                }
            </View>
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
      paddingVertical: 10,
      backgroundColor: "white",
      gap: 10,
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