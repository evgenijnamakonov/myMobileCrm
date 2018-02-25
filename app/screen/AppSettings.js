import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';

import firebase from 'react-native-firebase';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../actions/actions";

class AppSettings extends Component {

    constructor(props) {
        super(props);

        this.database = firebase.database();
    }

    removeApp() {
        let item = this.database.ref('apps/'+this.props.token+'/'+this.props.navigation.state.params.id);
        console.log(item);
        item.remove();
        this.props.navigation.navigate('MainScreen')
    }

    render() {
        return(
            <View>
                <TouchableOpacity onPress = {() => this.removeApp()}>
                    <Text>Удалить приложение {this.props.navigation.state.params.id}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

function mapStateToProps(state) {
    return {
        token: state.store.token
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppSettings);