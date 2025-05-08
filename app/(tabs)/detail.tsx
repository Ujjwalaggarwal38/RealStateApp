import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as Location from 'expo-location';
import { useState, useEffect } from 'react';
import { Image } from 'react-native';

type Cordinates= {
  latitude:number,
  longitude:number
}
export default function DetailsScreen() {
  const router = useRouter();
  const { id, latitude, longitude, description, image } = useLocalSearchParams();
  const [userLocation, setUserLocation] = useState<Cordinates>();
  const [locationError, setLocationError] = useState("");

  useEffect(() => {
    async function getLocation() {
      const permission = await Location.requestForegroundPermissionsAsync();
      if (permission.status !== 'granted') {
        setLocationError('Permission denied');
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    }
  
    getLocation();
  }, []);

  const userLatitude = userLocation?.latitude || 0;
  const userLongitude = userLocation?.longitude || 0;
  const homeLatitude = parseFloat(latitude as string);
  const homeLongitude = parseFloat(longitude as string);

  const closeEnough = Math.abs(userLatitude - homeLatitude) < 0.01 && Math.abs(userLongitude - homeLongitude) < 0.01;

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />
        <TouchableOpacity onPress={() => router.push('/home')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.description}>
        <Text style={styles.description1}>{description}</Text>

        {userLocation ? (
          closeEnough ? (
            <TouchableOpacity style={styles.button}>
              <Text style={styles.btnText}>Unlock Home</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.farError}>You are too far to unlock this home</Text>
          )
        ) : locationError ? (
          <Text style={styles.error}>{locationError}</Text>
        ) : (
          <Text style={styles.loading}>Getting your location...</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff2e6',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 280,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  description: {
    padding: 20,
  },
  description1: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FFA500',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  farError: {
    textAlign: 'center',
    marginTop: 20,
    color: '#d9534f',
    fontWeight: 'bold',
  },
  loading: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  },
  error: {
    textAlign: 'center',
    color: 'red',
    marginTop: 20,
  },
});
