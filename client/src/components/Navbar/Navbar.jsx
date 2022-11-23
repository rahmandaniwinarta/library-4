import React from "react";
import {
  Flex,
  Text,
  Button,
  HStack,
  Image,
  Spacer,
  Stack,
  useMediaQuery,
  Tag,
  TagLabel,
  VStack,
} from "@chakra-ui/react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";
import logo from "../../img/logo.png";

import "./Navbar.css";

const Navbar = () => {
  const { NIM } = useSelector((state) => state.userSlice.value);
  const dispatch = useDispatch();

  const [isLargerThan] = useMediaQuery("(min-width: 768px)");

  const onLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
  };

  const baseStyle = {
    color: "black",
    textDecoration: "none",
  };
  const activeStyle = {
    color: "#FAF089",
    textDecoration: "none",
    transition: "0.5s",
    borderBottom: "2px solid black",
  };
  const style = ({ isActive }) => (isActive ? activeStyle : baseStyle);
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };
  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="Navbar">
      <Flex
        as="header"
        justifyContent="space-around"
        alignItems={"center"}
        fontWeight="bold"
        bg="#38A169"
        height={"60px"}
      >
        <Image width={["50px"]} m={7} src={logo} alt="logo" />
        <Text>| Perpustakaan Nasional</Text>
        <Spacer />
        {isLargerThan ? (
          <HStack>
            <NavLink style={style} to="/" a hrefLang="#Home">
              <Text my="4" mx="2">
                Home
              </Text>
            </NavLink>
            <NavLink style={style} to="/Books" a hrefLang="#Books">
              <Text my="4" mx="2">
                Books
              </Text>
            </NavLink>
            <NavLink style={style} to="/Category" a hrefLang="#men">
              <Text my="4" mx="2">
                Category
              </Text>
            </NavLink>
            <NavLink style={style} to="/Loan" a hrefLang="#women">
              <Text my="4" mx="2">
                Loan
              </Text>
            </NavLink>
            <NavLink style={style} to="/Admin">
              <Text my="4" mx="2" to="/Admin" a hrefLang="#shoes">
                Admin
              </Text>
            </NavLink>
          </HStack>
        ) : null}
        <Spacer />
        {NIM ? (
          <HStack direction="row" spacing={4} align="center">
            <Tag>
              <TagLabel>{NIM}</TagLabel>
            </Tag>

            <Button
              colorScheme="teal"
              variant="outline"
              as={Link}
              to="/login"
              onClick={onLogout}
            >
              Logout
            </Button>
          </HStack>
        ) : (
          <HStack>
            <Button
              colorScheme="teal"
              variant="outline"
              onClick={handleRegister}
            >
              Register
            </Button>
            <Button colorScheme="teal" variant="outline" onClick={handleLogin}>
              Login
            </Button>
          </HStack>
        )}
      </Flex>
    </div>
  );
};

export default Navbar;
