/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  StyleSheet,
  TextInput,
  Image,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  DeviceEventEmitter,
} from 'react-native';
// import LoginApi from '../components/login/LoginApi'
import Entypo from 'react-native-vector-icons/Entypo';
import {setCurrentUser} from 'store/ActionStore';
import {setCurrentGroup} from 'store/group/Actions';
import {useSelector, useDispatch} from 'react-redux';
import BaseApi from 'components/common/BaseApi';
import Validate from 'components/common/Validate';

const LoginScreen = ({navigation, route}) => {
  const [state, dispatchState] = useState({phone: '', password: ''});
  const [show_password, setShowPassword] = useState(true);
  const [isFetching, setFetching] = useState(false);
  const dispatch = useDispatch();
  const proccessLogin = async () => {
    setFetching(true);
    BaseApi({urlPrefix: '/', collectionName: 'login'})
      .post(state)
      .then(function (response) {
        dispatch(setCurrentUser(response));
        dispatch(setCurrentGroup(response.group_last_access));
        setFetching(false);
        navigation.navigate('Home');
      })
      .catch(function (error) {
        setFetching(false);
        DeviceEventEmitter.emit('showToast', {
          text: 'Sai tên đăng nhập hoặc mật khẩu',
          type: 'danger',
        });
      });
  };
  useEffect(() => {
    if (route.params !== undefined) {
      dispatchState({...route.params});
    }
  }, [route.params]);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.header_field}>
          <Text style={styles.title}>Welcome</Text>
          <Image
            style={styles.logo}
            source={{
              uri:
                'http://www.upstart.vn/wp-content/uploads/2019/01/logo_upstart_200.png',
            }}
          />
        </View>
        <View style={styles.input_field}>
          <View style={{width: 300}}>
            <Text
              style={{
                alignSelf: 'flex-start',
                color: Validate.validatePhone(state.phone) ? 'gray' : 'red',
              }}>
              Số điện thoại
            </Text>
          </View>
          <LinearGradient
            style={styles.lineGradient}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#00e0ff', '#358ef0', '#9b3de2', '#d858f1']}>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                textContentType="emailAddress"
                keyboardType="phone-pad"
                placeholder="Số điện thoại"
                autoCapitalize="none"
                value={state.phone}
                onChangeText={(term) => dispatchState({...state, phone: term})}
                onSubmitEditing={() => {
                  Keyboard.dismiss();
                  proccessLogin();
                }}
                //   onChangeText={(term)=>{setInfo({...info,phone:term})}}
              />
            </View>
          </LinearGradient>
          <View style={styles.textInputContainer}>
            <TextInput
              style={[
                styles.textInput,
                {borderBottomWidth: 0.6, borderBottomColor: 'gray'},
              ]}
              placeholder="Mật khẩu"
              value={state.password}
              secureTextEntry={show_password}
              onChangeText={(term) => dispatchState({...state, password: term})}
              onSubmitEditing={() => {
                Keyboard.dismiss();
                proccessLogin();
              }}
            />
            <TouchableOpacity
              style={styles.btnEye}
              onPress={() => setShowPassword(!show_password)}>
              <Entypo
                name={show_password ? 'eye' : 'eye-with-line'}
                size={26}
                color="gray"
              />
            </TouchableOpacity>
          </View>
          <LinearGradient
            style={{borderRadius: 25}}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#00e0ff', '#358ef0', '#9b3de2', '#d858f1']}>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => {
                Keyboard.dismiss();
                proccessLogin();
              }}>
              {isFetching ? (
                <ActivityIndicator size="small" color="#00ff00" />
              ) : (
                <Text style={styles.loginButtonTitle}>ĐĂNG NHẬP</Text>
              )}
            </TouchableOpacity>
          </LinearGradient>
        </View>
        <View style={styles.bottom_field}>
          <Text>
            Bạn chưa có tài khoản?{' '}
            <Text
              style={{fontWeight: 'bold'}}
              onPress={() => {
                navigation.navigate('SignUpScreen');
              }}>
              Đăng ký
            </Text>
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  header_field: {
    flexGrow: 3,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'flex-end',
    alignItems: 'center',
    // marginBottom:20
  },
  input_field: {
    flexGrow: 4,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    // marginTop:40
  },
  title: {
    // fontFamily: 'sans-serif-medium',
    fontWeight: '900',
    fontSize: 28,
    lineHeight: 25,
    // eslint-disable-next-line no-dupe-keys
    fontWeight: 'bold',
    marginTop: 70,
    paddingBottom: 20,
  },
  logo: {
    height: 50,
    width: 150,
  },
  textInputContainer: {
    width: 300,
    marginBottom: 50,
    position: 'relative',
    height: 40,
  },
  textInput: {
    // lineHeight:40,
    alignItems: 'center',
    backgroundColor: 'white',
    position: 'absolute',
    height: 40,
    width: 300,
    fontSize: 16,
    paddingHorizontal: 0,
    // top:0
  },
  lineGradient: {
    height: 41,
    marginBottom: 40,
    width: 300,
  },
  loginButton: {
    flexDirection: 'row',
    width: 300,
    height: 45,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'flex-end',
  },
  loginButtonTitle: {
    fontSize: 18,
    color: 'white',
  },
  btnEye: {
    position: 'absolute',
    bottom: 8,
    right: 5,
  },
  bottom_field: {
    flexGrow: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 50,
    alignItems: 'flex-end',
  },
});
