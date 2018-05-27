import React, { Component } from 'react';
import { View, Text, Dimensions, ART, Alert, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import firebase from 'react-native-firebase';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Actions from "../actions/actions";
import SettingsButton from "../components/settingsButton";
import { theme as colors } from "../conf/colors";
import { fonts } from "../conf/fonts";
import moment from 'moment';

const {
    Group,
    Shape,
    Surface,
} = ART;

import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
import * as d3Array from 'd3-array';

const d3 = {
    scale,
    shape,
};

class Application extends Component {

    orders = [];

    constructor(props) {
        super(props);

        this.data = this.props.navigation.state.params.data;

        let orders = [];

        try {
            Object.keys(this.data.orders).map((item) => {
                let search = orders.find((element) => {
                    if ( element.date === this.data.orders[item].date ) {
                        return element;
                    }
                });
                if ( search ) {
                    search.value = search.value + 1;
                }
                else {
                    orders.push({
                        date: this.data.orders[item].date,
                        value: 1
                    })
                }
            });
        }
        catch ( e ) {
        }

        orders.sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime()
        });

        this.orders = orders;
    }

    componentDidMount() {
        this.database = firebase.database()
    }

    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.title,
        headerRight: <SettingsButton id = {navigation.state.params.id} navigation = {navigation} />
    });

    unique(arr) {
        let obj = {};

        for ( let i = 0; i < arr.length; i++ ) {
            let str = arr[i];
            obj[str] = true;
        }

        return Object.keys(obj);
    }

    componentWillReceiveProps(newProps) {
        console.log(newProps);

        newProps.data.map((root) => {
            Object.keys(root).map((id) => {
                if ( id === this.props.navigation.state.params.id ) {
                    this.data = root[id]
                }
            })
        });

        let orders = [];

        try {
            Object.keys(this.data.orders).map((item) => {
                let search = orders.find((element) => {
                    if ( element.date === this.data.orders[item].date ) {
                        return element;
                    }
                });
                if ( search ) {
                    search.value = search.value + 1;
                }
                else {
                    orders.push({
                        date: this.data.orders[item].date,
                        value: 1
                    })
                }
            });
        }
        catch ( e ) {
        }

        orders.sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime()
        });

        this.orders = orders;
    }

    markItem(id, status) {
        this.database.ref(`apps/${this.props.token}/${this.props.navigation.state.params.id}/orders/${id}`).update({
            ...this.data.orders[id],
            status: status
        });
    }

    removeItem(id) {
        Alert.alert(`Удаление`, `Удалить этот заказ из списка? Это действие необратимо.`, [
            { text: 'Отмена', style: 'cancel' },
            {
                text: 'Удалить',
                onPress: () => this.database.ref(`apps/${this.props.token}/${this.props.navigation.state.params.id}/orders/${id}`).remove()
            }
        ])
    }

    callPhone(id) {
        Alert.alert(`Звонок`, `Позвонить по указанному номеру телефона?`, [
            { text: 'Отмена', style: 'cancel' },
            {
                text: 'Позвонить',
                onPress: () => {
                    Linking.openURL(`tel: ${this.data.orders[id].phone}`)
                }
            }
        ])
    }

    onItemPress(id) {
        Alert.alert(`Оставить пометку`, `Пометить выбранный заказ как:`, [
            { text: 'Отмена', style: 'cancel' },
            { text: 'Новый', onPress: () => this.markItem(id, 'new') },
            { text: 'Просмотренный', onPress: () => this.markItem(id, 'checked') }
        ])
    }

    getBackground(id) {
        if ( this.data.orders[id].status === 'new' ) {
            return '#f2ffeb'
        }
        else {
            return '#fff'
        }
    }

    renderRemoveButton(id) {
        return (
            <TouchableOpacity onPress = {() => this.removeItem(id)} style = {local.removeBtn}>
                <Material name = 'close' style = {local.removeIcon} />
            </TouchableOpacity>
        )
    }

    renderCallButton(id) {
        return (
            <TouchableOpacity onPress = {() => this.callPhone(id)} style = {local.callBtn}>
                <Material name = 'phone' style = {local.callIcon} />
            </TouchableOpacity>
        )
    }

    renderInstructions() {
        return (
            <View style = {[local.container, { paddingHorizontal: 12, paddingVertical: 12 }]}>
                <Text selectable = {true}>
                    <Text style = {local.instructionsLabel}>Вставьте эти строчки в ваш </Text>
                    <Text style = {local.code}>index.html</Text>
                    <Text style = {local.instructionsLabel}> файл</Text>
                    <Text style = {local.code}>
                        {
                            '\n\n<script type = "text/javascript">\n' +
                            '  let token = "' + this.props.navigation.state.params.token + '";\n' +
                            '  let id = "' + this.props.navigation.state.params.id + '";\n' +
                            '</script>\n\n'
                        }
                    </Text>
                </Text>
                <Text>
                    <Text style = {local.instructionsLabel}>Скачайте этот файл и поместите в корень проекта: </Text>
                    <Text
                        onPress = {() => Linking.openURL('https://github.com/evgenijnamakonov/evgenijnamakonov.github.io')}
                        style = {local.link}>myMobileCrm.js</Text>
                </Text>
                <Text>
                    <Text style = {local.instructionsLabel}>{'\nДалее следуйте документации:  '}</Text>
                    <Text
                        onPress = {() => Linking.openURL('https://github.com/evgenijnamakonov/evgenijnamakonov.github.io')}
                        style = {local.link}>https://github.com/evgenijnamakonov/evgenijnamakonov.github.io</Text>
                </Text>
            </View>
        )
    }

    renderRegularContent() {

        if ( !this.data.orders ) {
            return (
                <View style = {local.phView}>
                    <Text style = {local.phText}>Пока не было никакой активности на этом сайте</Text>
                </View>
            )
        }

        let dAttribute = this.orders.length > 0
                         ? createLineGraph({
                data: this.orders,
                width: Dimensions.get('window').width - 40,
                height: 140,
            })
                         : null;

        let sorted = [];

        for ( let i = 0; i < this.orders.length; i++ ) {
            if ( sorted.indexOf(this.orders[i].value) === -1 ) {
                sorted.push(this.orders[i].value)
            }
        }

        return (
            <ScrollView style = {local.container} showsVerticalScrollIndicator = {false}>
                <View style = {local.innerContainer}>
                    <Text style = {local.title}>Сводка по сайту:</Text>
                    <View style = {local.infoItemContainer}>
                        <Text style = {local.instructionsLabel}>Общее количество заказов: </Text>
                        <Text style = {local.infoValue}>
                            {this.data.orders ? Object.keys(this.data.orders).length : 0}
                        </Text>
                    </View>
                    <View style = {local.infoItemContainer}>
                        <Text style = {local.instructionsLabel}>Общее количество пользователей: </Text>
                        <Text style = {local.infoValue}>
                            {this.data.users ? Object.keys(this.data.users).length : 0}
                        </Text>
                    </View>
                    <Text style = {local.graphTitle}>График совершения заказов:</Text>
                    <View style = {local.graphContainer}>
                        <Graph lineGraph = {dAttribute} />
                        <View style = {local.yAxis} />
                        <View style = {local.yAxisTicks}>
                            {sorted.sort().reverse().map((item) => {
                                return <Text style = {{ fontSize: 14 }}>{item}</Text>
                            })}
                        </View>
                        <View style = {local.xAxis} />
                        <View style = {local.xAxisTicks}>
                            {this.orders.map((item) => {
                                return <Text style = {{}}>{moment(item.date).format('MM.DD')}</Text>
                            })}
                        </View>
                    </View>
                    <Text style = {local.title}>Непросмотренные заказы:</Text>
                    <View>
                        {
                            Object.keys(this.data.orders).sort((a, b) => {
                                return new Date(this.data.orders[b].utc).getTime() - new Date(this.data.orders[a].utc).getTime()
                            }).map((item) => {
                                return (
                                    <TouchableOpacity onPress = {() => this.onItemPress(item)}
                                                      activeOpacity = {.8}
                                                      style = {[local.orderItemWrapper, {
                                                          backgroundColor: this.getBackground(item),
                                                      }]}>
                                        <View style = {{ flex: 1 }}>
                                            <Text style = {local.orderItemText}>Дата
                                                                                создания: {moment(this.data.orders[item].utc).format('DD MMMM YYYY, HH:mm')}</Text>
                                            <Text
                                                style = {local.orderItemText}>Адрес: {this.data.orders[item].address}</Text>
                                            <Text
                                                style = {local.orderItemText}>Имя: {this.data.orders[item].name}</Text>
                                            <Text style = {local.orderItemTextBold}>
                                                {this.data.orders[item].product} - {this.data.orders[item].amount} шт.
                                            </Text>
                                            <Text
                                                style = {local.orderItemText}>Телефон: {this.data.orders[item].phone}</Text>
                                        </View>
                                        <View style = {{ height: '100%', width: 40, }}>
                                            {this.renderRemoveButton(item)}
                                            {this.renderCallButton(item)}
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </View>
            </ScrollView>
        )
    }

    render() {
        if ( this.props.navigation.state.params.newApp ) {
            return this.renderInstructions()
        }
        else {
            return this.renderRegularContent()
        }
    }
}

class Graph extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Surface alignment = 'center' width = {Dimensions.get('window').width - 40} height = {140}>
                <Group x = {0} y = {0}>
                    <Shape
                        d = {this.props.lineGraph.path}
                        stroke = {colors.accent}
                        strokeWidth = {2}
                    />
                </Group>
            </Surface>
        )
    }
}

