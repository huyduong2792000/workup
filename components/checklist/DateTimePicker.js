import React, { useState,useMemo } from 'react';
import { View, Button, Platform,TouchableOpacity,TextInput,Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'
import Modal from 'react-native-modal';

const DateTimePickerField = ({ visible=0,setVisible,showDate=false,showTime=false,displayMode='default',onChangeText }) => {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    useMemo(() => {
        if (visible != 0) {
            if(showDate){
                setMode('date')
            }else{
                setMode('time')
            }
            setShow(true)
        }
    }, [visible])
    const onChange = (event, selectedDate) => {
        if(showTime){
            setMode('time');
        }      
        Platform.OS === 'ios' ?null:setShow(false);         
        setDate(selectedDate)
        if(selectedDate!=undefined){            
            // datePicker =  new Date(moment(selectedDate).format('X')*1000)  
            // datePicker = (datePicker.setHours(0,0,0,0))/1000
            // datePicker=datePicker-datePicker%1000   
            

            onChangeText(selectedDate)
        }
        var datePicker=new Date      
        setDate(datePicker)
        // const datePicker = moment(selectedDate!=null?selectedDate:value).format('X')
    };
    return (
        <>
        {Platform.OS === 'ios' ?
        <Modal
            // backdropColor='rgba(25,25,25,0.0)'
            onBackdropPress={() => {                                
                onChange()}}
            style={{margin:0,zIndex:99999}}
            isVisible={show}>
                <View style={{flex:1}}>
                <TouchableOpacity 
                onPress={()=>{
                    setShow(false)
                    // onChange()
                }}
                style={{flex:1}}></TouchableOpacity>
                <View style={{backgroundColor:'white'}}>
                {show && (
                    <DateTimePicker
                        style={{backgroundColor: 'white' }}
                        testID="dateTimePicker"
                        timeZoneOffsetInMinutes={0}
                        value={date?date:new Date}
                        mode={mode}
                        is24Hour={true}
                        display={displayMode}
                        onChange={onChange}
                    />
                )}
                </View>
                
                </View>
        </Modal>:
        <View style={{flex:1,position:'absolute'}}>
        {/* <TouchableOpacity 
        onPress={()=>onChange()}
        style={{flex:1}}></TouchableOpacity> */}
        <View style={{backgroundColor:'white',width:0}}>
        {show && (
            <DateTimePicker
                style={{backgroundColor: 'white' }}
                testID="dateTimePicker"
                timeZoneOffsetInMinutes={0}
                value={date?date:new Date}
                mode={mode}
                is24Hour={true}
                display={displayMode}
                onChange={onChange}
            />
        )}
        </View>
        
        </View>}
            </>
        );
};

export default DateTimePickerField;