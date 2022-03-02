import React from 'react';
import { GlobalContext } from "../provider/GlobalProvider";
import axios from 'axios';
import * as moment from 'moment';
import { ethers } from 'ethers';
import { CustomLoader } from "../components/Loader/Loader";
import {Flex, Text} from 'rebass';
import { GainsGard } from '../components/Results/styled';
import { ErrorTracker, ErrorWallet } from '../components/Forms/styled';
import { TokenCard } from '../components/Results/styled';
import { useWeb3Wallet } from '../hooks/useWeb3Wallet';
import {useHistory} from 'react-router-dom';
import { Results } from '../components/Results/Results';
import { Container } from './styled';
import { Card } from '../components/Card/';
import { Footer } from '../components/Footer/Footer';

class ResultsPage extends React.Component {
    
    static contextType = GlobalContext;

    constructor(props) {
        super(props);
        this.state = {
            response: {},
            tracker: "",
            customTracker: "",
            address: "",
            wallet: "",
            dividends: [],
            dividendsSave: [],
            todayGain: 0,
            globalGain: 0,
            todayGainDollar: 0,
            globalGainDollar: 0,
            dateGain: 0,
            dateRange: "",
            fetching: false,
            errorWallet: false,    
            errorTracker: false,       
            walletRequired: false,
            tokenName: '',
            tokenSymbol: '',
            currentAccount: ''
        }
    }

    componentDidMount = async () => {
        if(this.state.address !== '' && this.state.wallet !== ''){
            if(this.props.account) this.setState({currentAccount: this.props.account})
            this.showDividend();
        }
    }

    componentWillMount(){
        const windowUrl = window.location.search;
        const params = new URLSearchParams(windowUrl);

        if(params.has('token')){
            this.setState({address: params.get('token')});
        }else{
            this.props.history.push('/');
        }

        if(params.has('wallet')){
            this.setState({wallet: params.get('wallet'), walletRequired: false});
        }else{
            this.setState({wallet: "", walletRequired: true});
        }

        if(params.has('tracker')){
            this.setState({customTracker: params.get('tracker')});
        }
    }

    getData = async() => {
        const latest = await this.context.global.state.web3.eth.getBlockNumber()
        let url = "https://api.bscscan.com/api?module=account&action=txlistinternal&address=" + this.state.wallet + "&startblock=0&endblock=" + latest + "&sort=asc&apikey=JA73AMF9FJTNR1XV6GCITABDQT1XS4KJI7"
        const response = await axios.get(url)
        let data = response.data.result
        let dividends = []
        data.map((transaction) => {
            if (ethers.utils.getAddress(transaction.from) === this.state.tracker) {
                transaction.bnb = true
                dividends.push(transaction)
            }
            return transaction;
        })
        if(dividends.length === 0){
            let url = "https://api.bscscan.com/api?module=account&action=tokentx&address="+this.state.wallet+"&startblock=0&endblock="+latest+"&sort=asc&apikey=JA73AMF9FJTNR1XV6GCITABDQT1XS4KJI7"
            const response = await axios.get(url)
            const bepTokensData = response.data.result
            bepTokensData.map((bepData) => {
                if (ethers.utils.getAddress(bepData.from) === this.state.tracker) {
                    dividends.push(bepData)
                }
                return bepData;
            })

        }

        return dividends
    }

    checkSum = async () => {
        let wallet = ethers.utils.getAddress(this.state.wallet.trim())
        let address = ethers.utils.getAddress(this.state.address.trim())
        this.setState({wallet: wallet, address: address})
    }

    showDividend = async () => {
        try{
            await this.checkSum();
            this.setState({fetching: false})
            let contractAbi = await this.context.global.actions.getBddContractABI(this.state.address)
            let tracker = await this.context.global.actions.getTracker(this.state.address, contractAbi);
            if(this.state.customTracker !== "" && tracker === false){
                tracker = this.state.customTracker
            }else if(this.state.customTracker !== "" && tracker !== false){
                this.setState({customTracker: tracker})
            }else if(tracker === false){
                throw 'dividendTracker'
            }

            this.setState({tracker: tracker})

            let calculatedData = await this.calculate();
            this.setState({walletRequired: false, tokenRequired: false, dividends: calculatedData.dividends, dividendsSave: calculatedData.dividends, globalGain: calculatedData.globalGain, todayGain: calculatedData.todayGain, globalGainDollar: calculatedData.globalGainDollar, todayGainDollar: calculatedData.todayGainDollar, fetching: true, response: {}})
            this.context.global.actions.pushContractABI(contractAbi, this.state.address)
        }catch(err){
            if(err === "dividendTracker"){
                this.setState({tracker: "", response: {status: false, type: "dividendTracker", message: "Dividend tracker address not found for this contract, please enter manually the dividend Tracker address"}})
            }else{
                console.log(err);
            }
        }

    }

