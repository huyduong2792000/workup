import React, {useState, useMemo} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import BaseApi from 'common/BaseApi';
import Colors from 'constants/Colors';
import {useSelector} from 'react-redux';

const WIDTH = Dimensions.get('window').width;

export default function GroupSuggest({
  data,
  setGroup,
  data_suggest,
  setDataSuggest,
}) {
  const currentGroupSelect = useSelector((state) => state.currentGroupSelect);

  useMemo(() => {
    // console.log(data.group_name);

    if (data.group_name && data.group_name != '') {
      let search_value = data.group_name;
      let search_value_upper = data.group_name.toUpperCase();
      let search_value_lowcase = data.group_name.toLowerCase();
      // console.log(currentGroupSelect);

      BaseApi({collectionName: 'filter_group'})
        .get({
          filters: {
            $and: [
              {
                $or: [
                  {unsigned_name: {$like: search_value}},
                  {unsigned_name: {$like: search_value_upper}},
                  {unsigned_name: {$like: search_value_lowcase}},
                  {group_name: {$like: search_value}},
                  {group_name: {$like: search_value_upper}},
                  {group_name: {$like: search_value_lowcase}},
                ],
              },
              {parent_id: {$eq: currentGroupSelect.id}},
            ],
          },
          results_per_page: 3,
        })
        .then((data_filter) => {
          setDataSuggest(data_filter.data.objects);
        });
    }
  }, [data.group_name]);
  return (
    <View style={styles.container}>
      <FlatList
        data={data_suggest}
        horizontal={true}
        // ItemSeparatorComponent={()=>{}}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={styles.item_group}
              onPress={() => {
                setGroup(item);
              }}>
              <Text style={styles.item_group_text}>{item.group_name}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  item_group: {
    width: WIDTH / 3,
    paddingVertical: 5,
    justifyContent: 'center',
  },
  item_group_text: {
    // alignSelf:'center',
    color: Colors.tintColor,
  },
});
