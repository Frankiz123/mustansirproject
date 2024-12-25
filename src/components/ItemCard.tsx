import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

interface IItemCard {
  onPress: () => void;
}

const ItemCard: React.FC<IItemCard> = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image
        source={require('../assets/images/characterImage.png')}
        style={styles.image}
      />
      <View>
        <View style={styles.textMainContainer}>
          <Text style={styles.textMain}>
            Women Floral Print Puff Sleeve Fit
          </Text>
        </View>
        <View style={styles.textSecondContainer}>
          <Text style={styles.textSecond}>Myntra.con</Text>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.textThirdContainer}>
            <Text style={styles.textThird}>$20</Text>
          </View>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Buy Now</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default ItemCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: 356,
    height: 116,
    paddingTop: 7,
    paddingHorizontal: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  textMainContainer: {
    width: 233,
    height: 50,
    marginLeft: 15,
    backgroundColor: 'white',
  },
  textMain: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
  },
  textSecondContainer: {
    width: 80,
    height: 24,
    marginLeft: 15,
  },
  textSecond: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#757575',
    textDecorationLine: 'underline',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textThirdContainer: {
    width: 42,
    height: 24,
    marginLeft: 15,
  },
  textThird: {
    fontFamily: 'Poppins-Bold',
    fontSize: 22,
    color: 'black',
    textDecorationLine: 'underline',
  },
  button: {
    width: 89,
    height: 30,
    borderRadius: 12,
    backgroundColor: '#FF5722',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: 'white',
  },
});
