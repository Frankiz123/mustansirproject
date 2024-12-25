import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

interface IItemCard {
  onPress: () => void;
}

const ItemCard: React.FC<IItemCard> = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.mainContainer}>
        <Image
          source={require('../assets/images/characterImage.png')}
          style={styles.image}
        />
        <View style={styles.containerImageText}>
          <Text style={styles.mainText}>
            Women Floral Print Puff Sleeve Fit
          </Text>
          <View style={styles.containerMain}>
            <View>
              <Text style={styles.mainTextLink}>Myntra.con</Text>
              <Text style={styles.mainTextAmount}>$20</Text>
            </View>
            <View style={styles.buttonBuyContainer}>
              <TouchableOpacity style={styles.buttonBuy}>
                <Text style={styles.buttonBuyText}>Buy Now</Text>
              </TouchableOpacity>
            </View>
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
    paddingTop: 17,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  containerImageText: {},
  mainText: {
    paddingHorizontal: 10,
    fontWeight: '700',
    fontSize: 16,
  },
  containerMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonBuyContainer: {
    justifyContent: 'center',
  },
  buttonBuy: {
    backgroundColor: '#FF5722',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  buttonBuyText: {
    fontWeight: '500',
    fontSize: 16,
    color: 'white',
  },
  mainTextLink: {
    paddingHorizontal: 10,
    marginTop: 15,
    textDecorationLine: 'underline',
    fontWeight: '500',
    color: '#757575',
  },
  mainTextAmount: {
    paddingHorizontal: 10,
    fontWeight: '700',
    fontSize: 20,
    paddingTop: 10,
  },

  mainContainer: {
    flexDirection: 'row',
  },

  textMainContainer: {
    backgroundColor: 'white',
  },
  textMain: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    paddingHorizontal: 10,
  },
  textSecondContainer: {
    // width: 80,
    paddingTop: 20,
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
    // width: 42,
    // height: 24,
    // marginLeft: 15,
  },
  textThird: {
    fontFamily: 'Poppins-Bold',
    fontSize: 22,
    color: 'black',
    textDecorationLine: 'underline',
  },
  button: {
    height: 30,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    marginTop: 10,
    backgroundColor: '#FF5722',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: 'white',
  },
});
