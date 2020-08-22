import React from "react";
import { Box, Heading } from "@chakra-ui/core";

const Layout: React.FC<React.ReactNode> = ({ children }) => {
  return (
    <Box px={10} maxW="5xl" m="auto">
      <Heading py={10}>Howly</Heading>
      {children}
    </Box>
  );
};

export default Layout;
