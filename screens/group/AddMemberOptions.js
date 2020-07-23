import React from 'react';
import {StyleSheet, Text, View, TouchableWithoutFeedback, TouchableOpacity, Platform} from 'react-native';
import SearchBar from '../../components/common/SearchBar';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function AddMemberOptions({navigation, route}) {
  const onPressAddMember = () => {
    navigation.navigate('AddMemberFromContactsScreen')
  }
  return (
    <View style={styles.container}>
        {/* <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}> */}
            <SearchBar searchPlaceholder={'Nhập số điện thoại'} />
        {/* </TouchableWithoutFeedback> */}
      <View style={{flex: 1}}>
        <TouchableOpacity
          onPress={onPressAddMember}
          style={styles.add_members_field_container}>
          <AntDesign
            name="contacts"
            size={25}
            style={{paddingRight: 10}}
            color="#006CFF"
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
  }
});
