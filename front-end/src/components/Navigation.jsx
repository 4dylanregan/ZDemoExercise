import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Box, Flex, Text, Button, Stack } from "@chakra-ui/react";

import Signout from "./Signout";
import colorTheme from "../styles/colorTheme.json";

const NavBar = ({auth, admin , userFunction, ...props}) => {

  //TODO add checking for sign in and admin

  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation()
  const navigate = useNavigate();

  const signOutFunction = () => {
    userFunction("")
    navigate('/', { state: { signedOut: true } });
  };

  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavBarContainer {...props}>
      <MenuToggle toggle={toggle} isOpen={isOpen}/> 
      <MenuLinks isOpen={isOpen} auth={auth} admin={admin} path={location.pathname} signOut={signOutFunction}/>
    </NavBarContainer>
  );
};

const CloseIcon = () => (
  <svg width="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <title>Close</title>
    <path
      fill="white"
      d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
    />
  </svg>
);

const MenuIcon = () => (
  <svg
    width="24px"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    fill="white"
  >
    <title>Menu</title>
    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
  </svg>
);

const MenuToggle = ({ toggle, isOpen }) => {
  return (
    <Box display={{ base: "block", md: "none" }} onClick={toggle}>
      {isOpen ? <CloseIcon /> : <MenuIcon />}
    </Box>
  );
};

const MenuItem = ({ children, to = "/", selected = false, ...rest }) => {
  return (
    <NavLink to={to}>
      <Text
        display="block"
        color={selected ? "blue" : "white"}
        fontWeight={selected ? "bold" : "normal"}
        textDecoration={selected ? "underline" : "none"}
        {...rest}
      >
        {children}
      </Text>
    </NavLink>
  );
};

const getAuth = (auth, admin, path, signOut) => {
  const color = 'red'

    if (auth) {
        return (<>
            {admin ? <MenuItem to="/admin" selected={path === "/admin"} _hover={{color: colorTheme.hover}}>Admin</MenuItem> : null}
            <Signout signOutFunction={signOut} _hover={{color: colorTheme.hover}}/>
        </>)
    } else {
        return (<>
            <MenuItem to="/login" selected={path === "/login"} _hover={{color: colorTheme.hover}}>Login</MenuItem>
        </>)
    }
}

const MenuLinks = ({isOpen, auth, admin, path, signOut}) => {
  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
    >
      <Stack
        spacing={8}
        align="center"
        justify={["center", "space-between", "flex-end", "flex-end"]}
        direction={["column", "row", "row", "row"]}
        pt={[4, 4, 0, 0]}
      >
        <MenuItem to="/" selected={path === "/"} _hover={{color: colorTheme.hover}}>Home</MenuItem>
        {getAuth(auth, admin, path, signOut)}
      </Stack>
    </Box>
  );
};

const NavBarContainer = ({ children, ...props }) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      p={8}
      bg={colorTheme.header}
      color='white'
      margin={0}
      {...props}
    >
      {children}
    </Flex>
  );
};

export default NavBar;