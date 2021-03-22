import React, { useState } from "react";
import { FlatList, View, StyleSheet, TouchableOpacity } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { useHistory } from "react-router-native";
import { Searchbar } from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";
import { useDebounce } from "use-debounce";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: "#f4f6f6",
  },
});

const ListHeader = ({
  setOrderDirectionParam,
  setOrderByParam,
  searchQuery,
  setSearchQuery,
}) => (
  <>
    <Search {...{ searchQuery, setSearchQuery }} />
    <Dropdown {...{ setOrderDirectionParam, setOrderByParam }} />
  </>
);

const Search = ({ searchQuery, setSearchQuery }) => {
  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
  );
};

const Dropdown = ({ setOrderDirectionParam, setOrderByParam }) => {
  const handleSort = ({ orderBy, orderDirection }) => {
    setOrderDirectionParam(orderDirection);
    setOrderByParam(orderBy);
  };
  return (
    <RNPickerSelect
      placeholder={{
        label: "Select an item...",
        value: { orderDirection: "DESC", orderBy: "CREATED_AT" },
      }}
      onValueChange={(value) => handleSort(value)}
      items={[
        {
          label: "Latest Repositories",
          value: { orderDirection: "DESC", orderBy: "CREATED_AT" },
        },
        {
          label: "Highest Rated Repositories",
          value: { orderDirection: "DESC", orderBy: "RATING_AVERAGE" },
        },
        {
          label: "Lowest Rated Repositories",
          value: { orderDirection: "ASC", orderBy: "RATING_AVERAGE" },
        },
      ]}
    />
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const [orderByParam, setOrderByParam] = useState(null);
  const [orderDirectionParam, setOrderDirectionParam] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const history = useHistory();
  const [debouncedSearch] = useDebounce(searchQuery, 500);

  const { repositories } = useRepositories({
    orderByParam,
    orderDirectionParam,
    debouncedSearch,
  });

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
      zIndex: 1,
      position: "relative",
    },
  });

  return (
    <FlatList
      style={styles.list}
      data={repositoryNodes}
      renderItem={renderItem}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.fullName}
      ListHeaderComponent={ListHeader({
        setOrderDirectionParam,
        setOrderByParam,
        searchQuery,
        setSearchQuery,
      })}
    />
  );
};

export default RepositoryList;
