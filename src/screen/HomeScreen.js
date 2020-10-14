import React, {useState, useEffect } from 'react'
import { ImageBackground, Platform, StyleSheet, View, Picker } from 'react-native'
import {
	Appbar,
	Button,
	Dialog, Divider,
	Portal,
	Text, TextInput,
	List,
	RadioButton } from 'react-native-paper'
import io from 'socket.io-client'

let socket = io('http://192.168.1.7:3000')

const HomeScreen = ({ navigation }) => {
	const [serial, setSerial] = useState(true)
	const [role, setRole] = useState(1)
	const [password, setPassword] = useState('99999999')
	const [password1, setPassword1] = useState('12345678')
	const [text, setText] = useState('99999999')
	const [text1, setText1] = useState('12345678')
	const [room, setRoom] = useState([])
	const [selectedRoom, setSelectedRoom] = useState(null)
	const [selectedRoom1, setSelectedRoom1] = useState(null)
	const [fullname, setFullname] = useState([])
	const [selectedFullname, setSelectedFullname] = useState(null)

	const [visible1, setVisible1] = useState(false)
	const [visible2, setVisible2] = useState(false)
	const [visible3, setVisible3] = useState(false)

	useEffect(()=>{
		
		socket.emit('db-get-room')
		socket.on('db-room', rows=>setRoom(rows))
		socket.on('db-name', rows=>setFullname(rows))
	}, []) //only re-run the effect if new data comes in

	// user functions
	
	const showDialog1 = () => setVisible1(true)
	const hideDialog1 = () => setVisible1(false)
	const showDialog2 = () => setVisible2(true)
	const hideDialog2 = () => setVisible2(false)
	const showDialog3 = () => setVisible3(true)	
	const hideDialog3 = () => setVisible3(false)

	return (
			<ImageBackground source={require('../../assets/background.jpg')} style={{ width: '100%', height: '100%'}}>
			
				 	<View style={{
							alignSelf: 'center',
							backgroundColor:'#ECF6CE', borderRadius: 15, borderWidth: 4, borderColor: '#0B610B',
							marginTop: '50%', 
							opacity: 0.95,
							width: '90%'}}>
						<View style={{backgroundColor: '#01DF74', borderRadius: 10}}>
							<Text style={{
										alignSelf:'center',
										fontSize: 24, fontWeight: 'bold' }}>ROLE AS</Text>
						</View>
						
						<Divider style={{ marginBottom: '5%'}} />
						
						<RadioButton.Group
							onValueChange={v => {setRole(v)}}
							value={role}>
								<View style={styles.radio}>
									<RadioButton value={1} />
									<Text style={{fontSize: 20}}>School</Text>
								</View>
								<View style={styles.radio}>
									<RadioButton value={2} />
									<Text style={{fontSize: 20}}>Teacher</Text>
								</View>
								<View style={styles.radio}>
									<RadioButton value={3} />
									<Text style={{fontSize: 20}}>Parents or Students</Text>
								</View>
						</RadioButton.Group>
						<Button
							mode="contained"
							style={{ 
									alignSelf:'center', 
									backgroundColor:'#00FF00', borderWidth: 4, borderColor: '#0B610B', borderRadius: 10, bottom:10,
									marginTop: '20%', 
									width: 300}}
							onPress={ () => {
								switch (role) {
										case 1: showDialog1()
										break
										case 2: showDialog2()
										break
										case 3: showDialog3()
										break
							}}}>
							<Text style={{color:'#0B0B61', fontWeight:'bold', fontSize: 25}}>NEXT</Text>
						</Button>
				</View>	
					<Dialog style = {styles.dialog1} visible={visible1} onDismiss={showDialog1}>
						<Dialog.Actions>
							<View>
								<Dialog.Title>Password</Dialog.Title>
								<TextInput
									placeholder="Type password"
									value={text}
									onChangeText={text => setText(text)}
								/>
								<View style={{flexDirection: 'row'}}>
									<Button onPress={() => hideDialog1() }>
										<Text style={{color:'black', fontWeight: 'bold'}}>CANCEL</Text>
									</Button>
									<Button onPress={() => {
										if (text==password)
											navigation.navigate('ProfileBySchool')
										else
											hideDialog1()
									}}>
										<Text style={{color:'black', fontWeight: 'bold'}}>OK</Text>
									</Button>
								</View>
							</View>
						</Dialog.Actions>
					</Dialog>

			<Dialog style = {styles.dialog2} visible={visible2} onDismiss={showDialog2}>
				<Dialog.Actions>
					<View>
						<Dialog.Title>Class</Dialog.Title>
						<Picker
				        	style={{ height: 50, width: '100%', alignSelf: 'center'}}
				        	selectedValue={selectedRoom}
				        	onValueChange={(itemValue, itemIndex) => {setSelectedRoom(itemValue)}}
			      		>
			      			<Picker.Item label={'No Class'} value={null} />
			      			{
			      				room.map( (v,k) => <Picker.Item key={k} label={v.room} value={v.room} /> )
			      			}
			      		</Picker>
						<Dialog.Title>Password</Dialog.Title>
						<TextInput
							placeholder="Type password"
							value={text1}
							onChangeText={text1=> setText1(text1)}
						/>					
						<View style={{flexDirection: 'row'}}>
							<Button onPress={() => hideDialog2()}>
								<Text style={{color:'black', fontWeight: 'bold'}}>CANCEL</Text>
							</Button>
							<Button onPress={() => {
								if ((text1==password1) & (selectedRoom!=null)){
										navigation.navigate('ProfileByTeacher', {receivedROOM: selectedRoom})}
								else {hideDialog1()}
							}}>
								<Text style={{color:'black', fontWeight: 'bold'}}>OK</Text>
							</Button>
						</View>
					</View>
				</Dialog.Actions>
			</Dialog>

					<Dialog style = {styles.dialog3} 
							visible={visible3} onDismiss={showDialog3}>
						<Dialog.Actions>
							<View>
								<Dialog.Title>Class</Dialog.Title>
									<Picker
							        	style={{ height: 50, width: '100%', alignSelf: 'center'}}
							        	selectedValue={selectedRoom1}
							        	onValueChange={(itemValue, itemIndex) => {
							        		setSelectedRoom1(itemValue)
							        		socket.emit('db-get-name', itemValue)
							        		alert(itemValue)
							        	}}
						      		>
						      			<Picker.Item label={'No Class'} value={null} />
						      			{
						      				room.map( (v,k) => <Picker.Item key={k} label={v.room} value={v.room} /> )
						      			}
						      		</Picker>
								<Dialog.Title>Fullname</Dialog.Title>
									<Picker
							        	style={{ height: 50, width: '100%', alignSelf: 'center'}}
							        	selectedValue={selectedFullname}
							        	onValueChange={(itemValue, itemIndex) => {setSelectedFullname(itemValue)}}
						      		>
						      			<Picker.Item label={'No Name'} value={null} />
						      			{
						      				fullname.map( (v,k) => <Picker.Item key={k} label={v.fullname} value={v.fullname} /> )
						      			}
						      		</Picker>
								<View style={{flexDirection: 'row'}}>
									<Button onPress={() => hideDialog3()}>
										<Text style={{color:'black', fontWeight: 'bold'}}>CANCEL</Text>
									</Button>
									<Button onPress={() => {
										if ((selectedRoom1!=null) & (selectedFullname!=null)) {
											navigation.navigate('MessageByStudent', 
																{receivedROOM1: selectedRoom1,
																receivedFULLNAME: selectedFullname})
										}
									}}>
										<Text style={{color:'black', fontWeight: 'bold'}}>OK</Text>
									</Button>
								</View>
							</View>
						</Dialog.Actions>
					</Dialog>
			</ImageBackground>
	)
}

const styles = StyleSheet.create({
	radio: { flex: 0, flexDirection: 'row', alignItems: 'center' },
	dialog1: {alignItems: 'center',borderRadius: 20 },
	dialog2: {alignItems: 'center',borderRadius: 20 },
	dialog3: {alignItems: 'center',borderRadius: 20 }

})

export default HomeScreen

/*
				<Appbar.Header style={{height:'5%'}}>
					<Appbar.BackAction onPress={() => {navigation.navigate('Splash')}} />
					<Appbar.Content title="Home"/>
				</Appbar.Header>
*/