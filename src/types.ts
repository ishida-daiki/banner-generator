import { EventHandler } from "@create-figma-plugin/utilities";

export interface CreateRectanglesHandler extends EventHandler {
  name: "CREATE_RECTANGLES";
  handler: (count: number) => void;
}

export interface CreateCircleHandler extends EventHandler {
  name: "CREATE_CIRCLE";
  handler: (options: {
    radius: number;
    strokeWidth: number;
    strokeCap:
      | "NONE"
      | "ROUND"
      | "SQUARE"
      | "ARROW_LINES"
      | "ARROW_EQUILATERAL";
    strokeJoin: "ROUND" | "MITER" | "BEVEL";
    dashPattern: number[];
    fillColor: string;
    fillOpacity: number;
    strokeColor: string;
    strokeOpacity: number;
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

export interface AddToFigmaHandler extends EventHandler {
  name: "ADD_TO_FIGMA";
  handler: () => void;
}
