import { useNavigate } from "react-router-dom";
import { Box, Center, Flex, Spacer } from "@chakra-ui/react";
import React, { useContext } from "react";
import { LoginContext } from "./LoginProvider.jsx";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Navbar() {
  const navigate = useNavigate();
  const account = useContext(LoginContext);

  return (
    <Box>
      <Flex
        px={{
          lg: 200,
          base: 0,
        }}
        gap={3}
        height={20}
        bgColor={"gray.100"}
      >
        {/* *4 됨*/}
        <Center
          onClick={() => {
            navigate("/");
          }}
          cursor={"pointer"}
          _hover={{ bgColor: "gray.200" }}
          p={8}
          fontSize={24}
          fontWeight={600}
        >
          HOME
        </Center>
        {account.isLoggedIn() && (
          <Center
            onClick={() => navigate("/write")}
            cursor={"pointer"}
            _hover={{ bgColor: "gray.200" }}
            p={8}
            fontSize={24}
            fontWeight={600}
          >
            글쓰기
          </Center>
        )}
        <Spacer />
        {account.isLoggedIn() && (
          <Center
            onClick={() => navigate(`/member/${account.id}`)}
            cursor={"pointer"}
            _hover={{ bgColor: "gray.200" }}
            p={8}
            fontSize={24}
            fontWeight={600}
          >
            <FontAwesomeIcon icon={faUser} />
            {account.nickName}
          </Center>
        )}
        {account.isLoggedIn() || (
          <Center
            onClick={() => navigate("/signup")}
            cursor={"pointer"}
            _hover={{ bgColor: "gray.200" }}
            p={8}
            fontSize={24}
            fontWeight={600}
          >
            회원가입
          </Center>
        )}
        {account.isAdmin() && (
          <Center
            onClick={() => navigate("/member/list")}
            cursor={"pointer"}
            _hover={{ bgColor: "gray.200" }}
            p={8}
            fontSize={24}
            fontWeight={600}
          >
            회원목록
          </Center>
        )}
        {account.isLoggedIn() || (
          <Center
            onClick={() => navigate("/login")}
            cursor={"pointer"}
            _hover={{ bgColor: "gray.200" }}
            p={8}
            fontSize={24}
            fontWeight={600}
          >
            로그인
          </Center>
        )}
        {account.isLoggedIn() && (
          <Center
            onClick={() => {
              account.logout();
              navigate("/login");
            }}
            cursor={"pointer"}
            _hover={{ bgColor: "gray.200" }}
            p={8}
            fontSize={24}
            fontWeight={600}
          >
            로그아웃
          </Center>
        )}
      </Flex>
    </Box>
  );
}
