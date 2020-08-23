import React from "react";
import { PseudoBox, Text } from "@chakra-ui/core";

export interface IReactionIcon {
  reaction: string;
  roomID: string;
  activeReaction: string;
  setActiveReaction: any;
  sendStudentReaction: any;
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

const ReactionIcon: React.FC<IReactionIcon> = ({
  reaction,
  activeReaction,
  setActiveReaction,
  roomID,
  sendStudentReaction,
  Icon,
}) => {
  return (
    <PseudoBox
      opacity={activeReaction === reaction ? 1 : 0.6}
      transition="0.4s"
      display="flex"
      flexDirection="column"
      alignItems="center"
      _active={{ transform: "scale(0.9)" }}
      _hover={{ opacity: 1, transform: "scale(1.1)" }}
      onClick={() => {
        setActiveReaction(reaction);
        sendStudentReaction(reaction, roomID);
      }}
    >
      <Icon style={{ width: "100px", height: "100px" }} />
      <Text my={10} fontSize="xl" textAlign="center" fontWeight="bold">
        {reaction.charAt(0).toUpperCase() + reaction.slice(1)}
      </Text>
    </PseudoBox>
  );
};

export default ReactionIcon;
