import { useMutation } from "react-query";
import { logOut } from "../services/authAPI";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logOut,
    onSuccess: () => {
      toast.success("Wylogowano!");
      navigate("/login");
    },
  });

  return { logout, isLoading };
}
