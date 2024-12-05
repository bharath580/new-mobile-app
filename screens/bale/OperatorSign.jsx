import { View, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Signature from 'react-native-signature-canvas';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { addOperatorSign } from '../../features/bale/baleSlice';

const OperatorSign = ({ navigation }) => {
  const dispatch = useDispatch()
  const {orderData} = useSelector(state => state.bale);
useEffect(()=>{
  console.log('order',orderData)
},[])
  const [signature, setSignature] = useState(null);
  const signatureRef = useRef(null);

  const handleOK = (base64DataUrl) => {
    console.log('Entered')
    setSignature(base64DataUrl);
    console.log(signature)
    dispatch(addOperatorSign(base64DataUrl))
 

  };


  const handleNext = async () => {
    try {
      // Read the signature
      const signatureData = await signatureRef.current.readSignature();
      setSignature(signatureData);
      dispatch(addOperatorSign(signatureData));

      // Navigate to the next screen
      navigation.navigate('SupervisorSign');
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
          onEnd={() => console.log('User ended signing')}
          descriptionText="Please sign below"
          webStyle={style}
        />
      </View>
      <TouchableOpacity>
        <Button
          className="bg-green-500 text-lg hover:bg-green-700 font-bold py-2 px-3 rounded w-full"
          textColor="white"
          onPress={handleNext}
        >
          Next {'>'}
        </Button>
      </TouchableOpacity>
    </>
  );
};

export default OperatorSign;
