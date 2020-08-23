import React from "react";
import { Box, Heading, Flex } from "@chakra-ui/core";
import { ReactComponent as Logo } from "../images/logo.svg";

const Layout: React.FC<React.ReactNode> = ({ children }) => {
  return (
    <Box px={10} maxW="5xl" m="auto">
      <Flex my={10}>
        <Logo style={{ height: "60px", width: "auto" }} />
      </Flex>
      {children}
    </Box>
  );
};

export default Layout;
