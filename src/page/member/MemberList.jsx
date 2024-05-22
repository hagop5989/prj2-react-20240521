import { useEffect, useState } from "react";
import { Box, Spinner, Table, Tbody, Td, Th, Tr } from "@chakra-ui/react";
import axios from "axios";

export function MemberList() {
  const [memberList, setMemberList] = useState([]);
  useEffect(() => {
    axios.get("/api/member/list").then((res) => {
      setMemberList(res.data);
    });
  }, []);
  /*빈 dependency 가 있어야 1번만 실행됨 */
  if (memberList.length === 0) {
    return <Spinner />;
  }
  return (
    <Box>
      <Box>회원목록</Box>
      <Box>
        <Table>
          <Tr>
            <Th>#</Th>
            <Th>별명</Th>
            <Th>이메일</Th>
            <Th>가입일시</Th>
          </Tr>
          <Tbody>
            {memberList.map((member) => (
              <Tr key={member.id}>
                <Td>{member.id}</Td>
                <Td>{member.nickName}</Td>
                <Td>{member.email}</Td>
                <Td>{member.signupDateAndTime}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}
