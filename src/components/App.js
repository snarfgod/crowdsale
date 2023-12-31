import {Container} from 'react-bootstrap';
import {ethers} from 'ethers';
import {useEffect, useState} from 'react';

//Components
import Navigation from './Navigation';
import Info from './Info';
import Loading from './Loading';
import Buy from './Buy';
import Progress from './Progress';
import Time from './Time';

//ABIs
import TOKEN_ABI from '../abis/Token.json';
import CROWDSALE_ABI from '../abis/Crowdsale.json';

//config
import config from '../config.json';

function App() {

    const [account, setAccount] = useState(null)
    const [accountBalance, setAccountBalance] = useState(null)
    const [provider, setProvider] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [crowdsale, setCrowdsale] = useState(null)
    const [token, setToken] = useState(null)

    const [price, setPrice] = useState(null)
    const [maxTokens, setMaxTokens] = useState(null)
    const [tokensSold, setTokensSold] = useState(null)
    const [startTime, setStartTime] = useState(0)
    const [endTime, setEndTime] = useState(0)
    const [startTimeDate, setStartTimeDate] = useState(null)
    const [endTimeDate, setEndTimeDate] = useState(null)

    const loadBlockchainData = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        setProvider(provider)

        const token = new ethers.Contract(config[31337].token.address, TOKEN_ABI, provider)
        const crowdsale = new ethers.Contract(config[31337].crowdsale.address, CROWDSALE_ABI, provider)
        setToken(token)
        setCrowdsale(crowdsale)

        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        const account = ethers.utils.getAddress(accounts[0])

        const accountBalance = ethers.utils.formatUnits(await token.balanceOf(account), 18)
        setAccountBalance(accountBalance)

        const price = ethers.utils.formatUnits(await crowdsale.price(), 18)
        setPrice(price)
        const maxTokens = ethers.utils.formatUnits(await crowdsale.maxTokens(), 18)
        setMaxTokens(maxTokens)
        const tokensSold = ethers.utils.formatUnits(await crowdsale.tokensSold(), 18)
        setTokensSold(tokensSold)
        setAccount(account)      

        const startTime = await crowdsale.startTime()
        setStartTime(startTime)
        const endTime = await crowdsale.endTime()
        setEndTime(endTime)
        
        const startTimeDate = new Date(startTime * 1000); // Multiply by 1000 to convert from seconds to milliseconds
        const endTimeDate = new Date(endTime * 1000);

    // Set the state variables
        setStartTimeDate(startTimeDate.toUTCString());
        setEndTimeDate(endTimeDate.toUTCString());
        setIsLoading(false)  
    }

    useEffect(() => {
        if(isLoading) {
            loadBlockchainData()
        }
    }, [isLoading]);

    return(
        <Container>
            <Navigation />

            <h1>
                <p className='text-center my-5'>
                <strong>Introducing Snarfcoin!</strong>
                </p>
            </h1>

            
            {isLoading ? (
                <Loading />
            ):(
                <>
                <p className='text-center'>
                    <strong>Price= </strong>{price} ETH
                </p>


                <Buy provider={provider} price={price} crowdsale={crowdsale} setIsLoading={setIsLoading} />

                <Time startTimeDate={startTimeDate} endTimeDate={endTimeDate} startTime={startTime} endTime={endTime}/>

                <p className='text-center my-3'>
                    <Progress tokensSold={tokensSold} maxTokens={maxTokens}/>
                </p>

                <p className='text-center my-3'>
                    {tokensSold} / {maxTokens} Tokens Sold
                </p>
                </>                
            )}

            
            <hr />
            {account && (
                <Info account={account} accountBalance={accountBalance}/>

            )}
            
        </Container>
    )
}

export default App;
