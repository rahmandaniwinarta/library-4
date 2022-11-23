// import { useSelector } from "react-redux";
import Axios from "axios";
import {
  Card,
  CardBody,
  Image,
  Stack,
  Text,
  Heading,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
  Box,
  Flex,
  Center,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const url = "http://localhost:2000/book/getAll";

export const HomePage = () => {
  // const { NIM } = useSelector((state) => state.userSlice.value);
  const [show, setShow] = useState([]);

  const getAll = async () => {
    try {
      const result = await Axios.get(url);
      console.log(result.data);
      setShow(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <Center>
      <Flex w="full" flexWrap="wrap" justifyContent="center">
        {show.map((item) => {
          return (
            <Box p={5}>
              <Card maxW="sm" m="2">
                <CardBody>
                  <Image
                    src={item.cover}
                    // alt="Green double couch with wooden legs"
                    borderRadius="lg"
                    boxSize="500px"
                    objectFit="cover"
                  />
                  <Stack mt="6" spacing="3">
                    <Heading size="sm">
                      {item.title.substring(0, 40)}
                      {item.title.length >= 40 ? "..." : null}
                    </Heading>
                    <Text>
                      {item.synopsis.substring(0, 150)}
                      {item.synopsis.length >= 150 ? "..." : null}
                    </Text>
                  </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                  <ButtonGroup spacing="2">
                    <Button variant="solid" colorScheme="blue">
                      Borrow
                    </Button>
                  </ButtonGroup>
                </CardFooter>
              </Card>
            </Box>
          );
        })}
      </Flex>
    </Center>
  );
};
