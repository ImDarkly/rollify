import { SidebarTrigger } from "./ui/sidebar";

const Header = () => {
  return (
    <div className="w-full h-12 flex flex-row justify-between absolute items-center px-4">
      <SidebarTrigger className="-ml-1" />
    </div>
  );
};

export default Header;
