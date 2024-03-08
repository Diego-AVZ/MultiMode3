//SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract MultiMode {

    address owner = 0xFD7924cc5885422E7ACC0901B6930c471Da4021B;

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    uint32 public totalPoints;
    uint public totalVolume;
    uint32 public totalUsers;
    mapping(address => uint32) addrPoints;
    mapping(address => uint8) level;
    mapping(address => uint) volume;

    function getMyPuntuation(address user) public view returns(uint32) {
        return(addrPoints[user]);
    }

    function getTotalPoints() public view returns(uint32) {
        return(totalPoints);
    }

    function airdropChecker(address user) public view returns(uint){
        return((addrPoints[user]/totalPoints)*100);
    }

    function levelChecker(address user) public view returns(uint8){
        return(level[user]);
    }

    function volumeChecker(address user) public view returns(uint){
        return(volume[user]);
    }

    function totalVolumeChecker() public view returns(uint){
        return(totalVolume);
    }

     function totalUsersChecker() public view returns(uint){
        return(totalUsers);
    }

    // dApps/Services

        function exchangePoints() public onlyMultiMode{
            level[msg.sender]++;
        }


        //SimpleBank

            // gas functions

            mapping(address => uint) myDepositedEth;
            mapping(address => uint8) numOfTx;

            function depositEth() public payable{
                require(msg.value > 0);
                if(level[msg.sender] == 0) {level[msg.sender]++;}
                myDepositedEth[msg.sender] = myDepositedEth[msg.sender] + msg.value;
                numOfTx[msg.sender]++;
                volume[msg.sender] += msg.value;
                totalVolume += msg.value;
                if(msg.value >= 100000000000000 && msg.value < 1000000000000000) { 
                    addrPoints[msg.sender] = addrPoints[msg.sender] + (1*level[msg.sender]);
                    totalPoints = totalPoints + (1*level[msg.sender]);
                } else if(msg.value >= 1000000000000000 && msg.value < 5000000000000000) {
                    addrPoints[msg.sender] = addrPoints[msg.sender] + (5*level[msg.sender]);
                    totalPoints = totalPoints + (5*level[msg.sender]);
                } else if(msg.value >= 5000000000000000 && msg.value < 10000000000000000) {
                    addrPoints[msg.sender] = addrPoints[msg.sender] + (10*level[msg.sender]); 
                    totalPoints = totalPoints + (10*level[msg.sender]);
                } else if(msg.value >= 10000000000000000 && msg.value < 25000000000000000) {
                    addrPoints[msg.sender] = addrPoints[msg.sender] + (20*level[msg.sender]); 
                    totalPoints = totalPoints + (20*level[msg.sender]);
                } else if(msg.value >= 25000000000000000) {
                    addrPoints[msg.sender] = addrPoints[msg.sender] + (35*level[msg.sender]); 
                    totalPoints = totalPoints + (35*level[msg.sender]);
                }
                
            }

            function withdrawMyEth(uint amount) public {
                require(amount <= myDepositedEth[msg.sender]);
                payable(msg.sender).transfer(amount);
                myDepositedEth[msg.sender] = myDepositedEth[msg.sender] - amount;
                numOfTx[msg.sender]++;
                totalVolume += amount;
            }
        

            // OnlyRead Functions

            function getMyDepoBalance(address user) public view returns(uint) {
                return(myDepositedEth[user]);
            }

        
        // Daily checkIn

            mapping(address => uint) lastCheckIn;
            mapping(address => uint16) activeDays;
            mapping(address => bool) hasCheck;

            // gas functions

            function chekIn() public {
                if(hasCheck[msg.sender] == false) {
                    hasCheck[msg.sender] = true;
                    if(level[msg.sender] == 0) {level[msg.sender]++;}
                    lastCheckIn[msg.sender] = block.timestamp;
                    addrPoints[msg.sender] = addrPoints[msg.sender] + (1*level[msg.sender]);
                    totalPoints = totalPoints + (1*level[msg.sender]);
                    activeDays[msg.sender]++;
                } else{
                    require(1 days < block.timestamp - lastCheckIn[msg.sender]);
                    if(level[msg.sender] == 0) {level[msg.sender]++;}
                    lastCheckIn[msg.sender] = block.timestamp;
                    addrPoints[msg.sender] = addrPoints[msg.sender] + (1*level[msg.sender]);
                    totalPoints = totalPoints + (1*level[msg.sender]);
                    activeDays[msg.sender]++;
                }
            }

            // OnlyRead Functions

            function canCheckIn() public view returns(bool, uint) {
                if(1 days > block.timestamp - lastCheckIn[msg.sender]) {
                    return(true, 0);
                } else {
                    uint time = (block.timestamp - lastCheckIn[msg.sender]); //En minutos
                    return(false, time); 
                }
            }

            function getActivity(address user) public view returns(uint16) {
                return(activeDays[user]);
            }


        // Lottery

            // gas functions
            
            uint16 public thisLotteryId = 1;
            uint16 public numLen = 2;
            mapping(uint16 => uint16) numLenEach;
            mapping(uint16 => mapping(address => uint16[])) myLotteryNums;
            mapping(uint16 => uint) finalDate;
            mapping(uint16 => address[]) winners; // for each lotteryId
            mapping(uint16 => bool) claimClose;
            mapping(address => uint16) timesPlayLot;
            uint public amountEthLottery;
            
            function regMyNum(uint16 num) public payable{
                require(finalDate[thisLotteryId] > block.timestamp);
                require(msg.value == 150000000000000); //$0,55-$0.6 / lottery ticket
                require(myLotteryNums[thisLotteryId][msg.sender].length <= 4);
                timesPlayLot[msg.sender]++;
                volume[msg.sender] += msg.value;
                totalVolume += msg.value;
                myLotteryNums[thisLotteryId][msg.sender].push(num);
                amountEthLottery = amountEthLottery + msg.value;
                addrPoints[msg.sender] = addrPoints[msg.sender] + (10*level[msg.sender]);
                totalPoints = totalPoints + (10*level[msg.sender]);
            }

            bool firstLottery = true;

            function createNewLottery(uint date, uint8 numL) public onlyOwner { // date == lottery avaiable time from now (in minutes)
                require(finalDate[thisLotteryId] < block.timestamp);
                numLen = numL; // 123 for TEST for numbers from 0 to 3
                thisLotteryId++;
                numLenEach[thisLotteryId] = numL;
                finalDate[thisLotteryId] = block.timestamp + (date*60);
            }

            function checkWinner() public { 
                require(block.timestamp > finalDate[thisLotteryId]);
                uint256 maxNumber;
                if(numLen == 2) {
                    maxNumber = 101;
                } else if(numLen == 3) {
                    maxNumber = 1001;
                } else if(numLen == 4) {
                    maxNumber = 10001;
                } else if(numLen == 123) /*TEST */ { //<<<_________¡_____TEST__________
                    maxNumber = 4;
                }
                uint256 winnerNumber = uint256(keccak256(abi.encodePacked(thisLotteryId, finalDate[thisLotteryId]))) % maxNumber;
                for(uint8 i = 0; i < myLotteryNums[thisLotteryId][msg.sender].length; i++) {
                    if(myLotteryNums[thisLotteryId][msg.sender][i] == winnerNumber) {
                        winners[thisLotteryId].push(msg.sender);
                    }
                }
            }

            function claimLottery() public onlyOwner {
                require(claimClose[thisLotteryId] == false);
                uint eth4Dev = amountEthLottery/10;
                uint lotPriceAmount = amountEthLottery - eth4Dev;
                uint256 numOfWinners = winners[thisLotteryId].length;
                uint earnPerWinner = lotPriceAmount / numOfWinners;
                for(uint8 i = 0; i < winners[thisLotteryId].length; i++) {
                        payable(winners[thisLotteryId][i]).transfer(earnPerWinner);
                }
                payable(owner).transfer(eth4Dev);
                claimClose[thisLotteryId] == true;
                amountEthLottery = 0;
            }

            
            // Only read Functions

            function getWinnerNum() public view returns(uint256, bool) {
                require(block.timestamp > finalDate[thisLotteryId]);
                uint256 maxNumber;
                if(numLenEach[thisLotteryId] == 2) {
                    maxNumber = 101;
                } else if(numLenEach[thisLotteryId] == 3) {
                    maxNumber = 1001;
                } else if(numLenEach[thisLotteryId] == 4) {
                    maxNumber = 10001;
                } else if(numLenEach[thisLotteryId] == 123) /*TEST */ { //<<<______________TEST__________
                    maxNumber = 4;
                }
                uint256 winnerNumber = uint256(keccak256(abi.encodePacked(thisLotteryId, finalDate[thisLotteryId]))) % maxNumber;
                bool isWinner;
                for(uint8 i = 0; i < myLotteryNums[thisLotteryId][msg.sender].length; i++) {
                    if(myLotteryNums[thisLotteryId][msg.sender][i] == winnerNumber) {
                       isWinner = true;
                    }
                }
                return(winnerNumber, isWinner);
            }

            function actualTime() public view returns(uint){
                return(block.timestamp);
            }

            function seeIfCanCheckWin() public view returns(bool){
                if(block.timestamp > finalDate[thisLotteryId]){
                    return(true);
                } else {
                    return(false);
                }
            }
            
            function getMyNumsLen(address user) public view returns(uint) {
                return(myLotteryNums[thisLotteryId][user].length);
            }

            function getMyNums(address user, uint8 i) public view returns(uint16) {
                return(myLotteryNums[thisLotteryId][user][i]);
            }

            function getFinalDate() public view returns(uint){
                return(finalDate[thisLotteryId]);
            }

            function seeIfThereIsALotteryOpen() public view returns(bool){
                if(finalDate[thisLotteryId] > block.timestamp){
                    return(true);
                } else{
                    return(false);
                }
            } 

            function getTimesPlayLot(address user) public view returns(uint16){
                return(timesPlayLot[user]);
            }

            function getTotalPrizeLot() public view returns(uint){
                return(amountEthLottery);
            }


        // Apuestas

           /* function createNewBet(uint8 type, ) public onlyOwner{

            }*/

        
        // Deploy Contract

            mapping(uint16 => mapping(address => uint8)) numContactsDeployedToday;

            function createAccount() public {
                require(numContactsDeployedToday[activeDays[msg.sender]][msg.sender] <= 5);
                new myContract(msg.sender);
                numContactsDeployedToday[activeDays[msg.sender]][msg.sender]++;
                addrPoints[msg.sender] +=  10;
                totalPoints += 10;
            }

            function seeIfCanDeploy(address user) public view returns(bool){
                if(numContactsDeployedToday[activeDays[user]][msg.sender] <= 5){
                    return(true);
                } else {return(false);}
            }

        
        // + or - points

            address[] public multimodeContracts;

            function givePermission(address a) public onlyOwner(){
                multimodeContracts.push(a);
            }
            
            modifier onlyMultiMode(){
                bool accepted = false;
                for(uint8 i = 0; i < multimodeContracts.length; i++){
                    if(msg.sender != multimodeContracts[i]){
                        accepted = false;
                    } else if(msg.sender == multimodeContracts[i]){
                        accepted = true;
                    }
                }
                require(accepted == true);
                _;
            }

            function changePoints(uint8 ty, uint16 amount, bool multi, address user) external onlyMultiMode{
                if(ty == 1){ // + points
                    if(multi == true){
                        addrPoints[user] += amount*level[user];
                        totalPoints += amount*level[user];
                    } else {
                        addrPoints[user] += amount;
                        totalPoints += amount;
                    }
                } else if(ty == 2) { // - points
                    addrPoints[user] -= amount;
                    totalPoints -= amount;
                }
            }

}


