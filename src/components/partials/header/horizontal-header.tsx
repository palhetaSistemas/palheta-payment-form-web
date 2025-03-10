import React from "react";
import { Search } from "lucide-react";
import { SiteLogo } from "@/src/components/svg";
import Link from "next/link";
import LogoRed from "@/public/images/logo/logo-red.png";
import Image from "next/image";

const horizontalHeader = ({
  handleOpenSearch,
}: {
  handleOpenSearch: () => void;
}) => {
  return (
    <div className="flex items-center">
      <Link href="/dashboard" className=" text-primary flex items-center">
        <Image
          src={LogoRed}
          alt="logo"
          width={200}
          height={200}
          className="h-16 w-auto "
        />
      </Link>
    </div>
  );
};

export default horizontalHeader;
