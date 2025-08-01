import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@radix-ui/react-navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import logo from "../../assets/logo.png";
import { Link } from "react-router";

const navLinks = [
  { to: "/books", label: "All books" },
  { to: "/create-book", label: "Add Book" },
  { to: "/borrow-summary", label: "Borrow Summary" },
];

function Navbar() {
  return (
    <header className="p-4 border-b">
      <div className="container mx-auto flex items-center justify-between">
        <Link to={"/home"}>
          <img src={logo} alt="logo" className="max-w-44" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-4">
              {navLinks.map((link) => (
                <NavigationMenuItem key={link.to}>
                  <NavigationMenuLink asChild>
                    <Link
                      to={link.to}
                      className="px-4 py-2 hover:bg-gray-100 rounded-md text-sm font-medium transition-colors"
                    >
                      {link.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader className="sr-only">
                <SheetTitle>Are you absolutely sure?</SheetTitle>
                <SheetDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-6 pl-5">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.to}>
                    <Link
                      to={link.to}
                      className="text-lg font-medium hover:text-blue-600 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
