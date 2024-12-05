import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Button as But
} from 'react-native';
import Zeroconf from 'react-native-zeroconf';
import {useDispatch, useSelector} from 'react-redux';
import {addBuyer, addVehicle, getBuyerList} from '../../features/sale/saleSlice';
import {Picker} from '@react-native-picker/picker';
import { Button } from 'react-native-paper';

const NewSale = ({navigation}) => {
  const [buyer, setBuyer] = useState();
  const [printers, setPrinters] = useState([]); // To store discovered printers
  // const zeroconf = new Zeroconf();
  const [vehicle, setVehicle] = useState();

  const dispatch = useDispatch();
  const {buyerList} = useSelector(state => state.sale);
  
  useEffect(() => {
    dispatch(getBuyerList());
    console.log('buyerList', buyerList);
  }, [dispatch]);
  const handleVehicle = (e)=>{
    setVehicle(e)
    dispatch(addVehicle(e))
    console.log(e)
  }
  const handleBuyer = (e)=>{
    setBuyer(e)
    dispatch(addBuyer(e))
    console.log(e)
  }
  const nextPage = () => {
    // if (selectedProcurementMode == 1) {
    //   const data = {
    //     supplierId: supplier,
    //     // selectedSupplierId: selectedSupplierId,
    //     procurementMode: selectedProcurementMode,
    //     driver: driver,
    //     vehicle: vehicle,
    //     startMeterReading: selectedStartMeter,
    //     endMeterReading: selectedEndMeter,
    //     photoUri: photoUri,
    //   };

    //   dispatch(PurchaseDetail(data));
    //   navigation.navigate('PurchaseMaterial')

    // } else {
    //   const data = {
    //     supplierId: supplier,
    //     procurementMode: selectedProcurementMode,
    //     vehicle: vehicle,
    //   };

      // dispatch(PurchaseDetail(data));
      // navigation.navigate('PurchaseMaterial')
    // }
      navigation.navigate('SaleMaterial')

  };
  return (
    <>
      <ScrollView>
        <View className="m-4">
          <View className="flex-row justify-between items-center">
            <Text className="font-extrabold text-lg">Buyer</Text>
            <TouchableOpacity>
              <But
                className="bg-green-500"
                title="New Buyer"
                color="#22c55e"
                onPress={() => {
                  // Handle new buyer creation
                }}
              />
            </TouchableOpacity>
          </View>
          <View className="border-b mt-2">
            <Picker
              selectedValue={buyer}
              onValueChange={handleBuyer}>
              {buyerList &&
                buyerList.map(item => (
                  <Picker.Item
                    key={item.buyer_id}
                    label={item.buyer_name}
                    value={item.buyer_id}
                  />
                  // Assuming each item has an `id` and `name` property; adjust accordingly
                ))}
            </Picker>
          </View>
          <View className="mt-8">
            <View>
              <Text className="font-extrabold text-lg">Vehicle Number</Text>
              <TextInput
                className="border mt-3"
                value={vehicle}
                onChangeText={handleVehicle}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity>
        <Button
          className="bg-green-500 text-lg hover:bg-green-700
   font-bold py-2 px-3 rounded w-full "
          textColor="white"
          onPress={nextPage}>
          Next {'>'}
        </Button>
      </TouchableOpacity>
    </>
  );
};

export default NewSale;
