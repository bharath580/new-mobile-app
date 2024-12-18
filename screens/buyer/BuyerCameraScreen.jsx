import React, { useState, useEffect, useRef } from 'react';
import { View, Button, Text, LogBox } from 'react-native';
import { Camera, useCameraDevice, useCameraDevices } from 'react-native-vision-camera';

const BuyerCameraScreen = ({ navigation, route }) => {
  const { photoType,onPhotoTaken } = route.params;
  const [photo, setPhoto] = useState(null);
  const devices = useCameraDevices();
//   const device = devices.back; // Use the back camera
const cameraRef = useRef();

  useEffect(() => {
    checkPermission();
    LogBox.ignoreAllLogs();
  }, []);
  const checkPermission = async () => {
    const newCameraPermission = await Camera.requestCameraPermission();
    console.log(newCameraPermission);
  };
//   if (!device) {
//     return <Text>Loading camera...</Text>;
//   }
const device = useCameraDevice('back');
const takePicture = async () => {
  if (device && cameraRef.current) {
    try {
      const photo = await cameraRef.current.takePhoto({});
      console.log("Photo taken:", photo.path);
      setPhoto(photo.path);
      onPhotoTaken(photo.path); // Send the photo URI back to the previous screen
      navigation.goBack(); // Navigate back after taking the photo
    } catch (error) {
      console.error("Error taking photo:", error);
    }
  } else {
    console.log("Camera device not ready.");
  }
};

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        device={device}
            isActive={true}
            ref={cameraRef}
            photo={true}
      />
      <Button title="Take Photo" onPress={takePicture} />
    </View>
  );
};

export default BuyerCameraScreen;
