import React, { setState, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import ListItem from "../components/ListItem";
import Screen from "../components/Screen";
import ListItemSeperator from "../components/ListItemSeperator";
import ListItemDeleteAction from "../components/ListItemDeleteAction";

const initialMessages = [
  {
    id: 1,
    title: "First Item",
    description: "description",
    image: require("../assets/mosh.jpg"),
  },
  {
    id: 2,
    title: "Second Item",
    description: "description",
    image: require("../assets/mosh.jpg"),
  },
  {
    id: 3,
    title: "Third Item",
    description: "description",
    image: require("../assets/mosh.jpg"),
  },
];

export default function MessagesScreen() {
  const [messages, setMessages] = useState(initialMessages);
  const [refreshing, setRefreshing] = useState(false);

  const deleteHandler = (message) => {
    setMessages(messages.filter((m) => m.id !== message.id));
  };

  return (
    <Screen>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={ListItemSeperator}
        refreshing={refreshing}
        onRefresh={() =>
          setMessages([
            {
              id: 1,
              title: "First Item",
              description: "description",
              image: require("../assets/mosh.jpg"),
            },
          ])
        }
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            subTitle={item.description}
            image={item.image}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => deleteHandler(item)} />
            )}
            onPress={() => console.log("Message Selected", item)}
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({});
