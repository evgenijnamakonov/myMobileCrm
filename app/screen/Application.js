import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SettingsButton from "../components/settingsButton";

export default class Application extends Component {

    constructor(props) {
        super(props)
    }

    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.title,
        headerRight: <SettingsButton id = {navigation.state.params.id} navigation = {navigation} />
    });

    render() {
        return(
            <View>

            </View>
        )
    }
}