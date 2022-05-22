import { StyleSheet, Button, ScrollView } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";
import config from "../shared";
export default function ShopScreen({ navigation }: RootTabScreenProps<"Shop">) {
    const [splitList, setSplitList] = useState<Split[]>([]);

    const LoadSplits = () => {
        axios.get(config.API_URL + "/split").then((result) => {
            setSplitList(result.data as Split[]);
        });
    };

    return (
        <View style={styles.container}>
            {/* <Text style={styles.title}>Ката</Text> */}
            <ScrollView>
                {splitList.map((element) => {
                    return (
                        <View key={element.productName}>
                            <Text>Название: {element.productName}</Text>
                            <Text>Производитель: {element.productName}</Text>
                            <Text>Страна: {element.productName}</Text>
                            <Text>Гарантия: {element.warrany} года</Text>
                            <Text>
                                Мощность охлаждения: {element.coolingPower} кВт
                            </Text>
                            <Text>
                                Мощность нагрева: {element.heatingPower} кВт
                            </Text>
                            <Text>
                                Энергоэффективность: {element.efficiencyRating}
                            </Text>
                            <Text>Цена: {element.price}</Text>
                            <View
                                style={styles.separator}
                                lightColor="#eee"
                                darkColor="rgba(255,255,255,0.1)"
                            />
                        </View>
                    );
                })}
            </ScrollView>

            <Button onPress={LoadSplits} title="Загрузить данные" />
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
});

export interface Split {
    productName: string;
    country: string;
    manufacturer: string;
    warrany: string;
    coolingPower: number;
    heatingPower: number;
    efficiencyRating: string;
    price: number;
    image: string;
}
