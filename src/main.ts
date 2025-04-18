import { once, showUI, on } from "@create-figma-plugin/utilities";

import {
  CloseHandler,
  CreateCircleHandler,
  CreateRectanglesHandler,
  CreateRadialHandler,
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

  // プレビュー用の円を作成する関数
  function createPreviewCircle(options: {
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

    // 既存のプレビューがあれば削除
    if (previewGroup) {
      previewGroup.remove();
    }

    const centerX = figma.viewport.center.x;
    const centerY = figma.viewport.center.y;

    const circles = [];
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

    circles.push(circle);
    previewCircle = circle;

    const group = figma.group(circles, figma.currentPage);
    group.name = "プレビュー";
    previewGroup = group;
    figma.currentPage.selection = [group];
    figma.viewport.scrollAndZoomIntoView([group]);
  }

  // プレビューをFigmaに追加する関数
  function addToFigma() {
    if (previewGroup) {
      previewGroup.name = "円";
      previewGroup = null;
      previewCircle = null;
    }
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
    createPreviewCircle(options);
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
    width: 700,
  });
}
