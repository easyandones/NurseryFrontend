import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { useState } from 'react';
import ArticleList from '../../components/Article/ArticleList';
import {Picker} from '@react-native-picker/picker';

const ArticlePage = (props: any) => {
    const [sortType, setSortType] = useState("latest");
    return (
        <View style={styles.container}>
            <View style={{flexDirection: "row", gap: 30, marginTop: 10}}>
                <View style={{borderRadius: 30, flex: 1, overflow: "hidden"}}>
                    <Picker
                        selectedValue={sortType}
                        onValueChange={(itemValue, itemIndex) => setSortType(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="최신순" value="latest" />
                        <Picker.Item label="좋아요순" value="like" />
                        <Picker.Item label="댓글순" value="comment" />
                    </Picker>
                </View>
            </View>
            <ArticleList sortType={sortType} style={{marginTop: 10, flex: 1}} navigation={props.navigation} />
            <TouchableOpacity onPress={() => props.navigation.navigate('게시글 작성')} style={{marginVertical: 10, borderRadius: 30, backgroundColor: "black", paddingHorizontal: 30, paddingVertical: 15}}>
                <Text style={{color: "white", fontSize: 18, fontWeight: "500", textAlign: "center"}}>게시글 추가</Text>
            </TouchableOpacity>
        </View>
    );
}
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 10,
    },
    picker: {
        backgroundColor: "lightgray",
    },
});

export default ArticlePage;