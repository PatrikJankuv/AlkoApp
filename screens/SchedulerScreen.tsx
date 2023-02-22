import * as React from "react";
import {
  Text,
  TextInput,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import Moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "../Global.js";
import { Routes, StackNavigationProps } from "../src/components/Navigation";
Moment.locale("en");
import { openConnection, addDay, allDay, allItems } from "../Database";
import { Inputs } from "../src/components/styles/inputs";
import DividerVertical from "../src/components/layout/DividerVertical";
import Button from "../src/components/Button";

const db = openConnection();

export default function SchedulerScreen({
  navigation,
}: StackNavigationProps<Routes, "SchedulerScreen">) {
  const [kcl, onChangeKcl] = React.useState("");
  const [price, onChangePrice] = React.useState("");
  const [volume, onChangeVolume] = React.useState("");
  const [date, setDate] = React.useState(new Date());
  const [validationMessage, setMessage] = React.useState("");
  const [serverId, setServerId] = React.useState("0");

  React.useEffect(() => {
    getDay(Moment(date).format("yyyy-MM-DD"));
  }, []);

  const validForm = () => {
    if (kcl === "" || price === "" || volume === "") {
      setMessage("Vypln vsechny policka");
      return false;
    } else {
      setMessage("");
      return true;
    }
  };

  const saveDayAtServerAndLocal = async () => {
    if (!validForm()) {
      return;
    }

    const jwtToken = await AsyncStorage.getItem("@jwt_token");
    if (jwtToken === null) {
      addToLocalDb("0");
    } else {
      const day_object = {
        dateTime: Moment(date).format("yyyy-MM-DD"),
        planAlcoholVolume: parseInt(volume),
        planMoney: parseInt(price),
        planPerMile: parseInt(kcl),
      };

      if (serverId === "0") {
        fetch(global.url + "/day", {
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
      } else {
        fetch(global.url + "/day/" + serverId, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: jwtToken,
          },
          body: JSON.stringify(day_object),
        })
          .catch((error) => console.error(error))
          .finally();
        addToLocalDb(serverId);
      }
    }
  };

  const getDay = (day) => {
    db.transaction((tx) => {
      tx.executeSql(
        "select * from day where day = ?",
        [day],
        (_, { rows: { _array } }) => {
          if (_array[0] == null) {
            onChangePrice("");
            onChangeKcl("");
            onChangeVolume("");
            setServerId("0");
          } else {
            onChangePrice(_array[0].price.toString());
            onChangeKcl(_array[0].calories.toString());
            onChangeVolume(_array[0].volume.toString());
            setServerId(_array[0].server_id.toString());
          }
        }
      );
    }, null);
  };

  const addToLocalDb = (server_id) => {
    addDay(
      db,
      parseInt(kcl),
      parseInt(price),
      parseFloat(volume),
      Moment(date).format("yyyy-MM-DD"),
      parseInt(server_id)
    );

    // allDay(db);
  };

  const onDateChange = (temp) => {
    setDate(temp);
    getDay(Moment(temp).format("yyyy-MM-DD"));
  };

  return (
    <ScrollView>
      <SafeAreaView
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <CalendarPicker onDateChange={onDateChange} />
        <Text style={Inputs.InputTitle}>
          Na {Moment(date).format("DD.MM.yyyy")} máš naplánováno
        </Text>

        <TextInput
          style={Inputs.TextInputCons}
          onChangeText={onChangeKcl}
          value={kcl}
          placeholder="kcl"
          keyboardType="numeric"
        />
        <Text>kalorií</Text>
        <DividerVertical space={20} />

        <Text style={Inputs.InputTitle}>Neutrácej víc jak</Text>
        <TextInput
          style={Inputs.TextInputCons}
          value={price}
          onChangeText={onChangePrice}
          placeholder=""
          keyboardType="numeric"
        />
        <Text>Kč</Text>
        <DividerVertical space={20} />
        <Text style={Inputs.InputTitle}>Celkově bys neměl vypít</Text>
        <TextInput
          style={Inputs.TextInputCons}
          onChangeText={onChangeVolume}
          value={volume}
          placeholder=""
          keyboardType="numeric"
        />
        <Text>ml</Text>

        <Text style={styles.validation}>{validationMessage}</Text>
        <TouchableOpacity>
          <Button
            title="Upravit plán"
            onPress={saveDayAtServerAndLocal}
            variant="default"
          />
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    width: 150,
    borderWidth: 1,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
  validation: {
    color: "#ff0000",
    fontWeight: "bold",
    textAlign: "center",
  },
});
