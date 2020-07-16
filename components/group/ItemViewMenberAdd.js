import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';
import BaseApi from 'common/BaseApi';
import {useSelector} from 'react-redux';

const ItemViewMenberAdd = React.memo(
  ({
    data_render,
    onSelect = () => {},
    isMember = null,
    onRefresh = () => {},
  }) => {
    const [is_select, setIsSelect] = useState(isMember);
    const group = useSelector((state) => state.Group);
    const getAvatar = () => {
      try {
        var name =
          data_render.display_name_server ||
          data_render.display_name ||
          data_render.email;
        name = name.split(' ');
        var name_display = (
          name[0].slice(0, 1) + name[name.length - 1].slice(0, 1)
        ).toUpperCase();
        return (
          <View
            style={{
              marginLeft: 5,
              backgroundColor: '#007CFF',
              width: 50,
              height: 50,
              borderRadius: 25,
              position: 'relative',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'white', position: 'absolute'}}>
              {name_display}
            </Text>
          </View>
        );
      } catch {
        return (
          <View
            style={{
              marginLeft: 5,
              backgroundColor: '#007CFF',
              width: 40,
              height: 40,
              borderRadius: 25,
              position: 'relative',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'white', position: 'absolute'}} />
          </View>
        );
      }
    };
    return (
      <View style={styles.container}>
        {/* <View style={{flex:1}}> */}
        <View style={{paddingHorizontal: 10, alignSelf: 'center'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {isMember !== null && (
              <TouchableOpacity
                onPress={() => {
                  if (!isMember) {
                    setIsSelect(!is_select);
                    onSelect(data_render);
                  }
                }}>
                <MaterialCommunityIcons
                  style={{color: is_select?'#007CFF':'black'}}
                  name={
                    is_select
                      ? 'checkbox-marked-circle-outline'
                      : 'checkbox-blank-circle-outline'
                  }
                  size={35}
                />
              </TouchableOpacity>
            )}
            {getAvatar()}
          </View>
        </View>
        <View style={styles.info_member}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>
              {data_render.display_name || data_render.email}
            </Text>
            <Text style={{paddingHorizontal: 10, color: 'gray'}}>
              {data_render.display_name_server}
            </Text>
          </View>
          <Text
            style={
              data_render.id && data_render.is_active
                ? {color: '#76E6FF'}
                : {display: 'none'}
            }>
            Đã tham gia WorkUp <AntDesign name="check" />
          </Text>
          <Text style={data_render.phone ? {color: 'gray'} : {display: 'none'}}>
            {data_render.phone}
          </Text>
        </View>
      </View>
    );
  },
);

export default ItemViewMenberAdd;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    // paddingVertical:5
  },
  info_member: {
    flex: 1,
    paddingVertical: 5,
    flexDirection: 'column',
    borderBottomWidth: 0.6,
    borderColor: '#CFCFCF',
    justifyContent:'center'
  },
  option_in_modal: {
    fontSize: 18,
    alignSelf: 'center',
    paddingVertical: 5,
    // flex:1
  },
});
