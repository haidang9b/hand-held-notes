
import React, { Component } from "react";
import { AppRegistry, FlatList, StyleSheet, Text, View, Image, Alert, Platform, TouchableHighlight, Dimensions, TextInput } from 'react-native';

import Modal from 'react-native-modalbox';
import Button from 'react-native-button';
import flatListData from "../data/flatListData";
import {insertNewNoteToServer} from "../networking/Server";
var screen = Dimensions.get('window');

export default class AddNewNote extends Component{
    constructor(props) {
        super(props);
        this.state = {
            newNoteTitle: '',
            newContent: ''
        }
    }
    showAddNote = () =>{
        this.refs.myModal.open();
    }
    generateKey = (length) => {
        var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var result = '';
        for ( var i = 0; i < length; i++ ) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return result;
    }
    render() {
        return (
            <Modal 
            onRequestClose={() => {
                this.onClosed();
            }}
            ref = {'myModal'}
            style = {styles.modal}
            position = 'center'
            backdrop = {true}
            onClosed = {() => {
                //alert("Modal closed");
            }}
            >
                <Text style = {styles.tvTilte}>Title</Text>
                <TextInput style = {styles.txtTitle} 
                placeholder="Enter your tilte" 
                value={this.state.newNoteTitle}
                onChangeText = {(text) => this.setState({ newNoteTitle: text})}
                />  
                <Text style = {styles.tvTilte}>Content</Text>
                
                <TextInput style = {{
                    height: 400,
                    padding: 10,
                    borderColor: 'gray',
                    borderWidth: 1,
                    marginTop: 10,
                    marginEnd: 20,
                    marginStart: 20,
                    marginBottom: 10,
                    borderRadius: 10,
                    textAlignVertical:'top'
                }} 
                multiline={true}
                numberOfLine={30}
                value={this.state.newContent}
                onChangeText = {(text) => this.setState({ newContent: text})}
                />
                

                <Button 
                style = {styles.ctnBtnSave} 
                onPress = {() => {
                    
                    const newKey = this.generateKey(15);
                    const currDate = (new Date()).toDateString();
                    const newNote = {
                        key: newKey,
                        title: this.state.newNoteTitle.length == 0 ? 'Chưa đặt tên' : this.state.newNoteTitle,
                        noteDescription: this.state.newContent,
                        noteDateTime: currDate
                    }
                    insertNewNoteToServer(newNote).then((code) => {
                        if(code == 0){
                            this.props.parentFlatList.refreshDataFromServer();
                        }
                    })
                    this.refs.myModal.close();
                    this.setState({newContent: "", newNoteTitle: ""});
                }}
                >Save</Button>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    modal : {
        justifyContent: 'center',
        borderRadius: 20,
        shadowRadius: 8,
        width: screen.width - 20,
        height: screen.height-40
    },
    tvTilte : {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'left',
        marginTop: 20,
        marginLeft: 20,
    },
    txtTitle : {
        height: 40,
        borderBottomColor: 'gray',
        marginEnd: 20,
        marginStart: 20,
        marginBottom: 10,
        borderBottomWidth: 1
    },
    txtContent : {
        textAlign: 'center',
        borderWidth: 2,
        borderColor: '#9E9E9E',
        borderRadius: 20 ,
        backgroundColor : "#FFFFFF",
        height: 400,
        justifyContent: "flex-start",
        marginEnd: 20,
        marginStart: 20,
        marginBottom: 10,
    },
    ctnBtnSave : {
        color:  'white',
        padding: 8,
        marginLeft: 70,
        marginRight: 70,
        height: 40,
        borderRadius: 6,
        backgroundColor: 'mediumseagreen'
    },
    btnSave : {
        fontSize: 18,
        color: 'white'
    },
    MainContainer :{
        flex:1,
        paddingTop: (Platform.OS) === 'ios' ? 20 : 0,
        justifyContent: 'center',
        margin:20
    },
})