import Article from './ArticleType';

import { ScrollView, StyleSheet, View, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import ArticleView from './ArticleView';
import { useIsFocused } from '@react-navigation/native';


const ArticleList = (props: any) => {
    const [articleList, setArticleList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [cursor, setCursor] = useState("");
    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
    };
    const isFocused = useIsFocused();
    const getArticleList = async() => {
        console.log("loading articles");
        if (loading || !hasNextPage) {
            return;
        }
        setLoading(true);
        const response = await fetch("https://hub.dummyapis.com/delay?seconds=1");
        //const response = await fetch(
            //`https://api.kmu_wink.com/articleList?sort=${sortType}&cursor=${cursor}&limit=20&token=${OAUTH_TOKEN}`,
            //{
                //method: "POST"
            //}
        //);
        //const json = await response.json();
        const json: any = {
            articleList: [
                {
                    id: 1,
                    userId: 1,
                    userName: "사용자1",
                    title: "제목1",
                    content: "내용1",
                    createdAt: "2023-05-21 11:14",
                    likesCount: 2,
                    comments: [
                        {
                            id: 1,
                            userId: 1,
                            userName: "사용자1",
                            content: "댓글1",
                            createdAt: "2023-05-21 11:14",
                            isOwner: true,
                        },
                        {
                            id: 2,
                            userId: 2,
                            userName: "사용자2",
                            content: "댓글2",
                            createdAt: "2023-05-21 11:14",
                            isOwner: false,
                        },
                    ],
                    liked: true,
                    isOwner: false,
                },
                {
                    id: 2,
                    userId: 2,
                    userName: "사용자2",
                    title: "제목2",
                    content: "내용2",
                    createdAt: "2023-05-21 11:14",
                    likesCount: 4,
                    comments: [
                        {
                            id: 1,
                            userId: 1,
                            userName: "사용자1",
                            content: "댓글1",
                            createdAt: "2023-05-21 11:14",
                            isOwner: true,
                        },
                        {
                            id: 2,
                            userId: 2,
                            userName: "사용자2",
                            content: "댓글2",
                            createdAt: "2023-05-21 11:14",
                            isOwner: false,
                        },
                    ],
                    liked: false,
                    isOwner: false,
                },
                {
                    id: 3,
                    userId: 3,
                    userName: "사용자3",
                    title: "제목3",
                    content: "내용3",
                    createdAt: "2023-05-21 11:14",
                    likesCount: 5,
                    comments: [
                        {
                            id: 1,
                            userId: 1,
                            userName: "사용자1",
                            content: "댓글1",
                            createdAt: "2023-05-21 11:14",
                            isOwner: true,
                        },
                        {
                            id: 2,
                            userId: 2,
                            userName: "사용자2",
                            content: "댓글2",
                            createdAt: "2023-05-21 11:14",
                            isOwner: false,
                        },
                        {
                            id: 3,
                            userId: 3,
                            userName: "사용자3",
                            content: "댓글3",
                            createdAt: "2023-05-21 11:14",
                            isOwner: false,
                        },
                        {
                            id: 4,
                            userId: 4,
                            userName: "사용자4",
                            content: "댓글4",
                            createdAt: "2023-05-21 11:14",
                            isOwner: false,
                        },
                    ],
                    liked: false,
                    isOwner: true,
                },
                {
                    id: 4,
                    userId: 4,
                    userName: "사용자4",
                    title: "제목4",
                    content: "내용4",
                    createdAt: "2023-05-21 11:14",
                    likesCount: 13,
                    comments: [
                        {
                            id: 1,
                            userId: 1,
                            userName: "사용자1",
                            content: "댓글1",
                            createdAt: "2023-05-21 11:14",
                            isOwner: true,
                        },
                        {
                            id: 2,
                            userId: 2,
                            userName: "사용자2",
                            content: "댓글2",
                            createdAt: "2023-05-21 11:14",
                            isOwner: false,
                        },
                    ],
                    liked: false,
                    isOwner: true,
                },
                {
                    id: 5,
                    userId: 5,
                    userName: "사용자5",
                    title: "제목5",
                    content: "내용5",
                    createdAt: "2023-05-21 11:14",
                    likesCount: 0,
                    comments: [
                    ],
                    liked: false,
                    isOwner: true,
                },
            ],
            hasNextPage: true,
            cursor: "abcdefg"
        };
        setArticleList([...articleList, ...json.articleList] as never);
        setHasNextPage(json.hasNextPage);
        setCursor(json.cursor);
        setLoading(false);
    };
    useEffect(() => {
        setHasNextPage(true);
        setCursor("");
        setArticleList([]);
        getArticleList();
    }, [isFocused, props.sortType]);
    return (
        <View style={{flex: 1}}>
            <ScrollView
                onScroll={({nativeEvent}) => {
                    if (isCloseToBottom(nativeEvent)) {
                        getArticleList();
                    }
                }}
                {...props}
            >
                <View style={styles.container}>
                    {
                        articleList.map((value: Article, index) => (
                            <ArticleView key={index} nursery={value} navigation={props.navigation} />
                        ))
                    }
                </View>
                {loading ?
                    <View style={styles.container}>
                        <Text style={{textAlign: "center", fontSize: 20}}>불러오는 중...</Text>
                        <ActivityIndicator color="black" style={{marginTop: 10}} size="large" />
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
        gap: 10,
        paddingVertical: 10,
    },
});

export default ArticleList;