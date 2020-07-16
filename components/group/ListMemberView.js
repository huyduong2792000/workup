import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
// import AlphabetSectionList from 'react-native-alphabet-sectionlist';
import ItemViewMenberAdd from './ItemViewMenberAdd';
import {useSelector} from 'react-redux';
import {setSelectMutipleMember} from '../../store/group/Actions';
import {useDispatch} from 'react-redux';

const ListMemberView = ({list_member}) => {
  const [data_render, setDataRender] = useState({});
  const members_in_select = useSelector((state) => state.MembersInSelect);
  const group = useSelector((state) => state.Group);
  const dispatch = useDispatch();

  useEffect(() => {
    if (list_member.length != 0) {
      setDataRender({...toAlphabet(list_member)});
    }
  }, [list_member]);

  const toAlphabet = (data_convert) => {
    const result = {
      A: [],
      B: [],
      C: [],
      D: [],
      E: [],
      F: [],
      G: [],
      H: [],
      I: [],
      K: [],
      L: [],
      M: [],
      N: [],
      O: [],
      P: [],
      Q: [],
      R: [],
      S: [],
      T: [],
      V: [],
      X: [],
      Y: [],
      Z: [],
    };
    for (var data of data_convert) {
      var alphabet = (data.display_name
        ? data.display_name.slice(0, 1)
        : data.email.slice(0, 1)
      ).toUpperCase();
      if (result[alphabet] != undefined) {
        result[alphabet].push(data);
      } else {
        result[alphabet] = [data];
      }
    }
    for (var alpha in result) {
      if (result[alpha].length === 0) {
        delete result[alpha];
      }
    }
    return result;
  };
  // const renderSectionHeader = ({ section: { title } }) => {
  //     return (
  //       <View style={{
  //         paddingLeft: 10,
  //         backgroundColor: '#f1f2f3',
  //         paddingVertical: 5,
  //       }}>
  //         <Text style={{ color: 'blue',fontSize:16 }}>{title}</Text>
  //       </View>
  //     )
  //   }
  return (
    <FlatList
      data={list_member}
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      keyExtractor={(item, index) => item.id + JSON.stringify(index)}
      renderItem={({item}) => {
        return (
          <ItemViewMenberAdd
            data_render={item}
            isMember={item.is_member}
            onSelect={(data) => {
              // // console.log(group.members);

              // for (var member of group.members){
              //     if( member.id === data.id){
              //         // console.log('if');

              //         return
              //     }
              // }
              // console.log('sdvadsv');

              dispatch(setSelectMutipleMember(data));
            }}
          />
        );
      }}
    />
    // <AlphabetSectionList
    // data={data_render}
    // renderItem={({item})=>{
    //     return(
    //     <ItemViewMenberAdd
    //     data_render={item}
    //     isSelect={item.is_select}
    //     onSelect = {(data) => {
    //         // // console.log(group.members);

    //         // for (var member of group.members){
    //         //     if( member.id === data.id){
    //         //         // console.log('if');

    //         //         return
    //         //     }
    //         // }
    //         // console.log('sdvadsv');

    //         dispatch(setSelectMutipleMember(data))
    //     }}
    //     ></ItemViewMenberAdd>
    //     )
    // }}
    // renderSectionHeader={renderSectionHeader}
    // />
  );
};

export default ListMemberView;

const styles = StyleSheet.create({});