contract myContract { // To deploy

    address public owner;

    constructor(address X)  {
        owner = X;
    }
}

contract secondContract{ // levelManager && buy points && registerMail

    MultiMode public mainContract;

    constructor(address multimode){
        mainContract = MultiMode(multimode);
    }

    address owner = 0xFD7924cc5885422E7ACC0901B6930c471Da4021B;

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    bool private locked;

    modifier noReentrancy() {
        require(!locked, "ReentrancyGuard: reentrant call");
        locked = true;
        _;
        locked = false;
    }

    function exchangePoints() public{
        uint32 myPoints = mainContract.getMyPuntuation(msg.sender);
        uint8 myLevel = mainContract.levelChecker(msg.sender);

            if(myLevel == 1){
                require(myPoints >= 250);
                mainContract.changePoints(2, 250, true, msg.sender);
                mainContract.exchangePoints();
            } else if(myLevel == 2){
                require(myPoints >= 500);
                mainContract.changePoints(2, 500, true, msg.sender);
                mainContract.exchangePoints();
            } else if(myLevel == 3){
                require(myPoints >= 1250);
                mainContract.changePoints(2, 1250, true, msg.sender);
                mainContract.exchangePoints();
            } else if(myLevel == 4){
                require(myPoints >= 2500);
                mainContract.changePoints(2, 2500, true, msg.sender);
                mainContract.exchangePoints();
            } else if(myLevel == 5){
                require(myPoints >= 5000);
                mainContract.changePoints(2, 5000, true, msg.sender);
                mainContract.exchangePoints();
            } else if(myLevel == 6){
                require(myPoints >= 8000);
                mainContract.changePoints(2, 8000, true, msg.sender);
                mainContract.exchangePoints();
            } else if(myLevel == 7){
                require(myPoints >= 12000);
                mainContract.changePoints(2, 12000, true, msg.sender);
                mainContract.exchangePoints();
            } else if(myLevel == 8){
                require(myPoints >= 16000);
                mainContract.changePoints(2, 16000, true, msg.sender);
                mainContract.exchangePoints();
            } else if(myLevel == 9){
                require(myPoints >= 22000);
                mainContract.changePoints(2, 22000, true, msg.sender);
                mainContract.exchangePoints();
            } 
    }

    uint public contractBalance;

    function buyPoints(uint16 amount) payable public {
        if(amount == 10) {
            require(msg.value == 100000000000000); //0.0001 eth
            mainContract.changePoints(1, amount, false, msg.sender);
            contractBalance += msg.value;
        } else if(amount == 25) {
            require(msg.value == 200000000000000); //0.0002 eth
            mainContract.changePoints(1, amount, false, msg.sender);
            contractBalance += msg.value;
        } else if(amount == 50) {
            require(msg.value == 350000000000000); //0.00035 eth
            mainContract.changePoints(1, amount, false, msg.sender);
            contractBalance += msg.value;
        } else if(amount == 100) {
            require(msg.value == 700000000000000); //0.0007 eth
            mainContract.changePoints(1, amount, false, msg.sender);
            contractBalance += msg.value;
        } else if(amount == 210) {
            require(msg.value == 1000000000000000); //0.001 eth
            mainContract.changePoints(1, amount, false, msg.sender);
            contractBalance += msg.value;
        }
    }

    function devWithdraw() public onlyOwner noReentrancy{
        payable(owner).transfer(contractBalance);
        contractBalance = 0;
    }

    mapping(address => bool) completedTask1;

    function registerMailTask() public{
        require(completedTask1[msg.sender] == false);
        completedTask1[msg.sender] = true;
        mainContract.changePoints(1, 150, false, msg.sender);
    }

    function seeIfRegis(address user) public view returns(bool){
        return(completedTask1[user]);
    }

}

