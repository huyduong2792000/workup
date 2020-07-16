import React, { Component } from 'react';
import { View, Platform, TouchableOpacity,Keyboard } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';

export default class DateTimePickerField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: new Date(),
            show: false,
            mode: 'date',
            onChange: ()=>{},
            showDate: true,
            showTime: false
        }
    }
    open = ({showDate = true,showTime = false,value = new Date(),onChange=()=>{}}) => {        
        Keyboard.dismiss()
        if(typeof(value) === 'number'){            
            value = new Date(value * 1000)
        }
        if(!value){
            value = new Date()
        }        
        if(showDate){
            this.setState({show:true,showDate:showDate,showTime:showTime,value:value,onChange:onChange,mode:'date'})
        }else if(showTime){
            this.setState({show:true,showDate:showDate,showTime:showTime,value:value,onChange:onChange,mode:'time'})
        }else{
            
        }
    }
    close = () => {
        this.setState({show:false})
    }
    onChange = (event, selectedDate) => {
        if(selectedDate!=undefined && event.type !== 'dismissed'){                        
            this.state.onChange(selectedDate)
            if(this.state.showDate && this.state.showTime){
                this.setState({mode:'time',showTime:false,value:selectedDate})
                if(Platform.OS === 'ios'){
                }else{
                    this.close()
                }
            }
        }
    };
    render() {
        
        if(this.state.show){
            return (
                <>
                    {Platform.OS === 'ios' ?
                        <Modal
                            // backdropColor='rgba(25,25,25,0.0)'
                            avoidKeyboard={true}
                            onBackdropPress={() => {
                                this.onChange()
                                this.close()
                            }}
                            style={{ margin: 0}}
                            isVisible={this.state.show}>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.close()
                                    }}
                                    style={{ flex: 1 }}></TouchableOpacity>
                                <View style={{ backgroundColor: 'white' }}>
                                    <DateTimePicker
                                        style={{ backgroundColor: 'white' }}
                                        testID="dateTimePicker"
                                        timeZoneOffsetInMinutes={0}
                                        value={this.state.value ? this.state.value : new Date}
                                        mode={this.state.mode}
                                        is24Hour={true}
                                        display={this.props.displayMode}
                                        onChange={this.onChange}
                                    />
                                </View>
                            </View>
                        </Modal> :
                        <View style={{ flex: 1, position: 'absolute' }}>
                            <View style={{ backgroundColor: 'white', width: 0 }}>
                                <DateTimePicker
                                    style={{ backgroundColor: 'white' }}
                                    testID="dateTimePicker"
                                    timeZoneOffsetInMinutes={0}
                                    value={this.state.value ? this.state.value : new Date}
                                    mode={this.state.mode}
                                    is24Hour={true}
                                    display={this.props.displayMode}
                                    onChange={this.onChange}
                                />
                            </View>
                        </View>}
                </>
            );
        }else{
            return (<></>)
        }
            
        
    }
};

DateTimePickerField.propTypes = {
    displayMode: PropTypes.oneOf([
        'default',
        'spinner',
        'calendar',
        'clock'
    ]),
    showDate: PropTypes.bool,
    showTime: PropTypes.bool,
}

DateTimePickerField.defaultProps = {
    displayMode: 'default',
    // onChange: () => {},
    showDate: true,
    showTime: false,
}