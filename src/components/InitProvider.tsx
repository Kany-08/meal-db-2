import type { PropsWithChildren } from "react";
import { useAppData } from "../lib/useAppData";

export function InitProvider({ children }: PropsWithChildren) {
  useAppData();
  return children;
}
