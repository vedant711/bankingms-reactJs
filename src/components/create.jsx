import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Create =() => {
    const { registerUser } = useContext(AuthContext);
    const handleSubmit = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const password = e.target.password.value;
        const balance = e.target.balance.value;
        const pin = e.target.pin.value;

        name.length > 0 && registerUser(name, password,balance,pin);
      };
    return(
        <form onSubmit={handleSubmit} className="container">
        <h1>Create </h1>
        <hr />
        {/* <label htmlFor="name">Username</label> */}
        <input type="text" id="name" placeholder="Enter Username" />
        {/* <label htmlFor="password">Password</label> */}
        <input type="password" id="password" placeholder="Enter Password" />
        {/* <label htmlFor="balance">Balance</label> */}
        <input type="text" id="balance" placeholder="Enter Opening Balance" />

        {/* <label htmlFor="pin">PIN</label> */}
        <input type="text" id="pin" placeholder="Enter PIN" />


        <button type="submit">Create</button>
        <a href="/">Already Have an Account</a>
      </form>
    );
}

export default Create;