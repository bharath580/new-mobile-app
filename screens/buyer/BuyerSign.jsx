import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Signature from 'react-native-signature-canvas';
import {Button} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import { addSupplierSign, supplierPost } from '../../features/supplier/supplierSlice';
import { addBuyerSign, buyerPost } from '../../features/buyer/buyerSlice';


const BuyerSign = ({navigation}) => {
  const dispatch = useDispatch();
  const [signature, setSignature] = useState(null);
  const signatureRef = useRef(null);
  const { orderData} = useSelector(
    state => state.buyer
  );
  useEffect(()=>{
    // console.log('orderData',orderData)
  })
  const handleEnd = async () => {
    if (signatureRef.current) {
      const signatureData = await signatureRef.current.readSignature();
      console.log('signature handle end', signatureData);
      if (signatureData) setSignature(signatureData);
    } else {
      console.error('Signature ref is not available');
    }
  };

  const handleOK = async base64DataUrl => {
    try {
      setSignature(base64DataUrl);
      console.log('handle ok', base64DataUrl); // Use base64DataUrl directly
      dispatch(addBuyerSign(base64DataUrl)); // Dispatch with the provided data
      console.log('action');
    } catch (error) {
      console.error('Error during dispatch:', error);
    }
  };

  const handleChange = signatureData => {
    setSignature(signatureData); // Update signature whenever it changes
  };

  const handleNext = async () => {
    try {
      // If signature is not yet captured, trigger readSignature
      if (!signature && signatureRef.current) {
        const signatureData = await signatureRef.current.readSignature(); // this is trigger the handleOk function
      }
      // Navigate to the next screen, passing the signature data

      // dispatch(balePostData(orderData));

      await dispatch(buyerPost(orderData)).unwrap();
      navigation.navigate('Buyer');
    } catch (e) {
      console.log(e);
    }
  };

  // Custom web style to hide Clear and Save buttons
  const style = `
      .m-signature-pad--footer {
        display: none; 
      }
      body,html {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
      }
    `;

  return (
    <>
      <View className="flex-1 items-center justify-center m-5 border border-black">
        <Signature
          ref={signatureRef} // Attach ref to Signature component
          onOK={handleOK}
          onEnd={handleEnd}
          descriptionText="Please sign below"
          webStyle={style}
        />
      </View>
      <TouchableOpacity>
        <Button
          className="bg-green-500 text-lg hover:bg-green-700 font-bold py-2 px-3 rounded w-full"
          textColor="white"
          onPress={handleNext}>
          Submit
        </Button>
      </TouchableOpacity>
    </>
  );
};

export default BuyerSign;
