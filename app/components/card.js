import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default class Card extends Component {

    constructor(props) {
        super(props)
    }

    openCard() {
        this.props.navigation.navigate('Application', {title: this.props.name})
    }

    render() {
        return(
            <TouchableOpacity onPress = {() => this.openCard()} style = {style.container}>
                <Text>{this.props.name}</Text>
            </TouchableOpacity>
        )
    }
}

const style = StyleSheet.create({
    container: {
        width: '95%',
        marginLeft: '2.5%',
        height: 200,
        backgroundColor: '#fff',
        elevation: 4,
        marginTop: 10,
        marginBottom: 8,
    }
});