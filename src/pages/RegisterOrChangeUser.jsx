import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  Text,
  TextInput,
  ScrollView,
  Dimensions,
} from 'react-native';

import {useUser} from '../contexts/UserContext';
import {COLORS} from '../constants/constants'

import axios from 'axios';

const {width, height} = Dimensions.get('window');

export default function RegisterOrChangeUser({navigation}) {
  const {userType, updateUserType} = useUser();
  const [isCreate, setIsCreate] = useState(userType[1]);

  const [textoCPFInput, setTextoCPFInput] = useState(
    isCreate ? '' : userType[0].cpfDep,
  );
  const [textoNomeInput, setTextoNomeInput] = useState(
    isCreate ? '' : userType[0].nomeDep,
  );
  const [textoIdadeInput, setTextoIdadeInput] = useState(
    isCreate ? '' : userType[0].idadeDep,
  );
  const [textoTipoSanguineoInput, setTextoTipoSanguineoInput] = useState(
    isCreate ? '' : userType[0].tipoSanguineo,
  );
  const [textoGeneroInput, setTextoGeneroInput] = useState(
    isCreate ? '' : userType[0].generoDep,
  );
  const [textoLaudoInput, setTextoLaudoInput] = useState(
    isCreate ? '' : userType[0].laudo,
  );

  const changeData = async () => {
    console.log(isCreate);

    if (isCreate) {
      var newUser = {
        cpfDep: textoCPFInput,
        nomeDep: textoNomeInput,
        idadeDep: textoIdadeInput,
        tipoSanguineo: textoTipoSanguineoInput,
        generoDep: textoGeneroInput,
        laudo: textoLaudoInput,
        cpfResDep: userType[2],
      };

      try {
        const response = await axios.post(
          `https://zlospringapplication.online/api/dependents/`,
          newUser,
        );
        console.log('Dependente criado com sucesso!');
        navigation.navigate('Home');
      } catch (error) {
        console.error(error);
      }
    }

    if (!isCreate) {
      var newUser = userType[0];

      newUser.cpfDep = textoCPFInput;
      newUser.nomeDep = textoNomeInput;
      newUser.idadeDep = textoIdadeInput;
      newUser.tipoSanguineo = textoTipoSanguineoInput;
      newUser.generoDep = textoGeneroInput;
      newUser.laudo = textoLaudoInput;

      try {
        const response = await axios.put(
          `https://zlospringapplication.online/api/dependents/`,
          newUser,
        );
        console.log('Dependente alterado com sucesso!');
        navigation.navigate('Home');
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <View style={styles.view1}>
      <View style={styles.view2}>
        <View style={styles.viewTitle}>
          <Text style={styles.title}>
            {isCreate ? 'Cadastrar dependente' : 'Alterar dependente'}
          </Text>
        </View>
        <ScrollView style={styles.scrollView}>
          <View style={styles.view3}>
            <View style={styles.viewInput}>
              <Text style={styles.titleInput}>CPF</Text>
              <TextInput
                placeholder='CPF do dependente'
                placeholderTextColor={COLORS.GREY_MAIN}
                onChangeText={text => setTextoCPFInput(text)}
                value={textoCPFInput}
                style={styles.input}
                disabled={isCreate ? false : true}
              />
            </View>
            <View style={styles.viewInput}>
              <Text style={styles.titleInput}>Nome</Text>
              <TextInput
                placeholder='Nome do dependente'
                placeholderTextColor={COLORS.GREY_MAIN}
                onChangeText={text => setTextoNomeInput(text)}
                value={textoNomeInput}
                style={styles.input}
              />
            </View>
            <View style={styles.viewInput}>
              <Text style={styles.titleInput}>Idade</Text>
              <TextInput
                placeholder='Idade do dependente'
                placeholderTextColor={COLORS.GREY_MAIN}
                onChangeText={text => setTextoIdadeInput(text)}
                value={textoIdadeInput}
                style={styles.input}
              />
            </View>
            <View style={styles.viewInput}>
              <Text style={styles.titleInput}>Tipo Sanguíneo</Text>
              <TextInput
                placeholder='Tipo sanguíneo do dep...'
                placeholderTextColor={COLORS.GREY_MAIN}
                onChangeText={text => setTextoTipoSanguineoInput(text)}
                value={textoTipoSanguineoInput}
                style={styles.input}
              />
            </View>
            <View style={styles.viewInput}>
              <Text style={styles.titleInput}>Gênero</Text>
              <TextInput
                placeholder='Gênero do dependente'
                placeholderTextColor={COLORS.GREY_MAIN}
                onChangeText={text => setTextoGeneroInput(text)}
                value={textoGeneroInput}
                style={styles.input}
              />
            </View>
            <View style={styles.viewInput}>
              <Text style={styles.titleInput}>Laudo médico</Text>
              <TextInput
                placeholder='Laudo médico do dep...'
                placeholderTextColor={COLORS.GREY_MAIN}
                onChangeText={text => setTextoLaudoInput(text)}
                value={textoLaudoInput}
                style={styles.input}
              />
            </View>
          </View>
        </ScrollView>
        <View style={styles.viewButton}>
          <Pressable onPress={changeData} style={styles.pressable}>
            <Text style={styles.titleButton}>Confirmar</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: COLORS.BLUE_MAIN,
    borderRadius: 10,
    borderWidth: 1,
    color: COLORS.GREY_MAIN,
    fontSize: height * 0.02,
    height: height * 0.06,
    paddingLeft: '4%',
    marginBottom: '5%',
    backgroundColor: COLORS.WHITE,
    width: '80%',
  },
  pressable: {
    backgroundColor: COLORS.GREEN_MAIN,
    borderRadius: 10,
    height: height * 0.06,
    justifyContent: 'center',
    width: '100%',
  },
  scrollView: {
    marginBottom: '8%',
    marginTop: '5%',
    width: '70%',
  },
  title: {
    color: COLORS.BLUE_MAIN,
    fontSize: height * 0.029,
    fontWeight: '600',
    textAlign: 'center',
  },
  titleButton: {
    color: COLORS.WHITE,
    fontSize: height * 0.029,
    fontWeight: '600',
    textAlign: 'center',
  },
  titleInput: {
    color: COLORS.BLUE_MAIN,
    fontSize: height * 0.023,
    fontWeight: 'thin',
    marginTop: '3%',
    marginBottom: '3%',
    width: '80%',
  },
  view1: {
    flex: 1,
    justifyContent: 'center',
  },
  view2: {
    alignItems: 'center',
    height: '65%',
  },
  viewButton: {
    alignItems: 'center',
    borderTopColor: COLORS.GREY_MAIN,
    borderTopWidth: 1,
    height: '18%',
    justifyContent: 'center',
    width: '70%',
  },
  viewInput: {
    alignItems: 'center',
    width: '100%',
  },
  viewTitle: {
    borderBottomColor: COLORS.GREY_MAIN,
    borderBottomWidth: 1,
    height: '12%',
    justifyContent: 'center',
    width: '70%',
  },
});
