import { useQuery } from "@apollo/react-hooks";
import { format } from "date-fns";
import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { GET_REVIEWS } from "../graphql/queries";
import { useParams } from "react-router-native";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: "#f4f6f6",
  },
  list: {
    backgroundColor: "#f4f6f6",
    margin: 0,
    padding: 0,
  },
});
const ItemSeparator = () => <View style={styles.separator} />;
const renderItem = ({ item }) => <ReviewItem item={item} />;

const ReviewItem = ({ item }) => {
  const styles = StyleSheet.create({
    reviewItem: {
      backgroundColor: "#fdfefe",
      margin: 10,
      padding: 10,
      display: "flex",
      flexDirection: "row",
      borderRadius: 5,
      width: "95%",
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
      width: "20%",
      padding: 2,
    },
  });

  /*
    "createdAt": "2021-02-12T11:24:56.998Z",
  "id": "753f3e99-e73a-43a3-9a50-b30d7727c0eb.jaredpalmer.formik",
  "rating": 96,
  "text": "Lorem ipsum dolor sit amet, per brute apeirian ei. Malis facilisis vel ex, ex vivendo signiferumque nam, nam ad natum electram constituto. Causae latine at sea, ex nec ullum ceteros, est ut dicant splendide. Omnis electram ullamcorper est ut.",
  "user": Object {
    "__typename": "User",
    "id": "753f3e99-e73a-43a3-9a50-b30d7727c0eb",
    "username": "leeroyjenkins",
  },
}
  */

  return (
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
        <Text style={styles.contentText}>{item.text}</Text>
      </View>
    </View>
  );
};

const ReviewsList = ({ headerComponent }) => {
  const id = useParams().id;
  const getReviews = useQuery(GET_REVIEWS, {
    fetchPolicy: "cache-and-network",
    variables: {
      id,
    },
  });

  if (getReviews.loading) return null;

  const reviewNodes = getReviews.data.repository.reviews
    ? getReviews.data.repository.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      ListHeaderComponent={headerComponent}
      style={styles.list}
      data={reviewNodes}
      renderItem={renderItem}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(reviewNodes) => reviewNodes.id}
    />
  );
};

export default ReviewsList;
