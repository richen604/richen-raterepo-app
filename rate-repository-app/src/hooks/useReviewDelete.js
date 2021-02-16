import { useMutation } from "@apollo/react-hooks";

import { DELETE_REVIEW } from "../graphql/mutations";

const useReviewDelete = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW);

  const deleteReview = async ({ id }) => {
    await mutate({
      variables: {
        id,
      },
    });
  };

  return [deleteReview, result];
};

export default useReviewDelete;
