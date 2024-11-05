import React from "react";
import Footer from "./components/footer";
import ShakeCounter from "./components/shake-counter";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center justify-items-center gap-16 bg-zinc-900 p-8 pb-20 font-[family-name:var(--font-geist-mono)] sm:p-20">
      <main className="flex h-full w-full flex-col gap-8 sm:items-start">
        <h1 className="w-full text-center text-xl text-white">
          Device Shake Counter
        </h1>

        <ShakeCounter />
      </main>

      <Footer />
    </div>
  );
}
