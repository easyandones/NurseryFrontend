import { StyleSheet, TextInput } from 'react-native';


const LineEdit = (props: any) => {
    return (
        <TextInput
            style={styles.lineEdit}
            {...props}
        />
    );
};

const styles = StyleSheet.create({
    lineEdit: {
        backgroundColor: "lightgray",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 30,
    },
});

export default LineEdit;