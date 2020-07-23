import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TextInput,
  UIManager,
  LayoutAnimation,
  Animated,
  ActivityIndicator,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
  Keyboard,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

class SearchBar extends Component {
  static propTypes = {
    searchPlaceholder: PropTypes.string,
    onClear: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onChangeText: PropTypes.func,
  };

  static defaultProps = {
    searchPlaceholder: 'Search',
    onClear: () => null,
    onFocus: () => null,
    onBlur: () => null,
    onChangeText: () => null,
  };

  constructor(props) {
    super(props);

    this.state = {
      hasFocus: false,
      isEmpty: true,
      showLoader: false,
    };
  }

  focus = () => {
    this.input.focus();
  };

  blur = () => {
    this.input.blur();
  };

  clear = () => {
    this.input.clear();
    this.onChangeText('');
    this.props.onClear();
  };

  cancel = () => {
    this.blur();
  };

  showLoader = () => {
    this.setState({
      showLoader: true,
    });
  };

  hideLoader = () => {
    this.setState({
      showLoader: false,
    });
  };

  onFocus = () => {
    this.props.onFocus();
    if (UIManager.configureNextLayoutAnimation) {
      LayoutAnimation.easeInEaseOut();
    }
    this.setState({
      hasFocus: true,
    });
  };

  onBlur = () => {
    this.props.onBlur();
    if (UIManager.configureNextLayoutAnimation) {
      LayoutAnimation.easeInEaseOut();
    }
    this.setState({
      hasFocus: false,
    });
  };

  onChangeText = (text) => {
    this.props.onChangeText(text);
    this.setState({isEmpty: text === ''});
  };

  render() {
    const {
      container,
      inputStyle,
      leftIconStyle,
      rightContainer,
      rightIconStyle,
      activityIndicator,
    } = styles;

    const {searchPlaceholder, style} = this.props;

    const {hasFocus, isEmpty, showLoader} = this.state;

    const inputStyleCollection = [inputStyle];

    if (hasFocus) {
      inputStyleCollection.push({flex: 1});
    }

    return (
      <View onPress={() => console.log('press')}>
        <View style={container}>
          <View style={leftIconStyle}>
            <AntDesign
              name="search1"
              size={18}
              style={{alignSelf: 'center', paddingHorizontal: 10}}
            />
          </View>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <TextInput
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              onChangeText={this.onChangeText}
              placeholder={searchPlaceholder}
              style={inputStyleCollection}
              placeholderTextColor="#515151"
              autoCorrect={false}
              ref={(ref) => {
                this.input = ref;
              }}
            />
          </TouchableWithoutFeedback>
          <View style={rightContainer}>
            {hasFocus && showLoader ? (
              <ActivityIndicator
                key="loading"
                style={activityIndicator}
                color="#515151"
              />
            ) : (
              <View />
            )}
            {hasFocus && !isEmpty ? (
              <TouchableOpacity onPress={this.clear}>
                <View style={rightIconStyle}>
                  <Text>ⅹ</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <View />
            )}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    borderRadius: 5,
    backgroundColor: '#ddd',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputStyle: {
    alignSelf: 'center',
    marginLeft: 5,
    height: 40,
    fontSize: 14,
  },
  leftIconStyle: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  rightContainer: {
    flexDirection: 'row',
  },
  rightIconStyle: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  activityIndicator: {
    marginRight: 5,
  },
});

export default SearchBar;
