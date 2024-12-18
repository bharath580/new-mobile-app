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
  import Icon from 'react-native-vector-icons/FontAwesome';
import { getBuyerList } from '../../features/buyer/buyerSlice';
import { useFocusEffect } from '@react-navigation/native';

  export default function BuyerList({navigation}) {
    const dispatch = useDispatch();
    const {buyerList} = useSelector(state => state.buyer);

    useFocusEffect(
      useCallback(() => {
        dispatch(getBuyerList());
        console.log('buyer list refreshed');
      }, [dispatch])
    );
    console.log(buyerList);
    const renderItem = ({item}) => (
      <TouchableOpacity
        onPress={() => navigation.navigate('BuyerDetail', {id: item.buyer_id})}>
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
                uri: `http://13.202.98.144:2000/${item.buyer_image}`,
              }}
            />
          </View>
          <View className="ml-2">
            <Text className="font-extrabold text-xl">{item.buyer_name}</Text>
            <Text>Buyer ID: {item.buyer_id}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
    return (
      <View className='flex-1'>
        <FlatList
          data={buyerList}
          renderItem={renderItem}
          keyExtractor={item => item.buyer_id} // Assuming each item has a unique id
        />
              <TouchableOpacity
           className="absolute bottom-20 right-14 bg-green-500 p-9 rounded-full"
          onPress={() => navigation.navigate('NewBuyer')}>
          <View>
          <Icon name="plus" size={14} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  