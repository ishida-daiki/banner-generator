import { CreateBalloonHandlerType } from "./balloonHandlerType";
import { hexToRgb } from "../../hexToRgb";

export const balloonHandler: CreateBalloonHandlerType["handler"] = (
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
};
