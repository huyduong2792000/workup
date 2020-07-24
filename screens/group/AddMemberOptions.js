import React,{useState} from 'react';
import {StyleSheet, Text, View, TouchableWithoutFeedback, TouchableOpacity, Platform, DeviceEventEmitter, Keyboard} from 'react-native';
import SearchBar from '../../components/common/SearchBar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from 'constants/Colors';
import BaseApi from 'common/BaseApi';
import Validate from 'common/Validate';
import {useSelector} from 'react-redux';

export default function AddMemberOptions({navigation, route}) {
  const [search_value, setSearchValue] = useState('');
  const group = useSelector((state) => state.Group);
  const onPressAddMemberFromContacts = () => {
    navigation.navigate('AddMemberFromContactsScreen')
  }
  const AddMember = async () => {
    Keyboard.dismiss()
    if(Validate.validatePhone(search_value)){
      try{
        let data = {phone: search_value, group_id:group.id}
        await BaseApi({collectionName: 'add_member'}).post(data);
        DeviceEventEmitter.emit('showToast', {text:'Thêm thành công', type:'success'});
      }catch{
        DeviceEventEmitter.emit('showToast', {text:'Không tìm được số điện thoại này', type:'danger'});
      }
    }else{
      DeviceEventEmitter.emit('showToast', {text:'Số điện thoại không hợp lệ', type:'warning'});
    }
  }
  const onChangeSreachValue = (term) => {
    setSearchValue(term);
  }
  return (
    <View style={styles.container}>
        <View style={styles.search_container}>
          <View style={{flex: 1, position: 'relative',marginHorizontal: 10}}>
            <SearchBar 
              searchPlaceholder={'Nhập số điện thoại'} 
              onChangeText={onChangeSreachValue}
            />
          </View>
          <TouchableOpacity style={styles.plus_container} onPress={AddMember}>
              <AntDesign
              name="plus"
              size={20}
              color={Colors.tintColor}
              ></AntDesign>
          </TouchableOpacity>
        </View>
      <View style={{flex: 1}}>
        <TouchableOpacity
          onPress={onPressAddMemberFromContacts}
          style={styles.add_members_field_container}>
          <AntDesign
            name="contacts"
            size={25}
            style={{paddingRight: 10}}
            color={Colors.tintColor}
          />
          <Text style={{fontSize: 18, color: '#006CFF'}}>
            Thêm Từ Danh Bạ
          </Text>
        </TouchableOpacity>
        <View style={{flex: 1}}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  add_members_field_container: {
    fontSize: 18,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 10,
    marginRight: 10,
    paddingVertical: 10,
    borderBottomWidth: Platform.OS === 'ios' ? 0.3 : 0.4,
  },
  search_container:{
    flexDirection: 'row',
  },
  plus_container:{
    width:30,
    height:30,
    position: 'absolute',
    // backgroundColor: 'red',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft:-10,
    right: 10,
    backgroundColor: '#ddd',

  }
});
