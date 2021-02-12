import React from "react";
import { View, StyleSheet, Image } from "react-native";
import Text from "./Text";
import theme from "../theme";

const LanguageTag = ({ language }) => {
  const styles = StyleSheet.create({
    container: {
      width: 90,
      height: 30,
      borderRadius: 5,
      backgroundColor: "#0366d6",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 2,
    },
    text: {
      color: "#fdfefe",
      fontFamily: theme.fonts.main,
    },
  });
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{language}</Text>
    </View>
  );
};

const InfoItem = ({ count, label }) => {
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    alignText: {
      textAlign: "center",
      padding: 1,
    },
  });
  return (
    <View style={styles.container}>
      <Text style={styles.alignText} fontWeight="bold">
        {count}
      </Text>
      <Text style={styles.alignText} color="textSecondary">
        {label}
      </Text>
    </View>
  );
};

const TitleContainer = ({ item }) => {
  const styles = StyleSheet.create({
    TitleContainer: {
      display: "flex",
      flexDirection: "row",
      padding: 15,
      paddingBottom: 0,
    },
    InnerContainer: {
      display: "flex",
      paddingTop: 2,
      paddingLeft: 15,
      paddingRight: 15,
    },
    image: {
      height: 50,
      width: 50,
      borderRadius: 5,
    },
    titleItem: {
      marginBottom: 5,
    },
  });

  const uri = item.ownerAvatarUrl;

  return (
    <View style={styles.TitleContainer}>
      <View>
        <Image style={styles.image} source={{ uri }} />
      </View>
      <View style={styles.InnerContainer}>
        <Text style={styles.titleItem} fontWeight="bold" color="textPrimary">
          {item.fullName}
        </Text>
        <Text style={styles.titleItem} color="textSecondary">
          {item.description}
        </Text>
        <LanguageTag style={styles.titleItem} language={item.language} />
      </View>
    </View>
  );
};

const InfoContainer = ({ item }) => {
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      padding: 10,
      margin: 10,
    },
  });

  const numParse = (num) => {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
      : Math.sign(num) * Math.abs(num);
  };

  return (
    <View style={styles.container}>
      <InfoItem count={numParse(item.stargazersCount)} label="Stars" />
      <InfoItem count={numParse(item.forksCount)} label="Forks" />
      <InfoItem count={item.reviewCount} label="Reviews" />
      <InfoItem count={item.ratingAverage} label="Rating" />
    </View>
  );
};

const RepositoryItem = ({ item }) => {
  const styles = StyleSheet.create({
    RepoItem: {
      backgroundColor: "#fdfefe",
      margin: 15,
    },
  });
  return (
    <View style={styles.RepoItem}>
      <TitleContainer {...{ item }} />
      <InfoContainer {...{ item }} />
    </View>
  );
};

export default RepositoryItem;
