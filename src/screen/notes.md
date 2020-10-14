import React, {useState, useEffect } from 'react'
// import { Provider as PaperProvider } from 'react-native-paper'
// import { Appbar, Button,Text } from 'react-native-paper'
import { List } from 'react-native-paper'
import { View } from 'react-native'
import { Button, Divider, Text, TextInput } from 'react-native-paper'
import io from 'socket.io-client'

// import { firebase } from '../firebase/config'

let socket = io('http://localhost:3000')

const HomeScreen = ({ navigation }) => {
	const [expanded, setExpanded] = useState(true)
	const [room, setRoom] = useState(null)
	const [mess, setMess] = useState(null)
	const [text, setText] = React.useState('')

	socket.on("chat message", msg => setMess(msg))

	const send = () => {
		socket.emit('chat message', text)
	}

	// const handlePress = () => setExpanded(!expanded)
	// const [fullname, setFullname] = useState(null)

	// useEffect(() => {
	// 	firebase.database().ref('/classes').on('value', snapshot=>setRoom(snapshot.val()))
	// })

	return (
		<View>
			<TextInput label="Message" value={text} onChangeText={text => setText(text)} />
			<Button icon="send" mode="contained" onPress={send}>SEND</Button>
			<Divider/>
			<List.Section title="Accordions">
				<List.Accordion
					title="Uncontrolled Accordion"
					left={props => <List.Icon {...props} icon="folder" />}>
					<List.Item title="First item" />
					<List.Item title="Second item" />
				</List.Accordion>
			</List.Section>
		</View>
	)
}

export default HomeScreen

/*
<PaperProvider>
			<Appbar.Header>
				<Appbar.Content title="Home" subtitle="Summary Info" />
			</Appbar.Header>
		</PaperProvider>
*/