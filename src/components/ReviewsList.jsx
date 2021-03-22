import { format } from "date-fns";
import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useParams } from "react-router-native";
import Text from "./Text";
import theme from "../theme";
import useGetReview from "../hooks/useGetReview";

const styles = StyleSheet.create({
  separator: {
    height: 5,
    backgroundColor: "#f4f6f6",
  },
  list: {
    backgroundColor: "#f4f6f6",
    margin: 0,
    padding: 0,
  },
  footer: {
    height: 100,
    backgroundColor: "#f4f6f6",
  },
});
const ItemSeparator = () => <View style={styles.separator} />;
const ItemFooter = () => <View style={styles.footer} />;
const renderItem = ({ item }) => <ReviewItem item={item} />;

const ReviewItem = ({ item }) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "#fdfefe",
      margin: 5,
    },
    reviewItem: {
      margin: 0,
      padding: 10,
      display: "flex",
      flexDirection: "row",
      borderRadius: 5,
      width: "80%",
    },
    ratingContainer: {
      display: "flex",
      flexDirection: "column",
      marginRight: 10,
    },
    contentContainer: {
      display: "flex",
      flexDirection: "column",
    },
    rating: {
      textAlign: "center",
      padding: 13,
      width: 50,
      height: 50,
      borderRadius: 50 / 2,
      borderWidth: 3,
      color: theme.colors.blue,
      borderColor: theme.colors.blue,
    },
    contentUsername: {
      padding: 2,
    },
    contentText: {
      textAlign: "left",
      padding: 2,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.reviewItem}>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>{item.rating}</Text>
        </View>
        <View styles={styles.contentContainer}>
          <Text fontWeight="bold" style={styles.contentUsername}>
            {item.user.username}
          </Text>
          <Text color="textSecondary">
            {format(new Date(`${item.createdAt}`), "dd.MM.yy")}
          </Text>
          <Text style={styles.contentText}>{`${item.text}`}</Text>
        </View>
      </View>
    </View>
  );
};

const ReviewsList = ({ headerComponent }) => {
  const id = useParams().id;
  const { reviews, fetchMore } = useGetReview({
    id,
    first: 4,
  });

  const reviewNodes = reviews ? reviews.edges.map((edge) => edge.node) : [];

  const onEndReached = () => {
    fetchMore();
  };

  return (
    <FlatList
      ListHeaderComponent={headerComponent}
      style={styles.list}
      data={reviewNodes}
      renderItem={renderItem}
      ItemSeparatorComponent={ItemSeparator}
      ListFooterComponent={ItemFooter}
      keyExtractor={(reviewNodes) => reviewNodes.id}
      onEndReachedThreshold={0.5}
      onEndReached={onEndReached}
    />
  );
};

export default ReviewsList;
