import {
  Button,
  Columns,
  Container,
  Muted,
  Text,
  TextboxNumeric,
  VerticalSpace,
  RangeSlider,
  TextboxColor,
  Divider,
} from "@create-figma-plugin/ui";
import { h } from "preact";

interface RadialComponentProps {
  dashLength: string;
  dashGap: string;
  strokeWidth: string;
  fillColor: string;
  fillOpacity: string;
  strokeColor: string;
  strokeOpacity: string;
  minimum: number;
  maximum: number;
  onDashLengthInput: (event: h.JSX.TargetedEvent<HTMLInputElement>) => void;
  onDashGapInput: (event: h.JSX.TargetedEvent<HTMLInputElement>) => void;
  onStrokeWidthInput: (event: h.JSX.TargetedEvent<HTMLInputElement>) => void;
  onFillColorInput: (event: h.JSX.TargetedEvent<HTMLInputElement>) => void;
  onFillOpacityInput: (event: h.JSX.TargetedEvent<HTMLInputElement>) => void;
  onStrokeColorInput: (event: h.JSX.TargetedEvent<HTMLInputElement>) => void;
  onStrokeOpacityInput: (event: h.JSX.TargetedEvent<HTMLInputElement>) => void;
  onCreateButtonClick: () => void;
}

export function RadialComponent({
  dashLength,
  dashGap,
  strokeWidth,
  fillColor,
  fillOpacity,
  strokeColor,
  strokeOpacity,
  minimum,
  maximum,
  onDashLengthInput,
  onDashGapInput,
  onStrokeWidthInput,
  onFillColorInput,
  onFillOpacityInput,
  onStrokeColorInput,
  onStrokeOpacityInput,
  onCreateButtonClick,
}: RadialComponentProps) {
  return (
    <div>
      <VerticalSpace space="large" />

      <div>
        <Text>
          <Muted>Stroke width</Muted>
        </Text>
        <VerticalSpace space="small" />
        <RangeSlider
          maximum={maximum}
          minimum={minimum}
          onInput={onDashLengthInput}
          value={dashLength}
        />
        <VerticalSpace space="small" />
        <TextboxNumeric
          maximum={maximum}
          minimum={minimum}
          onInput={onDashLengthInput}
          value={dashLength}
        />
      </div>

      <VerticalSpace space="large" />

      <div>
        <Text>
          <Muted>Gap</Muted>
        </Text>
        <VerticalSpace space="small" />
        <RangeSlider
          maximum={maximum}
          minimum={minimum}
          onInput={onDashGapInput}
          value={dashGap}
        />
        <VerticalSpace space="small" />
        <TextboxNumeric
          maximum={maximum}
          minimum={minimum}
          onInput={onDashGapInput}
          value={dashGap}
        />
      </div>

      <VerticalSpace space="large" />

      <div>
        <Text>
          <Muted>Elipse size</Muted>
        </Text>
        <VerticalSpace space="small" />
        <RangeSlider
          maximum={1000}
          minimum={minimum}
          onInput={onStrokeWidthInput}
          value={strokeWidth}
        />
        <VerticalSpace space="small" />
        <TextboxNumeric
          maximum={1000}
          minimum={minimum}
          onInput={onStrokeWidthInput}
          value={strokeWidth}
        />
      </div>

      <VerticalSpace space="large" />
      <Divider />
      <VerticalSpace space="large" />

      <div>
        <Text>
          <Muted>Background color</Muted>
        </Text>
        <VerticalSpace space="small" />
        <TextboxColor
          hexColor={fillColor}
          onHexColorInput={onFillColorInput}
          onOpacityInput={onFillOpacityInput}
          opacity={fillOpacity}
        />
      </div>

      <VerticalSpace space="medium" />

      <div>
        <Text>
          <Muted>Stroke color</Muted>
        </Text>
        <VerticalSpace space="small" />
        <TextboxColor
          hexColor={strokeColor}
          onHexColorInput={onStrokeColorInput}
          onOpacityInput={onStrokeOpacityInput}
          opacity={strokeOpacity}
        />
      </div>

      <VerticalSpace space="large" />

      <Columns space="extraSmall">
        <Button fullWidth onClick={onCreateButtonClick}>
          生成
        </Button>
      </Columns>
      <VerticalSpace space="small" />
    </div>
  );
}
