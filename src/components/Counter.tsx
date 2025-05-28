import {
  Text,
  Bold,
  RangeSlider,
  TextboxNumeric,
} from "@create-figma-plugin/ui";
import { h } from "preact";

export function Counter({
  title,
  maximum,
  minimum,
  handleCountInput,
  count,
}: {
  title: string;
  maximum: number;
  minimum: number;
  handleCountInput: (event: h.JSX.TargetedEvent<HTMLInputElement>) => void;
  count: string;
}) {
  return (
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
          <Bold>{title}</Bold>
        </Text>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <RangeSlider
          maximum={maximum}
          minimum={minimum}
          onInput={handleCountInput}
          value={count}
        />
        <TextboxNumeric
          maximum={maximum}
          minimum={minimum}
          onInput={handleCountInput}
          value={count}
          style={{ width: "40px" }}
        />
      </div>
    </div>
  );
}
