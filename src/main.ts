import { once, showUI, on } from "@create-figma-plugin/utilities";

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
  // 初期位置を保持する変数
  let initialCenterX: number | null = null;
  let initialCenterY: number | null = null;

  // プレビュー用の円を作成/更新する関数
  function updatePreview(options: {
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

    // 初期位置が未設定の場合のみ、現在のビューポートの中心を使用
    if (initialCenterX === null || initialCenterY === null) {
      initialCenterX = figma.viewport.center.x;
      initialCenterY = figma.viewport.center.y;
    }

    // 既存のプレビューがあれば更新、なければ新規作成
    if (previewCircle && previewGroup) {
      // 既存の円を更新
      previewCircle.resize(radius * 2, radius * 2);
      previewCircle.x = initialCenterX - radius;
      previewCircle.y = initialCenterY - radius;
      previewCircle.strokeWeight = strokeWidth;
      previewCircle.strokeCap = strokeCap;
      previewCircle.strokeJoin = strokeJoin;
      previewCircle.dashPattern = dashPattern;

      // 線の色を設定
      const strokeRgb = hexToRgb(strokeColor);
      previewCircle.strokes = [
        {
          type: "SOLID",
          color: strokeRgb,
          opacity: strokeOpacity / 100,
        },
      ];

      // 背景色を設定
      const fillRgb = hexToRgb(fillColor);
      previewCircle.fills = [
        {
          type: "SOLID",
          color: fillRgb,
          opacity: fillOpacity / 100,
        },
      ];
    } else {
      // 新規作成
      const circle = figma.createEllipse();
      circle.x = initialCenterX - radius;
      circle.y = initialCenterY - radius;
      circle.resize(radius * 2, radius * 2);
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

      const group = figma.group([circle], figma.currentPage);
      group.name = "プレビュー";
      previewCircle = circle;
      previewGroup = group;
    }

    // プレビューを表示
    if (previewGroup) {
      figma.currentPage.selection = [previewGroup];
      figma.viewport.scrollAndZoomIntoView([previewGroup]);
    }
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
    // プレビューを削除
    if (previewGroup) {
      previewGroup.remove();
      previewCircle = null;
      previewGroup = null;
      initialCenterX = null;
      initialCenterY = null;
    }

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

    const centerX = figma.viewport.center.x;
    const centerY = figma.viewport.center.y;

    const circle = figma.createEllipse();
    circle.x = centerX - radius;
    circle.y = centerY - radius;
    circle.resize(radius * 2, radius * 2);
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

    const group = figma.group([circle], figma.currentPage);
    group.name = "円";
    figma.currentPage.selection = [group];
    figma.viewport.scrollAndZoomIntoView([group]);
  }

  once<CreateRectanglesHandler>("CREATE_RECTANGLES", function (count: number) {
    const nodes: Array<SceneNode> = [];
    for (let i = 0; i < count; i++) {
      const rect = figma.createRectangle();
      rect.x = i * 150;
      rect.fills = [
        {
          color: { b: 0, g: 0.5, r: 1 },
          type: "SOLID",
        },
      ];
      figma.currentPage.appendChild(rect);
      nodes.push(rect);
    }
    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
  });

  on<CreateCircleHandler>("CREATE_CIRCLE", function (options) {
    createCircle(options);
  });

  on<PreviewCircleHandler>("PREVIEW_CIRCLE", function (options) {
    updatePreview(options);
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
    // プラグインを閉じる前にプレビューを削除
    if (previewGroup) {
      previewGroup.remove();
    }
    figma.closePlugin();
  });

  showUI({
    height: 500,
    width: 240,
  });
}
