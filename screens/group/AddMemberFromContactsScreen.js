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
const AddMemberFromContactsScreen = ({navigation, route}) => {
  const group = useSelector((state) => state.Group);
  const members_in_select = useSelector((state) => state.MembersInSelect);
  const dispatch = useDispatch();
  const [list_contact, setListContact] = useState([]);
  const [contacts_source, setContactsSource] = useState([]);
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
            setContactsSource(contacts);
            validListContact(contacts);
          }
        });
      });
    } else {
      Contacts.getAll((err, contacts) => {
        if (err === 'denied') {
          // error
        } else {
          contacts.map((item, index) => {
            item.displayName = item.familyName + ' ' + item.givenName;
            return item;
          });
          validListContact(contacts);
          setContactsSource(contacts);
        }
      });
    }
  };
  const validListContact = async (contacts) => {
    contacts = contacts.slice(0, 50);
    await BaseApi({collectionName: 'check_user_has_been_account'})
      .post({contacts, group})
      .then((respone) => {
        setListContact([...respone]);
      });
  };
  const search = (searchValue) => {
    searchValue = searchValue.toLowerCase();
    if (searchValue !== '') {
      var data_search_from_list_contact = contacts_source.filter(
        (item, index) => {
          console.log(item);
          return (
            item.displayName.toLowerCase().indexOf(searchValue) !== -1 ||
            item.phoneNumbers[0].number.toLowerCase().indexOf(searchValue) !==
              -1
          );
        },
      );
      validListContact(data_search_from_list_contact);
    } else {
      getContacts();
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
        <ListMemberView list_member={list_contact} />
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

export default AddMemberFromContactsScreen;

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