export function createLineGraph({ data, width, height, }) {
    const lastDatum = data[data.length - 1];

    const scaleX = createScaleX(
        new Date(data[0].date).getTime(),
        new Date(lastDatum.date).getTime(),
        width
    );

    const allYValues = data.reduce((all, datum) => {
        all.push(datum.value);
        return all;
    }, []);

    const extentY = d3Array.extent(allYValues);

    const scaleY = createScaleY(extentY[0], extentY[1], height);

    const lineShape = d3.shape.line()
        .x((d) => scaleX(new Date(d.date).getTime()))
        .y((d) => scaleY(d.value));
    return { path: lineShape(data) };
}

function createScaleX(start, end, width) {
    return d3.scale.scaleTime()
        .domain([new Date(start), new Date(end)])
        .range([0, width]);
}

function createScaleY(minY, maxY, height) {
    return d3.scale.scaleLinear()
        .domain([minY, maxY]).nice()
        .range([height, 1]);
}

const local = StyleSheet.create({
    phText: { color: '#999', fontSize: 22, textAlign: 'center' },
    phView: { flex: 1, paddingHorizontal: 12, alignItems: 'center', justifyContent: 'center' },
    removeIcon: { fontSize: 18, color: '#c63e27' },
    callIcon: { fontSize: 18, color: '#2599c6' },
    removeBtn: {
        height: 40,
        justifyContent: 'center',
        marginBottom: 32,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#aaa',
        alignItems: 'center'
    },
    callBtn: {
        height: 40,
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#aaa',
        alignItems: 'center'
    },
    checkedMarkerText: { color: '#a7a8a8', fontSize: 16 },
    newMarkerText: { color: '#2dd93e', fontSize: 16 },
    markerView: { position: 'absolute', bottom: 8, right: 12 },
    orderItemText: {
        fontSize: fonts.fontSize.big,
        maxWidth: '95%',
        color: '#333'
    },
    orderItemTextBold: {
        fontSize: fonts.fontSize.big,
        fontWeight: '600',
        maxWidth: '95%',
        color: '#333'
    },
    innerContainer: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 8,
        paddingHorizontal: 8,
    },
    orderItemWrapper: {
        width: '100%',
        paddingHorizontal: 12,
        paddingVertical: 12,
        flexDirection: 'row',
        backgroundColor: '#fff',
        elevation: 2,
        borderRadius: 2,
        marginVertical: 6,
    },
    xAxisTicks: {
        width: '106%',
        flexDirection: 'row',
        marginLeft: 12,
        justifyContent: 'space-between',
    },
    yAxisTicks: {
        height: 150,
        top: 12,
        left: 0,
        position: 'absolute',
        justifyContent: 'space-between',
    },
    xAxis: {
        width: '106%',
        height: 1,
        flexDirection: 'row',
        position: 'absolute',
        left: 11,
        top: 157,
        backgroundColor: '#ddd',
    },
    yAxis: {
        width: 1,
        height: 150,
        position: 'absolute',
        left: 11,
        top: 8,
        backgroundColor: '#ddd',
    },
    graphContainer: {
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 16,
        justifyContent: 'center',
        alignItems: 'center'
    },
    infoItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingRight: 4,
        borderBottomColor: '#ddd',
        borderBottomWidth: 0.6
    },
    code: {
        fontSize: fonts.fontSize.primary,
        backgroundColor: 'rgba(128, 128, 128, 0.1)',
        color: '#ce6a40',
        fontWeight: '600',
        fontFamily: fonts.fontFamilyCode
    },
    link: {
        fontSize: fonts.fontSize.primary,
        color: '#1184ce',
        textDecorationLine: 'underline',
        fontFamily: fonts.fontFamily
    },
    container: {
        width: '100%',
        backgroundColor: '#fff',
        height: '100%',
    },
    instructionsLabel: {
        fontSize: fonts.fontSize.big,
        color: '#333',
        fontFamily: fonts.fontFamily
    },
    graphTitle: {
        height: 50,
        marginTop: 12,
        fontSize: fonts.fontSize.big,
        color: '#333',
        fontFamily: fonts.fontFamily
    },
    infoValue: {
        fontSize: fonts.fontSize.big,
        color: '#333',
        fontFamily: fonts.fontFamilyBold
    },
    title: {
        paddingVertical: 10,
        fontSize: fonts.fontSize.bigger,
        color: '#333',
        fontFamily: fonts.fontFamilyBold
    }
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

function mapStateToProps(state) {
    return {
        token: state.store.token,
        data: state.store.data
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Application);