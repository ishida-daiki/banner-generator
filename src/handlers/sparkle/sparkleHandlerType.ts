import { EventHandler } from "@create-figma-plugin/utilities";

export interface CreateSparkleHandlerType extends EventHandler {
  name: "CREATE_SPARKLE";
  handler: (options: {
    count: number;
    size: number;
    fillColors: string[];
    fillOpacity: number;
    spreadRange: number;
    isRandom: boolean;
  }) => void;
}
