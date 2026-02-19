"use client";

import { DateRangePicker } from "@heroui/react";
import { useState } from "react";
import { getLocalTimeZone, today } from "@internationalized/date";

export default function AnalyticTable() {
  const [date, setDate] = useState({
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()).add({ days: 1 }),
  });

  return (
    <div>
      <DateRangePicker
        isRequired
        className="max-w-xs"
        label="Stay duration"
        value={date}
        onChange={setDate}
      />
      ;
    </div>
  );
}
