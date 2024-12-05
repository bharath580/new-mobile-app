import {View, Text, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import { Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { addBaleQuantity } from '../../features/bale/baleSlice';

const BalingQuantity = ({navigation}) => {
  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState();

  const handleQuantityChange = value => {
    setQuantity(value);
    dispatch(addBaleQuantity(value))
    console.log(quantity);
  };
  const handleNext=()=>{
    navigation.navigate('OperatorSign')
  }
  return (
    <>
      <ScrollView className='m-2'>
        <Text className="ml-3 mt-5 text-xl font-bold">Bale Quantity(kg)</Text>
        <View className="m-3">
          {/* <Text className="text-lg font-semibold">Quantity(kg)</Text> */}
          <TextInput
            className="border mt-2 h-10 pl-2"
            value={quantity}
            keyboardType="numeric"
            onChangeText={value => handleQuantityChange(value)}
          />
        </View>
      </ScrollView>
      <TouchableOpacity>
          <Button
            className="bg-green-500 text-lg hover:bg-green-700
       font-bold py-2 px-3 rounded w-full "
            textColor="white"
            onPress={handleNext}
            >
            Next {'>'}
          </Button>
        </TouchableOpacity>
    </>
  );
};

export default BalingQuantity;
