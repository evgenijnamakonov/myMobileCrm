import React, { Component } from 'react';
import { View, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native';
import firebase from 'react-native-firebase';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../actions/actions";
import { theme as colors } from "../conf/colors";

import { NavigationActions } from 'react-navigation'

const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'MainScreen' })
    ]
});

class CreateApp extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.database = firebase.database()
    }

    state = {
        name: '',
    };

    create() {
        let apps = this.database.ref().child('apps').child(this.props.token);
        apps.push({
            name:this.state.name,
        });
        this.props.navigation.dispatch(resetAction)
    }

    render() {
        return(
            <View style = {style.container}>
                <TextInput style = {style.nameInput} placeholder = 'Укажите название приложения/сайта'
                    onChangeText = {text => this.setState({name: text})} />
                <TouchableOpacity onPress = {() => this.create()} style = {style.saveBtn}>
                    <Text style = {style.saveBtnLabel}>Создать</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    nameInput: {
        width: 250,
        height: 50,
    },
    saveBtn: {
        width: 180,
        height: 42,
        borderRadius: 4,
        position: 'absolute',
        bottom: 12,
        left: '26%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.btnColor,
        elevation: 2,
    },
    saveBtnLabel: {
        color: '#fff',
        fontSize: 16
    }
});

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( Actions, dispatch );
}

function mapStateToProps( state ) {
    return {
        token: state.store.token
    }
}

export default connect( mapStateToProps, mapDispatchToProps )( CreateApp );