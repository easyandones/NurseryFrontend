import Article from '../../Types/ArticleType';

import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';


const ArticlePreview = (props: any) => {
    const article: Article = props.article;
    return (
        <TouchableOpacity onPress={() => props.navigation.navigate('게시글 조회', { article })}>
            <View style={styles.container}>
                <View style={styles.contentArea}>
                    <View style={{flex: 1, padding: 5}}>
                        <Text style={styles.title}>
                            {article.title}
                        </Text>
                        <Text style={styles.content}>
                            {article.content}
                        </Text>
                    </View>
                    {article.attachedImageURL.length ?
                        <Image style={styles.attatchedImage} source={{uri: article.attachedImageURL[0]}} />
                    :
                        null
                    }
                </View>
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
                        <Text style={{color: "gray"}}>{article.user.displayName}</Text>
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
      padding: 10,
      backgroundColor: "white",
      borderRadius: 10,
    },
    contentArea: {
        flexDirection: "row",
    },
    title: {
        fontSize: 20,
    },
    content: {
        marginTop: 10,
        marginBottom: 5,
        fontSize: 16,
    },
    attatchedImage: {
        width: 70,
        height: 70,
        borderRadius: 10,
    },
    infoArea: {
        paddingVertical: 5,
        paddingHorizontal: 10,
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