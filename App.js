import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, Touchable, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [ buttonOn, setButtonON] = useState (true);


  const getBarCodeScannerPermissions = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
        if (hasPermission === false) {
            return Alert.alert('El escaner no es posible sin permisos de camara'); }
        
        if( buttonOn === true ){
          return setButtonON(false);
          
        }
  };


  const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        alert(`Código de barra tipo: ${type}  Los datos son: ${data}`);
  };


  return (
    <View style = {styles.container}>
        {
         (hasPermission === true && buttonOn === false)
          ?
           <>
              <View style = {styles.barCodeBox} >
                <View style = {styles.barCodeBox2}>
                    <BarCodeScanner style = {styles.visorBox}
                      onBarCodeScanned={scanned ? undefined : handleBarCodeScanned }
                    />
                </View>

                <View style = {styles.buttonFooter}>
                {scanned && <Button title={'Clic para escanear de nuevo'} onPress={() => setScanned(false)} />}
                </View>  
                    
              </View>
             
          </>
          :
            <TouchableOpacity style = {styles.scanButton}
              onPress = {getBarCodeScannerPermissions}
            >
              <Text style = {styles.buttonText} >   Comenzar a escanear  </Text>
            </TouchableOpacity>           
        }

        

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8EA',
    justifyContent: "center",
    alignItems: 'center',
    
  },
 
  barCodeBox: {
    
    alignItems: 'center',
    justifyContent: 'center',
    height: 380,
    width: 300,
    backgroundColor: '#fff',
    borderWidth:3,
    borderColor: '#594545',
    overflow: 'hidden',
    borderRadius: 8,
    paddingBottom:70, 
  },
  barCodeBox2: {
    
    alignItems: 'center',
    justifyContent: 'center',
    height: 280,
    width: 280,
    overflow: 'hidden',
    borderRadius: 30, 
  },
  buttonFooter:{
    
  },
  visorBox:{
    height: 400,
    width: 400,
  },
  scanButton:{
    alignItems:'center',
    backgroundColor: '#3d3935',
    padding: 10,
    borderRadius:15
  }, 
  buttonText: {
    fontSize:15,
    color: '#FFF'
  }
});