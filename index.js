import { ethers } from "./ethers-5.6.esm.min.js"
import { abi, contractAddress } from "./constants.js"

document.addEventListener("DOMContentLoaded", () => {
    const connectButton = document.getElementById("connectButton")
    const fundButton = document.getElementById("fundButton")
    const balanceButton = document.getElementById("balanceButton")
    const withdrawButton = document.getElementById("withdrawButton")

    connectButton.onclick = connect
    fundButton.onclick = fund
    balanceButton.onclick = getBalance
    withdrawButton.onclick = withdrawFund

    console.log(ethers)
    async function connect() {
        if (typeof window.ethereum !== "undefined") {
            await window.ethereum.request({ method: "eth_requestAccounts" })
            connectButton.innerHTML = "Connected"
        } else {
            connectButton.innerHTML = "Please install Metamask"
        }
    }

    async function fund() {
        const ethAmount = document.getElementById("EthAmount").value
        if (typeof window.ethereum !== "undefined") {
            // provider / connection to blokchain
            //signer/wallet
            //contract - ABI and address
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            console.log(signer)
            console.log(ethers.utils.parseEther(ethAmount))
            const contract = new ethers.Contract(contractAddress, abi, signer)
            try {
                const transactionResponse = await contract.fund({
                    value: ethers.utils.parseEther(ethAmount),
                })
                await listenToTransaction(transactionResponse, provider)
            } catch (error) {
                console.log(error)
            }
        }
    }

    async function listenToTransaction(transactionResponse, provider) {
        return new Promise((resolve, reject) => {
            provider.once(transactionResponse.hash, (transactionReceipt) => {
                console.log("completed")
            })
            resolve()
        })
    }

    async function getBalance() {
        if (typeof window.ethereum != "undefined") {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const balance = await provider.getBalance(contractAddress)
            console.log("balance", ethers.utils.formatEther(balance))
        }
    }

    async function withdrawFund() {
        console.log("Withdrawing...")
        if (typeof window.ethereum !== "undefined") {
            console.log("Withdrawing...")
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            const contract = new ethers.Contract(contractAddress, abi, signer)
            try {
                const transactionResponse = await contract.withdraw()
                await listenToTransaction(transactionResponse, provider)
            } catch (error) {
                console.log(error)
            }
        }
    }
})
