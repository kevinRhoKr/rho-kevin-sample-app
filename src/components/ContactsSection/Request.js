import classes from "./Requests.module.css";

const Request = (props) => {
  return <>
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">{props.f_name} {props.l_name}</h5>
            <p class="card-text"><small class="text-muted">{props.email}</small></p>
            <p class="card-text">{props.body}</p>
        </div>
    </div>
  
  </>;
};

export default Request;
