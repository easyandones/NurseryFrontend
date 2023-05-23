import { StyleSheet, Text, TouchableOpacity, View, ScrollView, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import LineEdit from '../../components/LineEdit/LineEdit';
import { useIsFocused } from '@react-navigation/native';
import Comment from '../../components/Article/CommentType';


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
                <Text style={{textAlign: "center", fontSize: 20}}>불러오는 중...</Text>
                <ActivityIndicator color="black" style={{marginTop: 10}} size="large" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                <Text style={styles.title}>
                    {article.title}
                </Text>
                <View>
                    <Text style={styles.meta}>
                        {article.userName}
                    </Text>
                    <Text style={styles.meta}>
                        {article.createdAt}
                    </Text>
                </View>
            </View>
            <Text style={styles.contentArea}>
                {article.content}
            </Text>
            <View style={{flexDirection: "row", margin: 10, gap: 10, justifyContent: "flex-end"}}>
                <TouchableOpacity onPress={toggleLike} style={{flexDirection: "row", alignItems: "center", gap: 10, borderRadius: 30, backgroundColor: "black", paddingHorizontal: 20, paddingVertical: 10}}>
                    <FontAwesome name={article.liked ? "heart" : "heart-o"} size={24} color="white" />
                    <Text style={{color: "white", fontSize: 16, fontWeight: "500"}}>{article.likesCount}</Text>
                </TouchableOpacity>
                {article.isOwner ?
                    <>
                        <TouchableOpacity onPress={editArticle} style={{borderRadius: 30, backgroundColor: "black", paddingHorizontal: 20, paddingVertical: 10}}>
                            <FontAwesome name="edit" size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={deleteArticle} style={{borderRadius: 30, backgroundColor: "black", paddingHorizontal: 20, paddingVertical: 10}}>
                            <FontAwesome name="trash" size={24} color="white" />
                        </TouchableOpacity>
                    </>
                :
                    null
                }
            </View>
            <View style={styles.commentArea}>
                {article.comments.length ?
                    <ScrollView>
                        {
                            article.comments.map((comment: Comment, index: number) => (
                                <View style={styles.comment}>
                                    <View key={index}>
                                        <Text>{comment.userName}</Text>
                                        <Text>{comment.content}</Text>
                                    </View>
                                    {comment.isOwner ?
                                        <View style={{flexDirection: "row", marginLeft: "auto", alignItems: "center"}}>
                                            <TouchableOpacity onPress={() => deleteComment(comment.id)} style={{borderRadius: 30, backgroundColor: "black", paddingHorizontal: 15, paddingVertical: 10}}>
                                                <FontAwesome name="trash" size={12} color="white" />
                                            </TouchableOpacity>
                                        </View>
                                    :
                                        null
                                    }
                                </View>
                            ))
                        }
                    </ScrollView>
                :
                    <Text style={{textAlign: "center", fontSize: 15, fontWeight: "bold", padding: 10}}>댓글이 없습니다.</Text>
                }
            </View>
            <View style={styles.commentWriteArea}>
                <LineEdit
                    value={comment}
                    onChangeText={setComment}
                    placeholder="댓글을 입력하세요."
                    autoCapitalize="none"
                    style={{...styles.lineEdit}}
                />
                <TouchableOpacity onPress={addComment} style={{borderRadius: 30, backgroundColor: "black", paddingHorizontal: 20, paddingVertical: 10}}>
                    <Text style={{color: "white", fontSize: 18, fontWeight: "500", textAlign: "center"}}>등록</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 30,
      paddingVertical: 20,
      backgroundColor: "white",
    },
    title: {
        fontSize: 30,
    },
    meta: {
        fontSize: 16,
    },
    contentArea: {
        gap: 30,
        marginTop: 30,
        backgroundColor: "lightgray",
        flex: 3,
        padding: 20,
        fontSize: 18,
    },
    commentWriteArea: {
        flexDirection: "row",
        marginTop: 5,
    },
    commentArea: {
        fontSize: 25,
        marginBottom: 10,
        flex: 2,
    },
    lineEdit: {
        backgroundColor: "lightgray",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 30,
        marginRight: 10,
        flex: 1,
    },
    comment: {
        flexDirection: "row",
        margin: 3,
        gap: 10,
        backgroundColor: "lightgray",
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
});

export default ArticleViewPage;