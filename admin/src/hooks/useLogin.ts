import { useMutation } from "react-query";
import { logIn } from "../services/authAPI";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: (data) => logIn(data),
    onSuccess: () => {
      toast.success("Zalogowano!");
      navigate("/dashboard");
    },
    onError: (error: any) => {
      toast.error(error?.message);
    },
  });

  return { login, isLoading };
}
