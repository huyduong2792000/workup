import React from 'react';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

const ItemView = ({data_render, style, callback, onSelect}) => {
  const navigation = useNavigation();
  const styles = {...stylesDefault, ...style};
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.infoContainer}
        onPress={() => {
          navigation.navigate('TaskInfoDetailScreen', {
            id: data_render.id,
            callback: callback,
          });
        }}>
        <View style={styles.info}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{data_render.task_name}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.selectContainer}>
        <MaterialIcons
          onPress={() => {
            onSelect(data_render);
            // setIsSelect(!isSelect)
          }}
          style={styles.select}
          size={30}
          name={
            data_render.isSelect
              ? 'radio-button-checked'
              : 'radio-button-unchecked'
          }
        />
      </View>
    </View>
  );
};

export default ItemView;

const stylesDefault = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // flex:1,
    backgroundColor: '#f5f5f5',
    marginVertical: 5,
    marginHorizontal: 10,
    // borderWidth:1,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
    // shadowColor:'0px 0px 18px 6px rgba(145,145,145,1);'
  },
  infoContainer: {
    flexGrow: 8,
    flexDirection: 'row',
    padding: 10,
  },
  titleContainer: {
    // borderBottomColor:'gray',
    // borderBottomWidth:1,
    // marginRight:20,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 16,
    lineHeight: 16,
    fontWeight: 'bold',
  },
  selectContainer: {
    flexGrow: 2,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  select: {
    color: 'green',
    alignSelf: 'center',
  },
});
