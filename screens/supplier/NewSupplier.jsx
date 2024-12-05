import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Button as But,
  Image,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Button} from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { addData } from '../../features/supplier/supplierSlice';

const NewSupplier = ({navigation}) => {
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();
  const [age, setAge] = useState();
  const [idProofType, setIdProoftype] = useState();
  const [idProofNumber, setIdProofNumber] = useState();
  const [bankAccountNumber, setBankAccountNumber] = useState();
  const [idProofPhoto, setIdProofPhoto] = useState();
  const [supplier, setSupplierPhoto] = useState();
  const dispatch= useDispatch()

  useEffect(() => {
    console.log(name);
    console.log(age);
    console.log(phone);
    console.log(address);
  }, [name]);
  // Capture photo and navigate back
  const handleCapturePhoto = type => {
    navigation.navigate('Camera', {
      photoType: type,
      onPhotoTaken: photoUri => {
        if (type === 'idProof') {
          setIdProofPhoto(photoUri);
          console.log(photoUri)
        } else {
          setSupplierPhoto(photoUri);
        }
      },
    });
  };

  const handleSubmit =()=>{
    const data ={
      supplier_name:name,
      address:address,
      age:age,
      phone:phone,
      id_proof_type: idProofType,
      id_proof_number: idProofNumber,
      bank_account_number:bankAccountNumber,
      id_proof_image: idProofPhoto,
      supplier_image: supplier
    }
    dispatch(addData(data))
    navigation.navigate('SupplierSign')
  }
  return (
    <>
      <ScrollView>
        <View className=" mt-5 mx-5">
          <View className="my-3">
            <Text className="text-lg font-semibold">
              Name<Text className="text-red-500">*</Text>
            </Text>
            <TextInput
              value={name}
              onChangeText={e => setName(e)}
              name="name"
              className="border mt-2 h-10 pl-2"
              placeholder="Enter name"
            />
          </View>
          <View className="my-3">
            <Text className="text-lg font-semibold">
              Address<Text className="text-red-500">*</Text>
            </Text>
            <TextInput
              value={address}
              onChangeText={e => setAddress(e)}
              name="age"
              className="border mt-2 h-10 pl-2"
              placeholder="Enter address"
            />
          </View>
          <View className="my-3">
            <Text className="text-lg font-semibold">Phone</Text>
            <TextInput
              value={phone}
              onChangeText={e => setPhone(e)}
              name="phone"
              className="border mt-2 h-10 pl-2"
              placeholder="Enter phone"
              keyboardType="numeric"
            />
          </View>
          <View className="my-3">
            <Text className="text-lg font-semibold">Age</Text>
            <TextInput
              value={age}
              onChangeText={e => setAge(e)}
              name="age"
              className="border mt-2 h-10 pl-2"
              placeholder="Enter age"
              keyboardType="numeric"
            />
          </View>
          <View className="my-3">
            <Text className="text-lg font-semibold">ID Proof Type</Text>
            <TextInput
              value={idProofType}
              onChangeText={e => setIdProoftype(e)}
              name="idProofType"
              className="border mt-2 h-10 pl-2"
              placeholder="Enter Id Proof Type"
            />
          </View>
          <View className="my-3">
            <Text className="text-lg font-semibold">ID Proof Number</Text>
            <TextInput
              value={idProofNumber}
              onChangeText={e => setIdProofNumber(e)}
              name="idProofNumber"
              className="border mt-2 h-10 pl-2"
              placeholder="Enter Proof Number"
            />
          </View>
          <View className="my-3">
            <Text className="text-lg font-semibold">Bank Account Number</Text>
            <TextInput
              value={bankAccountNumber}
              onChangeText={e => setBankAccountNumber(e)}
              name="bankAccountNumber"
              className="border mt-2 h-10 pl-2"
              placeholder="Enter Bank Account Number"
              keyboardType="numeric"
            />
          </View>
          <View className="my-3">
            <Text className="text-lg font-semibold">ID Proof Photo</Text>
            <View className="flex-1 mx-1 my-1">
            {idProofPhoto && (
                    <View className="flex-1  my-1">
                      <Image
                        className="w-1/2 h-64 border rounded"
                        source={{uri: `file://${idProofPhoto}`}}
                        style={{flex: 1, resizeMode: 'cover'}}
                      />
                    </View>
                  )}
                  </View>
            <TouchableOpacity>
              <Button
                className="bg-green-500 text-lg hover:bg-green-700
font-bold rounded w-32 mt-1"
                textColor="white"
                onPress={() => handleCapturePhoto('idProof')}>
                click photo
              </Button>
            </TouchableOpacity>
          </View>
          <View className="my-3">
            <Text className="text-lg font-semibold">Supplier Photo</Text>
            <View className="flex-1  my-1">
             {supplier && (
                    <View className="flex-1 mx-1 my-1">
                      <Image
                        className="w-1/2 h-64 border rounded"
                        source={{uri: `file://${supplier}`}}
                        style={{flex: 1, resizeMode: 'cover'}}
                      />
                    </View>
                  )}
                  </View>
            <TouchableOpacity>
              <Button
                className="bg-green-500 text-lg hover:bg-green-700
font-bold rounded w-32 mt-1"
                textColor="white"
                onPress={() => handleCapturePhoto('supplier')}>
                click photo
              </Button>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        disabled={!name || !address}
          onPress={handleSubmit}
        className={`w-full py-3 px-3 rounded ${
          !name || !address ? 'bg-green-300' : 'bg-green-500'
        }`}
        
        >
        <Text
          className={`text-lg font-bold text-center ${
            !name || !address ? 'text-white' : 'text-white'
          }`}>
          Next {'>'}
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default NewSupplier;
