"use client";
import dynamic from "next/dynamic";

const MyMap = dynamic(() => import("@/Components/Map/Map"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

export default function Home() {
  return (
    <main className="min-h-screen p-20 w-screen">
      <MyMap />
    </main>
  );
}
