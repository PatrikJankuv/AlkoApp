import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";
import * as SQLite from "expo-sqlite";
import { openConnection, addItem } from "../Database";

const db = openConnection();

function ItemsProgress({ items }) {
  if (items === null || items.length === 0) {
    return null;
  }

  return (
    <ScrollView>
      {items.map(({ day, total_volume, volume }) => (
        <View
          key={day}
          style={{
            borderColor: "#000",
            borderWidth: 1,
            padding: 12,
          }}
        >
          <Text>{day}</Text>
          <Text>Naplánováno {volume}</Text>
          <Text>Vypito {total_volume}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
export default function ProgressScreen() {
  const [text, setText] = React.useState(null);
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    getProgress();
  }, []);

  const getProgress = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "select sum(total_volume) as total_volume, day, Day.volume from (select count_item * volume as total_volume, day_id from item) inner join Day on Day.id = day_id group by day_id",
        [],
        (_, { rows: { _array } }) => {
          setItems(_array);
        }
      );
    }, null);
  };

  return (
    <ScrollView>
      <ItemsProgress items={items} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
