import React, {useState} from "react";
import { isCompositeComponent } from "react-dom/test-utils";
import Web3 from 'web3';

const WalletCard = ()=>{
    const [errorMessage, setErrorMessage] = useState(null);
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [userBalance, setUserBalance] = useState(null);
    const [connectButtonText, setButtonText] = useState('Connect Wallet');

    const connectWalletHandler = ()=>{
        if(window.ethereum){
            console.log("Metamask is here")
            window.ethereum.request({method:"eth_requestAccounts"})
            .then(result=>{
                accountChangeHandler(result[0]);
            })
        }else{
            console.log("Metamask not found")
            setErrorMessage("Please Install Metamask")
        }
    }
    const accountChangeHandler = (accountIs)=>{
        console.log("Account Handler is :", accountIs);
        setDefaultAccount(accountIs);
        getUserBalance(accountIs);
    }
    const getUserBalance = (address)=>{
        console.log("address ", address)
        window.ethereum.request({method:"eth_getBalance", params:[address,'latest']})
        .then(balance=>{
            console.log("balance is ", balance)
            console.log("Web3.utils.fromWei(balance ,'eth')", Web3.utils.fromWei(balance ,'ether'))
            setUserBalance(Web3.utils.fromWei(balance ,'ether'));
        })
    }

    window.ethereum.on('accountsChanged', function (accounts) {
        // Time to reload your interface with accounts[0]!
        accountChangeHandler(accounts[0]);
      });

      window.ethereum.on('chainChanged', (chainId) => {
        /* handle the chainId */
        window.ethereum.request({method:"eth_requestAccounts"})
        .then(result=>{
            accountChangeHandler(result[0]);
        })
      });
    return(
        <div className="walletCard">
            <h4> {"Connection To MetaMask using window.etherum methods"}</h4>
            <button onClick={connectWalletHandler}>{connectButtonText}</button>
            <div className="accountDisplay">
                <h3>Address: {defaultAccount}</h3>
            </div>
            <div className="balanceDisplay">
                <h3>Balance: {userBalance}</h3>
            </div>
           {errorMessage}

        </div>
    )

}
export default WalletCard;