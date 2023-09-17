import React from "react";
import {Navbar,MobileNav,Typography,Button,IconButton,Card} from "@material-tailwind/react";
import logo from '../../img/logo.svg';
import { Link} from "react-router-dom";
export function NavbarDefault() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Button variant="outlined" color="gray"  size="sm" className="rounded-full shadow-md ">
        About us
      </Button>
      <Button variant="outlined" color="gray"  size="sm" className="rounded-full shadow-md">
      Testimonials
      </Button>
      <Button variant="outlined"  color="gray" size="sm" className="rounded-full shadow-md">
      Analytics
      </Button>
    </ul>
  );

  return (
    <Navbar className="mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4 mb-30" style={{ borderRadius: '50px', backgroundColor: 'white' }}>
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
      <img
                           width="160" height="100"
                            src={logo}
                            alt='logo'

                        />
        <div className="hidden lg:block">{navList}</div>
        <Link to="/login">
          <Button variant="gradient" color="gray" size="sm" fullWidth className="hidden lg:inline-block mb-2 rounded-full shadow-md">
            Login
            </Button>
            </Link>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto">
          {navList}
          <Link to="/login">
          <Button variant="gradient" color="gray" size="sm" fullWidth className="mb-2 rounded-full">
            <span>Login</span>

          </Button>
          </Link>
        </div>
      </MobileNav>
    </Navbar>
  );
}
