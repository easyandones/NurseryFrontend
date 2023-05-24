import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './src/pages/HomePage/HomePage';
import NurseryPage from './src/pages/NurseryPage/NurseryPage';
import ArticlePage from './src/pages/ArticlePage/ArticlePage';
import RegisterPage from './src/pages/RegisterPage/RegisterPage';
import LoginPage from './src/pages/LoginPage/LoginPage';
import ArticleWritePage from './src/pages/ArticleWritePage/ArticleWritePage';
import ArticleViewPage from './src/pages/ArticleViewPage/ArticleViewPage';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={{flex: 1}}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="홈">
            <Stack.Screen name="홈" component={HomePage} />
            <Stack.Screen name="유치원 목록" component={NurseryPage} />
            <Stack.Screen name="게시글 목록" component={ArticlePage} />
            <Stack.Screen name="게시글 조회" component={ArticleViewPage} />
            <Stack.Screen name="회원가입" component={RegisterPage} />
            <Stack.Screen name="로그인" component={LoginPage} />
            <Stack.Screen name="게시글 작성" component={ArticleWritePage} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "green",
  },
});
