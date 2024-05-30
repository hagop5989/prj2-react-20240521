import { Box, Button, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export function CommentWrite({ boardId }) {
  const [comment, setComment] = useState("");

  function handleCommentSubmitClick() {
    axios
      .post("/api/comment/add", {
        boardId,
        comment,
      })
      .then(() => {})
      .catch(() => {})
      .finally(() => {});
  }

  return (
    <Box>
      <Textarea
        placeHolder="댓글을 작성해 보세요!"
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />
      <Button onClick={handleCommentSubmitClick} colorScheme={"blue"}>
        <FontAwesomeIcon icon={faPaperPlane} />
      </Button>
    </Box>
  );
}
