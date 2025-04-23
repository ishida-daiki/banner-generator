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

export interface CreateConfettiHandler extends EventHandler {
  name: "CREATE_CONFETTI";
  handler: (options: {
    count: number;
    size: number;
    fillColors: string[];
    fillOpacity: number;
    spreadRange: number;
    isRandom: boolean;
  }) => void;
}

export interface CreateBalloonHandler extends EventHandler {
  name: "CREATE_BALLOON";
  handler: (options: {
    count: number;
    size: number;
    fillColors: string[];
    fillOpacity: number;
    spreadRange: number;
    isRandom: boolean;
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

export interface PreviewCircleHandler extends EventHandler {
  name: "PREVIEW_CIRCLE";
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
