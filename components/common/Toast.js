/**
 * react-native-easy-toast
 * https://github.com/crazycodeboy/react-native-easy-toast
 * Email:crazycodeboy@gmail.com
 * Blog:http://jiapenghui.com
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Animated,
    Dimensions,
    Text,
    ViewPropTypes as RNViewPropTypes,
} from 'react-native'

import PropTypes from 'prop-types';
const ViewPropTypes = RNViewPropTypes || View.propTypes;
export const DURATION = { 
    LENGTH_SHORT: 500,
    FOREVER: 0,
};

const {height, width} = Dimensions.get('window');

export default class Toast extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            text: '',
            opacityValue: new Animated.Value(this.props.opacity),
            backgroundColor:'rgba(25, 25, 25, 0.9)',
            textColor:'white'
        }
    }

    setType(type){        
        switch (type){
            case 'normal':                
                this.setState({backgroundColor:'rgba(25, 25, 25, 0.9)'})
                return
            case 'primary':
                this.setState({backgroundColor:'rgba(70, 74, 255, 0.9)'})
                return
            case 'secondary': 
                this.setState({backgroundColor:'rgba(108, 116, 126, 0.9)'})
                return
            case 'success':
                this.setState({backgroundColor:'rgba(0, 183, 62, 0.9)'})
                return
            case 'danger':
                this.setState({backgroundColor:'rgba(233, 0, 62, 0.9)'})
                return
            case 'warning':
                this.setState({backgroundColor:'rgba(255, 202, 0, 0.9)'})
                return
            case 'info':
                this.setState({backgroundColor:'rgba(0, 163, 186, 0.9)'})
                return
            case 'light':
                this.setState({backgroundColor:'rgba(248, 249, 250, 0.9)'})
                return
            case 'dark':                
                this.setState({backgroundColor:'rgba(52, 57, 64, 0.9)'})
                return
            case 'white':
                this.setState({backgroundColor:'rgba(255, 255, 255, 0.9)'})
                return
            default:                
                this.setState({backgroundColor:'rgba(25, 25, 25, 0.9)'})
                return
        }

    }

    show({text='', duration=500,type='normal', callback=()=>{}}) {          
        this.duration = typeof duration === 'number' ? duration : DURATION.LENGTH_SHORT;
        this.callback = callback;
        this.setState({
            isShow: true,
            text: text,
        });
        this.setType(type)
        this.animation = Animated.timing(
            this.state.opacityValue,
            {
                toValue: this.props.opacity,
                duration: this.props.fadeInDuration,
            }
        )
        this.animation.start(() => {
            this.isShow = true;
            if(duration !== DURATION.FOREVER) this.close();
        });
    }

    close( duration ) {
        let delay = typeof duration === 'undefined' ? this.duration : duration;

        if(delay === DURATION.FOREVER) delay = this.props.defaultCloseDelay || 250;

        if (!this.isShow && !this.state.isShow) return;
        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.animation = Animated.timing(
                this.state.opacityValue,
                {
                    toValue: 0.0,
                    duration: this.props.fadeOutDuration,
                }
            )
            this.animation.start(() => {
                this.setState({
                    isShow: false,
                });
                this.isShow = false;
                if(typeof this.callback === 'function') {
                    this.callback();
                }
            });
        }, delay);
    }

    componentWillUnmount() {
        this.animation && this.animation.stop()
        this.timer && clearTimeout(this.timer);
    }

    render() {
        let pos;                
        switch (this.props.position) {
            case 'top':
                pos = this.props.positionValue;
                break;
            case 'center':
                pos = height / 2;
                break;
            case 'bottom':
                pos = height - this.props.positionValue;
                break;
        }

        const view = this.state.isShow ?
            <View
                style={[styles.container, { top: pos }]}
                pointerEvents="none"
            >
                <Animated.View
                    // style={{backgroundColor:this.state.backgroundColor}}
                >
                    {React.isValidElement(this.state.text) ? this.state.text : 
                        <View style={[styles.content,{backgroundColor:this.state.backgroundColor}]}>
                            <Text style={this.props.textStyle}>{this.state.text}</Text>
                        </View>
                        }
                </Animated.View>
            </View> : null;
        return view;
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        elevation: 999,
        alignItems: 'center',
        zIndex: 10000,
    },
    content: {
        borderRadius:25,
        paddingHorizontal: 25,
        paddingVertical:10
    },
    text: {
        color: 'white',
        fontSize:15,
    }
});

Toast.propTypes = {
    style: ViewPropTypes.style,
    position: PropTypes.oneOf([
        'top',
        'center',
        'bottom',
    ]),
    textStyle: Text.propTypes.style,
    positionValue:PropTypes.number,
    fadeInDuration:PropTypes.number,
    fadeOutDuration:PropTypes.number,
    opacity:PropTypes.number
}

Toast.defaultProps = {
    position: 'bottom',
    textStyle: styles.text,
    positionValue: 100,
    fadeInDuration: 100,
    fadeOutDuration: 2000,
    opacity: 1
}