import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

export function BoardView() {
  // dynamic segment
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    axios
      .get(`/api/board/${id}`)
      .then((res) => setBoard(res.data))
      .catch((err) => {
        if (err.response.status === 404) {
          toast({
            status: "error",
            description: "해당 게시물이 존재하지 않습니다.",
            position: "top",
          });
          navigate("/");
        }
      });
  }, []);

  function handleClickRemove() {
    axios
      .delete(`/api/board/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        /* 지울 때 토큰 들고가기 */
      })
      .then(() => {
        myToastMethod("success", `${id}번 게시물 정상 삭제되었습니다.`);

        navigate("/");
      })
      .catch(() => {
        toast({
          status: "error",
          description: `${id}번 게시물 삭제 중 오류가 발생하였습니다.`,
          position: "top",
        });
      })
      .finally(() => onClose());

    function myToastMethod(status, description) {
      toast({
        status: status,
        description: description,
        position: "top",
      });
    }
  }

  /* DB의 값이 state 에 넘어오기 전에 랜더링 하여 null 오류 발생하는 경우 해결법*/
  // board 가 null 일떄 return null or return <Spinner /> -> 로딩 느낌나게 함.
  // board state 의 useState({})로 빈 객체 설정
  if (board === null) {
    return <Spinner />;
  }

  return (
    <Box>
      <Box>{board.id}번 게시물</Box>
      <Box>
        <Box>
          <FormControl>
            <FormLabel>제목</FormLabel>
            <Input value={board.title} readOnly={true}></Input>
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>본문</FormLabel>
            <Textarea value={board.content} readOnly />
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>작성자</FormLabel>
            <Input value={board.writer} readOnly />
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>작성일시</FormLabel>
            <Input type={"datetime-local"} value={board.inserted} readOnly />
          </FormControl>
        </Box>
        <Button
          colorScheme={"purple"}
          onClick={() => {
            navigate(`/edit/${board.id}`);
          }}
        >
          수정
        </Button>
        <Button colorScheme={"red"} onClick={onOpen}>
          삭제
        </Button>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>삭제</ModalHeader>
            <ModalBody>
              삭제하시겠습니까?
              <ModalFooter>
                <Button onClick={onClose}>취소</Button>
                <Button colorScheme={"red"} onClick={handleClickRemove}>
                  확인
                </Button>
              </ModalFooter>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </Box>
  );
}
