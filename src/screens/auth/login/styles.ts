import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  mt20: {
    marginTop: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#F9FAFF',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  ScrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#5A5A5A',
    textAlign: 'center',
    lineHeight: 24,
  },
  form: {
    marginTop: 40,
  },
  input: {
    backgroundColor: '#F4F7FC',
    borderRadius: 12,
    borderColor: '#D6DFF2',
    borderWidth: 1,
    height: 50,
    // marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
  },
  passwordContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  inputWithIcon: {
    backgroundColor: '#F4F7FC',
    borderRadius: 12,
    borderColor: '#D6DFF2',
    borderWidth: 1,
    height: 50,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
  },
  iconButton: {
    position: 'absolute',
    right: 15,
    top: 13,
  },
  button: {
    marginTop: 30,
    backgroundColor: '#FF5722',
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  signupContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    fontSize: 14,
    color: '#5A5A5A',
  },
  signupLink: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF5722',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});

export default styles;
