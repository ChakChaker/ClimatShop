import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { useState } from "react";
import axios from "axios";
import { UserInfo } from "../shared";

export default function MyAccountScreen( { navigation, userData } : any) {

    const [userInfo, SetUserInfo] = useState<UserInfo | null>(null);
    AsyncStorage.getItem("account").then((result) => {
        if (result) SetUserInfo(JSON.parse(result));
    });
	if(userData)
	SetUserInfo(userData)
    const Login = () => {
		navigation.navigate('Login')
	};
    const Register = () => {
		navigation.navigate('Register')
	};
	const LogOut = () =>
	{
		SetUserInfo(null);
		AsyncStorage.removeItem("account");

	}

    return (
        <View style={styles.container}>
            <View>
                {!userInfo && (
                    <View>
                        <Text style={styles.title}>Вы не залогинены</Text>
                        <Button onPress={Login} title="Логин" color="green" />
                        <Button onPress={Register} title="Регистрация" />
                    </View>
                )}
                {userInfo && <View>
					
					<Text>Добро пожаловать: {userInfo.username}</Text>
					<Button onPress={LogOut} color="red" title="Выйти из аккаунта" />
					</View>}
            </View>
            <View
                style={styles.separator}
                lightColor="#eee"
                darkColor="rgba(255,255,255,0.1)"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
	input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});

