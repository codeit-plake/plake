"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";

import userSignInAction from "@/actions/user-signin-action";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import AlertModal from "@/components/modals/confirm-alert-modal/AlertModal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { LOGIN_INPUTS } from "@/constants/loginJoin";
import useDebounce from "@/hooks/useDebounce";
import useFavorite from "@/hooks/useFavorite";
import { useModal } from "@/hooks/useModal";
import { LoginFormSchema } from "@/schemas/loginJoinSchema";
import useUserStore from "@/stores/useUserStore";
import { IUser } from "@/types/user";

import {
  IRegisterWithValidation,
  TErrorMsg,
} from "../../join/_components/JoinForm";

export type TLoginForm = z.infer<typeof LoginFormSchema>;

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    setError,
  } = useForm<TLoginForm>({
    resolver: zodResolver(LoginFormSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false); // 추가: 폼 제출 시도 추적

  const [alertMessage, setAlertMessage] = useState("");
  // const [state, formAction] = useFormState(userSignInAction, {
  //   status: false,
  //   error: "",
  //   user: null,
  // });

  const [authState, setAuthState] = useState<
    | { status: boolean; error: string; user: null }
    | { status: boolean; error: string; user: IUser }
  >({
    status: false,
    error: "",
    user: null,
  });

  const { setUserState } = useUserStore();
  const { isOpen, onClose, onOpen } = useModal();

  const { setFavoriteInitValue } = useFavorite();

  // 디버깅용 로거 추가
  useEffect(() => {
    console.log("isSubmitting 변경:", isSubmitting);
    console.log("submitAttempted 변경:", submitAttempted);
  }, [isSubmitting, submitAttempted]);

  useEffect(() => {
    console.log("authState 변경:", authState);

    // 폼 제출 시도가 없었다면 처리 건너뛰기
    if (!submitAttempted) {
      console.log("폼 제출 시도 없음, 처리 건너뜀");
      return;
    }

    // 로딩 중이 아니면서 초기 상태라면 처리하지 않음
    if (
      !isSubmitting &&
      authState.error === "" &&
      !authState.status &&
      !authState.user
    ) {
      console.log("로딩 중이 아님 & 초기 상태, 처리 건너뜀");
      return;
    }

    console.log("상태 처리 시작");

    if (!authState.status && !authState.user && authState.error) {
      const error: TErrorMsg = JSON.parse(authState.error);

      if (error.code === "SERVER_ERROR" || error.code === "INVALID_TOKEN") {
        setAlertMessage(error.message);
        onOpen();
      } else {
        setError(
          "email",
          {
            type: "validate",
            message: error.message,
          },
          { shouldFocus: true },
        );
      }
      console.log("error", error);
      setIsSubmitting(false);
    } else if (authState.status && authState.user) {
      setUserState(authState.user);

      // 로그인 유저의 즐겨찾기 목록 가져오기
      setFavoriteInitValue(authState.user?.email);

      router.replace("/");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState, isSubmitting, submitAttempted]);

  const onSubmit = handleSubmit(async data => {
    setIsSubmitting(true);
    setSubmitAttempted(true);

    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    try {
      console.log("서버 액션 호출 시작");
      // setTimeout 대신 Promise 사용
      await userSignInAction(null, formData).then(result => {
        console.log("서버 액션 결과:", result);

        // 상태 업데이트를 Promise로 처리
        Promise.resolve().then(() => {
          console.log("상태 업데이트 시도", result);
          setAuthState(result); // 직접 설정
        });
      });
    } catch (error) {
      console.error("서버 액션 오류:", error);
      setAuthState({
        status: false,
        error: JSON.stringify({
          code: "CLIENT_ERROR",
          message: "로그인 처리 중 오류가 발생했습니다.",
        }),
        user: null,
      });
      setIsSubmitting(false);
    }
  });

  const registerWithValidation = (
    name: keyof TLoginForm,
  ): IRegisterWithValidation => {
    const baseRegister = register(name);

    return {
      ...baseRegister,
      onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
        baseRegister.onBlur(e);
        trigger(name);
      },
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        baseRegister.onChange(e);
        debouncedValidation(name);
      },
    };
  };

  const debouncedValidation = useDebounce(fieldName => {
    trigger(fieldName);
  }, 500);

  return (
    <>
      <form onSubmit={onSubmit} className="flex flex-col gap-6">
        {LOGIN_INPUTS.map(input => (
          <Input
            {...registerWithValidation(input.id)}
            key={input.id}
            id={input.id}
            type={input.type}
            label={input.label}
            disabled={isSubmitting}
            placeholder={input.placeholder}
            errorMsg={errors[input.id]?.message}
          />
        ))}
        <Button
          variant={"purple"}
          type="submit"
          className="mb-6 mt-10 h-[40px] text-sm font-semibold md:text-base"
          aria-label="login-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? <LoadingSpinner size="xs" /> : "로그인"}
        </Button>
      </form>
      {isOpen && (
        <AlertModal
          isOpen={isOpen}
          onClose={onClose}
          onConfirm={() => {}}
          title={alertMessage}
        />
      )}
    </>
  );
};

export default LoginForm;
