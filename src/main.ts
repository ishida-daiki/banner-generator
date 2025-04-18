import { once, showUI, on } from "@create-figma-plugin/utilities";

import {
  CloseHandler,
  CreateCircleHandler,
  CreateRectanglesHandler,
  CreateRadialHandler,
} from "./types";

export default function () {
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
  once<CreateCircleHandler>("CREATE_CIRCLE", function (options) {
    const { count, radius, strokeWidth, strokeCap, strokeJoin, dashPattern } =
      options;
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
    circle.strokes = [{ type: "SOLID", color: { r: 1, g: 0, b: 1 } }];
    circle.fills = [{ type: 'SOLID', color: { r: 1, g: 0.8, b: 1 }, opacity: 1 }];
    circles.push(circle);
    // for (let i = 0; i < count; i++) {
    //   const circle = figma.createEllipse();
    //   circle.x = centerX - radius;
    //   circle.y = centerY - radius;
    //   circle.resize(radius * 2, radius * 2);
    //   circle.strokeWeight = strokeWidth;
    //   circle.strokeCap = strokeCap;
    //   circle.strokeJoin = strokeJoin;
    //   circle.dashPattern = dashPattern;
    //   circle.strokes = [{ type: 'SOLID', color: { r: 1, g: 0, b: 1 } }];
    //   circle.fills = [];
    //   circles.push(circle);
    // }

    // const group = figma.group(circles, figma.currentPage);
    // group.name = "円";
    // figma.currentPage.selection = [group];
    // figma.viewport.scrollAndZoomIntoView([group]);
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
    figma.closePlugin();
  });
  showUI({
    height: 300,
    width: 240,
  });
}
