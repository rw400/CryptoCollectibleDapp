
pragma solidity 0.5.0;

contract Token {
    
    address public owner;
    uint256 public totalSupply;
    bytes public hash;

    mapping(address => uint256) amountOwned;
    mapping(uint256 => address) tokenOwner;
    mapping(uint256 => address) Approved;
    
    event OwnershipTransferred(address indexed from, address indexed to, uint256 tokenId);
    event Approval(address indexed owner, address indexed approved, uint256 tokenId);
    event Minting(address indexed to, uint256 tokenId);

    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner(){
        require(msg.sender == owner, "not owner");
        require(msg.sender == address(0), "not owner");
        _;
    }
    
    function setHash(bytes32 _hash, bytes memory data) public pure returns (bytes32) {
        return _hash = keccak256(data);

    }

    function minting(address _to, uint _tokenId) public onlyOwner {
        totalSupply ++;
        amountOwned[_to] += _tokenId;
        emit Minting(_to, _tokenId);
    }

    function balanceOf(address _owner) public view returns (uint256 balance) {
        return amountOwned[_owner];
    }
    
    function getTotalSupply() public view returns (uint){
        return totalSupply;
    }

    function ownerOf (uint256 _tokenId) public view returns (address owner){
        require (owner != address(0), "Already current owner");        
        owner = tokenOwner[_tokenId];
        return owner;
    }

    function approve(uint256 _tokenId, address _to) public onlyOwner {
        owner = ownerOf(_tokenId);
        require (owner != _to, "Same Approve Owner");
        Approved[_tokenId] = _to;

        emit Approval(msg.sender, _to, _tokenId);
    }
    
    function transferToken(address _from, address _to, uint256 _tokenId) public	onlyOwner {
        
        require (_to != owner, "Already current owner");
        require (_to != address(0), "Already current owner");
        amountOwned[_from] --;
        amountOwned[_to] ++;

        emit OwnershipTransferred(msg.sender, _to, _tokenId);
    }
}


