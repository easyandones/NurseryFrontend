import Comment from '../../Types/Comment';

import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';


const CommentView = (props: any) => {
    const comment: Comment = props.comment;
    return (
        <View style={styles.container}>
            <View style={{flexDirection: "row", alignItems: "center", gap: 5}}>
                <Image style={styles.userProfileImage} source={{uri: comment.user.profileImageURL}} />
                <Text style={{fontWeight: "500"}}>{comment.user.displayName}</Text>
                {comment.isOwner ?
                    <View style={{flexDirection: "row", marginLeft: "auto", alignItems: "center"}}>
                        <TouchableOpacity onPress={props.commentDeleteHandler} style={{borderRadius: 5, backgroundColor: "red", paddingHorizontal: 12, paddingVertical: 8}}>
                            <FontAwesome name="trash" size={16} color="white" />
                        </TouchableOpacity>
                    </View>
                :
                    null
                }
            </View>
            <Text>{comment.content}</Text>
            <Text style={{color: "gray"}}>{comment.createdAt}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 5,
        backgroundColor: "#f0f0f0",
        paddingVertical: 5,
        paddingLeft: 10,
        paddingRight: 5,
    },
    userProfileImage: {
        width: 30,
        height: 30,
        borderRadius: 5,
    }
});

export default CommentView;