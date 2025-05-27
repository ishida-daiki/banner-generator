import { CreateSparkleHandlerType } from "./sparkleHandlerType";
import { hexToRgb } from "../hexToRgb";

export const sparkleHandler: CreateSparkleHandlerType["handler"] = (
  options
) => {
  const { count, size, fillColors, fillOpacity, spreadRange, isRandom } = options;
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
};
