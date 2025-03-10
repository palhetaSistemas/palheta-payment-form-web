import background from "@/public/images/staticDataImage/loginBg.png";
import LogInForm from "./login-form";
import Image from "next/image";

const LoginPage = () => {
  return (
    <div className="loginwrapper bg-background flex items-center justify-center overflow-y-hidden h-screen overflow-hidden w-full">
      <div className="flex w-full h-full justify-center items-center lg:justify-start overflow-y-hidden">
        <div className=" lg:basis-1/2 w-full lg:min-w-[600px] flex justify-start items-center relative lg:pr-12 xl:pr-20 2xl:pr-[110px] px-5">
          <LogInForm />
        </div>
        <div className="bg-gradient-to-r from-primary to-black w-1/2 h-screen lg:flex relative hidden">
          <Image
            src={background}
            alt="background"
            quality={100}
            priority
            className="absolute right-0 h-full object-cover w-full top-1/2 -translate-y-1/2"
            height={1000}
            width={1000}
          />
          <div className="absolute bg-gradient-to-br from-[#D4AF37] to-primary opacity-50 w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
