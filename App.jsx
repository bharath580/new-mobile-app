import {View, Text, ScrollView, TouchableOpacity, Image, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
// import {createNativeStackNavigator} from '@react-navigation/stack';
// Only import react-native-gesture-handler on native platforms
import 'react-native-gesture-handler';


import Icon from 'react-native-vector-icons/Ionicons';
import {NavigationContainer} from '@react-navigation/native';
import Home from './screens/Home';
import {createStackNavigator} from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';


import {Provider, useDispatch, useSelector} from 'react-redux';
import {store} from './Store/store';


import AsyncStorage from '@react-native-async-storage/async-storage';
import { Logout } from './features/auth/authSlice';



import BuyerSign from './screens/buyer/BuyerSign';
import Login from './screens/login/Login';
import SupplierList from './screens/supplier/SupplierList';
import BuyerList from './screens/buyer/BuyerList';
import PurchaseList from './screens/purchase/PurchaseList';
import NewPurchase from './screens/purchase/NewPurchase';
import Material from './screens/purchase/Material';
import PurchaseConfirm from './screens/purchase/PurchaseConfirm';
import Batch from './screens/batch/Batch';
import NewBatch from './screens/batch/NewBatch';
import BatchDetail from './screens/batch/BatchDetail';
import PurchaseSignatory from './screens/purchase/PurchaseSignatory';
import Segregation from './screens/segregation/Segregation';
import SegregationDetail from './screens/segregation/SegregationDetail';
import Bale from './screens/bale/Bale';
import NewBale from './screens/bale/NewBale';
import BaleMaterial from './screens/bale/BaleMaterial';
import BalingQuantity from './screens/bale/BalingQuantity';
import OperatorSign from './screens/bale/OperatorSign';
import SupervisorSign from './screens/bale/SupervisorSign';
import BaleDetail from './screens/bale/BaleDetail';
import Sale from './screens/sale/Sale';
import NewSale from './screens/sale/NewSale';
import SalesReceipt from './screens/sale/SalesReceipt';
import SaleDetail from './screens/sale/SaleDetail';
import NewSupplier from './screens/supplier/NewSupplier';
import CameraScreen from './screens/supplier/CameraScreen';
import SalesSignatory from './screens/sale/SalesSignatory';
import SupplierSign from './screens/supplier/SupplierSign';
import SupplierDetail from './screens/supplier/SupplierDetail';
import NewBuyer from './screens/buyer/NewBuyer';
import BuyerDetail from './screens/buyer/BuyerDetail';
import SaleMaterial from './screens/sale/SaleMaterial';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const CustomDrawerContent = ({navigation, logout}) => (
  <DrawerContentScrollView>
    <DrawerItem label="Home" onPress={() => navigation.navigate('Home')} />
    <DrawerItem
      label="Supplier"
      onPress={() => navigation.navigate('SupplierList')}
    />
    <DrawerItem label="Buyer" onPress={() => navigation.navigate('Buyer')} />
    <DrawerItem label="Logout" onPress={logout} />
  </DrawerContentScrollView>
);
const HomeDrawer = ({navigation, logout}) => (
  <Drawer.Navigator
    screenOptions={{
      headerStyle: {backgroundColor: '#808080'}, // Gray background
      headerTintColor: '#fff', // White text for contrast
      headerTitleStyle: {fontWeight: 'bold'}, // Optional: Bold title
    }}
    drawerContent={props => <CustomDrawerContent {...props} logout={logout} />}>
    <Drawer.Screen name="Home" component={Home} />
    <Drawer.Screen
      name="SupplierList"
      component={SupplierList}
      options={{title: 'Supplier'}}
    />
    <Drawer.Screen name="Buyer" component={BuyerList} />
  </Drawer.Navigator>
);
export default function App() {
  const {user} = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const [isAuthenticated, setIsAuthenticated] = useState(user);
  console.log('user',user)
  console.log('isAuthenticated', isAuthenticated);
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        console.log('userData', userData);
        if (userData) {
          const user = JSON.parse(userData);
          if (user[0]?.access_token) {
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      } finally {
        // Ensure the loading state is set to false
      }
    };
    checkAuthentication();
  }, []);

  const logout = () => {
    Alert.alert(
      "Logout Confirmation",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", onPress: () => console.log("Logout canceled"), style: "cancel" },
        {
          text: "Logout",
          onPress: async () => {
            try {
              dispatch(Logout());
            } catch (error) {
              console.error("Error during logout:", error);
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
 
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {backgroundColor: '#808080'}, // Gray background
            headerTintColor: '#fff', // White text for contrast
            headerTitleStyle: {fontWeight: 'bold'}, // Optional: Bold title
          }}>
          {user ? (
            <>
              <Stack.Screen name="HomeDrawer" options={{headerShown: false}}>
                {props => <HomeDrawer {...props} logout={logout} />}
              </Stack.Screen>
              <Stack.Screen name="Purchase" component={PurchaseList} />
              {/* <Stack.Screen name="PurchaseDetail" component={PurchaseDetail} /> */}
              <Stack.Screen
                name="NewPurchase"
                component={NewPurchase}
                options={{title: 'New Purchase Order'}}
              />
              <Stack.Screen
                name="PurchaseMaterial"
                component={Material}
                options={{title: 'New Purchase Order'}}
              />
              <Stack.Screen
                name="PurchaseConfirm"
                component={PurchaseConfirm}
                options={{title: 'Confirm Purchase'}}
              />
              <Stack.Screen
                name="Batch"
                component={Batch}
                options={{title: 'Batch'}}
              />
              <Stack.Screen
                name="NewBatch"
                component={NewBatch}
                options={{title: 'New Batch'}}
              />
              <Stack.Screen
                name="BatchDetail"
                component={BatchDetail}
                options={{title: 'Batch Detail'}}
              />
              <Stack.Screen
                name="PurchaseSignatory"
                component={PurchaseSignatory}
                options={{title: 'Signature'}}
              />
              <Stack.Screen
                name="Segregation"
                component={Segregation}
                options={{title: 'Segregation'}}
              />
              <Stack.Screen
                name="SegregationDetail"
                component={SegregationDetail}
                options={{title: 'Segregation Detail'}}
              />
              <Stack.Screen
                name="BaleList"
                component={Bale}
                options={{title: 'Bale List'}}
              />
              <Stack.Screen
                name="NewBale"
                component={NewBale}
                options={{title: 'New Bale'}}
              />
              <Stack.Screen
                name="BaleMaterial"
                component={BaleMaterial}
                options={{title: 'Baling'}}
              />
              <Stack.Screen
                name="BalingQuantity"
                component={BalingQuantity}
                options={{title: 'Baling'}}
              />
              <Stack.Screen
                name="OperatorSign"
                component={OperatorSign}
                options={{title: 'Operator Signature'}}
              />
              <Stack.Screen
                name="SupervisorSign"
                component={SupervisorSign}
                options={{title: 'Supervisor Signature'}}
              />
              <Stack.Screen
                name="BaleDetail"
                component={BaleDetail}
                options={{title: 'Bale Detail'}}
              />
              <Stack.Screen
                name="SaleList"
                component={Sale}
                options={{title: 'Sale List'}}
              />
              <Stack.Screen
                name="NewSale"
                component={NewSale}
                options={{title: 'New Sale'}}
              />
              <Stack.Screen
                name="SaleMaterial"
                component={SaleMaterial}
                options={{title: 'New Sale'}}
              />
              <Stack.Screen
                name="SalesReceipt"
                component={SalesReceipt}
                options={{title: 'Sales Receipt'}}
              />
              <Stack.Screen
                name="SalesDetail"
                component={SaleDetail}
                options={{title: 'Sales Detail'}}
              />
              <Stack.Screen
                name="NewSupplier"
                component={NewSupplier}
                options={{title: 'New Supplier'}}
              />
              <Stack.Screen name="Camera" component={CameraScreen} />
              <Stack.Screen
                name="SalesSignatory"
                component={SalesSignatory}
                options={{title: 'Signature'}}
              />
              <Stack.Screen
                name="SupplierSign"
                component={SupplierSign}
                options={{title: 'Supplier Signature'}}
              />
              <Stack.Screen
                name="SupplierDetail"
                component={SupplierDetail}
                options={{title: 'Supplier Profile'}}
              />
              <Stack.Screen
                name="NewBuyer"
                component={NewBuyer}
                options={{title: 'New Buyer'}}
              />
              <Stack.Screen
                name="BuyerSign"
                component={BuyerSign}
                options={{title: 'Buyer Signature'}}
              />
              <Stack.Screen
                name="BuyerDetail"
                component={BuyerDetail}
                options={{title: 'Buyer Profile'}}
              />
            </>
          ) : (
          <>  
          <Stack.Screen
              name="login"
              component={Login}
              options={{title: 'Login'}}
            />
</>
          )}
        </Stack.Navigator>
      </NavigationContainer>
 
  );
}
