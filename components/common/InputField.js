import React from 'react'
import { StyleSheet, Text, View,Dimensions,TextInput  } from 'react-native'
const WIDTH = Dimensions.get('window').width

const InputField = ({styles,title,placeholder,titleCorrect,titleInCorrect,value,onChangeText,valid}) => {
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
            <TextInput 
            style={styles.input}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            ></TextInput>
        </View>
    )
}

export default InputField

