//SPDX-License-Identifier: MIT
pragma solidity: ^0.8.18;


contract mmDAO {

    address public Lex = 0x5c8Ae61e061BCeFBc241DE8F3F216D6C000128f5;
    address public Fer = 0x146ea62c1ad1e07F18e89Fd3076CEDedc5Dbfc4A;
    address public Die = 0xFD7924cc5885422E7ACC0901B6930c471Da4021B;
    
    modifier onlyFounders(){
        require(msg.sender == Lex || msg.sender == Fer || msg.sender == Die);
        _;
    }

    struct proposal {
        uint16 propId;
        string title;
        string text;
        string question;
        string option1;
        string option2;
        string option3;
        string option4;
        string option5;
        uint8 votes1;
        uint8 votes2;
        uint8 votes3;
        uint8 votes4;
        uint8 votes5;
        bool closed;
    }

    proposal public newProp;
    uint16 public id = 0;
    mapping(uint16 => mapping(address => bool)) hasVoted;
    mapping(uint16 => mapping(address => uint8)) userVote;

    function createProposal(
        string memory title,
        string memory text,
        string memory question,
        string memory option1,
        string memory option2,
        string memory option3,
        string memory option4,
        string memory option5
        ) public onlyFounders{

            newProp = proposal(id, title, text, question, option1, option2, option3, option4, option5,0,0,0,0,0, false);
        
            id++;

    }

    function voteProposal(uint8 vote) public {
        require(hasVoted[id][msg.sender] == false);
        require(newProp.closed == false);
        if(vote == 1){
            newProp.votes1++;
        } else if(vote == 2){
            newProp.votes2++;
        } else if(vote == 3){
            newProp.votes3++;
        } else if(vote == 3){
            newProp.votes3++;
        } else if(vote == 4){
            newProp.votes4++;
        } else if(vote == 5){
            newProp.votes5++;
        }
        userVote[id][msg.sender] = vote;
    }

    function closeProposal() public onlyFounders{
        newProp.closed = true;
    }

    function seeMyVote(address user) public view returns(uint8, bool){ // and if I can vote
        return(userVote[id][user], hasVoted[id][user]);
    }

}
