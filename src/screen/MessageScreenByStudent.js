import React, {useEffect,useState, Component} from 'react'
import { View, StyleSheet, ScrollView, Picker  } from 'react-native'
import { 
		Appbar, 
		Button, 
		Dialog, DataTable,
		Text
		} from 'react-native-paper'
import io from 'socket.io-client'

import {CalloutMess} from './CalloutMess'

let socket = io('http://192.168.1.7:3000')

const MessageScreenByStudent = ({ route, navigation }) => {


	const [result, setResult] = useState([])

	const {receivedROOM1} = route.params
	const {receivedFULLNAME} = route.params
	useEffect(()=>{
		socket.on('get-all', rows=>setResult(rows))
	}, []) 

	return (
		<View style={{backgroundColor: 'white'}}>

		</View>
			
		
	)
}

export default MessageScreenByStudent

/*
			<Appbar.Header style={{height:'5%'}}>
				<Appbar.BackAction onPress={() => {navigation.navigate('Home')}} />
				<Appbar.Content title="Message by Student"/>
			</Appbar.Header>
			//const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical'
*/