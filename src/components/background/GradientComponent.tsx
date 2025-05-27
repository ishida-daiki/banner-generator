import {
  Button,
  Text,
  VerticalSpace,
  TextboxColor,
  Container,
  Bold,
} from "@create-figma-plugin/ui";
import { h } from "preact";
import { useGradient } from "../../hooks/background/useGradient";
// import { CreateCircleHandler, PreviewCircleHandler } from "./type";


export function GradientComponent() {
  const {
    count,
    setCount,
    radius,
    setRadius,
    strokeWidth,
    strokeCap,
    setStrokeCap,
    strokeJoin,
    setStrokeJoin,
    dashLength,
    setDashLength,
    dashGap,
    setDashGap,
    fillColor,
    setFillColor,
    fillOpacity,
    setFillOpacity,
    strokeColor,
    setStrokeColor,
    strokeOpacity,
    setStrokeOpacity,
    handleFillColorInput,
    handleFillOpacityInput,
    handleCreateGradientButtonClick,
    minimum,
    maximum,
  } = useGradient();

  return (
    <div>
      <Container space="medium">
        <VerticalSpace space="extraSmall" />
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "24px",
            }}
          >
            <Text>
              <Bold>color1</Bold>
            </Text>
          </div>
          <VerticalSpace space="extraSmall" />
          <TextboxColor
            hexColor={fillColor}
            onHexColorInput={handleFillColorInput}
            onOpacityInput={handleFillOpacityInput}
            opacity={fillOpacity}
          />
        </div>

        <VerticalSpace space="small" />

        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "24px",
            }}
          >
            <Text>
              <Bold>base color</Bold>
            </Text>
          </div>
          <VerticalSpace space="extraSmall" />
          <TextboxColor
            hexColor={fillColor}
            onHexColorInput={handleFillColorInput}
            onOpacityInput={handleFillOpacityInput}
            opacity={fillOpacity}
          />
        </div>
      </Container>

      <VerticalSpace space="small" />

      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          padding: "12px 16px 16px 16px",
          background: "var(--figma-color-bg)",
          borderTop: "1px solid var(--figma-color-border)",
          zIndex: 2,
        }}
      >
        <Button fullWidth onClick={handleCreateGradientButtonClick}>
          生成
        </Button>
      </div>
    </div>
  );
}
