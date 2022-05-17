import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import {
    StyleSheet,
    View, Text
} from "react-native";
import { notificationService } from "../services/notificationService";


const NotificationsScreen = ({ route }) => {

    const { user } = useAuth();
    const [nots, setNots] = useState()
    useEffect(() => {
        getData()
    })


    const getData = async () => {
        const nots = await notificationService.getAllById(user.id)
        setNots(nots)
    }

    return (
        <View >
            <Text>ddddd</Text>
            {nots.map(not => {
                <>
                    <Text>
                        {not.title}
                    </Text>
                    <Text>
                        {not.desc}
                    </Text>
                </>
            })}
        </View>
    );
};

export default NotificationsScreen;

const styles = StyleSheet.create({

});
