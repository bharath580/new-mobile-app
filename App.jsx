import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
// import {createNativeStackNavigator} from '@react-navigation/stack';
// Only import react-native-gesture-handler on native platforms
import 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {NavigationContainer} from '@react-navigation/native';
import Home from './screens/Home';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Demo from './screens/Demo';
import PurchaseList from './screens/purchase/PurchaseList';
import SupplierList from './screens/supplier/SupplierList';
import PurchaseDetail from './screens/purchase/PurchaseDetail';
import NewPurchase from './screens/purchase/NewPurchase';
import Material from './screens/purchase/Material';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const HomeDrawer = ({navigation}) => (
  <Drawer.Navigator>
    <Drawer.Screen name="Home" component={Home} />
    <Stack.Screen name="SupplierList" component={SupplierList} options={{title:'Supplier'}}/>
    <Drawer.Screen name="Article" component={Demo} />
  </Drawer.Navigator>
);
export default function App() {
  
  return (
   <NavigationContainer>
    <Stack.Navigator>
        <Stack.Screen name="HomeDrawer" component={HomeDrawer} options={{headerShown:false}}/>
        <Stack.Screen name="Purchase" component={PurchaseList}/>
        <Stack.Screen name="PurchaseDetail" component={PurchaseDetail}/>
        <Stack.Screen name="NewPurchase" component={NewPurchase} options={{title:'New Purchase Order'}}/>
        <Stack.Screen name="PurchaseMaterial" component={Material} options={{title:'New Purchase Order'}}/>
    </Stack.Navigator>
   </NavigationContainer>
  );
}
