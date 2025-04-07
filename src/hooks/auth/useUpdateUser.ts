import { useMutation } from "@tanstack/react-query";

import authService from "@/services/auth/AuthService";
import useModalStore from "@/stores/useModalStore";
import useUserStore from "@/stores/useUserStore";
import { APIError } from "@/types/error";

const updateUserRequest = async (formData: FormData) => {
  return await authService.updateUser(formData);
};

export const useUpdateUser = () => {
  const { user, updateUserState } = useUserStore();
  const openAlert = useModalStore(state => state.openAlert);

  const { mutate: updateUser } = useMutation({
    mutationFn: updateUserRequest,

    onSuccess: data => {
      if (!user) return;

      updateUserState({
        ...data,
        teamId: user.teamId,
      });
    },

    onError: error => {
      const message =
        error instanceof APIError
          ? error.message
          : "알 수 없는 오류가 발생했어요.";

      openAlert(message);
    },
  });

  return { handleUpdateUser: updateUser };
};
