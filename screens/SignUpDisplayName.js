import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  StyleSheet,
  TextInput,
  Image,
  DeviceEventEmitter,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
// import LoginApi from '../components/login/LoginApi'
// import {Ionicons} from 'react-native-vector-icons'
import Validate from '../components/common/Validate';
import BaseApi from '../components/common/BaseApi';
import {useDispatch} from 'react-redux';
import {setCurrentUser} from '../store/ActionStore';
import {setCurrentGroup} from '../store/group/Actions';

const SignUpDisplayName = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [user_signup, setUserSignUp] = useState(route.params.user_signup);
  const [isFetching, setFetching] = useState(false);
  const proccessSignUp = async () => {
    setFetching(true);
    if (
      user_signup.password &&
      Validate.validatePhone(user_signup.phone) &&
      user_signup.display_name
    ) {
      await BaseApi({urlPrefix: '/', collectionName: 'signup'})
        .post(user_signup)
        .then((response) => {
          dispatch(setCurrentUser(response));
          dispatch(setCurrentGroup(response.group_last_access));
          setFetching(false);
          DeviceEventEmitter.emit('showToast', {
            text: 'Đăng ký thành công',
            type: 'success',
          });
          navigation.navigate('LoginScreen', {
            phone: user_signup.phone,
            password: user_signup.password,
          });
        });
    } else {
      DeviceEventEmitter.emit('showToast', {
        text: 'tên phải có ít nhất một ký tự',
        type: 'warning',
      });
    }
    setFetching(false);
  };
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
                color: user_signup.display_name != '' ? 'gray' : 'red',
              }}>
              Nhập tên của bạn
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
                placeholder="Tên của bạn"
                autoCapitalize="none"
                autoFocus={true}
                onChangeText={(term) => {
                  setUserSignUp({...user_signup, display_name: term});
                }}
                onSubmitEditing={() => {
                  proccessSignUp();
                }}
              />
            </View>
          </LinearGradient>
          <LinearGradient
            style={{borderRadius: 25}}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#00e0ff', '#358ef0', '#9b3de2', '#d858f1']}>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => {
                Keyboard.dismiss();
                proccessSignUp();
              }}>
              {isFetching ? (
                <ActivityIndicator size="small" color="#00ff00" />
              ) : (
                <Text style={styles.loginButtonTitle}>OK</Text>
              )}
            </TouchableOpacity>
          </LinearGradient>
        </View>
        <View style={styles.bottom_field}>
          <Text>
            đăng nhập bằng tài khoản khác?{' '}
            <Text
              style={{fontWeight: 'bold'}}
              onPress={() => {
                navigation.navigate('LoginScreen');
              }}>
              Login
            </Text>
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignUpDisplayName;

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
    // flexDirection: 'column',
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
    backgroundColor: 'white',
    position: 'absolute',
    height: 40,
    width: 300,
    fontSize: 16,
    paddingHorizontal: 0,
  },
  lineGradient: {
    height: 41,
    marginBottom: 40,
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
