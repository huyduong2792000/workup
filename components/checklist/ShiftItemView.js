import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  DeviceEventEmitter,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {setShift, removeShift} from 'store/checklist/Actions';
import DateTimePicker from './DateTimePicker';
import moment from 'moment';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function ShiftItemView({data, index}) {
  const [state, setState] = useState({
    visible_start_hour_working: 0,
    visible_end_hour_working: 0,
  });
  // const [visible_start_hour_working,setVisibleStartHourWorking] = useState(0)

  const dispatch = useDispatch();

  const convertToHour = (hour_convert) => {
    let result = '';
    let hour = Math.floor(hour_convert / 100);
    if (hour <= 9) {
      hour = '0' + JSON.stringify(hour);
    } else {
      hour = JSON.stringify(hour);
    }
    let minute = hour_convert % 100;
    if (minute <= 9) {
      minute = '0' + JSON.stringify(minute);
    } else {
      minute = JSON.stringify(minute);
    }
    // console.log(hour,minute);
    result = hour + ':' + minute;
    return result;
  };
  const setStartTimeShift = (date_picker) => {
    if (Platform.OS === 'ios') {
      date_picker = moment(date_picker).utc().format('HH:mm').split(':');
    } else {
      date_picker = moment(date_picker).format('HH:mm').split(':');
    }
    let start_hour_working =
      parseInt(date_picker[0] * 100) + parseInt(date_picker[1]);
    dispatch(
      setShift({
        value: {start_hour_working: start_hour_working},
        index: index,
      }),
    );
  };
  const setEndTimeShift = (date_picker) => {
    if (Platform.OS === 'ios') {
      date_picker = moment(date_picker).utc().format('HH:mm').split(':');
    } else {
      date_picker = moment(date_picker).format('HH:mm').split(':');
    }
    let end_hour_working =
      parseInt(date_picker[0] * 100) + parseInt(date_picker[1]);
    dispatch(
      setShift({
        value: {end_hour_working: end_hour_working},
        index: index,
      }),
    );
  };
  const showStartTime = () => {
    DeviceEventEmitter.emit('showDateTimePicker', {
      showTime: true,
      showDate: false,
      onChange: (date_picker) => {
        setStartTimeShift(date_picker);
        // dispatch(setCurrentTask({end_time:moment(date).format("X")}))
      },
    });
  };
  const showEndTime = () => {
    DeviceEventEmitter.emit('showDateTimePicker', {
      showTime: true,
      showDate: false,
      onChange: (date_picker) => {
        setEndTimeShift(date_picker);
        // dispatch(setCurrentTask({end_time:moment(date).format("X")}))
      },
    });
  };
  // DeviceEventEmitter.emit('showDateTimePicker', {
  //   showTime: true,
  //   onChange: (date) => {
  //     onSetCurrentTask({end_time: moment(date).format('X')});
  //     // dispatch(setCurrentTask({end_time:moment(date).format("X")}))
  //   },
  // });
  return (
    <View style={styles.container}>
      <>
        {/* <DateTimePicker
          showTime={true}
          visible={state.visible_start_hour_working}
          onChangeText={(date_picker) => setStartTimeShift(date_picker)}
        />
        <DateTimePicker
          showTime={true}
          visible={state.visible_end_hour_working}
          onChangeText={(date_picker) => setEndTimeShift(date_picker)}
        /> */}
      </>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <TextInput
          style={styles.shift_name}
          value={data.shift_name}
          placeholder={'Tên ca'}
          onChangeText={(term) => {
            dispatch(setShift({value: {shift_name: term}, index: index}));
          }}
        />
      </TouchableWithoutFeedback>
      {/* <Text>{data.shift_name}</Text> */}
      <View style={styles.time_shift}>
        <Text style={{fontSize: 18}} onPress={showStartTime}>
          {convertToHour(data.start_hour_working)}
        </Text>
      </View>
      <Text> -:- </Text>
      <View style={styles.time_shift}>
        <Text style={{fontSize: 18}} onPress={showEndTime}>
          {convertToHour(data.end_hour_working)}
        </Text>
      </View>
      <AntDesign
        onPress={() => dispatch(removeShift({value: {}, index: index}))}
        name="closecircleo"
        size={19}
        style={{paddingHorizontal: 10, color: 'red'}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shift_name: {
    fontSize: 18,
    paddingRight: 10,
    width: 60,
  },
  time_shift: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
  },
});
