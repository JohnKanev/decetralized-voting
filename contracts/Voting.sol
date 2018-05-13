
pragma solidity ^0.4.11;

contract Voting {
    struct Brand {
        uint16 id;
        string name;
        uint16 votes;
    }

    mapping (uint16 => Brand) public brands;
    uint16 brandCounter = 0;

    function getBrand(uint16 _id) public view returns (uint16 id, string name, uint16 votes) {
        Brand storage brand = brands[_id];
        return(brand.id, brand.name, brand.votes);
    }

    function getNumberOfBrands() public view returns(uint16 length) {
        return brandCounter;
    }

    function voteForCandidate(string candidate) public {
        if (validCandidate(candidate) == false) {
            brands[brandCounter++] = Brand(
                brandCounter,
                candidate,
                uint16(1)
            );
        } else { 
            brands[candidateLocatedAt(candidate)].votes++; 
        }
    }

    function candidateLocatedAt(string candidate) public view returns (uint16) {
        for(uint16 i = 0; i < brandCounter; i++) {
            if (keccak256(brands[i].name) == keccak256(candidate)) return i;
        }
        return 0;
    }

    function validCandidate(string candidate) public view returns (bool) {
        for(uint16 i = 0; i < brandCounter; i++) {
            if (keccak256(brands[i].name) == keccak256(candidate)) return true;
        }
        return false;
    }
}
