import React from "react";
import { Flex, PseudoBox, Progress } from "@chakra-ui/core";

export interface IStatBar {
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  emotion: "happy" | "confused" | "anxious" | "tired";
  progress: number;
}

const StatBar: React.FC<IStatBar> = ({ Icon, emotion, progress }) => {
  return (
    <Flex my={10} alignItems="center">
      <PseudoBox>
        <Icon style={{ width: "60px", height: "60px" }} />
      </PseudoBox>
      <Progress
        color={emotion}
        value={progress}
        width={"100%"}
        ml={10}
        height="40px"
      ></Progress>
    </Flex>
  );
};

export default StatBar;
