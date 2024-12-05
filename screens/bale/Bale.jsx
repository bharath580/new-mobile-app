import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getBaleList } from '../../features/bale/baleSlice';
import Icon from 'react-native-vector-icons/FontAwesome';
import Loader from '../Loader';
import { useFocusEffect } from '@react-navigation/native';
const Bale = ({navigation}) => {
    const dispatch = useDispatch()
 const {baleList , isLoading } = useSelector(state => state.bale);
    
    useFocusEffect(
      useCallback(() => {
        dispatch(getBaleList())
     console.log(baleList)
      }, [dispatch])
    );
    if(isLoading){
      return <Loader/>;
      
    }
    const renderItem = ({item}) => (
        <TouchableOpacity 
        onPress={()=>navigation.navigate('BaleDetail', {id: item.bale_id})}
        >
          <View className="border border-gray-300 h-24 flex-row justify-between items-center">
            <View className="ml-2">
              <Text className='font-extrabold text-base'>Bale #{item.display_bale_id}</Text>
              <Text>Material Type : {item.bale_material_name}</Text>
              <Text>Quantity : {item.bale_quantity}kg</Text>
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
            data={baleList}
            renderItem={renderItem}
            keyExtractor={item => item.bale_id} // Assuming each item has a unique id
          />
          
          <TouchableOpacity
            className="absolute bottom-20 right-14 bg-green-500 p-9 rounded-full"
            onPress={() => navigation.navigate('NewBale')}>
            <View>
              <Icon name="plus" size={14} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      );
}

export default Bale