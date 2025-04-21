import { showUI, on } from "@create-figma-plugin/utilities";

import {
  CloseHandler,
  CreateCircleHandler,
  CreateRectanglesHandler,
  CreateRadialHandler,
  PreviewCircleHandler,
} from "./types";

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;
  return { r, g, b };
}

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

    // その他の属性を更新
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

  on<CreateRadialHandler>("CREATE_RADIAL", function (options) {
    const { count, length, width } = options;
    const centerX = figma.viewport.center.x;
    const centerY = figma.viewport.center.y;
    const angleStep = (2 * Math.PI) / count;

    const lines = [];
    for (let i = 0; i < count; i++) {
      const angle = i * angleStep;
      const endX = centerX + length * Math.cos(angle);
      const endY = centerY + length * Math.sin(angle);

      const line = figma.createLine();
      line.x = centerX;
      line.y = centerY;
      line.resize(length, 0);
      line.rotation = (angle * 180) / Math.PI;
      line.strokeWeight = width;
      line.strokes = [{ type: "SOLID", color: { r: 1, g: 0, b: 1 } }];

      lines.push(line);
    }

    const group = figma.group(lines, figma.currentPage);
    group.name = "放射線";
    figma.currentPage.selection = [group];
    figma.viewport.scrollAndZoomIntoView([group]);
  });

  on<CloseHandler>("CLOSE", function () {
    // プラグインを閉じる前にプレビューを非表示にする
    // if (previewGroup) {
    //   previewGroup.visible = false;
    // }
    figma.closePlugin();
  });

  showUI({
    height: 500,
    width: 240,
  });
}
