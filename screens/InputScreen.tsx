import React from "react";
import {TextInput, View, Text, StyleSheet, ScrollView} from "react-native";
import Input from "../src/components/Input";

// @ts-ignore
const InputScreen = ({navigation}) => {
    const data = [
        {
            label: "Jak Tě mám oslovovat?",
            placeholder: "Tvé jméno"
        },
        {
            label: "Kolik Ti je let?",
            placeholder: "Tvůj věk"
        },
        {
            label: "Jaká je Tvoje váha?",
            placeholder: "Tvoje váha"
        },
        {
            label: "Jaká je Tvoje výška?",
            placeholder: "Tvoje výška"
        },
    ]
    return (
        <View style={styles.container}>
            {/*<Input>*/}
            {/*    labelValue={data.label}*/}
            {/*    placeholder={data.placeholder}*/}
            {/*</Input>*/}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default InputScreen;