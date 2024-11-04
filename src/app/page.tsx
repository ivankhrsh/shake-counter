import React from "react";
import Footer from "./components/footer";
import ShakeCounter from "./components/shake-counter";

export default function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 bg-black p-8 pb-20 font-[family-name:var(--font-geist-mono)] sm:p-20">
      <main className="row-start-2 flex w-full flex-col items-center gap-8 sm:items-start">
        <h1 className="mb-2 w-full text-center text-xl">
          Device Shake Counter
        </h1>

        <ShakeCounter />
      </main>

      <Footer />
    </div>
  );
}
