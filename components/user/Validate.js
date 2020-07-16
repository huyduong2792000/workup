import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const validateName = (name='') => {    
    return name.length>0?true:false
}
const validateEmail = (email='') => {  
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var check = re.test(String(email).toLowerCase())
    return check;  
}
const validatePhone = (phone) => {  
    if (phone === undefined){
        return false
    }
    var re = /(09|08|07|05|03)+[0-9]{8}/g;
    const result = phone.match(re);
    if (result && result == phone) {
        return true;
    } else {
        return false;
    }
}
const validateIdentifier=(id_identifier)=>{
    if(id_identifier===undefined){
        return false
    }
    var re = /^\d+$/;
    var check = re.test(id_identifier);
    return check;
}
const Validate ={validateName,validateEmail,validatePhone,validateIdentifier}
export default Validate

const styles = StyleSheet.create({})
// validateEmail:function() {
//     var self = this;
//     let email = self.model.get('email');
//     var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     var check = re.test(String(email).toLowerCase())
//     self.renderValidate(check,'#email','#email-invalid-feedback')
//     return check;
// },
// validatePhone:function(){
//     var self = this
//     var phone_number = self.model.get('phone_number');
//     var check = Helpers.validatePhone(phone_number)
//     self.renderValidate(check,'#phone_number','#phone_number-invalid-feedback')
//     return check;
// },
// validateIdentifier:function(){
//     var self = this;
//     var id_identifier = self.model.get('id_identifier');
//     var re = /^\d+$/;
//     var check = re.test(id_identifier);
//     self.renderValidate(check,'#id_identifier','#id_identifier-invalid-feedback')
//     return check;
// },
// validateFullname:function(){
//     var self = this;
//     var full_name = self.model.get('full_name');
//     var check = (full_name!=null?true:false)
//     self.renderValidate(check,'#full_name','#full_name-invalid-feedback')
//     return check;
// },