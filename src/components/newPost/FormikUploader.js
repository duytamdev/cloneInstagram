import React, {useState} from 'react';
import {Text, Image, View, TextInput, StyleSheet, Button} from 'react-native';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {MyDivider} from '../home/BottomTabs';
import validUrl from 'valid-url';
import {useNavigation} from '@react-navigation/native';
import {db, auth} from '../../config/firebase';
import {collection, addDoc, serverTimestamp} from 'firebase/firestore';
const PLACE_HOLDER_IMAGE =
  'https://media.istockphoto.com/vectors/image-place-holder-with-a-gray-camera-icon-vector-id1226328537?k=20&m=1226328537&s=170667a&w=0&h=r9__Yw9cG6dCDDEmYVob5IDOMSHSAqvlYG47RrUv-tU=';
const uploadYupSchema = Yup.object().shape({
  imageUrl: Yup.string().url('these not URL').required('A URL is required'),
  captions: Yup.string().max(2200, 'Caption has reached the characters'),
});
const FormikUploader = () => {
  const navigation = useNavigation();
  const [thumbnailUrl, setThumbnailUrl] = useState(PLACE_HOLDER_IMAGE);
  const handleUploadPost = async values => {
    await uploadPostToFirebase(values.caption, values.imageUrl);
    navigation.goBack();
  };
  const uploadPostToFirebase = async (caption, imageUrl) => {
    const docRef = await addDoc(
      collection(db, 'users', auth.currentUser.email, 'posts'),
      {
        imageUrl: imageUrl,
        picture: thumbnailUrl,
        caption: caption,
        owner_uid: auth.currentUser.uid,
        owner_email: auth.currentUser.email,
        createdAt: serverTimestamp(),
        likes: 0,
        comments: [],
        likes_by_users: [],
        user: 'demo',
        profile_picture: 'https://i.imgur.com/7yU9tCJ.jpg',
      },
    );
    console.log(docRef);
  };
  return (
    <Formik
      initialValues={{caption: '', imageUrl: ''}}
      onSubmit={value => handleUploadPost(value)}
      validationOnMount={true}
      validationSchema={uploadYupSchema}>
      {({handleBlur, handleChange, handleSubmit, values, errors, isValid}) => (
        <View style={styles.container}>
          <View
            style={{
              margin: 20,
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <View>
              <Image
                style={styles.image}
                source={{
                  uri: validUrl.isUri(thumbnailUrl)
                    ? thumbnailUrl
                    : PLACE_HOLDER_IMAGE,
                }}
              />
            </View>
            <View style={{flex: 1, marginLeft: 8}}>
              <TextInput
                style={{
                  color: 'white',
                  fontSize: 20,
                  paddingHorizontal: 16,
                }}
                multiline={true}
                placeholderTextColor="gray"
                placeholder={'Write a caption...'}
                onBlur={handleBlur('caption')}
                value={values.caption}
                onChangeText={handleChange('caption')}
              />
            </View>
          </View>
          <MyDivider />
          <TextInput
            onChange={e => setThumbnailUrl(e.nativeEvent.text)}
            style={{color: 'white', fontSize: 18}}
            placeholderTextColor="gray"
            placeholder={'Enter Image Url'}
            onChangeText={handleChange('imageUrl')}
            onBlur={handleBlur('imageUrl')}
            value={values.imageUrl}
          />
          {errors.imageUrl && (
            <Text style={{fontSize: 12, color: 'red'}}>{errors.imageUrl}</Text>
          )}
          <Button disabled={!isValid} onPress={handleSubmit} title={'Share'} />
        </View>
      )}
    </Formik>
  );
};
const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
  },
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
});
export default FormikUploader;
