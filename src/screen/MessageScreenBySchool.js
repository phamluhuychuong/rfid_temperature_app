import React from 'react'
import { ImageBackground, View, StyleSheet  } from 'react-native'
import { Appbar, Text, Button } from 'react-native-paper'

const MessageScreenBySchool = ({ navigation}) => {
	return (
		<ImageBackground source={require('../../assets/background.jpg')} style={{ width: '100%', height: '100%'}}>
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
				<Text>This is MessageScreen</Text>
			</View>
		</ImageBackground>
	)
}
export default MessageScreenBySchool

/*
			<Appbar.Header style={{height:'5%'}}>
				<Appbar.BackAction onPress={() => {navigation.navigate('ProfileBySchool')}} />
				<Appbar.Content title="Message by School"/>
			</Appbar.Header>
*/