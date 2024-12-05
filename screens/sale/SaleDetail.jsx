import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getSaleById} from '../../features/sale/saleSlice';
import {Button, DataTable} from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';

const SaleDetail = ({route}) => {
  const id = route.params.id;
  console.log(id);

  const dispatch = useDispatch();
  const {saleById} = useSelector(state => state.sale);
  const qrValue =
    saleById.summary?.[0]?.sale_id?.toString() || 'No Data Available';
  useEffect(() => {
    dispatch(getSaleById(id));
  }, [dispatch]);
  console.log(saleById);
  const tableList = ({item}) => {
    return (
      <DataTable.Row>
        <DataTable.Cell>{item.bale_id}</DataTable.Cell>
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
              Sale #{saleById.summary && saleById.summary[0].display_sale_id}
            </Text>
            <Text className="mt-1">
              Buyer : {saleById.summary && saleById.summary[0].buyer_name}
            </Text>
            <Text className="mt-1">
              Buyer ID : {saleById.summary && saleById.summary[0].buyer_id}
            </Text>
          </View>
          <View className="mr-2">
            <Text>{saleById.summary && saleById.summary[0].date}</Text>
            <Text>{saleById.summary && saleById.summary[0].time}</Text>
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
                  Bale ID
                </DataTable.Title>
                <DataTable.Title
                  numeric
                  textStyle={{fontWeight: 'bold', fontSize: 16}}>
                  Quantity
                </DataTable.Title>
              </DataTable.Header>
              <FlatList
                scrollEnabled={false}
                data={saleById.material} // The array of items to render
                renderItem={tableList} // Function to render each item
                keyExtractor={item => item.bale_id} // Unique key for each item
                showsVerticalScrollIndicator={false} // Hide scroll indicator
              />
              <DataTable.Row>
                <DataTable.Cell textStyle={{fontWeight: 'bold', fontSize: 16}}>
                  Total
                </DataTable.Cell>
                <DataTable.Cell
                  numeric
                  textStyle={{fontWeight: 'bold', fontSize: 16}}>
                  {saleById.summary && saleById.summary[0].quantity} kg
                </DataTable.Cell>
              </DataTable.Row>
            </DataTable>
          </View>
        </View>
        {saleById.summary && (
          <View className="m-4">
            <View>
              <Text className="font-extrabold text-lg">Buyer Signature</Text>
            </View>
            <View className="w-36 h-56">
              {/* <Text>{baleById.purchase_order[0].supplierSignature}</Text> */}
              {saleById.summary && saleById.summary[0].buyer_signature && (
                <Image
                  className="w-44 h-28 mt-3"
                  source={{
                    uri:
                      saleById.summary && saleById.summary[0].buyer_signature,
                  }}
                />
              )}
            </View>
          </View>
        )}
        {saleById.summary && (
          <View className="m-4">
            <View>
              <Text className="font-extrabold text-lg">
                Supervisor Signature
              </Text>
            </View>
            <View className="w-36 h-56">
              {/* <Text>{baleById.purchase_order[0].supplierSignature}</Text> */}
              {saleById.summary && saleById.summary[0].supervisor_signature && (
                <Image
                  className="w-44 h-28 mt-3"
                  source={{
                    uri:
                      saleById.summary &&
                      saleById.summary[0].supervisor_signature,
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
        <View className="m-2 mb-28">
          <QRCode
            value={qrValue} // The data for the QR code
            size={300} // Size of the QR code
            color="black" // QR code color
            backgroundColor="white" // Background color
          />
        </View>
      </ScrollView>
      <TouchableOpacity>
        <Button
          className="bg-green-500 text-lg
           font-bold py-2 px-3 rounded w-full "
          textColor="white">
          PRINT QR CODE
        </Button>
      </TouchableOpacity>
    </>
  );
};

export default SaleDetail;
