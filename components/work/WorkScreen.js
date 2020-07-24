/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../constants/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {useSelector, useDispatch} from 'react-redux';
import {setCurrentUser} from '../../store/ActionStore';
import BaseApi from '../common/BaseApi';
import {setGroup, setCurrentGroup} from '../../store/group/Actions';
import HeaderView from '../../components/headers/HeaderView';
export default function WorkScreen(props) {
  const {navigation} = props;
  const currentUser = useSelector((state) => state.currentUser);
  const current_group_select = useSelector((state) => state.currentGroupSelect);
  const dispatch = useDispatch();
  const logoutProcess = async () => {
    BaseApi({urlPrefix: '/', collectionName: 'logout'})
      .post({group_last_access_id: current_group_select.id})
      .then(() => {
        dispatch(setCurrentUser({}));
        navigation.navigate('LoginScreen');
      });
    dispatch(setCurrentGroup({id: null, group_name: ''}));
  };
  return (
    <View style={styles.container}>
      <HeaderView />
      <View style={{backgroundColor: 'white', flexDirection: 'column'}}>
        <View style={styles.workSection}>
          <View style={styles.workItem}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('GroupCollectionScreen');
              }}
              style={styles.iconContainer}>
              <FontAwesome name="group" size={26} style={styles.icon} />
            </TouchableOpacity>
            <Text
              onPress={() => {
                dispatch(
                  setGroup({
                    id: null,
                    group_name: null,
                    members: [{info: currentUser, role_name: 'admin'}],
                  }),
                );
                navigation.navigate('GroupDetailScreen', {id: null});
              }}
              style={{textAlign: 'center', color: '#8a8a8a'}}>
              +Nhóm
            </Text>
          </View>


          <View style={styles.workItem}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('FilterGroupScreen')
              }}
              style={styles.iconContainer}>
              <AntDesign name="search1" size={26} style={styles.icon} />
            </TouchableOpacity>
            <Text
              onPress={() => {
                navigation.navigate('FilterGroupScreen')
              }}
              style={{textAlign: 'center', color: '#8a8a8a'}}>
              Tìm Nhóm
            </Text>
          </View>


          <View style={styles.workItem}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ChecklistCollection')}
              style={styles.iconContainer}>
              <FontAwesome name="list" size={26} style={styles.icon} />
            </TouchableOpacity>
            <Text
              onPress={() => {
                navigation.navigate('CheckListDetail');
              }}
              style={{textAlign: 'center', color: '#8a8a8a'}}>
              +Checklist {'\n'}
            </Text>
          </View>



          <View style={styles.workItem}>
            <TouchableOpacity
              onPress={() => {
                logoutProcess();
              }}
              style={styles.iconContainer}>
              <AntDesign name="logout" size={26} style={styles.icon} />
            </TouchableOpacity>
            <Text
              onPress={() => {
                logoutProcess();
              }}
              style={{textAlign: 'center', color: '#8a8a8a'}}>
              Đăng xuất
            </Text>
          </View>
        </View>

        {/* <View>
          <Text style={{fontSize: 20, fontWeight: '600', marginLeft: 15}}>
            Applications
          </Text>
          <View style={styles.workSection}>
            <View
              style={{
                flex: 1,
                paddingTop: 10,
                paddingBottom: 10,
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 54,
                  height: 54,
                  backgroundColor: '#0195ff',
                  borderRadius: 10,
                }}
              />
              <Text style={{fontSize: 13, lineHeight: 26}}>Attendance</Text>
            </View>
            <View
              style={{
                flex: 1,
                paddingTop: 10,
                paddingBottom: 10,
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 54,
                  height: 54,
                  backgroundColor: '#ffc801',
                  borderRadius: 10,
                }}
              />
              <Text style={{fontSize: 13, lineHeight: 26}}>Approval</Text>
            </View>
            <View
              style={{
                flex: 1,
                paddingTop: 10,
                paddingBottom: 10,
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 54,
                  height: 54,
                  backgroundColor: '#b55bcc',
                  borderRadius: 10,
                }}
              />
              <Text style={{fontSize: 13, lineHeight: 26}}>Check-in</Text>
            </View>
            <View
              style={{
                flex: 1,
                paddingTop: 10,
                paddingBottom: 10,
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 54,
                  height: 54,
                  backgroundColor: '#4596af',
                  borderRadius: 10,
                }}
              />
              <Text style={{fontSize: 12, lineHeight: 26}}>Announcement</Text>
            </View>
          </View>
          <View style={styles.workSection}>
            <View
              style={{
                flex: 1,
                paddingTop: 10,
                paddingBottom: 10,
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 54,
                  height: 54,
                  backgroundColor: '#0195ff',
                  borderRadius: 10,
                }}
              />
              <Text style={{fontSize: 13, lineHeight: 26}}>Report</Text>
            </View>
            <View
              style={{
                flex: 1,
                paddingTop: 10,
                paddingBottom: 10,
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 54,
                  height: 54,
                  backgroundColor: '#0195ff',
                  borderRadius: 10,
                }}
              />
              <Text style={{fontSize: 13, lineHeight: 26}}>Up Drive</Text>
            </View>
            <View
              style={{
                flex: 1,
                paddingTop: 10,
                paddingBottom: 10,
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 54,
                  height: 54,
                  backgroundColor: '#0195ff',
                  borderRadius: 10,
                }}
              />
              <Text style={{fontSize: 13, lineHeight: 26}}>Up Mail</Text>
            </View>
            <View
              style={{
                flex: 1,
                paddingTop: 10,
                paddingBottom: 10,
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 54,
                  height: 54,
                  backgroundColor: '#0195ff',
                  borderRadius: 10,
                }}
              />
              <Text style={{fontSize: 13, lineHeight: 26}}>Up Drive</Text>
            </View>
          </View>
        </View> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  workSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  },
  workItem: {
    flex: 1,
    padding: 10,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  iconContainer: {
    backgroundColor: '#ff3c78',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: 54,
    height: 54,
    // backgroundColor: "#0195ff",
    borderRadius: 10,
  },
  icon: {
    position: 'absolute',
    alignSelf: 'center',
    color: '#EEEEEE',
    // backgroundColor:'white',
    // borderWidth:1
  },
});
