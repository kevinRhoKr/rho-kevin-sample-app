import { useEffect, useState } from "react";
import Request from "./Request";
import classes from "./RequestsList.module.css";

const RequestsList = () => {
  const [requests, setRequests] = useState([]);

  const requestsHandler = () => {
    const url = "http://localhost:3000/contact/requests";
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((data) => {
        setRequests(data);
      })
      .catch((error) => {
        console.log("error");
      });
  };

  useEffect(() => {
    requestsHandler();
  }, []);

  return (
    <>
      <div class="card-group" className={classes.wrapper}>
        {requests.map((request, index) => (
          <Request
            f_name={request.f_name}
            l_name={request.l_name}
            body={request.body}
            email={request.email}
            key={index}
          ></Request>
        ))}
      </div>
    </>
  );
};

export default RequestsList;
