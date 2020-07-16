import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  Keyboard,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector, useDispatch} from 'react-redux';
import {addShift} from 'store/checklist/Actions';
import Colors from 'constants/Colors';
import ShiftItemView from './ShiftItemView';
const WIDTH = Dimensions.get('window').width;
const Shift = () => {
  const Checklist = useSelector(state => state.Checklist);
  // const [state,setState] = useState({show_dropdown:false,days_worker_month:[]})
  const dispatch = useDispatch();
  // console.log(Checklist.shifts)
  return (
    <View style={styles.container} onPress={() => Keyboard.dismiss()}>
      <View style={styles.title_container}>
        <Text style={styles.title}>Ca làm việc</Text>
        <AntDesign
          onPress={() =>
            dispatch(
              addShift({
                shift_name: null,
                start_hour_working: 0,
                end_hour_working: 2359,
              }),
            )
          }
          name="pluscircleo"
          size={19}
          style={{paddingHorizontal: 10, color: 'green'}}
        />
      </View>
      <FlatList
        data={Checklist.shifts}
        keyExtractor={(item, index) => JSON.stringify(index)}
        renderItem={({item, index}) => {
          return (
            <View style={{flexDirection: 'column'}}>
              <ShiftItemView data={item} index={index} />
            </View>
          );
        }}
      />
    </View>
  );
};

export default Shift;

const styles = StyleSheet.create({
  container: {
    // flexDirection:'row',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  title_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.6,
    paddingBottom: 10,
    borderBottomColor: Colors.tintColor,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
