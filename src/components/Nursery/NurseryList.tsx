import Nursery from './NurseryType';

import { ScrollView, StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';
import NurseryView from './NurseryView';


const NurseryList = (props: any) => {
    const [nurseryList, setNurseryList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [cursor, setCursor] = useState("");
    const isCloseToBottom = (event: any) => {
        return event.layoutMeasurement.height + event.contentOffset.y >= event.contentSize.height - 20;
    };
    const getNurseryList = async() => {
        if (loading || !hasNextPage) {
            return;
        }
        setLoading(true);
        //const response = await fetch(
            //`https://api.kmu_wink.com/nurseryList?cursor=${cursor}&limit=20&token=${OAUTH_TOKEN}`,
            //{
                //method: "POST"
            //}
        //);
        //const json = await response.json();
        const json: any = {
            nurseryList: [
                {
                    id: 1,
                    nurseryName: "어린이집1",
                    description: "어린이집입니다.",
                    cityDistrict: "강남구",
                    address: "",
                    teacherCount: 13,
                    studentCount: 62
                },
                {
                    id: 2,
                    nurseryName: "어린이집2",
                    description: "어린이집입니다.",
                    cityDistrict: "강남구",
                    address: "",
                    teacherCount: 13,
                    studentCount: 62
                },
                {
                    id: 3,
                    nurseryName: "어린이집3",
                    description: "어린이집입니다.",
                    cityDistrict: "강남구",
                    address: "",
                    teacherCount: 13,
                    studentCount: 62
                },
                {
                    id: 4,
                    nurseryName: "어린이집4",
                    description: "어린이집입니다.",
                    cityDistrict: "강남구",
                    address: "",
                    teacherCount: 13,
                    studentCount: 62
                },
                {
                    id: 5,
                    nurseryName: "어린이집5",
                    description: "어린이집입니다.",
                    cityDistrict: "강남구",
                    address: "",
                    teacherCount: 13,
                    studentCount: 62
                },
                {
                    id: 6,
                    nurseryName: "어린이집6",
                    description: "어린이집입니다.",
                    cityDistrict: "강남구",
                    address: "",
                    teacherCount: 13,
                    studentCount: 62
                },
                {
                    id: 7,
                    nurseryName: "어린이집7",
                    description: "어린이집입니다.",
                    cityDistrict: "강남구",
                    address: "",
                    teacherCount: 13,
                    studentCount: 62
                },
            ],
            hasNextPage: true,
            cursor: "abcdefg"
        };
        setNurseryList([...nurseryList, ...json.nurseryList] as never);
        setHasNextPage(json.hasNextPage);
        setCursor(json.cursor);
        setLoading(false);
    };
    useEffect(() => {
        getNurseryList();
    }, []);
    return (
        <ScrollView
            onScroll={({nativeEvent}) => {
                if (isCloseToBottom(nativeEvent)) {
                    getNurseryList();
                }
            }}
            {...props}
        >
          <View style={styles.container}>
            {
                nurseryList.map((value: Nursery, index) => (
                <NurseryView key={index} nursery={value} />
                ))
            }
          </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 10,
        paddingVertical: 10,
    },
});

export default NurseryList;