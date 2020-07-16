import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View,FlatList } from 'react-native'
import BaseApi from '../../components/common/BaseApi'
import ItemView from '../../components/group/ItemView'
import { useSelector,useDispatch } from 'react-redux'
import { setGroup } from '../../store/group/Actions'
import Colors from '../../constants/Colors'
const GroupCollectionScreen = ({navigation}) => {
    const dispatch = useDispatch()
    // const [state,dispatchState] = useReducer(reducer,{groups:[],refresh:0}) 
    const currentUser = useSelector(state => state.currentUser)  
    const [groups,setGroups] = useState([])
    navigation.setOptions({
        headerRight: () => (
            <Text 
            style={{marginRight:10,fontSize:15,color:Colors.tintColor}}
            onPress={() => {
                // dispatch(setGroup({id:null,group_name:null,members:[{ info: currentUser, role_name: "admin" }]}))
                navigation.navigate('GroupDetailScreen',{id:null})
            }}>+ Nhóm</Text>
        ),
    });
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            BaseApi({collectionName:'group'}).get().then(
                (response)=>{                                                
                    setGroups(response.data.objects);
                }
            )
        })
        return unsubscribe
    },[])
    return (
        <View style={styles.container}>
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

export default GroupCollectionScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:10,
        backgroundColor:'#f5f5f5',

    },
})
