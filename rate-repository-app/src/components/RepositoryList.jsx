import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from "./RepositoryItem";
import { repositories } from "../data/data";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: "#f4f6f6",
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const renderItem = ({ item }) => <RepositoryItem item={item} />;
  const styles = StyleSheet.create({
    list: {
      backgroundColor: "#f4f6f6",
      margin: 0,
      padding: 0,
    },
  });
  return (
    <FlatList
      style={styles.list}
      data={repositories}
      renderItem={renderItem}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.fullName}
    />
  );
};

export default RepositoryList;
