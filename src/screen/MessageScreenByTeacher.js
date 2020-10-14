import React from 'react'
import { ImageBackground, Platform , StyleSheet, View } from 'react-native'
import { Appbar, Button, Divider, Text, List, RadioButton } from 'react-native-paper'


const MessageScreenByTeacher = ({ navigation }) => {
	return (
		<ImageBackground source={require('../../assets/tnhbackground.jpg')} style={{ width: '100%', height: '100%'}}>
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
				<Text>This is MessageScreen</Text>
			</View>
		</ImageBackground>
	)
}

export default MessageScreenByTeacher

/*
			<Appbar.Header style={{height:'5%'}}>
				<Appbar.BackAction onPress={() => {navigation.navigate('ProfileByTeacher')}} />
				<Appbar.Content title="Message by Teacher"/>
			</Appbar.Header>
			//const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical'
*/