import React from 'react';
import {useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {StyleSheet, Text, View} from 'react-native';
import Colors from 'constants/Colors';
const ItemView = ({data_render}) => {
  const navigation = useNavigation();
  return (
    <View
      style={styles.container}
      onPress={() =>
        navigation.navigate('GroupDetailScreen', {id: data_render.id})
      }>
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
            {data_render.check_current_user_is_admin ||data_render.check_current_user_is_member
            ?<Text style={{fontSize:16, color: Colors.tintColor}}>Vào nhóm</Text>
            :<Text style={{fontSize:16, color: '#FF937B'}}>Rời nhóm</Text>
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
