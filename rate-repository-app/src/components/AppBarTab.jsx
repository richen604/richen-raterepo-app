import React from "react";
import { View, StyleSheet } from "react-native";
import Text from "./Text";

const styles = StyleSheet.create({
  flexA: {
    flexGrow: 0,
    padding: 10,
  },
});

const AppBarTab = ({ name }) => {
  return (
    <View style={styles.flexA}>
      <Text color="textSecondary" fontWeight="bold">
        {name}
      </Text>
    </View>
  );
};

export default AppBarTab;
