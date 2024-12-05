import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Picker } from '@react-native-picker/picker';
import { addMaterialType, addOperator, getbaleMaterial } from '../../features/bale/baleSlice';
import { Button } from 'react-native-paper';
import Loader from '../Loader';

const NewBale = ({navigation}) => {
    const dispatch = useDispatch();
    const [materialDetails, setMaterialDetails] = useState();
    // const [bale, setBale] = useState();
    const [isSelected, setSelection] = useState(false);
    const {balingMaterial,operators} = useSelector(state => state.bale.baleMaterial);
    const {isLoading} = useSelector(state => state.bale);
    const [isChecked, setIsChecked] = useState(false);
    const [bale, setBale] = useState();
    const [operator, setOperator] = useState();
    // const operators=['Karthi','Sabari']
  
    useEffect(() => {
      dispatch(getbaleMaterial());
      console.log('balingMaterial', balingMaterial);
      // console.log("use effect",materialList[0].purchaseAndMaterial)
    }, [dispatch]);
    if(isLoading){
      return <Loader/>;
      
    }
    const handleMaterialChange = (value, index) => {
      console.log('value', value);
      // const {po_id,material_id}=value
      setBale(value);
      dispatch(addMaterialType(value))
    };
    const handleCheckboxChange = () => {
      setIsChecked(!isChecked);
    };
   const handleOperatorChange=(value)=>{
    console.log('value', value);

    setOperator(value)
    dispatch(addOperator(value))

    }
    return (
      <>
      <View className="mx-2 my-4 flex-1  rounded p-4 flex flex-col">
        <View className="border-b">
          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-semibold">Operator</Text>
          </View>
          <Picker
            selectedValue={operator}
            onValueChange={value => handleOperatorChange(value)}>
            {operators &&
              operators.map((data, i) => (
                <Picker.Item
                  key={i}
                  name={i}
                  label={`${data.operator_name}`}
                  value={data.operator_id}
                />
              ))}
          </Picker>
        </View>
        <View className="border-b mt-6">
          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-semibold">Bale Material</Text>
          </View>
          <Picker
            selectedValue={bale}
            onValueChange={value => handleMaterialChange(value)}>
            {balingMaterial &&
              balingMaterial.map((data, i) => (
                <Picker.Item
                  key={i}
                  name={i}
                  label={`(${data.name})`}
                  value={data.id}
                />
              ))}
          </Picker>
        </View>
      </View>
  
     
  
         <TouchableOpacity>
         <Button
           className="bg-green-500 text-lg hover:bg-green-700
  font-bold py-2 px-3 rounded w-full "
           textColor="white"  onPress={() =>
            navigation.navigate('BaleMaterial')
          }>
       
           Next {'>'}
         </Button>
       </TouchableOpacity>
       </>
    )
}

export default NewBale