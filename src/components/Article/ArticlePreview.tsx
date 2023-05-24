import Article from './ArticleType';

import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';


const ArticlePreview = (props: any) => {
    const article: Article = props.article;
    return (
        <TouchableOpacity onPress={() => props.navigation.navigate('게시글 조회', { article })}>
            <View style={styles.container}>
                <Text style={styles.title}>
                    {article.title}
                </Text>
                <Text style={styles.content}>
                    {article.content}
                </Text>
                <View style={styles.infoArea}>
                    <View style={styles.infoBox}>
                        <FontAwesome name={article.liked ? "heart" : "heart-o"} size={18} color={article.liked ? "red" : "black"} />
                        <Text style={{...styles.infoText, color: article.liked ? "red" : "black"}}>{article.likesCount}</Text>
                    </View>
                    <View style={styles.infoBox}>
                        <MaterialIcons name="comment" size={18} color="black" />
                        <Text style={styles.infoText}>{article.comments.length}</Text>
                    </View>
                    <View style={styles.infoBox}>
                        <Text style={{color: "gray"}}>{article.userName}</Text>
                    </View>
                    <View style={styles.infoBox}>
                        <Text style={{color: "gray"}}>{article.createdAt}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingVertical: 15,
      backgroundColor: "white",
      borderRadius: 10,
    },
    title: {
        fontSize: 20,
    },
    content: {
        marginVertical: 10,
        fontSize: 16,
    },
    infoArea: {
        marginTop: 10,
        flexDirection: "row",
        gap: 20,
    },
    infoBox: {
        flexDirection: "row",
        gap: 5,
        alignItems: "center",
    },
    infoText: {
        fontSize: 16,
        fontWeight: "500",
    },
});

export default ArticlePreview;