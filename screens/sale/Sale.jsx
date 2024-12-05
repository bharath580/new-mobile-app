import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome';
import { getSaleList } from '../../features/sale/saleSlice'

const Sale = ({navigation}) => {
    const dispatch = useDispatch()
    const {saleList}= useSelector(state=>state.sale)
    useEffect(()=>{
      dispatch(getSaleList())
    },[dispatch])
    const Item = ({item}) => (
        <View>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() =>
              navigation.navigate('SalesDetail', {id: item.sales_id})
            }
          >
            {/* //////////  */}
            <View className="border border-gray-300 h-28 flex-row justify-between items-center">
              <View className="ml-2">
                <Text className="font-extrabold text-base">
                  Order #{item.display_sale_id}
                </Text>
                <Text className="">{'Buyer : ' + item.buyer_name}</Text>
                <Text className="">{'Quantity : ' + item.quantity}kg</Text>
                
              </View>
              <View className="mr-2">
                <Text>{item.date}</Text>
                <Text>{item.time}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
      return (
        <View className="flex-1">
          <FlatList
            data={saleList}
            renderItem={Item}
            keyExtractor={item => item.sales_id}
          />
          <View>
            <TouchableOpacity
              className="absolute bottom-20 right-14 bg-green-500 p-9 rounded-full"
              onPress={() => navigation.navigate('NewSale')}
            >
              <View>
                <Icon name="plus" size={14} color="white" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );
}

export default Sale