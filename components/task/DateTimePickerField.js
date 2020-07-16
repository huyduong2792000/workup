import React, { useState,useEffect } from 'react';
import { View, Button, Platform,TouchableOpacity,TextInput,Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'
import Modal from 'react-native-modal';

const DateTimePickerField = ({ styles,visible=0,showDate=false,showTime=false,displayMode='default',format='DD/MM/YYYY, hh:mm:ss a', title, placeholder='', titleCorrect='', titleInCorrect='', value='', onChangeText, valid }) => {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    useEffect(() => {
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
        var datePicker=0
        if(selectedDate!=undefined){            
            datePicker =  new Date(moment(selectedDate).format('X')*1000)  
            datePicker = (datePicker.setHours(0,0,0,0))/1000
            // datePicker=datePicker-datePicker%1000         
            // setDate(datePicker)

            onChangeText(datePicker)
        }
        // const datePicker = moment(selectedDate!=null?selectedDate:value).format('X')
    };
    const showDatepicker = () => {  
        setShow(true)
        setMode('date');      

    };
    const showTimepicker = () => {
        setMode('time');
    };
    const Title = () => {
        if (title === undefined) {
            return valid ? <Text style={[styles.title, { color: 'green' }]}>{titleCorrect}</Text> :
                <Text style={[styles.title, { color: 'red' }]}>{titleInCorrect}</Text>
        } else {
            return <Text style={[styles.title, { color: 'black' }]}>{title}</Text>
        }

    };
    const convertValue = (data)=>{
        if(data<3000){
            return `${(data-data%100)/100}h:${(data%100)}p`
            
        }else{
            return moment.unix(data).format(format)
        }
    }
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
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display={displayMode}
                        onChange={onChange}
                    />
                )}
                </View>
                
                </View>
        </Modal>:
        <View style={{flex:1}}>
        {/* <TouchableOpacity 
        onPress={()=>onChange()}
        style={{flex:1}}></TouchableOpacity> */}
        <View style={{backgroundColor:'white'}}>
        {show && (
            <DateTimePicker
                style={{backgroundColor: 'white' }}
                testID="dateTimePicker"
                timeZoneOffsetInMinutes={0}
                value={date}
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