import { CreateConfettiHandlerType } from "./confettiHandlerType";
import { hexToRgb } from "../../hexToRgb";

export const confettiHandler: CreateConfettiHandlerType["handler"] = (
  options
) => {
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
};
