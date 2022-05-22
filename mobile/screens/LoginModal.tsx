import axios from "axios";
import { MD5 } from "crypto-js";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
    Button,
    Platform,
    SafeAreaView,
    StyleSheet,
    TextInput,
} from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import navigation from "../navigation";
import config from "../shared";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginModal({ navigation }: any) {
    const [name, onNameChange] = React.useState("");
    const [passwordOne, onPasswordOneChange] = React.useState("");
    const LogIn = () => {
        if (name && passwordOne) {
            axios
                .post(`${config.API_URL}/login`, {
                    username: name,
                    password: MD5(passwordOne).toString(),
                })
                .then((response) => {
                    AsyncStorage.setItem("account", JSON.stringify(response.data));
                    navigation.navigate("MyAccount", response.data);
                })
                .catch((error) => {
                    onPasswordOneChange("Пароль несовпадает!")
                });
        }
    };
    return (
        <SafeAreaView>
            <TextInput
                style={styles.input}
                onChangeText={onNameChange}
                value={name}
                placeholder={"Введите имя"}
            />
            <TextInput
                style={styles.input}
                onChangeText={onPasswordOneChange}
                value={passwordOne}
                placeholder={"Введите пароль"}
            />
            <Button onPress={LogIn} title="Войти" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});
