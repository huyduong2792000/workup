/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {View, Text, SafeAreaView, StatusBar} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import TabBarIcon from '../components/common/TabBarIcon';
import ProfileScreen from '../components/user/ProfileScreen';
import ChatList from '../components/chat/ChatList';
import HomeScreen from '../screens/HomeScreen';
import WorkScreen from '../components/work/WorkScreen';
import {useSafeArea} from 'react-native-safe-area-context';
import Colors from '../constants/Colors';
const Tab = createMaterialBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'HomeScreen';

const Navigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      barStyle={{
        backgroundColor: 'white',
        borderTopWidth: 0.3,
        borderColor: '#DADADA',
      }}
      // activeColor = {Colors.headerColor}
      activeColor={Colors.headerColor}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: <Text style={{paddingTop: 3}}>Home</Text>,
          tabBarIcon: ({focused}) => (
            <View style={{width: 50, justifyContent: 'center'}}>
              <MaterialCommunityIcons
                name="home"
                color={focused ? Colors.headerColor : '#DADADA'}
                size={29}
                style={{alignSelf: 'center'}}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="menu"
        component={WorkScreen}
        options={{
          tabBarLabel: <Text style={{paddingTop: 3}}>menu</Text>,
          tabBarIcon: ({focused}) => (
            <View style={{width: 50, justifyContent: 'center'}}>
              <MaterialCommunityIcons
                name="view-grid"
                color={focused ? Colors.headerColor : '#DADADA'}
                size={29}
                style={{alignSelf: 'center'}}
              />
            </View>
          ),
        }}
      />
      {/* <Tab.Screen
        name="ChatList"
        component={ChatList}
        options={{
          tabBarLabel: <Text style={{paddingTop: 3}}>chat</Text>,
          tabBarIcon: ({focused}) => (
            <View style={{width: 50, justifyContent: 'center'}}>
              <MaterialCommunityIcons
                name="chat"
                color={focused ? Colors.headerColor : '#DADADA'}
                size={29}
                style={{alignSelf: 'center'}}
              />
            </View>
          ),
        }}
      /> */}
      {/* <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarLabel: <Text style={{paddingTop: 5}}>profile</Text>,
          tabBarIcon: ({focused}) => (
            <View style={{width: 50, justifyContent: 'center'}}>
              <MaterialCommunityIcons
                name="face-outline"
                color={focused ? Colors.headerColor : '#DADADA'}
                size={29}
                style={{alignSelf: 'center'}}
              />
            </View>
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
};
export default (function ({navigation, route}) {
  navigation.setOptions({headerShown: false});
  const insets = useSafeArea();

  return (
    <View style={{flex: 1}}>
      <SafeAreaView
        style={{backgroundColor: Colors.headerColor, height: insets.top}}
      />
      {/* <StatusBar translucent/> */}
      <Navigator />
    </View>
  );
});
