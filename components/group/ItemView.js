import React from 'react';
import {useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';

import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';

const ItemView = ({data_render}) => {
  const navigation = useNavigation();
  const currentUser = useSelector(state => state.currentUser);

  const getAvatar = data => {
    var name_test = data.display_name || data.email;
    name_test = name_test.split(' ');
    var name_display =
      name_test[0].slice(0, 1) + name_test[name_test.length - 1].slice(0, 1);
    var style_member = {
      backgroundColor: '#00C9FF',
      position: 'relative',
      width: 50,
      height: 50,
      borderRadius: 999,
      alignItems: 'center',
      justifyContent: 'center',
    };
    return (
      <View style={style_member}>
        <Text style={{color: 'white', position: 'absolute'}}>
          {name_display}
        </Text>
      </View>
    );
  };
  return (
    <TouchableOpacity
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
            <FontAwesome
              style={
                data_render.check_current_user_is_admin ||
                data_render.check_current_user_is_member
                  ? null
                  : {display: 'none'}
              }
              name="check"
              size={30}
              color="#007CFF"
            />
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
            {/* <Text style={data_render.first_five_admins.length!=1?{display:'none'}:null}>({currentUser.display_name || currentUser.email})</Text>
                            <FlatList
                            horizontal
                            data={data_render.first_five_admins}
                            keyExtractor={item=>item.id}
                            ItemSeparatorComponent={()=><Text>, </Text>}
                            renderItem={({item})=>{
                            return (
                                    <Text style={item.id == currentUser.id?{display:'none'}:null}>
                                        {item.display_name || item.email}
                                    </Text>
                                )
                            }}
                            ></FlatList>
                        </View> */}
          </View>
          <View style={{...styles.field, borderBottomWidth: 0}}>
            <Text style={{color: 'gray'}}>
              {data_render.total_members} thành viên
            </Text>
            {/* <View style={{flexDirection:'row',justifyContent:'flex-start',flex:1,alignItems:'center'}}>
                            <View>
                                <FlatList
                                horizontal
                                data={data_render.first_five_members}
                                keyExtractor={item=>item.id}
                                renderItem={({item})=>{
                                return <View style={styles.follower}>
                                        {getAvatar(item)}
                                    </View>
                                }}
                                ></FlatList>
                            </View>
                            <Text> Có: </Text>
                            <View style={{flex:1,alignSelf:'center',overflow:'hidden'}}>
                                <FlatList
                                horizontal
                                data={data_render.first_five_members}
                                ItemSeparatorComponent={()=><Text style={{alignSelf:'center'}}>, </Text>}
                                keyExtractor={item=>item.id}
                                renderItem={({item})=>{
                                return <Text style={item.id == currentUser.id?{display:'none'}:{alignSelf:'center'}}>
                                            {item.display_name?item.display_name.split(" ").slice(-1)[0] :item.email}
                                        </Text>
                                }}
                                ></FlatList>
                            </View>
                        </View> */}
          </View>
        </View>
      </View>
    </TouchableOpacity>
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
