import { CreateRadialHandlerType, PreviewRadialHandlerType } from "./radialHandlerType";
import { hexToRgb } from "../hexToRgb";


// 初期位置を保持する変数
var initialCenterX: number | null = null;
var initialCenterY: number | null = null;

// 作成した円を保持する変数
var currentCircle: EllipseNode | null = null;
var currentGroup: GroupNode | null = null;

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

// 放射線の作成
export const radialHandler: CreateRadialHandlerType["handler"] = (
  options
) => {
  const { radius, strokeWidth, strokeCap, strokeJoin, dashPattern, fillColor, fillOpacity, strokeColor, strokeOpacity } = options;
  const centerX = figma.viewport.center.x;
  const centerY = figma.viewport.center.y;

  // マスクグループを作成する関数
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
};

export const previewRadialHandler: PreviewRadialHandlerType["handler"] = (
  options
) => {
  if (currentCircle && initialCenterX !== null && initialCenterY !== null) {
    updateCircleProperties(
      currentCircle,
      options,
      initialCenterX,
      initialCenterY
    );
  }
};
