import React,{useState,useEffect} from 'react'
import { StyleSheet, Text,Button, View,Dimensions,ScrollView,TouchableWithoutFeedback,Alert} from 'react-native'
import InputField from '../../components/common/InputField'
import Validate from '../../components/common/Validate'
import PickerSelectField from '../../components/common/PickerSelectField'
import DateTimePickerField from '../../components/common//DateTimePickerField'
import BaseApi from '../../components/common/BaseApi'
import AlertError from '../../components/common/AlertError'

const WIDTH = Dimensions.get('window').width

const UserDetailScreen = ({route,navigation}) => {     
    const id= route.params.id
    // const id = 'f7477e8f-d373-44eb-a929-05d2c450709d'
    const [info,setInfo] = useState({}) 
    navigation.setOptions({
        headerRight: () => (
          <Button onPress={() => {
            if(true){
                saveProccess()}  
            }} title="save" />
        ),
      });
    const saveProccess= async ()=>{
        await BaseApi({collectionName:'user'}).save(info)
        route.params.callback?route.params.callback():null
        navigation.goBack()
    }
 

    useEffect(()=>{        
        if(id!=null){    
            BaseApi({collectionName:'user'}).get(id).then(
                (response)=>{
                    setInfo({...info,...response.data})      
                })
        }
    },[])
    return (
        <>
        <ScrollView>
            <TouchableWithoutFeedback>
        <View style={styles.container}>
            <InputField
            styles={styleField}
            valid = {Validate.validateName(info.display_name)}
            titleCorrect='Dispay name'
            titleInCorrect='Dispay name may not be blank '
            placeholder="Dispay name"
            value={info.display_name?info.display_name:''}
            onChangeText={(term)=>{setInfo({...info,display_name:term})}}
            ></InputField>
            
            <InputField
            styles={styleField}
            valid = {Validate.validateEmail(info.email)}
            titleCorrect='Email'
            titleInCorrect='Email is incorrect'
            placeholder="Email"
            value={info.email?info.email:''}
            onChangeText={(term)=>{setInfo({...info,email:term})}}
            ></InputField>

            <InputField
            styles={styleField}
            valid = {Validate.validatePhone(info.phone)}
            titleCorrect='Phone number'
            titleInCorrect='Phone number is incorrect'
            placeholder="Phone number"
            value={info.phone?info.phone:''}
            onChangeText={(term)=>{setInfo({...info,phone:term})}}
            ></InputField>

            <InputField
            styles={styleField}
            valid = {Validate.validateIdentifier(info.id_identifier)}
            titleCorrect='Id identifier'
            titleInCorrect='Id identifier is incorrect'
            placeholder="Id identifier"
            value={info.id_identifier?info.id_identifier:''}
            onChangeText={(term)=>{setInfo({...info,id_identifier:term})}}
            ></InputField>

            <PickerSelectField
            styles={{...styleField,inputContainer:{   
                                    marginTop:20,     
                                    borderBottomColor:'gray',
                                    borderBottomWidth:1}}}
            valid = {true}
            title="Gender"
            placeholder="Gender"
            value={info.gender?info.gender:''}
            data={[{label:'male',value:1},{label:'female',value:2}]}
            onChange={(term)=>{setInfo({...info,gender:term})}}
            ></PickerSelectField>

            <DateTimePickerField
            styles={styleField}
            showDate={true}
            // showTime={true}
            displayMode='spinner'
            format="DD/MM/YYYY"
            valid = {true}
            title='Birthday'
            placeholder="Birthday"
            value={info.birthday!=null?info.birthday:null}
            onChangeText={(term)=>{setInfo({...info,birthday:term})}}
            ></DateTimePickerField>

            <DateTimePickerField
            styles={styleField}
            showDate={true}
            showTime={true}
            format="DD/MM/YYYY hh:mm:ss a"
            valid = {true}
            title='Start time'
            placeholder="Start time"
            value={info.start_time!=null?info.start_time:null}
            onChangeText={(term)=>{setInfo({...info,start_time:term})}}
            ></DateTimePickerField>

            <DateTimePickerField
            styles={styleField}
            showDate={true}
            showTime={true}
            format="DD/MM/YYYY hh:mm:ss a"
            valid = {true}
            title='End time'
            placeholder="End time"
            value={info.end_time!=null?info.end_time:null}
            onChangeText={(term)=>{setInfo({...info,end_time:term})}}
            ></DateTimePickerField>
        </View>
        </TouchableWithoutFeedback>
        </ScrollView>
        </>
    )
}

export default UserDetailScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        alignItems:'center',
        // paddingVertical:50
    },

})
const styleField = StyleSheet.create({
    inputContainer:{
        marginTop:20,
    },
    title:{
        fontSize:13,
        marginBottom:5
    },
    input:{
        height:24,
        borderBottomWidth:1,
        borderBottomColor:'gray',
        width:WIDTH-50,
        fontSize:18,
        lineHeight:24
    }
})