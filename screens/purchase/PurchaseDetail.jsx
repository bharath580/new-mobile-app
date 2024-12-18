import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  ScrollView,
  Image,
} from 'react-native';
import React, {useEffect} from 'react';
import {DataTable} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {getOrderById} from '../../features/purchase/purchaseSlice';
import Loader from '../Loader';

const PurchaseDetail = ({route}) => {
  const id = route.params.id;
  console.log(id);
  const dispatch = useDispatch();
  const {orderById,isLoading} = useSelector(state => state.purchase);
  useEffect(() => {
    dispatch(getOrderById(id));
  }, [dispatch]);

  if(isLoading){
    return <Loader/>;
    
  }
  const materialBox = ({item}) => {
    return (
      <View className="my-2 w-full">
        <View className="border rounded w-1/2 h-36 p-5 justify-evenly">
          <Text>
            <Text className="font-bold">Material Name:</Text>{' '}
            {item.material_name}
          </Text>
          <Text>
            <Text className="font-bold">Material Code:</Text>{' '}
            {item.material_code}
          </Text>
          <Text>
            <Text className="font-bold">Quantity:</Text> {item.quantity} kg
          </Text>
          <Text>
            <Text className="font-bold">No. of sacks:</Text> {item.sacks}
          </Text>
        </View>
      </View>
    );
  };
  const tableList = ({item}) => {
    return (
      <DataTable.Row>
        <DataTable.Cell>{item.material_name}</DataTable.Cell>
        <DataTable.Cell>{item.quantity} kg</DataTable.Cell>
        <DataTable.Cell numeric>{item.sacks}</DataTable.Cell>
      </DataTable.Row>
    );
  };
  return (
    <SafeAreaView className="flex-1">
      <ScrollView>
        <View className="m-4">
          <Text className="font-extrabold text-lg">
            Order #
            {orderById.purchase_order &&
              orderById.purchase_order[0].display_order_id}
          </Text>

          <View className="flex flex-column justify-evenly">
            <Text className="mt-1">
              <Text className="font-bold">Supplier:</Text>{' '}
              {orderById.purchase_order &&
                orderById.purchase_order[0].supplier_name}
            </Text>
            <Text className="mt-1">
              <Text className="font-bold">Supplier ID:</Text>{' '}
              {orderById.purchase_order &&
                orderById.purchase_order[0].supplier_id}
            </Text>
            <Text className="mt-1">
              <Text className="font-bold">Total Quantity:</Text>{' '}
              {orderById.purchase_order &&
                orderById.purchase_order[0].totalQuantity}
              kg
            </Text>
            <Text className="mt-1">
              <Text className="font-bold">Procurement mode:</Text>{' '}
              {orderById.purchase_order &&
              orderById.purchase_order[0].procurement_mode == 1
                ? 'Pickup'
                : 'Dropoff'}
            </Text>
          </View>
        </View>
        {orderById.purchase_order &&
          orderById.purchase_order[0].procurement_mode == 2 && (
            <View className="m-4 ">
              <Text className="font-extrabold text-lg">Dropoff Details</Text>
              <Text className="mt-1">
                <Text className="font-bold">Vehicle number :</Text> NIL
              </Text>
            </View>
          )}
        <View className="m-4 ">
          <View>
            <Text className="font-extrabold text-lg">Order Summary</Text>
          </View>
          <FlatList
            scrollEnabled={false}
            data={orderById.purchase_order_details} // The array of items to render
            renderItem={materialBox} // Function to render each item
            keyExtractor={item => item.po_details_id} // Unique key for each item
            showsVerticalScrollIndicator={false} // Hide scroll indicator
          />
        </View>
        <View className="m-4 ">
          <View>
            <Text className="font-extrabold text-lg">Material Details</Text>
          </View>
          <View className="">
            <DataTable>
              <DataTable.Header>
                <DataTable.Title textStyle={{fontWeight: 'bold', fontSize: 16}}>
                  Material
                </DataTable.Title>
                <DataTable.Title textStyle={{fontWeight: 'bold', fontSize: 16}}>
                  Quantity
                </DataTable.Title>
                <DataTable.Title
                  numeric
                  textStyle={{fontWeight: 'bold', fontSize: 16}}>
                  No.of Sacks
                </DataTable.Title>
              </DataTable.Header>
              <FlatList
                scrollEnabled={false}
                data={orderById.purchase_order_details} // The array of items to render
                renderItem={tableList} // Function to render each item
                keyExtractor={item => item.po_details_id} // Unique key for each item
                showsVerticalScrollIndicator={false} // Hide scroll indicator
              />
            </DataTable>
          </View>
        </View>
        <View className="m-4">
          <View>
            <Text className="font-extrabold text-lg">Supplier Signature</Text>
          </View>
          {orderById.purchase_order &&
          orderById.purchase_order[0].procurement_mode == 1 && <View className="w-36 h-56">
            {orderById.purchase_order &&
              orderById.purchase_order[0].supplierSignature && (
                <Image
                  className="w-48 h-44 mt-2"
                  source={{
                    uri: `http://13.202.98.144:2000/${orderById.purchase_order[0].supplierSignature}`,
                  }}
                />
              )}
          </View>}
          {orderById.purchase_order &&
          orderById.purchase_order[0].procurement_mode == 2 && <View className="w-36 h-56">
            {orderById.purchase_order &&
              orderById.purchase_order[0].supplierSignature && (
                <Image
                  className="w-48 h-44 mt-2"
                  resizeMode='contain'
                  source={{
                    uri: orderById.purchase_order[0].supplierSignature,
                  }}
                />
              )}
          </View>}
        </View>
        {orderById.purchase_order &&
              orderById.purchase_order[0].procurement_mode == 1 && <View className="m-4">
          <View>
            <Text className="font-extrabold text-lg">Driver Signature</Text>
          </View>
          <View className="w-36 h-56">
            {/* <Text>{orderById.purchase_order[0].supplierSignature}</Text> */}
            {orderById.purchase_order &&
              orderById.purchase_order[0].driver_signature && (
                <Image
                  className="w-28 h-28 mt-3"
                  source={{
                    uri:
                      orderById.purchase_order &&
                      orderById.purchase_order[0].driver_signature,
                  }}
                />
              )}
          </View>
        </View>}
        <View className="m-4">
          <View>
            <Text className="font-extrabold text-lg">Supervisor Signature</Text>
          </View>
          <View className="w-36 h-56">
            {orderById.purchase_order &&
              orderById.purchase_order[0].supervisor_signature && (
                <Image
                resizeMode='contain'
                  className="w-40 h-28 mt-3"
                  alt="supplier"
                  source={{
                    uri:
                      orderById.purchase_order &&
                      orderById.purchase_order[0].supervisor_signature,
                  }}
                />
              )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PurchaseDetail;
