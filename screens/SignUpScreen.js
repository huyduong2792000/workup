import React, {useState, useRef} from 'react';
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
import Entypo from 'react-native-vector-icons/Entypo';
import Validate from '../components/common/Validate';
import BaseApi from '../components/common/BaseApi';
const SignUpScreen = ({navigation}) => {
  // const [user_signup, dispatch] = useReducer(reducer, {phone: "", password: ""})
  const [show_password, setShowPassword] = useState(true);
  const [user_signup, setUserSignUp] = useState({phone: '', password: ''});
  const [isFetching, setFetching] = useState(false);
  const proccessSignUp = async () => {
    setFetching(true);
    Keyboard.dismiss();

    if (user_signup.password && Validate.validatePhone(user_signup.phone)) {
      await BaseApi({collectionName: 'check_phone_exist'})
        .post(user_signup)
        .then((data) => {
          if (!data.check) {
            navigation.navigate('SignUpDisplayName', {
              user_signup: user_signup,
            });
            setFetching(false);
          } else {
            DeviceEventEmitter.emit('showToast', {
              text: 'số điện thoại này đã được sử dụng',
              type: 'warning',
            });
            setFetching(false);
          }
        });
    } else {
      if (!Validate.validatePhone(user_signup.phone)) {
        DeviceEventEmitter.emit('showToast', {
          text: 'số điện thoại không hợp lệ',
          type: 'warning',
        });
      } else {
        DeviceEventEmitter.emit('showToast', {
          text: 'password không hợp lệ',
          type: 'warning',
        });
      }
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
                color: Validate.validatePhone(user_signup.phone)
                  ? 'gray'
                  : 'red',
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
                textContentType="telephoneNumber"
                keyboardType="phone-pad"
                placeholder="Số điện thoại"
                autoCapitalize="none"
                onChangeText={(term) => {
                  setUserSignUp({...user_signup, phone: term});
                }}
                onSubmitEditing={() => {
                  proccessSignUp();
                }}
                //   onChangeText={(term)=>{setInfo({...info,phone:term})}}
              />
            </View>
          </LinearGradient>
          <View style={styles.textInputContainer}>
            <TextInput
              style={[
                styles.textInput,
                {borderBottomWidth: 1, borderBottomColor: 'gray'},
              ]}
              placeholder="Mật khẩu"
              secureTextEntry={show_password}
              onChangeText={(term) =>
                setUserSignUp({...user_signup, password: term})
              }
              onSubmitEditing={() => {
                proccessSignUp();
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
                proccessSignUp();
              }}>
              {isFetching ? (
                <ActivityIndicator size="small" color="#00ff00" />
              ) : (
                <Text style={styles.loginButtonTitle}>ĐĂNG KÝ</Text>
              )}
            </TouchableOpacity>
          </LinearGradient>
        </View>
        <View style={styles.bottom_field}>
          <Text>
            Bạn đã có tài khoản?{' '}
            <Text
              style={{fontWeight: 'bold'}}
              onPress={() => {
                navigation.navigate('LoginScreen');
              }}>
              Đăng nhập
            </Text>
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignUpScreen;

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
