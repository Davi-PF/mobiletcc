import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  Text,
  TextInput,
  Image,
  Dimensions,
} from 'react-native';

import {COLORS} from '../constants/constants';

import axios from 'axios';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons/faPlus';
import {faGear} from '@fortawesome/free-solid-svg-icons/faGear';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons/faChevronRight';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons/faChevronLeft';

import {useUser} from '../contexts/UserContext';

const {width, height} = Dimensions.get('window');

const imageHeight = height * 0.2;
const imageWidth = width * 0.5;

export default function Home({navigation}) {
  const {userType, updateUserType} = useUser();

  const [textoInput, setTextoInput] = useState('');
  const [userData, setUserData] = useState({});
  const [userDataToBeShown, setUserDataToBeShown] = useState({});
  const [valueToShowData, setValueToShowData] = useState(0);

  const [isPressedBackward, setIsPressedBackward] = useState(false);
  const [isPressedForward, setIsPressedForward] = useState(false);

  const [changeDependentColor, setChangeDependentColor] = useState(false);

  useEffect(() => {
    searchData();
  }, []);

  useEffect(() => {
    navigation.addListener('focus', () => {
      searchData();
    })
  }, [navigation]);

  useEffect(() => {
    if (valueToShowData >= 0 && userData.length > 0) {
      setUserDataToBeShown(userData[valueToShowData]);
    }
  }, [valueToShowData, userData]);

  useEffect(() => {
    search(textoInput);
  }, [textoInput]);

  const searchData = async () => {
    try {
      const response = await axios.get(
        `https://zlospringapplication.online/api/dependents/findDependentsByCpfRes/${userType[2]}`,
      );
      if (response) {
        setUserData(response.data._embedded.dependentVOes);
        setUserDataToBeShown(response.data._embedded.dependentVOes[0]);
      } else {
        setUserData(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const search = nome => {
    const arrayData = Object.values(userData);

    const indices = arrayData.reduce((acc, objeto, indice) => {
      if (
        objeto &&
        objeto.nomeDep &&
        typeof objeto.nomeDep === 'string' &&
        objeto.nomeDep.toLowerCase().includes(nome.toLowerCase())
      ) {
        acc.push(indice);
      }
      return acc;
    }, []);

    if (indices[0] == undefined) return setValueToShowData(0);
    else return setValueToShowData(indices[0]);
  };

  const handlePressNewDependentButton = () => {
    updateUserType([{}, true, userType[2], userType[3]]);
    navigation.navigate('RegisterOrChangeUser');
  };

  const handlePressChangeDependentButton = () => {
    updateUserType([userDataToBeShown, false, userType[2], userType[3]]);
    navigation.navigate('RegisterOrChangeUser');
  };

  const changeDependentBackwards = () => {
    if (changeDependentColor == false) {
      setChangeDependentColor(true);
    } else {
      setChangeDependentColor(false);
    }
    setTimeout(() => {
      setIsPressedBackward(false);
    }, 300);
    setTextoInput('');
    setValueToShowData(
      (valueToShowData - 1 + userData.length) % userData.length,
    );
    setIsPressedBackward(true);
  };

  const changeDependentForward = () => {
    if (changeDependentColor == false) {
      setChangeDependentColor(true);
    } else {
      setChangeDependentColor(false);
    }
    setTimeout(() => {
      setIsPressedForward(false);
    }, 300);
    setTextoInput('');
    setValueToShowData((valueToShowData + 1) % userData.length);
    setIsPressedForward(true);
  };

  return (
    <View style={styles.view1}>
      <View>
        <View
          style={[
            styles.viewWelcomeBackground,
            {
              bottom:
                userData.length == undefined ? height * 0.2 : height * 0.09,
            },
          ]}>
          <View style={styles.viewWelcome}>
            <Text style={styles.textWelcome}>Olá,</Text>
            <Text style={styles.textWelcomeName}>{userType[3]}</Text>
          </View>
        </View>
        {userData.length == undefined ? (
          <View style={styles.viewNoDependents}>
            <Pressable
              onPress={() => handlePressNewDependentButton()}
              style={styles.pressableNoDependents}>
              <Text style={styles.textNoDependents}>Cadastrar dependente</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.centralizeView}>
            <View style={styles.viewArrows}>
              <Pressable
                onPress={() => changeDependentBackwards()}
                style={styles.arrows}>
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  color={isPressedBackward ? COLORS.DARK_BLUE : COLORS.GREY_MAIN}
                  style={styles.arrowsIcon}
                  size={isPressedBackward ? 35 : 30}
                />
              </Pressable>
              <View style={styles.view3}>
                <View style={styles.view4}>
                  <TextInput
                    placeholder='Pesquisar dep...'
                    placeholderTextColor={COLORS.GREY_MAIN}
                    onChangeText={text => setTextoInput(text)}
                    value={textoInput}
                    style={styles.searchInput}
                  />
                  <Pressable
                    onPress={handlePressNewDependentButton}
                    style={styles.pressable}>
                    <FontAwesomeIcon
                      icon={faPlus}
                      color={COLORS.DARK_BLUE}
                      style={styles.icon}
                    />
                  </Pressable>
                </View>
                <View
                  style={[
                    styles.view5,
                    {
                      backgroundColor: changeDependentColor
                        ? COLORS.PACIFIC_BLUE
                        : COLORS.BLUE_MAIN,
                    },
                  ]}>
                  <View style={styles.view6}>
                    <Text style={styles.textTitle}>
                      {userDataToBeShown.nomeDep}
                    </Text>
                    <Text style={styles.text}>{userDataToBeShown.cpfDep}</Text>
                  </View>
                  <View style={styles.view7}>
                    <Image
                      source={require('../assets/imgs/braceletImage.png')}
                      style={styles.image}
                    />
                    <Pressable
                      onPress={handlePressChangeDependentButton}
                      style={styles.pressableConfig}>
                      <FontAwesomeIcon
                        icon={faGear}
                        color={COLORS.WHITE}
                        style={styles.iconConfig}
                        size={height * 0.045}
                      />
                    </Pressable>
                  </View>
                </View>
              </View>
              <Pressable
                onPress={() => changeDependentForward()}
                style={styles.arrows}>
                <FontAwesomeIcon
                  icon={faChevronRight}
                  color={isPressedForward ? COLORS.DARK_BLUE : COLORS.GREY_MAIN}
                  style={styles.arrowsIcon}
                  size={isPressedForward ? 35 : 30}
                />
              </Pressable>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  arrows: {
    alignItems: 'center',
    width: '10%',
  },
  image: {
    borderRadius: 10,
    height: imageHeight,
    margin: 5,
    width: imageWidth,
  },
  pressable: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.WHITE,
    borderColor: COLORS.WHITE,
    borderRadius: 10,
    borderWidth: 1,
    color: COLORS.GREY_MAIN,
    margin: 1,
    padding: 12,
    width: '22%',
  },
  pressableConfig: {
    alignItems: 'center',
  },
  searchInput: {
    backgroundColor: COLORS.WHITE,
    borderColor: COLORS.WHITE,
    borderRadius: 10,
    borderWidth: 1,
    color: COLORS.GREY_MAIN,
    fontSize: height * 0.018,
    margin: 1,
    paddingLeft: '2%',
    textAlign: 'left',
    width: '72%',
  },
  text: {
    color: COLORS.WHITE,
    fontSize: height * 0.018,
  },
  textTitle: {
    color: COLORS.WHITE,
    fontSize: height * 0.025,
    fontWeight: 'bold',
  },
  view1: {
    flex: 1,
    justifyContent: 'center',
  },
  view3: {
    width: '80%',
  },
  view4: {
    backgroundColor: COLORS.DARK_BLUE,
    borderColor: COLORS.WHITE,
    borderTopEndRadius: 7,
    borderTopStartRadius: 7,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 0.5,
    paddingTop: 7,
    paddingBottom: 7,
    width: '100%',
  },
  view5: {
    borderColor: COLORS.WHITE,
    borderBottomEndRadius: 7,
    borderBottomStartRadius: 7,
    borderWidth: 1,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    width: '100%',
  },
  view6: {
    paddingBottom: 10,
  },
  view7: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 3,
  },
  viewArrows: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    bottom: height * 0.05,
  },
  viewNoDependents: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: height * 0.05,
  },
  pressableNoDependents: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.DARK_BLUE,
    borderColor: COLORS.WHITE,
    borderRadius: 10,
    borderWidth: 1,
    color: COLORS.GREY_MAIN,
    width: '80%',
    height: height * 0.07,
  },
  textNoDependents: {
    color: COLORS.WHITE,
    fontSize: width * 0.055,
    fontWeight: 'thin',
  },
  viewWelcomeBackground: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewWelcome: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    textAlign: 'center',
    borderColor: COLORS.GREY_MAIN,
    borderBottomWidth: 2,
    paddingBottom: height * 0.02,
  },
  textWelcome: {
    width: '100%',
    textAlign: 'left',
    color: COLORS.BLACK,
    fontSize: width * 0.06,
    fontWeight: '500',
  },
  textWelcomeName: {
    width: '100%',
    textAlign: 'left',
    color: COLORS.DARK_BLUE,
    fontSize: width * 0.07,
    fontWeight: 'bold',
  },
});
