
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addMaterial, getSaleDropdownList } from '../../features/sale/saleSlice';
import { Button } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';

const Material = ({navigation}) => {
    const [materialDetails, setMaterialDetails] = useState([{material:'', quantity: ''}]);
    const dispatch = useDispatch()
    const {saleDropdownList} = useSelector(state => state.sale)
    useEffect(()=>{
        dispatch(getSaleDropdownList());
        console.log('sale',saleDropdownList)
    },[])
   
    const handleMaterialChange = (value, index) => {
        console.log('value', value);
        setMaterialDetails(prevDetails => {
          const updatedDetails = [...prevDetails];
          updatedDetails[index].material = value;
          return updatedDetails;
        });
        // dispatch(addMaterial(materialDetails))
      };
    
      const handleQuantityChange = (value, index) => {
        setMaterialDetails(prevDetails => {
          const updatedDetails = [...prevDetails];
          updatedDetails[index].quantity = value;
          return updatedDetails;
        });
      };

      const handleDelete = index => {
        const updatedDetails = [...materialDetails];
        updatedDetails.splice(index, 1);
        setMaterialDetails(updatedDetails);
      };
      const addMaterialBox = () => {
        // const defaultMaterial = dropdownDetails?.material?.[0]?.purchase_material_id || ''; // Get the first material ID as default
        setMaterialDetails(prevDetails => [
          ...prevDetails,
          { material: '', quantity: ''}, // Use defaultMaterial
        ]);
      };
      const handleNext=()=>{
        dispatch(addMaterial(materialDetails))
        navigation.navigate('SalesReceipt')
      }
    const renderMaterialBoxes = () => {
        return materialDetails.map((item, index) => (
          <View
            key={index}
            className="mx-2 my-4 border border-gray-500 rounded p-3 py-9 flex flex-col">
            <View className="border-b">
              <View className="flex">
                <Text className="bg-slate-600 text-white rounded-full w-6 text-center">
                  {index + 1}
                </Text>
              </View>
              <View className="flex-row items-center justify-between">
                <Text className="text-lg font-semibold">Material Name</Text>
                {index != 0 && (
                  <Button
                    icon="delete"
                    mode="contained"
                    onPress={() => handleDelete(index)}
                  >
                    Delete
                  </Button>
                )}
              </View>
              <Picker
              selectedValue={item.material}
              onValueChange={value => handleMaterialChange(value, index)}
              >
                {saleDropdownList && saleDropdownList.map((item) => (
              <Picker.Item key={item.bale_id} label={item.display_bale_id} value={item.bale_id} />
              // Assuming each item has an `id` and `name` property; adjust accordingly
            ))}
              </Picker>
            </View>
    
            <View className=" mt-3">
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
    <ScrollView>
      <Text
      className='ml-3 mt-5 text-xl font-bold'
      >
        Material Details
      </Text>
      {renderMaterialBoxes()}

      <View className='pb-4'>
        <TouchableOpacity className="items-center">
          <Button
            mode="contained"
              onPress={addMaterialBox}
            className="bg-green-500 text-lg hover:bg-green-700
       font-bold  px-3 rounded"
            textColor="white">
            Add
          </Button>
        </TouchableOpacity>
      </View>
    </ScrollView>
    <TouchableOpacity>
      <Button
        className="bg-green-500 text-lg
       font-bold py-2 px-3 rounded w-full "
        textColor="white" 
        onPress={handleNext}
        >
        Next {'>'}
      </Button>
    </TouchableOpacity>
  </>
  )
}

export default Material