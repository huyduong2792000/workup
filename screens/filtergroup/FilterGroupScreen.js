import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View,FlatList } from 'react-native'
import BaseApi from 'common/BaseApi'
import ItemView from '/components/filtergroup/ItemView'
import { useSelector,useDispatch } from 'react-redux'
import { setGroup } from 'store/group/Actions'
import Colors from 'constants/Colors'
import SearchBar from 'common/SearchBar';

const FilterGroupScreen = ({navigation}) => {
    const [groups,setGroups] = useState([])
    navigation.setOptions({
        headerRight: () => (
            <Text 
            style={{marginRight:10,fontSize:15,color:Colors.tintColor}}
            onPress={() => {
                navigation.navigate('GroupDetailScreen',{id:null})
            }}>+ Nhóm</Text>
        ),
    });
    const search = (term) => {
        if(term && term !== '') {
            let search_value = term;
            let search_value_upper = term.toUpperCase();
            let search_value_lowcase = term.toLowerCase();
            BaseApi({collectionName:'filter_group_by_group_name'}).get({
                filters: {
                      $or: [
                        {unsigned_name: {$like: search_value}},
                        {unsigned_name: {$like: search_value_upper}},
                        {unsigned_name: {$like: search_value_lowcase}},
                        {group_name: {$like: search_value}},
                        {group_name: {$like: search_value_upper}},
                        {group_name: {$like: search_value_lowcase}},
                      ],
                },
                results_per_page: 20,
              })
              .then((data_filter) => {
                  setGroups(data_filter.data.objects)
            });
        }
    }
    return (
        <View style={styles.container}>
            <SearchBar
            searchPlaceholder='Nhập Tên Group'
            onChangeText={search}
            ></SearchBar>
            <FlatList
            data = {groups}
            keyExtractor = {item => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {
                return <ItemView 
                data_render={item}></ItemView>
            }}
            ></FlatList>
        </View>
    )
}

export default FilterGroupScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:10,
        backgroundColor:'#f5f5f5',

    },
})
