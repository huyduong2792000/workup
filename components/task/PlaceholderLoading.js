import React from 'react'
import { StyleSheet, Text, View,Dimensions,FlatList } from 'react-native'
import {
    Placeholder,
    PlaceholderMedia,
    // PlaceholderLine,
    // Fade,
    // Shine,
    ShineOverlay,
    // Loader
  } from "rn-placeholder";

const HEIGHT = Dimensions.get('window').height
const WIDTH = Dimensions.get('window').width

const PlaceholderLoading = () => {    
    return (
        <View style={{flex:1,alignItems:'flex-start',flexDirection:'column'}}>
            <FlatList
            data={[...new Array(8).fill({})]}
            keyExtractor={(item,index)=>JSON.stringify(index)}
            renderItem={({item})=>(
                <Placeholder
                Animation={ShineOverlay}
                style={{
                marginVertical: 6,
                marginHorizontal: 15,
                borderRadius: 4
                }}
                Left={props => (
                    <View style={{flexDirection:'row',width:'100%'}}>
                        <View style={{margin:5,alignSelf:'center'}}>
                            <PlaceholderMedia
                                style={{width:30,height:30,backgroundColor:'white',borderWidth:2,borderColor:'#DFDFDF'}}
                            />
                        </View>
                        <View style={{flex:1,flexDirection:'column',margin:5}}>
                            <PlaceholderMedia
                                style={[props.style,{width:WIDTH,height:10,marginVertical:5}]}
                            />
                            <PlaceholderMedia
                                style={[props.style,{width:WIDTH/2,height:10,marginVertical:5}]}
                            />
                            <PlaceholderMedia
                                style={[props.style,{width:WIDTH/4,height:10,marginVertical:5}]}
                            />
                        </View>
                   
                    </View>
                )}
                />
            )}
            ></FlatList>
            {/* {[...new Array(8).fill({})].map(()=>(
                <Placeholder
                Animation={ShineOverlay}
                style={{
                marginVertical: 6,
                marginHorizontal: 15,
                borderRadius: 4
                }}
                Left={props => (
                    <View style={{flexDirection:'row'}}>
                    <View style={{margin:5,alignSelf:'center'}}>
                        <PlaceholderMedia
                            style={{width:30,height:30,backgroundColor:'white',borderWidth:2,borderColor:'#DFDFDF'}}
                        />
                    </View>
                    <View style={{flex:1,flexDirection:'column',margin:5}}>
                        <PlaceholderMedia
                            style={[props.style,{width:WIDTH,height:10,marginVertical:5}]}
                        />
                        <PlaceholderMedia
                            style={[props.style,{width:WIDTH/2,height:10,marginVertical:5}]}
                        />
                        <PlaceholderMedia
                            style={[props.style,{width:WIDTH/4,height:10,marginVertical:5}]}
                        />
                    </View>
                   
                    </View>
                )}
                />
            ))} */}
            
        </View>
    )
}

export default PlaceholderLoading

const styles = StyleSheet.create({})
