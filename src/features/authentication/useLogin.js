import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: ({ session, user }) => {
      queryClient.setQueryData(["user"], user);
      navigate("/dashboard", { replace: true });
    },
    onError: () => {
      toast.error("Provided email or password are incorrect");
    },
  });

  return { login, isLoading };
}
