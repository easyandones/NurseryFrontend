import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import LineEdit from '../../components/LineEdit/LineEdit';


const RegisterPage = (props: any) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [birthday, setBirthday] = useState([1970, 1, 1]);
    const [gender, setGender] = useState(0);

    const [loading, setLoading] = useState(false);
    const sendForm = async() => {
        if (loading) {
            return;
        }
        setLoading(true);
        //const response = await fetch(
            //`https://api.kmu_wink.com/register`,
            //{
                //method: "POST"
            //}
        //);
        //const json = await response.json();
        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                회원가입
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
                <View style={styles.inputArea}>
                    <Text style={styles.inputTitle}>이름</Text>
                    <LineEdit
                        value={displayName}
                        onChangeText={setDisplayName}
                        placeholder="이름을 입력하세요."
                        autoCapitalize="none"
                    />
                </View>
                <View style={styles.inputArea}>
                    <Text style={styles.inputTitle}>생년월일</Text>
                    <View style={{flexDirection: "row", gap: 10, alignItems: "center"}}>
                        <LineEdit
                            value={birthday[0]}
                            onChangeText={(text: string) => setBirthday([parseInt(text), birthday[1], birthday[2]])}
                            placeholder="1970"
                            keyboardType="numeric"
                        />
                        <Text style={{fontSize: 15}}>년</Text>
                        <LineEdit
                            value={birthday[1]}
                            onChangeText={(text: string) => setBirthday([birthday[0], parseInt(text), birthday[2]])}
                            placeholder="1"
                            keyboardType="numeric"
                        />
                        <Text style={{fontSize: 15}}>월</Text>
                        <LineEdit
                            value={birthday[2]}
                            onChangeText={(text: string) => setBirthday([birthday[0], birthday[1], parseInt(text)])}
                            placeholder="1"
                            keyboardType="numeric"
                        />
                        <Text style={{fontSize: 15}}>일</Text>
                    </View>
                </View>
                <View style={styles.inputArea}>
                    <Text style={styles.inputTitle}>성별</Text>
                    <View style={{flexDirection: "row", gap: 10}}>
                        <TouchableOpacity onPress={() => setGender(0)} style={{borderRadius: 30, backgroundColor: gender === 0 ? "black" : "lightgray", paddingHorizontal: 30, paddingVertical: 15}}>
                            <Text style={{color: gender === 0 ? "white" : "black", fontSize: 18, fontWeight: "500", textAlign: "center"}}>남</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setGender(1)} style={{borderRadius: 30, backgroundColor: gender === 1 ? "black" : "lightgray", paddingHorizontal: 30, paddingVertical: 15}}>
                            <Text style={{color: gender === 1 ? "white" : "black", fontSize: 18, fontWeight: "500", textAlign: "center"}}>여</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity style={{borderRadius: 30, backgroundColor: "black", paddingHorizontal: 30, paddingVertical: 15}}>
                    <Text style={{color: "white", fontSize: 18, fontWeight: "500", textAlign: "center"}}>회원가입</Text>
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

export default RegisterPage;