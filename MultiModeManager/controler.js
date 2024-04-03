const web3 = new Web3(window.ethereum);

var connectedAddress;
const modeNetwork = "0x868b";

async function connectWallet(){
    try{
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        connectedAddress = accounts[0];
        const networkId = await web3.eth.net.getId();
        if (networkId == modeNetwork) {  
            console.log("Mode Connected");
        } else{
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: modeNetwork}], 
              });
       }
       showOrder();
    } catch(error){console.error(error);}
}

connectWallet();

const contractAddress = "0x594DAebee354B140e1959ea6707c4E3B746936Ea";
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "bool",
				"name": "iApprove",
				"type": "bool"
			}
		],
		"name": "approveWithdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "concept",
				"type": "string"
			}
		],
		"name": "createWithdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "deposit",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "newOrder",
		"outputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "completed",
				"type": "bool"
			},
			{
				"internalType": "uint8",
				"name": "votes",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "concept",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "seeWithdrawOrder",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "w",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "x",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "y",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "z",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	}
];

const treasury = new web3.eth.Contract(contractABI, contractAddress);

var i1 = document.getElementById("i1");
var i2 = document.getElementById("i2");
var i3 = document.getElementById("i3");
var b1 = document.getElementById("b1");
var p1 = document.getElementById("p1");
var p2 = document.getElementById("p2");
var p3 = document.getElementById("p3");
var p4 = document.getElementById("p4");
var p5 = document.getElementById("p5");
var b2 = document.getElementById("b2");
var b3 = document.getElementById("b3");

b1.addEventListener("click", async() =>{
    try{
        var i1Eth = web3.utils.toWei(i1.value, 'ether');
        await treasury.methods.createWithdraw(i1Eth, i2.value, i3.value).send({from: connectedAddress, gasPrice: '500000'});
        showOrder();
    } catch(error){console.error(error);}
});

async function showOrder(){
    try{
        var orderData = await treasury.methods.seeWithdrawOrder().call();
        var amountEth = web3.utils.fromWei(orderData[1], 'ether');
        p2.innerText = orderData[0];
        p1.innerText = orderData[3];
        p3.innerText = amountEth + " ETH";
        p4.innerText = "Nº de Votos: " + orderData[2];
        if(orderData[2] == 2){
            document.getElementById("lastVoteText").style.display = "block";
        }
        if(orderData[2] > 2){
            p5.innerText = "Status: Completed";
            p5.style.backgroundColor = "green";
        } else{p5.innerText = "Status:     Not Completed";}
    }  catch(error){console.error(error);}
}

b2.addEventListener("click", async() =>{
    try{
        await treasury.methods.approveWithdraw(true).send({from: connectedAddress, gasPrice: '500000'});
        showOrder();
    } catch(error){console.error(error);}
});

b3.addEventListener("click", async() =>{
    try{
        await treasury.methods.approveWithdraw(false).send({from: connectedAddress, gasPrice: '500000'});
        showOrder();
    } catch(error){console.error(error);}
});

showOrder();

web3.eth.getBalance(contractAddress, function(error, balance) {
    if (!error) {
        var etherBalance = web3.utils.fromWei(balance, 'ether');
        etherBalance = parseFloat(etherBalance).toFixed(4);
        console.log('Balance de Ether:', etherBalance, 'ETH');
        document.getElementById("balance").innerText = "Treasury Balance: " + etherBalance + " ETH";
    } else {
        console.error('Error al obtener el saldo:', error);
    }
});