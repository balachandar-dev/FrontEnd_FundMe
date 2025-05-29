import { ethers } from "./ethers-5.6.esm.min"

async function connect() {
    if (typeof window.ethereum !== "undefined") {
        await window.ethereum.request({ method: "eth_requestAccounts" })
        document.getElementById("connectButton").innerHTML = "Connected"
    } else {
        document.getElementById("connectButton").innerHTML = "Metamask unavailable"
    }
}

async function fund(ethAmount) {
    if (typeof window.ethereum !== "undefined") {
        // provider / connection to blokchain
        //signer/wallet
        //contract - ABI and address
    }
}
