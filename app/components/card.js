import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { fonts } from "../conf/fonts";

export default class Card extends Component {

    constructor(props) {
        super(props)
    }

    openCard() {
        this.props.navigation.navigate('Application', {
            title: this.props.item.name,
            data: this.props.item,
            id: this.props.id
        })
    }

    renderTasks() {
        return null
    }

    getOrdersCount() {
        if ( this.props.item.orders ) {
            return Object.keys(this.props.item.orders).length
        }
    }

    getUsersCount() {
        if ( this.props.item.users ) {
            return Object.keys(this.props.item.users).length
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
                                    <Text style = {style.addressText}>{this.props.item.orders[item].amount} шт.</Text>
                                    <Text style = {style.addressText}>{this.props.item.orders[item].phone}</Text>
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
            <TouchableOpacity onPress = {() => this.openCard()} style = {style.container}>
                <Text style = {style.name}>{this.props.item.name}</Text>
                <View style = {style.infoContainer}>
                    <Text style = {style.ordersAmountText}>Общее число заказов: {this.getOrdersCount() || 0}</Text>
                    <Text style = {style.ordersAmountText}>Всего пользователей: {this.getUsersCount() || 0}</Text>
                </View>
                {this.renderOrders()}
                {this.renderTasks()}
            </TouchableOpacity>
        )
    }
}

const style = StyleSheet.create({
    infoContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 10
    },
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
        paddingHorizontal: 10,
        backgroundColor: '#e7f1ff',
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
        color: '#333',
        fontSize: fonts.fontSize.giant,
        fontFamily: fonts.fontFamilyBold
    },
    ordersAmountText: {
        marginLeft: 10,
        color: '#333',
        fontSize: fonts.fontSize.primary,
        fontFamily: fonts.fontFamily
    }
});