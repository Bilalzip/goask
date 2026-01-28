"use client";
import Details from "@/components/Details/Details";
import FAQ from "@/components/FAQ/Faq";
import HeroSection from "@/components/HeroSection/HeroSection";
import InformationScreen from "@/components/InformationScreen/InformationScreen";
import InteractionScreen from "@/components/InteractionScreen/InteractionScreen";
import Navbar from "@/components/Navbar/Navbar";
import Overview from "@/components/Overview/Overview";
import PowerAiCHat from "@/components/PowerAiChat/PowerAiChat";
import TryItSection from "@/components/TryItSection/TryItSection";
import useAuth from "@/customHooks/useAuth";
import { GoToTop } from "go-to-top-react";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  // const [authState, setAuthState] = useAuth();  // Destructure if returning an array

  const [uid, setUid] = useState<string | null>(null);
  const [myChats, setMyChats] = useState<Array<{ id: number; pdfName: string }>>([]);

  useEffect(() => {
    const u = typeof window !== "undefined" ? localStorage.getItem("Uid") : null;
    setUid(u);
  }, []);

  useEffect(() => {
    const fetchChats = async () => {
      if (!uid) return;
      try {
        const res = await axios.post("/api/user/chats", { Uid: uid });
        const list = (res.data?.chats || []).map((c: any) => ({ id: c.id, pdfName: c.pdfName }));
        setMyChats(list);
      } catch (e) {
        // swallow errors on home
      }
    };
    fetchChats();
  }, [uid]);

  return (
    <>
      <Navbar />
      <HeroSection />
      <div className="">
        {myChats && myChats.length > 0 ? (
          <section className="max-w-5xl mx-auto px-4 py-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">My Chats</h2>
              <a href="/upload-pdf" className="text-sm rounded-full px-3 py-1 bg-yellow-400 text-black font-semibold hover:bg-yellow-300">New chat</a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {myChats.map((c) => (
                <a key={c.id} href={`/chat/${c.id}`} className="rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/90 text-black font-semibold flex items-center justify-center">
                      {c.pdfName.trim().charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 truncate">
                      <p className="font-medium truncate">{c.pdfName}</p>
                      <p className="text-xs opacity-70">Open conversation</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        ) : (
          <TryItSection />
        )}
        <Overview />
        <InteractionScreen />
        <PowerAiCHat />
        <Details />
        <InformationScreen />
        <FAQ />
        <GoToTop className="hidden lg:block" />
      </div>
    </>
  );
}
