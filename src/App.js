import './App.css';
import { Component } from 'react';
import Main from './Main.js'
import Web3 from 'web3';
import Navbar from './Navbar.js';
import StakeToken from './StakeToken.json';
import TokenFaucet from './TokenFaucet.json'

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
    console.log(window.web3)
  }
  async loadBlockchainData() {
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()

    this.setState({ account: accounts[0] })


    const ethBalance = await web3.eth.getBalance(this.state.account)
    this.setState({ ethBalance: ethBalance })

    const networkID = await web3.eth.net.getId()
    

    //load token data
    const StakeTokenData = StakeToken.networks[networkID]
    if (StakeTokenData) {
      this.setState({staketokendata: true})
      const StakeTokenAddress = StakeToken.networks[networkID].address

      const staketoken = new web3.eth.Contract(StakeToken.abi, StakeTokenAddress)
      this.setState({ staketoken })

      let StakeTokenBalance = await staketoken.methods.balanceOf(this.state.account).call()
 

      this.setState({ StakeTokenBalance: StakeTokenBalance.toString() })

    } else {
      this.setState({staketokendata: false})
      window.alert('token  not on this blockchain network, please switch to ropsten')
    }
    const TokenFaucetData = TokenFaucet.networks[networkID]
    if (TokenFaucetData) {
      this.setState({tokenfaucetdata: true})
      const TokenFaucetAddress = TokenFaucet.networks[networkID].address
      this.setState({ TokenFaucetAddress: TokenFaucetAddress})
      const tokenFaucet = new web3.eth.Contract(TokenFaucet.abi, TokenFaucetAddress)
      this.setState({tokenFaucet: tokenFaucet})
    } else {
      this.setState({tokenfaucetdata: false})
      window.alert('Faucet not live on this blockchain, please switch to ropsten')
    }



    var StakeTokenBalanceFromWei = await web3.utils.fromWei(this.state.StakeTokenBalance, 'Ether')
    let TokenToBeReceived = 1000 - StakeTokenBalanceFromWei;
    this.setState({TokenToBeReceived: TokenToBeReceived})
    if (StakeTokenBalanceFromWei >= 1000){
      TokenToBeReceived = 0
      this.setState({TokenToBeReceived: TokenToBeReceived})
    }


    this.setState({ loading: false })


  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. Install Metamask chrome extension and reload webpage!')
    }
  }

  GetTokens = () => {
    if (this.state.tokenfaucetdata === true){
      this.setState({loading: true})
      this.state.tokenFaucet.methods.CollectTokens().send({from: this.state.account}).on('transactionHash', (hash) => {
        this.setState({loading: false})
      })
    } 
    else{
      window.alert('Token faucet not live on this blockchain. Please switch to ropsten')
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      staketoken: {},
      StakeTokenBalance: '0',
      tokenFaucet: {},
      TokenToBeReceived:'0',
      staketokendata: true,
      tokenfaucetdata: true
    }
  }
 

  render() {
    let content
    if (this.state.loading) {
      content = <p>loading.....</p>
    } else {
      content = <Main
       StakeTokenBalance = {this.state.StakeTokenBalance}
       TokenToBeReceived = {this.state.TokenToBeReceived} 
       GetTokens = {this.GetTokens}
       tokenFaucet = {this.state.tokenFaucet}
       tokenfaucetdata = {this.state.tokenfaucetdata}
      />
    }

    return (
      <div className="App">
        <Navbar account={this.state.account}
                StakeTokenBalance = {this.state.StakeTokenBalance}> </Navbar>
        <header className="App-header">
          <main role='main' className='col-lg-12 d-flex ml-auto mr-auto' style={{ maxWidth: '600px' }}></main>
          <a
            className="App-link"
            target="_blank"
            rel="noopener noreferrer"
          >
          </a>
          {content}
        </header>
      </div>
    );
  
  }
  
  
}
export default App;