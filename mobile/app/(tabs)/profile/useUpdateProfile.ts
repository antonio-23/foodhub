import { useMutation, useQueryClient } from "react-query";
import { updateCurrentUser } from "../../../services/authAPI";

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  const { mutate: updateProfile, isLoading } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user);
      queryClient.refetchQueries(["user"]);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return { updateProfile, isLoading };
}
