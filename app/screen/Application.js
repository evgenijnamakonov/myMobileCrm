import React, { Component } from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import SettingsButton from "../components/settingsButton";
import { fonts } from "../conf/fonts";

import { MarkdownView } from 'react-native-markdown-view'

export default class Application extends Component {

    constructor(props) {
        super(props)
    }

    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.title,
        headerRight: <SettingsButton id = {navigation.state.params.id} navigation = {navigation} />
    });

    renderInstructions() {
        return (
            <View style = {local.container}>
                <Text selectable = {true}>
                    <Text style = {local.instructionsLabel}>Вставьте эти строчки в ваш </Text>
                    <Text style = {local.code}>index.html</Text>
                    <Text style = {local.instructionsLabel}> файл</Text>
                    <Text style = {local.code}>
                        {
                            '\n\n<script type = "text/javascript">\n' +
                            '  let token = "' + this.props.navigation.state.params.token + '";\n' +
                            '  let id = "' + this.props.navigation.state.params.id + '";\n' +
                            '</script>\n\n'
                        }
                    </Text>
                </Text>
                <Text>
                    <Text style = {local.instructionsLabel}>Скачайте этот файл и перенесите в папку с проектом: </Text>
                    <Text
                        onPress = {() => Linking.openURL('https://github.com/evgenijnamakonov/evgenijnamakonov.github.io')}
                        style = {local.link}>myMobileCrm.js</Text>
                </Text>
                <Text>
                    <Text style = {local.instructionsLabel}>{'\nДалее следуйте документации:  '}</Text>
                    <Text
                        onPress = {() => Linking.openURL('https://github.com/evgenijnamakonov/evgenijnamakonov.github.io')}
                        style = {local.link}>https://github.com/evgenijnamakonov/evgenijnamakonov.github.io</Text>
                </Text>
            </View>
        )
    }

    renderRegularContent() {
        return (
            <View></View>
        )
    }

    render() {
        if ( this.props.navigation.state.params.newApp ) {
            return this.renderInstructions()
        }
        else {
            return this.renderRegularContent()
        }
    }
}

const local = StyleSheet.create({
    code: {
        fontSize: fonts.fontSize.primary,
        backgroundColor: 'rgba(128, 128, 128, 0.1)',
        color: '#ce6a40',
        fontWeight: '600',
        fontFamily: fonts.fontFamilyCode
    },
    link: {
        fontSize: fonts.fontSize.primary,
        color: '#1184ce',
        textDecorationLine: 'underline',
        fontFamily: fonts.fontFamily
    },
    container: {
        width: '100%',
        paddingVertical: 8,
        paddingHorizontal: 8,
        height: '100%',
        backgroundColor: '#fff',
    },
    instructionsLabel: {
        fontSize: fonts.fontSize.big,
        color: '#333',
        fontFamily: fonts.fontFamily
    }
});