import React from 'react'
import { View, Image, ImageBackground, StyleSheet} from 'react-native'
import { Avatar, Button, Text } from 'react-native-paper'

const SplashScreen = ({ navigation }) => {
	return (
		<ImageBackground source={require('../../assets/background.jpg')} style={{ width: '100%', height: '100%', opacity: 0.9}}>
			<View  style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
				<View style={{ 
								backgroundColor:'#00FF80', 
								borderRadius: 155, 
								width: 310, 
								height:310, 
								alignItems: 'center', 
								justifyContent: 'center'}}>
					<View style={{ 
								backgroundColor:'white', 
								borderRadius: 135, 
								width: 270, 
								height:270, 
								alignItems: 'center', 
								justifyContent: 'center'}}>
							<Image source={require('../../assets/logoerase.png')} style={{ width: 200, height: 200 }}/>
					</View>
				</View>
				<Button
					mode="contained"
					onPress={()=>navigation.navigate('Home')}
					style={{ 
						alignSelf:'center',  
						backgroundColor:'#00FF00', borderWidth: 4, borderColor: '#0B610B', borderRadius: 10,
						marginTop: '20%',
						width: 150}}>
						<Text style={{color:'#0B0B61', fontWeight:'bold', fontSize: 25}}>NEXT</Text>
				</Button>
			</View>
		</ImageBackground>
	)
}

export default SplashScreen