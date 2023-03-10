import Summary from "@/src/layouts/summary";
import axios from "axios";
import { useEffect } from "react";

export default function Home() {
  // async function fetchData() {
  //   try {
  //     const res = await axios.get("http://localhost:3000/api/charts/sick-vocation-leave");
  //     const res1 = await axios.get("http://localhost:3000/api/charts/point-job");
  //     const res2 = await axios.get("http://localhost:3000/api/charts/headcount");
  //     const res3 = await axios.get("http://localhost:3000/api/charts/contract-chart");
  //     console.log(res,res1,res2,res3, "res")
  //   } catch(err) {
  //     console.log(err);
  //   }
  // }

  // useEffect(() => {
  //   fetchData();
  // }, [])
  
  return (
    <Summary />
  )
}
