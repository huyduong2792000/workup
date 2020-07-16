/* eslint-disable no-undef */
import 'react-native-gesture-handler';
import * as React from 'react';
import {Platform, StatusBar, View, DeviceEventEmitter} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
// import { SplashScreen } from 'expo';
// import * as Font from 'expo-font';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainTabNavigator from 'navigation/MainTabNavigator';
// import useLinking from 'navigation/useLinking';

import TaskInfoDetailScreen from 'screens/taskinfo/TaskInfoDetailScreen';
import ContainerSelectFollowersTaskInfoScreen from 'screens/taskinfo/ContainerSelectFollowersTaskInfoScreen';
import ContainerSelectAssigneeTaskinfoScreen from 'screens/taskinfo/ContainerSelectAssigneeTaskinfoScreen';

import UserDetailScreen from 'screens/user/UserDetailScreen';
import UserCollectionScreen from 'screens/user/UserCollectionScreen';
import UserSelectScreen from 'screens/user/UserSelectScreen';

import LoginScreen from 'screens/LoginScreen';

import GroupCollectionScreen from 'screens/group/GroupCollectionScreen';
import GroupDetailScreen from 'screens/group/GroupDetailScreen';
import ListMemberScreen from 'screens/group/ListMemberScreen';
import AddMemberScreen from 'screens/group/AddMemberScreen';

import TaskScheduleCollectionScreen from 'screens/taskschedule/TaskScheduleCollectionScreen';
import TaskScheduleDetailScreen from 'screens/taskschedule/TaskScheduleDetailScreen';

import TaskDetailScreen from 'screens/task/TaskDetailScreen';
import SelectFollowers from 'screens/task/SelectFollowers';
import SelectAssignee from 'screens/task/SelectAssignee';

import SignUpScreen from 'screens/SignUpScreen';
import SignUpDisplayName from 'screens/SignUpDisplayName';

import CheckListDetail from 'screens/checklist/CheckListDetail';
import ChecklistCollection from 'screens/checklist/ChecklistCollection';

import {setCurrentUser} from 'store/ActionStore';
import {setCurrentGroup} from 'store/group/Actions';

import store from 'store/Store';
import BaseApi from 'common/BaseApi';
import {Provider} from 'react-redux';
import {useSelector, useDispatch} from 'react-redux';
import Colors from 'constants/Colors';
import Toast from 'common/Toast';
import DateTimePickerField from 'common/DateTimePickerField';
const Stack = createStackNavigator();

