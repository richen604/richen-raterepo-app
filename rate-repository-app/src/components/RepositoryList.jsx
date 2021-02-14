import React from "react";
import { FlatList, View, StyleSheet, TouchableOpacity } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { useHistory } from "react-router-native";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: "#f4f6f6",
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories } = useRepositories();
  const history = useHistory();

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const handleRepoPage = (item) => {
    history.push(`/repo/${item.id}`);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleRepoPage(item)}>
      <RepositoryItem item={item} />
    </TouchableOpacity>
  );
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
      data={repositoryNodes}
      renderItem={renderItem}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.fullName}
    />
  );
};

export default RepositoryList;
