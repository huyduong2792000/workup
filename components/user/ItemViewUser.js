import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {useSelector, useDispatch, useStore} from 'react-redux';
import {setSelectMultipleFollowers} from '../../store/task/Actions';

const ItemViewUser = ({
  data = {},
  onSelect = () => {},
  dataCheckSelect = [],
  selectMode = 'multiple',
}) => {
  // const dispatch = useDispatch()
  const [isSelect, setIsSelect] = useState(false);
  const currentUser = useSelector((state) => state.currentUser);
  // const current_task = useSelector(state => state.currentTask)
  // const current_group_select = useSelector(state => state.currentGroupSelect)

  const getAvatar = () => {
    var name = data.display_name_server || data.display_name || data.email;
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
          borderRadius: 999,
          position: 'relative',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: 'white', position: 'absolute'}}>
          {name_display}
        </Text>
      </View>
    );
  };
  // const onSelect =() => {
  //     // setIsSelect(!isSelect)
  //     dispatch(setSelectMultipleFollowers(data))
  // }
  const checkSelect = () => {
    for (var follower of dataCheckSelect) {
      if (follower.id === data.id) {
        setIsSelect(true);
        return;
      }
    }
    setIsSelect(false);
  };
  useEffect(() => {
    checkSelect();
  }, [selectMode == 'multiple' ? null : dataCheckSelect[0].id]);
  return (
    <View style={styles.container}>
      <View style={{paddingHorizontal: 10, alignSelf: 'center'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <MaterialCommunityIcons
            onPress={() => {
              setIsSelect(!isSelect);
              onSelect({followed: isSelect, data: data});
            }}
            style={{color: isSelect?'#007CFF':'black'}}
            name={
              isSelect
                ? 'checkbox-marked-circle-outline'
                : 'checkbox-blank-circle-outline'
            }
            size={35}
          />
          {getAvatar()}
        </View>
      </View>
      <View style={styles.info_member}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontWeight: 'bold', fontSize: 16}}>
            {data.display_name || data.email}
          </Text>
          <Text
            style={
              data.id == currentUser.id
                ? {fontWeight: 'bold', fontSize: 16}
                : {display: 'none'}
            }>
            {' '}
            ( Tôi )
          </Text>
        </View>
        <Text
          style={
            data.id && data.is_active ? {color: '#76E6FF'} : {display: 'none'}
          }>
          Đã tham gia WorkUp <AntDesign name="check" />
        </Text>
        <Text style={data.phone ? {color: 'gray'} : {display: 'none'}}>
          {data.phone}
        </Text>
      </View>
    </View>
  );
};

export default ItemViewUser;

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
  },
});