function App(_props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  // const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  // const { getInitialState } = useLinking(containerRef);
  const [initialRouteName, setinitialRouteName] = React.useState('LoginScreen');
  const dispatch = useDispatch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkCurrentUser = async () => {
    await BaseApi({urlPrefix: '/', collectionName: 'current-user'})
      .get()
      .then((response) => {
        dispatch(setCurrentUser(response.data));
        dispatch(setCurrentGroup(response.data.group_last_access));
        setinitialRouteName('Home');
        setLoadingComplete(true);
      })
      .catch((error) => {
        setinitialRouteName('LoginScreen');
        setLoadingComplete(true);
      });
  };
  //Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    StatusBar.setBarStyle('dark-content');
    // StatusBar.setBackgroundColor(Colors.headerColor)
    checkCurrentUser();
    //   async function loadResourcesAndDataAsync() {
    //     await checkCurrentUser();
    //     try {
    //       // Load our initial navigation state
    //       // setInitialNavigationState(await getInitialState());
    //       // Load fonts
    //       // await Font.loadAsync({
    //       //     ...Ionicons.font,
    //       //     'space-mono': require('assets/fonts/SpaceMono-Regular.ttf'),
    //       // });
    //       //check current user
    //     } catch (e) {
    //       // We might want to provide this error information to an error reporting service
    //       console.warn(e);
    //     } finally {
    //       setLoadingComplete(true);
    //     }
    //   }
    //   loadResourcesAndDataAsync();
    // }, []);
  }, []);
  if (isLoadingComplete) {
    return (
      <SafeAreaProvider>
        <NavigationContainer>
          {/* <Stack.Navigator  initialRouteName={initialRouteName}> */}
          {/* <Stack.Navigator  initialRouteName={"TaskScheduleDetailScreen"}> */}
          <Stack.Navigator
            initialRouteName={initialRouteName}
            // keyboardHandlingEnabled={false}
            // mode={'card'}
            screenOptions={{
              headerStyle: {
                borderBottomWidth: 0.4,
                elevation: 0,
                borderColor: '#F1F1F1',
              },
              headerTitleStyle: {
                justifyContent: 'center',
                //   width:300,
                alignSelf: 'center',
                // overFollow:'hidden'
              },
              headerBackImage: () => {
                return (
                  <View>
                    <Ionicons
                      name="ios-arrow-back"
                      size={25}
                      color={Colors.tintColor}
                    />
                  </View>
                );
              },
              headerBackTitleVisible: true,
              headerTitleContainerStyle: {
                overflow: 'hidden',
                justifyContent: 'center',
                width: 200,
              },
              headerBackTitleStyle: {
                color: Colors.tintColor,
                paddingLeft: 5,
                fontSize: 15,
              },
              headerLeftContainerStyle: {
                overflow: 'hidden',
                justifyContent: 'center',
                width: 115,
                paddingLeft: Platform.OS == 'ios' ? 10 : 0,
              },
              headerRightTitleStyle: {
                fontSize: 15,
              },
              headerTitleAlign: 'center',
              // gestureEnabled:false
            }}>
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SignUpScreen"
              component={SignUpScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SignUpDisplayName"
              component={SignUpDisplayName}
              options={{headerShown: false}}
            />
            {/* <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: true}}/> */}
            <Stack.Screen 
            name="Home" 
            component={MainTabNavigator} 
            options={{gestureEnabled:false}}/>

            {/* <Stack.Screen name="TaskInfoDetailScreen" component={TaskInfoDetailScreen} options={{}} /> */}
            {/* <Stack.Screen name="TaskInfoCollectionScreen" component={TaskInfoCollectionScreen} options={{}} /> */}

            <Stack.Screen
              name="UserDetailScreen"
              component={UserDetailScreen}
              options={{}}
            />
            <Stack.Screen
              name="UserCollectionScreen"
              component={UserCollectionScreen}
              options={{}}
            />
            <Stack.Screen
              name="UserSelectScreen"
              component={UserSelectScreen}
              options={{}}
            />

            <Stack.Screen
              name="GroupCollectionScreen"
              component={GroupCollectionScreen}
              options={{
                title: 'Tất cả nhóm',
                headerStyle: {
                  elevation: 0,
                  // height:70,
                  // backgroundColor:'lightskyblue'
                },
              }}
            />
            <Stack.Screen
              name="GroupDetailScreen"
              component={GroupDetailScreen}
              options={{title: 'Nhóm'}}
            />
            <Stack.Screen
              name="ListMemberScreen"
              component={ListMemberScreen}
              options={{title: 'Thành viên'}}
            />
            <Stack.Screen
              name="AddMemberScreen"
              component={AddMemberScreen}
              options={{title: 'Thêm thành viên'}}
            />

            <Stack.Screen
              name="TaskScheduleCollectionScreen"
              component={TaskScheduleCollectionScreen}
              options={{}}
            />
            <Stack.Screen
              name="TaskScheduleDetailScreen"
              component={TaskScheduleDetailScreen}
              options={{}}
            />
            <Stack.Screen
              name="TaskDetailScreen"
              component={TaskDetailScreen}
              options={{title: 'Chi tiết việc'}}
            />
            <Stack.Screen
              name="SelectFollowers"
              component={SelectFollowers}
              options={{title: 'người theo dõi'}}
            />
            <Stack.Screen
              name="SelectAssignee"
              component={SelectAssignee}
              options={{title: 'Người giám sát'}}
            />

            <Stack.Screen
              name="CheckListDetail"
              component={CheckListDetail}
              options={{title: 'Checklist'}}
            />
            <Stack.Screen
              name="ChecklistCollection"
              component={ChecklistCollection}
              options={{title: 'Checklist'}}
            />

            <Stack.Screen
              name="TaskInfoDetailScreen"
              component={TaskInfoDetailScreen}
              options={{title: 'Chi tiết việc'}}
            />
            <Stack.Screen
              name="ContainerSelectFollowersTaskInfoScreen"
              component={ContainerSelectFollowersTaskInfoScreen}
              options={{title: 'người theo dõi'}}
            />
            <Stack.Screen
              name="ContainerSelectAssigneeTaskinfoScreen"
              component={ContainerSelectAssigneeTaskinfoScreen}
              options={{title: 'người theo dõi'}}
            />
          </Stack.Navigator>
        </NavigationContainer>
        {/* </SafeAreaView> */}
      </SafeAreaProvider>
    );
  } else {
    return null;
  }
}

// export default () => {
//     return <Text>sdgag</Text>
// }
export default function () {
  const toast = React.useRef(null);
  const date_time_picker = React.useRef(null);
  showToast = (params) => {
    toast.current.show(params);
  };
  showDateTimePicker = (params) => {
    params = {
      ...{
        showDate: true,
        showTime: false,
        value: new Date(),
        onChange: () => {},
      },
      ...params,
    };
    date_time_picker.current.open(params);
  };

  React.useEffect(() => {
    DeviceEventEmitter.addListener('showToast', (e) => {
      showToast(e);
    });
    DeviceEventEmitter.addListener('showDateTimePicker', (e) => {
      showDateTimePicker(e);
    });
  }, []);
  return (
    <Provider store={store}>
      <>
        <App />
        <Toast ref={toast} position="bottom" />
        <DateTimePickerField ref={date_time_picker} />
      </>
    </Provider>
  );
}
