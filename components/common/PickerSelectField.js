// import RNPickerSelect from 'react-native-picker-select';
import React,{useState} from 'react'
import { StyleSheet, Text, View,Dimensions,TextInput,Picker } from 'react-native'

const WIDTH = Dimensions.get('window').width

const PickerSelectField = ({data=[],styles,title,prompt,placeholder,titleCorrect,titleInCorrect,value,onChange,valid}) => {
    const Title =()=>{
        if(title===undefined){
            return valid?<Text style={[styles.title,{color:'green'}]}>{titleCorrect}</Text>:
            <Text style={[styles.title,{color:'red'}]}>{titleInCorrect}</Text>
        }else{
            return <Text style={[styles.title,{color:'black'}]}>{title}</Text>
        }
        
    }
    return (
        <View style={styles.inputContainer}>
            <Title></Title>
            <Picker
                prompt={prompt}
                placeholder={placeholder}
                selectedValue={value}
                style={styles.input}
                itemStyle={{fontSize:40}}
                onValueChange={(itemValue, itemIndex) => {
                    onChange(itemValue)
                }}
            >
                {data.map((value)=><Picker.Item key={value} label={value.label} value={value.value} />)}
            </Picker>
        </View>
    );
};
export default PickerSelectField

// const styles = StyleSheet.create({
//     inputContainer:{
//         marginTop:20,
//         borderBottomColor:'black',
//         borderBottomWidth:1
//     },
//     title:{
//         marginBottom:11
//     },
//     input:{
//         height:24,
//         borderBottomWidth:1,
//         borderBottomColor:'black',
//         width:WIDTH-50,
//         fontSize:24,
//         lineHeight:24
//     }

// })
