import Article from '../../Types/Article';

import { ScrollView, StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { useEffect, useState } from 'react';
import ArticlePreview from './ArticlePreview';
import { useIsFocused } from '@react-navigation/native';


//REMOVE THIS TOKEN
const DEV_TMP_TOKEN = "";
//REMOVE THIS TOKEN


const ArticleList = (props: any) => {
    const [articleList, setArticleList] = useState([]);
    const [loading, setLoading] = useState(false);
    let hasNextPage = true;
    let cursor = "";
    const isCloseToBottom = (event: any) => {
        return event.layoutMeasurement.height + event.contentOffset.y >= event.contentSize.height - 20;
    };
    const isFocused = useIsFocused();
    const getArticleList = async(prevArticleList: any) => {
        if (loading || !hasNextPage) {
            return;
        }
        setLoading(true);

        try {
            const response = await fetch(
                `http://43.200.253.12:8080/api/articles?boardType=${props.boardType}&sortType=${props.sortType}`,
                {
                    headers: {
                        Authorization: DEV_TMP_TOKEN //토큰 불러오는 함수로 교체
                    }
                }
            );
            const json = await response.json();
    
            //호환성 유지 데이터 변환
            json.articleList = json.articleList.map((value: any, index: number) => {
                let article = {...value};
                article.user = {
                    id: value.userId,
                    displayName: value.userName,
                    profileImageURL: `http://43.200.253.12:8080/api/users/image/${value.userId}`
                };
                article.comments = value.comments.map((value: any, index: number) => {
                    let comment = {...value};
                    comment.user = {
                        id: value.userId,
                        displayName: value.userName,
                        profileImageURL: `http://43.200.253.12:8080/api/users/image/${value.userId}`
                    };
                    return comment;
                });
                article.attachedImageURLs = value.attachedImageURLs.map((value: any, index: number) => {
                    return `http://43.200.253.12:8080/api/image/${value}`;
                });
                return article;
            });
            json.hasNextPage = false;
            json.cursor = "abcdefg";
            //호환성 유지 데이터 변환
    
            setArticleList([...prevArticleList, ...json.articleList] as never);
            hasNextPage = json.hasNextPage;
            cursor = json.cursor;
        }
        catch {
            alert("네트워크 오류");
        }

        setLoading(false);
    };
    useEffect(() => {
        if (isFocused) {
            hasNextPage = true;
            cursor = "";
            setArticleList([]);
            getArticleList([]);
        }
    }, [isFocused, props.boardType, props.sortType]);
    return (
        <View style={{flex: 1}}>
            <ScrollView
                onScroll={({nativeEvent}) => {
                    if (isCloseToBottom(nativeEvent)) {
                        getArticleList(articleList);
                    }
                }}
                {...props}
            >
                <View style={styles.container}>
                    {articleList.length ?
                            articleList.map((article: Article, index) => (
                                <ArticlePreview key={index} article={article} navigation={props.navigation} />
                            ))
                        :
                            <Text style={{textAlign: "center", fontSize: 15, fontWeight: "bold", padding: 10}}>게시글이 없습니다.</Text>
                    }
                </View>
                {loading ?
                    <View style={styles.container}>
                        <ActivityIndicator style={{padding: 10}} color="black" size="large" />
                    </View>
                :
                    null
                }
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 5,
    },
});

export default ArticleList;