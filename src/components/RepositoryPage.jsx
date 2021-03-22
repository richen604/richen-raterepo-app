import React from "react";
import { View, Button, Linking } from "react-native";
import RepositoryItem from "./RepositoryItem";
import { useParams } from "react-router-native";
import { useQuery } from "@apollo/react-hooks";
import { GET_REPO } from "../graphql/queries";
import ReviewsList from "./ReviewsList";

const RepositoryHeader = () => {
  const id = useParams().id;
  const getRepo = useQuery(GET_REPO, {
    fetchPolicy: "cache-and-network",
    variables: {
      id,
    },
  });

  if (getRepo.loading) return null;

  const handleButton = async (url) => {
    await Linking.openURL(url);
  };

  return (
    <>
      <RepositoryItem item={getRepo.data.repository} />
      <Button
        title="View on Github"
        onPress={() => handleButton(getRepo.data.repository.url)}
      />
    </>
  );
};

const RepositoryPage = () => {
  return (
    <View>
      <ReviewsList headerComponent={RepositoryHeader} />
    </View>
  );
};

export default RepositoryPage;
