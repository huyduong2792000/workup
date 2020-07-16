/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Text, View, Image} from 'react-native';
import Colors from 'constants/Colors';
import {useSelector} from 'react-redux';
import SwitchGroupModal from 'components/group/SwitchGroup';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default HeaderView = () => {
  const current_group_select = useSelector((state) => state.currentGroupSelect);
  const [show_list_group, setSwitchGroup] = useState(false);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        backgroundColor: Colors.headerColor,
      }}>
      <Text
        style={{fontWeight: 'bold', fontSize: 20, padding: 10}}
        onPress={() => {
          setSwitchGroup(true);
        }}>
        {current_group_select.group_name} <AntDesign name="down" />
      </Text>
      <SwitchGroupModal visible={show_list_group} setVisible={setSwitchGroup} />

      <View style={{alignItems: 'center', position: 'relative'}}>
        <Image
          source={require('assets/images/logo.png')}
          style={{
            alignSelf: 'center',
            right: 10,
            width: 40,
            height: 40,
            borderRadius: 99999,
          }}
        />
      </View>
    </View>
  );
};
