import React, { useState } from "react";
import { Flex, Button, Box, PseudoBox, Grid } from "@chakra-ui/core";
import { useSendStudentReaction } from "../providers/SocketProvider";
import { ReactComponent as HappyFace } from "../images/happy.svg";
import { ReactComponent as ConfusedFace } from "../images/confused.svg";
import { ReactComponent as AnxiousFace } from "../images/anxious.svg";
import { ReactComponent as TiredFace } from "../images/sleepy.svg";
import ReactionIcon from "./reactionicon";

export interface IStudentReactions {
  roomID: string;
}

const StudentReactions: React.FC<IStudentReactions> = ({ roomID }) => {
  const sendStudentReaction = useSendStudentReaction();
  const [activeReaction, setActiveReaction] = useState("");
  console.log(activeReaction);
  return (
    <Grid
      alignItems="center"
      justifyContent="center"
      gridTemplateColumns={[
        "auto auto",
        "auto auto",
        "auto auto auto auto",
        "auto auto auto auto",
        "auto auto auto auto",
      ]}
      gridGap={20}
    >
      <ReactionIcon
        reaction="happy"
        activeReaction={activeReaction}
        setActiveReaction={setActiveReaction}
        roomID={roomID}
        sendStudentReaction={sendStudentReaction}
        Icon={HappyFace}
      />
      <ReactionIcon
        reaction="confused"
        activeReaction={activeReaction}
        setActiveReaction={setActiveReaction}
        roomID={roomID}
        sendStudentReaction={sendStudentReaction}
        Icon={ConfusedFace}
      />
      <ReactionIcon
        reaction="anxious"
        activeReaction={activeReaction}
        setActiveReaction={setActiveReaction}
        roomID={roomID}
        sendStudentReaction={sendStudentReaction}
        Icon={AnxiousFace}
      />
      <ReactionIcon
        reaction="tired"
        activeReaction={activeReaction}
        setActiveReaction={setActiveReaction}
        roomID={roomID}
        sendStudentReaction={sendStudentReaction}
        Icon={TiredFace}
      />
    </Grid>
  );
};

export default StudentReactions;
