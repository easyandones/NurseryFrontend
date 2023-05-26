import Article from '../../Types/ArticleType';

import { ScrollView, StyleSheet, View, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import ArticlePreview from './ArticlePreview';
import { useIsFocused } from '@react-navigation/native';


const ArticleList = (props: any) => {
    const [articleList, setArticleList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [cursor, setCursor] = useState("");
    const isCloseToBottom = (event: any) => {
        return event.layoutMeasurement.height + event.contentOffset.y >= event.contentSize.height - 20;
    };
    const isFocused = useIsFocused();
    const getArticleList = async(prevArticleList: any) => {
        console.log("loading articles");
        if (loading || !hasNextPage) {
            return;
        }
        setLoading(true);
        //const response = await fetch("https://hub.dummyapis.com/delay?seconds=1");
        //const response = await fetch(
            //`https://api.kmu_wink.com/articleList?board=${props.boardType}&sort=${props.sortType}&cursor=${cursor}&limit=20&token=${OAUTH_TOKEN}`,
            //{
                //method: "POST"
            //}
        //);
        //const json = await response.json();
        const json: any = { //임시 테스트 데이터
            articleList: Array.from({length: 10}, () => (
                {
                    id: Math.floor(Math.random() * 1000),
                    boardType: props.boardType,
                    user: {
                        id: Math.floor(Math.random() * 1000),
                        displayName: `사용자${Math.floor(Math.random() * 1000)}`,
                        profileImageURL: "https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg"
                    },
                    title: [
                        "제목입니다.",
                        "아아아아아아아아 제목 테스트입니다. 아아아아 가나다라마바사 이것은 글이다. 안녕하세요. 테스트",
                        "아아아아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ",
                        "ㅁㄴㅇㄹ",
                    ][Math.floor(Math.random() * 4)],
                    content: [
                        "내용입니다.",
                        "아아아아아아아아 게시글 테스트입니다. 아아아아 가나다라마바사 이것은 글이다. 안녕하세요. 테스트",
                        "아아아아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ",
                        "ㅁㄴㅇㄹ",
                    ][Math.floor(Math.random() * 4)],
                    attachedImageURL: Array.from({length: Math.floor(Math.random() * 4)}, () => {
                        const keyword = ["nature", "space", "programming", "bus", "school"][Math.floor(Math.random() * 5)];
                        return `https://source.unsplash.com/random/?${keyword}`;
                    }),
                    createdAt: "2023-05-21 11:14",
                    likesCount: Math.floor(Math.random() * 99) + 1,
                    comments: Array.from({length: Math.floor(Math.random() * 10)}, (item, index) => (
                        {
                            id: index,
                            user: {
                                id: Math.floor(Math.random() * 1000),
                                displayName: `사용자${Math.floor(Math.random() * 1000)}`,
                                profileImageURL: "https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg"
                            },
                            content: [
                                "댓글입니다.",
                                "아아아아아아아아 댓글 테스트입니다. 아아아아 가나다라마바사 이것은 글이다. 안녕하세요. 테스트",
                                "아아아아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ",
                                "ㅁㄴㅇㄹ",
                            ][Math.floor(Math.random() * 4)],
                            createdAt: "2023-05-21 11:14",
                            isOwner: [true, false][Math.floor(Math.random() * 2)],
                        }
                    )),
                    liked: [true, false][Math.floor(Math.random() * 2)],
                    isOwner: [true, false][Math.floor(Math.random() * 2)],
                }
            )),
            hasNextPage: true,
            cursor: "abcdefg"
        };
        setArticleList([...prevArticleList, ...json.articleList] as never);
        setHasNextPage(json.hasNextPage);
        setCursor(json.cursor);
        setLoading(false);
    };
    useEffect(() => {
        if (isFocused) {
            setHasNextPage(true);
            setCursor("");
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
                    {
                        articleList.map((article: Article, index) => (
                            <ArticlePreview key={index} article={article} navigation={props.navigation} />
                        ))
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