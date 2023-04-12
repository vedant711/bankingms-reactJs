import React, { useContext, useState, useEffect } from 'react';
import AuthContext from "../context/AuthContext";
import axios from 'axios';


const Home = () => {
    const { user,logoutUser} = useContext(AuthContext);
    // console.log(user)
    const [showCredit,setShowCredit] = useState(false)
    const [showDebit,setShowDebit] = useState(false)
    const [showBalance,setShowBalance] = useState(false)
    const [showTransactions,setShowTransactions] = useState(false)

    const [transactions,setTransactions] = useState([])
    const handleSubmitCredit = e => {
        let amount = e.target.amount.value;
        let pin = e.target.pin.value;
        axios.post(`http://127.0.0.1:55355/credit/${user.userid}`,{'amount':amount,'pin':pin}).then(res=>{
            console.log(res)
        })

    }

    const handleSubmitDebit = e => {
        let amount = e.target.amount.value;
        let pin = e.target.pin.value;
        axios.post(`http://127.0.0.1:55355/debit/${user.userid}`,{'amount':amount,'pin':pin}).then(res=>{
            console.log(res)
        })

    }

    useEffect(() => {
      axios.get(`http://127.0.0.1:55355/dashboard/${user.userid}`).then(res=>{
        setTransactions(res.data.transactions)
      })
    }, [])
    
    return (
        <>
        <div class="header">
        <p onClick={()=>{setShowCredit(!showCredit);setShowDebit(false);setShowBalance(false);setShowTransactions(false);}}>Credit Amount</p>
        <p onClick={()=>{setShowDebit(!showDebit);setShowBalance(false);setShowTransactions(false);setShowCredit(false);}}>Debit Amount</p>
        <p onClick={()=>{setShowBalance(!showBalance);setShowTransactions(false);setShowCredit(false);setShowDebit(false)}}>Balance Inquiry</p>
        <p onClick={()=>{setShowTransactions(!showTransactions);setShowCredit(false);setShowDebit(false);setShowBalance(false)}}>Transaction Logs</p>
        
        <p onClick={logoutUser}>Logout</p>
        
    </div>
        <div className='container'>
        <h1>{user.username}</h1>
        {showBalance?<p>Your Total Balance is {user.balance.$numberDecimal}</p>:null}

        {showCredit?<form  onSubmit={handleSubmitCredit} style={{width:'100%'}}>
            <input type="text" name="amount" id="amount" placeholder='Enter Credit Amount'/><br />
            <input type="text" name="pin" id="pin" placeholder='Enter PIN'/><br />
            <input type="submit" value="Submit" /><br />
        </form>:null}
        {showDebit?<form  onSubmit={handleSubmitDebit} style={{width:'100%'}}>
            <input type="text" name="amount" id="amount" placeholder='Enter Debit Amount'/><br />
            <input type="text" name="pin" id="pin" placeholder='Enter PIN'/><br />
            <input type="submit" value="Submit" /><br />
        </form>:null}
        {/* {console.log(transactions)} */}
        {showTransactions && transactions ?
        <table>
            <thead>
            <tr>
                <th>Type</th>
                <th>Amount</th>
                <th>Balance</th>
            </tr>
            </thead>
            <tbody>
            {transactions.map((tran,key)=>
                <tr key={key}>
                    <td>{tran.transaction_type}</td>
                    <td>{tran.amount.$numberDecimal}</td>
                    <td>{tran.balance.$numberDecimal}</td>
                </tr>
            )}
            </tbody>
        </table>
        :null}
        {/* <a href="/new">New</a> */}
        </div>
        </>
    )
}

export default Home