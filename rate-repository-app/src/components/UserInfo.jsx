import React from "react";
import { format } from "date-fns";
import useAuthUser from "../hooks/useAuthUser";
import { View, FlatList, StyleSheet, Button, Alert } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { useHistory } from "react-router-native";
import useReviewDelete from "../hooks/useReviewDelete";

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

export const ReviewItem = ({ item, refetch }) => {
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
    buttonContainer: {
      display: "flex",
      flexDirection: "row",
      padding: 10,
      margin: 10,
    },
    spacer: {
      width: 20,
      height: 10,
    },
  });

  const history = useHistory();
  const [deleteReview] = useReviewDelete();

  const handleView = () => {
    history.push(`/repo/${item.repositoryId}`);
  };

  const handleDeleteButton = () => {
    const onPress = async () => {
      await deleteReview({ id: item.id });
      refetch();
    };
    Alert.alert(
      "Delete Review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "OK", onPress },
      ],
      { cancelable: false }
    );
  };

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
          <View style={styles.buttonContainer}>
            <Button title="View Repo" onPress={() => handleView()} />
            <View style={styles.spacer} />
            <Button
              title="Delete Review"
              onPress={() => handleDeleteButton()}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const UserInfo = () => {
  const { authUser, refetch } = useAuthUser({ includeReviews: true });
  if (!authUser) {
    refetch();
    return <Text>Loading...</Text>;
  }
  const reviewNodes = authUser.reviews
    ? authUser.reviews.edges.map((edge) => edge.node)
    : [];

  const renderItem = ({ item }) => <ReviewItem item={item} refetch={refetch} />;

  return (
    <FlatList
      style={styles.list}
      data={reviewNodes}
      renderItem={renderItem}
      ItemSeparatorComponent={ItemSeparator}
      ListFooterComponent={ItemFooter}
      keyExtractor={(reviewNodes) => reviewNodes.id}
    />
  );
};

export default UserInfo;
