import { EventHandler } from "@create-figma-plugin/utilities";
import { ColorWithOpacity } from "../../../types";

export interface CreateConfettiHandlerType extends EventHandler {
  name: "CREATE_CONFETTI";
  handler: (options: {
    count: number;
    size: number;
    fillColors: ColorWithOpacity[];
    spreadRange: number;
    isRandom: boolean;
  }) => void;
}
