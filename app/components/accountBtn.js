import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from "../styles";

export default class Account extends Component {

    constructor(props) {
        super(props)
    }

    toSettings() {
        this.props.navigation.navigate('Settings');
    }

    render() {
        return(
            <TouchableOpacity onPress = {() => this.toSettings()} style = {styles.accountBtn}>
                <Ionicons name = 'ios-contact' style = {styles.accountIcon}/>
            </TouchableOpacity>
        )
    }
}