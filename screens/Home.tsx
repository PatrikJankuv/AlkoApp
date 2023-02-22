import * as React from "react";
import {
  View,
  Text,
  Modal,
  Pressable,
  StyleSheet,
  Alert,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { FloatingAction } from "react-native-floating-action";
import CalendarPicker from "react-native-calendar-picker";
import Moment from "moment";
import { openConnection, addItem, allItems } from "../Database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  COOL_GRAY_500,
  TEAL_600,
  GRAY_200,
  WHITE,
  YELLOW_50,
  RED_50,
  PURPLE_50,
  BLUE_50,
} from "../src/constants/colors";
import { Inputs } from "../src/components/styles/inputs";
import { BEER, WINE, SPIRIT, OTHERS } from "../src/constants/images";
import ScreenView from "../src/components/layout/ScreenView";
import { Links, Paragraph } from "../src/components/styles/text";
import { Containers } from "../src/components/styles/containers";
import DividerVertical from "../src/components/layout/DividerVertical";
import { Routes, StackNavigationProps } from "../src/components/Navigation";
import Button from "../src/components/Button";
import { DEVICE_WIDTH } from "../src/constants/layout";
import { Titles } from "../src/components/styles/titles";
import { Buttons } from "../src/components/styles/buttons";

Moment.locale("en");

const db = openConnection();

