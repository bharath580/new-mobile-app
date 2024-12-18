import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getSupplierList} from '../../features/supplier/supplierSlice';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';
export default function SupplierList({navigation}) {
  const dispatch = useDispatch();
  const {supplierList} = useSelector(state => state.supplier);
  useFocusEffect(
    useCallback(() => {
      dispatch(getSupplierList());
      console.log('Supplier list refreshed');
    }, [dispatch])
  );
  console.log(supplierList);
  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('SupplierDetail', {id: item.supplier_id})}>
      <View className="border border-gray-300 h-28 flex-row  items-center">
        <View className="border-0  px-6">
          <Image
            resizeMode={'cover'}
            style={{
              width: 90,
              height: 90,
              borderRadius: 50,
              backgroundColor: '#ececec',
            }}
            source={{
              uri: `http://13.202.98.144:2000/${item.supplier_image}`,
            }}
          />
        </View>
        <View className="ml-2">
          <Text className="font-extrabold text-xl">{item.supplier_name}</Text>
          <Text>Supplier ID: {item.supplier_id}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  return (
    <View className='flex-1'>
      <FlatList
        data={supplierList}
        renderItem={renderItem}
        keyExtractor={item => item.supplier_id} // Assuming each item has a unique id
      />
            <TouchableOpacity
         className="absolute bottom-20 right-14 bg-green-500 p-9 rounded-full"
        onPress={() => navigation.navigate('NewSupplier')}>
        <View>
        <Icon name="plus" size={14} color="white" />
        </View>
      </TouchableOpacity>
    </View>
  );
}
