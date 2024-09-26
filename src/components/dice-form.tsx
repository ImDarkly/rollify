import { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Input } from "./ui/input";
import { RangeSlider } from "./ui/range-slider";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import useDiceStore from "@/zustand/diceStore";
import useMediaQuery from "@/hooks/useMediaQuery";

const DiceForm = ({ diceId }: { diceId?: number }) => {
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const dice = useDiceStore((state) => state.dice);
    const initialMultiplierEnabled = diceId
        ? dice[diceId].multiplier > 1
        : false;
    const [isMultiplierEnabled, setIsMultiplierEnabled] = useState(
        initialMultiplierEnabled
    );
    const [isTitleEdited, setIsTitleEdited] = useState(false);
    const { diceSettings, updateDiceSettings } = useDiceStore();

    useEffect(() => {
        if (!isTitleEdited) {
            updateDiceSettings({
                title: `${diceSettings.values.minimum}-${
                    diceSettings.values.maximum
                }${
                    diceSettings.multiplier > 1
                        ? `×${diceSettings.multiplier}`
                        : ""
                }`,
            });
        }
    }, [
        diceSettings.multiplier,
        diceSettings.values.minimum,
        diceSettings.values.maximum,
        isTitleEdited,
        updateDiceSettings,
    ]);

    useEffect(() => {
        if (diceId) {
            updateDiceSettings({
                title: dice[diceId].title,
                values: {
                    minimum: dice[diceId].min,
                    maximum: dice[diceId].max,
                },
                multiplier: dice[diceId].multiplier,
            });
        }
    }, [dice, diceId, updateDiceSettings]);

    const handleDiceSettingsChange = (
        key: "minimum" | "maximum" | "multiplier",
        value: number
    ) => {
        if (key === "multiplier") {
            updateDiceSettings({ multiplier: value });
        } else {
            updateDiceSettings({
                values: {
                    ...diceSettings.values,
                    [key]: value,
                },
            });
        }
    };

    const handleSliderChange = (values: [number, number]) => {
        updateDiceSettings({
            values: { minimum: values[0], maximum: values[1] },
        });
    };

    const handleMultiplierToggle = () => {
        setIsMultiplierEnabled((prev) => {
            const isTogglingOff = prev;
            updateDiceSettings({
                multiplier: isTogglingOff ? 1 : diceSettings.multiplier,
            });
            return !prev;
        });
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsTitleEdited(true);
        updateDiceSettings({ title: e.target.value });
    };

    return (
        <div className="flex px-4 sm:px-0 p-4 gap-4">
            <div className="flex flex-col flex-grow gap-8">
                <div className="flex gap-2 flex-col">
                    <Label>Title</Label>
                    <Input
                        type="text"
                        className="w-full text-left"
                        value={diceSettings.title}
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
                                        value={diceSettings.values.minimum}
                                        onChange={(e) =>
                                            handleDiceSettingsChange(
                                                "minimum",
                                                Number(e.target.value)
                                            )
                                        }
                                        className="text-md"
                                        onFocus={(e) => e.target.select()}
                                    />
                                    {isDesktop && (
                                        <RangeSlider
                                            value={[
                                                diceSettings.values.minimum,
                                                diceSettings.values.maximum,
                                            ]}
                                            max={20}
                                            step={1}
                                            onValueChange={handleSliderChange}
                                        />
                                    )}
                                    <Input
                                        type="number"
                                        placeholder="Maximum value"
                                        value={diceSettings.values.maximum}
                                        onChange={(e) =>
                                            handleDiceSettingsChange(
                                                "maximum",
                                                Number(e.target.value)
                                            )
                                        }
                                        className="text-md"
                                        onFocus={(e) => e.target.select()}
                                    />
                                </div>

                                {!isDesktop && (
                                    <RangeSlider
                                        value={[
                                            diceSettings.values.minimum,
                                            diceSettings.values.maximum,
                                        ]}
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
                                            isMultiplierEnabled
                                                ? "opacity-100"
                                                : "opacity-50"
                                        }`}
                                    />
                                </span>
                                <Input
                                    type="number"
                                    placeholder="Multiplier"
                                    value={
                                        isMultiplierEnabled
                                            ? diceSettings.multiplier
                                            : 1
                                    }
                                    onChange={(e) =>
                                        handleDiceSettingsChange(
                                            "multiplier",
                                            Number(e.target.value)
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
            </div>
        </div>
    );
};

export default DiceForm;
