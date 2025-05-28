import {
  Button,
  Text,
  VerticalSpace,
  Divider,
  Bold,
  IconButton,
  IconPlus24,
  Toggle,
  Container,
} from "@create-figma-plugin/ui";
import { h } from "preact";
import { useConfetti } from "../../hooks/front/useConfetti";
import { ColorOpacityInput } from "../ColorOpacityInput";
import { Counter } from "../Counter";

export function ConfettiComponent() {
  const {
    count,
    size,
    setSize,
    isRandom,
    setFillColors,
    fillColors,
    handleCountInput,
    handleChange,
    handleCreateButtonClick,
    minimum,
    maximum,
  } = useConfetti();

  return (
    <div>
      <Container space="medium">
        <VerticalSpace space="extraSmall" />
        <Counter
          title="Count"
          maximum={maximum}
          minimum={minimum}
          handleCountInput={handleCountInput}
          count={count}
        />
      </Container>

      <VerticalSpace space="small" />
      <Divider />
      <VerticalSpace space="extraSmall" />

      <div>
        <Container space="medium">
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
                setFillColors([
                  ...fillColors,
                  { color: "E9816B", opacity: 100 },
                ])
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
      </div>

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
        <Toggle onChange={handleChange} value={isRandom}>
          <Text>ランダムに設定する</Text>
        </Toggle>

        <VerticalSpace space="small" />

        <div style={{ width: "100%" }}>
          <Button fullWidth onClick={handleCreateButtonClick}>
            生成
          </Button>
        </div>
      </div>
    </div>
  );
}
