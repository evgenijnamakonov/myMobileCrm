import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { theme } from "../conf/colors";

export default class MainScreen extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return(
            <View>
                <StatusBar backgroundColor = {theme.dark} />
            </View>
        )
    }
}