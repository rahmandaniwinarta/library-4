import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../redux/userSlice";

import Axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import background from "../assets/background-login.avif";

const url = "http://localhost:2000/lib/login";

export const LoginPage = () => {
  const { NIM } = useSelector((state) => state.userSlice.value);
  console.log(NIM);
  const navigate = useNavigate();
  const inputNIM = useRef("");
  const inputPassword = useRef("");
  const dispatch = useDispatch();
  // const [NIM, setNIM] = useState("");
  // const [password, setPassword] = useState("");

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

  const onLogout = async () => {
    dispatch(logout());
    localStorage.removeItem("token");
  };

  return (
    <Box
      style={{ backgroundImage: `url(${background})`, backgroundSize: "cover" }}
    >
      <Flex minH={"100vh"} align={"center"} justify={"center"}>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            //   bg="blue"
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <Heading fontSize={"4xl"}>Sign in to your account</Heading>
              <Text fontSize={"lg"} color={"gray.600"}>
                to enjoy all the knowledge 📚
              </Text>
              <form onSubmit={onLogin}>
                <FormControl
                // id="NIM"
                // defaultValue={{ NIM }}
                // onChange={(e) => setNIM(e.target.value)}
                >
                  <FormLabel>NIM</FormLabel>
                  <Input type="number" placeholder="NIM" ref={inputNIM} />
                </FormControl>
                <FormControl
                // id="password"
                // defaultValue={{ password }}
                // onChange={(e) => setPassword(e.target.value)}
                >
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="password"
                    ref={inputPassword}
                  />
                </FormControl>
                <Stack spacing={10}>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"space-between"}
                  ></Stack>
                  <Button
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    type="submit"
                  >
                    Sign in
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Box>
  );
};
