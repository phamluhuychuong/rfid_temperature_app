import React, {useEffect,useState, Component} from 'react'
import { View, StyleSheet, ScrollView, Picker  } from 'react-native'
import { 
		Appbar, 
		Button, 
		Card,
		Dialog, DataTable, Divider,
		Text
		} from 'react-native-paper'
import io from 'socket.io-client'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

let socket = io('http://192.168.1.7:3000')

const ManageScreenBySchool = ({ navigation }) => {

	const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
	const [selectedDate,setSelectedDate]=useState('')
	
	const showDatePicker = () => setDatePickerVisibility(true)
	const hideDatePicker = () => setDatePickerVisibility(false)
	const handleConfirm = (date) => {
		setSelectedDate(date.toISOString().split('T')[0])
	    console.log(date.toISOString().split('T')[0])
	    hideDatePicker()
  	}

	const [room, setRoom] = useState([])
	const [selectedRoom, setSelectedRoom] = useState(null)

	const [name, setName] = useState([])
	const [selectedName, setSelectedName] = useState(null)

	const [result, setResult] = useState([])

	useEffect(()=>{
		socket.emit('db-get-room')
		socket.emit('db-get-name')
		socket.on('db-room', rows=>setRoom(rows))
		socket.on('db-name', rows=>setName(rows))
		socket.on('get-all', rows=>setResult(rows))
	}, []) //only re-run the effect if new data comes in

	return (
		<View style={{backgroundColor: 'white'}}>

	    	<Button
				onPress={() => showDatePicker()}
			>
				<Text>Date</Text>
			</Button>

	    	<DateTimePickerModal
	    	isVisible={isDatePickerVisible}
        	mode="date"
        	onConfirm={handleConfirm}
        	onCancel={hideDatePicker}
      		/>

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

      		<Picker
	        	style={{ height: 50, width: '100%', alignSelf: 'center'}}
	        	selectedValue={selectedName}
	        	onValueChange={(itemValue, itemIndex) => {setSelectedName(itemValue)}}
      		>
      			<Picker.Item label={'No Name'} value={null} />
      			{
      				name.map( (v,k) => <Picker.Item key={k} label={v.fullname} value={v.fullname} /> )
      			}
      		</Picker>
			<Button
					mode="contained"
					style={{ alignSelf:'center', backgroundColor: '#0B6121', width: 100}}
					onPress={ () => {
						socket.emit('db-get-all', selectedDate, selectedRoom, selectedName)
					}}
			>FIND</Button>
			
			<View style={{alignItems:'center', justifyContent: 'center', backgroundColor: 'green', top: 5, height:40}}>
				<Text style={{fontSize: 30, fontWeight: 'bold', color: 'white'}}>RESULT</Text>
			</View>
			<ScrollView style={{top: 2, height: '69%'}}>
				{
					result.map( (v,k) => {
						return (
							<Card key={k}>
								<Card.Content>
								<Text>Họ và tên:  {v.fullname}</Text>
								<Text>Lớp          :  {v.room}</Text>
								<Text>Nhiệt độ :   {v.temperature}</Text>
								<Text>Ngày đo :   {v.date}</Text>
								<Text>Giờ đo    :   {v.time}</Text>
								</Card.Content>
								<Text></Text>
								<Divider/>
							</Card>
							)
					})
				}
			</ScrollView>
		</View>
			
		
	)
}

export default ManageScreenBySchool
/*
			<Appbar.Header style={{height:'5%'}}>
				<Appbar.BackAction onPress={() => {navigation.navigate('ProfileBySchool')}} />
				<Appbar.Content title="Manage by School"/>
			</Appbar.Header>


			<DataTable.Row>
							<DataTable.Cell numeric>2020</DataTable.Cell>
							<DataTable.Cell numeric>11</DataTable.Cell>
							<DataTable.Cell numeric>3</DataTable.Cell>
							<DataTable.Cell numeric>4</DataTable.Cell>
							<DataTable.Cell numeric>5</DataTable.Cell>
							<DataTable.Cell numeric>6</DataTable.Cell>
							<DataTable.Cell numeric>7</DataTable.Cell>
					</DataTable.Row>
*/

