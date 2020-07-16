import React from 'react'
import { StyleSheet, Text, View,Alert } from 'react-native'

const AlertError = (action,title='error',body='An error occurred, Please check if your camera is turned on and retry') => {
  
    return (
        Alert.alert(
          <Text>{title}</Text>,
          <Text>{body}</Text>,
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "retry", onPress: () => action() }
            ],
            { cancelable: false }
          )
    )
}

export default AlertError

const styles = StyleSheet.create({})
