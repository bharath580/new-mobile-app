import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button} from 'react-native-paper';
import {
  addDriverSign,
  addSupervisorSign,
  addSupplierSign,
  postPurchase,
} from '../../features/purchase/purchaseSlice';
import {useDispatch, useSelector} from 'react-redux';

const PurchaseConfirm = ({navigation}) => {
  const [driverSignature, setDriverSignature] = useState('');
  const [supervisorSignature, setSupervisorSignature] = useState('');
  const [supplierSignature, setSupplierSignature] = useState('');
  const dispatch = useDispatch();
  const {orderData,isLoading} = useSelector(state => state.purchase);
  useEffect(() => {
    console.log('order', orderData);
  }, [dispatch]);

  const handleSignature = (signatureType, signatureValue) => {
    console.log(orderData);
    if (signatureType === 'Driver') {
      setDriverSignature(signatureValue);
      dispatch(addDriverSign(signatureValue));
    } else if (signatureType === 'Supervisor') {
      setSupervisorSignature(signatureValue);
      console.log(signatureValue);
      dispatch(addSupervisorSign(signatureValue));
    }
    else if (signatureType === 'Supplier') {
      setSupplierSignature(signatureValue);
      console.log(signatureValue);
      dispatch(addSupplierSign(signatureValue));
    }
  };
  const navigateToSignaturePage = signatureType => {
    navigation.navigate('PurchaseSignatory', {
      signatureType: signatureType,
      handleSignature: handleSignature,
    });
  };
  const onConfirm = async () => {
    try {
      console.log('orderData', orderData);
  
      await dispatch(postPurchase(orderData)).unwrap(); // Wait for successful dispatch
      console.log('Purchase successful!');
      
      navigation.navigate("Purchase"); // Navigate only after success
    } catch (error) {
      console.error('Failed to post purchase:', error); // Handle the error if needed
    }
  };
  return (
    <>
      <ScrollView>
       {orderData.purchaseDetail && orderData.purchaseDetail.procurementMode=='1' && 
       <View className="flex-1 m-2">
          <View className="flex flex-row items-center justify-between">
            <Text className="text-lg">Driver Signature</Text>
            <TouchableOpacity>
              <Button
                className="bg-green-500 text-lg hover:bg-green-700
     font-bold py-0 px-4 rounded  "
                textColor="white"
                onPress={() => navigateToSignaturePage('Driver')}>
                Add Signature
              </Button>
            </TouchableOpacity>
          </View>
          <View className="border-0.5 rounded mt-2 h-80">
            {driverSignature && (
              <Image
                resizeMode={'contain'}
                source={{uri: driverSignature}}
                className="h-56 w-full object-cover "
              />
            )}
          </View>
        </View>}
        {orderData.purchaseDetail && orderData.purchaseDetail.procurementMode=='2' && <View className="flex-1 m-2">
          <View className="flex flex-row items-center justify-between">
            <Text className="text-lg">Supplier Signature</Text>
            <TouchableOpacity>
              <Button
                className="bg-green-500 text-lg hover:bg-green-700
     font-bold py-0 px-4 rounded  "
                textColor="white"
                onPress={() => navigateToSignaturePage('Supplier')}>
                Add Signature
              </Button>
            </TouchableOpacity>
          </View>
          <View className="border-0.5 rounded mt-2 h-80">
            {supplierSignature && (
              <Image
                resizeMode={'contain'}
                source={{uri: supplierSignature}}
                className="h-56 w-full object-cover "
              />
            )}
          </View>
        </View>}
        <View className="flex-1 mx-2 mt-4">
          <View className="flex flex-row items-center justify-between">
            <Text className="text-lg">Supervisor Signature</Text>
            <TouchableOpacity>
              <Button
                className="bg-green-500 text-lg hover:bg-green-700
     font-bold py-0 px-4 rounded"
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
          onPress={onConfirm}>
          Confirm
        </Button>
      </TouchableOpacity>
    </>
  );
};

export default PurchaseConfirm;
