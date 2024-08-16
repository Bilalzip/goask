"use client";
import Details from "@/components/Details/Details";
import FAQ from "@/components/FAQ/Faq";
import HeroSection from "@/components/HeroSection/HeroSection";
import InformationScreen from "@/components/InformationScreen/InformationScreen";
import InteractionScreen from "@/components/InteractionScreen/InteractionScreen";
import Navbar from "@/components/Navbar/Navbar";
import Overview from "@/components/Overview/Overview";
import PowerAiCHat from "@/components/PowerAiChat/PowerAiChat";
import PricingTable from "@/components/PriceTable/PriceTable";
import TryItSection from "@/components/TryItSection/TryItSection";
import useAuth from "@/customHooks/useAuth";
import { GoToTop } from "go-to-top-react";

export default function Home() {
  // const [authState, setAuthState] = useAuth();  // Destructure if returning an array
  // console.log(authState);

  return (
    <>
      <Navbar />
      <HeroSection />
      <div className="">
        <TryItSection />
        <Overview />
        <InteractionScreen />
        <PowerAiCHat />
        <Details />
        <InformationScreen />
        <PricingTable />
        <FAQ />
        <GoToTop className="hidden lg:block" />
      </div>
    </>
  );
}
