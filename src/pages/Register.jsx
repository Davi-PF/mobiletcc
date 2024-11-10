import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Pressable,
    Text,
    TextInput,
    Dimensions
} from 'react-native';

import { COLORS } from '../constants/constants';

import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons/faEye'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons/faEyeSlash'

import { useUser } from '../contexts/UserContext';

const { width, height } = Dimensions.get('window');

export default function Registration({ navigation }) {

    const [cpfValue, setCpfValue] = useState('');
    const [nameValue, setNameValue] = useState('');
    const [idadeValue, setIdadeValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [telValue, setTelValue] = useState('');

    const [passwordValue, setPasswordValue] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [confPasswordValue, setConfPasswordValue] = useState('');
    const [isConfPasswordVisible, setIsConfPasswordVisible] = useState(false);


    
    return (
        <View style={styles.view1}>
            <View style={styles.view2}>
                <View style={styles.viewTitle}>
                    <Text style={styles.title}>Cadastrar</Text>
                </View>
                <View style={styles.view3}>
                    <View>
                        <TextInput placeholder='Cpf' placeholderTextColor={COLORS.GREY_MAIN} keyboardType='numeric' onChangeText={(text) => setCpfValue(text)} value={cpfValue} style={styles.input} />
                        <TextInput placeholder='Nome' placeholderTextColor={COLORS.GREY_MAIN} keyboardType='default' autoCapitalize='words' onChangeText={(text) => setNameValue(text)} value={nameValue} style={styles.input} />
                        <TextInput placeholder='Idade' placeholderTextColor={COLORS.GREY_MAIN} keyboardType='numeric' onChangeText={(text) => setIdadeValue(text)} value={idadeValue} style={styles.input} />
                        <TextInput placeholder='Telefone' placeholderTextColor={COLORS.GREY_MAIN} keyboardType='numeric' onChangeText={(text) => setTelValue(text)} value={telValue} style={styles.input} />
                        <TextInput placeholder='E-mail' placeholderTextColor={COLORS.GREY_MAIN} keyboardType='email-address' onChangeText={(text) => setEmailValue(text)} value={emailValue} style={styles.input} />
                        <View style={styles.viewInputs}>
                            <Pressable onPress={isPasswordVisible ? () => setIsPasswordVisible(false) : () => setIsPasswordVisible(true)} style={styles.pressableVisible}>
                                <FontAwesomeIcon icon={isPasswordVisible ? faEye : faEyeSlash} color='#33A1DE' style={styles.iconVisible} size={height * 0.030} />
                            </Pressable>
                            <TextInput placeholder='Senha' placeholderTextColor={COLORS.GREY_MAIN} secureTextEntry={isPasswordVisible ? false : true} onChangeText={(text) => setPasswordValue(text)} value={passwordValue} style={styles.input} />
                        </View>
                        <View style={styles.viewInputs}>
                            <Pressable onPress={isConfPasswordVisible ? () => setIsConfPasswordVisible(false) : () => setIsConfPasswordVisible(true)} style={styles.pressableVisible}>
                                <FontAwesomeIcon icon={isConfPasswordVisible ? faEye : faEyeSlash} color='#33A1DE' style={styles.iconVisible} size={height * 0.030} />
                            </Pressable>
                            <TextInput placeholder='Confirmar Senha' placeholderTextColor={COLORS.GREY_MAIN} secureTextEntry={isConfPasswordVisible ? false : true} onChangeText={(text) => setConfPasswordValue(text)} value={confPasswordValue} style={styles.input} />
                        </View>
                    </View>
                </View>
                <View style={styles.viewButton}>
                    <Pressable style={styles.pressable}>
                        <Text style={styles.titleButton}>Confirmar</Text>
                    </Pressable>
                </View>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: COLORS.WHITE,
        borderColor: COLORS.BLUE_MAIN,
        borderRadius: 10,
        borderWidth: 1,
        color: COLORS.GREY_MAIN,
        fontSize: width * 0.045,
        height: height * 0.06,
        marginBottom: '6%',
        paddingLeft: '5%',
        paddingRight: '5%',
        width: '100%'
    },
    pressable: {
        backgroundColor: COLORS.GREEN_MAIN,
        borderRadius: 10,
        color: COLORS.GREY_MAIN,
        padding: width * 0.02,
        justifyContent: 'center',
        width: '100%'
    },
    title: {
        color: COLORS.BLUE_MAIN,
        fontSize: width * 0.06,
        fontWeight: '600'
    },
    titleButton: {
        color: COLORS.WHITE,
        fontSize: width * 0.06,
        fontWeight: '600',
        textAlign: 'center'
    },
    view1: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        width: '100%'
    },
    view2: {
        alignItems: 'center',
        width: '80%'
    },
    view3: {
        marginBottom: height * 0.03,
        marginTop: height * 0.03,
        width: '100%'
    },
    viewButton: {
        width: '100%'
    },
    viewTitle: {
        alignItems: 'center',
        width: '100%'
    },
    viewInputs: {
        alignItems: 'flex-end',
        width: '100%'
    },
    pressableVisible: {
        height: height * 0.06,
        paddingRight: '5%',
        position: 'absolute',
        justifyContent: 'center',
        zIndex: 1
    }
});