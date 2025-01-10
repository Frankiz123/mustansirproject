import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';

interface IItemCard {
  onPress: () => void;
  item: {
    title: string;
    price: string;
    thumbnail: string;
    link: string;
    source: string;
    delivery: string;
    discount: string;
    email_discount: string;
    email_coupon_code: string;
  };
}

const ItemCard: React.FC<IItemCard> = ({item, onPress}) => {
  const handleBuyNowPress = () => {
    if (item.link) {
      Linking.openURL(item.link).catch(err =>
        console.error('Failed to open URL:', err),
      );
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Image source={{uri: item?.thumbnail}} style={styles.image} />
        <Text style={styles.title}>{item?.title}</Text>
        <TouchableOpacity style={styles.buyButton} onPress={handleBuyNowPress}>
          <Text style={styles.buyButtonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitle}>{item?.source}</Text>

      <Text style={styles.label}>
        <Text style={styles.boldLabel}>Price: </Text>
        <Text style={styles.price}>{item.price}</Text>
      </Text>

      {item.delivery && (
        <Text style={styles.label}>
          <Text style={styles.boldLabel}>Delivery: </Text>
          {item.delivery}
        </Text>
      )}

      <View style={styles.infoContainer}>
        <Text style={styles.info}>
          <Text style={styles.boldLabel}>Discount: </Text>
          {item.discount || 'Not Available'}
        </Text>
        <Text style={styles.info}>
          <Text style={styles.boldLabel}>Email Discount: </Text>
          {item.email_discount || 'Not Available'}
        </Text>
        <Text style={styles.info}>
          <Text style={styles.boldLabel}>Coupon Code: </Text>
          {item.email_coupon_code || 'Not Available'}
        </Text>
      </View>
    </View>
  );
};

export default ItemCard;

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
    resizeMode: 'contain',
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 12,
  },
  buyButton: {
    backgroundColor: '#FF6F00',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginVertical: 4,
    textDecorationLine: 'underline',
  },
  label: {
    fontSize: 14,
    color: '#444',
  },
  boldLabel: {
    fontWeight: 'bold',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6F00',
  },
  delivery: {
    fontSize: 14,
    color: '#888',
  },
  infoContainer: {
    marginTop: 8,
  },
  info: {
    fontSize: 14,
    color: '#444',
    marginVertical: 2,
  },
});
