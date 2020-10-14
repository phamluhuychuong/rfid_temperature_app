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

const ManageScreenByTeacher = ({route,navigation}) => {
	const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
	const [selectedDate,setSelectedDate]=useState('')
	const [name, setName] = useState([])
	const [selectedName, setSelectedName] = useState(null)

	const [result, setResult] = useState([])

	const {receivedROOM} = route.params
	
	const showDatePicker = () => setDatePickerVisibility(true)
	const hideDatePicker = () => setDatePickerVisibility(false)
	const handleConfirm = (date) => {
		setSelectedDate(date.toISOString().split('T')[0])
	    console.log(date.toISOString().split('T')[0])
	    hideDatePicker()
  	}	

  	
	useEffect(()=>{
		socket.emit('db-get-name', receivedROOM)
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
					style={{ alignSelf:'center', backgroundColor: '#0B6121', width: 100, top: 5}}
					onPress={ () => {
						socket.emit('db-get-all', selectedDate, receivedROOM ,selectedName)
					}}
			>FIND</Button>

			<View style={{alignItems:'center', justifyContent: 'center', backgroundColor: 'green', top: 10, height:40}}>
				<Text style={{fontSize: 30, fontWeight: 'bold', color: 'white'}}>RESULT</Text>
			</View>
			<ScrollView style={{top: 10, height: '75%'}}>
				{
					result.map( (v,k) => {
						return (
							<Card key={k}>
								<Card.Content>
								<Text>Họ và tên:  {v.fullname}</Text>
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
export default ManageScreenByTeacher

/*
			<Appbar.Header style={{height:'5%'}}>
				<Appbar.BackAction onPress={() => {navigation.navigate('ProfileBTeacher')}} />
				<Appbar.Content title="Manage by Teacher"/>
			</Appbar.Header>



			<View style={{backgroundColor: 'white'}}>

	    	<DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

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
					style={{ alignSelf:'center', backgroundColor: '#0B6121', width: 100, top: 5}}
					onPress={ () => {
						socket.emit('db-get-all-for-date', selectedDate)
					}}
			>FIND</Button>
			<View style={{alignItems:'center', justifyContent: 'center', backgroundColor: 'green', top: 10, height:40}}>
				<Text style={{fontSize: 30, fontWeight: 'bold', color: 'white'}}>RESULT</Text>
			</View>
			<ScrollView style={{left: '5%', top: '1%', height: '74%'}}>
				{
					resDate.map( (v,k) => {
						return (
							<View key={k}>
								<Text>Họ và tên:  {v.fullname}</Text>
								<Text>Nhiệt độ :   {v.temperature}</Text>
								<Text>Ngày đo :   {v.date}</Text>
								<Text>Giờ đo    :   {v.time}</Text>
								<Divider/>
							</View>
							)
					})
				}
			</ScrollView>
		</View>
			
		
	)





	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
	const showDatePicker = () => {
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    hideDatePicker();}

	const [datePicker, setDatePicker] = useState(new Date())
	var str=datePicker.toString() 
	var selectedDate=str.substring(0,10)

	const [name, setName] = useState([])
	const [selectedName, setSelectedName] = useState(null)

	const [resDate, setResDate] = useState([])
	const [resName, setResName] = useState([])

	useEffect(()=>{
		socket.emit('db-get-name')
		socket.on('db-name', rows=>setName(rows))
		socket.on('get-all-for-date', rows=>setResDate(rows))
		socket.on('get-all-for-name', rows=>setResName(rows))
	}, []) //only re-run the effect if new data comes in



	<Button
			style={{ alignSelf:'center', backgroundColor: '#0B6121', width: 100, top: 5}}
			onPress={showDatePicker}
			>
				<Text style={{alignSelf:'center', color: 'white', fontWeight: 'bold'}}>Date</Text>
			</Button>
*/