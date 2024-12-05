import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import {useDispatch, useSelector} from 'react-redux';
import {addMaterial, getbaleDropdown} from '../../features/bale/baleSlice';
import Loader from '../Loader';

const BaleMaterial = ({navigation}) => {
  const [materialDetails, setMaterialDetails] = useState([
    {batchId: '', quantity: ''},
  ]);
  const dispatch = useDispatch();
  const {baleDropdownList, orderData, isLoading} = useSelector(
    state => state.bale,
  );
  useEffect(() => {
    dispatch(getbaleDropdown());
    console.log('baleDropdownList', baleDropdownList);
    console.log('orderData', orderData);
  }, []);
  if (isLoading) {
    return <Loader />;
  }
  const handleNext = () => {
    console.log('submitted');
    dispatch(addMaterial(materialDetails));
    navigation.navigate('BalingQuantity');
  };
  const handleMaterialChange = (value, index) => {
    console.log('value', value);
    // const {po_id,material_id}=value
    setMaterialDetails(prevDetails => {
      const updatedDetails = [...prevDetails];
      updatedDetails[index].batchId = value;
      // console.log('material', materialDetails);
      // updatedDetails[index].po_id = po_id;
      return updatedDetails;
    });
  };
  const handleQuantityChange = (value, index) => {
    setMaterialDetails(prevDetails => {
      const updatedDetails = [...prevDetails];
      updatedDetails[index].quantity = value;
      return updatedDetails;
    });
  };
  const addMaterialBox = () => {
    setMaterialDetails(preDetails => [
      ...preDetails,
      {batchId: '', quantity: ''},
    ]);
  };
  const handleDelete = index => {
    const updatedDetails = [...materialDetails];
    updatedDetails.splice(index, 1);
    setMaterialDetails(updatedDetails);
  };
  const renderMaterialBoxes = () => {
    return materialDetails.map((item, index) => (
      <View
        key={index}
        className="mx-4 my-6 border border-gray-500 rounded p-3 py-6 flex flex-col">
        <View className="border-b">
          <View className="flex">
            <Text className="bg-slate-600 text-white rounded-full w-6 text-center">
              {index + 1}
            </Text>
          </View>
          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-semibold">Batch ID</Text>
            {index != 0 && (
              <Button
                icon="delete"
                mode="outlined"
                outlineColor="red"
                textColor="red"
                className="border-red-500 border-1 rounded-full	"
                style={{
                  borderColor: 'red', // Set the border color
                  // borderWidth: 1,       // Ensure the border is visible
                  // borderRadius: 5,      // Optional: Set rounded corners
                }}
                onPress={() => handleDelete(index)}>
                Delete
              </Button>
            )}
          </View>
          <Picker
            selectedValue={item.batchId}
            onValueChange={value => handleMaterialChange(value, index)}>
            {baleDropdownList &&
              baleDropdownList.map((data, i) => (
                <Picker.Item
                  key={i}
                  name={i}
                  label={data.batch_id}
                  value={data.id}
                />
              ))}
          </Picker>
        </View>

        <View className=" mt-3 mb-2">
          <Text className="text-lg font-semibold">Quantity(kg)</Text>
          <TextInput
            className="border mt-2 h-10 pl-2"
            value={item.quantity}
            keyboardType="numeric"
            onChangeText={value => handleQuantityChange(value, index)}
          />
        </View>
      </View>
    ));
  };
  return (
    <>
      <ScrollView className="mx-3 mb-6">
        <Text className="ml-3 mt-5 text-xl font-bold">Material Details</Text>
        {renderMaterialBoxes()}

        <View>
          <TouchableOpacity className="items-center">
            <Button
              mode="outlined"
              className="text-lg
      font-bold  px-3 rounded"
              style={{
                borderColor: 'green', // Set the border color
                borderWidth: 1, // Ensure the border is visible
                borderRadius: 5, // Optional: Set rounded corners
              }}
              textColor="green"
              outlineColor="green"
              onPress={addMaterialBox}>
              Add
            </Button>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <TouchableOpacity>
        <Button
          className="bg-green-500 text-lg hover:bg-green-700
       font-bold py-2 px-3 rounded w-full "
          textColor="white"
          onPress={handleNext}>
          Next {'>'}
        </Button>
      </TouchableOpacity>
    </>
  );
};

export default BaleMaterial;
