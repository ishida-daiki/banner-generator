import { EventHandler } from "@create-figma-plugin/utilities";

export interface CreateRectanglesHandler extends EventHandler {
  name: "CREATE_RECTANGLES";
  handler: (count: number) => void;
}

export interface CreateCircleHandler extends EventHandler {
  name: "CREATE_CIRCLE";
  handler: (options: {
    count: number;
    radius: number;
    strokeWidth: number;
    strokeCap:
      | "NONE"
      | "ROUND"
      | "SQUARE"
      | "ARROW_LINES"
      | "ARROW_EQUILATERAL";
    strokeJoin: "MITER" | "BEVEL" | "ROUND";
    dashPattern: number[];
  }) => void;
}

export interface CreateRadialHandler extends EventHandler {
  name: "CREATE_RADIAL";
  handler: (options: {
    count: number; // 放射状の数
    length: number; // 各線の長さ
    width: number; // 線の太さ
  }) => void;
}

export interface CloseHandler extends EventHandler {
  name: "CLOSE";
  handler: () => void;
}
