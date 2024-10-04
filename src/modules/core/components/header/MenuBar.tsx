import { useState } from "react";
import { Icons } from "../../utils/icons";
import { nanoid } from "nanoid";

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
    <div className="grid grid-cols-1 lg:grid-cols-6 items-center space-y-5 lg:space-y-0 text-white p-4 bg-sky-500">
      {/* Logo Section */}
      <div className="col-span-1 lg:col-span-1 text-left">
        <p className="font-bold bg-red-500 text-xl">Rentify</p>
      </div>

      {/* Empty space in the middle to push menu items to the right */}
      <div className="hidden lg:block col-span-3 bg-white">.</div>

      {/* Menu Items Section */}
      <div className="lg:hidden col-span-1 justify-end items-center text-black">
        <button onClick={handleMenuToggle}>
          {isOpen ? (
            <Icons.MenuOpen size={24} />
          ) : (
            <Icons.MenuClose size={24} />
          )}
        </button>
      </div>
      <div className="hidden col-span-2 lg:grid grid-cols-1 lg:grid-cols-5 p-1 gap-2">
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

      {isOpen && (
        <div className="col-span-2 grid grid-cols-1 p-1 gap-2">
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
      )}
    </div>
  );
};

export default MenuBar;
