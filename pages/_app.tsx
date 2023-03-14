import MainLayout from "@/src/layouts/main";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement,
  RadialLinearScale,
} from "chart.js";
import { AnimatePresence } from "framer-motion";
import { SWRConfig } from "swr";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useLoading from "@/src/hooks/useLoading";
import AnimationLoading from "@/src/components/loading/AnimationLoading";
import { useRouter } from "next/router";
import useChartData from "@/src/hooks/useChartData";
import { useEffect } from "react";

ChartJS.register(
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement
);

export default function App({ Component, pageProps }: AppProps) {
  const status = useLoading((state) => state.status);
  const router = useRouter();
  const { getInitialData } = useChartData();
  const { turnOn, turnOff } = useLoading();
  useEffect(() => {
    getInitialData && getInitialData(turnOn, turnOff);
  }, [getInitialData]);
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
      }}
    >
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <AnimatePresence>
        <main
          className={`m-0 w-full h-full flex flex-col relative ${
            status ? "opacity-[0.5]" : "opacity-1"
          }`}
          key={router.asPath}
        >
          {status ? (
            <div className="w-full h-full flex justify-center items-center absolute z-[1000]">
              <AnimationLoading />
            </div>
          ) : (
            <></>
          )}
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </main>
      </AnimatePresence>
    </SWRConfig>
  );
}