//__________________________________________________________

contract thirdContract { // Disclaimer && referral

    MultiMode public mainContract;

    constructor(address multimode){
        mainContract = MultiMode(multimode);
    }

    mapping(address => string) public disclaimers;
    mapping(address => bool) public hasSign;

    function disclaimer(string memory data) public {
        disclaimers[msg.sender] = data;
        hasSign[msg.sender] = true;
    }

    function disclaimerWithCode(string memory data, bytes8 code) public {
        disclaimers[msg.sender] = data;
        hasSign[msg.sender] = true;
        regWithCode(code);
    }

    function seeIfHasSigned(address user) public view returns(bool, string memory){
        if(hasSign[user] == true){
            return(hasSign[user], disclaimers[user]);
        } else {
            return(hasSign[user], "...No...");
        }
    }


    mapping(address => bytes8) public addressCode;
    mapping(bytes8 => address) public codeAddress;
    mapping(address => address) public myReferrer;
    mapping(address => bool) hasReg;
    mapping(address => bool) hasCreated;

    function createCode() public {
        require(!hasCreated[msg.sender]);
        bytes8  code = bytes8 (keccak256(abi.encodePacked(msg.sender)));
        addressCode[msg.sender] = code;
        codeAddress[code] = msg.sender;
        hasCreated[msg.sender] = true;
    }

    function regWithCode(bytes8 code) public {
        require(hasReg[msg.sender] == false);
        myReferrer[msg.sender] = codeAddress[code];
        hasReg[msg.sender] = true;
        mainContract.changePoints(1, 50, false, codeAddress[code]);
    }

    function seeIfHasCreated(address user) public view returns(bool, bytes8){
       return(hasCreated[user], addressCode[user]);
    } 

    function seeMyReferrer(bytes8 code) public view returns(address){
        return(codeAddress[code]);
    }
} 

