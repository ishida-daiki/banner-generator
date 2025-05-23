import { showUI, on } from "@create-figma-plugin/utilities";

import {
  CreateCircleHandler,
  PreviewCircleHandler,
  CloseHandler,
  CreateConfettiHandler,
  CreateBalloonHandler,
  CreateSparkleHandler,
} from "./types";

function hexToRgb(hex: string) {
  // #を削除し、3桁の場合は6桁に変換
  const cleanHex = hex.replace("#", "").trim();
  const validHex =
    cleanHex.length === 3
      ? cleanHex
          .split("")
          .map((char) => char + char)
          .join("")
      : cleanHex;

  // 16進数を10進数に変換し、255で割って0-1の範囲に正規化
  const r = parseInt(validHex.slice(0, 2), 16) / 255;
  const g = parseInt(validHex.slice(2, 4), 16) / 255;
  const b = parseInt(validHex.slice(4, 6), 16) / 255;

  // NaNチェック
  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    return { r: 0, g: 0, b: 0 }; // 無効な値の場合は黒を返す
  }

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

  on<CreateConfettiHandler>("CREATE_CONFETTI", function (options) {
    const { count, size, fillColors, fillOpacity, spreadRange, isRandom } =
      options;
    const centerX = figma.viewport.center.x;
    const centerY = figma.viewport.center.y;

    const confetti = [];
    for (let i = 0; i < count; i++) {
      let x, y;

      if (isRandom) {
        // ランダム分布の場合
        const angle = (i / count) * Math.PI * 2;
        const randomAngle = ((Math.random() - 0.5) * Math.PI) / 4;
        const baseDistance = Math.random() * spreadRange;
        const distance = baseDistance * (0.7 + Math.random() * 0.3);
        x = centerX + Math.cos(angle + randomAngle) * distance;
        y = centerY + Math.sin(angle + randomAngle) * distance;
      } else {
        // 横並びで等間隔に配置
        const spacing = 40; // 要素間の間隔
        const totalWidth = (count - 1) * spacing; // 全体の幅
        x = centerX - totalWidth / 2 + i * spacing; // 中心から左右に均等に配置
        y = centerY; // 高さは固定
      }

      // 紙吹雪の形状を作成
      const vector = figma.createVector();
      vector.resize(24, 33);
      vector.x = x - 12;
      vector.y = y - 16.5;

      // SVGのパスデータをFigmaのベクトルパスに変換
      vector.vectorPaths = [
        {
          windingRule: "NONZERO",
          data:
            "M 0.875331 32.5435 " +
            "L 15.0463 32.5435 " +
            "C 15.447 32.5435 15.7715 32.2097 15.782 31.7981 " +
            "C 16.0783 20.1143 20.3291 13.1125 23.5769 1.26206 " +
            "C 23.7081 0.783286 23.3549 0.306895 22.8702 0.306895 " +
            "L 7.78384 0.306895 " +
            "C 7.45584 0.306895 7.16801 0.534077 7.07849 0.857865 " +
            "C 3.78611 12.7661 0.0873691 19.7795 0.142649 31.7953 " +
            "C 0.144549 32.208 0.473724 32.5435 0.875331 32.5435 " +
            "Z",
        },
      ];

      // ランダムに色を選択
      const randomColor =
        fillColors[Math.floor(Math.random() * fillColors.length)];
      const rgb = hexToRgb(randomColor);
      vector.fills = [
        {
          type: "SOLID",
          color: rgb,
          opacity: fillOpacity / 100,
        },
      ];

      // ストロークを削除
      vector.strokes = [];

      // ランダムな回転を設定
      if (isRandom) {
        vector.rotation = Math.random() * 360;
      }

      confetti.push(vector);
    }

    // パーティクルをグループ化
    const group = figma.group(confetti, figma.currentPage);
    group.name = "Confetti";
    figma.currentPage.selection = [group];
    figma.viewport.scrollAndZoomIntoView([group]);
  });

  on<CreateBalloonHandler>("CREATE_BALLOON", function (options) {
    const { count, size, fillColors, fillOpacity, spreadRange, isRandom } =
      options;
    const centerX = figma.viewport.center.x;
    const centerY = figma.viewport.center.y;

    const confetti = [];
    for (let i = 0; i < count; i++) {
      let x, y;

      if (isRandom) {
        // ランダム分布の場合
        const angle = (i / count) * Math.PI * 2;
        const randomAngle = ((Math.random() - 0.5) * Math.PI) / 4;
        const baseDistance = Math.random() * spreadRange;
        const distance = baseDistance * (0.7 + Math.random() * 0.3);
        x = centerX + Math.cos(angle + randomAngle) * distance;
        y = centerY + Math.sin(angle + randomAngle) * distance;
      } else {
        // 横並びで等間隔に配置
        const spacing = 100; // 要素間の間隔
        const totalWidth = (count - 1) * spacing; // 全体の幅
        x = centerX - totalWidth / 2 + i * spacing; // 中心から左右に均等に配置
        y = centerY; // 高さは固定
      }

      // 紙吹雪の形状を作成
      const vector = figma.createVector();
      vector.resize(24, 33);
      vector.x = x - 12;
      vector.y = y - 16.5;

      // SVGのパスデータをFigmaのベクトルパスに変換
      vector.vectorPaths = [
        {
          windingRule: "NONZERO",
          data:
            "M 76.0017 24.4365 " +
            "C 66.1816 2.56103 44.5378 -5.7088 25.0143 4.94195 " +
            "C 9.66854 13.3164 -0.903148 34.1269 0.368703 53.4512 " +
            "C 1.90873 76.856 15.6065 95.326 37.198 96.5677 " +
            "C 36.5154 97.8018 35.6013 99.3053 34.5567 100.547 " +
            "C 33.5857 101.712 35.189 102.778 37.3709 103.409 " +
            "C 37.0517 110.31 36.0977 127.025 33.8637 138.889 " +
            "L 35.912 139.214 " +
            "C 38.1297 127.446 39.1 111.031 39.4381 103.847 " +
            "C 40.2528 103.963 41.0658 104.02 41.7983 103.989 " +
            "C 42.8188 103.954 43.4364 103.022 42.9464 102.269 " +
            "C 41.9605 100.748 40.5827 98.4497 39.9836 96.6536 " +
            "C 40.9472 96.6744 41.9988 96.7005 42.4533 96.7279 " +
            "C 48.8656 97.0473 54.7645 94.8897 60.1345 90.6568 " +
            "C 79.0941 75.699 86.0037 46.7331 75.9944 24.4361 " +
            "L 76.0017 24.4365 " +
            "Z",
        },
      ];

      // ランダムに色を選択
      const randomColor =
        fillColors[Math.floor(Math.random() * fillColors.length)];
      const rgb = hexToRgb(randomColor);
      vector.fills = [
        {
          type: "SOLID",
          color: rgb,
          opacity: fillOpacity / 100,
        },
      ];

      // ストロークを削除
      vector.strokes = [];

      // ランダムな回転を設定
      if (isRandom) {
        vector.rotation = Math.random() * 360;
      }

      confetti.push(vector);
    }

    // パーティクルをグループ化
    const group = figma.group(confetti, figma.currentPage);
    group.name = "Confetti";
    figma.currentPage.selection = [group];
    figma.viewport.scrollAndZoomIntoView([group]);
  });

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
          color: { r: 0.851, g: 0.851, b: 0.851 }
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
