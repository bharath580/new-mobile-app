import {View, Text, Image, ScrollView} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../Loader';
import { getBuyerById } from '../../features/buyer/buyerSlice';

const BuyerDetail = ({route}) => {
  const id = route.params.id;
  const dispatch = useDispatch();
  const {buyerById, isLoading, error} = useSelector(state => state.buyer);

  useEffect(() => {
    dispatch(getBuyerById(id));
  }, [dispatch, id]);
  if(isLoading){
    return <Loader/>;
    
  }

  // if (error) {
  //   return (
  //     <View className="flex-1 bg-white justify-center items-center">
  //       <Text className="text-red-500">Error: {error}</Text>
  //     </View>
  //   );
  // }

  // if (!supplierById || supplierById.length === 0) {
  //   return (
  //     <View className="flex-1 bg-white justify-center items-center">
  //       <Text className="text-gray-500">No supplier data available.</Text>
  //     </View>
  //   );
  // }

  const buyer = buyerById[0];

  return (
    <View className="flex-1 bg-white">
      <ScrollView>
        <View className="flex justify-center items-center my-5">
          <View className="h-64 w-4/5 border-2 border-green-500 bg-green-500 rounded-t-lg flex justify-center items-center">
            <View className="border-0 py-2 px-5">
              {buyer?.buyer_image && (
                <Image
                  resizeMode="cover"
                  className="w-44 h-44 rounded-full bg-gray-200"
                  source={{
                    uri: `http://13.202.98.144:2000/${buyer.buyer_image}`,
                  }}
                />
              )}
            </View>
          </View>
          <View className="w-4/5 border-2 border-green-500 p-10 rounded-b-lg bg-white">
            <Text className="text-sm font-medium text-gray-700">
              <Text className="font-extrabold">User ID:</Text>{' '}
              {buyer?.buyer_id}
            </Text>
            <Text className="text-sm font-medium text-gray-700">
              <Text className="font-extrabold">Phone:</Text> {buyer?.phone}
            </Text>
            <Text className="text-sm font-medium text-gray-700">
              <Text className="font-extrabold">Address:</Text>{' '}
              {buyer?.address}
            </Text>
            <Text className="text-sm font-medium text-gray-700">
              <Text className="font-extrabold">Age:</Text> {buyer?.age}
            </Text>
            <Text className="text-sm font-medium text-gray-700">
              <Text className="font-extrabold">ID Proof Type:</Text>{' '}
              {buyer?.id_proof_type}
            </Text>
            <Text className="text-sm font-medium text-gray-700">
              <Text className="font-extrabold">ID Proof Number:</Text>{' '}
              {buyer?.id_proof_number}
            </Text>
            <Text className="text-sm font-medium text-gray-700">
              <Text className="font-extrabold">ID Proof Photo:</Text>
            </Text>

            <View className="h-64 w-50">
              {buyer?.id_proof_image && (
                <Image
                  resizeMode="cover"
                  className="h-48 w-full rounded bg-gray-200 mt-5"
                  source={{
                    uri: `http://13.202.98.144:2000/${buyer.id_proof_image}`,
                  }}
                />
              )}
            </View>
            <View className="">
              <Text className="text-sm font-medium text-gray-700">
                Buyer Signature:
              </Text>
              <View className="h-64 w-50">
                {buyer?.buyer_signature && (
                  <Image
                    resizeMode="contain"
                    className="w-50 h-64"
                    source={{
                      uri: buyer?.buyer_signature,
                    }}
                  />
                )}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default BuyerDetail;
