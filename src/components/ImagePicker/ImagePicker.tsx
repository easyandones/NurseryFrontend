import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import * as ImagePickerLib from 'expo-image-picker';
import { useState, useEffect } from 'react';
import { Entypo } from '@expo/vector-icons';


const ImagePicker = (props: any) => {
    const [image, setImage] = useState(props.currentImage || "");

    const pickImage = async () => {
        console.log("start");
        let result = await ImagePickerLib.launchImageLibraryAsync({
            mediaTypes: ImagePickerLib.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
            allowsMultipleSelection: false,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    }

    useEffect(() => {
        if (image) {
            if (props.callback)
                props.callback(image);
        }
    }, [image]);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={{flex: 1, justifyContent: "center", alignItems: "center"}} onPress={pickImage}>
                {image && !props.hideImage ?
                    <Image style={{flex: 1, aspectRatio: 1}} source={{uri: image}} />
                :
                    <Entypo name="folder-images" size={48} color="black" />
                }
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        aspectRatio: 1,
        backgroundColor: "white",
        borderRadius: 10,
        overflow: "hidden",
    },
});

export default ImagePicker;