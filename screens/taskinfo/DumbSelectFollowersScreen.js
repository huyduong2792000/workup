import React from 'react'
import { StyleSheet, Text, View,FlatList } from 'react-native'
import ItemViewUser from 'components/user/ItemViewUser'
import PropTypes from 'prop-types';

const DumbSelectFollowersScreen = ({
    data,
    dataCheckSelect,
    onSelectFollower
}) => {    
    return (
        <View style={{flex:1}}>
            <View>
                <FlatList
                data={data}
                renderItem={({item})=>{
                    return <ItemViewUser
                    data = {item}
                    onSelect = {onSelectFollower.bind(item)}
                    dataCheckSelect = {dataCheckSelect}
                    selectMode = "multiple"
                    ></ItemViewUser>
                }}
                ></FlatList>
            </View>
        </View>
    )
}

export default DumbSelectFollowersScreen
DumbSelectFollowersScreen.propTypes = {
    data: PropTypes.array,
    dataCheckSelect:PropTypes.array,
    onSelectFollower: PropTypes.func
}

DumbSelectFollowersScreen.defaultProps = {
    data: [],
    dataCheckSelect: [],
    onSelectFollower: () => {},
}