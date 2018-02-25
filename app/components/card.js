import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default class Card extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return(
            <View style = {style.container}>
                <Text>{this.props.name}</Text>
            </View>
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