import { StyleSheet, View, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import ImagePicker from './ImagePicker';


const MultipleImagePicker = (props: any) => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        if (props.onChange)
            props.onChange(images);
    }, [images]);

    return (
        <View style={styles.container}>
            <ScrollView horizontal>
                <View style={{gap: 5, flexDirection: "row"}}>
                    {images.map((value: string, index) => (
                        <ImagePicker key={index} currentImage={value} callback={(image: any) => {
                            let newImages: any = [...images];
                            newImages[index] = image;
                            setImages(newImages);
                        }} />
                    ))}
                    <ImagePicker hideImage callback={(image: never) => {
                        setImages([...images, image]);
                    }} />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 100,
        backgroundColor: "lightgray",
        borderRadius: 15,
        padding: 5,
    },
});

export default MultipleImagePicker;