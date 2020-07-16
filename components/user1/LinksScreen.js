import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
var ScrollableTabView = require('react-native-scrollable-tab-view');

export default function LinksScreen() {
    return (
        <ScrollableTabView>
            <TouchableOpacity tabLabel='Todo'>
                <View style={styles.container}>
                    <ScrollView >
                        <Text>Lets go back! Lets go back! Lets go back! Lets go back! Lets go back! Lets go back!</Text>
                    </ScrollView>
                </View>
            </TouchableOpacity>
            <TouchableOpacity tabLabel='Done'>
                <ScrollView styles={{ flex: 1 }}>
                    <Text>Lets go back!</Text>
                </ScrollView>
            </TouchableOpacity>
            <TouchableOpacity tabLabel='Scheduled'>
                <ScrollView styles={{ flex: 1 }}>
                    <Text>Lets go back!</Text>
                </ScrollView>
            </TouchableOpacity>
            <TouchableOpacity tabLabel='Other'>
                <ScrollView styles={{ flex: 1 }}>
                    <Text>Lets go back!</Text>
                </ScrollView>
            </TouchableOpacity>
        </ScrollableTabView>
    );
}


function OptionButton({ icon, label, onPress, isLastOption }) {
    return (
        <RectButton style={[styles.option, isLastOption && styles.lastOption]} onPress={onPress}>
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.optionIconContainer}>
                    <Ionicons name={icon} size={22} color="rgba(0,0,0,0.35)" />
                </View>
                <View style={styles.optionTextContainer}>
                    <Text style={styles.optionText}>{label}</Text>
                </View>
            </View>
        </RectButton>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingLeft: 10,
        paddingRight: 10
    },
    contentContainer: {
        paddingTop: 45,
    },
    optionIconContainer: {
        marginRight: 12,
    },
    option: {
        backgroundColor: '#fdfdfd',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: 0,
        borderColor: '#ededed',
    },
    lastOption: {
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    optionText: {
        fontSize: 15,
        alignSelf: 'flex-start',
        marginTop: 1,
    },
});
