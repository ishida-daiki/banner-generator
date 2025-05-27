import { showUI, on } from "@create-figma-plugin/utilities";

import {
  CreateCircleHandler,
  PreviewCircleHandler,
  CloseHandler,
  CreateSparkleHandler,
} from "./types";

// 紙吹雪の関数 & 型
import { confettiHandler } from "./handlers/confetti/confettiHandler";
import { CreateConfettiHandlerType } from "./handlers/confetti/confettiHandlerType";

// バルーンの関数 & 型
import { balloonHandler } from "./handlers/balloon/balloonHandler";
import { CreateBalloonHandlerType } from "./handlers/balloon/balloonHandlerType";

// 色の16進数をRGBに変換する関数
import { hexToRgb } from "./handlers/hexToRgb";

export default function () {
  // プレビュー用の要素を保持する変数
  let previewCircle: EllipseNode | null = null;
  let previewGroup: GroupNode | null = null;
  // 作成した円を保持する変数
  let currentCircle: EllipseNode | null = null;
  let currentGroup: GroupNode | null = null;
  // 初期位置を保持する変数
  let initialCenterX: number | null = null;
  let initialCenterY: number | null = null;

  function createMaskGroup(
    targetNode: EllipseNode,
    centerX: number,
    centerY: number
  ): GroupNode {
    // マスク用の長方形を作成
    const maskRect = figma.createRectangle();
    maskRect.resize(1200, 630);

    // 長方形の中心位置を計算
    const rectCenterX = centerX;
    const rectCenterY = centerY;

    // 長方形を中心に配置
    maskRect.x = rectCenterX - maskRect.width / 2;
    maskRect.y = rectCenterY - maskRect.height / 2;

    // 背景色を設定
    maskRect.fills = [
      {
        type: "SOLID",
        color: { r: 0.85, g: 0.85, b: 0.85 }, // #D9D9D9
      },
    ];

    // 円の中心位置を長方形の中心に合わせる
    targetNode.x = rectCenterX - targetNode.width / 2;
    targetNode.y = rectCenterY - targetNode.height / 2;

    // まずグループを作成
    const maskGroup = figma.group([maskRect], figma.currentPage);

    // targetNodeを後からグループに追加（上に配置される）
    maskGroup.appendChild(targetNode);

    // マスクを適用
    maskRect.isMask = true;

    return maskGroup;
  }

  // Figmaに円を作成する関数
  function createCircle(options: {
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
  }) {
    const centerX = figma.viewport.center.x;
    const centerY = figma.viewport.center.y;

    // 初期位置を保存
    initialCenterX = centerX;
    initialCenterY = centerY;

    // 円を作成
    const circle = figma.createEllipse();
    currentCircle = circle; // 作成した円を保持

    // 円の属性を設定
    updateCircleProperties(circle, options, centerX, centerY);

    // マスクグループを作成
    const maskGroup = createMaskGroup(circle, centerX, centerY);
    currentGroup = maskGroup; // 作成したグループを保持

    // マスクグループをページに追加
    figma.currentPage.appendChild(maskGroup);
    figma.currentPage.selection = [maskGroup];
    figma.viewport.scrollAndZoomIntoView([maskGroup]);
  }

  // 円の属性を更新する関数
  function updateCircleProperties(
    circle: EllipseNode,
    options: {
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
    },
    centerX: number,
    centerY: number
  ) {
    const {
      radius,
      strokeWidth,
      strokeCap,
      strokeJoin,
      dashPattern,
      fillColor,
      fillOpacity,
      strokeColor,
      strokeOpacity,
    } = options;

    // 現在の中心位置を保持
    const currentCenterX = circle.x + circle.width / 2;
    const currentCenterY = circle.y + circle.height / 2;

    // サイズを更新
    circle.resize(radius * 2, radius * 2);

    // 中心位置を維持したまま位置を更新
    circle.x = currentCenterX - radius;
    circle.y = currentCenterY - radius;

    // ストロークの幅を更新
    circle.strokeWeight = strokeWidth;
    circle.strokeCap = strokeCap;
    circle.strokeJoin = strokeJoin;
    circle.dashPattern = dashPattern;

    // 線の色を設定
    const strokeRgb = hexToRgb(strokeColor);
    circle.strokes = [
      {
        type: "SOLID",
        color: strokeRgb,
        opacity: strokeOpacity / 100,
      },
    ];

    // 背景色を設定
    const fillRgb = hexToRgb(fillColor);
    circle.fills = [
      {
        type: "SOLID",
        color: fillRgb,
        opacity: fillOpacity / 100,
      },
    ];

    // 更新後のプロパティをUIに通知
    figma.ui.postMessage({
      type: "UPDATE_PROPERTIES",
      strokeWidth: circle.strokeWeight,
      radius: circle.width / 2,
    });
  }

  on<CreateCircleHandler>("CREATE_CIRCLE", function (options) {
    createCircle(options);
  });

  on<PreviewCircleHandler>("PREVIEW_CIRCLE", function (options) {
    if (currentCircle && initialCenterX !== null && initialCenterY !== null) {
      updateCircleProperties(
        currentCircle,
        options,
        initialCenterX,
        initialCenterY
      );
    }
  });

  // 紙吹雪の作成
  on<CreateConfettiHandlerType>("CREATE_CONFETTI", confettiHandler);

  // バルーンの作成
  on<CreateBalloonHandlerType>("CREATE_BALLOON", balloonHandler);

  on<CreateSparkleHandler>("CREATE_SPARKLE", function (options) {
    const { count, size, fillColors, fillOpacity, spreadRange, isRandom } =
      options;
    const centerX = figma.viewport.center.x;
    const centerY = figma.viewport.center.y;

    for (let i = 0; i < count; i++) {
      // 2行2列で余白0で配置
      const ellipseWidth = 88;
      const ellipseHeight = 131.87;
      const gridSize = 2;
      const ellipses = [];
      for (let i = 0; i < 4; i++) {
        const ellipse = figma.createEllipse();
        ellipse.resize(ellipseWidth, ellipseHeight);
        // 2x2グリッド配置
        const row = Math.floor(i / gridSize);
        const col = i % gridSize;
        ellipse.x = centerX - ellipseWidth + col * ellipseWidth;
        ellipse.y = centerY - ellipseHeight / 2 + row * ellipseHeight;
        const randomColor =
          fillColors[Math.floor(Math.random() * fillColors.length)];
        const rgb = hexToRgb(randomColor);
        ellipse.fills = [
          {
            type: "SOLID",
            color: rgb,
            opacity: fillOpacity / 100,
          },
        ];
        ellipse.strokes = [];
        if (isRandom) {
          ellipse.rotation = Math.random() * 360;
        }
        ellipses.push(ellipse);
      }
      // Unionで1つにまとめる
      const unionNode = figma.union(ellipses, figma.currentPage);
      unionNode.name = "SparkleUnion";

      // unionNodeから中央の1つのellipseをsubtract
      const centerEllipse = figma.createEllipse();
      centerEllipse.resize(88, 131.87);
      centerEllipse.x = centerX - centerEllipse.width / 2;
      centerEllipse.y = centerY - centerEllipse.height / 2;
      centerEllipse.fills = [
        {
          type: "SOLID",
          color: { r: 0.851, g: 0.851, b: 0.851 },
        },
      ];
      const subtractedNode = figma.subtract([centerEllipse], figma.currentPage);
      subtractedNode.appendChild(unionNode);
      subtractedNode.name = "SparkleSubtracted";

      // 上下中央揃え
      centerEllipse.y = centerY - centerEllipse.height / 2;
      unionNode.y = centerY - unionNode.height / 2;

      figma.currentPage.selection = [subtractedNode];
      figma.viewport.scrollAndZoomIntoView([subtractedNode]);
    }
  });

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
