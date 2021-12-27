import React, { Component } from "react";
import {AppRegister, FlatList, StyleSheet, Text, View } from 'react-native';


export default class ItemNote extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <View style={{
                flex: 1,
                backgroundColor: this.props.index %2 ==0 ? 'mediumseagreen':'tomato'
            }}>
                <Text>{this.props.item.title}</Text>
                <Text>{this.props.item.noteDescription}</Text>
                <Text>{this.props.item.noteDateTime}</Text>
            </View>
        );
    }
}

