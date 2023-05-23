import { StyleSheet, View } from 'react-native';
import { useState } from 'react';
import LineEdit from '../../components/LineEdit/LineEdit';
import NurseryList from '../../components/Nursery/NurseryList';
import {Picker} from '@react-native-picker/picker';

const NurseryPage = (props: any) => {
    const [sortType, setSortType] = useState();
    return (
        <View style={styles.container}>
            <LineEdit
                onSubmitEditing={(event: any) => console.log(event.nativeEvent.text)}
                placeholder="검색어를 입력하세요."
                returnKeyType="search"
            />
            <View style={{flexDirection: "row", gap: 30, marginTop: 10}}>
                <View style={{borderRadius: 30, flex: 1, overflow: "hidden"}}>
                    <Picker
                        selectedValue={sortType}
                        onValueChange={(itemValue, itemIndex) => setSortType(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="가까운순" value="nearest" />
                        <Picker.Item label="평점순" value="highest" />
                    </Picker>
                </View>
                <View style={{borderRadius: 30, flex: 1, overflow: "hidden"}}>
                    <Picker
                        selectedValue={sortType}
                        onValueChange={(itemValue, itemIndex) => setSortType(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="강남구" value="강남구" />
                        <Picker.Item label="강서구" value="강서구" />
                    </Picker>
                </View>
            </View>
            <NurseryList style={{marginTop: 10, flex: 1}} />
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

export default NurseryPage;