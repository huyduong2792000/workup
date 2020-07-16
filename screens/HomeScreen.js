/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import TopNavigation from 'components/task/TopNavigation';
import SwitchGroupModal from '../components/group/SwitchGroup';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import Colors from 'constants/Colors';
const HomeScreen = () => {
  const current_group_select = useSelector(state => state.currentGroupSelect);
  const [tasks, setTasks] = useState([]);
  const [show_list_group, setSwitchGroup] = useState(false);
  useEffect(() => {}, []);
  if (!tasks) {
    return null;
  }
  return (
    <View style={styles.container}>
      {/* <StatusBar translucent backgroundColor={'blue'}></StatusBar> */}
      {/* <SafeAreaView style={{backgroundColor:'red',height:50}}></SafeAreaView> */}
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
        <SwitchGroupModal
          visible={show_list_group}
          setVisible={setSwitchGroup}
        />

        <View style={{alignItems: 'center', position: 'relative'}}>
          <Image
            source={require('../assets/images/logo.png')}
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
      <View style={{flex: 1}}>
        <TopNavigation />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingLeft: 10,
    // paddingRight: 10,
    // backgroundColor: "lightskyblue"
  },
  progressBar: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    height: 10,
    width: '100%',
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
  },
});
