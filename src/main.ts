import { showUI, on } from "@create-figma-plugin/utilities";

import {
  CloseHandler,
} from "./types";

// 放射線の作成とプレビュー & 型
import { radialHandler, previewRadialHandler } from "./handlers/radial/radialHandler";
import { CreateRadialHandlerType, PreviewRadialHandlerType } from "./handlers/radial/radialHandlerType";

// 紙吹雪の関数 & 型
import { confettiHandler } from "./handlers/confetti/confettiHandler";
import { CreateConfettiHandlerType } from "./handlers/confetti/confettiHandlerType";

// バルーンの関数 & 型
import { balloonHandler } from "./handlers/balloon/balloonHandler";
import { CreateBalloonHandlerType } from "./handlers/balloon/balloonHandlerType";

// スパークルの関数 & 型
import { sparkleHandler } from "./handlers/sparkle/sparkleHandler";
import { CreateSparkleHandlerType } from "./handlers/sparkle/sparkleHandlerType";

// 色の16進数をRGBに変換する関数
import { hexToRgb } from "./handlers/hexToRgb";

export default function () {
  // 放射線の作成 & プレビュー
  on<CreateRadialHandlerType>("CREATE_RADIAL", radialHandler);
  on<PreviewRadialHandlerType>("PREVIEW_RADIAL", previewRadialHandler);

  // 紙吹雪の作成
  on<CreateConfettiHandlerType>("CREATE_CONFETTI", confettiHandler);

  // バルーンの作成
  on<CreateBalloonHandlerType>("CREATE_BALLOON", balloonHandler);

  // スパークルの作成
  on<CreateSparkleHandlerType>("CREATE_SPARKLE", sparkleHandler);

  on<CloseHandler>("CLOSE", function () {
    // プラグインを閉じる前にプレビューを非表示にする
    // if (previewGroup) {
    //   previewGroup.visible = false;
    // }
    figma.closePlugin();
  });

  showUI({
    height: 520,
    width: 240,
  });
}
