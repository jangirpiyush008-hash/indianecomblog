"use client";

import { useEffect, useState } from "react";

export function ClientDate({
  format = "long",
  className,
}: {
  format?: "long" | "short";
  className?: string;
}) {
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    const opts: Intl.DateTimeFormatOptions =
      format === "long"
        ? { weekday: "long", day: "numeric", month: "long", year: "numeric" }
        : { day: "numeric", month: "long" };
    setDate(new Date().toLocaleDateString("en-IN", opts));
  }, [format]);

  return <span className={className}>{date || "—"}</span>;
}
