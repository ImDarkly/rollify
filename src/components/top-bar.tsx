import { ModeToggle } from "./mode-toggle";

const TopBar = () => {
  return (
    <div className="w-full h-24 flex flex-row justify-center absolute items-center">
      <ModeToggle />
    </div>
  );
};

export default TopBar;
