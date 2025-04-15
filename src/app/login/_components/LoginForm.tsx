"use client";

/**
 * #S701 보안: CSRF 토큰 검증 및 XSS 방지 처리 강화
 * #P401 성능: 불필요한 리렌더링 최적화를 위한 메모이제이션 검토
 */
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
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
import { setCookieOfToken } from "@/utils/cookieToken";

import {
  IRegisterWithValidation,
  TErrorMsg,
} from "../../join/_components/JoinForm";

/** #T501 타입: 로그인 폼 타입 정의 개선 및 문서화 */
export type TLoginForm = z.infer<typeof LoginFormSchema>;

/**
 * #A301 접근성: 폼 유효성 검사 결과 스크린 리더 지원
 * #E801 에러: 네트워크 오류 및 서버 응답 타임아웃 처리
 * #U601 사용자 경험: 로그인 상태 유지 옵션 추가
 * #S702 보안: 비밀번호 입력 시 자동완성 정책 검토
 */
const LoginForm = () => {
  /** #T502 타입: react-hook-form 타입 안정성 강화 */
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
  const [alertMessage, setAlertMessage] = useState("");
  const [state, formAction] = useFormState(userSignInAction, null);

  const { setUserState } = useUserStore();
  const { isOpen, onClose, onOpen } = useModal();

  const { setFavoriteInitValue } = useFavorite();

  /**
   * #E802 에러: 의존성 배열 최적화 및 cleanup 함수 추가
   * #P402 성능: 상태 업데이트 로직 최적화
   */
  useEffect(() => {
    if (state && !state.status && !state.user) {
      const error: TErrorMsg = JSON.parse(state.error);

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
      setIsSubmitting(false);
    } else if (state && state.status && state.user) {
      setCookieOfToken(state.token)
        .then(() => {
          setUserState(state.user!);
          setFavoriteInitValue(state.user!.email);
          router.replace("/");
        })
        .catch(error => {
          setAlertMessage("쿠키 설정 오류: " + error.message);
          onOpen();
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, setError, router, setUserState, onOpen]);

  /**
   * #S703 보안: 폼 데이터 전송 전 sanitization 처리
   * #E803 에러: 서버 응답 에러 상태 처리 개선
   */
  const onSubmit = handleSubmit(data => {
    setIsSubmitting(true);
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    formAction(formData);
  });

  /**
   * #P403 성능: 유효성 검사 로직 최적화
   * #U602 사용자 경험: 실시간 유효성 검사 피드백 제공
   */
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

  /** #P404 성능: 디바운스 시간 조정 및 성능 모니터링 */
  const debouncedValidation = useDebounce(fieldName => {
    trigger(fieldName);
  }, 500);

  return (
    <>
      {/**
       * #A302 접근성: 폼 레이아웃 및 키보드 탐색 개선
       * #U603 사용자 경험: 로딩 상태 UI/UX 개선
       */}
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
