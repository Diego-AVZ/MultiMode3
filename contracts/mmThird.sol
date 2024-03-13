//SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract thirdContract { // Disclaimer && referral

    MultiMode public mainContract;

    constructor(address _owner, address _treasury, address multimode){
        owner = _owner;
        treasury = _treasury;
        mainContract = MultiMode(multimode);
    }

    address owner;
    address treasury;

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
