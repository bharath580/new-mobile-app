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
              source={require('../assets/purchase.jpeg')}
            />
            <Text className="text-black">Purchase</Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-1/2 h-72 border border-gray-300 items-center justify-center">
            <Image
              resizeMode="contain"
              style={{width: 60, height: 70}}
              source={require('../assets/purchase.jpeg')}
            />
            <Text className="text-black">Batch</Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-1/2 h-72 border border-gray-300 items-center justify-center">
            <Image
              resizeMode="contain"
              style={{width: 60, height: 70}}
              source={require('../assets/purchase.jpeg')}
            />
            <Text className="text-black">Segregation</Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-1/2 h-72 border border-gray-300 items-center justify-center">
            <Image
              resizeMode="contain"
              style={{width: 60, height: 70}}
              source={require('../assets/purchase.jpeg')}
            />
            <Text className="text-black">Baling</Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-1/2 h-72 border border-gray-300 items-center justify-center">
            <Image
              resizeMode="contain"
              style={{width: 60, height: 70}}
              source={require('../assets/purchase.jpeg')}
            />
            <Text className="text-black">Sale</Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-1/2 h-72 border border-gray-300 items-center justify-center">
            <Image
              resizeMode="contain"
              style={{width: 60, height: 70}}
              source={require('../assets/purchase.jpeg')}
            />
            <Text className="text-black">Bluetooth Scale</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
    </>
  );
};

export default Home;
