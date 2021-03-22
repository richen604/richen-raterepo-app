import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-native";

import { CREATE_REVIEW } from "../graphql/mutations";

const useReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);
  const history = useHistory();

  const createReview = async ({
    repoOwnerName,
    repoName,
    ratingInput,
    review,
  }) => {
    const parseRating = Number(ratingInput);
    const { data } = await mutate({
      variables: {
        review: {
          repositoryName: repoName,
          ownerName: repoOwnerName,
          rating: parseRating,
          text: review,
        },
      },
    });

    history.push(`/repo/${data.createReview.repositoryId}`);
  };

  return [createReview, result];
};

export default useReview;
