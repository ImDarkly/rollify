import { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Input } from "./ui/input";
import { RangeSlider } from "./ui/range-slider";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import useDiceStore from "@/zustand/diceStore";
import useMediaQuery from "@/hooks/useMediaQuery";
import { DiceConfig } from "@/lib/types";
import { Button } from "./ui/button";

const DiceForm = ({ diceId }: { diceId?: number }) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const createDice = useDiceStore((state) => state.createDice);

  const [isMultiplierEnabled, setIsMultiplierEnabled] = useState(false);
  const [isTitleEdited, setIsTitleEdited] = useState(false);
  const [config, setConfig] = useState<DiceConfig>({
    min: 1,
    max: 6,
    multiplier: 1,
    title: "1-6",
  });

  useEffect(() => {
    if (!isTitleEdited) {
      setConfig((prev) => ({
        ...prev,
        title: `${config.min}-${config.max}${
          config.multiplier > 1 ? `×${config.multiplier}` : ""
        }`,
      }));
    }
  }, [config.min, config.max, config.multiplier, isTitleEdited]);

  const handleDiceSettingsChange = (
    key: "min" | "max" | "multiplier",
    value: number,
  ) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const handleSliderChange = (values: [number, number]) => {
    setConfig((prev) => ({ ...prev, min: values[0], max: values[1] }));
  };

  const handleMultiplierToggle = () => {
    setIsMultiplierEnabled((prev) => {
      setConfig((c) => ({ ...c, multiplier: prev ? 1 : c.multiplier }));
      return !prev;
    });
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTitleEdited(true);
    setConfig((prev) => ({ ...prev, title: e.target.value }));
  };

  const handleSubmit = () => {
    createDice({
      ...config,
      multiplier: isMultiplierEnabled ? config.multiplier : 1,
    });
  };

  return (
    <div className="flex px-4 sm:px-0 p-4 gap-4">
      <div className="flex flex-col flex-grow gap-8">
        <div className="flex gap-2 flex-col">
          <Label>Title</Label>
          <Input
            type="text"
            className="w-full text-left"
            value={config.title}
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
                    value={config.min}
                    onChange={(e) =>
                      handleDiceSettingsChange("min", Number(e.target.value))
                    }
                    className="text-md"
                    onFocus={(e) => e.target.select()}
                  />
                  {isDesktop && (
                    <RangeSlider
                      value={[config.min, config.max]}
                      max={20}
                      step={1}
                      onValueChange={handleSliderChange}
                    />
                  )}
                  <Input
                    type="number"
                    placeholder="Maximum value"
                    value={config.max}
                    onChange={(e) =>
                      handleDiceSettingsChange("max", Number(e.target.value))
                    }
                    className="text-md"
                    onFocus={(e) => e.target.select()}
                  />
                </div>

                {!isDesktop && (
                  <RangeSlider
                    value={[config.min, config.max]}
                    max={20}
                    step={1}
                    onValueChange={handleSliderChange}
                  />
                )}
              </div>
              <div className="flex items-center gap-4 sm:gap-2">
                <span>
                  <Icon
                    icon="heroicons:x-mark-16-solid"
                    className={`size-6 ${
                      isMultiplierEnabled ? "opacity-100" : "opacity-50"
                    }`}
                  />
                </span>
                <Input
                  type="number"
                  placeholder="Multiplier"
                  value={isMultiplierEnabled ? config.multiplier : 1}
                  onChange={(e) =>
                    handleDiceSettingsChange(
                      "multiplier",
                      Number(e.target.value),
                    )
                  }
                  className="text-md"
                  onFocus={(e) => e.target.select()}
                  disabled={!isMultiplierEnabled}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2 flex-col">
          <div className="flex items-center justify-between">
            <Label>Multiplier</Label>
            <Switch
              checked={isMultiplierEnabled}
              onCheckedChange={handleMultiplierToggle}
            />
          </div>
        </div>
        <Button onClick={handleSubmit}>Add dice</Button>
      </div>
    </div>
  );
};

export default DiceForm;
