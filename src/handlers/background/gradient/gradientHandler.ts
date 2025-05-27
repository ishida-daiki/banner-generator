import { CreateGradientHandlerType } from "./gradientHandlerType";
import { hexToRgb } from "../../hexToRgb";


// 初期位置を保持する変数
var initialCenterX: number | null = null;
var initialCenterY: number | null = null;

// 作成した円を保持する変数
var currentCircle: EllipseNode | null = null;
var currentGroup: GroupNode | null = null;


// グラデーションの作成
export const gradientHandler: CreateGradientHandlerType["handler"] = (
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

  figma.currentPage.appendChild(circle);
  figma.currentPage.selection = [circle];
  figma.viewport.scrollAndZoomIntoView([circle]);

  // マスクグループを作成
  // const maskGroup = createMaskGroup(circle, centerX, centerY);
  // currentGroup = maskGroup; // 作成したグループを保持

  // マスクグループをページに追加
  // figma.currentPage.appendChild(maskGroup);
  // figma.currentPage.selection = [maskGroup];
  // figma.viewport.scrollAndZoomIntoView([maskGroup]);
};

