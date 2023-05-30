import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import LineEdit from '../../components/LineEdit/LineEdit';
import {Picker} from '@react-native-picker/picker';
import MultipleImagePicker from '../../components/ImagePicker/MultipleImagePicker';


//REMOVE THIS TOKEN
const DEV_TMP_TOKEN = "";
//REMOVE THIS TOKEN


const ArticleWritePage = (props: any) => {
    const [article, setArticle] = useState(props.route.params?.article);
    const [boardType, setBoardType] = useState(props.route.params?.article?.boardType || props.route.params.boardType);
    const [title, setTitle] = useState(article ? article.title : "");
    const [content, setContent] = useState(article ? article.content : "");
    const [images, setImages] = useState(article ? article.attachedImageURLs : []);

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
            try {
                const response = await fetch(
                    `http://43.200.253.12:8080/api/article`,
                    {
                        method: "POST",
                        headers: {
                            Authorization: DEV_TMP_TOKEN, //토큰 불러오는 함수로 교체
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            boardType,
                            title,
                            content,
                        }),
                    }
                );
                const json = await response.json();
                console.log(json);
            }
            catch (e) {
                console.log(e);
                alert("네트워크 오류");
            }
        }
        else {
            try {
                const response = await fetch(
                    `http://43.200.253.12:8080/api/article/${article.id}`,
                    {
                        method: "PUT",
                        headers: {
                            Authorization: DEV_TMP_TOKEN, //토큰 불러오는 함수로 교체
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            boardType,
                            title,
                            content,
                            images
                        }),
                    }
                );
                const json = await response.json();
                console.log(json);
            }
            catch (e) {
                console.log(e);
                alert("네트워크 오류");
            }
        }
        setLoading(false);
        props.navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <View style={{flexDirection: "row", gap: 10, alignItems: "center"}}>
                <Text style={styles.title}>
                    게시글 {article ? "수정" : "작성"}
                </Text>
                <View style={{borderRadius: 10, flex: 1, overflow: "hidden"}}>
                    <Picker
                        selectedValue={boardType}
                        onValueChange={(itemValue, itemIndex) => setBoardType(itemValue)}
                        style={{backgroundColor: "#f0f0f0"}}
                    >
                        <Picker.Item label="공지사항" value="notice" />
                        <Picker.Item label="자유게시판" value="anything" />
                        <Picker.Item label="Q&A" value="qna" />
                    </Picker>
                </View>
            </View>
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
                <MultipleImagePicker onChange={setImages} />
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
      paddingHorizontal: 10,
      paddingVertical: 10,
      backgroundColor: "white",
    },
    title: {
        fontSize: 25,
        flex: 1,
    },
    formArea: {
        gap: 10,
        marginTop: 15,
        flex: 1,
    },
    inputTitle: {
        fontSize: 25,
        marginBottom: 10,
    },
    lineEdit: {
        backgroundColor: "#f0f0f0",
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 15,
    },
});

export default ArticleWritePage;