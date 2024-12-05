import { View, Text, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getSegregationBatchList } from '../../features/segregation/segregationSlice';
import { Button } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { useFocusEffect } from '@react-navigation/native';
import Loader from '../Loader';

const Segregation = ({navigation}) => {
  const dispatch = useDispatch();

  const {segregationBatchList,isLoading} = useSelector(state => state.segregation);
  const [isChecked, setIsChecked] = useState(false);
  const [batch, setBatch] = useState();
  // useEffect(() => {
    
  //   console.log('segregationBatchList', segregationBatchList);
  //   // console.log("use effect",materialList[0].purchaseAndMaterial)
  // }, [dispatch]);
  useFocusEffect(
    useCallback(() => {
        // Fetch or refresh data here
        dispatch(getSegregationBatchList()); // Replace with the appropriate action to reload your data
        console.log('segregationBatchList', segregationBatchList);
    }, [dispatch])
);
if(isLoading){
  return <Loader/>;
  
}
  const handleMaterialChange = (value, index) => {
    console.log('value', value);
    // const {po_id,material_id}=value
    setBatch(value);
  };
  return (
    <>
    <View className="mx-2 my-4 flex-1  rounded p-4 flex flex-col">
      <View className="border-b">
        <View className="flex-row items-center justify-between">
          <Text className="text-lg font-semibold">Batch Id</Text>
        </View>
        <Picker
          selectedValue={batch}
          onValueChange={value => handleMaterialChange(value)}>
          {segregationBatchList &&
            segregationBatchList.map((data, i) => (
              <Picker.Item
                key={i}
                name={i}
                label={`${data.display_id} (${data.totalQuantity}kg)`}
                value={data.batch_id}
              />
            ))}
        </Picker>
      </View>
     
    </View>

   

       <TouchableOpacity>
       <Button
         className="bg-green-500 text-lg hover:bg-green-700
font-bold py-2 px-3 rounded w-full "
         textColor="white"  onPress={() =>
          navigation.navigate('SegregationDetail', {id: batch})
        }>
     
         Next {'>'}
       </Button>
     </TouchableOpacity>
     </>
  )
}

export default Segregation