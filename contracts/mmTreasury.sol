//SPDX-License-Identifier: MIT
pragma solidity: ^0.8.18;

contract mmTreasury {

    address public Lex = 0x5c8Ae61e061BCeFBc241DE8F3F216D6C000128f5;
    address public Fer = 0x146ea62c1ad1e07F18e89Fd3076CEDedc5Dbfc4A;
    address public Die = 0xFD7924cc5885422E7ACC0901B6930c471Da4021B;
    
    modifier onlyFounders(){
        require(msg.sender == Lex || msg.sender == Fer || msg.sender == Die);
        _;
    }

    function deposit() payable public{

    }

    struct withdrawOrder {
        address to;
        uint amount;
        bool completed;
        uint8 votes;
        string concept;
    }

    withdrawOrder public newOrder;

    mapping(address => bool) hasVoted;

    function createWithdraw(uint amount, address to, string memory concept) public onlyFounders{
        newOrder = withdrawOrder(to, amount, false, 0, concept);
        hasVoted[Lex] = false;
        hasVoted[Fer] = false;
        hasVoted[Die] = false;
    }

    function approveWithdraw(bool iApprove) public onlyFounders{
        require(newOrder.completed == false);
        require(hasVoted[msg.sender] == false);
        hasVoted[msg.sender] = true;
        if(newOrder.votes == 0 && iApprove == true){
            newOrder.votes++;
        } else if(newOrder.votes == 1 && iApprove == true){
            newOrder.votes++;
        } else if(newOrder.votes == 2 && iApprove == true){
            newOrder.votes++;
            newOrder.completed = true;
            payable(newOrder.to).transfer(newOrder.amount);
        }
    }

    function seeWithdrawOrder() public view returns(address, uint, uint8, string memory){
        return(newOrder.to, newOrder.amount, newOrder.votes, newOrder.concept);
    }
}
