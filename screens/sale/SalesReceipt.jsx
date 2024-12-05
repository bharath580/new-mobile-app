import { View, Text, FlatList, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, DataTable } from 'react-native-paper'
import { addBuyerSign, addSupervisorSign, postSaleData } from '../../features/sale/saleSlice'

const SalesReceipt = ({navigation}) => {
  const {orderData} = useSelector(state => state.sale)
  const dispatch = useDispatch()
  const [totalQuantity, setTotalQuantity] = useState(0)
  const [buyerSignature, setBuyerSignature] = useState()
  const [supervisorSignature, setSupervisorSignature] = useState()
  useEffect(()=>{
    console.log('orderData',orderData)
    if (orderData.materials) {
      const total = orderData.materials.reduce(
        (sum, item) => sum + Number(item.quantity),
        0
      )
      setTotalQuantity(total)
    }
  },[orderData])
  const handleSignature = (signatureType, signatureValue) => {
    console.log(orderData);
    if (signatureType === 'Buyer') {
      setBuyerSignature(signatureValue);
      dispatch(addBuyerSign(signatureValue));
    } else if (signatureType === 'Supervisor') {
      setSupervisorSignature(signatureValue);
      console.log(signatureValue);
      dispatch(addSupervisorSign(signatureValue));
    }
  };
  const navigateToSignaturePage = signatureType => {
    navigation.navigate('SalesSignatory', {
      signatureType: signatureType,
      handleSignature: handleSignature,
    });
  };
  const handleSubmit = async () => {
    try {
      await dispatch(postSaleData(orderData)).unwrap(); // Wait for success
      // Optionally reset the material list here if needed
      // dispatch(resetMaterialList());
      navigation.navigate('SaleList'); // Navigate only after successful dispatch
    } catch (error) {
      console.error('Failed to post batch data:', error); // Handle errors if needed
    }
  };
  const tableList = ({item}) => {
    return (
      <DataTable.Row>
        <DataTable.Cell>B{item.material}</DataTable.Cell>
        <DataTable.Cell numeric>{item.quantity} kg</DataTable.Cell>
      </DataTable.Row>
    );
  };
  return (
    <>
    <ScrollView>
    <View className="m-3">
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
        data={orderData.materials} // The array of items to render
        renderItem={tableList} // Function to render each item
        keyExtractor={item => item.material} // Unique key for each item
        showsVerticalScrollIndicator={false} // Hide scroll indicator
      />
      <DataTable.Row>
        <DataTable.Cell textStyle={{fontWeight: 'bold', fontSize: 16}}>
          Total
        </DataTable.Cell>
        <DataTable.Cell
          numeric
          textStyle={{fontWeight: 'bold', fontSize: 16}}>
           {totalQuantity} kg
        </DataTable.Cell>
      </DataTable.Row>
    </DataTable>
  </View>
   <View className="flex-1 m-5">
   <View className="flex flex-row items-center justify-between">
     <Text className="text-lg">Buyer Signature</Text>
     <TouchableOpacity>
       <Button
         className="bg-green-500 text-lg hover:bg-green-700
font-bold py-0 px-4 rounded  "
         textColor="white"
         onPress={() => navigateToSignaturePage('Buyer')}>
         Add Signature
       </Button>
     </TouchableOpacity>
   </View>
   <View className="border-0.5 rounded mt-2 h-80">
     {buyerSignature && (
       <Image
         resizeMode={'contain'}
         source={{uri: buyerSignature}}
         className="h-56 w-full object-cover "
       />
     )}
   </View>
 </View>
 <View className="flex-1 m-5">
   <View className="flex flex-row items-center justify-between">
     <Text className="text-lg">Supervisor Signature</Text>
     <TouchableOpacity>
       <Button
         className="bg-green-500 text-lg hover:bg-green-700
font-bold py-0 px-4 rounded  "
         textColor="white"
         onPress={() => navigateToSignaturePage('Supervisor')}>
         Add Signature
       </Button>
     </TouchableOpacity>
   </View>
   <View className="border-0.5 rounded mt-2 h-80">
     {supervisorSignature && (
       <Image
         resizeMode={'contain'}
         source={{uri: supervisorSignature}}
         className="h-56 w-full object-cover "
       />
     )}
   </View>
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
  )
}

export default SalesReceipt