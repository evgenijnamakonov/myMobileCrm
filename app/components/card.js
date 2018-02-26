import React, { Component } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { fonts } from "../conf/fonts";
import { styles } from "../styles";

export default class Card extends Component {

    constructor(props) {
        super(props)
    }

    openCard() {
        this.props.navigation.navigate('Application', { title: this.props.item.name, id: this.props.id })
    }

    renderTasks() {
        return null
    }

    getOrdersCount() {
        if ( this.props.item.orders ) {
            return Object.keys(this.props.item.orders).length
        }
    }

    renderOrders() {
        if ( this.props.item.orders ) {
            return (
                <View style = {style.flatListWrapper}>
                    <View style = {style.newOrdersTextWrapper}>
                        <Text style = {style.newOrdersText}>Последние заказы:</Text>
                    </View>
                    <FlatList
                        data = {Object.keys(this.props.item.orders)}
                        contentContainerStyle = {style.flatList}
                        ItemSeparatorComponent = {() => <View style = {style.separator} />}
                        ListFooterComponent = {() => <View style = {style.separator} />}
                        ListHeaderComponent = {() => <View style = {style.separator} />}
                        showsHorizontalScrollIndicator = {false}
                        horizontal = {true}
                        renderItem = {({ item }) => {
                            return (
                                <TouchableOpacity onPress = {() => this.openCard()} style = {style.itemContainer}>
                                    <Text style = {style.addressText}>{this.props.item.orders[item].address}</Text>
                                    <Text style = {style.addressText}>{this.props.item.orders[item].name}</Text>
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View>
            )
        }
    }

    render() {
        return (
            <View style = {style.container}>
                <Text style = {style.name}>{this.props.item.name}</Text>
                <Text style = {style.ordersAmountText}>Общее число заказов: {this.getOrdersCount()}</Text>
                {this.renderOrders()}
                {this.renderTasks()}
            </View>
        )
    }
}

const style = StyleSheet.create({
    addressText: {
        fontSize: fonts.fontSize.primary,
        fontFamily: fonts.fontFamily,
        color: '#333'
    },
    newOrdersText: {
        fontSize: fonts.fontSize.primary,
        fontFamily: fonts.fontFamily,
        color: '#333'
    },
    newOrdersTextWrapper: {
        height: 30,
        justifyContent: 'center',

        marginLeft: 10,
    },
    separator: { width: 10 },
    itemContainer: {
        width: 155,
        height: 100,
        paddingVertical: 10,
        borderRadius: 3,
        paddingHorizontal: 10,
        backgroundColor: '#e0f1ff',
    },
    container: {
        width: '95%',
        marginLeft: '2.5%',
        paddingVertical: 8,
        height: 200,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        elevation: 4,
        marginTop: 10,
        marginBottom: 8,
    },
    flatList: {
        alignItems: 'center'
    },
    flatListWrapper: {
        width: '100%',
        height: 130,
    },
    name: {
        marginLeft: 10,
        fontSize: fonts.fontSize.giant,
        fontFamily: fonts.fontFamily
    },
    ordersAmountText: {
        marginLeft: 10,
        fontSize: fonts.fontSize.primary,
        fontFamily: fonts.fontFamily
    }
});