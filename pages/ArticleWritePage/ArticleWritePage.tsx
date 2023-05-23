import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import LineEdit from '../../components/LineEdit/LineEdit';


const ArticleWritePage = (props: any) => {
    const [article, setArticle] = useState(props.route.params?.article);
    const [title, setTitle] = useState(article ? article.title : "");
    const [content, setContent] = useState(article ? article.content : "");

    const [loading, setLoading] = useState(false);
    const sendForm = async() => {
        if (loading) {
            return;
        }
        if (title === "") {
            alert("제목을 입력하세요.");
            return;
        }
        if (content === "") {
            alert("내용을 입력하세요.");
            return;
        }
        setLoading(true);
        console.log({
            title,
            content
        });
        if (article === undefined) {
            //새글 작성 API
        }
        else {
            //글 수정 API
        }
        setLoading(false);
        props.navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                게시글 {article ? "수정" : "작성"}
            </Text>
            <View style={styles.formArea}>
                <LineEdit
                    value={title}
                    onChangeText={setTitle}
                    placeholder="제목을 입력하세요."
                    autoCapitalize="none"
                    style={{...styles.lineEdit}}
                />
                <LineEdit
                    value={content}
                    onChangeText={setContent}
                    placeholder="내용을 입력하세요."
                    autoCapitalize="none"
                    multiline
                    textAlignVertical="top"
                    style={{...styles.lineEdit, flex: 1}}
                />
                <TouchableOpacity onPress={sendForm} style={{borderRadius: 30, backgroundColor: "black", paddingHorizontal: 30, paddingVertical: 15}}>
                    <Text style={{color: "white", fontSize: 18, fontWeight: "500", textAlign: "center"}}>{article ? "수정" : "등록"}</Text>
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
    formArea: {
        gap: 30,
        marginTop: 30,
        flex: 1,
    },
    inputTitle: {
        fontSize: 25,
        marginBottom: 10,
    },
    lineEdit: {
        backgroundColor: "lightgray",
        padding: 20,
    },
});

export default ArticleWritePage;