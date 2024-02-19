import React, {useState} from "react";
import {FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {ResponsivePixels} from "../../res/styles/ResponsivePixels";
import {Colors} from "../../res/styles/Colors";
import Images from "../../components/Images";
import {DAYS_IN_WEEK} from "../../utils/Utils";
import {HeaderView} from "../../components/HeaderView";
import Strings from "../../stores/Language/Strings";
import CustomModal from "../../components/CustomModal";
import {Calendar} from "react-native-calendars";
import {CONTENT_TOUCHES_DELAY} from "react-native-gesture-handler/lib/typescript/web_hammer/constants";
import {navigationConstants} from "../../constants/NavigationConstant";

const Home = (props:any) => {
    const eventList=[
        {
            name:'Meeting for Business',
            startTime:'7:35',
            endTime:'8:30',
            numberOfPeople:2,
            date: 1708155153000
        },
        {
            name:'Meeting for Business',
            startTime:'7:35',
            endTime:'8:30',
            numberOfPeople:2,
            date: 1708443194000
        }
    ]
    const today = new Date();
    const minDate = today.toISOString().split('T')[0];

    const [currentDate, setCurrentDate] = useState('');

    const [showFilterModal,setShowFilterModal]= useState(false)
    const [showNewEventModal,setShowNewEventModal]= useState(false)
    const [showCalenderModal,setShowCalenderModal]= useState(false)
    const [newEventName,setNewEventName]= useState('')
    const [newEventNote,setNewEventNote]= useState('')
    const [searchPeople,setSearchPeople]= useState('')


    const getDayAndDateFromTimeStamp=(timeStamp:number)=>{
        let date = new Date(timeStamp)
        let day = date.getDay();
        let onlyDate = date.getDate();
        return {date:onlyDate,day:DAYS_IN_WEEK[day]}

    }

    const handleDateChange=(timeStamp:any)=>{
        const date = new Date(timeStamp);
        console.log("date ==== > ",date)
        const formattedDate = date.toISOString().split('T')[0];
        console.log("formattedDate ==== > ",formattedDate)
        setCurrentDate(formattedDate);
        handleCalenderModal()
    }

    const handleFilterModal=()=>{
        setShowFilterModal(!showFilterModal)
    }

    const handleNewEventName=(text:any)=>{
        setNewEventName(text)
    }

    const handleNewEventNote=(text:any)=>{
        setNewEventNote(text)
    }

    const handleSearchPeople=(text:any)=>{
        setSearchPeople(text)
    }

    const handleNewEventModal=()=>{
        setShowNewEventModal(!showNewEventModal)
    }

    const handleCalenderModal=()=>{

        setShowCalenderModal(!showCalenderModal)
    }

    const handleHistoryClick=()=>{
        props.navigation.navigate(navigationConstants.HISTORY)
    }


    const  renderEvents=({item,index}:{item:any,index:number})=>{
        let dateObject = getDayAndDateFromTimeStamp(item.date)
        return(
            <View style={[styles.rowView,{marginVertical:ResponsivePixels.size5,alignItems:'flex-start'}]}>
                <View style={[styles.columnView,{marginLeft:ResponsivePixels.size10}]}>
                <Text style={styles.dayTitle}>{dateObject.day}</Text>
                <TouchableOpacity style={styles.dateViewBg} onPress={()=>{
                    handleDateChange(item.date);
                }}>
                    <Text style={styles.dateText}>{dateObject.date}</Text>
                </TouchableOpacity>
                </View>
                <View style={styles.eventView}>
                    <View style={[styles.columnView,{alignItems:'flex-start'}]}>
                        <Text style={styles.eventName}>{item.name}</Text>
                        <Text style={styles.eventTime}>{item.startTime} - {item.endTime} P.M</Text>
                    </View>
                    <View style={styles.rowView}>
                        <Image source={Images.ic_user} style={styles.eventImage}/>
                        <Text style={[styles.eventName,{marginLeft:ResponsivePixels.size5,color:Colors.skyBlue}]}>{item.numberOfPeople}</Text>
                    </View>
                </View>
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.mainContainer}>
            <HeaderView/>
            <View style={styles.headerView}>
                <TouchableOpacity onPress={handleFilterModal}>
                <Image source={Images.ic_filter} style={styles.headerImage}/>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{Strings.home}</Text>
                <View style={styles.rowView}>
                    <Image source={Images.ic_notification} style={styles.headerImage}/>
                    <TouchableOpacity onPress={handleHistoryClick}>
                    <Image source={Images.ic_history} style={[styles.headerImage,{marginLeft:ResponsivePixels.size5}]}/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.subView}>
            <View style={styles.rowView}>
                <View style={styles.smallLineView}/>
                <Text style={styles.headerTitle}>{Strings.upcomming}</Text>
            </View>
                <FlatList data={eventList} renderItem={renderEvents}/>
            </View>
            <TouchableOpacity style={styles.addEvent} onPress={handleNewEventModal}>
                <Image source={Images.ic_plus} style={styles.addEventImage}/>
            </TouchableOpacity>
            <CustomModal showModal={showFilterModal} hideModel={()=>setShowFilterModal(false)}>
                <View style={styles.filterMain}>
                <View style={styles.filterHeaderView}>
                    <Text style={[styles.eventName,{fontWeight:'500'}]}>{Strings.filter}</Text>
                    <TouchableOpacity onPress={handleFilterModal}>
                    <Text style={[styles.eventName,{fontWeight:'bold',color:Colors.royalBlue}]}>{Strings.apply}</Text>
                    </TouchableOpacity>
                </View>
                    <View style={styles.lineView}/>
                    <View style={[styles.filterHeaderView,{justifyContent:'center'}]}>
                        <View style={styles.columnView}>
                            <Text style={styles.dayTitle}>{Strings.startDate}</Text>
                            <View style={styles.filterDateView}>
                                <Text style={styles.dayTitle}>Sat, 24 Dec 2023</Text>
                            </View>
                        </View>
                        <View style={styles.dashLine}/>
                        <View style={styles.columnView}>
                            <Text style={styles.dayTitle}>{Strings.endDate}</Text>
                            <View style={styles.filterDateView}>
                                <Text style={styles.dayTitle}>Sat, 24 Dec 2023</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </CustomModal>
            <CustomModal showModal={showNewEventModal} hideModel={()=>setShowNewEventModal(false)}>
                <View style={styles.filterMain}>
                <View style={[styles.filterHeaderView,{marginHorizontal:ResponsivePixels.size10,marginTop:ResponsivePixels.size10}]}>
                    <TouchableOpacity onPress={handleNewEventModal}>
                        <Image source={Images.ic_cross} style={styles.headerImage}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.createEvent} onPress={handleNewEventModal}>
                    <Text style={[styles.eventName,{fontWeight:'bold',color:Colors.defaultWhite}]}>{Strings.create}</Text>
                    </TouchableOpacity>
                </View>
                    <TextInput
                        style={styles.textInput}
                        placeholderTextColor={Colors.lightPink}
                        placeholder={Strings.addTitle}
                        value={newEventName}
                        onChangeText={text => handleNewEventName(text)}
                    />
                    <View style={[styles.lineView,{backgroundColor:Colors.lightPink}]}/>

                    <View style={[styles.filterHeaderView]}>
                        <View style={[styles.rowView]}>
                            <Image source={Images.ic_clock} style={styles.headerImage}/>
                            <Text style={[styles.dayTitle,{marginLeft:ResponsivePixels.size5}]}>{Strings.allDay}</Text>
                        </View>
                        <View style={styles.smallCircle}/>
                    </View>
                    <View style={[styles.rowView,{justifyContent:'space-between',marginHorizontal:ResponsivePixels.size10}]}>
                        <View style={styles.filterDateView}>
                            <Text style={styles.dayTitle}>Sat, 24 Dec 2023</Text>
                        </View>
                        <View style={styles.filterDateView}>
                            <Text style={styles.dayTitle}>12:30 Pm</Text>
                        </View>
                    </View>
                    <View style={styles.dashLineHorizontal}/>
                    <View style={[styles.rowView,{justifyContent:'space-between',marginHorizontal:ResponsivePixels.size10}]}>
                        <View style={styles.filterDateView}>
                            <Text style={styles.dayTitle}>Sat, 24 Dec 2023</Text>
                        </View>
                        <View style={styles.filterDateView}>
                            <Text style={styles.dayTitle}>12:30 Pm</Text>
                        </View>
                    </View>
                    <View style={[styles.lineView,{backgroundColor:Colors.lightPink,marginVertical:ResponsivePixels.size10}]}/>
                    <View>
                    <View style={[styles.filterHeaderView]}>
                        <View style={[styles.rowView]}>
                            <Image source={Images.ic_left_menu} style={styles.headerImage}/>
                            <Text style={[styles.dayTitle,{marginLeft:ResponsivePixels.size5}]}>{Strings.addNote}</Text>
                        </View>
                    </View>
                        <TextInput  value={newEventNote} onChangeText={(text)=>handleNewEventNote(text)} style={styles.noteText}/>
                    </View>
                    <View>
                        <View style={[styles.filterHeaderView]}>
                            <View style={[styles.rowView]}>
                                <Image source={Images.ic_add_people} style={styles.headerImage}/>
                                <Text style={[styles.dayTitle,{marginLeft:ResponsivePixels.size5}]}>{Strings.addPeople}</Text>
                            </View>
                        </View>
                        <TextInput placeholder={Strings.searchPeople}  value={searchPeople} onChangeText={(text)=>handleSearchPeople(text)} style={styles.searchText}/>
                    </View>
                </View>
            </CustomModal>
            <CustomModal showModal={showCalenderModal} hideModel={()=>setShowCalenderModal(false)}>
                <View style={{ width: '90%' ,backgroundColor:'red'}}>
                <Calendar
                    minDate={minDate}
                    markedDates={{
                        [currentDate]: {
                            selected: true,
                            selectedColor: Colors.royalBlue,
                        }
                    }}
                    onDayPress={(day) => {
                        setCurrentDate(day.dateString);
                    }}
                />
                </View>
            </CustomModal>
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
    subView:{
        flex: 1,
        width:'100%',
        marginVertical:ResponsivePixels.size5,
        backgroundColor:Colors.lightGray
    },
    loginText:{
        fontSize:ResponsivePixels.size18,
        color:Colors.defaultWhite,
        fontWeight:'bold'
    },
    rowView:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start'
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
    headerImage:{
        height:ResponsivePixels.size18,
        width:ResponsivePixels.size18,
        tintColor:Colors.defaultBlack
    },
    headerTitle:{
        fontSize:ResponsivePixels.size18,
        color:Colors.defaultBlack,
        fontWeight:'bold'
    },
    smallLineView:{
        height:ResponsivePixels.size18,
        width:ResponsivePixels.size3,
        borderRadius:ResponsivePixels.size3,
        backgroundColor:Colors.royalBlue,
        marginHorizontal:ResponsivePixels.size5
    },
    dateViewBg:{
        height:ResponsivePixels.size30,
        width:ResponsivePixels.size30,
        backgroundColor:Colors.royalBlue,
        borderRadius:ResponsivePixels.size15,
        justifyContent:'center',
        alignItems:'center'
    },
    dateText:{
        color:Colors.defaultWhite,
        fontWeight:'bold',
        fontSize:ResponsivePixels.size14
    },
    dayTitle:{
        color:Colors.defaultBlack,
        fontSize:ResponsivePixels.size14
    },
    columnView:{
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'flex-start',
    },
    eventView:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        height:ResponsivePixels.size60,
        backgroundColor:Colors.defaultWhite,
        borderRadius:ResponsivePixels.size15,
        marginHorizontal:ResponsivePixels.size10,
        paddingHorizontal:ResponsivePixels.size10
    },
    eventName:{
        fontSize:ResponsivePixels.size18,
        color:Colors.defaultBlack
    },
    eventTime:{
        fontSize:ResponsivePixels.size12,
        color:Colors.defaultGray
    },
    eventImage:{
        height:ResponsivePixels.size18,
        width:ResponsivePixels.size18,
        tintColor:Colors.skyBlue
    },
    filterHeaderView:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:ResponsivePixels.size10,
        paddingVertical:ResponsivePixels.size10
    },
    filterMain:{
        width:'100%',
    },
    lineView:{
        height:ResponsivePixels.size2,
        backgroundColor:Colors.darkGray
    },
    filterDateView:{
        borderRadius:ResponsivePixels.size20,
        paddingHorizontal:ResponsivePixels.size10,
        paddingVertical:ResponsivePixels.size5,
        elevation:5,
        backgroundColor:Colors.defaultWhite,
        alignItems:'center',
        justifyContent:'center',
        marginVertical:ResponsivePixels.size10
    },
    dashLine:{
        height:ResponsivePixels.size1,
        width:ResponsivePixels.size50,
        borderStyle:'dashed',
        borderWidth:ResponsivePixels.size2,
        borderColor:Colors.defaultBlack,
        marginTop:ResponsivePixels.size20
    },
    addEvent:{
        position:'absolute',
        right:0,
        bottom:0,
        height:ResponsivePixels.size60,
        width:ResponsivePixels.size60,
        borderRadius:ResponsivePixels.size30,
        backgroundColor:Colors.royalBlue,
        alignItems:'center',
        justifyContent:'center',
        marginHorizontal:ResponsivePixels.size20,
        marginVertical:ResponsivePixels.size20,
    },
    addEventImage:{
        height:ResponsivePixels.size30,
        width:ResponsivePixels.size30,
        tintColor:Colors.defaultWhite
    },
    createEvent:{
        borderRadius:ResponsivePixels.size20,
        paddingVertical:ResponsivePixels.size5,
        paddingHorizontal:ResponsivePixels.size10,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:Colors.royalBlue
    },
    textInput:{
        fontSize: ResponsivePixels.size20,
        color: Colors.defaultBlack,
        marginLeft:ResponsivePixels.size10,
    },
    smallCircle:{
        height:ResponsivePixels.size20,
        width:ResponsivePixels.size20,
        borderRadius:ResponsivePixels.size10,
        borderWidth:ResponsivePixels.size2,
        borderColor:Colors.defaultGray
    },
    dashLineHorizontal:{
        height:ResponsivePixels.size50,
        width:ResponsivePixels.size1,
        borderStyle:'dashed',
        borderWidth:ResponsivePixels.size2,
        borderColor:Colors.defaultBlack,
        marginHorizontal:ResponsivePixels.size50,
        borderRadius:ResponsivePixels.size25
    },
    noteText:{
        borderRadius:ResponsivePixels.size10,
        borderWidth:ResponsivePixels.size1,
        borderColor:Colors.royalBlue,
        marginHorizontal:ResponsivePixels.size20
    },
    searchText:{
        borderRadius:ResponsivePixels.size10,
        backgroundColor:Colors.defaultWhite,
        marginHorizontal:ResponsivePixels.size20,
        marginBottom:ResponsivePixels.size20,
        elevation:5,
        fontSize:ResponsivePixels.size14,
        paddingHorizontal:ResponsivePixels.size10,
        color:Colors.defaultBlack
    }
});

export default Home;
