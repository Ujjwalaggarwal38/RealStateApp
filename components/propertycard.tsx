import { View, Text, Image, StyleSheet } from 'react-native';

type PropertyCardProps = {
  description: string;
  image: string;
};

export default function PropertyCard({ description, image }: PropertyCardProps) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.text}>
        <Text style={styles.description}>
          {description}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    marginHorizontal: 16,
    borderRadius: 16,
    backgroundColor: '#f9f9f9',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  text: {
    padding: 12,
  },
  description: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
});
