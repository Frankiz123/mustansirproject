import {TextInput, StyleSheet, View, Image} from 'react-native';

function SearchBox() {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputFieldContainer}
          placeholder="Or type your query..."
        />
      </View>
      <View style={styles.buttonContainer}>
        <Image
          source={require('../assets/images/send.png')}
          style={styles.imageIcon}
        />
      </View>
    </View>
  );
}
export default SearchBox;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 31,
  },
  inputContainer: {
    flex: 1,
    marginRight: 5,
  },
  inputFieldContainer: {
    // width: 250,
    height: 50,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 24.5,
    fontSize: 16,
    paddingLeft: 26,
    fontFamily: 'Poppins-Regular',
    textAlignVertical: 'center',
  },
  buttonContainer: {
    // flex: 1,
    width: 44,
    height: 44,
    borderRadius: 23,
    backgroundColor: '#FF5722',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageIcon: {
    width: 24,
    height: 24,
    right: 2,
  },
});
