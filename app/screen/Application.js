import React, { Component } from 'react';
import { View, Text, Dimensions, ART, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import SettingsButton from "../components/settingsButton";
import { theme as colors } from "../conf/colors";
import { fonts } from "../conf/fonts";

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

export default class Application extends Component {

    constructor(props) {
        super(props)
    }

    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.title,
        headerRight: <SettingsButton id = {navigation.state.params.id} navigation = {navigation} />
    });

    data = [
        { date: new Date(2018, 1, 8), value: 1 },
        { date: new Date(2018, 1, 9), value: 7 },
        { date: new Date(2018, 1, 11), value: 5 },
    ];

    dAttribute = createLineGraph({
        data: this.data,
        width: Dimensions.get('window').width - 40,
        height: 140,
    });

    unique(arr) {
        let obj = {};

        for ( let i = 0; i < arr.length; i++ ) {
            let str = arr[i];
            obj[str] = true; // запомнить строку в виде свойства объекта
        }

        return Object.keys(obj); // или собрать ключи перебором для IE8-
    }

    renderInstructions() {
        return (
            <View style = {local.container}>
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
                    <Text style = {local.instructionsLabel}>Скачайте этот файл и перенесите в папку с проектом: </Text>
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
        let data = this.props.navigation.state.params.data;

        let sorted = [];

        for (let i = 0; i< this.data.length; i++) {
            if (sorted.indexOf(this.data[i].value) === -1) {
                sorted.push(this.data[i].value)
            }
        }

        console.log(sorted)

        return (
            <View style = {local.container}>
                <Text style = {local.title}>Сводка по сайту:</Text>
                <View style = {local.infoItemContainer}>
                    <Text style = {local.instructionsLabel}>Общее количество заказов:</Text>
                    <Text style = {local.infoValue}> {data.orders ? Object.keys(data.orders).length : 0}</Text>
                </View>
                <View style = {local.infoItemContainer}>
                    <Text style = {local.instructionsLabel}>Общее количество пользователей:</Text>
                    <Text style = {local.infoValue}> {data.users ? Object.keys(data.users).length : 0}</Text>
                </View>
                <Text style = {local.graphTitle}>График совершения заказов за текущий месяц:</Text>
                <View style = {local.graphContainer}>
                    <Graph lineGraph = {this.dAttribute} />
                    <View style = {local.yAxis} />
                    <View style = {local.yAxisTicks}>
                        {sorted.sort().reverse().map((item) => {
                            return <Text style = {{ fontSize: 14 }}>{item}</Text>
                        })}
                    </View>
                    <View style = {local.xAxis} />
                    <View style = {local.xAxisTicks}>
                        {this.data.map((item) => {
                            return <Text style = {{}}>{item.date.getDate()}</Text>
                        })}
                    </View>
                </View>
            </View>
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
        data[0].date.getTime(),
        lastDatum.date.getTime(),
        width
    );

    const allYValues = data.reduce((all, datum) => {
        all.push(datum.value);
        return all;
    }, []);

    const extentY = d3Array.extent(allYValues);

    const scaleY = createScaleY(extentY[0], extentY[1], height);

    const lineShape = d3.shape.line()
        .x((d) => scaleX(d.date.getTime()))
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
    xAxisTicks: {
        width: '106%',
        flexDirection: 'row',
        marginLeft: 12,
        justifyContent: 'space-between',
    },
    yAxisTicks: {
        height: 140,
        top: 20,
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
        paddingVertical: 12,
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
        paddingVertical: 8,
        paddingHorizontal: 8,
        height: '100%',
        backgroundColor: '#fff',
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