import {View, Text, ScrollView, FlatList, Image, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {Button, DataTable} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {getBaleById} from '../../features/bale/baleSlice';
import QRCode from 'react-native-qrcode-svg';

const BaleDetail = ({route}) => {
  const id = route.params.id;
  console.log(id);

  const dispatch = useDispatch();
  const {baleById} = useSelector(state => state.bale);
  const qrValue =
  baleById.summary?.[0]?.bale_id?.toString() || "No Data Available";
  useEffect(() => {
    dispatch(getBaleById(id));
  }, [dispatch]);
  console.log(baleById);
  const tableList = ({item}) => {
    return (
      <DataTable.Row>
        <DataTable.Cell>{item.display_batch_id}</DataTable.Cell>
        <DataTable.Cell numeric>{item.quantity} kg</DataTable.Cell>
      </DataTable.Row>
    );
  };
  return (
    <>
    <ScrollView>
      <View className="flex-row justify-between  m-6">
        <View className="ml-2">
          <Text className="font-extrabold text-base">
            Bale #{/* {item.display_batch_id} */}{' '}
            {baleById.summary && baleById.summary[0].display_bale_id}
          </Text>
          <Text className="mt-1">
            Material Type:{' '}
            {baleById.summary && baleById.summary[0].bale_material_name}
          </Text>
          <Text className="mt-1">
            Quantity:{baleById.summary && baleById.summary[0].bale_quantity} kg
          </Text>
        </View>
        <View className="mr-2">
          <Text>{baleById.summary && baleById.summary[0].date}</Text>
          <Text>{baleById.summary && baleById.summary[0].time}</Text>
        </View>
      </View>
      <View className="m-4 ">
        <View>
          <Text className="font-extrabold text-lg">Material Details</Text>
        </View>
        <View className="">
          <DataTable>
            <DataTable.Header>
              <DataTable.Title textStyle={{fontWeight: 'bold', fontSize: 16}}>
                Batch
              </DataTable.Title>
              <DataTable.Title
                numeric
                textStyle={{fontWeight: 'bold', fontSize: 16}}>
                Quantity
              </DataTable.Title>
            </DataTable.Header>
            <FlatList
              scrollEnabled={false}
              data={baleById.material} // The array of items to render
              renderItem={tableList} // Function to render each item
              keyExtractor={item => item.batch_id} // Unique key for each item
              showsVerticalScrollIndicator={false} // Hide scroll indicator
            />
            <DataTable.Row>
              <DataTable.Cell textStyle={{fontWeight: 'bold', fontSize: 16}}>
                Total
              </DataTable.Cell>
              <DataTable.Cell
                numeric
                textStyle={{fontWeight: 'bold', fontSize: 16}}>
                {baleById.summary && baleById.summary[0].bale_quantity} kg
              </DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </View>
      </View>
      {baleById.summary && (
        <View className="m-4">
          <View>
            <Text className="font-extrabold text-lg">Operator Signature</Text>
          </View>
          <View className="w-36 h-56">
            {/* <Text>{baleById.purchase_order[0].supplierSignature}</Text> */}
            {baleById.summary && baleById.summary[0].operator_signature && (
              <Image
                className="w-44 h-28 mt-3"
                source={{
                  uri:
                    baleById.summary && baleById.summary[0].operator_signature,
                }}
                
              />
            )}
          </View>
        </View>
      )}
      <View className="m-4">
        <View>
          <Text className="font-extrabold text-lg">Bale QR Code</Text>
        </View>
      </View>
      <View className='m-2 mb-28'>
      <QRCode 
        value={qrValue}// The data for the QR code
        size={300}                  // Size of the QR code
        color="black"               // QR code color
        backgroundColor="white"     // Background color
      />
    </View>
    </ScrollView>
    <TouchableOpacity>
        <Button
          className="bg-green-500 text-lg
         font-bold py-2 px-3 rounded w-full "
          textColor="white" >
          PRINT QR CODE
        </Button>
      </TouchableOpacity>
  </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'start',
    backgroundColor: '#f5f5f5',
  },
});

export default BaleDetail;
