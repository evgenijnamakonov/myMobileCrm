import React, { Component } from 'react';
import { View, TouchableOpacity, Alert, Text, TextInput, StyleSheet } from 'react-native';
import firebase from 'react-native-firebase';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../actions/actions";
import { theme as colors } from "../conf/colors";

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
        let id = apps.push({
            name: this.state.name,
        }).key;

        if ( id ) {

            Alert.alert('Создание приложения',
                'Приложение создано успешно. Следуйте инструкциям на следующем экране.',
                [
                    {
                        text: 'ок',
                        onPress: () => this.props.navigation.navigate({
                            routeName: 'Application',
                            params: { title: this.state.name, id: id, token: this.props.token, newApp: true }
                        }),
                    },
                ],
                { cancelable: false });
        }
    }

    render() {
        return (
            <View style = {style.container}>
                <TextInput style = {style.nameInput} placeholder = 'Укажите название приложения/сайта'
                           underlineColorAndroid = 'transparent'
                           onChangeText = {text => this.setState({ name: text })} />
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    nameInput: {
        width: '90%',
        textAlign: 'center',
        borderRadius: 6,
        borderWidth: 1.5,
        borderColor: '#ddd',
        height: 50,
    },
    saveBtn: {
        width: 180,
        height: 42,
        borderRadius: 4,
        marginTop: 12,
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

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

function mapStateToProps(state) {
    return {
        token: state.store.token,
        email: state.store.email
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateApp);