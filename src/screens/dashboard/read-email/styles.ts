import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    backgroundColor: '#FF5722',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#6200ee',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: '90%',
  },
  button: {
    backgroundColor: '#6200ee',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default styles;
