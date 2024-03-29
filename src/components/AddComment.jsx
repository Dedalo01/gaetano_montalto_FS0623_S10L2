import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { STRIVESCHOOL_APIKEY } from "../data/api_keys";

const AddComment = ({ bookId, aggiornaCommenti }) => {
  const [commentObject, setCommentObject] = useState({
    comment: "",
    rate: 1,
    elementId: bookId,
  });

  const sendNewReview = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments",
        {
          method: "POST",
          body: JSON.stringify({ ...commentObject, elementId: bookId }),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + STRIVESCHOOL_APIKEY,
          },
        }
      );
      if (response.ok) {
        // il commento è stato inviato!
        alert("commento salvato!");
        aggiornaCommenti();
      } else {
        throw new Error("errore nel salvataggio del commento");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Form onSubmit={sendNewReview}>
      <Form.Group className="mb-1 mt-4">
        <Form.Label>Commento</Form.Label>
        <Form.Control
          type="text"
          value={commentObject.comment}
          onChange={(e) => {
            setCommentObject({
              ...commentObject,
              comment: e.target.value,
            });
          }}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Rating</Form.Label>
        <Form.Select
          aria-label="comment rating"
          value={commentObject.rate}
          onChange={(e) => {
            setCommentObject({
              ...commentObject,
              rate: e.target.value,
            });
          }}
        >
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Form.Select>
      </Form.Group>
      <Button variant="primary" type="submit">
        Invia
      </Button>
    </Form>
  );
};

export default AddComment;
