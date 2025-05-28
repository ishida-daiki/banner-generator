import { EventHandler } from "@create-figma-plugin/utilities";
import { ColorWithOpacity } from "../../../types";

export interface CreateBalloonHandlerType extends EventHandler {
  name: "CREATE_BALLOON";
  handler: (options: {
    count: number;
    size: number;
    fillColors: ColorWithOpacity[];
    // fillOpacity: string[];
    spreadRange: number;
    isRandom: boolean;
  }) => void;
}
