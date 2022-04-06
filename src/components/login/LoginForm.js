import React from 'react';
import {
  Text,
  Image,
  View,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
} from 'react-native';
import * as Yup from 'yup';
import {Formik} from 'formik';
const loginYupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required('Required!'),
  password: Yup.string().min(8, 'Minimum 8 characters').required('Required!'),
});
import {useNavigation} from '@react-navigation/native';

const LoginForm = () => {
  const navigation = useNavigation();
  const handleLogin = value => {
    navigation.navigate('HomeScreen');
  };
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={value => handleLogin(value)}
      validationOnMount={true}
      validationSchema={loginYupSchema}>
      {({handleBlur, handleChange, handleSubmit, values, errors, isValid}) => (
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <View style={styles.inputField}>
              <TextInput
                style={{color: 'white', fontSize: 16}}
                placeholderTextColor="gray"
                placeholder={'Enter your email address'}
                onBlur={handleBlur('email')}
                onChangeText={handleChange('email')}
                value={values.email}
              />
            </View>
            {errors.email && (
              <Text style={styles.textError}>{errors.email}</Text>
            )}
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.inputField}>
              <TextInput
                style={{color: 'white', fontSize: 16}}
                secureTextEntry={true}
                placeholderTextColor="gray"
                placeholder={'Enter your password'}
                value={values.password}
                onChangeText={handleChange('password')}
              />
            </View>
            {errors.password && (
              <Text style={styles.textError}>{errors.password}</Text>
            )}
          </View>
          <View style={{alignSelf: 'flex-end', marginBottom: 20}}>
            <Text style={{color: '#395aff'}}>Forgot password?</Text>
          </View>
          <Button title={'Login'} onPress={handleSubmit} />
          <View
            style={{flexDirection: 'row', alignSelf: 'center', marginTop: 30}}>
            <Text style={{color: 'white'}}>Don't have an account?</Text>
            <TouchableOpacity>
              <Text style={{color: '#395aff', fontWeight: '600'}}>
                {'  '}
                Register!
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  );
};
const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 10,
  },
  textError: {
    fontSize: 12,
    color: 'red',
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#fafafa',
    padding: 12,
    borderRadius: 4,
  },
  container: {
    flex: 1,
    marginTop: 80,
    width: '100%',
    backgroundColor: '#000',
  },
});
export default LoginForm;
