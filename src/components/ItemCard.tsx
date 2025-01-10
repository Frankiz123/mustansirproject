import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Dimensions,
} from 'react-native';

const {width} = Dimensions.get('window');

interface IItemCard {
  onPress: () => void;
  item: {
    title: string;
    price: string;
    thumbnail: string;
    link: string;
    source: string;
    delivery: string;
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
  // return (
  //   <TouchableOpacity
  //     disabled={true}
  //     onPress={onPress}
  //     style={styles.container}>
  //     <Image source={{uri: item?.thumbnail}} style={styles.image} />
  //     <View style={styles.mainContainer}>
  //       <View style={styles.mainTextContainer}>
  //         <Text style={styles.mainText}>{item?.title}</Text>
  //       </View>
  //       <View style={styles.containerImageText}>
  //         <View>
  //           <Text style={styles.mainTextLink}>{item?.source}</Text>
  //           <Text style={styles.mainTextAmount}>{item?.price}</Text>
  //         </View>
  //         <View style={styles.buttonBuyContainer}>
  //           <TouchableOpacity
  //             onPress={handleBuyNowPress}
  //             style={styles.buttonBuy}>
  //             <Text style={styles.buttonBuyText}>Buy Now</Text>
  //           </TouchableOpacity>
  //         </View>
  //       </View>
  //     </View>
  //   </TouchableOpacity>
  // );

  return (
    <View style={styles.card}>
      <Image
        source={{uri: item?.thumbnail}} // Replace with your image URL or require()
        style={styles.image}
      />
      <View style={styles.details}>
        <Text style={styles.title}>{item?.title}</Text>
        <Text style={styles.subtitle}>{item?.source}</Text>
        <Text style={styles.price}>{item.price}</Text>
        <Text style={styles.delivery}>{item.delivery}</Text>
      </View>
      <TouchableOpacity style={styles.buyButton} onPress={handleBuyNowPress}>
        <Text style={styles.buyButtonText}>Buy Now</Text>
      </TouchableOpacity>
    </View>
  );
};
export default ItemCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    margin: 10,
    width: width * 0.9,
    alignSelf: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  details: {
    flex: 1,
    marginLeft: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    marginVertical: 6,
    textDecorationLine: 'underline',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  delivery: {
    fontSize: 14,
    color: '#888',
    marginVertical: 6,
    // textDecorationLine: 'underline',
  },
  buyButton: {
    backgroundColor: '#FF6F00',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
