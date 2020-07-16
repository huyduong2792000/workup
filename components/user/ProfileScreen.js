// import * as React from 'react';
// import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';

// import { MonoText } from '../common/StyledText';

// export default function ProfileScreen() {
//   return (
//     <View style={styles.container}>
//       <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
//         <View style={styles.welcomeContainer}>
//           <Image
//             source={
//               __DEV__
//                 ? require('../../assets/images/robot-dev.png')
//                 : require('../../assets/images/robot-prod.png')
//             }
//             style={styles.welcomeImage}
//           />
//         </View>

//         <View style={styles.getStartedContainer}>
//           <DevelopmentModeNotice />

//           <Text style={styles.getStartedText}>Open up the code for this screen:</Text>

//           <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
//             <MonoText>screens/HomeScreen.js</MonoText>
//           </View>

//           <Text style={styles.getStartedText}>
//             Change any of the text, save the file, and your app will automatically reload.
//           </Text>
//         </View>

//         <View style={styles.helpContainer}>
//           <TouchableOpacity onPress={handleHelpPress} style={styles.helpLink}>
//             <Text style={styles.helpLinkText}>Help, it didn’t automatically reload!</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>

//       <View style={styles.tabBarInfoContainer}>
//         <Text style={styles.tabBarInfoText}>This is a tab bar. You can edit it in:</Text>

//         <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
//           <MonoText style={styles.codeHighlightText}>navigation/MainTabNavigator.js</MonoText>
//         </View>
//       </View>
//     </View>
//   );
// }

// ProfileScreen.navigationOptions = {
//   header: null,
// };

// function DevelopmentModeNotice() {
//   if (__DEV__) {
//     const learnMoreButton = (
//       <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
//         Learn more
//       </Text>
//     );

//     return (
//       <Text style={styles.developmentModeText}>
//         Development mode is enabled: your app will be slower but you can use useful development
//         tools. {learnMoreButton}
//       </Text>
//     );
//   } else {
//     return (
//       <Text style={styles.developmentModeText}>
//         You are not in development mode: your app will run at full speed.
//       </Text>
//     );
//   }
// }

// function handleLearnMorePress() {
//   WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/workflow/development-mode/');
// }