    calculate = async() => {
        let data = await this.getData();
        let dividends = []
        let bnbPrice = await this.context.global.actions.getBnbPrice()
        bnbPrice = bnbPrice.ethusd
        let todayGain = 0
        let globalGain = 0
        await Promise.all(data.map(async(transaction) => {
            if (ethers.utils.getAddress(transaction.from) === this.state.tracker) {
                let tokenAddress = transaction.contractAddress
                let tokenParsedValue = transaction.value
                let dollarValue = null
                let tokenValue = null
                if(transaction.hasOwnProperty('bnb')){
                    tokenValue = await this.context.global.actions.readableValue(transaction.value, 18)
                    dollarValue = tokenValue * bnbPrice
                }else{
                    let tokenDecimals = await this.context.global.actions.getTokenDecimals(tokenAddress)
                    tokenValue = await this.context.global.actions.readableValue(transaction.value, tokenDecimals)
                    let tokenValueInBnb = await this.context.global.actions.getTokenValueForAmount(tokenParsedValue, tokenAddress, tokenDecimals)
                    dollarValue = parseFloat(tokenValueInBnb)
                    dollarValue = dollarValue * bnbPrice
                }

                let object = {
                    timestamp: transaction.timeStamp,
                    rawDollarValue: dollarValue.toFixed(4),
                    dollarValue: dollarValue.toFixed(4) + " $",
                    rawTokenValue: tokenValue,
                    bnbValue: tokenValue + " " + (transaction.tokenSymbol ? transaction.tokenSymbol : "BNB")
                }
                globalGain += dollarValue

                let isCurrentDate = moment.unix(transaction.timeStamp).isSame(moment(), 'day')
                if (isCurrentDate) {
                    todayGain += dollarValue
                }
                dividends.push(object)
            }
        }))

        const globalGainDollar = globalGain.toFixed(2) + " $"
        const todayGainDollar = todayGain.toFixed(2) + " $"
        globalGain = globalGain.toFixed(2)
        todayGain = todayGain.toFixed(2)

        dividends.sort(function (x, y) {
            return y.timestamp - x.timestamp;
        })
        return {dividends: dividends, globalGain: globalGain, todayGain: todayGain, globalGainDollar, todayGainDollar}
    }

    setIsModalOpen = () => {
        this.setState({isModalOpen: false})
    }

    handleTracker = async (e) => {
        this.setState({customTracker: e.target.value})
    }

    handleWallet = async (e) => {
        this.setState({wallet:  e, errorWallet: false})
    }

    handleShowDividend = async (e) => {
        if(this.state.wallet === ""){
            this.setState({errorWallet: true})
        }else{
            this.props.history.push('/results?token='+this.state.address+'&wallet='+this.state.wallet);
            this.setState({walletRequired: false})
            this.showDividend();
        }
    }

    handleShowDividendTracker = async (e) => {
        if(this.state.customTracker === ""){
            this.setState({errorTracker: true})
        }else{
            this.props.history.push('/results?token='+this.state.address+'&wallet='+this.state.wallet+'&tracker='+this.state.customTracker);
            this.setState({response: {}});
            this.showDividend();
        }
    }

    getTokenInfo = async() => {
        const name = await this.context.global.actions.getTokenName(this.state.address);
        const symbol = await this.context.global.actions.getTokenSymbol(this.state.address);
        this.setState({tokenName: name, tokenSymbol: symbol})
        return {name: name, symbol: symbol}
    }


    render() {
        return (
            <Container>
                <TokenCard token={this.state.address} />
                {this.state.dividends.length > 0 && <GainsGard transactions={this.state.dividends.length} globalGain={this.state.globalGain} todayGain={this.state.todayGain} />}
                <Card mt={3} mb={4}>
                    {!this.state.walletRequired ?
                        <>
                            {this.state.dividends.length > 0 ?
                                <>
                                    <Results {...this.state} />
                                </>
                            :
                            <>
                                {this.state.response.status !== false &&
                                    <>
                                        {!this.state.fetching ?
                                            <Flex flexDirection="column" width={'100%'} alignItems="center" justifyContent="center">
                                                <CustomLoader />
                                                <Text fontFamily="ABeeZee" mt={2} color="white">Loading your rewards...</Text>
                                            </Flex>
                                            :                                    
                                            <Flex py={5} flexDirection="column" width={'100%'} alignItems="center" justifyContent="center">
                                                <Text color="white" fontSize={[2, 3]} fontFamily="DM Sans" textAlign="center">Oops we can't find any data for this wallet</Text>
                                            </Flex>
                                        }
                                    </>
                                }
                                {this.state.response.type === "dividendTracker" && this.state.response.status === false &&
                                    <ErrorTracker handleTracker={this.handleTracker} action={this.handleShowDividendTracker} errorTracker={this.state.errorTracker} customTracker={this.state.customTracker} />
                                }
                            </>
                            }
                        </>
                        :
                        <>
                            
                            <ErrorWallet handleWallet={this.handleWallet} action={this.handleShowDividend} errorWallet={this.state.errorWallet} />
                        </>
                    }
                </Card>
                <Footer />
            </Container>
        );
    }
}

export const ResultsPageWrapper = () => {

    const history = useHistory();
    const {account} = useWeb3Wallet();

    return (
        <ResultsPage history={history} account={account} />
    )


}