import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {getBatchById, getMaterialList} from '../../features/batch/batchSlice';
import Loader from '../Loader';
import { Picker } from '@react-native-picker/picker';

const BatchDetail = ({route}) => {
  const id = route.params.id;
  const dispatch = useDispatch();
  const {batchById, isLoading,materialList} = useSelector(state => state.batch);
  const [modalVisible, setModalVisible] = useState(false);
  const [materialDetails, setMaterialDetails] = useState([{purchaseAndMaterial: ''}]);
  useEffect(() => {
    dispatch(getBatchById(id));
    dispatch(getMaterialList());
    // console.log('batchById',batchById)
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }
  console.log('batchById', batchById);
  console.log('materialList',materialList)

  const materialBox = ({item}) => {
    return (
      <View className="my-2 w-full">
        <View className="border rounded w-full h-36 p-5 justify-evenly">
          <Text>
            <Text className="font-bold">Material Name:</Text>{' '}
            {item.material_name}
          </Text>
          <Text>
            <Text className="font-bold">Material Code:</Text>{' '}
            {item.display_material_id}
          </Text>
          <Text>
            <Text className="font-bold">Quantity:</Text> {item.quantity} kg
          </Text>
          <Text>
            <Text className="font-bold">Order ID:</Text> {item.display_order_id}
          </Text>
          <Text>
            <Text className="font-bold">Supplier:</Text> {item.supplier_name}
          </Text>
        </View>
      </View>
    );
  };
  const handleMaterialChange = (value, index) => {
    console.log('value', value);
    setMaterialDetails(prevDetails => {
      const updatedDetails = [...prevDetails];
      updatedDetails[index].purchaseAndMaterial = value;
      console.log('material', materialDetails);
      return updatedDetails;
    });
  };
  return (
    <ScrollView>
      <View className="flex-row justify-between  m-6">
        <View className="ml-2">
          <Text className="font-extrabold text-base">
            Batch #{/* {item.display_batch_id} */}{' '}
            {batchById.summary && batchById.summary[0].display_batch_id}
          </Text>
          <Text className="mt-1">
            Quantity:{batchById.summary && batchById.summary[0].quantity} kg
          </Text>
          <Button
            mode="text"
            className="bg-green-500
      rounded-full mt-2"
            textColor="white">
            {/* {item.status == 1 ? 'created' : 'processing'} */}
            {batchById.summary && batchById.summary[0].status == 1
              ? 'created'
              : 'processing'}
          </Button>
        </View>
        <View className="mr-2">
          <Text>{batchById.summary && batchById.summary[0].date}</Text>
          <Text>{batchById.summary && batchById.summary[0].time}</Text>
        </View>
      </View>
      <View className="m-4 ">
        <View className="flex-row items-center justify-between">
          <Text className="font-extrabold text-lg">Material Details</Text>
          {/* <TouchableOpacity>
            <Button
              mode="outlined"
              className=" text-lg border border-green-500
         font-bold  px-3 rounded"
              textColor="green"
              onPress={() => setModalVisible(true)}>
              Add Material
            </Button>
          </TouchableOpacity> */}
          {/* Modal  */}
          <Modal
            animationType="slide" // Animation: slide, fade, or none
            transparent={true} // Makes modal background transparent
            visible={modalVisible} // Controls modal visibility
            onRequestClose={() => setModalVisible(false)} // Required for Android back button
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
              
              <Picker  className='m-2 w-full'
                // selectedValue={materialDetails.purchaseAndMaterial}
                onValueChange={value => handleMaterialChange(value)}>
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
             
                <Button
                  title="Close Modal"
                  onPress={() => setModalVisible(false)}
                >Close</Button>
              </View>
            </View>
          </Modal>
          {/* modal end  */}
        </View>
        <FlatList
          scrollEnabled={false}
          data={batchById.material} // The array of items to render
          renderItem={materialBox} // Function to render each item
          keyExtractor={item => item.display_material_id} // Unique key for each item
          showsVerticalScrollIndicator={false} // Hide scroll indicator
        />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay background
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 400,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 15,
    fontSize: 18,
    textAlign: 'center',
  },
});

export default BatchDetail;
