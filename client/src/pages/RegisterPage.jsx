import { useState } from "react";
import {
  Input,
  FormLabel,
  Button,
  Center,
  Box,
  Container,
  Heading,
  Flex,
  Text,
} from "@chakra-ui/react";
import swal from "sweetalert2";
import { Formik, ErrorMessage, Field, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// setup redux
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";
const url = "http://localhost:2000/lib/register";

export const RegisterPage = () => {
  // const [messageErr, setMessageErr] = useState("");

  const RegisterSchema = Yup.object().shape({
    NIM: Yup.number().required().min(6, "NIM must be more than 6 character"),
    username: Yup.string().required().min(6, "Username  min 6 Character"),
    email: Yup.string().email("Invalid email address format").required(),
    password: Yup.string().required().min(6, "Password min 6 Character"),
  });

  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const onRegister = async (values) => {
    // values.preventDefault();
    try {
      if (values.password !== values.confirmPassword) {
        alert("password gasama");
      }
      const { data } = await axios.post(url, values); // const result = await axios.post (url,values)
      navigate("/");

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box>
      <Center>
        <Formik
          initialValues={{
            NIM: undefined,
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={RegisterSchema}
          onSubmit={(values, action) => {
            onRegister(values);
          }}
        >
          {(props) => {
            console.log(props);
            return (
              <Form>
                <Flex
                  bg="#38A169"
                  justifyContent="space-around"
                  alignItems={"center"}
                  fontWeight="bold"
                >
                  <Container mt={20}>
                    <Heading mb={6}>Register</Heading>
                    <Text textAlign="center" mb="30px" fontSize="xl">
                      Already have an account? Sign in here
                    </Text>
                    <FormLabel>NIM</FormLabel>
                    <Input
                      type="number"
                      as={Field}
                      name="NIM"
                      placeholder="NIM"
                    />
                    <ErrorMessage
                      style={{ color: "red" }}
                      component="div"
                      name="NIM"
                    />
                    <FormLabel mt="20px">Username</FormLabel>
                    <Input as={Field} name="username" placeholder="Username" />
                    <ErrorMessage
                      style={{ color: "red" }}
                      component="div"
                      name="username"
                    />
                    <FormLabel mt="20px">Email</FormLabel>
                    <Input
                      type="text"
                      as={Field}
                      name="email"
                      placeholder="Email"
                    />
                    <ErrorMessage
                      style={{ color: "red" }}
                      component="div"
                      name="email"
                    />
                    <FormLabel mt="20px">Password</FormLabel>
                    <Input
                      type="password"
                      as={Field}
                      name="password"
                      placeholder="Password"
                    />
                    <ErrorMessage
                      style={{ color: "red" }}
                      component="div"
                      name="password"
                    />
                    <FormLabel mt="20px">Confirm Password</FormLabel>
                    <Input
                      type="password"
                      as={Field}
                      name="confirmPassword"
                      placeholder="Confirm Password"
                    />
                    <Button
                      w="100%"
                      mt="20px"
                      colorScheme="orange"
                      type="submit"
                      mb="20px"
                    >
                      Submit
                    </Button>
                  </Container>
                </Flex>
              </Form>
            );
          }}
        </Formik>
      </Center>
    </Box>
  );
};
