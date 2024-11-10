import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  Text,
  TextInput,
  Dimensions,
  Button,
  ScrollView
} from 'react-native';

import {COLORS} from '../constants/constants';

import axios from 'axios';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEye} from '@fortawesome/free-solid-svg-icons/faEye';
import {faEyeSlash} from '@fortawesome/free-solid-svg-icons/faEyeSlash';

import {useUser} from '../contexts/UserContext';

const {width, height} = Dimensions.get('window');

export default function NotificationTab({navigation}) {
  return (
    <>
        <View>
          <Text>TESTE</Text>
          <Text> Push Notification!! </Text>
          <Pressable title={'Click Here'} onPress={ () => console.log("hehe consegui")}  style={styles.pressable}/>
        </View>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: COLORS.WHITE,
    borderColor: COLORS.BLUE_MAIN,
    borderRadius: 10,
    borderWidth: 1,
    color: COLORS.BLACK,
    fontSize: width * 0.045,
    height: height * 0.06,
    marginBottom: '6%',
    paddingLeft: '5%',
    paddingRight: '5%',
    width: '100%',
  },
  pressable: {
    backgroundColor: COLORS.GREEN_MAIN,
    borderRadius: 10,
    color: COLORS.GREY_MAIN,
    padding: width * 0.02,
    justifyContent: 'center',
    width: '100%',
  },
  title: {
    color: COLORS.BLUE_MAIN,
    fontSize: width * 0.06,
    fontWeight: '600',
  },
  titleButton: {
    color: COLORS.WHITE,
    fontSize: width * 0.06,
    fontWeight: '600',
    textAlign: 'center',
  },
  textForgotPassword1: {
    color: COLORS.GREY_MAIN,
    fontSize: width * 0.04,
    fontWeight: 'thin',
  },
  textForgotPassword2: {
    color: COLORS.BLUE_MAIN,
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
  view1: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  view2: {
    alignItems: 'center',
    width: '80%',
  },
  view3: {
    marginBottom: height * 0.03,
    marginTop: height * 0.03,
    width: '100%',
  },
  viewButton: {
    width: '100%',
  },
  viewSendCodeAgain: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  viewTitle: {
    alignItems: 'center',
    width: '100%',
  },
  viewInputs: {
    alignItems: 'flex-end',
    width: '100%',
  },
  pressableVisible: {
    height: height * 0.06,
    paddingRight: '5%',
    position: 'absolute',
    justifyContent: 'center',
    zIndex: 1,
  },
});
