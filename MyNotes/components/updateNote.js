
import React, { Component } from "react";
import { AppRegistry, FlatList, StyleSheet, Text, View, Image, Alert, Platform, TouchableHighlight, Dimensions, TextInput } from 'react-native';

import Modal from 'react-native-modalbox';
import Button from 'react-native-button';
import flatListData from "../data/flatListData";
import {updateANote} from "../networking/Server";

var screen = Dimensions.get('window');

export default class EditNote extends Component{
    constructor(props) {
        super(props);
        this.state = {
            visibleModal : false,
            editNoteTitle: '',
            editContent: ''
        };
    }
    showEditNote = (editingNote, flatListItem) =>{
        //console.log(`editing Note = ${JSON.stringify(editingNote)}`);

        this.setState({
            key: editingNote.key,
            editNoteTitle: editingNote.title,
            editContent: editingNote.noteDescription,
            flatListItem: flatListItem
        });
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
                value={this.state.editNoteTitle}
                onChangeText = {(text) => this.setState({ editNoteTitle: text})}
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
                value={this.state.editContent}
                onChangeText = {(text) => this.setState({ editContent: text})}
                />

                <Button 
                style = {styles.ctnBtnSave} 
                onPress = {() => {
                    const currDate = (new Date()).toDateString();
                    const params = {
                        key: this.state.key ,
                        title: this.state.editNoteTitle.length == 0 ? 'Chưa đặt tên' : this.state.editNoteTitle,
                        noteDescription: this.state.editContent,
                        noteDateTime: currDate
                    }
                    console.log(params)
                    updateANote(params).then((code) => {
                        if(code == 0){
                            this.props.parentFlatList.refreshDataFromServer();
                        }
                    })
                    this.state.flatListItem.refreshFlatListItem({
                        key: this.state.key,
                        title: this.state.editNoteTitle,
                        noteDescription: this.state.noteDescription,
                    });
                    this.refs.myModal.close();
                    this.setState({editContent: "", editNoteTitle: "", flatListItem: [],key: ""});
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
        color:  'white',
        height: 300,
        borderBottomColor: 'gray',
        marginEnd: 20,
        marginStart: 20,
        marginBottom: 10,
        borderBottomWidth: 1
    },
    ctnBtnSave : {

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
    }
})