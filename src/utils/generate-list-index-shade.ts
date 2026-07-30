import { lighten } from "polished";

export function generateListIndexShade(options: {
  listLength: number;
  index: number;
  color?: string;
}) {
  return lighten(
    (options.index * 2 - options.listLength) / 25,
    options.color || "#FF4C1C"
  );
}
