import { useState } from "react";
import { Icons } from "../../utils/icons";
import { nanoid } from "nanoid";
import { Images } from "../../utils/images";

const MenuBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const MenuItems = [
    { label: "Home", href: "/" },
    { label: "Rent Now", href: "/rent-now" },
    { label: "Properties", href: "/properties" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
  ];

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 items-center space-y-5 lg:space-y-0 text-white p-4">
      {/* Logo and Mobile Menu Button in the same row */}
      <div className="col-span-1 grid grid-cols-2 items-center lg:col-span-1">
        {/* Logo Section */}
        <img
          src={Images.Logo}
          alt="R e n t i f y"
          className="w-12 h-8 lg:w-36 lg:h-20"
        />

        {/* Mobile menu button */}
        <div className="flex text-slate-600 justify-end lg:hidden">
          <button onClick={handleMenuToggle}>
            {isOpen ? (
              <Icons.MenuOpen size={24} />
            ) : (
              <Icons.MenuClose size={24} />
            )}
          </button>
        </div>
      </div>
      {/* Empty space in the middle to push menu items to the right */}
      <div className="hidden lg:block col-span-3 bg-white"></div>
      {/* Menu Items Section for Large Screens */}
      <div className="hidden col-span-2 lg:grid grid-cols-1 lg:grid-cols-5 p-1 gap-2 text-gray-700">
        {MenuItems.map((items) => (
          <a key={nanoid()} href={items.href} className="hover:underline">
            {items.label}
          </a>
        ))}
      </div>
      {/* Menu Items Section for Mobile when isOpen is true */}
      <div
        className={`lg:hidden col-span-2 grid grid-cols-1 p-1 gap-2 transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? "min-h-56 bg-red-500 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {MenuItems.map((items) => (
          <a
            key={nanoid()}
            href={items.href}
            className="hover:underline bg-slate-500"
          >
            {items.label}
          </a>
        ))}
      </div>
      )
    </div>
  );
};

export default MenuBar;
