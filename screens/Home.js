import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Demo from './Demo';
const Drawer = createDrawerNavigator();
const Home = ({navigation}) => {
  return (
    <>   
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <View className="flex-row flex-wrap">
          <TouchableOpacity className="w-1/2 h-72 border border-gray-300 items-center justify-center"
          onPress={()=>{navigation.navigate('Purchase')}}>
            <Image
              resizeMode="contain"
              style={{width: 60, height: 70}}
              source={require('../assets/shopping.png')}
            />
            <Text className="text-black text-lg">Purchase</Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-1/2 h-72 border border-gray-300 items-center justify-center"
          onPress={()=>{navigation.navigate('Batch')}}>
            <Image
              resizeMode="contain"
              style={{width: 60, height: 70}}
              source={require('../assets/batch.png')}
            />
            <Text className="text-black text-lg">Batch</Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-1/2 h-72 border border-gray-300 items-center justify-center"
          onPress={()=>{navigation.navigate('Segregation')}}>
            <Image
              resizeMode="contain"
              style={{width: 60, height: 70}}
              source={require('../assets/segregation.png')}
            />
            <Text className="text-black text-lg">Segregation</Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-1/2 h-72 border border-gray-300 items-center justify-center"
          onPress={()=>{navigation.navigate('BaleList')}}>
            <Image
              resizeMode="contain"
              style={{width: 60, height: 70}}
              source={require('../assets/bale.png')}
            />
            <Text className="text-black text-lg">Baling</Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-1/2 h-72 border border-gray-300 items-center justify-center"
           onPress={()=>{navigation.navigate('SaleList')}}>
            <Image
              resizeMode="contain"
              style={{width: 60, height: 70}}
              source={require('../assets/sale.png')}
            />
            <Text className="text-black text-lg">Sale</Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-1/2 h-72 border border-gray-300 items-center justify-center">
            <Image
              resizeMode="contain"
              style={{width: 60, height: 70}}
              source={require('../assets/bluetooth.png')}
            />
            <Text className="text-black text-lg">Bluetooth Scale</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
    </>
  );
};

export default Home;
