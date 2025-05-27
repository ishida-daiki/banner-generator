import { EventHandler } from "@create-figma-plugin/utilities";

export interface CreateRectanglesHandler extends EventHandler {
  name: "CREATE_RECTANGLES";
  handler: (count: number) => void;
}

export interface ColorWithOpacity {
  color: string;
  opacity: number;
}

export interface CloseHandler extends EventHandler {
  name: "CLOSE";
  handler: () => void;
}

export interface AddToFigmaHandler extends EventHandler {
  name: "ADD_TO_FIGMA";
  handler: () => void;
}

