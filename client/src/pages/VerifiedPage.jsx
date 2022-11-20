import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  // Link,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Axios from "axios";

// type ForgotPasswordFormInputs = {
//   email: string,
// };

export const VerifiedPage = () => {
  const params = useParams();

  const verifyToken = () => {};

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
          Verification Success!
        </Heading>
        <Text
          fontSize={{ base: "sm", sm: "md" }}
          color={useColorModeValue("gray.800", "gray.400")}
        >
          Click button below to return to Sign In!
        </Text>
        <Stack spacing={6}>
          <Button
            bg={"blue.400"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
            type="submit"
            as={Link}
            to="/login"
          >
            Sign In
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
};
