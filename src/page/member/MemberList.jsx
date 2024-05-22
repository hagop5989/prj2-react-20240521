import { useState } from "react";
import { Box, Spinner, Table, Tbody, Td, Th, Tr } from "@chakra-ui/react";
import * as PropTypes from "prop-types";

function Thear(props) {
  return null;
}

Thear.propTypes = { children: PropTypes.node };

export function MemberList() {
  const [memberList, setMemberList] = useState([]);
  if (memberList.length === 0) {
    return <Spinner />;
  }
  return (
    <Box>
      <Box>회원목록</Box>
      <Box>
        <Table>
          <Thear>
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
                  <Td>{member.email}</Td>
                  <Td>{member.nickName}</Td>
                  <Td>{member.inserted}</Td>
                </Tr>
              ))}
            </Tbody>
          </Thear>
        </Table>
      </Box>
    </Box>
  );
}
