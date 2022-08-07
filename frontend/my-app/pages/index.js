import Head from 'next/head'
import Image from 'next/image'
import { useRef, useState,useEffect } from 'react'
import styles from '../styles/Home.module.css'
import Web3Modal, { providers } from "web3modal"
import {Contract, ContractFactory, ethers, utils ,BigNumber} from "ethers"
import { TOKEN_CONTRACT_ADDRESS,
         TOKEN_CONTRACT_ABI,
         NFT_TOKEN_ADDRESS,
         NFT_TOKEN_ABI
} from '../constants'


export default function Home() {
  const[walletConnected,setWalletConnected] = useState(false);
  const[totalTokensMinted,setTotalTokensMinted]= useState(0);
  const[tokenAmount,setTokenAmount] = useState(0);
  const[balanceOfToken ,setBalanceOfToken] =useState(0);
  const[loading,setLoading] = useState(true);
  const web3ModalRef=useRef();

  const getProviderOrSigner = async(needSigner=false)=>{
    //getting the providerwallet

    const provider = await web3ModalRef.current.connect();
    //selecting the provider
    const web3Provider = new ethers.providers.Web3Provider(provider);

     const {chainId} = await web3Provider.getNetwork();
     console.log(chainId);
     if(chainId!=4){
      window.alert("Change the network to rinkeby");

     }
     console.log(chainId);
     const signer  = web3Provider.getSigner();
     if(needSigner==true){
      return signer;
     }
     return web3Provider;
  }

// ye wala function poora karna hai muje
  //this is the getNoOfToken minted for getting the total number of tokens that have been minted

  const getTotalNumberOfTokensMinted = async()=>{
    const provider = await getProviderOrSigner();
    const tokenContract = new Contract(TOKEN_CONTRACT_ADDRESS,TOKEN_CONTRACT_ABI,provider);
    const _totalTokensMinted = await tokenContract.totalSupply();
    setTotalTokensMinted(_totalTokensMinted);
  }

  


  //gives the balance of tokens held by a particular account
  const getNoofTokensMinted = async()=>{
    try
    {
    const provider = getProviderOrSigner();
    const tokenContract = new Contract(TOKEN_CONTRACT_ADDRESS,TOKEN_CONTRACT_ABI,provider);
    const signer =await  getProviderOrSigner(true);
    const address = await signer.getAddress();
    const balance = await tokenContract.balanceOf(address);
    setBalanceOfToken(balance);
    }catch(err){
      console.log(err);
      setBalanceOfToken(0);
    }
  }


  const mintToken = async(amount)=>{
    try {
      const signer = await getProviderOrSigner(true);
      const tokenContract = new Contract(TOKEN_CONTRACT_ADDRESS,TOKEN_CONTRACT_ABI,signer);
      const value = 0.001 * amount;
      // console.log(JSON.toString({tokenContract}));

      const tx = await tokenContract.publicMint(amount,{
        value:utils.parseEther(value.toString())
      });
      setLoading(true);
      await tx.wait();
      setLoading(false);
      window.alert("The token has been succesfully minted");
      await getNoofTokensMinted();
      // await getTotalNoOfTokensMinted();
    }catch (error) {
      console.log(error)
    }
  }

  const connectWallet =async()=>{
    console.log("message")
    try{
      await getProviderOrSigner();
      setWalletConnected(true);
    }catch(err){
      console.log(err);
    }
  }

  const renderButton = ()=>{
    if(loading){
      return(
      <div>
        <button className={styles.button}>Loading.....</button>
      </div>)
    }
    return(
      <div  style={{display:"flex-col"}}>
        <div>
        <input className={styles.input} type="number" placeholder="Amount of Tokens" onChange={(e)=>{
          setTokenAmount(BigNumber.from(e.target.value));
        }}/>

        <button
        className={styles.button}
        disabled={!(tokenAmount>0)}
        onClick={()=>{
          mintToken(tokenAmount)
        }}>
          Mint Token
        </button>
        </div>
      </div>
    )
  }


  useEffect(() => {
    if(!walletConnected){
      web3ModalRef.current = new Web3Modal({
        network:"rinkeby",
        providerOptions:{},
        disableInjectedProvider:false
      })
      connectWallet();
    }
    
  }, []);


  return (
    <div>
      <Head>
        <title>Nishchayas ICO</title>
        <meta name="description" content="ICO Dapp"/>
      </Head>
      <div className={styles.main}>
        <div>
          <h1 className={styles.title}>Nishchaya's ICO</h1>
          <div className={styles.description}>
            A Platform for you to mint and claim tokens in exchnage of my NFT collection
          </div>
          {walletConnected ? (
            <div>
              <div className={styles.description}>
                {utils.formatEther(totalTokensMinted)} tokens have been minted worldwide
              </div>
              <div>
              {renderButton()}
              </div>
             </div> 
          ):(
                <button className={styles.button} onClick={connectWallet}>
                  Connect your Wallet
                </button>
          )}
        </div>
      </div>
    </div>
  )
}
