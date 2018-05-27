import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../actions/actions";
import QuitButton from "../components/quitButton";

class Settings extends Component {

    constructor(props) {
        super(props)
    }

    static navigationOptions = ({ navigation }) => ({
        headerRight: <QuitButton navigation = {navigation} />
    });

    render() {
        return (
            <View style = {local.container}>
                <Text style = {{ fontSize: 16, color: '#333' }}>
                    <Text style = {{fontWeight: '600'}}>Email: </Text>
                    <Text>{this.props.email}</Text>
                </Text>
            </View>
        )
    }
}

const local = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        padding: 12,
        backgroundColor: '#fff',
    }
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

function mapStateToProps(state) {
    return {
        email: state.store.email
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);