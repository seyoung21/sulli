import React, { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/core";
import { useStudentReactions } from "../providers/TeacherProvider";
import StatBar from "./teacherclassviewstatbar";
import { ReactComponent as HappyFace } from "../images/happy.svg";
import { ReactComponent as ConfusedFace } from "../images/confused.svg";
import { ReactComponent as AnxiousFace } from "../images/anxious.svg";
import { ReactComponent as TiredFace } from "../images/sleepy.svg";

export interface IEmotionCounts {
  happy: number;
  confused: number;
  anxious: number;
  tired: number;
  total: number;
}

const TeacherClassView = () => {
  const studentReactions = useStudentReactions();
  const [emotionCounts, setEmotionCounts] = useState<IEmotionCounts>({
    happy: 0,
    confused: 0,
    anxious: 0,
    tired: 0,
    total: 0,
  });

  useEffect(() => {
    if (studentReactions && studentReactions.length > 0) {
      const happy = studentReactions.filter(
        (value) => value.reaction === "happy"
      ).length;
      const confused = studentReactions.filter(
        (value) => value.reaction === "confused"
      ).length;
      const anxious = studentReactions.filter(
        (value) => value.reaction === "anxious"
      ).length;
      const tired = studentReactions.filter(
        (value) => value.reaction === "tired"
      ).length;
      const total = studentReactions.length;
      setEmotionCounts({
        happy: (happy / total) * 100,
        confused: (confused / total) * 100,
        anxious: (anxious / total) * 100,
        tired: (tired / total) * 100,
        total,
      });
    }
  }, [studentReactions]);

  return (
    <Box>
      <StatBar
        Icon={HappyFace}
        emotion="happy"
        progress={emotionCounts ? emotionCounts.happy : 0}
      />
      <StatBar
        Icon={ConfusedFace}
        emotion="confused"
        progress={emotionCounts ? emotionCounts.confused : 0}
      />
      <StatBar
        Icon={AnxiousFace}
        emotion="anxious"
        progress={emotionCounts ? emotionCounts.anxious : 0}
      />
      <StatBar
        Icon={TiredFace}
        emotion="tired"
        progress={emotionCounts ? emotionCounts.tired : 0}
      />
    </Box>
  );
};

export default TeacherClassView;
