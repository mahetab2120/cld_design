import React, {useState} from "react";
import {Image, SafeAreaView, StyleSheet, Text, TouchableOpacity} from "react-native";
import {ResponsivePixels} from "../../res/styles/ResponsivePixels";
import {Colors} from "../../res/styles/Colors";
import Images from "../../components/Images";
import {HeaderView} from "../../components/HeaderView";
import {FloatingEditTextInput} from "../../components/FloatingEditText";
import Strings from "../../stores/Language/Strings";
import {navigationConstants} from "../../constants/NavigationConstant";
import auth from '@react-native-firebase/auth';
import {isEmpty, setLoggedIn, showDangerToast} from "../../utils/Utils";
const Login = (props:any) => {
    const [mobileNumber,setMobileNumber]= useState<string>('')
    const [otp,setOtp]= useState<string>('')
    const [confirm,setConfirm]= useState<any>(null)
    const [isOtpSent,setIsOtpSent] = useState<any>(false)

    const handleLoginClick=async ()=>{
        // props.navigation.navigate(navigationConstants.HOME)
        await onConfirmOtp()
    }

    const handleSendOtp=async (phoneNumber: string)=>{
        let number = "+91" +  phoneNumber
        try{
            const confirmation = await auth().signInWithPhoneNumber(number);

            console.log("confirmation ===== > ",confirmation)
            setIsOtpSent(true)
            setConfirm(confirmation);
        }catch (e) {
            console.log("e======= > ",e)
            setIsOtpSent(false)
            showDangerToast(Strings.invalidMobileNumber)
        }

    }


    const onConfirmOtp = async () => {
        try {
            await confirm.confirm(otp);
            console.log('OTP Confirmed');
            await setLoggedIn()
            props.navigation.navigate(navigationConstants.HOME)
        } catch (error) {
            showDangerToast(Strings.invalidMobileNumber)
            console.error('Error confirming OTP: ', error);
        }
    };


    return (
        <SafeAreaView style={styles.mainContainer}>
            <HeaderView/>
            <Image source={Images.ic_login} style={styles.appLogoImage} />
            <FloatingEditTextInput isMobileNumber={true} imageStart={Images.ic_profile} label={Strings.mobileNumber} value={mobileNumber} onChangeText={(text:any)=>setMobileNumber(text)} onSendOtpClick={()=>handleSendOtp(mobileNumber)}/>
            {isOtpSent &&
            <Text style={styles.otpSent}>{Strings.otpSent}</Text>
            }
            <FloatingEditTextInput imageStart={Images.ic_lock} label={Strings.enterOtp} value={otp} onChangeText={(text:any)=>setOtp(text)}/>
            <TouchableOpacity style={styles.loginButton} onPress={()=>handleLoginClick()}>
                <Text style={styles.loginText}>{Strings.login}</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mainContainer:{
        flex: 1,
        backgroundColor:Colors.defaultWhite,
        justifyContent:'center',
        alignItems:'center'
    },
    appLogoImage:{
        width:ResponsivePixels.size250,
        height:ResponsivePixels.size350,
    },
    loginButton:{
        height:ResponsivePixels.size50,
        backgroundColor:Colors.royalBlue,
        borderRadius:ResponsivePixels.size10,
        marginVertical:ResponsivePixels.size25,
        alignItems:'center',
        justifyContent:'center',
        width:'90%',
        elevation:5
    },
    loginText:{
        fontSize:ResponsivePixels.size18,
        color:Colors.defaultWhite,
        fontWeight:'bold'
    },
    otpSent:{
        alignSelf:'flex-start',
        marginHorizontal:ResponsivePixels.size20,
        fontSize:ResponsivePixels.size14,
        color:Colors.highlightGreen,
    }
});

export default Login;