function Items({ items, onPressItem }) {
  if (items === null || items.length === 0) {
    return null;
  }

  return (
    <View>
      {items.map(({ id, brand, volume, price, count_item, type }) => (
        <TouchableOpacity
          key={id}
          onPress={() => onPressItem}
          style={{
            borderColor: "#000",
            borderWidth: 1,
            padding: 12,
          }}
        >
          <Text>
            {type} {count_item}ks {brand} {volume}ml {price}kc
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default function HomeScreen({
  navigation,
}: StackNavigationProps<Routes, "HomeScreen">) {
  function NoPlanComponent(props) {
    if (props.day === 0)
      return (
        <View style={Containers.ContainerAlignLeft}>
          <DividerVertical space={20} />
          <Text style={Paragraph.ParagraphDescription}>
            🗓 Na dnešek nemáš žádný plán
          </Text>
          <DividerVertical space={8} />
          <Text style={Paragraph.ParagraphDescription}>
            Vytvoř si plán a sleduj, jak jsi na tom s konzumací alkoholu!
          </Text>
          <DividerVertical space={8} />
          {/* <TouchableOpacity style={Containers.ContainerHomeButtons}>
            <Text
              style={Links.LinkButton}
              onPress={() => navigation.navigate("SchedulerScreen")}
            >
              Vytvořit plán
            </Text>
            <Text style={Links.LinkButtonGray}>Připomeň mi později</Text>
          </TouchableOpacity> */}
        </View>
      );
    else {
      return <Text></Text>;
    }
  }

  const [modalVisible, setModalVisible] = React.useState(false);
  const [brand, setBrand] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [volume, setVolume] = React.useState("");
  const [type, setType] = React.useState("");
  const [count, setCount] = React.useState(0);
  const [day, setDay] = React.useState(0);
  const [dayIdServer, setDayServerId] = React.useState();
  const [alcohol, setAlcohol] = React.useState(0);
  const [date, setDate] = React.useState(new Date());
  const [items, setItems] = React.useState([]);
  const [validationMessage, setMessage] = React.useState("");

  React.useEffect(() => {
    getDayId(Moment(date).format("yyyy-MM-DD"));
  }, []);

  const increaseCount = () => setCount((prevCount) => prevCount + 1);
  const decreaseCount = () => {
    if (count > 0) {
      setCount((prevCount) => prevCount - 1);
    }
  };

  const actions = [
    {
      text: "Pivo",
      color: YELLOW_50,
      icon: { BEER },
      name: "BEER",
      alcohol: 5,
      position: 1,
    },
    {
      text: "Víno",
      color: RED_50,
      icon: { WINE },
      name: "WINE",
      alcohol: 12,
      position: 2,
    },
    {
      text: "Tvrdý alkohol",
      color: PURPLE_50,
      icon: { SPIRIT },
      name: "SPIRIT",
      alcohol: 40,
      position: 3,
    },
    {
      text: "Ostatní",
      color: BLUE_50,
      icon: { OTHERS },
      name: "OTHER",
      alcohol: 10,
      position: 4,
    },
  ];

  const saveItemAtServerAndLocal = async () => {
    if (!validForm()) {
      return;
    }

    const jwtToken = await AsyncStorage.getItem("@jwt_token");

    if (jwtToken === null) {
      addToLocalDb("0");
    } else {
      const day_object = {
        alcohol: alcohol,
        amount: parseInt(volume),
        count: count,
        day: {
          id: dayIdServer,
        },
        drinkType: type,
        planned: false,
        price: parseInt(price),
      };

      fetch(global.url + "/drink_item", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: jwtToken,
        },
        body: JSON.stringify(day_object),
      })
        .then((response) => {
          //need to store server id for edit or remove thinks on server
          var Location = response.headers.map.location;
          addToLocalDb(Location.replace(/\D/g, ""));
        })
        .finally();
    }
  };

  const getDayItems = (day) => {
    db.transaction((tx) => {
      tx.executeSql(
        "select * from item where day_id = ?",
        [day],
        (_, { rows: { _array } }) => {
          setItems(_array);
        }
      );
    });
  };

  const getDayId = (day) => {
    db.transaction((tx) => {
      tx.executeSql(
        "select * from day where day = ?",
        [day],
        (_, { rows: { _array } }) => {
          if (_array[0] == null) {
            setDay(0);
          } else {
            setDay(_array[0].id);
            setDayServerId(_array[0].server_id);
            getDayItems(_array[0].id);
          }
        }
      );
    }, setItems([]));
  };

  const onDateChange = (temp) => {
    setDate(temp);
    getDayId(Moment(temp).format("yyyy-MM-DD"));
  };

  const validForm = () => {
    if (brand === "" || price === "" || volume === "" || count === 0) {
      setMessage("Vypln vsechny policka");
      return false;
    } else {
      setMessage("");
      return true;
    }
  };

  const addToLocalDb = (server_id) => {
    addItem(
      db,
      brand,
      parseInt(price),
      parseFloat(volume),
      count,
      type,
      day,
      parseInt(server_id)
    );
    getDayItems(day);
    setModalVisible(!modalVisible);
  };

  const SettingsStack = createStackNavigator();
  return (
    // <ScrollView>
    <View style={{ flex: 1, alignItems: "center" }}>
      <CalendarPicker
        onDateChange={onDateChange}
        startFromMonday={true}
        selectedDayColor={TEAL_600}
        selectedDayTextColor={WHITE}
      />
      <NoPlanComponent day={day}></NoPlanComponent>
      <Items items={items} onPressItem={null}></Items>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <ScrollView>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={Titles.titlePrimary}>Přidat konzumaci</Text>
              <DividerVertical space={30} />
              <Text style={Inputs.InputTitle}>Značka</Text>
              <DividerVertical space={4} />
              <TextInput
                placeholderTextColor={COOL_GRAY_500}
                style={Inputs.TextInputCons}
                onChangeText={setBrand}
                value={brand}
                placeholder="Značka"
              />
              <DividerVertical space={12} />
              <Text style={Inputs.InputTitle}>Cena</Text>
              <DividerVertical space={4} />
              <TextInput
                placeholderTextColor={COOL_GRAY_500}
                style={Inputs.TextInputCons}
                onChangeText={setPrice}
                value={price}
                placeholder="Kč"
                keyboardType="numeric"
              />
              <DividerVertical space={12} />
              <Text style={Inputs.InputTitle}>Množství</Text>
              <DividerVertical space={4} />
              <TextInput
                placeholderTextColor={COOL_GRAY_500}
                style={Inputs.TextInputCons}
                onChangeText={setVolume}
                value={volume}
                placeholder="ml"
                keyboardType="numeric"
              />

              <DividerVertical space={12} />
              <View
                style={[
                  {
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                ]}
              >
                <TouchableOpacity
                  style={[{ flexDirection: "row" }, styles.button]}
                  onPress={decreaseCount}
                >
                  <Text style={Buttons.IncreaseDecreseButton}>-</Text>
                </TouchableOpacity>
                <View style={[{ flexDirection: "row" }]}>
                  <Text style={Buttons.Counter}>{count}</Text>
                </View>
                <TouchableOpacity
                  style={[{ flexDirection: "row", borderRadius: 100 }]}
                  onPress={increaseCount}
                >
                  <Text style={Buttons.IncreaseDecreseButton}>+</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.validation}>{validationMessage}</Text>

              <TouchableOpacity>
                <Button
                  title="Přidat"
                  onPress={{ saveItemAtServerAndLocal }}
                  variant="primary"
                />
              </TouchableOpacity>
              <DividerVertical space={12} />
              <TouchableOpacity>
                <Button
                  title="Zrušit"
                  onPress={() => setModalVisible(!modalVisible)}
                  variant="default"
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Modal>
      <FloatingAction
        color={TEAL_600}
        actions={actions}
        visible={!modalVisible && !(day === 0)}
        onPressItem={(name, alcohol) => {
          setModalVisible(true);
          setAlcohol(alcohol);
          setType(name);
        }}
      />
    </View>
    // </ScrollView>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    alignItems: "center",
    minWidth: DEVICE_WIDTH - 20,
    marginTop: 200,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 300,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  validation: {
    color: "#ff0000",
    fontWeight: "bold",
    textAlign: "center",
  },
  bold: {
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
    fontSize: 20,
  },
});
