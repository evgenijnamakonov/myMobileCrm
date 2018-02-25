import React, { Component } from 'react';
import { View, StatusBar, TouchableOpacity, Text, StyleSheet, FlatList } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../actions/actions";
import Card from "../components/card";
import Community from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme as colors, theme } from "../conf/colors";

import firebase from 'react-native-firebase';

import Account from "../components/accountBtn";
import { styles } from "../styles";

class MainScreen extends Component {

    constructor(props) {
        super(props);
        this.database = firebase.database();
    }

    componentDidMount() {

        let listener = this.database.ref('apps/' + this.props.token);

        listener.on('value', (snapshot) => {
            console.log(snapshot)
            let cards = [];
            if ( snapshot._value ) {
                cards.push(snapshot._value);
            }
            this.setState({ cards: cards })
        });

    }

    state = {
        cards: []
    };

    static navigationOptions = ({ navigation }) => ({
        headerRight: <Account navigation = {navigation} />
    });

    addApplication() {
        this.props.navigation.navigate('CreateApp')
    }

    renderPlaceholder() {
        return (
            <View style = {local.placeholderContainer}>
                <Text style = {local.placeholderText}>Создайте свое приложение</Text>
            </View>
        )
    }

    renderCardList() {
        return (
            <View style = {styles.cardListWrapper}>
                <FlatList
                    data = {this.state.cards}
                    style = {local.flatList}
                    renderItem = {({ item }) => {
                        return (
                            Object.keys(item).map((child) => {
                                return (
                                    <Card navigation = {this.props.navigation} name = {item[child].name} />
                                )
                            }))
                    }}
                />
            </View>
        )
    }

    renderActionButton() {
        return (
            <TouchableOpacity onPress = {() => this.addApplication()} style = {local.actionButton}>
                <Community name = 'plus' style = {local.actionButtonIcon} />
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style = {styles.cardListContainer}>
                <StatusBar backgroundColor = {theme.dark} />
                {
                    this.state.cards[0]
                        ? this.renderCardList()
                        : this.renderPlaceholder()
                }
                {this.renderActionButton()}
            </View>
        )
    }
}

const local = StyleSheet.create({
    actionButton: {
        width: 55,
        height: 55,
        elevation: 5,
        position: 'absolute',
        bottom: 12,
        right: 12,
        borderRadius: 28,
        backgroundColor: colors.btnColor,
        justifyContent: 'center',
        alignItems: 'center'
    },
    actionButtonIcon: {
        color: '#fff',
        fontSize: 24
    },
    flatList: {
        width: '100%',
    },
    placeholderContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        fontSize: 16,
        color: '#999'
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

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);