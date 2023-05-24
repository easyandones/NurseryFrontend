import { StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';

const HomePage = (props: any) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                홈
            </Text>
            <Text style={styles.title}>
                임시 이동 버튼
            </Text>
            <Button title="유치원 목록" onPress={() => props.navigation.navigate("유치원 목록")}></Button>
            <Button title="게시글 목록" onPress={() => props.navigation.navigate("게시글 목록")}></Button>
            <Button title="회원가입" onPress={() => props.navigation.navigate("회원가입")}></Button>
            <Button title="로그인" onPress={() => props.navigation.navigate("로그인")}></Button>
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
        marginTop: 50,
        fontSize: 30,
        textAlign: "center"
    },
});

export default HomePage;