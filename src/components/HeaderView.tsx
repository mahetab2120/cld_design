import {Image, StatusBar, StyleSheet, View} from "react-native";
import Images from "./Images";
import React from "react";
import {ResponsivePixels} from "../res/styles/ResponsivePixels";
import {Colors} from "../res/styles/Colors";

interface HeaderProps{
    backgroundColor?:any
    headerIconColor?:any
}
export const HeaderView =(props:HeaderProps)=>{
    const {backgroundColor,headerIconColor}= props;
    return(
        <>
            <StatusBar backgroundColor={backgroundColor || Colors.defaultWhite} barStyle={'dark-content'}/>
        </>
    )
}

const styles = StyleSheet.create({
    headerView:{
        paddingHorizontal:ResponsivePixels.size25,
        paddingVertical:ResponsivePixels.size10,
    },
    headerSmallIcon:{
        height:ResponsivePixels.size20,
        width:ResponsivePixels.size20,
        marginHorizontal:ResponsivePixels.size10
    },
    headerLargeIcon:{
        height:ResponsivePixels.size30,
        width:ResponsivePixels.size30,
    },
    headerLogoIcon:{
        height:ResponsivePixels.size40,
        width:ResponsivePixels.size40,
        left:ResponsivePixels.size20,
    },
    rowView:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    columnView:{
        justifyContent:'center',
        alignItems:'center'
    }
});
