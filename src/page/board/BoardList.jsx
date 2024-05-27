import React, { useEffect, useState } from "react";
import { Box, Button, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

export function BoardList() {
  const [boardList, setBoardList] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  /* key-value 형태*/

  // mount 될때 하는일 - 상태가 변경될 때 useEffect 로 갱신
  useEffect(() => {
    axios.get(`/api/board/list?${searchParams}`).then((res) => {
      setBoardList(res.data.boardList);
      setPageInfo(res.data.pageInfo);
    });
  }, [searchParams]); // [의존성], 의존성부분이 변경되면 useEffect를 트리거함

  const pageNumbers = [];
  for (let i = pageInfo.leftPageNumber; i <= pageInfo.rightPageNumber; i++) {
    pageNumbers.push(i);
  }

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
      <Box>
        {pageNumbers.map((pageNumber) => (
          <Button
            onClick={() => navigate(`/?page=${pageNumber}`)}
            key={pageNumber}
            colorScheme={
              pageNumber === pageInfo.currentPageNumber ? "blue" : "gray"
            }
          >
            {pageNumber}
          </Button>
        ))}
      </Box>
    </Box>
  );
}
