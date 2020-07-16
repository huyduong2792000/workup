import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Dimensions, Platform} from 'react-native';

import * as React from 'react';
import Received from './Received';
import Created from './Created';
import Followed from './Followed';
import PlaceholderLoading from './PlaceholderLoading';
import Colors from '../../constants/Colors';
const Tab = createMaterialTopTabNavigator();
const WIDTH = Dimensions.get('window').width;
function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Received"
      keyboardDismissMode="auto"
      lazy={true}
      // lazyPlaceholder = {()=><PlaceholderLoading/>}
      swipeVelocityImpact={1}
      timingConfig={1}
      tabBarOptions={{
        activeTintColor: 'black',
        inactiveTintColor: 'gray',
        labelStyle: {textTransform: 'capitalize', fontSize: 14},
        style: {
          borderBottomWidth: Platform.OS === 'ios' ? 0.3 : 0.4,
          elevation: 0,
          borderColor: '#F1F1F1',
        },
        tabStyle: {width: WIDTH / 3},
        indicatorStyle: {
          backgroundColor: Colors.headerColor,
          marginHorizontal: WIDTH / 6 - 15,
          width: 30,
          borderRadius: 15,
        },
      }}>
      <Tab.Screen
        name="Received"
        component={Received}
        options={{tabBarLabel: 'Đã nhận'}}
      />
      <Tab.Screen
        name="Created"
        component={Created}
        options={{tabBarLabel: 'Đã tạo'}}
      />
      <Tab.Screen
        name="Followed"
        component={Followed}
        options={{tabBarLabel: 'Theo dõi'}}
      />
    </Tab.Navigator>
  );
}
export default (function ({navigation, route}) {
  return <MyTabs />;
});
