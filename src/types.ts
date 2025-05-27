import { EventHandler } from "@create-figma-plugin/utilities";

// 色と不透明度を保持する型
export interface ColorWithOpacity {
  color: string;
  opacity: number;
}

// プラグインを閉じる型
export interface CloseHandler extends EventHandler {
  name: "CLOSE";
  handler: () => void;
}
