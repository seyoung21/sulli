import React from "react";
import { PseudoBox } from "@chakra-ui/core";

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
      _active={{ transform: "scale(0.9)" }}
      _hover={{ opacity: 1, transform: "scale(1.1)" }}
      onClick={() => {
        setActiveReaction(reaction);
        sendStudentReaction(reaction, roomID);
      }}
    >
      <Icon style={{ width: "100px", height: "100px" }} />
    </PseudoBox>
  );
};

export default ReactionIcon;
