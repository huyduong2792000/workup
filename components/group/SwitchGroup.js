import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  Animated,
  SafeAreaView,
  Platform,
} from 'react-native';
import BaseApi from '../common/BaseApi';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {useSelector, useDispatch} from 'react-redux';
import {setCurrentGroup} from '../../store/group/Actions';
import {refershListTaskHomeScreen} from 'store/task/Actions';

import {useSafeArea} from 'react-native-safe-area-context';
import Colors from '../../constants/Colors';
const ToLeftView = props => {
  const rigth_to_left = useRef(new Animated.Value(-100)).current; // Initial value for opacity: 0
  useEffect(() => {
    Animated.spring(rigth_to_left, {
      toValue: 0,
      friction: 8,
      duration: 50,
    }).start();
  }, [rigth_to_left]);

  return (
    <Animated.View
      style={{
        ...props.style,
        marginTop: rigth_to_left,
      }}>
      {props.children}
    </Animated.View>
  );
};

const SwitchGroup = ({visible, setVisible}) => {
  const current_group_select = useSelector(state => state.currentGroupSelect);
  const dispatch = useDispatch();
  const [list_groups, setListGroups] = useState([]);
  const insets = useSafeArea();
  useEffect(() => {
    if (visible) {
      BaseApi({collectionName: 'group'})
        .get()
        .then(response => {
          setListGroups(response.data.objects);
        });
    }
  }, [visible]);
  const onSelect = (data) => {
    dispatch(setCurrentGroup(data));
    setVisible(false);
    BaseApi({collectionName: 'set-group-last-access'}).put(data);
  };
  return (
    <Modal visible={visible} transparent={true}>
      <View style={{flex: 1}}>
        <View style={styles.content}>
          {Platform.OS == 'ios' ? (
            <SafeAreaView
              style={{backgroundColor: Colors.headerColor, height: insets.top}}
            />
          ) : null}
          <View style={styles.header}>
            <Text
              style={{fontWeight: 'bold', fontSize: 20, padding: 10}}
              onPress={() => {
                setVisible(false);
              }}>
              {current_group_select.group_name} <AntDesign name="up" />
            </Text>
            <View style={{alignItems: 'center', position: 'relative'}}>
              <Image
                source={require('../../assets/images/logo.png')}
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
          <View>
            <FlatList
              data={list_groups}
              keyExtractor={(item, index) => item.id + JSON.stringify(index)}
              renderItem={({item}) => {
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: 'white',
                    }}>
                    <MaterialCommunityIcons
                      name="account-group"
                      size={25}
                      color="#007CFF"
                      onPress={() => {
                        onSelect(item);
                      }}
                      style={{paddingLeft: 10}}
                    />
                    <Text
                      onPress={() => {
                        onSelect(item);
                      }}
                      style={
                        current_group_select.id != item.id
                          ? {...styles.name_group}
                          : {...styles.name_group, color: '#007CFF'}
                      }>
                      {item.group_name}
                    </Text>
                    <AntDesign
                      style={
                        current_group_select.id != item.id
                          ? {display: 'none'}
                          : null
                      }
                      name="check"
                      color="#007CFF"
                      size={20}
                    />
                  </View>
                );
              }}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            setVisible(false);
          }}
          style={{flex: 1, backgroundColor: 'rgba(25,25,25,0.3)'}}
        />
      </View>
    </Modal>
    // </SafeAreaView>
  );
};

export default SwitchGroup;

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'rgba(25,25,25,0.3)',
    // flex:1
  },
  header: {
    // zIndex: 999,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    backgroundColor: Colors.headerColor,
  },
  name_group: {
    color: 'black',
    fontSize: 16,
    flex: 1,
    padding: 10,
  },
});
