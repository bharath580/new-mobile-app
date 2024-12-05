import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import {useDispatch, useSelector} from 'react-redux';
import {getMaterialList, postBatchData} from '../../features/batch/batchSlice';
import Loader from '../Loader';

const NewBatch = ({navigation}) => {
  const dispatch = useDispatch();

  const {materialList, isLoading} = useSelector(state => state.batch);
  const [materialDetails, setMaterialDetails] = useState([
    {purchaseAndMaterial: materialList[0]},
  ]);

  useEffect(() => {
    dispatch(getMaterialList());
    // console.log("materialList",materialList[0])
    // console.log("use effect",materialList[0].purchaseAndMaterial)
  }, [dispatch]);
  useEffect(() => {
    console.log('materialDetails', materialDetails);
  }, [materialDetails]);
  if (isLoading) {
    return <Loader />;
  }
  const addMaterialBox = () => {
    const defaultMaterial = materialList[0] || '';
    setMaterialDetails(preDetail => [
      ...preDetail,
      {purchaseAndMaterial: defaultMaterial},
    ]);
  };
  const handleDelete = index => {
    const updatedDetails = [...materialDetails];
    updatedDetails.splice(index, 1);
    setMaterialDetails(updatedDetails);
  };
  const handleMaterialChange = (value, index) => {
    console.log('value', value);
    // const {po_id,material_id}=value
    setMaterialDetails(prevDetails => {
      const updatedDetails = [...prevDetails];
      updatedDetails[index].purchaseAndMaterial = value;
      console.log('material', materialDetails);
      // updatedDetails[index].po_id = po_id;
      return updatedDetails;
    });
  };
  const handleSubmit = async () => {
    try {
      await dispatch(postBatchData(materialDetails)).unwrap(); // Wait for success
      // Optionally reset the material list here if needed
      // dispatch(resetMaterialList());
      navigation.navigate('Batch'); // Navigate only after successful dispatch
    } catch (error) {
      console.error('Failed to post batch data:', error); // Handle errors if needed
    }
  };
  const renderMaterialBoxes = () => {
    return materialDetails.map((item, index) => (
      <View
        key={index}
        className="mx-2 my-4 border border-gray-500 rounded p-3 flex flex-col">
        <View className="border-b">
          <View className="flex">
            <Text className="bg-slate-600 text-white rounded-full w-6 text-center">
              {index + 1}
            </Text>
          </View>
          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-semibold">Material ID</Text>
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
            selectedValue={item.purchaseAndMaterial}
            onValueChange={value => handleMaterialChange(value, index)}>
            {materialList &&
              materialList.map((data, i) => (
                <Picker.Item
                  key={i}
                  name={i}
                  label={`${data.display_id}-${data.supplier_name} (${data.date})`}
                  value={data}
                />
              ))}
          </Picker>
        </View>
      </View>
    ));
  };
  return (
    <>
      <ScrollView>
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
          onPress={handleSubmit}>
          Submit
        </Button>
      </TouchableOpacity>
    </>
  );
};

export default NewBatch;
