import {
  Button,
  Text,
  TextboxNumeric,
  VerticalSpace,
  RangeSlider,
  TextboxColor,
  Divider,
  Container,
  Bold,
} from "@create-figma-plugin/ui";
import { h } from "preact";
import { useRadial } from "../../hooks/useRadial";

export function RadialComponent() {
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
    handleDashLengthInput,
    handleDashGapInput,
    handleFillColorInput,
    handleFillOpacityInput,
    handleStrokeColorInput,
    handleStrokeOpacityInput,
    handleStrokeWidthInput,
    handleCreateButtonClick,
    minimum,
    maximum
  } = useRadial();

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
              marginBottom: "4px",
            }}
          >
            <Text>
              <Bold>Stroke width</Bold>
            </Text>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <RangeSlider
              maximum={maximum}
              minimum={minimum}
              onInput={handleDashLengthInput}
              value={dashLength}
            />
            <TextboxNumeric
              maximum={maximum}
              minimum={minimum}
              onInput={handleDashLengthInput}
              value={dashLength}
              style={{ width: "40px" }}
            />
          </div>
        </div>

        <VerticalSpace space="extraSmall" />

        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "24px",
              marginBottom: "4px",
            }}
          >
            <Text>
              <Bold>Gap</Bold>
            </Text>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <RangeSlider
              maximum={maximum}
              minimum={minimum}
              onInput={handleDashGapInput}
              value={dashGap}
            />
            <TextboxNumeric
              maximum={maximum}
              minimum={minimum}
              onInput={handleDashGapInput}
              value={dashGap}
              style={{ width: "40px" }}
            />
          </div>
        </div>

        <VerticalSpace space="extraSmall" />

        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "24px",
              marginBottom: "4px",
            }}
          >
            <Text>
              <Bold>Elipse size</Bold>
            </Text>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <RangeSlider
              maximum={1000}
              minimum={minimum}
              onInput={handleStrokeWidthInput}
              value={strokeWidth}
            />
            <TextboxNumeric
              maximum={1000}
              minimum={minimum}
              onInput={handleStrokeWidthInput}
              value={strokeWidth}
              style={{ width: "40px" }}
            />
          </div>
        </div>
      </Container>

      <VerticalSpace space="small" />
      <Divider />
      <VerticalSpace space="extraSmall" />

      <Container space="medium">
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
              <Bold>Background color</Bold>
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
              <Bold>Stroke color</Bold>
            </Text>
          </div>
          <VerticalSpace space="extraSmall" />
          <TextboxColor
            hexColor={strokeColor}
            onHexColorInput={handleStrokeColorInput}
            onOpacityInput={handleStrokeOpacityInput}
            opacity={strokeOpacity}
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
        <Button fullWidth onClick={handleCreateButtonClick}>
          生成
        </Button>
      </div>
    </div>
  );
}
