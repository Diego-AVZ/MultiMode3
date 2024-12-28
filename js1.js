const web3 = new Web3(window.ethereum);

//CONTRACTS:

const mmContractAddr = "0xD243F533BFDd92BE023AC72f5Ba7B42bF26B7F0A";
const mmABI = [
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "ty",
				"type": "uint8"
			},
			{
				"internalType": "uint16",
				"name": "amount",
				"type": "uint16"
			},
			{
				"internalType": "bool",
				"name": "multi",
				"type": "bool"
			},
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "changePoints",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checkWinner",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "chekIn",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "claimLottery",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "createAccount",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "date",
				"type": "uint256"
			},
			{
				"internalType": "uint8",
				"name": "numL",
				"type": "uint8"
			}
		],
		"name": "createNewLottery",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "depositEth",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "exchangePoints",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "a",
				"type": "address"
			}
		],
		"name": "givePermission",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint16",
				"name": "num",
				"type": "uint16"
			}
		],
		"name": "regMyNum",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "withdrawMyEth",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "actualTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "airdropChecker",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "amountEthLottery",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "canCheckIn",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "getActivity",
		"outputs": [
			{
				"internalType": "uint16",
				"name": "",
				"type": "uint16"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getFinalDate",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "getMyDepoBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"internalType": "uint8",
				"name": "i",
				"type": "uint8"
			}
		],
		"name": "getMyNums",
		"outputs": [
			{
				"internalType": "uint16",
				"name": "",
				"type": "uint16"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "getMyNumsLen",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "getMyPuntuation",
		"outputs": [
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "getTimesPlayLot",
		"outputs": [
			{
				"internalType": "uint16",
				"name": "",
				"type": "uint16"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTotalPoints",
		"outputs": [
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTotalPrizeLot",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getWinnerNum",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "levelChecker",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "multimodeContracts",
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
		"name": "numLen",
		"outputs": [
			{
				"internalType": "uint16",
				"name": "",
				"type": "uint16"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "seeIfCanCheckWin",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "seeIfCanDeploy",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "seeIfThereIsALotteryOpen",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "thisLotteryId",
		"outputs": [
			{
				"internalType": "uint16",
				"name": "",
				"type": "uint16"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalPoints",
		"outputs": [
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalUsers",
		"outputs": [
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalUsersChecker",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalVolume",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalVolumeChecker",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "volumeChecker",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
const mmContract = new web3.eth.Contract(mmABI, mmContractAddr);

const mmContractAddr2 = "0xb07fc03626287334A3C4b408db364BbDb8894060";
const mmABI2 = [
	{
		"inputs": [
			{
				"internalType": "uint16",
				"name": "amount",
				"type": "uint16"
			}
		],
		"name": "buyPoints",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "devWithdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "exchangePoints",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "registerMailTask",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "multimode",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "contractBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "mainContract",
		"outputs": [
			{
				"internalType": "contract MultiMode",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "seeIfRegis",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
const mmContract2 = new web3.eth.Contract(mmABI2, mmContractAddr2);

const mmContractAddr3 = "0xD183798ba65cdBE33DD6fC36b7d7de11517CfEF9";
const mmABI3 = [
	{
		"inputs": [],
		"name": "createCode",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "data",
				"type": "string"
			}
		],
		"name": "disclaimer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "data",
				"type": "string"
			},
			{
				"internalType": "bytes8",
				"name": "code",
				"type": "bytes8"
			}
		],
		"name": "disclaimerWithCode",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes8",
				"name": "code",
				"type": "bytes8"
			}
		],
		"name": "regWithCode",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "multimode",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "addressCode",
		"outputs": [
			{
				"internalType": "bytes8",
				"name": "",
				"type": "bytes8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes8",
				"name": "",
				"type": "bytes8"
			}
		],
		"name": "codeAddress",
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
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "disclaimers",
		"outputs": [
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
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "hasSign",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "mainContract",
		"outputs": [
			{
				"internalType": "contract MultiMode",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "myReferrer",
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
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "seeIfHasCreated",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			},
			{
				"internalType": "bytes8",
				"name": "",
				"type": "bytes8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "seeIfHasSigned",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
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
		"inputs": [
			{
				"internalType": "bytes8",
				"name": "code",
				"type": "bytes8"
			}
		],
		"name": "seeMyReferrer",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
const mmContract3 = new web3.eth.Contract(mmABI3, mmContractAddr3);



var connectedAddress;
const modeNetwork = "0x868b";
const modeTest = "0x397";
var goBut = document.getElementById("go");
var bridge = document.getElementById("bridge");
var docs = document.getElementById("docs");
var RRSS = document.getElementById("RRSS");

goBut.addEventListener("click", async()=>{
    try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        connectedAddress = accounts[0];
        goBut.innerText = connectedAddress;
        showEthAddress();
        goBut.style.background = "black";
        goBut.style.color = "#dffe00";
        goBut.style.borderColor = "#dffe00";
        
        await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: modeTest, 
                chainName: "Mode Testnet",
                rpcUrls: ["https://sepolia.mode.network"],
                nativeCurrency: {
                  name: "ETH",
                  symbol: "ETH",
                  decimals: 18,
                },
                blockExplorerUrls: ["https://sepolia.explorer.mode.network"], 
              },
            ],
          });

        /*
        await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: modeNetwork, 
                chainName: "Mode",
                rpcUrls: ["https://1rpc.io/mode"],
                nativeCurrency: {
                  name: "ETH",
                  symbol: "ETH",
                  decimals: 18,
                },
                blockExplorerUrls: ["https://explorer.mode.network/"], 
              },
            ],
          });*/
        
        const networkId = await web3.eth.net.getId();
        if (networkId == modeTest) {   // _________________________________> This is TESTNET
            console.log("Mode Testnet Connected");
        } else{
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: modeTest}], 
              });
            }
            disclaimer()
            
            seeDepositedBalance()
            getDashData()
			seeIfHasReisterMail() 
			bridge.style.display = "block";
			RRSS.style.display = "block";
			docs.style.display = "block";
      } catch (error) {
        console.error('Error connecting wallet', error);
      }
})

function showEthAddress() {
    var start = connectedAddress.slice(0, 6);
    var end = connectedAddress.slice(-4);
  
    goBut.innerText = `${start}...${end}`;
}

var depotBut = document.getElementById("depositBut");
var withBut = document.getElementById("withBut");
var depoIn =  document.getElementById("depoIn"); 
var ethIn =  document.getElementById("ethIn"); 
var load1 = document.getElementById("load1");

depotBut.addEventListener("click", async()=>{
    try {
        
        var depoInValue = web3.utils.toWei(depoIn.value, 'ether');
		depotBut.innerHTML = '<video autoplay loop id="load1" class="load">' +
        '<source src="imgs/load2.mp4" type="video/mp4">' +
        'Tu navegador no soporta la etiqueta de video.' +
        '</video>';
        await mmContract.methods.depositEth().send({ from: connectedAddress, value: depoInValue });
        depoIn.value = "";
        depotBut.innerText = "Deposited";
		setTimeout(function() {
			depotBut.innerText = "Deposit";	
		}, 3000);
        getEthBalance();
        seeDepositedBalance()
        getDashData() 

    } catch(error){
		if(depoIn.value == ""){
			
				depotBut.innerText = "0 ETH";
				setTimeout(function() {
					depotBut.innerText = "Deposit";	
				}, 3000);

		}else{
			depotBut.innerText = "Rejected";
			setTimeout(function() {
				depotBut.innerText = "Deposit";	
			}, 3000);
		}
		console.error("error " + error);
	}
})

withBut.addEventListener("click", async()=>{
    try {
        withBut.innerHTML = '<video autoplay loop id="load1" class="load">' +
        '<source src="imgs/load2.mp4" type="video/mp4">' +
        'Tu navegador no soporta la etiqueta de video.' +
        '</video>';
        var myDepo = await mmContract.methods.getMyDepoBalance(connectedAddress).call();
        await mmContract.methods.withdrawMyEth(myDepo).send({ from: connectedAddress });
        withBut.innerText = "Confirmed";
		setTimeout(function() {
			withBut.innerText = "Withdraw All";	
		}, 3000);
        getEthBalance();
        seeDepositedBalance()
        getDashData() 

    } catch(error){
		console.error("error " + error);
		withBut.innerText = "Rejected";
		setTimeout(function() {
			withBut.innerText = "Withdraw All";	
		}, 3000);
	}
})

async function seeDepositedBalance() {
    try {
        var myDepo = await mmContract.methods.getMyDepoBalance(connectedAddress).call();
        const balanceInEth = web3.utils.fromWei(myDepo, 'ether');
        var roundedBalance;
        if(balanceInEth > 0){
            roundedBalance = parseFloat(balanceInEth).toFixed(4); 
            document.getElementById("eth1").style.marginLeft = "18vw";
        } else {
            roundedBalance = 0;
            document.getElementById("eth1").style.marginLeft = "17.7vw";

        }
        ethIn.innerText = roundedBalance;
    } catch(error) {
        console.error(error);
    }
}

var lotIn = document.getElementById("myNum");
var ticBut = document.getElementById("ticBut"); 
var checkWiBut = document.getElementById("checkWinnerLot"); 

async function seeLotteryState() {
	try{
		var isOpen = await mmContract.methods.seeIfThereIsALotteryOpen().call({from:connectedAddress});
		if(isOpen == true){
			checkWiBut.innerText = "claim period ended";
			ticBut.innerText = "Buy Tickets";
		} else{
			ticBut.innerText = "Lottery Closed";
			checkWiBut.innerText = "Check Winner";
			document.getElementById("msgErrorLot1").style.display = "block";
		}

		var numTics = await mmContract.methods.getMyNumsLen(connectedAddress).call({from:connectedAddress});
		if(numTics > 0){document.getElementById("yourTick").innerText = "";}
		for(var i = 0; i < numTics; i++) {
			var myTics = await mmContract.methods.getMyNums(connectedAddress, i).call({from:connectedAddress});
			console.log(myTics);
			var newTic = document.createElement("div");
			newTic.classList.add("newTic");
			newTic.innerText = myTics;
			document.getElementById("yourTick").appendChild(newTic);
			
		}
		var prizeLot = await mmContract.methods.getTotalPrizeLot().call({from:connectedAddress});
		var prizeLot2 = web3.utils.fromWei(prizeLot, 'ether')
		document.getElementById("prizeLot").innerText = "Total Lottery Prize:" + prizeLot2;
		var actualDate = await mmContract.methods.actualTime().call({from:connectedAddress});
		var finalDate = await mmContract.methods.getFinalDate().call({from:connectedAddress}); 
		var date1 = finalDate - actualDate;
		var date2 = timestampToTime(date1);
		if(date1 < 0){
			document.getElementById("lotFinish").innerText = "00:00";
		} else {
			document.getElementById("lotFinish").innerText = date2;
		}
		
	} catch(Error){console.error(Error);}
}

async function regNum() {
	try{
		var isOpen = await mmContract.methods.seeIfThereIsALotteryOpen().call({from:connectedAddress});
		if(isOpen == true){
			await mmContract.methods.regMyNum(lotIn.value).send({from: connectedAddress, value:150000000000000});
			seeLotteryState()
		} else{
			document.getElementById("msgErrorLot1").style.display = "block";
		}
		
	} catch(Error){console.error(Error);}
}

async function checkLottery(){
	try{	
		var canCheck = await mmContract.methods.seeIfCanCheckWin().call({from: connectedAddress});
		if(canCheck==true){
			var lotData = await mmContract.methods.getWinnerNum().call({from: connectedAddress}); // devuelve nº ganador y si eres ganador
			if(lotData[1] == true){
				await mmContract.methods.checkWinner().send({from: connectedAddress});
				/*Add msg for winner */
			} else {
				checkWiBut.innerText = "Sorry, please try again in the next lottery";
				checkWiBut.style.margin = "16vh 24vw";
				checkWiBut.style.width = "11vw";
				checkWiBut.style.height = "16vh";
				document.getElementById("msgLot1").style.display = "block";
				document.getElementById("msgLot1").innerText = lotData[0];
			}
		} else {
			//msg para que esper a que termine la lotería
			console.log("Wait finish lotery!!!")
		}
	}catch(Error){console.error(Error);}
}

async function seeIfHasReisterMail() {
	try{
		var yes = await mmContract2.methods.seeIfRegis(connectedAddress).call();
		if(yes == false){
			document.getElementById("regMail").style.display = "block";
			
		}
		
	} catch(Error){console.error(Error);}
}


document.getElementById("regMailBut").addEventListener("click", async()=>{
	try{
		var emailInput = document.getElementById("regMailIn").value;
		var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //validar el formato de correo electrónico
		if (regex.test(emailInput)) { // valid mail
			document.getElementById("regMailBut").innerHTML = '<video autoplay loop id="load1" class="load">' +
        '<source src="imgs/load2.mp4" type="video/mp4">' +
        'Tu navegador no soporta la etiqueta de video.' +
        '</video>';
			await mmContract2.methods.registerMailTask().send({from: connectedAddress});
			sendToTelegram(document.getElementById("regMailIn").value);
			seeIfHasReisterMail();
			getDashData();
			document.getElementById("appRegMail").style.display = "none"; 
			document.getElementById("regMail").style.display = "none"; //appRegMail
			guide1.style.display = "block";
		} else {
			document.getElementById("errorMail").innerText = "Invalid Mail Direction";
		}
	} catch(Error){console.error(Error);}
})

function sendToTelegram(message) {

    const botToken = "6793857811:AAGwtXd5rWJddn_LamSZqBOwdFPMDgAKgcc";

    const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const messageData = {
      chat_id: -4084847055,
      text: message,
    };

    console.log("sending to Telegram. . . ");

    fetch(telegramApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Mensaje enviado con éxito:", data);
      })
      .catch((error) => {
        console.error("Error al enviar el mensaje:", error);
      });

}





// FRONT

var butSeeApps = document.getElementById("seeApps");
var div12 = document.getElementById("div12");
var div13 = document.getElementById("div13");
var div14 = document.getElementById("div14");
var multimode = document.getElementById("webTitle");

//bools

var bool1; // if seeApps but clicked

butSeeApps.addEventListener("click", function(){
    div12.style.transform = "translate(30%, -50%)";
    div13.style.transform = "translate(110%)";
    bool1 = true;
    
})

function walletConnectedEf() {
    
    if (bool1 == true){
        div13.style.transform = "translate(110%, -150%)";
        div12.style.transform = "translate(30%, 120%)";
    } else{
        div12.style.transform = "translate(-50%, 120%)";
    }
    multimode.style.marginTop = "90vh";
    multimode.style.fontSize = "4vw";
    setTimeout(function() {
        div14.style.transform = "translate(-133%, -10%)";
        
    }, 500);
    getEthBalance()
}

async function getEthBalance() {
    try {
        const balance = await web3.eth.getBalance(connectedAddress);
        const balanceInEth = web3.utils.fromWei(balance, 'ether');
        const roundedBalance = parseFloat(balanceInEth).toFixed(5);
        document.getElementById("ethBal1").innerText = "Wallet Balance: " + roundedBalance + " ETH"; //
        document.getElementById("wBal").innerText =  roundedBalance + " ETH"; 
    } catch (error) {
        console.error("Error al obtener el saldo de ETH:", error);
        
    }
}

async function getDashData() {
    try {
        getEthBalance();
        var myVol = await mmContract.methods.volumeChecker(connectedAddress).call();
        var volEther = web3.utils.fromWei(myVol, 'ether');
        var myPoints = await mmContract.methods.getMyPuntuation(connectedAddress).call();
        var myLevel = await mmContract.methods.levelChecker(connectedAddress).call();
        var myActiv = await mmContract.methods.getActivity(connectedAddress).call();
        var lastCheck = await mmContract.methods.canCheckIn().call();
        document.getElementById("mmVol").innerText = "Volume " + volEther + " ETH"; 
        document.getElementById("mmPoints").innerText = myPoints; 
        document.getElementById("lev").innerText = myLevel; 
        document.getElementById("days").innerText = myActiv;
		document.getElementById("days2").innerText = myActiv;

		var lastCheckLeg = lastCheck[1]/(60*60);
        document.getElementById("x1").innerText = lastCheckLeg;
		
        

    } catch (error) {
        console.error("Error al obtener el saldo de ETH:", error);
        
    }
}


async function checkInFunc() {
    try {
       
		await mmContract.methods.chekIn().send({from: connectedAddress});
        var myActiv = await mmContract.methods.getActivity(connectedAddress).call();
        document.getElementById("days").innerText = myActiv;
		document.getElementById("days2").innerText = myActiv;
        getDashData();
        
    } catch (error) {
        console.error(error);
        
    }
}



async function disclaimer() {
    try {
        
        var hasSign = await mmContract3.methods.seeIfHasSigned(connectedAddress).call();

        if(hasSign[0] == false){
            document.getElementById("signDisc").style.display = "block";
        } else{walletConnectedEf();}
    
        
    } catch(error){console.error(error);}
}


async function signDisclaimer() {
    try {

        var data = `Disclaimer:

        I, as the owner of this public key "${connectedAddress}", hereby accept and acknowledge the following terms and conditions:
        
        - Neither the developers nor the founders of the project shall be held liable for any capital losses incurred as a result of interaction with this smart contract.
        - I acknowledge that I am fully responsible for my actions within this decentralized application (dApp) as the owner of the public key.
        - Prior to engaging in any transactions within this cryptocurrency project, I understand the importance of conducting thorough due diligence and risk assessment.
        - I agree to indemnify and hold harmless the developers and founders of the project from any claims, losses, or damages arising from my participation in this venture.
        - This agreement constitutes a binding contract between myself, as the owner of the public key, and the project, and supersedes any prior agreements or understandings, whether written or oral.
        
        By proceeding with transactions, I fully acknowledge and accept the terms and conditions outlined above.`;
        
        await mmContract3.methods.disclaimer(data).send({from: connectedAddress});
		document.getElementById("SignDisclaimer").innerText = "..."
		walletConnectedEf();
        
    } catch(error){console.error(error);}
}

var dAppBut = document.getElementById("appDash"); 
var apps = document.getElementById("allDapps"); 
var aptext =  document.getElementById("aptext");
var isThere = false;

function showApps(){
	if(!isThere){
		apps.style.margin = "4vh -0.3vw";
		aptext.innerHTML = "↓ dApps ↓";
		isThere = true;
		return;
	} else {
		apps.style.margin = "100vh -0.3vw";
		aptext.innerHTML = " ↑ dApps ↑ ";
		isThere = false;
	}
}

var icon1 = document.getElementById("icon1");
var icon2 = document.getElementById("icon2");
var icon3 = document.getElementById("icon3");
var icon4 = document.getElementById("icon4");
var icon5 = document.getElementById("icon5");
var icon6 = document.getElementById("icon6");
var icon7 = document.getElementById("icon7");
var icon8 = document.getElementById("icon8");

var bankApp = document.getElementById("bankApp");
var lotteryApp = document.getElementById("lotteryApp"); 
var checkInApp = document.getElementById("checkInApp"); 
var clickApp = document.getElementById("clickApp"); 
var guide1 = document.getElementById("guide1");
var windowMode1 = document.getElementById("windowMode1");
var rocketApp = document.getElementById("game-container");

icon1.addEventListener("click", function(){
	bankApp.style.display = "block";
	lotteryApp.style.display = "none";
	checkInApp.style.display = "none";
	game1Opened = false;
	rocketApp.style.display = "none";
	guide1.style.display = "none";
	windowMode1.style.display = "none";
	clickApp.style.display = "none";
	document.getElementById("appRegMail").style.display = "none";
	showApps();
})

icon2.addEventListener("click", function(){
	bankApp.style.display = "none";
	lotteryApp.style.display = "block";
	checkInApp.style.display = "none";
	game1Opened = false;
	rocketApp.style.display = "none";
	guide1.style.display = "none";
	clickApp.style.display = "none";
	windowMode1.style.display = "none";
	document.getElementById("appRegMail").style.display = "none";
	showApps();
	seeLotteryState();
})

icon3.addEventListener("click", function(){
	bankApp.style.display = "none";
	lotteryApp.style.display = "none";
	checkInApp.style.display = "block";
	windowMode1.style.display = "none";
	game1Opened = false;
	rocketApp.style.display = "none";
	clickApp.style.display = "none";
	document.getElementById("appRegMail").style.display = "none";
	guide1.style.display = "none";
	showApps();
})

var game1Opened;

icon4.addEventListener("click", function(){
	bankApp.style.display = "none";
	lotteryApp.style.display = "none";
	checkInApp.style.display = "none";
	rocketApp.style.display = "block";
	game1Opened = true;
	windowMode1.style.display = "none";
	clickApp.style.display = "none";
	document.getElementById("appRegMail").style.display = "none";
	guide1.style.display = "none";
	showApps();
})

icon5.addEventListener("click", function(){
	bankApp.style.display = "none";
	lotteryApp.style.display = "none";
	checkInApp.style.display = "none";
	game1Opened = false;
	rocketApp.style.display = "none";
	windowMode1.style.display = "none";
	clickApp.style.display = "block";
	document.getElementById("appRegMail").style.display = "none";
	guide1.style.display = "none";
	showApps();
})


icon8.addEventListener("click", function(){
	bankApp.style.display = "none";
	lotteryApp.style.display = "none";
	checkInApp.style.display = "none";
	windowMode1.style.display = "block"; 
	game1Opened = false;
	rocketApp.style.display = "none";
	clickApp.style.display = "none";
	document.getElementById("appRegMail").style.display = "none";
	guide1.style.display = "none";
	showApps();
})

document.getElementById("regMail").addEventListener("click", function(){
	bankApp.style.display = "none";
	lotteryApp.style.display = "none";
	checkInApp.style.display = "none";
	game1Opened = false;
	rocketApp.style.display = "none";
	windowMode1.style.display = "none";
	guide1.style.display = "none";
	document.getElementById("appRegMail").style.display = "block";
	document.getElementById("regMail").style.display = "none";
})

function timestampToTime(timestamp) {
    // Crear un nuevo objeto de fecha basado en el timestamp
    var date = new Date(timestamp * 1000); // Multiplicar por 1000 para convertir segundos a milisegundos
    
    // Obtener las horas y minutos
    var hours = Math.floor(timestamp / 3600); // Dividir por segundos en una hora
    var minutes = Math.floor((timestamp % 3600) / 60); // Obtener los minutos restantes después de las horas
    
    // Agregar ceros a la izquierda si es necesario para formar un formato hh:mm
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    
    // Retornar la hora en formato hh:mm
    return hours + 'h:' + minutes+"m";
}

var iframe1 = document.getElementById("iframe1");
var modeApps = document.getElementById("modeApps");
var ecos1 = document.getElementById("ecos1");

function changeUrl1(){
	iframe1.src = "https://app.mode.network/early/";
	modeApps.style.display = "none";
	ecos1.style.display = "block";
	document.getElementById("return1").style.display = "block";
}

function changeUrl2(){
	iframe1.src = "https://app.kim.exchange/swap";
	modeApps.style.display = "none";
	ecos1.style.display = "block";
	document.getElementById("return1").style.display = "block";
}

function changeUrl3(){
	iframe1.src = "https://swapmode.fi/swap";
	modeApps.style.display = "none";
	ecos1.style.display = "block";
	document.getElementById("return1").style.display = "block";
}

function changeUrl4(){
	iframe1.src = "https://www.ionic.money/";
	modeApps.style.display = "none";
	ecos1.style.display = "block";
	document.getElementById("return1").style.display = "block";
}


function return1(){
	iframe1.src = "";
	modeApps.style.display = "block";
	ecos1.style.display = "none";
	document.getElementById("return1").style.display = "none";
}

var jsPoints = 0;
var listPoints = [[10,1],[20,1],[30,1],[40,1],[50,5],[60,2],[70,2],[80,2],[90,2],[100,10],[110,3],[120,3],[130,3],[140,3],[150,15],[160,4],[170,4],[180,4],[190,4],[200,20],[225,10],[250,25],[300,30],[350,50],[400,75],[500,100],[600,100],[700,125],[800,150],[900, 150],[1000,200]];
var boost = false;
var multiplier1 = 2;
var solPoints = 0;

var bar = document.getElementById("bar");
var fullWidth = 40; // 1000 jspoints == 40vw (con el initial => 40-3=37 )
var eachClick = fullWidth/1000;

function addJsPoints(){
	if (boost == false){
		jsPoints++;
		document.getElementById("jsPointsH").innerText = jsPoints;
	} else{
		jsPoints += 1 * multiplier1;
	}

	for(var i = 0; i < listPoints.length; i++){
		if(jsPoints == listPoints[i][0]){
			solPoints += listPoints[i][1];
			document.getElementById("PointsToAdd").innerHTML = solPoints;
		}
	}

	bar.style.width = eachClick*jsPoints + "vw";

	if (jsPoints > 110) {
		document.getElementById("jsPointsH").style.transform = "translateY(0.1vh)";
	} else {
		document.getElementById("jsPointsH").style.transform = " translateY(-5vh)"; 
	}
}

/* __ For "m" Click keyboard teclado

var click1 = false;

document.addEventListener("keydown", function(event){
    if(event.key === "m" && click1 == false){
		addJsPoints();
		click1 = true;
		document.getElementById("clickBut").style.margin = "8vh 5.5vw";
		document.getElementById("clickBut").style.boxShadow = "0vw 0vw 0vw rgb(107, 137, 63)";
	}
})

document.addEventListener("keyup", function(event){
	if(event.key === "m" && click1 == true){
		click1 = false;
		document.getElementById("clickBut").style.margin = "7vh 5vw";
		document.getElementById("clickBut").style.boxShadow = "0.5vw 1vw 0vw rgb(107, 137, 63)";

	}

})

*/


// ROCKET GAME


/////////////////
const player = document.getElementById('player');
const enemy = document.getElementById('enemy');
const gameContainer = document.getElementById('game-container');
const lives = document.getElementById('lives');

let playerX = 10;
let playerY = 0;

player.style.left = playerX + 'vw'; 
player.style.top = playerY + 'vh'; 

let enemyX = 15;
let enemyY = 10;

enemy.style.left = enemyX + 'vw'; 
enemy.style.top = enemyY + 'vh'; 

var playerLives = 10;
let isGameOver = false;

function moveEnemy() {
  enemyY += 0.15; 
  enemy.style.top = enemyY + 'vh'; 

  if (enemyY > 60) { 
    enemyY = 2; 
    enemyX = Math.random()*20; 
    enemy.style.left = enemyX + 'vw'; 
  }

  if (!isGameOver) {
    requestAnimationFrame(moveEnemy);
  }
}

moveEnemy();

function createEnemyBullet() {
  const bullet = document.createElement('div');
  bullet.classList.add('bullet');
  bullet.style.left = enemyX + 'vw'; 
  bullet.style.top = (enemyY + 2) + 'vh'; 
  gameContainer.appendChild(bullet);

  const moveBulletInterval = setInterval(() => {
    bullet.style.top = (parseInt(bullet.style.top) + 1.1) + 'vh'; 

    if (parseInt(bullet.style.top) > 80) { 
      clearInterval(moveBulletInterval);
      gameContainer.removeChild(bullet);
    }

    if (!isGameOver && checkCollision(bullet, player)) {
		killedToLive = 0;
      clearInterval(moveBulletInterval);
      gameContainer.removeChild(bullet);
      playerHit();
    }
  }, 25);
}

var playerBullets = 50;
var killed = 0;
var killedToLive = 0;

function createPlayerBullet() {
  if (playerBullets > 0) {
    const bullet = document.createElement('div');
    bullet.classList.add('bullet1');
    bullet.style.left = playerX + 'vw'; 
    bullet.style.top = playerY + 'vh'; 
    gameContainer.appendChild(bullet);
    playerBullets--;
    document.getElementById("bulletCount").innerText = playerBullets;
    const moveBulletInterval = setInterval(() => {
      bullet.style.top = (parseInt(bullet.style.top) - 1) + 'vh'; 

      if (parseInt(bullet.style.top) < 0) {
        clearInterval(moveBulletInterval);
        gameContainer.removeChild(bullet);
      }

      if (!isGameOver && checkCollision(bullet, enemy)) {
        killed++;
		killedToLive++;
        playerBullets += 2;
        document.getElementById("bulletCount").innerText = playerBullets;
        document.getElementById("enemyDead").innerText = killed;
        clearInterval(moveBulletInterval);
        gameContainer.removeChild(bullet);
        enemyHit();
		if(killedToLive > 10){
			killedToLive = 0;
			playerLives++;
			lives.innerText = playerLives;
		}
      }
    }, 20);
  }
}

function enemyHit() {
  enemyY = 2; // 
  enemyX = Math.random() * 25; 
  enemy.style.left = enemyX + 'vw'; 
  enemy.style.top = enemyY + 'vh'; 
}

setInterval(() => {
  if (!isGameOver && game1Opened) {
    createEnemyBullet();
  }
}, 1200);

function playerHit() {
  playerLives--;
  lives.innerText = playerLives;
  if (playerLives <= 0) {
    gameOver();
  } else {
    console.log('¡Te han alcanzado! Vidas restantes: ' + playerLives);
  }
}

function gameOver() {
  isGameOver = true;
  document.getElementById("gameOver").innerText = "Game Over";
  
}

function checkCollision(element1, element2) {
  const rect1 = element1.getBoundingClientRect();
  const rect2 = element2.getBoundingClientRect();

  return !(rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom);
}


gameContainer.addEventListener('mousemove', (event) => {
	if(!isGameOver){
	playerX = (event.clientX - 220) / window.innerWidth * 100; 
	playerY = (event.clientY - 100) / window.innerHeight * 100; 

	if (playerX < 0) {
		playerX = 0;
	} else if (playerX > 100) {
		playerX = 100;
	}

	if (playerY < 0) {
		playerY = 0;
	} else if (playerY > 100) {
		playerY = 100;
	}

	player.style.left = playerX + 'vw'; 
	player.style.top = playerY + 'vh'; 
}
});


let isSKeyPressed = false; 

document.addEventListener('keydown', (event) => {
  if (!isGameOver && (event.key === "s" || event.key === "S") && !isSKeyPressed) {
    createPlayerBullet();
    isSKeyPressed = true; 
  }
});

document.addEventListener('keyup', (event) => {
  if (event.key === "s" || event.key === "S") {
    isSKeyPressed = false;
  }
});

var restartButton = document.getElementById("restartButton");

restartButton.addEventListener('click', () => {
   
    playerLives = 3;
    playerBullets = 10;
    killed = 0;
    isGameOver = false;
    document.getElementById("gameOver").innerText = ""; 
    document.getElementById("lives").innerText = playerLives; 
    document.getElementById("bulletCount").innerText = playerBullets; 
    document.getElementById("enemyDead").innerText = killed; 
    player.style.left = playerX + 'vw';
    player.style.top = playerY + 'vh';
    enemy.style.left = enemyX + 'vw';
    enemy.style.top = enemyY + 'vh';
    
    moveEnemy(); 
});
