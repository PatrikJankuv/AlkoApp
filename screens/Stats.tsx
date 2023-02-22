import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

import { openConnection } from "../Database";
const db = openConnection();

function Items({ items }) {
  if (items === null || items.length === 0) {
    return null;
  }

  return (
    <ScrollView>
      {items.map(({ total, type, volume, index }) => (
        <Text
          key={total}
          style={{
            borderColor: "#000",
            borderWidth: 1,
            padding: 12,
          }}
        >
          {type} - {volume}ml {total}kc
        </Text>
      ))}
    </ScrollView>
  );
}

export default function StatsScreen() {
  const [countItems, setCountItems] = React.useState("");
  const [money, setMoney] = React.useState(0);
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    countItemsDb();
    wasteMoneyDb();
    groupItemsByTypeAndVolumeDb();
  }, []);

  const groupItemsByTypeAndVolumeDb = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "select sum(total_price) as total, type, volume from (select count_item * price as total_price, volume, type from item) group by type, volume",
        [],
        (_, { rows: { _array } }) => {
          setItems(_array);
        }
      );
    }, null);
  };

  const countItemsDb = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "select count(*) from item",
        [],
        (_, { rows: { _array } }) => {
          setCountItems(_array[0]["count(*)"]);
        }
      );
    }, null);
  };

  const wasteMoneyDb = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "select sum(price) from item",
        [],
        (_, { rows: { _array } }) => {
          setMoney(_array[0]["sum(price)"]);
        }
      );
    }, null);
  };

  // const onpress = () => {
  //   console.log("ahoj");
  // };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "center",
        margin: 20,
      }}
    >
      <Text>Počet drinků tenhle týden</Text>
      <Text>{countItems}</Text>

      <Text>Celková útrata</Text>
      <Text>{money} Kč</Text>

      <Text>Detailní výpis konzumací</Text>
      <Items items={items}></Items>
    </View>
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
