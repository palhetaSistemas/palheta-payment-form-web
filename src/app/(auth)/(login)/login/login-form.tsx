"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import logoWhite from "@/public/images/logo/logo-white.png";
import logoDark from "@/public/images/logo/logo-black.png";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Loader2, Lock, Mail } from "lucide-react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { cn } from "@/src/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { Checkbox } from "@/src/components/ui/checkbox";
import { useMediaQuery } from "@/src/hooks/use-media-query";

const schema = z.object({
  email: z.string().email({ message: "Insira um email válido" }),
  password: z
    .string()
    .min(4, { message: "Senha deve ter no mínimo 4 caracteres" }),
});
const LogInForm = () => {
  const [isPending, startTransition] = React.useTransition();
  const [passwordType, setPasswordType] = React.useState("password");
  const isDesktop2xl = useMediaQuery("(max-width: 1530px)");

  const togglePasswordType = () => {
    if (passwordType === "text") {
      setPasswordType("password");
    } else if (passwordType === "password") {
      setPasswordType("text");
    }
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "all",
    defaultValues: {
      email: "palheta@exemplo.com.br",
      password: "1234",
    },
  });
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = (data: any) => {
    startTransition(async () => {
      let response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (response?.ok) {
        toast.success("Login Successful");
        window.location.assign("/");
        reset();
      } else if (response?.error) {
        toast.error(response?.error);
      }
    });
  };
  return (
    <div className="flex flex-row w-full items-center justify-center">
      <div className="w-full max-w-[600px] ">
        <Link href="#" className="inline-block">
          <Image
            src={logoWhite}
            alt="logo"
            className="hidden dark:block"
            priority={true}
            width={370}
            height={80}
          />
          <Image
            src={logoDark}
            alt="logo"
            className="dark:hidden"
            priority={true}
            width={370}
            height={80}
          />
        </Link>
        <div className="2xl:mt-8 mt-6 2xl:text-3xl text-2xl font-bold text-default-900">
          Login
        </div>
        <div className="2xl:text-lg text-base text-default-900 mt-2 leading-6">
          Entre agora no sistema oficial do Grupo Palheta
        </div>
        <div className="2xl:text-lg text-base text-default-900 mt-2 leading-6 ">
          Se quiser conhecer mais pode{" "}
          <Link href="#" className="italic text-primary underline">
            Clicar aqui agora!
          </Link>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 2xl:mt-7">
          <div className="relative">
            <Input
              removeWrapper
              type="email"
              id="email"
              size={!isDesktop2xl ? "xl" : "lg"}
              placeholder=""
              disabled={isPending}
              {...register("email")}
              className={cn(
                "peer",
                {
                  "border-destructive": errors.email,
                },
                " border-t-0 border-l-0 border-r-0 rounded-none border-default-600  px-6"
              )}
            />

            <Label
              htmlFor="email"
              className="rounded-md absolute text-base duration-300 transform -translate-y-5 scale-75 top-2 z-10 origin-[0]   px-6 peer-focus:px-2
               peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 
               peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 border-default-900"
            >
              Email
            </Label>
            <Mail
              className="absolute w-6 h-6 duration-300 transform  scale-75  z-10  peer-focus:px-1 top-3
            peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 border-default-900"
            />
          </div>
          {errors.email && (
            <div className=" text-destructive mt-2">{errors.email.message}</div>
          )}
          <div className="relative mt-6">
            <Input
              removeWrapper
              type={passwordType === "password" ? "password" : "text"}
              id="password"
              size={!isDesktop2xl ? "xl" : "lg"}
              placeholder=" "
              disabled={isPending}
              {...register("password")}
              className={cn(
                "peer",
                {
                  "border-destructive": errors.password,
                },
                " border-t-0 border-l-0 border-r-0 rounded-none border-default-900 px-6"
              )}
            />
            <Label
              htmlFor="password"
              className={cn(
                "rounded-md absolute text-base text-default-900  duration-300 transform -translate-y-5 scale-75 top-2 z-10 origin-[0]   bg-background  px-6 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75  peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1",
                {
                  " text-sm ": isDesktop2xl,
                }
              )}
            >
              Senha
            </Label>
            <Lock
              className="absolute w-6 h-6 duration-300 transform  scale-75  z-10  peer-focus:px-1 top-3
            peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 text-default-900"
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 ltr:right-4 rtl:left-4 cursor-pointer"
              onClick={togglePasswordType}
            >
              {passwordType === "password" ? (
                <Icon icon="heroicons:eye" className="w-4 h-4 text-primary" />
              ) : (
                <Icon
                  icon="heroicons:eye-slash"
                  className="w-4 h-4 text-primary"
                />
              )}
            </div>
          </div>

          {errors.password && (
            <div className=" text-destructive mt-2">
              {errors.password.message}
            </div>
          )}

          <div className="mt-5  mb-6 flex flex-wrap gap-2">
            <div className="flex-1 flex  items-center gap-1.5 ">
              <Checkbox
                size="sm"
                className="border-primary data-[state=checked]:bg-primary mt-[1px]"
                id="isRemebered"
              />
              <Label
                htmlFor="isRemebered"
                className="text-sm text-default-700 cursor-pointer whitespace-nowrap"
              >
                Lembrar de mim
              </Label>
            </div>
            <Link
              href="#"
              className="flex-none text-sm text-primary hover:text-primary/90"
            >
              Esqueceu a senha?
            </Link>
          </div>
          <Button
            className="w-full bg-primary hover:bg-primary/90"
            disabled={isPending}
            size={!isDesktop2xl ? "lg" : "md"}
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? "Loading..." : "Entrar"}
          </Button>
        </form>

        <div className="mt-6 text-center text-base text-default-600">
          Ainda não possui conta?{" "}
          <Link href="#" className="text-primary">
            {" "}
            Cadastre-se{" "}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LogInForm;
