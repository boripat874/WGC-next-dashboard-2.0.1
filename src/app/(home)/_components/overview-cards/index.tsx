"use client";

// import { compactFormat } from "@/lib/format-number";
import { standardFormat } from "@/lib/format-number";
// import { getOverviewData } from "../../fetch";
import { OverviewCard } from "./card";
import * as icons from "./icons";

import useSWR from 'swr';
import { fetcher } from "@/app/utils/fetcher";


export function OverviewCardsGroup() {

  // const { views, profit, products, users } = await getOverviewData();

  const { data: overviewData } = useSWR('/api/cardoverview', fetcher);

  const NaOH_Fill_day_total_T1 = overviewData?.data.NaOH_Fill_day.total_T1_Kg || 0;
  const NaOH_Fill_day_total_T2 = overviewData?.data.NaOH_Fill_day.total_T2_Kg || 0;
  const HCI_Fill_day_total_T1 = overviewData?.data.HCI_Fill_day.total_T1_Kg || 0;
  const HCI_Fill_day_total_T2 = overviewData?.data.HCI_Fill_day.total_T2_Kg || 0;


  const sumNaOH_Fill_day = NaOH_Fill_day_total_T1 + NaOH_Fill_day_total_T2;
  const sumHCI_Fill_day = HCI_Fill_day_total_T1 + HCI_Fill_day_total_T2;


  return (
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4 2xl:gap-7.5">

      {/* NaOH Fill */}
      <OverviewCard
        label="Total NaOH Fill today"
        data={{
          action: "fill",
          // value: compactFormat(sumNaOH_Fill_day),
          value: standardFormat(Number(sumNaOH_Fill_day)),
        

        }}
        Icon={icons.NaOH}
      />

      {/* Total NaOH Used */}
      <OverviewCard
        label="Total NaOH Transfer today"
        data={{
          action: "transfer",
          // value: compactFormat(overviewData?.data.NaOH_Transfer_day.total_volume || 0),
          value: standardFormat(Number(overviewData?.data.NaOH_Transfer_day || 0))
        }}
        Icon={icons.NaOH_2}
      />

      <OverviewCard
        label="Total HCI Fill today"
        data={{
          action: "fill",
          // value: compactFormat(sumHCI_Fill_day),
          value: standardFormat(Number(sumHCI_Fill_day)),
        }}
        Icon={icons.HCI}
      />

      <OverviewCard
        label="Total HCI Transfer today"
        data={{
          action: "transfer",
          // value: compactFormat(overviewData?.data.HCI_Transfer_day.total_volume || 0),
          value: standardFormat(Number(overviewData?.data.HCI_Transfer_day || 0)),
        }} 
        Icon={icons.HCI_2}
      />

    </div>
  );
}
