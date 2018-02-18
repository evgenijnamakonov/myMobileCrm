import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { theme } from "../conf/colors";

import Account from "../components/accountBtn";

export default class MainScreen extends Component {

    constructor(props) {
        super(props)
    }

    static navigationOptions = ({navigation}) => ({
        headerRight: <Account navigation = {navigation} />
    });

    render() {
        return(
            <View>
                <StatusBar backgroundColor = {theme.dark} />
            </View>
        )
    }
}