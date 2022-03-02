import React from "react";
import { GlobalContext } from "../../provider/GlobalProvider";
import { ethers } from 'ethers';
import {Box, Text} from 'rebass';
import {AdBlock, PromotionWrapper} from './styled';
import { Form } from "../Forms/TrackerForm";
import { Card } from "../Card";


export class Tracker extends React.Component {

    static contextType = GlobalContext;

    constructor(props) {
        super(props);
        this.state = {
            address: "",
            wallet: "",
            errorWallet: false,
            errorToken: false,
            errorForm: false,
            response: {}
        }
    }

    componentDidMount(){
        if(this.props.history.location.state){
            if(this.props.history.location.state.error === "dividendTracker"){
                this.setState({
                    address: this.props.history.location.state.address,
                    wallet: this.props.history.location.state.wallet,
                    response: {status: false, type: "dividendTracker", message: "Please check your wallet address"},
                })
                this.props.history.replace();
            }
        }
    }

    handleAddress = async (e) => {
        this.setState({errorToken: false, address: e});
    }

    handleWallet = async (e) => {
        this.setState({errorWallet: false, wallet: e})
    }

    checkAddress = async (address) => {
        try{
            ethers.utils.isAddress(address.trim())
            return true
        }catch(err){
            console.log(err);
            return false
        }
    }

    checkForm = async() => {
        if(this.state.wallet === "" && this.state.address === ""){
            this.setState({response: {status: false, message: "Please enter value for all the inputs"}, errorWallet: true, errorToken: true});
        }else if(await this.checkAddress(this.state.wallet) === false || this.state.wallet === ''){
            this.setState({response: {status:false}, errorWallet: true})
        }else if(await this.checkAddress(this.state.address) === false || this.state.address === ''){
            this.setState({response: {status:false},  errorToken: true})
        }else{
            this.setState({response: {status:true, message: "ok"}});
        }
        return;
    }

    results = async (e) => {
        e.preventDefault();
        await this.checkForm();
        if(this.state.response.status === true){
            this.props.history.push(`/results?token=${this.state.address}&wallet=${this.state.wallet}`);
            this.setState({address: "", wallet: "", errorWallet: false, errorToken: false, response: {}});
        }
    }

    render(){        
        return(
            <Box width={'100%'} mt={[3, 4]} mb={[2, 4]}>
                <AdBlock><span>Make sure to disable your ad blocker in order to use our tracker</span></AdBlock>
                <PromotionWrapper onClick={() => window.location = 'https://token.dividendtracer.com'}>
                    <Text fontSize={"20px"} fontFamily={"DM Sans"} color={"white"}>$DVT reward token is coming <small style={{fontSize: '14px'}}><u>Learn more</u></small></Text>
                </PromotionWrapper>
                <Card mt={3}>
                    <Form action={this.results} handleAddress={this.handleAddress} handleWallet={this.handleWallet} response={this.state.response} errorWallet={this.state.errorWallet} errorToken={this.state.errorToken} />
                </Card>
            </Box>
        )
    }
}