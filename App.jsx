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
import PurchaseConfirm from './screens/purchase/PurchaseConfirm';
import PurchaseSignatory from './screens/purchase/PurchaseSignatory';
import { Provider } from 'react-redux';
import { store } from './Store/store';
import Batch from './screens/batch/Batch';
import NewBatch from './screens/batch/NewBatch';
import BatchDetail from './screens/batch/BatchDetail';
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
import SaleMaterial from './screens/sale/Material';
import SalesReceipt from './screens/sale/SalesReceipt';
import SalesSignatory from './screens/sale/SalesSignatory';
import SaleDetail from './screens/sale/SaleDetail';
import NewSupplier from './screens/supplier/NewSupplier';
import CameraScreen from './screens/supplier/CameraScreen';
import SupplierSign from './screens/supplier/SupplierSign';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const HomeDrawer = ({navigation}) => (
  <Drawer.Navigator  screenOptions={{
    headerStyle: { backgroundColor: '#808080' }, // Gray background
    headerTintColor: '#fff', // White text for contrast
    headerTitleStyle: { fontWeight: 'bold' }, // Optional: Bold title
  }}>
    <Drawer.Screen name="Home" component={Home} />
    <Stack.Screen name="SupplierList" component={SupplierList} options={{title:'Supplier'}}/>
    <Drawer.Screen name="Buyer" component={Demo} />
  </Drawer.Navigator>
);
export default function App() {
  
  return (
    <Provider store={store}>
   <NavigationContainer>
    <Stack.Navigator  screenOptions={{
        headerStyle: { backgroundColor: '#808080' }, // Gray background
        headerTintColor: '#fff', // White text for contrast
        headerTitleStyle: { fontWeight: 'bold' }, // Optional: Bold title
      }}>
        <Stack.Screen name="HomeDrawer" component={HomeDrawer} options={{headerShown:false}}/>
        <Stack.Screen name="Purchase" component={PurchaseList}/>
        <Stack.Screen name="PurchaseDetail" component={PurchaseDetail}/>
        <Stack.Screen name="NewPurchase" component={NewPurchase} options={{title:'New Purchase Order'}}/>
        <Stack.Screen name="PurchaseMaterial" component={Material} options={{title:'New Purchase Order'}}/>
        <Stack.Screen name="PurchaseConfirm" component={PurchaseConfirm} options={{title:'Confirm Purchase'}}/>
        <Stack.Screen name="Batch" component={Batch} options={{title:'Batch'}}/>
        <Stack.Screen name="NewBatch" component={NewBatch} options={{title:'New Batch'}}/>
        <Stack.Screen name="BatchDetail" component={BatchDetail} options={{title:'Batch Detail'}}/>
        <Stack.Screen
            name="PurchaseSignatory"
            component={PurchaseSignatory}
            options={{title: 'Signature'}}
          />
        <Stack.Screen name="Segregation" component={Segregation} options={{title:'Segregation'}}/>
        <Stack.Screen
            name="SegregationDetail"
            component={SegregationDetail}
            options={{title: 'Segregation Detail'}}
            
          />
        <Stack.Screen name="BaleList" component={Bale} options={{title:'Bale List'}}/>
        <Stack.Screen name="NewBale" component={NewBale} options={{title:'New Bale'}}/>
        <Stack.Screen name="BaleMaterial" component={BaleMaterial} options={{title:'Baling'}}/>
        <Stack.Screen name="BalingQuantity" component={BalingQuantity} options={{title:'Baling'}}/>
        <Stack.Screen name="OperatorSign" component={OperatorSign} options={{title:'Operator Signature'}}/>
        <Stack.Screen name="SupervisorSign" component={SupervisorSign} options={{title:'Supervisor Signature'}}/>
        <Stack.Screen name="BaleDetail" component={BaleDetail} options={{title:'Bale Detail'}}/>
        <Stack.Screen name="SaleList" component={Sale} options={{title:'Sale List'}}/>
        <Stack.Screen name="NewSale" component={NewSale} options={{title:'New Sale'}}/>
        <Stack.Screen name="SaleMaterial" component={SaleMaterial} options={{title:'New Sale'}}/>
        <Stack.Screen name="SalesReceipt" component={SalesReceipt} options={{title:'Sales Receipt'}}/>
        <Stack.Screen name="SalesDetail" component={SaleDetail} options={{title:'Sales Detail'}}/>
        <Stack.Screen name="NewSupplier" component={NewSupplier} options={{title:'New Supplier'}}/>
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
    </Stack.Navigator>
   </NavigationContainer>
   </Provider>
  );
}
