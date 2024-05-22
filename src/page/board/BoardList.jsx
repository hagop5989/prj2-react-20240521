import React, { useEffect, useState } from "react";
import { Box, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function BoardList() {
  const [boardList, setBoardList] = useState([]);
  const navigate = useNavigate();

  // mount 될때 하는일 - 상태가 변경될 때 useEffect 로 갱신
  useEffect(() => {
    axios.get("/api/board/list").then((res) => setBoardList(res.data));
  }, []);
  return (
    <Box>
      <Box>게시물 목록</Box>
      <Box>
        <Table>
          <Thead>
            <Tr bgColor={"gray.200"}>
              <Th>#</Th>
              <Th>TITLE</Th>
              <Th>
                <FontAwesomeIcon icon={faUserPen} />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {boardList.map((board) => (
              <Tr
                _hover={{ bgColor: "gray.200" }}
                cursor={"pointer"}
                onClick={() => navigate(`/board/${board.id}`)}
                key={board.id}
              >
                <Td>{board.id}</Td>
                <Td>{board.title}</Td>
                <Td>{board.writer}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}
