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
import validator from 'email-validator';
import {useNavigation} from '@react-navigation/native';

const registerYupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required('Required!'),
  password: Yup.string().min(8, 'Minimum 8 characters').required('Required!'),
  confirmPassword: Yup.string()
    .min(8, 'Minimum 8 characters')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required!'),
});
const RegisterForm = () => {
  const navigation = useNavigation();
  const handleRegister = value => {
    navigation.navigate('LoginScreen');
  };
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        confirmPassword: '',
      }}
      onSubmit={value => handleRegister(value)}
      validationSchema={registerYupSchema}>
      {({handleBlur, handleChange, handleSubmit, values, errors, isValid}) => (
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    values.email.length < 1 || !validator.validate(values.email)
                      ? '#ec2222'
                      : '#fafafa',
                },
              ]}>
              <TextInput
                autoCapitatize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
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
            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    values.password.length < 8 ? '#ec2222' : '#fafafa',
                },
              ]}>
              <TextInput
                style={{color: 'white', fontSize: 16}}
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
          <View style={styles.inputContainer}>
            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    values.confirmPassword.length < 8 ||
                    values.password !== values.confirmPassword
                      ? '#ec2222'
                      : '#fafafa',
                },
              ]}>
              <TextInput
                style={{color: 'white', fontSize: 16}}
                placeholderTextColor="gray"
                placeholder={'Cornfirm password'}
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
              />
            </View>
            {errors.confirmPassword && (
              <Text style={styles.textError}>{errors.confirmPassword}</Text>
            )}
          </View>
          <Button
            disabled={!isValid}
            title={'Register'}
            onPress={handleRegister}
          />
          <View
            style={{flexDirection: 'row', alignSelf: 'center', marginTop: 30}}>
            <Text style={{color: 'white'}}>You have an account?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('LoginScreen')}>
              <Text style={{color: '#395aff', fontWeight: '600'}}>
                {'  '}
                Login!
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
export default RegisterForm;
