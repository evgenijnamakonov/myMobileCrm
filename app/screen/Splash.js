import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../actions/actions";

class Splash extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        AsyncStorage.getItem('token').then((token) => {
            if ( token ) {
                this.props.setToken(token);
                this.reset('MainScreen')
            }
            else {
                this.reset('Login')
            }
        });
    }

    reset(routeName) {
        this.props.navigation.dispatch(NavigationActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: routeName })],
            })
        );
    }

    render() {
        return null;
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
