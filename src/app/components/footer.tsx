import Image from "next/image";
import React from "react";
import TelegramIcon from "./icons/telegram";

export default function Footer() {
  return (
    <footer className="row-start-3 mt-10 flex h-full flex-wrap items-center justify-center gap-6 text-white">
      <a
        className="hover:border-1 group flex items-center gap-2 rounded-sm p-2 hover:text-blue-500 hover:underline hover:underline-offset-4"
        href="https://github.com/ivankhrsh"
        rel="noopener noreferrer"
        target="_blank"
      >
        <Image
          alt="GitHub icon"
          aria-hidden
          height={25}
          src="https://nextjs.org/icons/github.svg"
          width={24}
        />
        GitHub
      </a>

      <a
        className="hover:border-1 group flex items-center gap-2 rounded-sm p-2 hover:text-blue-500 hover:underline hover:underline-offset-4"
        href="https://t.me/nullOn"
        rel="noopener noreferrer"
        target="_blank"
      >
        <TelegramIcon />
        Telegram
      </a>
    </footer>
  );
}
