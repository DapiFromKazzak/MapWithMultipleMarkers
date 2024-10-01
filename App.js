import Map from './screens/Map';
import { useEffect, useState } from 'react';
import { PaperProvider } from 'react-native-paper';
import * as Location from 'expo-location'

export default function App() {

  const [location, setLocation] = useState({
    latitude: 65.0800,
    longitude: 25.4800,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  })

  useEffect(() => {
    getUserLocation()
  }, [])
  
  const getUserLocation = async () => {
    let  { status }  = await Location.requestForegroundPermissionsAsync()

    try {
      if (status !== 'granted') {
        console.log("Geolocation not granted")
        return
      }

      const position = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High})
      setLocation({...location,"latitude":position.coords.latitude,"longitude":position.coords.longitude})
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <PaperProvider>
      <Map location={location} />
    </PaperProvider>
  );
}

