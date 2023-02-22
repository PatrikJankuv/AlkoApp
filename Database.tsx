import * as SQLite from "expo-sqlite";
import "./Global.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function openConnection() {
  const db = SQLite.openDatabase("database.db");
  db.transaction((tx) => {
    tx.executeSql(
      "create table if not EXISTS Day (id integer primary key not NULL, calories Integer, price Integer, volume double, day date UNIQUE, server_id int);"
    );
    tx.executeSql(
      "create table if not EXISTS Item (id integer primary key not NULL, brand text, type text, price integer, volume Integer, count_item Integer, day_id INT,  server_id int, FOREIGN KEY (day_id) REFERENCES Day(id));"
    );
  });
  return db;
}

export const addItem = (
  db,
  brand,
  price,
  volume,
  count,
  type,
  day,
  server_id
) => {
  db.transaction((tx) => {
    tx.executeSql(
      "insert into item (brand, price, volume, count_item, type, day_id, server_id) values (?, ?, ?, ?, ?, ?, ?)",
      [brand, price, volume, count, type, day, server_id]
    );
    tx.executeSql("select * from item", [], (_, { rows }) =>
      console.log(JSON.stringify(rows._array))
    );
  }, null);
};

export const allItems = (db, day) => {
  db.transaction((tx) => {
    tx.executeSql(
      "select * from item where day_id = ?",
      [day],
      (_, { rows: { _array } }) => console.log(JSON.stringify(_array))
    );
  }, null);
};

export const addDay = (db, calories, price, volume, day, server_id) => {
  db.transaction((tx) => {
    tx.executeSql(
      "insert into day (calories, price, volume, day, server_id) values (?, ?, ?, ?, ?)",
      [calories, price, volume, day, server_id]
    );
  }, null);

  allDay(db);

  db.transaction((tx) => {
    tx.executeSql(
      "update day set calories = ?, price = ?, volume = ? where day = ?",
      [calories, price, volume, day]
    );
    tx.executeSql("select * from day", [], (_, { rows }) =>
      console.log(JSON.stringify(rows))
    );
  }, null);
};

export const allDay = (db) => {
  db.transaction((tx) => {
    tx.executeSql("select * from Day", [], (_, { rows }) =>
      console.log(JSON.stringify(rows))
    );
  }, null);
};

export const truncateAllTables = (db) => {
  db.transaction((tx) => {
    tx.executeSql("drop table Item");
    tx.executeSql("drop table Day");
  });
};
