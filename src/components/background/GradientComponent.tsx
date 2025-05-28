import {
  Button,
  Text,
  VerticalSpace,
  TextboxColor,
  Container,
  Bold,
  IconButton,
  IconPlus24,
} from "@create-figma-plugin/ui";
import { h } from "preact";
import { useGradient } from "../../hooks/background/useGradient";
import { ColorOpacityInput } from "../ColorOpacityInput";

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
    fillColors,
    setFillColors,
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text>
            <Bold>Color</Bold>
          </Text>
          <VerticalSpace space="extraSmall" />
          <IconButton
            onClick={() =>
              setFillColors([...fillColors, { color: "E9816B", opacity: 100 }])
            }
          >
            <IconPlus24 />
          </IconButton>
        </div>
        <VerticalSpace space="extraSmall" />
        <div
          style={{
            height: "236px",
            overflowY: "auto",
            paddingRight: "12px",
            marginRight: "-12px", // スクロールバーのスペースを確保
          }}
        >
          {fillColors.map((color, index) => (
            <ColorOpacityInput
              key={index}
              index={index}
              color={color}
              fillColors={fillColors}
              setFillColors={setFillColors}
            />
          ))}
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
