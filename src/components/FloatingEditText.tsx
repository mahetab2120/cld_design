import React from 'react';
import {View, Text, TextInput, StyleSheet, Image, TouchableOpacity} from "react-native";
import { Colors } from "../res/styles/Colors";
import { ResponsivePixels } from "../res/styles/ResponsivePixels";
import Strings from "../stores/Language/Strings";

export interface IProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  onSendOtpClick?: () => void;
  imageStart?:any
  isMobileNumber?:any

}

export const FloatingEditTextInput: React.FC<IProps> = React.forwardRef(
  (props, ref: any) => {
    const {
      value,
      label,
      onChangeText,
      imageStart,
      isMobileNumber,
      onSendOtpClick
    } = props;

    return (
      <View style={styles.inputView}>
        <View style={styles.rowView}>
        {imageStart ?
            <Image source={imageStart} style={styles.imageEndStyle}/>:<View/>
        }
        <TextInput
          style={styles.textInput}
          placeholderTextColor={Colors.lightPink}
          placeholder={label}
          value={value}
          onChangeText={text => onChangeText(text)}
        />
        </View>
          {isMobileNumber ?
              <View style={styles.rowView}>
                  <View style={styles.lineView}/>
                  <TouchableOpacity onPress={()=>onSendOtpClick ? onSendOtpClick() : null}>
                  <Text style={[styles.textInput,{color:Colors.darkGray,fontWeight:'bold'}]}>{Strings.sendOtp}</Text>
                  </TouchableOpacity>
              </View>
              :null
          }
      </View>
    );
  },
);

const styles = StyleSheet.create({
  inputView:{
    height:ResponsivePixels.size50,
    backgroundColor:Colors.lightGray,
    width:'90%',
    borderRadius:ResponsivePixels.size10,
    marginVertical:ResponsivePixels.size15,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingHorizontal:ResponsivePixels.size15
  },
  textInput: {
    fontSize: ResponsivePixels.size14,
    color: Colors.lightPink,
    marginLeft:ResponsivePixels.size10
  },
  rowView:{
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center'
  },
  imageEndStyle:{
    height:ResponsivePixels.size20,
    width:ResponsivePixels.size20,
    tintColor:Colors.lightPink
  },
  lineView:{
    height:ResponsivePixels.size35,
    width:ResponsivePixels.size1,
    backgroundColor:Colors.darkGray
  }
})
