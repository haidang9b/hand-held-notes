import React, {Component} from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View, Image, Alert, Platform, TouchableHighlight, Dimensions, TextInput } from 'react-native';


const apiGetAllNotes = 'http://10.0.2.2/api/get-notes.php';
const apiInsertNewNote = 'http://10.0.2.2/api/add-note.php';
const apiUpdateANote = 'http://10.0.2.2/api/update-note.php';
const apiDeleteANote = 'http://10.0.2.2/api/delete-note.php';


async function getAllNotes () {
    try {
        let response = await fetch(apiGetAllNotes);
        let responseJson = await response.json();
        return responseJson.data;
    } catch (error) {
        console.error('Error is: cannot load data from server');
    }
}

async function insertNewNoteToServer(params) {
    try {
        let response = await fetch(apiInsertNewNote, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(params)
        });
        let responseJson = await response.json();
        return responseJson.code;
    } catch (error) {
        console.error('Error is: cannot add note to server');
    }
}

async function updateANote(params) {
    try {
        let response = await fetch(apiUpdateANote, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(params)
        });
        let responseJson = await response.json();
        return responseJson.code;
    } catch (error) {
        console.error('Error is: cannot update note to server');
    }
}

async function deleteANote(params) {
    try {
        let response = await fetch(apiDeleteANote, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(params)
        });
        let responseJson = await response.json();
        return responseJson.code;
    } catch (error) {
        console.error('Error is: cannot update note to server');
    }
}

export {getAllNotes};
export {insertNewNoteToServer};
export {updateANote};
export {deleteANote};