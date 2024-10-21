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
const NewPurchase = ({navigation}) => {
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [selectedProcurementMode, setSelectedProcurementMode] = useState();
  const [selectedStartMeter, setSelectedStartMeter] = useState();
  const [selectedEndMeter, setSelectedEndMeter] = useState();
  const [photoOption, setPhotoOption] = useState(true);
  const [photoUri, setPhotoUri] = useState(null);
  const cameraRef = useRef();
  const [startCamera, setStartCamera] = useState(false);

  useEffect(() => {
    checkPermission();
  }, []);
  const checkPermission = async () => {
    const newCameraPermission = await Camera.requestCameraPermission();
    console.log(newCameraPermission);
  };
  const device = useCameraDevice('front');
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
        setStartCamera(false);
      } catch (err) {
        console.error('Failed to take photo', err);
      }
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
                <TouchableOpacity>
                  <Button
                    className="bg-green-500"
                    title="New Supplier"
                    color="#22c55e"
                    onPress={() => {
                      // Handle new supplier creation
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View className="border-b mt-2">
                <Picker
                  selectedValue={selectedLanguage}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedLanguage(itemValue)
                  }>
                  <Picker.Item label="Java" value="java" />
                  <Picker.Item label="JavaScript" value="js" />
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
                        selectedValue={selectedLanguage}
                        onValueChange={(itemValue, itemIndex) =>
                          setSelectedLanguage(itemValue)
                        }>
                        <Picker.Item label="Java" value="java" />
                        <Picker.Item label="JavaScript" value="js" />
                      </Picker>
                    </View>
                    <View className="border-b mt-3">
                      <Text className="text-lg font-semibold">
                        Vehicle Number
                      </Text>
                      <Picker
                        selectedValue={selectedLanguage}
                        onValueChange={(itemValue, itemIndex) =>
                          setSelectedLanguage(itemValue)
                        }>
                        <Picker.Item label="Java" value="java" />
                        <Picker.Item label="JavaScript" value="js" />
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
                onPress={()=>navigation.navigate('PurchaseMaterial')}
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
