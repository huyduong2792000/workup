import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector, useDispatch} from 'react-redux';
import {
  setChecklist,
  setDayWorkerWeek,
  setDayWorkerMonth,
} from 'store/checklist/Actions';
import Colors from 'constants/Colors';
const WIDTH = Dimensions.get('window').width;

export default function Schedule() {
  const Checklist = useSelector(state => state.Checklist);
  const [state, setState] = useState({
    show_dropdown: false,
    days_worker_month: [],
  });
  const dispatch = useDispatch();

  const list_day_of_week = [
    {label: 'thứ 2', value: 1},
    {label: 'thứ 3', value: 2},
    {label: 'thứ 4', value: 3},
    {label: 'thứ 5', value: 4},
    {label: 'thứ 6', value: 5},
    {label: 'thứ bảy', value: 6},
    {label: 'chủ nhật', value: 0},
  ];
  const list_day_of_month = [
    ...new Array(31).fill({}).map((item, index) => {
      return {label: JSON.stringify(index + 1), value: index + 1};
    }),
  ];
  return (
    <View style={styles.container}>
      <View style={styles.cycle_worker_container}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomWidth: 0.6,
            borderBottomColor: Colors.tintColor,
          }}
          onPress={() =>
            setState({...state, show_dropdown: !state.show_dropdown})
          }>
          <Text style={{fontSize: 18, paddingBottom: 10, fontWeight: 'bold'}}>
            {Checklist.cycle_worker === 'week' ? 'Hàng tuần' : 'Hàng tháng'}
          </Text>
          <AntDesign name="down" size={14} style={{alignSelf: 'center'}} />
        </TouchableOpacity>
        <View
          style={[
            styles.cycle_worker_dropdown,
            {display: state.show_dropdown ? null : 'none'},
          ]}>
          <Text
            style={[
              styles.item_dropdown,
              {
                color:
                  Checklist.cycle_worker === 'week' ? Colors.tintColor : 'gray',
              },
            ]}
            onPress={() => {
              dispatch(setChecklist({...Checklist, cycle_worker: 'week'}));
              setState({...state, show_dropdown: !state.show_dropdown});
            }}>
            Hàng tuần
          </Text>
          <Text
            style={[
              styles.item_dropdown,
              {
                color:
                  Checklist.cycle_worker === 'month'
                    ? Colors.tintColor
                    : 'gray',
              },
            ]}
            onPress={() => {
              dispatch(setChecklist({...Checklist, cycle_worker: 'month'}));
              setState({...state, show_dropdown: !state.show_dropdown});
            }}>
            Hàng tháng
          </Text>
        </View>
      </View>
      {/* <Text style={{alignSelf:'flex-start',paddingHorizontal:10}}>Ngày lặp lại</Text> */}

      {Checklist.cycle_worker === 'week' && (
        <View style={styles.picker_date_container}>
          <FlatList
            data={list_day_of_week}
            numColumns={3}
            keyExtractor={(item, index) => JSON.stringify(index)}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  style={styles.itemview_date_picker_week}
                  onPress={() => dispatch(setDayWorkerWeek(item.value))}>
                  <MaterialIcons
                    name={
                      Checklist.days_worker_week.findIndex(
                        (day_worker_week, index) =>
                          day_worker_week === item.value,
                      ) == -1
                        ? 'radio-button-unchecked'
                        : 'radio-button-checked'
                    }
                    size={24}
                    style={styles.itemview_icon}
                  />
                  <Text style={styles.itemview_label_week}>{item.label}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}

      {Checklist.cycle_worker === 'month' && (
        <View style={styles.picker_date_container}>
          <TouchableOpacity
            style={styles.itemview_date_picker_week}
            onPress={() => dispatch(setDayWorkerMonth('end_day_of_month'))}>
            <MaterialIcons
              name={
                Checklist.days_worker_month.findIndex(
                  (day_worker_month, index) =>
                    day_worker_month == 'end_day_of_month',
                ) == -1
                  ? 'radio-button-unchecked'
                  : 'radio-button-checked'
              }
              size={24}
              style={styles.itemview_icon}
            />
            <Text style={styles.itemview_label_week}>Cuối tháng</Text>
          </TouchableOpacity>
          <FlatList
            data={list_day_of_month}
            keyExtractor={(item, index) => JSON.stringify(index)}
            showsVerticalScrollIndicator={false}
            numColumns={7}
            // contentContainerStyle={{flexDirection : "row", flexWrap : "wrap"}}
            renderItem={({item}) => {
              return (
                <TouchableHighlight
                  underlayColor="#00FFF3"
                  style={[
                    styles.itemview_date_picker_month,
                    {
                      backgroundColor:
                        Checklist.days_worker_month.findIndex(
                          (day_worker_month, index) =>
                            day_worker_month === item.value,
                        ) === -1
                          ? 'white'
                          : '#00FFF3',
                    },
                  ]}
                  onPress={() => dispatch(setDayWorkerMonth(item.value))}>
                  <Text style={[styles.itemview_label_month]}>
                    {item.label}
                  </Text>
                </TouchableHighlight>
              );
            }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex:1,
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 10,
  },
  cycle_worker_container: {
    alignSelf: 'flex-start',
    marginBottom: 10,
    flexDirection: 'column',
    width: '100%',
    paddingHorizontal: 10,
  },
  cycle_worker_dropdown: {
    // backgroundColor:'red',
    flexDirection: 'column',
  },
  item_dropdown: {
    borderBottomWidth: 0.5,
    paddingVertical: 10,
    fontSize: 14,
    borderBottomColor: Colors.tintColor,
  },
  picker_date_container: {
    alignSelf: 'flex-start',
    // flex:1,
    width: '100%',
  },
  itemview_date_picker_week: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 15,
    flex: 1,
  },
  itemview_date_picker_month: {
    alignItems: 'center',
    width: (WIDTH - 7 * 5 * 2) / 7,
    height: (WIDTH - 7 * 5 * 2) / 7,
    justifyContent: 'center',
    borderRadius: 9999,
    margin: 5,
  },
  itemview_label_week: {
    fontSize: 16,
    alignSelf: 'center',
  },
  itemview_label_month: {
    fontSize: 16,
    alignSelf: 'center',
  },
  itemview_icon: {
    paddingRight: 10,
    color: Colors.tintColor,
  },
});
