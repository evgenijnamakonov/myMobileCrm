import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

import firebase from 'react-native-firebase';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../actions/actions";

import { NavigationActions } from 'react-navigation'
import { theme as colors } from "../conf/colors";
import { fonts } from "../conf/fonts";

const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'MainScreen' })
    ]
});

class AppSettings extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.database = firebase.database();
    }

    removeApp() {
        let item = this.database.ref('apps/'+this.props.token+'/'+this.props.navigation.state.params.id);
        console.log(item);
        item.remove();
        this.props.navigation.dispatch(resetAction)
    }

    render() {
        return(
            <View style = {local.container}>
                <TouchableOpacity style = {local.removeBtn} onPress = {() => this.removeApp()}>
                    <Text style = {local.removeBtnLabel}>Удалить приложение {this.props.navigation.state.params.id}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const local = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: '#fff',
    },
    removeBtn: {
        width: 310,
        paddingVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 4,
        backgroundColor: colors.accent,
        borderRadius: 3,
        elevation: 1
    },
    removeBtnLabel: {
        color: '#fff',
        fontSize: fonts.fontSize.big,
        fontFamily: fonts.fontFamily
    }
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

function mapStateToProps(state) {
    return {
        token: state.store.token
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppSettings);