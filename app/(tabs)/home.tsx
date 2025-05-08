import { View, FlatList, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import PropertyCard from '@/components/propertycard';
import { Link } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { StyleSheet } from 'react-native';

type Property = {
  id: string;
  description: string;
  imagerUrl: string;
  latitude: string,
  longitude: string
};

const fetchProperty = async (): Promise<Property[]> => {
  const res = await fetch('https://678f678849875e5a1a91b27f.mockapi.io/houses');
  if (!res.ok) throw new Error('Network response was not ok');
  return res.json();
};

export default function HomeScreen() {
  const { data, isLoading, error } = useQuery<Property[]>({
    queryKey: ['property'],
    queryFn: fetchProperty,
  });

  if (isLoading) {
    return <ActivityIndicator style={styles.loading} />;
  }

  if (error) {
    return <Text style={styles.error}> Failed to load properties.</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href={{ pathname: '/detail',  params: {
            id: item.id,
            latitude: item.latitude,
            longitude: item.longitude,
            description: item.description,
            image: item.imagerUrl
          }}}
           asChild>
            <TouchableOpacity>
              <PropertyCard description={item.description} image={item.imagerUrl} />
            </TouchableOpacity>
          </Link>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop:30,
    backgroundColor:'#ffd9b3'
  },
  error: {
    color: 'red',
     textAlign: 'center',
      marginTop: 50 
  },
  loading:{
    marginTop: 50 
  }
});