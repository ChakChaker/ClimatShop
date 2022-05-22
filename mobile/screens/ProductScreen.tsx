import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";

import React, { useEffect, useState } from "react";
import { Split } from "../shared";

export default function ProductScreen() {
    const [Split, setSplit] = useState<Split>();
    useEffect(() => {
        AsyncStorage.getItem("selected_split").then((result) => {
            if (result && result != "") setSplit(JSON.parse(result));
        });
    }, []);

    return (
        <View>
            {Split && (
                <View style={{ marginTop: "20px" }}>
                    <View>
                        <Text>Название: {Split.productName}</Text>
                        <Text>Производитель: {Split.productName}</Text>
                        <Text>Страна: {Split.productName}</Text>
                        <Text>Гарантия: {Split.warrany} года</Text>
                        <Text>
                            Мощность охлаждения: {Split.coolingPower} кВт
                        </Text>
                        <Text>Мощность нагрева: {Split.heatingPower} кВт</Text>
                        <Text>
                            Энергоэффективность: {Split.efficiencyRating}
                        </Text>
                        <Text>Цена: {Split.price}</Text>
                        <View
                            style={styles.separator}
                            lightColor="#eee"
                            darkColor="rgba(255,255,255,0.1)"
                        />
                    </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
});
