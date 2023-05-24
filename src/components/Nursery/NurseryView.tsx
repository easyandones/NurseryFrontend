import Nursery from './NurseryType';

import { FontAwesome5, Entypo, MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';


const NurseryView = (props: any) => {
    const nursery: Nursery = props.nursery;
    return (
        <View style={styles.container}>
            <Text style={styles.name}>
                {nursery.nurseryName}
            </Text>
            <Text style={styles.description}>
                {nursery.description}
            </Text>
            <View style={styles.infoArea}>
                <TouchableOpacity style={styles.infoBox}>
                    <View style={styles.infoTitleArea}>
                        <FontAwesome5 name="map-marker-alt" size={24} color="black" />
                        <Text style={styles.infoText}>{nursery.cityDistrict}</Text>
                    </View>
                    <Text style={styles.infoTitleText}>
                        위치
                    </Text>
                </TouchableOpacity>
                <View style={styles.infoBox}>
                    <View style={styles.infoTitleArea}>
                        <Entypo name="graduation-cap" size={24} color="black" />
                        <Text style={styles.infoText}>{nursery.teacherCount}명</Text>
                    </View>
                    <Text style={styles.infoTitleText}>
                        교원
                    </Text>
                </View>
                <View style={styles.infoBox}>
                    <View style={styles.infoTitleArea}>
                        <MaterialIcons name="child-care" size={24} color="black" />
                        <Text style={styles.infoText}>{nursery.studentCount}명</Text>
                    </View>
                    <Text style={styles.infoTitleText}>
                        원생
                    </Text>
                </View>
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
      borderRadius: 30,
    },
    name: {
        fontSize: 25,
    },
    description: {
        marginVertical: 10,
        fontSize: 18,
    },
    infoArea: {
        marginTop: 10,
        flexDirection: "row",
    },
    infoBox: {
        flex: 1,
    },
    infoTitleArea: {
        flexDirection: "row",
        gap: 5,
        alignItems: "center",
    },
    infoTitleText: {
        fontSize: 15,
    },
    infoText: {
        fontSize: 20,
        fontWeight: "500",
    },
});

export default NurseryView;