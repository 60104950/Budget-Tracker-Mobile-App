import { useEffect, useState, useRef } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, TextInput, Image, Alert, Modal, Pressable, Dimensions, Settings } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {doc, setDoc, getDoc} from 'firebase/firestore'
import {db} from './config'
import MyTabs from './Home'

const { width, height } = Dimensions.get('window')

const Stack = createNativeStackNavigator()

const LoginPage = ({navigation, route}) => {
    const [userName, setUserName] = useState()
    const [password, setPassword] = useState()
    const [email, setEmail] = useState()
    const [state, setState] = useState('Login')
    const data = useRef([])
    useEffect(() => {
        console.log(state)
    }, [state])

    const addUser = async () => {
        try {
            const docs = doc(db, "FinalProject", userName)
            const docSnap = await getDoc(docs)
            if(docSnap.exists()){
                Alert.alert('User already exists')
                return
            }

            await setDoc(docs,{
                userName: userName,
                password: password,
                email: email,
                income: 0,
                saving: 0,
                budget: 0,
                essentials:0,
                additions:0,
                categories:["food", "rent", "utilities", "transportation", "health", "insurance", "personal", "entertainment"],
                Settings:{},
                time: new Date(),
                status: 'No Data Available'
            })
            console.log('User added')
        }
        catch (e) {
            console.log(e)
        }
    }

    const login = async () => {
        try {
            const docSnap = await getDoc(doc(db, "FinalProject", userName))
            if (docSnap.exists()) {
                if (docSnap.data().password == password) {
                    console.log(docSnap.data())
                    console.log('Logged in')
                    data.current = docSnap.data()
                    navigation.navigate("MyTabs", {userData:data.current})
                }
                else {
                    Alert.alert('Invalid Password')
                }
            }
            else {
                Alert.alert('Invalid User Name')
            }
        }
        catch (e) {
            console.log(e)
        }
    }

    if (state == 'Login') {
        return (
            <LinearGradient
                colors={['#d8c3fc', '#ccc4fd', '#afc2fc', '#9dc4fb']}
                style={styles.main}
                start={{ x: 0.8, y: 0.2 }}
                end={{ x: 0.3, y: 0.8 }}
            >
                <View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Login</Text>
                    </View>
                    <View style={styles.loginContainer}>
                        <View>
                            <TextInput placeholder="User Name" style={styles.textInput} value={userName} onChangeText={setUserName}></TextInput>
                            <TextInput secureTextEntry={true} placeholder="Password" style={styles.textInput} value={password} onChangeText={setPassword}></TextInput>
                        </View>
                        <View>
                            <TouchableOpacity style={styles.loginButtonContainer} onPress={()=> {login()}}>
                                <Text style={{fontSize: 15, fontWeight: 'bold', color:"white"}}>Login</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setState('Register')}>
                                <Text>Don’t have an account? <Text style={{ color: "darkblue" }}>Register</Text></Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </LinearGradient>
        )
    }
    return (
        <LinearGradient
            colors={['#d8c3fc', '#ccc4fd', '#afc2fc', '#9dc4fb']}
            style={styles.main}
            start={{ x: 0.8, y: 0.2 }}
            end={{ x: 0.3, y: 0.8 }}
        >
            <View>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Register</Text>
                </View>
                <View style={styles.loginContainer}>
                    <View>
                        <TextInput placeholder="User Name" style={styles.textInput} value={userName} onChangeText={setUserName}></TextInput>
                        <TextInput placeholder="Email" style={styles.textInput} value={email} onChangeText={setEmail}></TextInput>
                        <TextInput secureTextEntry={true} placeholder="Password" style={styles.textInput} value={password} onChangeText={setPassword}></TextInput>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.loginButtonContainer} onPress={() => {setState('Login'), addUser()}}>
                            <Text>Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </LinearGradient>
    )
}

export default Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginPage} options={{  headerShown: false }} />
                <Stack.Screen name="MyTabs" component={MyTabs} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}


const styles = StyleSheet.create({
    main: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    textInput: {
        width: width * 0.8,
        height: height * 0.05,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'white',
        borderRadius: 30,
        margin: 10,
        padding: 10
    },
    loginContainer: {
        alignItems: 'center'
    },
    loginButtonContainer: {
        flexDirection: 'row',
        backgroundColor: '#858cd6',
        borderRadius: 30,
        marginTop: 20,
        padding: 10,
        justifyContent: 'center',
        width: width * 0.6,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 5
    },
    titleContainer:{
        alignItems: 'center',
        marginBottom: 20
    }
})
