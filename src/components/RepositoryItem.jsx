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
      <Text testID="RepoItemLanguage" style={styles.text}>
        {language}
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
        <Image testID="RepoItemImage" style={styles.image} source={{ uri }} />
      </View>
      <View style={styles.InnerContainer}>
        <Text
          testID="RepoItemFullName"
          style={styles.titleItem}
          fontWeight="bold"
          color="textPrimary"
        >
          {item.fullName}
        </Text>
        <Text
          testID="RepoItemDescription"
          style={styles.titleItem}
          color="textSecondary"
        >
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
    itemContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    alignText: {
      textAlign: "center",
      padding: 1,
    },
  });

  const numParse = (num) => {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
      : Math.sign(num) * Math.abs(num);
  };

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Text
          testID="RepoItemStargazersCount"
          style={styles.alignText}
          fontWeight="bold"
        >
          {numParse(item.stargazersCount)}
        </Text>
        <Text style={styles.alignText} color="textSecondary">
          Stars
        </Text>
      </View>
      <View style={styles.itemContainer}>
        <Text
          testID="RepoItemForksCount"
          style={styles.alignText}
          fontWeight="bold"
        >
          {numParse(item.forksCount)}
        </Text>
        <Text style={styles.alignText} color="textSecondary">
          Forks
        </Text>
      </View>
      <View style={styles.itemContainer}>
        <Text
          testID="RepoItemReviewCount"
          style={styles.alignText}
          fontWeight="bold"
        >
          {item.reviewCount}
        </Text>
        <Text style={styles.alignText} color="textSecondary">
          Reviews
        </Text>
      </View>
      <View style={styles.itemContainer}>
        <Text
          testID="RepoItemRatingAverage"
          style={styles.alignText}
          fontWeight="bold"
        >
          {item.ratingAverage}
        </Text>
        <Text style={styles.alignText} color="textSecondary">
          Rating
        </Text>
      </View>
    </View>
  );
};

const RepositoryItem = ({ item }) => {
  const styles = StyleSheet.create({
    RepoItem: {
      backgroundColor: "#fdfefe",
      margin: 15,
      zIndex: 1,
      position: "relative",
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