// function handleHelpPress() {
//   WebBrowser.openBrowserAsync(
//     'https://docs.expo.io/versions/latest/get-started/create-a-new-app/#making-your-first-change'
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   developmentModeText: {
//     marginBottom: 20,
//     color: 'rgba(0,0,0,0.4)',
//     fontSize: 14,
//     lineHeight: 19,
//     textAlign: 'center',
//   },
//   contentContainer: {
//     paddingTop: 30,
//   },
//   welcomeContainer: {
//     alignItems: 'center',
//     marginTop: 10,
//     marginBottom: 20,
//   },
//   welcomeImage: {
//     width: 100,
//     height: 80,
//     resizeMode: 'contain',
//     marginTop: 3,
//     marginLeft: -10,
//   },
//   getStartedContainer: {
//     alignItems: 'center',
//     marginHorizontal: 50,
//   },
//   homeScreenFilename: {
//     marginVertical: 7,
//   },
//   codeHighlightText: {
//     color: 'rgba(96,100,109, 0.8)',
//   },
//   codeHighlightContainer: {
//     backgroundColor: 'rgba(0,0,0,0.05)',
//     borderRadius: 3,
//     paddingHorizontal: 4,
//   },
//   getStartedText: {
//     fontSize: 17,
//     color: 'rgba(96,100,109, 1)',
//     lineHeight: 24,
//     textAlign: 'center',
//   },
//   tabBarInfoContainer: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     ...Platform.select({
//       ios: {
//         shadowColor: 'black',
//         shadowOffset: { width: 0, height: -3 },
//         shadowOpacity: 0.1,
//         shadowRadius: 3,
//       },
//       android: {
//         elevation: 20,
//       },
//     }),
//     alignItems: 'center',
//     backgroundColor: '#fbfbfb',
//     paddingVertical: 20,
//   },
//   tabBarInfoText: {
//     fontSize: 17,
//     color: 'rgba(96,100,109, 1)',
//     textAlign: 'center',
//   },
//   navigationFilename: {
//     marginTop: 5,
//   },
//   helpContainer: {
//     marginTop: 15,
//     alignItems: 'center',
//   },
//   helpLink: {
//     paddingVertical: 15,
//   },
//   helpLinkText: {
//     fontSize: 14,
//     color: '#2e78b7',
//   },
// });
// import * as React from 'react';
// import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';
// import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// export default function ChatList() {

//     function RenderList() {
//         return (<FlatList data={[
//                 { name: 'Devin', image: 'https://upstart.vn/static/upload/upinstantpage/163810931271585164258715.jpg' },
//                 { name: 'Dan', image: 'https://upstart.vn/static/upload/upinstantpage/163810931271585164258715.jpg' },
//                 { name: 'Dominic', image: 'https://upstart.vn/static/upload/upinstantpage/163810931271585164258715.jpg' },
//                 { name: 'Jackson', image: 'https://upstart.vn/static/upload/upinstantpage/163810931271585164258715.jpg' },
//                 { name: 'James', image: 'https://upstart.vn/static/upload/upinstantpage/163810931271585164258715.jpg' },
//                 { name: 'Joel', image: 'https://upstart.vn/static/upload/upinstantpage/163810931271585164258715.jpg' },
//                 { name: 'John', image: 'https://upstart.vn/static/upload/upinstantpage/163810931271585164258715.jpg' },
//                 { name: 'Jillian', image: 'https://upstart.vn/static/upload/upinstantpage/163810931271585164258715.jpg' },
//                 { name: 'Jimmy', image: 'https://upstart.vn/static/upload/upinstantpage/163810931271585164258715.jpg' },
//                 { name: 'Julie', image: 'https://upstart.vn/static/upload/upinstantpage/163810931271585164258715.jpg' },
//                 { name: 'Devin', image: 'https://upstart.vn/static/upload/upinstantpage/163810931271585164258715.jpg' },
//                 { name: 'Dan', image: 'https://upstart.vn/static/upload/upinstantpage/163810931271585164258715.jpg' },
//                 { name: 'Dominic', image: 'https://upstart.vn/static/upload/upinstantpage/163810931271585164258715.jpg' },
//                 { name: 'Jackson', image: 'https://upstart.vn/static/upload/upinstantpage/163810931271585164258715.jpg' },
//                 { name: 'James', image: 'https://upstart.vn/static/upload/upinstantpage/163810931271585164258715.jpg' },
//                 { name: 'Joel', image: 'https://upstart.vn/static/upload/upinstantpage/163810931271585164258715.jpg' },
//                 { name: 'John', image: 'https://upstart.vn/static/upload/upinstantpage/163810931271585164258715.jpg' },
//                 { name: 'Jillian', image: 'https://upstart.vn/static/upload/upinstantpage/163810931271585164258715.jpg' },
//                 { name: 'Jimmy', image: 'https://upstart.vn/static/upload/upinstantpage/163810931271585164258715.jpg' },
//                 { name: 'Julie', image: 'https://upstart.vn/static/upload/upinstantpage/163810931271585164258715.jpg' },
//             ]}
//             renderItem={({ item, index }) => {
//                 var img = item.image;
//                 return (<TouchableOpacity key={index} style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }}>
//                     <Image source={{ uri: img }} style={{ width: 64, height: 64, borderRadius: 15, marginRight: 10 }} />
//                     <View style={{paddingVertical: 10}}>
//                         <Text style={{fontSize: 18, fontWeight: "450"}}>Nguyễn Văn Hưng</Text>
//                         <Text style={{fontSize: 14, fontWeight: "300", marginTop: 5, color: 'gray'}}>Đang làm gì đó?</Text>
//                     </View>
//                 </TouchableOpacity>)
//             }} showsHorizontalScrollIndicator={false}
//         />)
//     }

//     return (
//         <SafeAreaView style={styles.container}>
//             <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsHorizontalScrollIndicator={false}>
//                 {/* {this.renderList()} */}
//                 <RenderList />
//             </ScrollView>
// {/* 
//             <View style={styles.tabBarInfoContainer}>
//                 <Text style={styles.tabBarInfoText}>This is a tab bar. You can edit it in:</Text>
//             </View> */}
//         </SafeAreaView>
//     );
// }

// ChatList.navigationOptions = {
//     header: null,
// };

// function handleLearnMorePress() {
//     WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/workflow/development-mode/');
// }

// function handleHelpPress() {
//     WebBrowser.openBrowserAsync(
//         'https://docs.expo.io/versions/latest/get-started/create-a-new-app/#making-your-first-change'
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         paddingLeft: 10,
//         paddingRight: 10
//     },
//     contentContainer: {
//         paddingTop: 10,
//     },
//     tabBarInfoContainer: {
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         right: 0,
//         ...Platform.select({
//             ios: {
//                 shadowColor: 'black',
//                 shadowOffset: { width: 0, height: -3 },
//                 shadowOpacity: 0.1,
//                 shadowRadius: 3,
//             },
//             android: {
//                 elevation: 20,
//             },
//         }),
//         alignItems: 'center',
//         backgroundColor: '#fbfbfb',
//         paddingVertical: 10,
//         display: 'none'
//     },
//     tabBarInfoText: {
//         fontSize: 16,
//         color: 'red',
//         textAlign: 'center',
//     }
// });
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const ChatList = () => {
    return (
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
            <Text style={{color:'gray'}}>tính năng này đang thử nghiệm</Text>
        </View>
    )
}

export default ChatList

const styles = StyleSheet.create({})
