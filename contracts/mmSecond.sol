//SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract secondContract{ // levelManager && buy points && registerMail

    MultiMode public mainContract;

    constructor(address _owner, address _treasury, address multimode){
        owner = _owner;
        treasury = _treasury;
        mainContract = MultiMode(multimode);
    }

    address owner = 0xFD7924cc5885422E7ACC0901B6930c471Da4021B;
    address treasury;

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

    function exchangePoints(address user) public{
        uint32 myPoints = mainContract.getMyPuntuation(msg.sender);
        uint8 myLevel = mainContract.levelChecker(msg.sender);

            if(myLevel == 1){
                require(myPoints >= 250);
                mainContract.changePoints(2, 250, true, msg.sender);
                mainContract.exchangePoints(user);
            } else if(myLevel == 2){
                require(myPoints >= 500);
                mainContract.changePoints(2, 500, true, msg.sender);
                mainContract.exchangePoints(user);
            } else if(myLevel == 3){
                require(myPoints >= 1250);
                mainContract.changePoints(2, 1250, true, msg.sender);
                mainContract.exchangePoints(user);
            } else if(myLevel == 4){
                require(myPoints >= 2500);
                mainContract.changePoints(2, 2500, true, msg.sender);
                mainContract.exchangePoints(user);
            } else if(myLevel == 5){
                require(myPoints >= 5000);
                mainContract.changePoints(2, 5000, true, msg.sender);
                mainContract.exchangePoints(user);
            } else if(myLevel == 6){
                require(myPoints >= 8000);
                mainContract.changePoints(2, 8000, true, msg.sender);
                mainContract.exchangePoints(user);
            } else if(myLevel == 7){
                require(myPoints >= 12000);
                mainContract.changePoints(2, 12000, true, msg.sender);
                mainContract.exchangePoints(user);
            } else if(myLevel == 8){
                require(myPoints >= 16000);
                mainContract.changePoints(2, 16000, true, msg.sender);
                mainContract.exchangePoints(user);
            } else if(myLevel == 9){
                require(myPoints >= 22000);
                mainContract.changePoints(2, 22000, true, msg.sender);
                mainContract.exchangePoints(user);
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
        payable(treasury).transfer(contractBalance);
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
