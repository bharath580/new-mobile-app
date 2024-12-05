import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, {useCallback, useEffect} from 'react';
import {Button} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {getBatchList} from '../../features/batch/batchSlice';
import { useFocusEffect } from '@react-navigation/native';
import Loader from '../Loader';

const Batch = ({navigation}) => {
  const dispatch = useDispatch();
  const {batchList,isLoading} = useSelector(state => state.batch);
  
  useFocusEffect(
    useCallback(() => {
      dispatch(getBatchList());
      console.log('batch list refreshed');
    }, [dispatch])
  );
  if(isLoading){
    return <Loader/>;
    
  }
  const Item = ({item}) => (
    <View>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() =>
          navigation.navigate('BatchDetail', {id: item.batch_id})
        }
      >
        {/* //////////  */}
        <View className="border border-gray-300 h-32 flex-row justify-between items-center">
          <View className="ml-2">
            <Text className="font-extrabold text-base">
              Batch #{item.display_batch_id}
            </Text>
            <Text className="">{'Quantity: ' + item.totalQuantity} kg</Text>
            <Button 
              mode="text"
              className={`rounded-full mt-1 ${
                item.status === 1 ? 'bg-green-500' : 'bg-yellow-500'
              }`}
              textColor="white">
              {item.status == 1 ? 'created' : 'processing'}
            </Button>
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
        data={batchList}
        renderItem={Item}
        keyExtractor={item => item.batch_id}
      />
      <View>
        <TouchableOpacity
          className="absolute bottom-20 right-14 bg-green-500 p-9 rounded-full"
          onPress={() => navigation.navigate('NewBatch')}
        >
          <View>
            <Icon name="plus" size={14} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Batch;
