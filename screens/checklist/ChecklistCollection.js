import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import BaseApi from 'common/BaseApi';
import ItemViewChecklist from 'components/checklist/ItemViewChecklist';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from 'constants/Colors';
import { useSelector } from 'react-redux'

const HEIGHT = Dimensions.get('window').height;

export default function ChecklistCollection({navigation}) {
  const [checklists, setChecklists] = useState([]);
  const currentGroupSelect = useSelector(state => state.currentGroupSelect)

  navigation.setOptions({
    headerRight: () => (
      <View style={{paddingHorizontal: 10, position: 'relative'}}>
        <AntDesign
          onPress={() => navigation.navigate('CheckListDetail', {id: null})}
          name="plus"
          size={24}
          color={Colors.tintColor}
          style={{alignSelf: 'center'}}
        />
      </View>
    ),
  });
  const getChecklist = async () => {
    await BaseApi({collectionName: 'checklist'})
      .get({
        params:[{group_id: currentGroupSelect.id}]
      })
      .then((response) => {
        setChecklists(response.data.objects);
      });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
    getChecklist();
    });
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={checklists}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={
          <View
            style={{
              height: HEIGHT,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <TouchableOpacity>
              <Text
                onPress={() =>
                  navigation.navigate('CheckListDetail', {id: null})
                }
                style={{
                  color: 'gray',
                  alignSelf: 'center',
                  paddingHorizontal: 20,
                  paddingVertical: 20,
                }}>
                chưa có checklist nào, bấm để tạo mới
              </Text>
            </TouchableOpacity>
          </View>
        }
        renderItem={({item}) => {
          return <ItemViewChecklist data_render={item} />;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#f5f5f5',
  },
});
