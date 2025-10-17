import { useEffect, useState, useRef } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, TextInput, Image, Alert, Modal, Pressable, Dimensions, Settings, ScrollView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { PieChart, BarChart } from 'react-native-chart-kit';
import { db } from './config'
import Icons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Picker } from '@react-native-picker/picker';

const { width, height } = Dimensions.get('window')

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const MyTabs = ({route}) => {
    const userData = route.params?.userData
    return(
            <Tab.Navigator initialRouteName="Home" screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;

                    if(route.name === 'Home'){
                        iconName = focused ? 'home' : 'home-outline'
                    }else if(route.name === 'Settings'){
                        iconName = focused ? 'settings' : 'settings-outline'
                    }
                    else if(route.name === 'Add Expenses'){
                        iconName = focused ? 'add' : 'add-outline'
                    }

                    return <Icons name={iconName} size={size} color={color}/>;
                },
                tabBarActiveTintColor: "tomato",
                tabBarInactiveTintColor: "gray",
            })}>
                <Tab.Screen name="Settings" component={SettingsPage} options={{  title:"Settings" }} initialParams={{userData}}/>
                <Tab.Screen name="Home" component={Home} options={{  title:"Home" }} initialParams={{userData}}/>
                <Tab.Screen name="Add Expenses" component={Add} options={{  title:"Add Expenses" }} initialParams={{userData}}/>
            </Tab.Navigator>
    )
}
const SettingsPage = () => {
    return(
        <View>
            <Text>Hi</Text>
        </View>
    )
}

const Add = ({route}) => {
    const [selectedValue, setSelectedValue] = useState('0');
    const [selectedType, setSelectedType] = useState('0');
    const [amount, setAmount] = useState(0);
    const [type, setType] = useState('0');
    const [data, setData] = useState({
        categories:[]
    })

    const addRecord = async() => {
        if(selectedType == 'Additional'){
            const dosc = doc(db, "FinalProject", data.userName)
            await setDoc(docs, {
                ...data,
                additions: Number(data.additions) + Number(amount)
            })
        }else if(selectedType == 'Essentials'){
            const docs = doc(db, "FinalProject", data.userName)
            await setDoc(docs, {
                ...data,
                essentials: Number(data.essentials) + Number(amount)
            })
        }
    }

    const addCategory = async() => {
        const docs = doc(db, "FinalProject", data.userName)
        await setDoc(docs,{
            ...data,
            categories:[...data.categories, type]
        })

        const docSnap = await getDoc(docs)
        setData(docSnap.data())
    }

    useEffect(()=>{
        if(route.params?.userData){
            setData(route.params.userData)
        }
    },[route.params?.userData])
    return(
        <View style={styles.main}>
            <View style={styles.header}>
                <Text style={styles.welcomeText}>Add your expenses</Text>
            </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginBottom: 20,
                marginTop: 10,
            }}>
                <Picker style={{ height: 50, width: 150}} 
                selectedValue={selectedValue}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                >
                <Picker.Item label="Choose or Add new type" value="0" />
                {data.categories.map((item, index) => {
                        return <Picker.Item key={index} label={item} value={item} />
                    })}
                </Picker>
                <TextInput placeholder="Amount" value={amount} onChangeText={setAmount} keyboardType="numeric"></TextInput>
                <Picker
                    selectedValue={selectedType}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(itemValue, itemIndex) => setSelectedType(itemValue)}
                >
                    <Picker.Item label="Choose expense type" value="0" />
                    <Picker.Item label="Additional" value="Additional" />
                    <Picker.Item label="Essentials" value="Essentials" />
                </Picker>
            </View>
            <View style={styles.buutonContainer}>
            <TouchableOpacity style={styles.button} onPress={()=>{addRecord()}}>
                    <Icons name="add" size={30} color="black" />
                </TouchableOpacity>
            </View>
            <View style={[styles.main, {marginTop:30}]}>
                <Text style={styles.welcomeText}>Add your own Type</Text>
                <View>
                <TextInput placeholder="Type" value={type} onChangeText={setType}></TextInput>
                </View>
                <View style={styles.buutonContainer}>
                <TouchableOpacity style={styles.button} onPress={()=>{addCategory()}}>
                    <Icons name="add" size={30} color="black" />
                </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const Home = ({ navigation, route }) => {
    const [data, setData] = useState({
        userName: '',
        income: 0,
        saving: 0,
        budget: 0,
        essentials: 0,
        additions: 0,
        status: 'No Data Available'
    })
    const incomeData = [{
        name: 'Income',
        amount: 5000,
        color: 'blue',
        legendFontColor: 'black',
        legendFontSize: 15,
    }, {
        name: 'Budget',
        amount: 1000,
        color: 'red',
        legendFontColor: 'black',
        legendFontSize: 15,
    }]

    const savingData = {
        labels: ['Saving', 'Spent'],
        datasets: [
            {
                data: [200, 150]
            }
        ]
    }
    useEffect(() => {
        if (route.params?.userData) {
            setData(route.params.userData)
        }
    }, [route.params?.userData])
    return (
        <ScrollView style={styles.main}>
            <View style={styles.header}>
                <Text style={styles.welcomeText}>Welcome {data.userName}</Text>
            </View>
            <View style={styles.cardsContainer}>
                <TouchableOpacity style={[styles.card, { width: width / 1.2 }]}>
                    <Text style={styles.cardTitle}>Income / Budget</Text>
                    <Text>{data.income} QAR / {data.budget} QAR</Text>
                    <PieChart
                        data={incomeData}
                        width={width / 1.5}
                        height={height / 10}
                        chartConfig={{
                            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                        }}
                        accessor="amount"
                        backgroundColor="transparent"
                        paddingLeft="0"
                        style={{ marginTop: 5 }}
                        hasLegend={true}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.cardsContainer}>
                <TouchableOpacity style={[styles.card, { width: width / 1.2 }]}>
                    <Text style={styles.cardTitle}>Savings: 0 QAR</Text>
                    <BarChart
                        data={savingData}
                        width={width / 1.5}
                        height={height / 8}
                        chartConfig={{
                            backgroundColor: '#fff',
                            backgroundGradientFrom: '#fff',
                            backgroundGradientTo: '#fff',
                            color: (opacity = 1) => `rgba(65, 157, 232, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            barPercentage: 0.5,
                        }}
                        fromZero={true}
                        verticalLabelRotation={0}
                        showValuesOnTopOfBars={true}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.cardsContainer}>
                <TouchableOpacity style={styles.card}>
                    <Text style={styles.cardTitle}>Essentials</Text>
                    <Text>{data.essentials} QAR</Text>
                    <Text style={styles.cardTitle}>Additions</Text>
                    <Text>{data.additions} QAR</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.card]}>
                    <Text style={styles.cardTitle}>Status</Text>
                    <Text>{data.status}</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    header: {
        marginBottom: 50,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
    },
    cardsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
        marginTop: 10,
    },
    card: {
        width: width / 2.2,
        height: height / 5,
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: { height: 10, width: 0 },
        elevation: 5,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
    buutonContainer:{
        alignItems: 'center'
    },
    button:{
        width: width / 2,
        height: height / 15,
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: { height: 10, width: 0 },
        elevation: 5,
    }
})

export default MyTabs;