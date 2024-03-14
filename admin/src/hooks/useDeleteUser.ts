import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser as deleteUserApi } from "../services/apiAuth";
import toast from "react-hot-toast";

export function useDeleteUser() {
  const queryClient = useQueryClient();
  const { mutate: deleteUser, isLoading: isDeleting } = useMutation({
    mutationFn: deleteUserApi,
    onSuccess: () => {
      toast.success("Użytkownik został usunięty");
      queryClient.invalidateQueries({
        queryKey: ["allUsers"],
      });
    },
  });

  return { deleteUser, isDeleting };
}
