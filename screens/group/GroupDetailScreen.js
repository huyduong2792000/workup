import React, {useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  DeviceEventEmitter,
} from 'react-native';
import BaseApi from '../../components/common/BaseApi';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {setGroup, setCurrentGroup} from '../../store/group/Actions';
import {useSelector, useDispatch} from 'react-redux';

const GroupDetailScreen = ({route, navigation}) => {
  const id = route.params ? route.params.id : null;
  const dispatch = useDispatch();
  const group = useSelector((state) => state.Group);
  const currentUser = useSelector((state) => state.currentUser);
  navigation.setOptions({
    headerRight: () => (
      <View style={{paddingHorizontal: 10, position: 'relative'}}>
        <Text
          onPress={() => {
            onDeleteGroup();
          }}
          style={group.id ? {fontSize: 15, color: 'red'} : {fontSize: 15}}>
          {group.id ? 'Xóa' : ''}
        </Text>
      </View>
    ),
  });
  const saveProcess = async () => {
    Keyboard.dismiss();
    if (group.group_name) {
      try {
        const data = await BaseApi({collectionName: 'group'}).save(group);
        // dispatch(setCurrentGroup(data))
        DeviceEventEmitter.emit('showToast', {
          text: 'Lưu thành công',
          type: 'success',
        });
        navigation.goBack();
      } catch (error) {
        DeviceEventEmitter.emit('showToast', {
          text: 'Đã có lỗi xảy ra',
          type: 'danger',
        });
      }
    } else {
      DeviceEventEmitter.emit('showToast', {
        text: 'Tên group không được để trống',
        type: 'warning',
      });
    }
  };
  const onDeleteGroup = async () => {
    var data_save = {...group};
    data_save.deleted = true;
    if (data_save.id && data_save.group_name) {
      await BaseApi({collectionName: 'group'})
        .save(data_save)
        .then(() => {
          // dispatch(setGroup({id:null,group_name:null,members:[]}))
          navigation.goBack();
        });
    } else {
      navigation.goBack();
    }
  };
  const onPressAddMember = async () => {
    Keyboard.dismiss();

    if (group.group_name) {
      try {
        const data = await BaseApi({collectionName: 'group'}).save(group);
        dispatch(setGroup(data));
        navigation.navigate('AddMemberOptions');
      } catch (error) {
        DeviceEventEmitter.emit('showToast', {
          text: 'Đã có lỗi xảy ra khi lưu nhóm',
          type: 'danger',
        });
      }
    } else {
      DeviceEventEmitter.emit('showToast', {
        text: 'Tên group không được để trống',
        type: 'warning',
      });
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (id) {
        BaseApi({collectionName: 'group'})
          .get({id: id})
          .then((response) => {
            dispatch(setGroup(response.data));
          });
      } else {
        const init_reducer = {
          id: null,
          group_name: null,
          description: null,
          total_members: 0,
          total_tasks_info: 0,
          total_admins: 0,
          first_five_admins: [],
        };
        dispatch(setGroup(init_reducer));
      }
    });
    return unsubscribe
  }, [navigation]);
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={{flex: 1, flexDirection: 'column'}}>
          {/* TÊN GROUP  */}
          <View style={{...styles.group_name, ...styles.field}}>
            <Text style={{fontSize: 18, paddingRight: 10}}>Tên nhóm:</Text>
            <TextInput
              style={{flex: 1, fontSize: 18}}
              value={group.group_name}
              placeholder="nhập tên nhóm"
              multiline={true}
              // autoFocus={true}
              onChangeText={(term) => {
                dispatch(setGroup({group_name: term}));
              }}
            />
          </View>
          {/* MÔ TẢ */}
          <View style={{...styles.group_name, ...styles.field}}>
            <Text style={{fontSize: 18, paddingRight: 10, alignSelf: 'center'}}>
              Mô tả:
            </Text>
            <TextInput
              style={{flex: 1, fontSize: 18}}
              value={group.description}
              placeholder="mô tả"
              multiline={true}
              onChangeText={(term) => {
                dispatch(setGroup({description: term}));
              }}
              // autoFocus={true}
            />
          </View>
          {/* TẤT CẢ THÀNH VIÊN */}
          <TouchableOpacity
            onPress={() => {
              Keyboard.dismiss();
              navigation.navigate('ListMemberScreen');
            }}
            style={{
              ...styles.field,
              backgroundColor: '#F7F7F7',
              borderBottomWidth: 0,
              justifyContent: 'space-between',
            }}>
            <Text style={styles.text}>Thành viên({group.total_members})</Text>
            <Text style={styles.text}>
              Quản trị viên({group.total_admins}):
            </Text>

            <AntDesign name="right" style={{alignSelf: 'center'}} />
          </TouchableOpacity>
          {/* <View style={styles.field }>
                    <Text style={{ fontSize: 18, paddingRight: 10,alignSelf:'flex-start' }}>Quản trị viên({group.total_admins}):</Text>
                    <FlatList
                    horizontal
                    contentContainerStyle={{flexDirection : "row", flexWrap : "wrap",flex:1}}
                    data={group.first_five_admins}
                    keyExtractor={item=>item.id}
                    ItemSeparatorComponent={()=>(<Text style={{fontSize:18}}>,  </Text>)}
                    renderItem={({item})=><Text style={{fontSize:18,width:50}}>{item.display_name}</Text>}
                    ></FlatList>
                </View> */}
          {/* <TasksInfoInGroup></TasksInfoInGroup> */}
          <View style={{...styles.field}}>
            <TouchableOpacity
              onPress={onPressAddMember}
              style={{
                flex: 1,
                fontSize: 18,
                paddingVertical: 5,
                flexDirection: 'row',
              }}>
              <AntDesign
                name="plus"
                size={25}
                style={{paddingRight: 10}}
                color="#006CFF"
              />
              <Text style={{fontSize: 18, color: '#006CFF'}}>
                Thêm thành viên
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            margin: 0,
            padding: 10,
            flexDirection: 'row',
            backgroundColor: 'white',
          }}>
          <TouchableOpacity
            onPress={saveProcess}
            style={{
              backgroundColor: '#006CFF',
              borderRadius: 10,
              flex: 1,
              height: 40,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                alignSelf: 'center',
                color: 'white',
                fontSize: 18,
                fontWeight: 'bold',
                lineHeight: 40,
              }}>
              {id ? 'Lưu nhóm' : 'Tạo nhóm'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default GroupDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#EDEDED',
    paddingTop: 10,
  },
  group_name: {},
  members: {
    // flex:1
  },
  field: {
    backgroundColor: 'white',
    padding: 10,
    paddingHorizontal: 15,
    borderColor: '#CFCFCF',
    borderBottomWidth: 0.6,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    // flexWrap:'wrap'
    // height:'100%'
  },
  text: {
    color: 'gray',
    flex: 1,
    paddingVertical: 5,
  },
});
