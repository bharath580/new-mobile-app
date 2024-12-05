import {
  View,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Image,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {RadioButton, Button as But} from 'react-native-paper';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import { useDispatch, useSelector } from 'react-redux';
import { addPhotoUri, getDropdownDetails, PurchaseDetail } from '../../features/purchase/purchaseSlice';
import Loader from '../Loader';
const NewPurchase = ({navigation}) => {
  const dispatch=useDispatch();
  const {dropdownDetails,isLoading } = useSelector(state => state.purchase);
  const {orderData } = useSelector(state => state.purchase);
  const {purchaseDetail } = useSelector(state => state.purchase.orderData);
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [selectedProcurementMode, setSelectedProcurementMode] = useState(purchaseDetail?.procurementMode );
  const [supplier, setSupplier] = useState(purchaseDetail?.supplierId);
  const [driver, setDriver] = useState(purchaseDetail?.driver);
  const [vehicle, setVehicle] = useState(purchaseDetail?.vehicle);
  const [selectedStartMeter, setSelectedStartMeter] = useState(purchaseDetail?.startMeterReading);
  const [selectedEndMeter, setSelectedEndMeter] = useState(purchaseDetail?.endMeterReading);
  const [photoOption, setPhotoOption] = useState(true);
  const [photoUri, setPhotoUri] = useState(purchaseDetail?.photoUri?purchaseDetail.photoUri:null);
  const cameraRef = useRef();
  const [startCamera, setStartCamera] = useState(false);
 
  useEffect(() => {
    checkPermission();
  }, []);
  useEffect(() => {
    console.log(vehicle)
  }, [vehicle]);
  useEffect(() => {
    dispatch(getDropdownDetails());
    // console.log('dropdownDetails',dropdownDetails)
    console.log('orderData',orderData)
    // console.log('dropdownDetails',dropdownDetails)
    // console.log('purchaseDetail?.supplierId',purchaseDetail?.supplierId)
    console.log('dropdownDetails?.supplier[0]',dropdownDetails.supplier?dropdownDetails.supplier[0].supplier_id:null)
  }, [dispatch]);
  useEffect(() => {
    // Set default values when dropdownDetails are fetched
    if (dropdownDetails?.supplier?.length > 0 && !supplier) {
      setSupplier(dropdownDetails.supplier[0].supplier_id);
    }
    if (dropdownDetails?.driver?.length > 0 && !driver) {
      setDriver(dropdownDetails.driver[0].driver_id);
    }
    if (dropdownDetails?.vehicle?.length > 0 && !vehicle) {
      setVehicle(dropdownDetails.vehicle[0].vehicle_id);
    }
  }, [dropdownDetails]);
  
  const checkPermission = async () => {
    const newCameraPermission = await Camera.requestCameraPermission();
    console.log(newCameraPermission);
  };
 
  const device = useCameraDevice('back');

  if(isLoading){
    return <Loader/>;
    
  }
  const handleStartMeterChange = e => {
    setSelectedStartMeter(e);
  };
  const handleEndtMeterChange = e => {
    setSelectedEndMeter(e);
  };
  const handlePhotoOptionChange = (itemValue, itemIndex) => {
    setPhotoOption(itemValue);
  };
  const takePhoto = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePhoto({});
        const result = await fetch(`file://${photo.path}`);
        const filePath = photo.path;
        setPhotoUri(photo.path);
        dispatch(addPhotoUri(photo.path))
        setStartCamera(false);
      } catch (err) {
        console.error('Failed to take photo', err);
      }
    }
  };
  const handleVehicle = (e)=>{
    setVehicle(e)
    console.log(vehicle)
  }
  const nextPage = () => {
    if (selectedProcurementMode == 1) {
      const data = {
        supplierId: supplier,
        // selectedSupplierId: selectedSupplierId,
        procurementMode: selectedProcurementMode,
        driver: driver,
        vehicle: vehicle,
        startMeterReading: selectedStartMeter,
        endMeterReading: selectedEndMeter,
        photoUri: photoUri,
      };

      dispatch(PurchaseDetail(data));
      navigation.navigate('PurchaseMaterial')

    } else {
      const data = {
        supplierId: supplier,
        procurementMode: selectedProcurementMode,
        vehicle: vehicle,
      };

      dispatch(PurchaseDetail(data));
      navigation.navigate('PurchaseMaterial')
    }
  };
  return (
    <>
      {!startCamera && (
        <SafeAreaView className="flex-1">
          <ScrollView>
            <View className=" m-4">
              <View className="flex-row justify-between items-center ">
                <Text className="font-extrabold text-lg">Supplier</Text>
                <TouchableOpacity >
                  <Button
                    className="bg-green-500"
                    title="New Supplier"
                    color="#22c55e"
                    onPress={() => {
                      navigation.navigate('NewSupplier')
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View className="border-b mt-2">
                <Picker
                  selectedValue={supplier}
                  onValueChange={(itemValue, itemIndex) =>
                    setSupplier(itemValue)
                  }>
                  {dropdownDetails.supplier &&dropdownDetails.supplier.map((item) => (
          <Picker.Item key={item.supplier_id} label={item.supplier_name} value={item.supplier_id} />
          // Assuming each item has an `id` and `name` property; adjust accordingly
        ))}
                </Picker>
              </View>
              <View className="mt-10">
                <View>
                  <Text className="font-extrabold text-lg">
                    Procurement Mode
                  </Text>
                </View>
                <View className="mt-2">
                  <RadioButton.Group
                    onValueChange={value => setSelectedProcurementMode(value)}
                    value={selectedProcurementMode}>
                    {/* Create individual radio buttons with labels */}
                    <View className="flex-row items-center justify-between ">
                      <Text>Pickup</Text>
                      <RadioButton value="1" color="green" />
                    </View>
                    <View className="flex-row items-center justify-between ">
                      <Text>Drop off</Text>
                      <RadioButton value="2" color="green" />
                    </View>
                  </RadioButton.Group>
                </View>
              </View>
              {selectedProcurementMode == '1' && (
                <View>
                  <Text className=" mt-2 text-lg font-extrabold">
                    Pickup Details
                  </Text>
                  <View className="mt-2 border border-gray-500 rounded p-3 flex flex-col">
                    <View className="border-b mt-2">
                      <Text className="text-lg font-semibold">Driver Name</Text>
                      <Picker
                        selectedValue={driver}
                        onValueChange={(itemValue, itemIndex) =>
                          setDriver(itemValue)
                        }>
                      {dropdownDetails.driver && dropdownDetails.driver.map((item) => (
          <Picker.Item key={item.driver_id} label={item.driver_name} value={item.driver_id} />
          // Assuming each item has an `id` and `name` property; adjust accordingly
        ))}
                      </Picker>
                    </View>
                    <View className="border-b mt-3">
                      <Text className="text-lg font-semibold">
                        Vehicle Number
                      </Text>
                      <Picker
                        selectedValue={vehicle}
                        onValueChange={(itemValue, itemIndex) =>
                          setVehicle(itemValue)
                        }>
                        {dropdownDetails.vehicle && dropdownDetails.vehicle.map((item) => (
          <Picker.Item key={item.vehicle_id} label={item.vehicle_number} value={item.vehicle_id} />
          // Assuming each item has an `id` and `name` property; adjust accordingly
        ))}
                      </Picker>
                    </View>
                    <View className=" mt-3">
                      <Text className="text-lg font-semibold">
                        Start Meter Reading
                      </Text>
                      <TextInput
                        value={selectedStartMeter}
                        onChangeText={handleStartMeterChange}
                        name="startMeter"
                        className="border mt-2 h-10 pl-2"
                        keyboardType="numeric"
                      />
                    </View>

                    <View className=" mt-3">
                      <Text className="text-lg font-semibold">
                        End Meter Reading
                      </Text>
                      <TextInput
                        onChangeText={handleEndtMeterChange}
                        className="border mt-2 h-10 pl-2"
                        keyboardType="numeric"
                        value={selectedEndMeter}
                      />
                    </View>
                  </View>
                  <View className="mt-2">
                    <View className="flex-row items-center justify-between mx-2 my-2">
                      <Text className=" text-lg font-extrabold mb-2">
                        Supplier Signature
                      </Text>
                      <TouchableOpacity>
                        <Button
                          className="bg-green-500 hover:bg-green-700 font-bold py-[5rem] px-3 rounded ml-4"
                          textColor="white"
                          disabled={photoOption}
                          color="#22c55e"
                          title="Click Photo"
                          onPress={() => setStartCamera(true)}
                        />
                      </TouchableOpacity>
                    </View>
                    <View>
                      <RadioButton.Group
                        onValueChange={handlePhotoOptionChange}
                        value={photoOption}>
                        {/* Create individual radio buttons with labels */}
                        <View className="flex-row items-center justify-between mx-2">
                          <Text>Yes</Text>
                          <RadioButton value={false} color="green" />
                        </View>
                        <View className="flex-row items-center justify-between mx-2">
                          <Text>No</Text>
                          <RadioButton value={true} color="green" />
                        </View>
                      </RadioButton.Group>
                    </View>
                  </View>
                  {photoUri && (
                    <View className="flex-1 mx-1 my-1">
                      <Image
                        className="w-full h-64 border rounded"
                        source={{uri: `file://${photoUri}`}}
                        style={{flex: 1, resizeMode: 'cover'}}
                      />
                    </View>
                  )}
                </View>
              )}
                {selectedProcurementMode == '2' && (
                  <View className="mt-10">
                  <View>
                    <Text className="font-extrabold text-lg">
                      Vehicle Number
                    </Text>
                    <TextInput className='border mt-3'
                     value={vehicle}   onChangeText={handleVehicle}     />
                  </View>
                  </View>
                )}
            </View>
          </ScrollView>
          <View>
            <TouchableOpacity disabled={!selectedProcurementMode}>
              <But
                className="bg-green-500 py-2 px-3 text-white text-lg hover:bg-green-700
font-bold rounded w-full "
                textColor="white"
                disabled={!selectedProcurementMode}
                title=""
                onPress={nextPage}
                >
                Next {'>'}
              </But>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      )}
      {startCamera && (
        <SafeAreaView className="flex-1">
          <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            ref={cameraRef}
            photo={true}
          />
          <View style={styles.buttonContainer}>
            <Button title="Take Photo" onPress={takePhoto} />
          </View>
        </SafeAreaView>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
});
export default NewPurchase;
