import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation'

export default class Splash extends Component {

    constructor( props ) {
        super( props );
    }

    componentDidMount() {
        AsyncStorage.getItem( 'token' ).then( ( token ) => {
            if ( token ) {
                this.reset( 'Scanner' )
            }
            else {
                this.reset( 'Login' )
            }
        } );
        this.reset( 'Login' )
    }

    reset( routeName ) {
        this.props.navigation.dispatch( NavigationActions.reset( {
                index: 0,
                actions: [NavigationActions.navigate( { routeName: routeName } )],
            } )
        );
    }

    render() {
        return (
            <View />
        )
    }
}
