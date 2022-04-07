import React from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import validator from 'email-validator';

const MyInput = ({
  styleInputContainer,
  styleInputField,
  styleTextInput,
  error,
  errorLabel,
  ...props
}) => {
  return (
    <View style={[styles.inputContainer, styleInputContainer]}>
      <View style={[styles.inputField, styleInputField]}>
        <TextInput
          placeholderTextColor="gray"
          style={[styles.textInput, styleTextInput]}
          {...props}
        />
      </View>
      {error && <Text style={styles.textError}>{errorLabel}</Text>}
    </View>
  );
};
const styles = StyleSheet.create({
  textInput: {
    color: 'white',
    fontSize: 16,
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#fafafa',
    padding: 12,
    borderRadius: 4,
  },
  textError: {
    fontSize: 12,
    color: 'red',
  },
  inputContainer: {
    marginBottom: 10,
  },
});
export default MyInput;
