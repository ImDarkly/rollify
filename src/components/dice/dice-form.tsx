import { ChangeEvent, ReactNode, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Input } from "../ui/input";
import { RangeSlider } from "../ui/range-slider";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { DiceConfig } from "@/lib/types";
import { Button } from "../ui/button";

interface DiceFormProps {
  initialConfig?: DiceConfig;
  onSubmit: (config: DiceConfig) => void;
  renderSubmit?: (handleSubmit: () => void) => ReactNode;
}

const generateTitle = (min: number, max: number, multiplier: number | null) =>
  `${min}-${max}${multiplier && multiplier > 1 ? `×${multiplier}` : ""}`;

const DiceForm = ({ initialConfig, onSubmit, renderSubmit }: DiceFormProps) => {
  const [min, setMin] = useState(initialConfig?.min ?? 1);
  const [max, setMax] = useState(initialConfig?.max ?? 6);
  const [multiplier, setMultiplier] = useState(initialConfig?.multiplier ?? 1);
  const [multiplierEnabled, setMultiplierEnabled] = useState(false);
  const [customTitle, setCustomTitle] = useState<string | null>(null);

  const title =
    customTitle ??
    generateTitle(min, max, multiplierEnabled ? multiplier : null);

  const handleMinChange = (value: number) => {
    setMin(value);
    setCustomTitle(null);
  };

  const handleMaxChange = (value: number) => {
    setMax(value);
    setCustomTitle(null);
  };

  const handleMultiplierChange = (value: number) => {
    setMultiplier(value);
    setCustomTitle(null);
  };

  const handleMultiplierToggle = (enabled: boolean) => {
    setMultiplierEnabled(enabled);
    setCustomTitle(null);
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setCustomTitle(e.target.value);

  const handleSubmit = () => {
    onSubmit({
      min,
      max,
      multiplier: multiplierEnabled ? multiplier : 1,
      title,
    });
    setMin(initialConfig?.min ?? 1);
    setMax(initialConfig?.max ?? 6);
    setMultiplier(initialConfig?.multiplier ?? 1);
    setMultiplierEnabled(false);
    setCustomTitle(null);
  };

  return (
    <div className="@container flex gap-4">
      <div className="flex flex-col flex-grow gap-8">
        <div className="flex gap-2 flex-col">
          <Label>Title</Label>
          <Input
            type="text"
            className="w-full text-left"
            value={title}
            onChange={handleTitleChange}
            onFocus={(e) => e.target.select()}
          />
        </div>
        <div>
          <div className="flex gap-2 flex-col">
            <Label>Range</Label>
            <div className="flex gap-2">
              <div className="flex gap-2 flex-grow flex-col">
                <div className="flex justify-between sm:gap-2 sm:items-center">
                  <Input
                    type="number"
                    placeholder="Minimal value"
                    value={min}
                    onChange={(e) => handleMinChange(Number(e.target.value))}
                    className="text-md"
                    onFocus={(e) => e.target.select()}
                  />
                  <div className="hidden @sm:flex flex-1 min-w-0">
                    <RangeSlider
                      value={[min, max]}
                      max={20}
                      step={1}
                      onValueChange={([min, max]) => {
                        handleMinChange(min);
                        handleMaxChange(max);
                      }}
                      className="w-full"
                    />
                  </div>
                  <Input
                    type="number"
                    placeholder="Maximum value"
                    value={max}
                    onChange={(e) => handleMaxChange(Number(e.target.value))}
                    className="text-md"
                    onFocus={(e) => e.target.select()}
                  />
                </div>

                <div className="flex @sm:hidden flex-1 min-w-0">
                  <RangeSlider
                    value={[min, max]}
                    max={20}
                    step={1}
                    onValueChange={([min, max]) => {
                      handleMinChange(min);
                      handleMaxChange(max);
                    }}
                    className="w-full"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4 sm:gap-2">
                <span>
                  <Icon
                    icon="heroicons:x-mark-16-solid"
                    className={`size-6 ${
                      multiplierEnabled ? "opacity-100" : "opacity-50"
                    }`}
                  />
                </span>
                <Input
                  type="number"
                  placeholder="Multiplier"
                  value={multiplierEnabled ? multiplier : 1}
                  onChange={(e) =>
                    handleMultiplierChange(Number(e.target.value))
                  }
                  className="text-md"
                  onFocus={(e) => e.target.select()}
                  disabled={!multiplierEnabled}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2 flex-col">
          <div className="flex items-center justify-between">
            <Label>Multiplier</Label>
            <Switch
              checked={multiplierEnabled}
              onCheckedChange={handleMultiplierToggle}
            />
          </div>
        </div>
        {renderSubmit ? (
          renderSubmit(handleSubmit)
        ) : (
          <Button onClick={handleSubmit}>Add Dice</Button>
        )}
      </div>
    </div>
  );
};

export default DiceForm;
