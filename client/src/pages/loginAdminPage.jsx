import { useRef, useState } from "react";
import {
  Input,
  Button,
  Container,
  Heading,
  FormLabel,
  FormControl,
} from "@chakra-ui/react";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/adminSlice";
import { useNavigate } from "react-router-dom";

const url = "http://localhost:2000/admin/loginAdmin";

export const LoginAdminPage = () => {
  const { username } = useSelector((state) => state.adminSlice.value);
  console.log(username);
  const navigate = useNavigate();
  const inputUsername = useRef("");
  const inputPassword = useRef("");
  const dispatch = useDispatch();


  const onLogin = async (data) => {
    data.preventDefault();

    try {
      const user = {
        username: inputUsername.current.value,
        password: inputPassword.current.value,
      };

      console.log(user);
      console.log(inputUsername.current)
      const result = await Axios.post(url, user); // data yg dari back end kesimpen di result.data
      dispatch(
        login({
          username: result.data.isAdminExist.username,
        })
      );

      localStorage.setItem("tokenAdmin", result.data.token);
      navigate("/");
    } catch (err) {
      console.log(err);
      alert(err.response.data);
    }
  };


  return (
    <Container bg="#38A169" w="300px" h="350px" mt={20}>
      <Heading mb={10}>Login Admin</Heading>
      <form onSubmit={onLogin}>
      <FormControl>
        <FormLabel>Username</FormLabel>
        <Input type="text" placeholder="Username" ref={inputUsername} />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input type="password" placeholder="Password" ref={inputPassword} />
      </FormControl>
      <Button mt={10} w="100%" onClick={onLogin} colorScheme="orange">
        Login
      </Button>
      </form>
    </Container>
  );
};


