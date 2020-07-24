import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {StyleSheet, Text, View, DeviceEventEmitter} from 'react-native';
import {useSelector} from 'react-redux';
import Colors from 'constants/Colors';
import BaseApi from 'common/BaseApi';
const ItemView = ({data_render}) => {
  const currentUser = useSelector((state) => state.currentUser);

  const onPressJoinGroupButton = async () => {
    try {
      let data = {group_id:data_render.id,user_id: currentUser.id};
      await BaseApi({collectionName: 'join_to_group'}).save(data);
      DeviceEventEmitter.emit('showToast', {
        text: 'Vaò nhóm thành công',
        type: 'success',
      });
    } catch (error) {
      DeviceEventEmitter.emit('showToast', {
        text: 'Không thể tham gia group này',
        type: 'danger',
      });
    }
  }
  
  const onPressLeaveGroupButton = async () => {
    try {
      let data = {group_id:data_render.id,user_id: currentUser.id};
      await BaseApi({collectionName: 'leave_to_group'}).save(data);
      DeviceEventEmitter.emit('showToast', {
        text: 'Rời nhóm thành công',
        type: 'success',
      });
    } catch (error) {
      DeviceEventEmitter.emit('showToast', {
        text: 'Đã có lỗi xảy ra',
        type: 'danger',
      });
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <FontAwesome
          name="group"
          size={30}
          style={{alignSelf: 'center', color: '#007CFF'}}
        />
      </View>
      <View style={styles.infoContainer} onPress={() => {}}>
        <View style={styles.info}>
          <View style={styles.field}>
            <Text style={styles.title}>{data_render.group_name}</Text>
          </View>
          <View style={{position: 'absolute', right: 10, top: 10}}>
            {data_render.check_current_user_is_admin || data_render.check_current_user_is_member
            ?<Text style={{fontSize:16, color: '#FF937B'}} onPress={onPressLeaveGroupButton}>Rời nhóm</Text>
            :<Text style={{fontSize:16, color: Colors.tintColor}} onPress={onPressJoinGroupButton}>Vào nhóm</Text>
            }
          </View>
          <View style={styles.field}>
            <Text style={{color: 'gray'}}>
              {data_render.total_admins} admin
            </Text>
            {/* <View style={{flexDirection:'row',justifyContent:'flex-start'}}> */}
            <Text
              style={
                data_render.check_current_user_is_admin
                  ? {color: 'gray'}
                  : {display: 'none'}
              }>
              Bạn là admin của nhóm này
            </Text>
          </View>
          <View style={{...styles.field, borderBottomWidth: 0}}>
            <Text style={{color: 'gray'}}>
              {data_render.total_members} thành viên
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ItemView;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
    marginTop: 15,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    borderRadius: 10,
    elevation: 2,
  },
  field: {
    // paddingVertical:10,
    // borderBottomWidth:0.6,
    // borderColor:'#CFCFCF',
  },
  avatarContainer: {
    width: 70,
    paddingTop: 10,
    alignSelf: 'flex-start',
  },
  infoContainer: {
    flex: 1,
    // flexDirection:'row',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
