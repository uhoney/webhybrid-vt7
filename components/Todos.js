import { View, Text, StyleSheet, FlatList, TextInput, Button, TouchableOpacity } from "react-native";
import React, { useReducer, useState } from "react";

const myReducer = (state, action) => {
  // state = nykyinen tila todos listassa
  // action = toiminto, mikä tehdään statelle. Sillä on 'type' property ja muitakin

  switch (action.type) {
    case "add":
      // spreadoperaattorilla tekee uuden entryn. tämähän on siis json objektiksi väännetty
      /* Siis tämmönen
        {
            text: 'bla bla'
        }
        */
      return [...state, { text: action.text }];
    case "remove":
      // Tämä '_' on joku reactin oma 'ignore', eli tarkoituksella ei välitetä siitä
      return state.filter((_, index) => index !== action.index);
    default:
      throw new Error();
  }
};

export default function Todos() {
  const [todos, dispatch] = useReducer(myReducer, []);
  const [usrInput, setUsrInput] = useState("");

  // Dispatcher, eli lähettää tiedot tuolle myReducerille. Apurifunktio.
  function handleAdd() {
    dispatch({ type: "add", text: usrInput });
    setUsrInput("");
  }

  function handleRemove(index) {
    dispatch({ type: "remove", index });
  }

  return (
    <>
      <View style={styles.container}>
        <TextInput placeholder="Add a new todo.." value={usrInput} onChangeText={setUsrInput} />
        <Button title="add todo" onPress={handleAdd} />
      </View>
      <FlatList
        data={todos}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => handleRemove(index)}>
            <Text style={styles.todoText}>{item.text}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(_, index) => index.toString()}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    padding: 12,
  },
  todoText: {
    fontSize: 18,
    padding: 12,
  },
});
