import React from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

export default function ItemViewChecklist({data_render}) {
  const week_name = {
    0: 'chủ nhật',
    1: 'hai',
    2: 'ba',
    3: 'bốn',
    4: 'năm',
    5: 'sáu',
    6: 'bảy',
  };
  const navigation = useNavigation();
  const convertDaysWorkerWeek = data => {
    let result = [];
    let has_sunday = false;
    data_render.days_worker_week.forEach((item, index) => {
      if (item !== 0) {
        result.push(item);
      } else {
        has_sunday = true;
      }
    });
    if (has_sunday) {
      result.push(0);
    }
    return result;
  };
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate('CheckListDetail', {id: data_render.id})
      }>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons
          name="clipboard-text-outline"
          size={45}
          style={{alignSelf: 'center', color: '#007CFF'}}
        />
      </View>
      <View style={{flexDirection: 'column'}}>
        <Text style={styles.title}>{data_render.checklist_name}</Text>
        <View>
          <Text style={{color: 'gray'}}>
            {data_render.total_tasks_info} việc
          </Text>
        </View>
        <View>
          <Text style={{color: 'gray'}}>
            {data_render.total_shifts} ca làm việc
          </Text>
        </View>

        {data_render.cycle_worker === 'week' ? (
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            <Text style={{color: 'gray'}}>Thứ </Text>
            <FlatList
              data={convertDaysWorkerWeek(data_render.days_worker_week)}
              horizontal
              keyExtractor={(item, index) => JSON.stringify(index)}
              ItemSeparatorComponent={() => (
                <Text style={{color: 'gray'}}>, </Text>
              )}
              renderItem={({item}) => {
                return <Text style={{color: 'gray'}}>{week_name[item]}</Text>;
              }}
            />
          </View>
        ) : (
          <View
            style={[
              {flexDirection: 'row', flexWrap: 'wrap'},
              {display: data_render.cycle_worker === 'month' ? null : 'none'},
            ]}>
            <FlatList
              data={data_render.days_worker_month}
              keyExtractor={(item, index) => JSON.stringify(index)}
              horizontal
              ItemSeparatorComponent={() => (
                <Text style={{color: 'gray'}}>, </Text>
              )}
              renderItem={({item}) => {
                return <Text style={{color: 'gray'}}>{item === 'end_day_of_month'?'cuối tháng':item}</Text>;
              }}
            />
            <Text style={{color: 'gray'}}> Hàng tháng</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
    marginTop: 10,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    borderRadius: 10,
    elevation: 2,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  iconContainer: {
    width: 70,
    paddingTop: 10,
    alignSelf: 'flex-start',
  },
});
