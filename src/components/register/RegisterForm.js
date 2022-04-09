import React, {useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  LogBox,
  Alert,
} from 'react-native';
import * as Yup from 'yup';
import {Formik} from 'formik';
import validator from 'email-validator';
import ProgressDialog from 'react-native-progress-dialog';
import {useNavigation} from '@react-navigation/native';
import MyInput from '../common/MyInput';
import {auth, db} from '../../config/firebase';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {collection, addDoc} from 'firebase/firestore';
const registerYupSchema = Yup.object().shape({
  username: Yup.string()
    .min(4, 'Minimum 4 characters')
    .max(20, 'Maximum 20 characters')
    .required('Required'),
  email: Yup.string().email('Invalid email format').required('Required!'),
  password: Yup.string().min(8, 'Minimum 8 characters').required('Required!'),
  confirmPassword: Yup.string()
    .min(8, 'Minimum 8 characters')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required!'),
});
const RegisterForm = () => {
  LogBox.ignoreLogs(['Setting a timer']);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleRegister = values => {
    onRegister(values.email, values.password, values.username).then();
  };
  const getRandomProfilePicture = async () => {
    const response = await fetch('https://randomuser.me/api');
    const data = await response.json();
    return data.results[0].picture.large;
  };
  const onRegister = async (email, password, username) => {
    try {
      setIsLoading(true);
      const authUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      // // in database
      await addDoc(collection(db, 'users'), {
        owner_uid: authUser.user.uid,
        username: username,
        email: authUser.user.email,
        profile_picture: await getRandomProfilePicture(),
      });
      navigation.navigate('LoginScreen');
    } catch (e) {
      Alert.alert('⚠️ Oh!', e.message);
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
        username: '',
        password: '',
        confirmPassword: '',
      }}
      onSubmit={values => handleRegister(values)}
      validationSchema={registerYupSchema}>
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
              borderColor:
                values.username.length < 1 || values.username.length > 20
                  ? '#ec2222'
                  : '#fafafa',
            }}
            onChangeText={handleChange('username')}
            onBlur={handleBlur('username')}
            errorLabel={errors.username}
            error={errors.username}
            placeholder={'Enter your username'}
            value={values.username}
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
          <MyInput
            styleInputField={{
              borderColor:
                values.confirmPassword.length < 1 ||
                values.password !== values.confirmPassword
                  ? '#ec2222'
                  : '#fafafa',
            }}
            onChangeText={handleChange('confirmPassword')}
            onBlur={handleBlur('confirmPassword')}
            errorLabel={errors.confirmPassword}
            error={errors.confirmPassword}
            placeholder={'Enter your confirmPassword'}
            value={values.confirmPassword}
            secureTextEntry={true}
            autoCapitatize="none"
          />
          <Button
            disabled={!isValid}
            title={'Register'}
            onPress={handleSubmit}
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
