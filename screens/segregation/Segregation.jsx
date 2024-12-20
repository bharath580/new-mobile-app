import { View, Text, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getSegregationBatchList } from '../../features/segregation/segregationSlice';
import { Button } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { useFocusEffect } from '@react-navigation/native';
import Loader from '../Loader';

const Segregation = ({ navigation }) => {
  const dispatch = useDispatch();

  const { segregationBatchList, isLoading } = useSelector(state => state.segregation);
  const [batch, setBatch] = useState(null);

  useFocusEffect(
    useCallback(() => {
      // Fetch or refresh data here
      dispatch(getSegregationBatchList());
    }, [dispatch])
  );

  if (isLoading) {
    return <Loader />;
  }

  const handleMaterialChange = (value) => {
    setBatch(value);
  };

  return (
    <>
      <View className="mx-2 my-4 flex-1 rounded p-4 flex flex-col">
        <View className="border-b">
          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-semibold">Batch Id</Text>
          </View>
          <Picker
            selectedValue={batch}
            onValueChange={handleMaterialChange}
          >
            {segregationBatchList.length>0 &&
              segregationBatchList.map((data) => (
                <Picker.Item
                  key={data.batch_id}  // Use batch_id as a unique key
                  label={`${data.display_id} (${data.totalQuantity}kg)`}
                  value={data.batch_id}
                />
              ))}
          </Picker>
        </View>
      </View>

      <TouchableOpacity>
        <Button
          className="bg-green-500 text-lg hover:bg-green-700 font-bold py-2 px-3 rounded w-full"
          textColor="white"
          onPress={() => navigation.navigate('SegregationDetail', { id: batch })}
        >
          Next {'>'}
        </Button>
      </TouchableOpacity>
    </>
  );
};

export default Segregation;
