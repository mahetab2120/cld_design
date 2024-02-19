import React from "react";
import {FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {ResponsivePixels} from "../../res/styles/ResponsivePixels";
import {Colors} from "../../res/styles/Colors";
import Images from "../../components/Images";
import {getDayAndDateFromTimeStamp} from "../../utils/Utils";
import {HeaderView} from "../../components/HeaderView";
import Strings from "../../stores/Language/Strings";
import {goBack} from "../../navigation/Navigator";


const Notification = (props:any) => {
    const historyList=[
        {
            name:'Abhishek schedule a meeting ',
            numberOfPeople:2,
            date: 1708155153000
        },
        {
            name:'Saransh schedule a meeting ',
            numberOfPeople:2,
            date: 1708247365000
        },
    ]

    const handleBack=()=>{
        goBack()
    }
    const handleDeclineClick = () => {
      };

      const handleAcceptClick = () => {
      };



    const  renderHistory=({item,index}:{item:any,index:number})=>{
        let dateObject = getDayAndDateFromTimeStamp(item.date)
        const initials = item.name.charAt(0).toUpperCase();
        return(
            <View style={[styles.rowView,{marginVertical:ResponsivePixels.size5,alignItems:'flex-start'}]}>
                <View style={[styles.eventView]}>
                    <View style={styles.circleView}>
                        <Text style={styles.initialText}>{initials}</Text>
                    </View>
                    <View style={[styles.columnView,{alignItems:'flex-start',marginHorizontal:ResponsivePixels.size10}]}>
                        <Text style={styles.eventName}>{item.name}</Text>
                        <Text style={styles.eventTime}>{dateObject.date} {dateObject.month}, {dateObject.year}</Text>
                        <View style={styles.btnBox}>
                        <TouchableOpacity style={styles.buttonView} onPress={handleDeclineClick}>
        <Text style={styles.buttonText}>Decline</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.buttonView,{backgroundColor:Colors.royalBlue}]} onPress={handleAcceptClick}>
        <Text style={styles.buttonText}>Accept</Text>
      </TouchableOpacity>
    </View>

                    </View>
                    <View style={styles.dateView}>
                        <Text style={[styles.eventTime,{color:Colors.defaultGray}]}>{dateObject.time}</Text>
                    </View>
                </View>
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.mainContainer}>
            <HeaderView/>
            <View style={styles.headerView}>
                <TouchableOpacity onPress={handleBack} >
                    <Image source={Images.ic_back} style={styles.headerImage}/>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{Strings.notification}</Text>
                <View/>
            </View>
            <View style={styles.subView}>
                <FlatList data={historyList} renderItem={renderHistory}/>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mainContainer:{
        flex: 1,
        backgroundColor:Colors.defaultWhite,
        justifyContent:'flex-start',
        alignItems:'flex-start'
    },
    btnBox:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: ResponsivePixels.size10,
    },
    buttonView: {
        paddingHorizontal:ResponsivePixels.size15,
        paddingVertical:ResponsivePixels.size4,
        marginHorizontal: ResponsivePixels.size5,
        backgroundColor: Colors.defaultRed,
        borderRadius: ResponsivePixels.size20,
        alignItems: 'center',
        justifyContent:'center'
      },

      buttonText:{
        fontSize:ResponsivePixels.size14,
        color: Colors.defaultWhite,
      },
    subView:{
        flex: 1,
        width:'100%',
        backgroundColor:Colors.lightGray
    },
    rowView:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start'
    },
    columnView:{
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'flex-start',

    },
    eventView:{
        flex:1,
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        height:ResponsivePixels.size100,
        backgroundColor:Colors.defaultWhite,
        paddingHorizontal:ResponsivePixels.size10
    },
    eventName:{
        fontSize:ResponsivePixels.size14,
        color:Colors.defaultBlack
    },
    eventTime:{
        fontSize:ResponsivePixels.size12,
        color:Colors.defaultBlack
    },
    lineView:{
        height:ResponsivePixels.size2,
        backgroundColor:Colors.darkGray
    },
    dateView:{
        position:'absolute',
        bottom:0,
        right:0,
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:ResponsivePixels.size5,
        marginVertical:ResponsivePixels.size5,
    },
    headerImage:{
        height:ResponsivePixels.size18,
        width:ResponsivePixels.size18,
        tintColor:Colors.defaultBlack
    },
    headerView:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        height:ResponsivePixels.size50,
        width:'100%',
        backgroundColor:Colors.defaultWhite,
        elevation:15,
        paddingHorizontal:ResponsivePixels.size10
    },
    headerTitle:{
        fontSize:ResponsivePixels.size18,
        color:Colors.defaultBlack,
        fontWeight:'bold'
    },
    circleView:{
        height:ResponsivePixels.size60,
        width:ResponsivePixels.size60,
        borderRadius:ResponsivePixels.size40,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:Colors.defaultGray
    },
    initialText:{
        fontSize:ResponsivePixels.size28,
        color:Colors.defaultWhite,
    }
});

export default Notification;
