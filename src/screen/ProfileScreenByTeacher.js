import React from 'react'
import { View, ImageBackground, StyleSheet  } from 'react-native'
import { Appbar, Text, Button } from 'react-native-paper'

const ProfileScreen = ({ route,navigation }) => {
  const {receivedROOM} = route.params
	return( 
	<View>

    <ImageBackground source={require('../../assets/background.jpg')} style={{ width: '100%', height: '100%'}}>
      <View style={styles.show}>
  			<Button
  				mode="contained"
  				onPress={()=>navigation.navigate('ManageByTeacher', {receivedROOM: receivedROOM})}
  				style={styles.button1}>
  				<Text style={styles.textbutton}>Manage</Text>
  			</Button>
  			<Button
  				mode="contained"
  				onPress={()=>navigation.navigate('MessageByTeacher')}
  				style={styles.button2}>
  				<Text style={styles.textbutton}>Message</Text>
  			</Button>
      </View>
    </ImageBackground>
	</View>
)}

const styles = StyleSheet.create({
  show: {
    alignItems: 'center', 
    justifyContent: 'center'
  },
  button1: {
    top: '10%',
    width: '80%',
    height: '30%',
    borderRadius: 30,
    backgroundColor: '#C8FE2E',
    borderWidth: 4,
    borderColor: 'black',
    alignItems: 'center', 
    justifyContent: 'center'
  },
  button2: {
    top: '30%',
    width: '80%',
    height: '30%',
    borderRadius: 30,
    backgroundColor: '#FACC2E',
    borderWidth: 4,
    borderColor: 'black',
    alignItems: 'center', 
    justifyContent: 'center'
  },
  image: {
    width:'100%', height:'100%',
    alignItems: 'center',
    justifyContent: "center"
  },
  textbutton: {
  	color:'#0B0B61',
  	fontWeight: 'bold',
  	fontSize: 35
  }
});
export default ProfileScreen
/*
const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical'
        <Appbar.Header style={{height:'5%'}}>
          <Appbar.BackAction onPress={() => {navigation.navigate('Home')}} />
          <Appbar.Content title="Profile"/>
        </Appbar.Header>
*/