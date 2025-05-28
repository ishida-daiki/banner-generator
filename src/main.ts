import { showUI, on } from "@create-figma-plugin/utilities";

import {
  CloseHandler,
} from "./types";

// 放射線の作成とプレビュー & 型
import { radialHandler, previewRadialHandler } from "./handlers/background/radial/radialHandler";
import { CreateRadialHandlerType, PreviewRadialHandlerType } from "./handlers/background/radial/radialHandlerType";

// グラデーションの作成 & 型
import { gradientHandler } from "./handlers/background/gradient/gradientHandler";
import { CreateGradientHandlerType } from "./handlers/background/gradient/gradientHandlerType";

// 紙吹雪の関数 & 型
import { confettiHandler } from "./handlers/front/confetti/confettiHandler";
import { CreateConfettiHandlerType } from "./handlers/front/confetti/confettiHandlerType";

// バルーンの関数 & 型
import { balloonHandler } from "./handlers/front/balloon/balloonHandler";
import { CreateBalloonHandlerType } from "./handlers/front/balloon/balloonHandlerType";

// スパークルの関数 & 型
import { sparkleHandler } from "./handlers/front/sparkle/sparkleHandler";
import { CreateSparkleHandlerType } from "./handlers/front/sparkle/sparkleHandlerType";


export default function () {
  // 放射線の作成 & プレビュー
  on<CreateRadialHandlerType>("CREATE_RADIAL", radialHandler);
  on<PreviewRadialHandlerType>("PREVIEW_RADIAL", previewRadialHandler);

  // グラデーションの作成
  on<CreateGradientHandlerType>("CREATE_GRADIENT", gradientHandler);

  // 紙吹雪の作成
  on<CreateConfettiHandlerType>("CREATE_CONFETTI", confettiHandler);

  // バルーンの作成
  on<CreateBalloonHandlerType>("CREATE_BALLOON", balloonHandler);

  // スパークルの作成
  on<CreateSparkleHandlerType>("CREATE_SPARKLE", sparkleHandler);

  // Figma プラグインを閉じる
  on<CloseHandler>("CLOSE", function () {
    figma.closePlugin();
  });

  // プラグインのUI設定
  showUI({
    height: 650,
    width: 240,
  });
}
