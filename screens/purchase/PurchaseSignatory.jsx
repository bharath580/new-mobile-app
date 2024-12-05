import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Signature from "react-native-signature-canvas";
const PurchaseSignatory=({navigation, route})=> {
    const {signatureType, handleSignature} = route.params;
    const [signature, setSignature] = useState(null);
    useEffect(() => {
      if (signature) {
        handleSignature(signatureType, signature);
        navigation.goBack();
      }
    }, [signature]);
    const handleOK = base64DataUrl => {
      // Handle the captured signature (base64 encoded image)
      setSignature(base64DataUrl);
    };
    const style = `.m-signature-pad--footer
      .button {
        background-color: red;
        color: #FFF;
      }`;
    return (
      <>
        <View className="flex-1 items-center justify-center">
          <Signature
            onOK={handleOK}
            descriptionText={`${signatureType} Signature`}
            clearText="Clear"
            confirmText="Save"
            style={{height: '80%'}}
          />
        </View>
      </>
    );
  }
  export default PurchaseSignatory;