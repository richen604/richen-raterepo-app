import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from "../../components/RepositoryItem";
import { render } from "@testing-library/react-native";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: "#f4f6f6",
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListContainer = ({ repositories }) => {
  const renderItem = ({ item }) => <RepositoryItem item={item} />;
  const styles = StyleSheet.create({
    list: {
      backgroundColor: "#f4f6f6",
      margin: 0,
      padding: 0,
    },
  });
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      testID="FlatList"
      style={styles.list}
      data={repositoryNodes}
      renderItem={renderItem}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.fullName}
    />
  );
};

describe("RepositoryList", () => {
  describe("RepositoryListContainer", () => {
    it("renders repository information correctly", () => {
      const repositories = {
        pageInfo: {
          totalCount: 8,
          hasNextPage: true,
          endCursor:
            "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
        },
        edges: [
          {
            node: {
              id: "jaredpalmer.formik",
              fullName: "jaredpalmer/formik",
              description: "Build forms in React, without the tears",
              language: "TypeScript",
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars2.githubusercontent.com/u/4060187?v=4",
            },
            cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
          },
          {
            node: {
              id: "async-library.react-async",
              fullName: "async-library/react-async",
              description: "Flexible promise-based React data loader",
              language: "JavaScript",
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars1.githubusercontent.com/u/54310907?v=4",
            },
            cursor:
              "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          },
        ],
      };

      // Add your test code here
      const { getAllByTestId } = render(
        <RepositoryListContainer repositories={repositories} />
      );

      const numParse = (num) => {
        return Math.abs(num) > 999
          ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
          : Math.sign(num) * Math.abs(num);
      };

      const mappedRepo = repositories.edges.map((edge) => edge.node);
      getAllByTestId("RepoItemImage").forEach((element, index) => {
        expect(element.props.source.uri).toContain(
          mappedRepo[index].ownerAvatarUrl
        );
      });
      getAllByTestId("RepoItemLanguage").forEach((element, index) => {
        expect(element).toHaveTextContent(mappedRepo[index].language);
      });
      getAllByTestId("RepoItemFullName").forEach((element, index) => {
        expect(element).toHaveTextContent(mappedRepo[index].fullName);
      });
      getAllByTestId("RepoItemDescription").forEach((element, index) => {
        expect(element).toHaveTextContent(mappedRepo[index].description);
      });
      getAllByTestId("RepoItemStargazersCount").forEach((element, index) => {
        expect(element).toHaveTextContent(
          numParse(mappedRepo[index].stargazersCount)
        );
      });
      getAllByTestId("RepoItemForksCount").forEach((element, index) => {
        expect(element).toHaveTextContent(
          numParse(mappedRepo[index].forksCount)
        );
      });
      getAllByTestId("RepoItemReviewCount").forEach((element, index) => {
        expect(element).toHaveTextContent(mappedRepo[index].reviewCount);
      });
      getAllByTestId("RepoItemRatingAverage").forEach((element, index) => {
        expect(element).toHaveTextContent(mappedRepo[index].ratingAverage);
      });
    });
  });
});
