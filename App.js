import 'react-native-gesture-handler' // make sure it's at the top and there's nothing else before it

import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import Ionicons from 'react-native-vector-icons/Ionicons'

import HomeScreen from './src/screen/HomeScreen'
import ProfileScreenBySchool from './src/screen/ProfileScreenBySchool'
import ProfileScreenByTeacher from './src/screen/ProfileScreenByTeacher'
import SplashScreen from './src/screen/SplashScreen'
import ManageScreenBySchool from './src/screen/ManageScreenBySchool'
import ManageScreenByTeacher from './src/screen/ManageScreenByTeacher'
import MessageScreenBySchool from './src/screen/MessageScreenBySchool'
import MessageScreenByTeacher from './src/screen/MessageScreenByTeacher'
import MessageScreenByStudent from './src/screen/MessageScreenByStudent'
// const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

const App = () => {
	// return null
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Splash">
				<Stack.Screen name="Splash" options={{ title: 'RFID Temperature' }} component={SplashScreen} />
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen name="ProfileBySchool" component={ProfileScreenBySchool} />
				<Stack.Screen name="ProfileByTeacher" component={ProfileScreenByTeacher} />
				<Stack.Screen name="ManageBySchool" component={ManageScreenBySchool} />
				<Stack.Screen name="ManageByTeacher" component={ManageScreenByTeacher} />
				<Stack.Screen name="MessageBySchool" component={MessageScreenBySchool} />
				<Stack.Screen name="MessageByTeacher" component={MessageScreenByTeacher} />
				<Stack.Screen name="MessageByStudent" component={MessageScreenByStudent} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default App

/*
import ManageScreenBySchool from './src/screen/ManageScreenBySchool'
<Stack.Screen name="ManageBySchool" component={ManageScreenBySchool} />
<Tab.Navigator
				screenOptions={ ({ route }) => ({
					tabBarIcon: ({ focused, color, size }) => {
						let iconName = ''
						switch(route.name) {
							case 'Home':
								iconName = 'ios-cube'
								break
							case 'Profile':
								iconName = 'ios-person'
								break
						}

						return <Ionicons name={iconName} size={32} color={'black'} />
					}
				}) }
			>
				<Tab.Screen name="Home" component={HomeScreen} />
				<Tab.Screen name="Profile" component={ProfileScreen} />
			</Tab.Navigator>
*/