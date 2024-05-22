import React from "react";
import { Box } from "@chakra-ui/react";
import MyLayout from "./MyLayout";

function MyLayout2() {
  const boardList = [
    {
      id: 1,
      writer: "John Doe",
      content: "Hello World",
      createdAt: "2022-01-01",
    },
    {
      id: 2,
      writer: "Jane Doe",
      content: "React is great!",
      createdAt: "2022-01-02",
    },
    {
      id: 3,
      writer: "aaaa",
      content: "bbbbb!",
      createdAt: "2024-01-02",
    },
  ];

  const objectProps = ["writer", "content", "createdAt"];

  return (
    <Box>
      <MyLayout
        title0="board"
        objectList0={boardList}
        objectProps0={objectProps}
      />
    </Box>
  );
}

export default MyLayout2;
