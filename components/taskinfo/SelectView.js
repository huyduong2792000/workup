import React, {useReducer, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
} from 'react-native';
import BaseApi from '../common/BaseApi';
import ItemView from './ItemView';
import reducer from './Reducer';
import {
  setTasksInfo,
  onRefresh,
  selectMultiple,
  deleteSelect,
} from '../taskinfo/Actions';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {useNavigation} from '@react-navigation/native';
const SelectView = ({
  selectMode = 'multiple',
  data_render,
  dataSetSelect,
  onSelect,
  visible = false,
  setVisible,
}) => {
  const [state, dispatch] = useReducer(reducer, {tasksInfo: [], refresh: 0});
  // const store =storetaskinfo.getState()
  const navigation = useNavigation();

  useEffect(() => {
    if (visible == true && data_render == undefined) {
      BaseApi({collectionName: 'task_info'})
        .get()
        .then(response => {
          dispatch(
            setTasksInfo({
              data: response.data.objects,
              dataSetSelect: dataSetSelect,
            }),
          );
        });
    } else if (visible == true && data_render != undefined) {
      dispatch(setTasksInfo(data_render));
    }
  }, [dataSetSelect, data_render, state.refresh, visible]);
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={async () => {
                await dispatch(deleteSelect());
                dispatch(onRefresh());
              }}>
              <Text>
                <FontAwesome5
                  style={{color: '#9f0000'}}
                  name="trash-alt"
                  size={26}
                />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => {
                navigation.navigate('TaskInfoDetailScreen', {
                  id: null,
                  callback: () => dispatch(onRefresh()),
                });
              }}>
              <Text>
                <Ionicons
                  style={{color: 'blue'}}
                  name="md-add-circle"
                  size={30}
                />
              </Text>
            </TouchableOpacity>
          </View>
          {/* <ScrollView style={styles.scroll}> */}
          <FlatList
            data={state.tasksInfo}
            renderItem={({item}) => {
              return (
                <ItemView
                  callback={() => dispatch(onRefresh())}
                  onSelect={data => {
                    selectMode === 'multiple'
                      ? dispatch(selectMultiple(data))
                      : dispatch(selectSingle(data));
                  }}
                  data_render={item}
                />
              );
            }}
          />
          {/* </ScrollView> */}
          <View style={styles.selectBar}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={async () => {
                setVisible(!visible);
              }}>
              <Text style={{color: '#c2c2d6'}}>CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => {
                const dataIsSelect = [];
                state.tasksInfo.forEach(taskinfo => {
                  if (taskinfo.isSelect == true) {
                    delete taskinfo.isSelect;
                    dataIsSelect.push(taskinfo);
                  }
                });
                if (selectMode == 'multiple') {
                  onSelect(dataIsSelect);
                } else {
                  onSelect(dataIsSelect[0]);
                }
                setVisible(!visible);
              }}>
              <Text style={{color: '#0099e6'}}>SELECT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SelectView;

const styles = StyleSheet.create({
  container: {
    // marginTop:5,
    flex: 1,
    backgroundColor: 'rgba(25,25,25,0.8)',
    padding: 30,
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  header: {
    // flexGrow:0.5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 0,
    margin: 0,
    height: 40,
    // marginVertical:15
  },
  scroll: {
    // flexGrow:20
    flex: 1,
  },
  selectBar: {
    // flexGrow:1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 50,
  },
  addButton: {
    alignSelf: 'center',
    height: 30,
    lineHeight: 30,
    padding: 3,
    marginRight: 25,
  },
});
