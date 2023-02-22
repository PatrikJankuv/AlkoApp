import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

import Onboarding from 'react-native-onboarding-swiper';

// @ts-ignore
const Dots = ({selected}) => {
    let backgroundColor;

    backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';

    return (
        <View
            style={{
                width:6,
                height: 6,
                marginHorizontal: 3,
                backgroundColor
            }}
        />
    );
}

const Skip = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Skip</Text>
    </TouchableOpacity>
);

const Next = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Next</Text>
    </TouchableOpacity>
);

const Done = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Done</Text>
    </TouchableOpacity>
);

// @ts-ignore
const OnboardingScreen = ({navigation}) => {
    return (
        <Onboarding
            SkipButtonComponent={Skip}
            NextButtonComponent={Next}
            DoneButtonComponent={Done}
            DotComponent={Dots}
            onSkip={() => navigation.replace("Login")}
            onDone={() => navigation.navigate("Login")}
            pages={[
                {
                    backgroundColor: '#fff',
                    image: <Image source={require('../assets/illustrations/LovingDoodle.svg')} />,
                    title: 'Vítej v AlkoApp!',
                    subtitle: 'Užívání alkoholu může mít vliv na Tvé zdraví, proto Ti touto aplikací chceme pomoct dostat své pití alkoholu pod kontrolu, ale přitom nemusíš nutně abstinovat.',
                },
                {
                    backgroundColor: '#fff',
                    image: <Image source={require('../assets/illustrations/MessyDoodle.svg')} />,
                    title: 'Vše potřebné máš v ruce',
                    subtitle: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec quis nibh at felis congue commodo. Etiam dui sem, fermentum vitae, sagittis id, malesuada in, quam.',
                },
                {
                    backgroundColor: '#fff',
                    image: <Image source={require('../assets/illustrations/UnboxingDoodle.svg')} />,
                    title: 'Šité na míru',
                    subtitle: "Zkus s AlkoApp plánovat, kdy a kolik pít a naopak, kdy nepít. Zapisuj si čárky na vlastní \"nápojový lístek\". Sleduj své uživatelské zvyky, nálady a pocity a co spouští Tvou chuť na alkohol.",
                },
            ]}
        />
    );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});


// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     heading: {
//
//     }
// });
