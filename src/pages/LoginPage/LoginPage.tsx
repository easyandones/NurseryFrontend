import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { Image } from 'expo-image';
import LineEdit from '../../components/LineEdit/LineEdit';


const LoginPage = (props: any) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const sendForm = async() => {
        if (loading) {
            return;
        }
        setLoading(true);
        //const response = await fetch(
            //`https://api.kmu_wink.com/login`,
            //{
                //method: "POST"
            //}
        //);
        //const json = await response.json();
        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <View style={{alignItems: "center", marginTop: 50}}>
                <Image
                    style={{width: 160, height: 160}}
                    source="https://placehold.it/160x160"
                />
            </View>
            <Text style={styles.title}>
                로그인
            </Text>
            <View style={styles.formArea}>
                <View style={styles.inputArea}>
                    <Text style={styles.inputTitle}>아이디</Text>
                    <LineEdit
                        value={username}
                        onChangeText={setUsername}
                        placeholder="아이디를 입력하세요."
                        autoCapitalize="none"
                    />
                </View>
                <View style={styles.inputArea}>
                    <Text style={styles.inputTitle}>비밀번호</Text>
                    <LineEdit
                        value={password}
                        onChangeText={setPassword}
                        placeholder="비밀번호를 입력하세요."
                        autoCapitalize="none"
                        secureTextEntry
                    />
                </View>
                <TouchableOpacity>
                    <Text>아직 회원이 아니신가요? [회원가입]</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{borderRadius: 30, backgroundColor: "black", paddingHorizontal: 30, paddingVertical: 15}}>
                    <Text style={{color: "white", fontSize: 18, fontWeight: "500", textAlign: "center"}}>로그인</Text>
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
        textAlign: "center"
    },
    formArea: {
        gap: 30,
    },
    inputArea: {
    },
    inputTitle: {
        fontSize: 25,
        marginBottom: 10,
    },
});

export default LoginPage;