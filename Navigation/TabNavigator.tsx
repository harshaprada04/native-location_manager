import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Map from '../Components/Screens/Map';
import HomePage from '../Components/Screens/HomePage';
import ContextProvider from '../Context/ContextProvider';

const Tab:any = createBottomTabNavigator()

function TabNavigator() {
    return (
       <ContextProvider>
        <NavigationContainer>
           <Tab.Navigator>
               <Tab.Screen testId="navigation-locations-tab" name="Home" component={HomePage}/>
               <Tab.Screen testId = "navigation-map-tab" name="Map" component={Map}/>
           </Tab.Navigator>
        </NavigationContainer>
        </ContextProvider>
       
    );
}

export default TabNavigator;