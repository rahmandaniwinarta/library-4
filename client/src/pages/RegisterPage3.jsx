import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  Container,
  Flex,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";

const url = "http://localhost:2000/lib/register";

export const RegisterPage = () => {
  const navigate = useNavigate();

  const RegisterSchema = Yup.object().shape({
    NIM: Yup.number().required().min(6, "NIM must be more than 6 character"),
    username: Yup.string().required().min(6, "Username  min 6 Character"),
    email: Yup.string().email("Invalid email address format").required(),
    password: Yup.string().required().min(6, "Password min 6 Character"),
  });

  const onRegister = async (values) => {
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
    <Container maxW="container.xl" p={0} bg="gray">
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
          // console.log(values);
        }}
      >
        {(props) => {
          console.log(props);
          return (
            <Form>
              <Flex h="100vh" py={20}>
                <VStack
                  w="full"
                  h="full"
                  p={2}
                  spacing={10}
                  alignItems="flex-start"
                  bg="salmon"
                >
                  <VStack spacing={1} alignItems="flex-start">
                    <Heading size="xl">Register your account</Heading>
                    <Text>Please fill the form below</Text>
                  </VStack>
                  <SimpleGrid w="full" rowGap={1}>
                    <GridItem>
                      <FormControl>
                        <FormLabel>NIM</FormLabel>
                        <Input
                          placeholder="input NIM here"
                          type="number"
                          as={Field}
                          name="NIM"
                        />
                        <ErrorMessage
                          name="NIM"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl>
                        <FormLabel>Username</FormLabel>
                        <Input
                          placeholder="input username here"
                          type="text"
                          as={Field}
                          name="username"
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input
                          placeholder="input email here"
                          type="email"
                          as={Field}
                          name="email"
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl>
                        <FormLabel>Password</FormLabel>
                        <Input
                          placeholder="input password here"
                          type="password"
                          as={Field}
                          name="password"
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl>
                        <FormLabel>Confirm Password</FormLabel>
                        <Input
                          placeholder="make sure the password match"
                          type="password"
                          as={Field}
                          name="confirmPassword"
                        />
                      </FormControl>
                    </GridItem>
                  </SimpleGrid>
                  <Button type="submit" colorScheme="teal" size="lg">
                    Register
                  </Button>
                </VStack>
                <VStack
                  w="full"
                  h="full"
                  p={10}
                  spacing={10}
                  alignItems="flex-start"
                  bg="gray.50"
                ></VStack>
              </Flex>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
};
