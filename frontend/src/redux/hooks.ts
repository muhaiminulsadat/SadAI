import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

/** Typed dispatch — avoids casting `useDispatch` everywhere */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/** Typed selector — no need to import RootState in every component */
export const useAppSelector = <T>(selector: (state: RootState) => T): T =>
  useSelector(selector);
