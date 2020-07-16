import React from 'react'
import { StyleSheet,TextInput,TouchableWithoutFeedback,Keyboard } from 'react-native'
import { useSelector,useDispatch } from 'react-redux'
import {setChecklist} from 'store/checklist/Actions'
const ChecklistName = () => {
    const Checklist = useSelector(state => state.Checklist)    
    const dispatch = useDispatch()    
    return (
        <TouchableWithoutFeedback style={styles.container} onPress={()=>Keyboard.dismiss()}>
            <TextInput
            style={styles.input_checklist}
            placeholder='Nhập tên checklist'
            // autoFocus={true}
            textAlign='center'
            value={Checklist.checklist_name}
            onChangeText={(term)=>{
                dispatch(setChecklist({...Checklist,checklist_name:term}))
            }}
            ></TextInput>
        </TouchableWithoutFeedback>
    )
}

export default ChecklistName

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'center',
        // alignSelf:'flex-start',
        // padding:10,
        // height:50
    },
    input_checklist:{
        fontWeight:'bold',
        // flex:1,
        fontSize:20,
        marginTop:20
    }
})
