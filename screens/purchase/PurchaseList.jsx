import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {getPurchaseList} from '../../features/purchase/purchaseSlice';
import { useFocusEffect } from '@react-navigation/native';
import Loader from '../Loader';
const PurchaseList = ({navigation}) => {
  const dispatch = useDispatch();
  const {purchaseList,isLoading } = useSelector(state => state.purchase);
  // useEffect(() => {
  //   //  const s=fetchPurchaseList()
  //   dispatch(getPurchaseList());
  //   console.log('purchaseList');

  // }, [dispatch]);

 
  useFocusEffect(
    useCallback(() => {
      dispatch(getPurchaseList());
      console.log('Purchase list refreshed');
    }, [dispatch])
  );
  if(isLoading){
    return <Loader/>;
    
  }
  const renderItem = ({item}) => (
    <TouchableOpacity onPress={()=>navigation.navigate('PurchaseDetail', {id: item.order_id})}>
      <View className="border border-gray-300 h-24 flex-row justify-between items-center">
        <View className="ml-2">
          <Text className='font-extrabold text-base'>Order #{item.display_order_id}</Text>
          <Text>Supplier : {item.supplier}</Text>
          <Text>Quantity : {item.quantity}kg</Text>
        </View>
        <View className="mr-2">
          <Text>{item.time}</Text>
          <Text>{item.date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  return (
    <View className="flex-1">
      <FlatList
        data={purchaseList}
        renderItem={renderItem}
        keyExtractor={item => item.order_id} // Assuming each item has a unique id
      />
      
      <TouchableOpacity
         className="absolute bottom-20 right-14 bg-green-500 p-9 rounded-full"
        onPress={() => navigation.navigate('NewPurchase')}>
        <View>
        <Icon name="plus" size={14} color="white" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PurchaseList;
