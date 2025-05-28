import { ColorWithOpacity } from "../types";
import { h } from "preact";
import {
  TextboxColor,
  IconButton,
  IconEyeSmall24,
  IconBorderSmallSmall24,
  VerticalSpace,
} from "@create-figma-plugin/ui";

// 色と不透明度を入力するコンポーネント
export function ColorOpacityInput({
  index,
  color,
  fillColors,
  setFillColors,
}: {
  index: number;
  color: ColorWithOpacity;
  fillColors: ColorWithOpacity[];
  setFillColors: (colors: ColorWithOpacity[]) => void;
}) {
  return (
    <div key={index}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <TextboxColor
          hexColor={color.color}
          onHexColorInput={(event: h.JSX.TargetedEvent<HTMLInputElement>) => {
            const newColors = [...fillColors];
            newColors[index] = {
              ...newColors[index],
              color: event.currentTarget.value,
            };
            setFillColors(newColors);
          }}
          onOpacityInput={(event: h.JSX.TargetedEvent<HTMLInputElement>) => {
            const newColors = [...fillColors];
            newColors[index] = {
              ...newColors[index],
              opacity: parseInt(event.currentTarget.value),
            };
            setFillColors(newColors);
          }}
          opacity={String(color.opacity)}
        />
        {fillColors.length > 1 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <IconButton
              onClick={() => {
                const newColors = fillColors.filter((_, i) => i !== index);
                setFillColors(newColors);
              }}
            >
              <IconEyeSmall24 />
            </IconButton>
            <IconButton
              onClick={() => {
                const newColors = fillColors.filter((_, i) => i !== index);
                setFillColors(newColors);
              }}
            >
              <IconBorderSmallSmall24 />
            </IconButton>
          </div>
        )}
      </div>
      <VerticalSpace space="extraSmall" />
    </div>
  );
}
