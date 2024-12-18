import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  LogBox,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthentication, login } from '../../features/auth/authSlice';
import Loader from '../Loader';


export default function Login({navigation}) {
//   const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user,isLoading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const { username, password } = formData;
  useEffect(()=>{
    dispatch(checkAuthentication())
  },[user])
  useEffect(() => {
    LogBox.ignoreAllLogs();
    if (user) {
      navigation.navigate('Home');
    }
  }, [user]);
  if(isLoading){
    return <Loader/>;
    
  }
  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const data = {
      user_name: username,
      user_password: password,
    };

    dispatch(login(data))
    .unwrap()
    .then(() => {
      // If login is successful, navigate to Home
      navigation.navigate('Home');
    })
    .catch((error) => {
      // If login fails, show an alert
      Alert.alert('Login Failed', error.message || 'Invalid credentials');
    });
    
    // navigation.navigate("Home"); // Navigate directly to Home if it's already part of the drawer


  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Login To Your Account</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>User Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="User Name"
            value={username}
            onChangeText={(value) => handleChange('username', value)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password:</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={(value) => handleChange('password', value)}
          />
        </View>

       

        <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
  },
  formContainer: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    color: '#555',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
  },
  forgotPassword: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    fontSize: 12,
    color: '#007bff',
  },
  loginButton: {
    marginTop: 20,
    backgroundColor: 'green',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  signupText: {
    fontSize: 14,
    color: '#007bff',
  },
});
