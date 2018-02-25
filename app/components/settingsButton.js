import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from "../styles";

export default class SettingsButton extends Component {

    constructor(props) {
        super(props)
    }

    toSettings() {
        this.props.navigation.navigate('AppSettings', {id: this.props.navigation.state.params.id});
    }

    render() {
        return(
            <TouchableOpacity onPress = {() => this.toSettings()} style = {styles.accountBtn}>
                <Ionicons name = 'md-settings' style = {styles.settingsIcon}/>
            </TouchableOpacity>
        )
    }
}