import React, { Component } from 'react';
import {
    View,
    KeyboardAvoidingView,
    StatusBar,
    ToastAndroid,
    TouchableOpacity,
    Text,
    TextInput,
    Platform,
    AsyncStorage,
    ActivityIndicator
} from 'react-native';
import firebase from 'react-native-firebase';
import { NavigationActions } from "react-navigation";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../actions/actions";

import { theme } from "../conf/colors";
import { styles } from "../styles";

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            isLoading: false,
            isPasswordValid: true,
            isEmailValid: true
        }
    }

    showToast(message) {
        return (
            Platform.OS === 'android' && ToastAndroid.showWithGravityAndOffset(
                message,
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                0,
                32
            )
        )
    }

    saveToken(token) {
        AsyncStorage.setItem('token', token).then(() => {
            this.props.setToken(token);
            this.setState({ isLoading: false });
            this.props.navigation.dispatch(NavigationActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'MainScreen' })],
                })
            );
        })
    }

    logIn() {
        if ( this.state.password !== '' && this.state.email !== '' ) {
            this.setState({ isLoading: true });
            firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((credential) => {
                this.showToast('Вы успешно авторизовались');
                this.setState({ isEmailValid: true, isPasswordValid: true });
                this.saveToken()
            }).catch((ExtendedError) => {
                switch ( ExtendedError.code ) {
                    case 'auth/invalid-email':
                        this.showToast('Некорректный email');
                        return this.setState({ isEmailValid: false, isLoading: false });
                    case 'auth/wrong-password':
                        this.showToast('Неверный пароль');
                        return this.setState({ isPasswordValid: false, isLoading: false });
                    case 'auth/user-not-found':
                        this.showToast('Такой пользователь не найден');
                        return this.setState({ isEmailValid: false, isPasswordValid: false, isLoading: false });
                    case 'auth/user-disabled':
                        this.showToast('Пользователь заблокирован');
                        return this.setState({ isEmailValid: false, isPasswordValid: false, isLoading: false });
                    default:
                        return this.setState({ isEmailValid: false, isPasswordValid: false, isLoading: false });
                }
            })
        }
        else {
            this.showToast('Заполните все поля');
            return this.setState({ isPasswordValid: false, isEmailValid: false });
        }
    }

    singUp() {
        this.props.navigation.navigate('Registration')
    }

    render() {
        return (
            <View style = {styles.mainContainer}>
                <StatusBar backgroundColor = {theme.dark} />
                <KeyboardAvoidingView keyboardVerticalOffset = {0} behavior = 'padding' style = {styles.loginContainer}>
                    <TextInput underlineColorAndroid = 'transparent' placeholder = 'Email'
                               onChangeText = {text => this.setState({ email: text, isEmailValid: true })}
                               style = {[styles.loginTextInput, {
                                   borderColor: this.state.isEmailValid ? '#eee' : '#ee604e',
                               }]} />
                    <TextInput underlineColorAndroid = 'transparent' placeholder = 'Пароль'
                               secureTextEntry = {true}
                               onChangeText = {text => this.setState({ password: text, isPasswordValid: true })}
                               style = {[styles.loginTextInput, {
                                   borderColor: this.state.isPasswordValid ? '#eee' : '#ee604e',
                               }]} />
                </KeyboardAvoidingView>
                <View style = {styles.loginBtnWrapper}>
                    <TouchableOpacity onPress = {() => this.logIn()} style = {styles.loginButton}>
                        {
                            this.state.isLoading
                                ? <ActivityIndicator size = 'small' color = '#fff' />
                                : <Text style = {styles.loginButtonLabel}>Войти</Text>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {() => this.singUp()} style = {styles.singUpRef}>
                        <Text style = {styles.singUpRefLabel}>Зарегистрироваться</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( Actions, dispatch );
}

function mapStateToProps( state ) {
    return {}
}

export default connect( mapStateToProps, mapDispatchToProps )( Login );