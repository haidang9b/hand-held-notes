
import React, { Component } from "react";
import { RefreshControl, AppRegistry, FlatList, StyleSheet, Text, View, Image, Alert, Platform, TouchableHighlight } from 'react-native';
import flatListData from "../data/flatListData";
import Swipeout from 'react-native-swipeout';
import AddNewNote from './addNote';
import {getAllNotes , deleteANote} from '../networking/Server';
import EditNote from './updateNote';
// import {ItemNote} from './itemNote';


class ItemNote extends Component{
    constructor(props){
        super(props);
        this.state = {
            activeRowKey: null,
            numberOfRefresh: 0,
            item: {}
        }
    }
    // refresh khi thay doi
    refreshFlatListItem = (changedItem) => {
        this.setState({item: changedItem});

    }
    render(){
        const swipeSettings = {
            autoClose: true,
            onClose: (secId, rowId, direction) => {
                if(this.state.activeRowKey != null){
                    this.setState({ activeRowKey: null});
                }
            },          
            onOpen: (secId, rowId, direction) => {
                this.setState({activeRowKey: this.props.item.key})
            },      
            right: [
                {
                    onPress: () => {    
                        const deleteNeedDel = this.state.activeRowKey;
                        
                        Alert.alert(
                            'Alert',
                            'Are you sure you want to delete this note?',
                            [
                                {text: 'Yes', onPress: () =>{
                                    flatListData.splice(this.props.index,1);
                                    const itemDel = this.props.item;
                                    const noteDel = {
                                        key: this.props.item.key
                                    }
                                    console.log(itemDel)
                                    deleteANote(noteDel).then((code) => {
                                        if(code == 0 ){
                                            this.props.parentFlatList.refreshDataFromServer(itemDel);
                                        }
                                    })
                                    
                                }},
                                {text: 'No', onPress: () => console.log('Cancel Pressed'), type: 'cancel'},
                            
                            ],
                            {cancelable: true}
                        );
                    }, 
                    text: 'Delete', type: 'delete' 
                },
                {
                    onPress: () => {
                        let selectedItem = this.state.item.name ? this.state.item : this.props.item; 
                        this.props.parentFlatList.refs.editModal.showEditNote(selectedItem,this);
                    },
                    text: 'Update', type: 'primary'
                }
            ], 
            rowId: this.props.index, 
            sectionId: 1
        };
        return (
            <Swipeout {...swipeSettings} style={{
                backgroundColor: '#fbf6be'
            }}>
                <View style={{
                    paddingBottom: 10,
                    paddingRight: 20,
                    paddingTop: 10,
                    marginEnd: 50,
                    flex: 1,
                    backgroundColor: '#fbf6be',
                }}>
                    <Text style = {styles.itemName}>{this.props.item.title}</Text>
                    <View style={{
                        flex:1,
                        flexDirection: 'row'
                    }}>
                        <Text style = {styles.itemDateTime}>{this.props.item.noteDateTime}</Text>
                        <Text style = {styles.itemDesc}>{this.props.item.noteDescription}</Text>
                    </View>
                </View>
                <View style={styles.decorRow}></View>
            </Swipeout >
        );
    }
}



export default class flatListRender extends Component{
    constructor(props) {
        super(props);
        this.state = ({
            deletedRowKey: null,
            refreshing: false,
            notesFromServer: []
        });
        this.onPressAdd = this.onPressAdd.bind(this);
    }
    componentDidMount() {
        this.refreshDataFromServer();
    }
    refreshDataFromServer = () => {
        this.setState({ refreshing: true});
        getAllNotes().then((notes) => {
            this.setState({notesFromServer: notes});
            this.setState({ refreshing: false});
        }).catch((error) => {
            this.setState({notesFromServer: [] });
            this.setState({ refreshing: false});
        }) ;
    }
    onRefresh = () => {
        this.refreshDataFromServer();
    }
    refreshList = (myKey) => {
        this.setState((prevState) => {
            return {
                deletedRowKey: myKey
            };
        });
        this.refs.flatList.scrollToEnd();   
    }
    onPressAdd () {
        this.refs.addModal.showAddNote();
    }
    render(){
        return(
            <View style={{
                backgroundColor: '#fbf6be',
                flex: 1,
                marginTop: Platform.OS === 'ios' ? 34: 0}}
                onRequestClose={() => {
                    console.log("close");
                }}
                >
                <View style = {styles.headerWrapper}>
                    <Text style = {{width: 30, height: 30}} style={styles.labelHeader}> My Note </Text>
                    <TouchableHighlight style = {styles.btnAdd} underlayColor = '#f5ed95' onPress = {this.onPressAdd}>
                        <Image  style={{height:30, width: 30,}} source={require('../images/icons-add.png')}>
                        </Image>
                    </TouchableHighlight>
                    
                </View>
                <FlatList
                ref = {'flatList'} 

                data = {this.state.notesFromServer}
                renderItem={({item,index}) => {
                    return(
                        <ItemNote item={item} index={index} parentFlatList={this}>
                        </ItemNote>);
                    }}
                keyExtractor = {(item,index) => item.key}
                refreshControl = {
                    <RefreshControl
                        refreshing = {this.state.refreshing}
                        onRefresh = {this.onRefresh}
                    />
                }
                >
                </FlatList>
                <AddNewNote ref={'addModal'} parentFlatList={this} >

                </AddNewNote>     
                <EditNote ref={'editModal'} parentFlatList={this}>
                </EditNote>       
                </View>
        );
    }
}

const styles = StyleSheet.create({
    itemName: {
        color: 'black',
        fontSize: 16,
        paddingStart: 10,
        fontWeight: "bold" 
    },
    itemDesc: {
        color: '#4f4a4a',
        paddingStart: 10,
        fontSize: 10,
        marginEnd: 20,

    },
    itemDateTime: {
        fontSize: 10,
        paddingStart: 10
    },
    decorRow: {
        height: 1,
        backgroundColor: 'black',
        marginEnd: 10,
        marginStart: 10
    },
    headerWrapper: {
        height: 64,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between"
        
    },
    labelHeader: {
        fontSize: 30,
        fontWeight: "bold"
    },
    btnAdd: {
        marginRight: 10,
        
    }

}) 