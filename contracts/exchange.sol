// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
pragma abicoder v2;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/IERC721.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721Holder.sol";

contract Trelix is Ownable, ERC721Holder {
    
    constructor(address payable _feeRecipient, uint256 _protocolFee) public payable {
        feeRecipient = _feeRecipient;
        protocolFee = _protocolFee;
    }
    
    struct Order {
        uint256 orderId;
        address payable seller;
        address buyer;
        address token;
        uint256 tokenId;
        uint256 price;
        State state;
    }
    
    enum State {
        open,
        filled,
        cancelled
    }
    
    mapping (uint256 => Order) public orders;
    
    uint256 public orderId;
    IERC721 tokenInterface;
    
    uint256 public protocolFee;  //percentage
    address payable public feeRecipient;
    uint256 public constant denom = 100;

    mapping(address => uint) public userTradeCount;
    
    event Sell(uint256 orderId, address token, uint256 tokenId, uint256 price);
    event Buy(uint256 orderId);
    event CancelOrder(uint256 orderId);
    
    function sell(address _token, uint256 _tokenId, uint256 _price) public{
        require(_token != address(0), "Invalid Address.");
        orders[orderId] = Order(orderId, msg.sender, address(0), _token, _tokenId, _price, State.open);
        tokenInterface = IERC721(_token);
        tokenInterface.safeTransferFrom(msg.sender, address(this), _tokenId);
        userTradeCount[msg.sender] += 1;
        orderId++;
        emit Sell(orderId, _token, _tokenId, _price);
    }
    
    function buy(uint256 _orderId) public payable{
        require(_orderId < orderId, "Invalid Order Id.");
        Order memory order = orders[_orderId];
        require(order.state == State.open);
        require(msg.sender != order.seller, "Seller cannot be Buyer.");
        uint256 fee = order.price * protocolFee/denom;
        uint256 value = order.price + fee;
        require(msg.value >= value);
        order.state = State.filled;
        order.buyer = msg.sender;
        order.seller.transfer(order.price);
        feeRecipient.transfer(fee);
        orders[_orderId] = order;
        userTradeCount[msg.sender] += 1;
        tokenInterface = IERC721(order.token);
        tokenInterface.safeTransferFrom(address(this), msg.sender, order.tokenId);
        emit Buy(_orderId);
    }
    
    function cancelOrder(uint256 _orderId) public {
        require(_orderId < orderId, "Invalid Order Id.");
        Order memory order = orders[_orderId];
        require(msg.sender == order.seller);
        require(order.state != State.filled);
        order.state = State.cancelled;
        orders[_orderId] = order;
        tokenInterface = IERC721(order.token);
        tokenInterface.safeTransferFrom(address(this), msg.sender, order.tokenId);
        emit CancelOrder(_orderId);
    }
    
    function changeProtocolFeeRecipient(address payable _newFeeRecipient)
        public
        onlyOwner
    {
        feeRecipient = _newFeeRecipient;
    }
    
    function changeProtocolFee(uint256 _newProtocolFee)
        public
        onlyOwner
    {
        protocolFee = _newProtocolFee;
    }

    function getOrdersByUser(address _user) external view returns(Order[] memory) {
        Order[] memory result = new Order[](userTradeCount[_user]);
        uint counter = 0;
        for (uint i = 0; i <= orderId; i++) {
            Order memory order = orders[i];
            if (order.seller == _user || order.buyer == _user) {
                result[counter] = order;
                counter++;
            }
        }
        return result;
    }

    function getOrders() external view returns(Order[] memory) {
        Order[] memory result = new Order[](orderId+1);
        uint counter = 0;
        for (uint i = 0; i <= orderId; i++) {
            result[counter] = orders[i];
            counter++;
        }
        return result;
    }
    
}