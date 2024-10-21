import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {RadioButton, Button} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';

const Material = () => {
  const [materialDetails, setMaterialDetails] = useState([
    {material: '', quantity: '', sacks: ''},
  ]);

  const addMaterialBox = () => {
    setMaterialDetails(preDetail => [
      ...preDetail,
      {material: '', quantity: '', sacks: ''},
    ]);
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
            <Text className="text-lg font-semibold">Material Name</Text>
            {index != 0 && (
              <Button
                icon="delete"
                mode="contained"
                // onPress={() => handleDelete(index)}
              >
                Delete
              </Button>
            )}
          </View>
          <Picker
          // selectedValue={item.material}
          // onValueChange={value => handleMaterialChange(value, index)}
          >
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
          </Picker>
        </View>

        <View className=" mt-3">
          <Text className="text-lg font-semibold">Quantity(kg)</Text>
          <TextInput
            className="border mt-2 h-10 pl-2"
            // value={item.quantity}
            keyboardType="numeric"
            // onChangeText={value => handleQuantityChange(value, index)}
          />
        </View>

        <View className=" mt-3">
          <Text className="text-lg font-semibold">No. of Sacks</Text>
          <TextInput
            className="border mt-2 h-10 pl-2"
            keyboardType="numeric"
            // value={item.sacks}
            // onChangeText={value => handleSacksChange(value, index)}
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
          textColor="white">
          Next {'>'}
        </Button>
      </TouchableOpacity>
    </>
  );
};

export default Material;
