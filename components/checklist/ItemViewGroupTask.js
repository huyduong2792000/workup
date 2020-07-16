import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Colors from 'constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

const ItemViewTaskGroup = ({data}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate('TaskGroupDetail');
      }}>
      <View style={styles.group_task_container}>
        <Text style={styles.group_task_text}>{data.group_task_name}</Text>
        <AntDesign name={'down'} size={15} style={styles.iconRight} />
      </View>
    </TouchableOpacity>
  );
};

export default ItemViewTaskGroup;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  group_task_container: {
    flexDirection: 'row',
    // padding:5,
    justifyContent: 'space-between',
  },
  group_task_text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.tintColor,
  },
  iconRight: {
    alignSelf: 'center',
    color: Colors.tintColor,
  },
});
