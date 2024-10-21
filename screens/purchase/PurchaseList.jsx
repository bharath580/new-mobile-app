import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
const PurchaseList = ({navigation}) => {
  return (
    <View className="flex-1">
      <TouchableOpacity>
        <View className="border border-gray-300 h-24 flex-row justify-between items-center">
          <View className="ml-2">
            <Text>PO123</Text>
            <Text>Quantity: 300kg</Text>
          </View>
          <View className="mr-2">
            <Text>4.30 PM</Text>
            <Text>28 Mar</Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View className="border border-gray-200 h-24 flex-row justify-between items-center">
          <View className="ml-2">
            <Text>PO123</Text>
            <Text>Quantity: 300kg</Text>
          </View>
          <View className="mr-2">
            <Text>4.30 PM</Text>
            <Text>28 Mar </Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity className="absolute bottom-20 right-16 bg-green-600 p-5 rounded-full" onPress={()=>navigation.navigate('NewPurchase')}>
        <View>
          <Icon name="plus" size={30} color="white" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PurchaseList;
