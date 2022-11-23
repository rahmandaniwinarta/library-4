import {
  Avatar,
  Box,
  Flex,
  Heading,
  Icon,
  Text,
  useMediaQuery,

} from "@chakra-ui/react";
import React from "react";
import portfolio from "../../img/portfolio.png";
import { BsGithub, BsLinkedin } from "react-icons/bs";
// import { GiCondorEmblem } from "react-icons/gi";
import { Link } from "react-router-dom";






const Footer = () => {
  const [isLargerThan] = useMediaQuery("(min-width: 768px)");
  const [isSmallerThan] = useMediaQuery("(min-width: 468px)");


  
  return (
   
    <div className="Footer">
      <Box
        bg='#38A169'
        color="black"
        height={isSmallerThan ? "60vh" : "60vh"}
        pt="3rem"
        lineHeight="2rem"
      >
        <Flex
          justify={"space-evenly"}
          width={["100%", "100%", "100%", "100%"]}
          textAlign={isSmallerThan ? "left" : "center"}
          fontSize={["sm", "md", "md", "md"]}
          flexDirection={isSmallerThan ? "row" : "column"}
        >
          <Box as={Flex} flexDirection="column">
            <Heading>Legal</Heading>
            <Link href={'#'}>Cookies Policy</Link>
            <Link href={'#'}>Privacy Policy</Link>
            <Link href={'#'}>Terms of Service</Link>
            <Link href={'#'}>Law Enforcement</Link>
          </Box>

          {isSmallerThan ? (
            <Box>
              <Heading>Support</Heading>
              <Text>Help</Text>
              <Text>Customer Service</Text>
              <Text>Shipping</Text>
              <Text>Order Tracker</Text>
              <Text>Returns & Exchanges</Text>
            </Box>
          ) : null}

          {isLargerThan ? (
            <Box>
              <Heading>Company Info</Heading>
              <Text>About Us</Text>
              <Text>Entity Details</Text>
              <Text>Careers</Text>
              <Text>Company Apps</Text>
            </Box>
          ) : null}
          <Box mt="1rem" display={"flex"} gap="1rem" justifyContent={"center"}>
            <a
              href="https://www.linkedin.com/in/erik-lewis-979a9976/"
              target={"_blank"}
              rel="noreferrer"
            >
              <Icon w={9} h={9} my="1rem" as={BsLinkedin} />
            </a>
            <a
              href="https://github.com/ErikLewis95"
              target={"_blank"}
              rel="noreferrer"
            >
              <Icon w={9} h={9} my="1rem" as={BsGithub} />
            </a>
            <a
              href="https://eriklewis95.github.io/My-CV/"
              target={"_blank"}
              rel="noreferrer"
            >
              <Avatar w={10} h={10} my="1rem" bg="white" src={portfolio} />
            </a>
         
  
          </Box>
        </Flex>
      </Box>
    </div>
  );
};

export default Footer;
