import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  DeviceEventEmitter,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import BaseApi from '../../components/common/BaseApi';
import Contacts from 'react-native-contacts';
import ListMemberView from '../../components/group/ListMemberView';
import {setGroup, clearSelectMutipleMember} from '../../store/group/Actions';
const AddMemberScreen = ({navigation, route}) => {
  const group = useSelector((state) => state.Group);
  const members_in_select = useSelector((state) => state.MembersInSelect);
  const dispatch = useDispatch();
  const [list_contact, setListContact] = useState([]);
  const [member_search, setMemberSearch] = useState([]);
  const [isFetching, setFetching] = useState(false);
  navigation.setOptions({
    title: group.group_name,
    headerStyle: {
      elevation: 0,
    },
  });
  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      dispatch(clearSelectMutipleMember());
    });

    getContacts();
    return unsubscribe;
  }, []);
  const getContacts = () => {
    if (Platform.OS !== 'ios') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message: 'This app would like to view your contacts.',
        buttonPositive: 'Please accept bare mortal',
      }).then(() => {
        Contacts.getAll((err, contacts) => {
          if (err === 'denied') {
            // error
          } else {
            validListContact(contacts);
          }
        });
      });
    } else {
      Contacts.getAll((err, contacts) => {
        if (err === 'denied') {
          // error
        } else {
          validListContact(contacts);
        }
      });
    }
  };
  const validListContact = async (contacts) => {
    if (Platform.OS === 'ios') {
      contacts.map((item,index)=>{
        item.displayName = item.familyName + ' ' + item.givenName;

        return item
      })
      await BaseApi({collectionName: 'check_user_has_been_account'})
        .post({contacts, group})
        .then((respone) => {
          setListContact([...respone]);
        });
    } else {
      // console.log('else');

      // contacts_valid = [...contacts];
      await BaseApi({collectionName: 'check_user_has_been_account'})
        .post({contacts, group})
        .then((respone) => {
          setListContact([...respone]);
        });
    }
    // console.log('contacts=========',contacts);
    // console.log('contact_valid=========',contacts_valid);
    // console.log('await', contacts_valid);
  };
  const search = async (searchValue) => {
    searchValue = searchValue.toLowerCase();
    if (searchValue !== '') {
      var data_search_from_list_contact = list_contact.filter((item, index) => {
        return (
          item.display_name.toLowerCase().indexOf(searchValue) != -1 ||
          item.phone.toLowerCase().indexOf(searchValue) != -1
        );
      });
      await BaseApi({collectionName: 'search_user'})
        .get({
          filters: {
            $group_id: group.id,
            $or: [
              {unsigned_display_name: {$like: searchValue}},
              {display_name: {$like: searchValue}},
              {email: {$like: searchValue}},
              {phone: {$like: searchValue}},
            ],
          },
        })
        .then((response) => {
          let data = response.data;
          data.objects.map((item, index) => {
            item.is_select = true;
            return item;
          });
          setMemberSearch([...data.objects, ...data_search_from_list_contact]);
        });
    } else {
      setMemberSearch([...list_contact]);
    }
  };
  const onConfirm = async () => {
    setFetching(true);
    try {
      await BaseApi({collectionName: 'add_members'}).save({
        members: members_in_select,
        group_id: group.id,
      });
      setFetching(false);
      DeviceEventEmitter.emit('showToast', {
        text: 'thêm thành viên thành công',
        type: 'success',
      });
      navigation.navigate('GroupDetailScreen', {id: group.id});
    } catch {
      setFetching(false);
      DeviceEventEmitter.emit('showToast', {
        text: 'lỗi khi thêm thành viên',
        type: 'danger',
      });
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <AntDesign
          name="search1"
          size={18}
          style={{alignSelf: 'center', paddingHorizontal: 10}}
        />
        <TextInput
          style={{fontSize: 14, flex: 1}}
          placeholder="tìm kiếm"
          onChangeText={(term) => {
            search(term);
          }}
        />
      </View>
      <Text
        style={{color: '#00C9FF', padding: 10, fontSize: 18}}
        onPress={() => {}}>
        Danh bạ
      </Text>
      <View style={{flex: 1}}>
        <ListMemberView
          list_member={member_search.length != 0 ? member_search : list_contact}
        />
      </View>
      <View style={styles.confirmField}>
        <Text style={{color: '#55ABFC', alignItems: 'center'}}>
          Đã chọn {members_in_select.length} người{' '}
          {/* <AntDesign name="up" size={14} />{' '} */}
        </Text>
        <TouchableOpacity
          onPress={() => {
            onConfirm();
          }}>
          <View
            style={
              members_in_select.length != 0
                ? {...styles.confirmButton, backgroundColor: '#007CFF'}
                : styles.confirmButton
            }>
            {isFetching ? (
              <ActivityIndicator size="small" color="#00ff00" />
            ) : (
              <Text style={{color: 'white', alignSelf: 'center'}}>
                Xác nhận({members_in_select.length})
              </Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddMemberScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // paddingTop:10
  },
  search: {
    flexDirection: 'row',
    backgroundColor: '#EEEEEE',
    borderRadius: 20,
    marginHorizontal: 10,
    padding: 5,
  },
  confirmField: {
    borderTopWidth: 0.6,
    borderColor: '#CFCFCF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  confirmButton: {
    backgroundColor: '#55ABFC',
    fontWeight: 'bold',
    color: 'white',
    padding: 4,
    borderRadius: 5,
    width: 100,
    justifyContent: 'center',
  },
});
