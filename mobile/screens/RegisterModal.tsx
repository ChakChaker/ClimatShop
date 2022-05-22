import axios from "axios";
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
import config from "../shared";
import MD5 from "crypto-js/md5";

export default function RegisterModal( { navigation } : any) {
    const [name, onNameChange] = React.useState("");
    const [passwordOne, onPasswordOneChange] = React.useState("");

    const [passwordTwo, onPasswordTwoChange] = React.useState("");

    const Register = () => {
        if (name && passwordOne && passwordTwo) {
            if (passwordOne !== passwordTwo) {
                onPasswordOneChange("Пароли не совпадают");
                onPasswordTwoChange("Пароли не совпадают");
            }
            axios
                .post(`${config.API_URL}/register`, {
                    username: name,
                    password: MD5(passwordOne).toString(),
                })
                .then((response) => {
                    navigation.navigate('Login')
                })
                .catch((error) => {
                    console.log(error);
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
            <TextInput
                style={styles.input}
                onChangeText={onPasswordTwoChange}
                value={passwordTwo}
                placeholder={"Повторите пароль"}
            />
            <Button onPress={Register} title="Зарегестрироватся" />
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
