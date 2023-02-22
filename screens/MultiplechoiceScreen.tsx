import React from "react";
import {TextInput, View, Text, StyleSheet, ScrollView} from "react-native";
import Input from "../src/components/Input";

// @ts-ignore
const MultiplechoiceScreen = ({navigation}) => {
    const data = [
        {
            question: "Jak často se napijete nějakého alkoholického nápoje včetně piva?",
            explaination: "",
            choice: [
                "Nikdy",
                "Jednou měsíčně nebo méně často",
                "Dva až čtyřikrát měsíčně",
                "Dva až třikrát týdně",
                " Čtyřikrát nebo vícekrát týdně"
            ]
        },
        {
            question: "Kolik sklenic alkoholického nápoje si dáte v typický den, kdy něco pijete?",
            explaination: "Pojem „standardní sklenice“ se rozumí v této verzi dotazníku půl litru 12° piva, 2 „deci“ vína nebo 0,05 l destilátu (velký panák)",
            choice: [
                "1 nebo 2",
                " 3 nebo 4",
                " 5 nebo 6",
                " 7 nebo 8",
                " 10 nebo více "
            ]
        },
        {
            question: "Jak často vypijete 3 nebo více standardních sklenic alkoholického nápoje při jedné příležitosti? ",
            explaination: "Pojem „standardní sklenice“ se rozumí v této verzi dotazníku půl litru 12° piva, 2 „deci“ vína nebo 0,05 l destilátu (velký panák)",
            choice: [
                "Nikdy",
                "Méně než jednou za měsíc",
                "Každý měsíc",
                "Každý týden",
                "Denně nebo téměř denně "
            ]
        },
        {
            question: "Jak často vypijete 3 nebo více standardních sklenic alkoholického nápoje při jedné příležitosti? ",
            explaination: "Pojem „standardní sklenice“ se rozumí v této verzi dotazníku půl litru 12° piva, 2 „deci“ vína nebo 0,05 l destilátu (velký panák)",
            choice: [
                "Nikdy",
                "Méně než jednou za měsíc",
                "Každý měsíc",
                "Každý týden",
                "Denně nebo téměř denně "
            ]
        },
        {
            question: "Jak často vypijete 3 nebo více standardních sklenic alkoholického nápoje při jedné příležitosti? ",
            explaination: "Pojem „standardní sklenice“ se rozumí v této verzi dotazníku půl litru 12° piva, 2 „deci“ vína nebo 0,05 l destilátu (velký panák)",
            choice: [
                "Nikdy",
                "Méně než jednou za měsíc",
                "Každý měsíc",
                "Každý týden",
                "Denně nebo téměř denně "
            ]
        },
    ]
    return (
        <View style={styles.container}>
            {/*<Input>*/}
            {/*    labelValue={data[1]}*/}
            {/*    placeholder={data[2]}*/}
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

export default MultiplechoiceScreen;