import { EventHandler } from "@create-figma-plugin/utilities";

export interface CreateBalloonHandlerType extends EventHandler {
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
