import React, {useEffect} from 'react';
import {
  Text,
  Alert,
  View,
  StyleSheet,
  Button,
  LogBox,
  TouchableOpacity,
} from 'react-native';
import * as Yup from 'yup';
import {Formik} from 'formik';
import validator from 'email-validator';
import {useNavigation} from '@react-navigation/native';
import MyInput from '../common/MyInput';
import {auth} from '../../config/firebase';
import {signInWithEmailAndPassword} from 'firebase/auth';
import ProgressDialog from 'react-native-progress-dialog';
const loginYupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required('Required!'),
  password: Yup.string().min(8, 'Minimum 8 characters').required('Required!'),
});
const LoginForm = () => {
  LogBox.ignoreLogs(['Setting a timer']);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = React.useState(false);
  const handleLogin = value => {
    onLogin(value.email, value.password).then();
  };
  const onLogin = async (email, password) => {
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      console.log(e.message);
      Alert.alert(
        '⚠️My Lord...',
        e.message + '\n\n What would you like to do next',
        [
          {
            text: 'OK',
            onPress: null,
            style: 'cancel',
          },
          {
            text: 'Sign up',
            onPress: () => navigation.push('RegisterScreen'),
          },
        ],
      );
    }
    setIsLoading(false);
  };
  useEffect(() => {
    return () => {
      setIsLoading(false);
    };
  }, []);

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={value => handleLogin(value)}
      validationSchema={loginYupSchema}>
      {({handleBlur, handleChange, handleSubmit, values, errors, isValid}) => (
        <View style={styles.container}>
          <ProgressDialog visible={isLoading} />

          <MyInput
            styleInputField={{
              borderColor:
                values.email.length < 1 || !validator.validate(values.email)
                  ? '#ec2222'
                  : '#fafafa',
            }}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            errorLabel={errors.email}
            error={errors.email}
            placeholder={'Enter your email'}
            value={values.email}
            autoCapitatize="none"
          />
          <MyInput
            styleInputField={{
              borderColor: values.password.length < 8 ? '#ec2222' : '#fafafa',
            }}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            errorLabel={errors.password}
            error={errors.password}
            placeholder={'Enter your password'}
            value={values.password}
            autoCapitatize="none"
            secureTextEntry={true}
          />
          <View style={{alignSelf: 'flex-end', marginBottom: 20}}>
            <Text style={{color: '#395aff'}}>Forgot password?</Text>
          </View>
          <Button disabled={!isValid} title={'Login'} onPress={handleSubmit} />
          <View
            style={{flexDirection: 'row', alignSelf: 'center', marginTop: 30}}>
            <Text style={{color: 'white'}}>Don't have an account?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('RegisterScreen')}>
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
