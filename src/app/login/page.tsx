"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import LoginJoinLayout from "@/components/layout/LoginJoinLayout";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { LOGIN_INPUTS } from "@/constants/loginJoin";
import { LoginFormSchema } from "@/schemas/loginJoinSchema";

export type TLoginForm = z.infer<typeof LoginFormSchema>;

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginForm>({
    resolver: zodResolver(LoginFormSchema),
  });

  const onSubmit = (data: TLoginForm) => console.log(data);

  return (
    <LoginJoinLayout page="login">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {LOGIN_INPUTS.map(input => (
          <Input
            {...register(input.id)}
            key={input.id}
            id={input.id}
            type={input.type}
            label={input.label}
            disabled={false}
            placeholder={input.placeholder}
            errorMsg={errors[input.id]?.message}
          />
        ))}
        <Button
          variant={"purple"}
          type="submit"
          className="mb-6 mt-10 h-[40px] text-sm font-semibold md:text-base"
          aria-label="login-btn"
        >
          로그인
        </Button>
      </form>
    </LoginJoinLayout>
  );
};

export default Page;
