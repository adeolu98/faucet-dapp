import './App.css';
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';



class Main extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }




    render() {

        return (

            <div class="card card-props" style = {{backgroundColor: "#333F47"}}>
                <div class="card-body border border-secondary rounded shadow-lg">
                    <h2 class='space-text' style={{ color: "white" }}><bd>  Welcome to the STK Token Faucet </bd></h2> <hr className = 'title-line'></hr>
                    <h4 className="space-text"><p style={{ color: "white" }}>Get tokens by clicking the button below. <br></br> <br></br>You won't get more tokens if you have presently have more than a 1000 </p></h4> <br></br>
                    <h6 className='third-text'><p style={{ color: "white" }}> You have {window.web3.utils.fromWei(this.props.StakeTokenBalance, 'Ether')} tokens, you will get {this.props.TokenToBeReceived} more tokens if you click the button below.</p></h6>
                    <button className="btn button-props shadow-lg border border-secondary" onClick={(event) => {
                        event.preventDefault()
                        this.props.GetTokens()

                        if (this.props.tokenfaucetdata === true) {
                            this.props.tokenFaucet.events.allEvents().on('data', (event) => {
                                window.location.reload()
    
                            }).on('error', console.error)
    
                        } 
                        else{}

                    }} style = {{backgroundColor: '#282c34', color: "white"}}> Get Tokens</button>
                </div>
            </div>

        );

    }
}

export default Main;


