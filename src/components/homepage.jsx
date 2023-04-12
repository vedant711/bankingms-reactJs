import React, { useContext, useState, useEffect } from 'react';
import AuthContext from "../context/AuthContext";
import axios from 'axios';
import Loader from './loader';


const Home = () => {
    const { user,logoutUser} = useContext(AuthContext);
    // console.log(user)
    const [showCredit,setShowCredit] = useState(false)
    const [showDebit,setShowDebit] = useState(false)
    const [showBalance,setShowBalance] = useState(false)
    const [showTransactions,setShowTransactions] = useState(false)
    const [response,setResponse] = useState('')
    const [transactions,setTransactions] = useState([])
    const [balance,setBalance] = useState([])
    const [isLoading, setLoading] = useState(true)

    const handleSubmitCredit = async (e) => {
        e.preventDefault();
        const amount = e.target.amountcredit.value;
        const pin = e.target.pincredit.value;
        await axios.post(`https://bankingms.onrender.com/credit/${user.userid}`,{'amount':amount,'pin':pin}).then(res=>{
            setShowCredit(false)
            setResponse(res.data.message)
            setTimeout(()=>{
                setResponse('')
            },5000)
        }).catch(err=>console.log(err))

    }

    const handleSubmitDebit = async(e) => {
        e.preventDefault();
        const amount = e.target.amountdebit.value;
        const pin = e.target.pindebit.value;
        await axios.post(`https://bankingms.onrender.com/debit/${user.userid}`,{'amount':amount,'pin':pin}).then(res=>{
            setShowDebit(false)
            setResponse(res.data.message)
            setTimeout(()=>{
                setResponse('')
                // console.log(response)
            },5000)
        })

    }

    const callBalance = () => {
        setLoading(true)
        axios.get(`https://bankingms.onrender.com/balance/${user.userid}`).then(res=>{
               setBalance(res.data.balance);
               setShowBalance(!showBalance);
               setLoading(false)
             })
    }

    const callTransactions = () => {
        setLoading(true)

            axios.get(`https://bankingms.onrender.com/dashboard/${user.userid}`).then(res=>{
               setTransactions(res.data.transactions);
               setShowTransactions(!showTransactions);
        setLoading(false)

             })
    }
    
    
    return (
        <>
        <div class="header">
        <p onClick={()=>{setShowCredit(!showCredit);setShowDebit(false);setShowBalance(false);setShowTransactions(false);}}>Credit Amount</p>
        <p onClick={()=>{setShowDebit(!showDebit);setShowBalance(false);setShowTransactions(false);setShowCredit(false);}}>Debit Amount</p>
        <p onClick={()=>{setShowBalance(!showBalance);setShowTransactions(false);setShowCredit(false);setShowDebit(false);callBalance();}}>Balance Inquiry</p>
        <p onClick={()=>{setShowCredit(false);setShowDebit(false);setShowBalance(false);callTransactions();}}>Transaction Logs</p>
        
        <p onClick={logoutUser}>Logout</p>
        
    </div>
        <div className='container'>
        <h1>{user.username}</h1>
        {response!==''?<p>{response}</p>:null}
        {isLoading?<Loader/>:showBalance?<p>Your Total Balance is {balance.$numberDecimal}</p>:null}

        {showCredit?<form onSubmit={handleSubmitCredit} style={{width:'100%'}}>
            <input type="text" name="amountcredit" id="amountcredit" placeholder='Enter Credit Amount'/><br />
            <input type="text" name="pincredit" id="pincredit" placeholder='Enter PIN'/><br />
            <button type="submit" >Submit</button><br />
        </form>:null}
        {showDebit?<form  onSubmit={handleSubmitDebit} style={{width:'100%'}}>
            <input type="text" name="amountdebit" id="amountdebit" placeholder='Enter Debit Amount'/><br />
            <input type="text" name="pindebit" id="pindebit" placeholder='Enter PIN'/><br />
            <input type="submit" value="Submit" /><br />
        </form>:null}
        {/* {console.log(transactions)} */}
        {isLoading? <Loader/> :showTransactions && transactions ?
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