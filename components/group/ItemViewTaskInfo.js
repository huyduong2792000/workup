import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
export default function ItemViewTaskInfo({data}) {
  return (
    <View style={styles.container}>
      <Text style={styles.task_info_name}>{data.task_info_name}</Text>
      <TouchableOpacity style={{alignSelf: 'center'}}>
        <Feather name="more-vertical" size={16} color="gray" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  task_info_name: {
    fontSize: 16,
  },
});
