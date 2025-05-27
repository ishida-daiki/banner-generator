import { EventHandler } from "@create-figma-plugin/utilities";

export interface CreateConfettiHandlerType extends EventHandler {
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
