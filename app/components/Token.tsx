"use client";
import { useSession } from "next-auth/react";


const Token = () => {
  const { data: session } = useSession();
  const token = session?.accessToken;

  return (
    <div  className="flex gap-4 ml-auto">
      <p className="text-sky-600">{token}</p>
    </div>
  );
};

export default Token;
