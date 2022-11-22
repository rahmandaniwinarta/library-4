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
import { login } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const url = "http://localhost:2000/users/login";

export const LoginPage = () => {
  const { NIM } = useSelector((state) => state.userSlice.value);
  console.log(NIM);
  const navigate = useNavigate();
  const inputNIM = useRef("");
  const inputPassword = useRef("");
  const dispatch = useDispatch();


  const onLogin = async (data) => {
    data.preventDefault();

    try {
      const user = {
        NIM: inputNIM.current.value,
        password: inputPassword.current.value,
      };

      console.log(user);
      const result = await Axios.post(url, user); // data yg dari back end kesimpen di result.data
      dispatch(
        login({
          NIM: result.data.isUserExist.NIM,
        })
      );

      localStorage.setItem("token", result.data.token);
      navigate("/");
    } catch (err) {
      console.log(err);
      alert(err.response.data);
    }
  };


  return (
    <Container bg="#38A169" w="300px" h="350px" mt={20}>
      <Heading mb={10}>Login</Heading>
      <form onSubmit={onLogin}>
      <FormControl>
        <FormLabel>NIM</FormLabel>
        <Input type="number" placeholder="NIM" ref={inputNIM} />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input type="password" placeholder="password" ref={inputPassword} />
      </FormControl>
      <Button mt={10} w="100%" onClick={onLogin} colorScheme="orange">
        Login
      </Button>
      </form>
    </Container>
  );
};


