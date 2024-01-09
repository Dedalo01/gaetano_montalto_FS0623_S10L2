import CommentsList from "./CommentsList";
import AddComment from "./AddComment";
import { useEffect, useState } from "react";
import { STRIVESCHOOL_APIKEY } from "../data/api_keys";

const CommentArea = ({ bookId }) => {
  const [comments, setComments] = useState([]);

  const getComments = () => {
    fetch("https://striveschool-api.herokuapp.com/api/comments/" + bookId, {
      headers: {
        Authorization: "Bearer " + STRIVESCHOOL_APIKEY,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("errore nel recupero dei commenti");
        }
      })
      .then((arrayOfComments) => {
        console.log(arrayOfComments);
        setComments(arrayOfComments);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  useEffect(() => {
    getComments();
  }, [bookId]);

  const aggiornaCommenti = () => {
    getComments();
  };

  return (
    <div>
      <div>
        <CommentsList reviews={comments} />
      </div>
      <div>
        <AddComment bookId={bookId} aggiornaCommenti={aggiornaCommenti} />
      </div>
    </div>
  );
};

export default CommentArea;
