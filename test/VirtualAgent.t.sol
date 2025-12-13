// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test, console} from "forge-std/Test.sol";
import {VirtualAgent} from "../contracts/VirtualAgent.sol";

contract VirtualAgentTest is Test {
    VirtualAgent public agent;
    address public user1 = address(1);
    address public user2 = address(2);

    function setUp() public {
        agent = new VirtualAgent();
    }

    function testCreateAgent() public {
        string[] memory capabilities = new string[](2);
        capabilities[0] = "Data Analysis";
        capabilities[1] = "Content Generation";

        uint256 agentId = agent.createAgent(
            "Test Agent",
            "https://example.com/avatar.png",
            "A test agent",
            "Friendly and helpful",
            capabilities,
            1 ether, // 1 USDC per token
            1000 // 1000 tokens total
        );

        assertEq(agentId, 0);
        (uint256 id, address creator, string memory name,,,, uint256 price, uint256 totalSupply,,,,) = agent.getAgent(0);
        assertEq(id, 0);
        assertEq(creator, address(this));
        assertEq(name, "Test Agent");
        assertEq(price, 1 ether);
        assertEq(totalSupply, 1000);
    }

    function testPurchaseTokens() public {
        string[] memory capabilities = new string[](1);
        capabilities[0] = "Test";

        uint256 agentId = agent.createAgent(
            "Test Agent",
            "",
            "Test",
            "Test",
            capabilities,
            1 ether,
            1000
        );

        vm.deal(user1, 10 ether);
        vm.prank(user1);
        agent.purchaseAgentTokens{value: 5 ether}(agentId, 5);

        uint256 ownership = agent.getOwnership(agentId, user1);
        assertEq(ownership, 5);
    }

    function testCreateListing() public {
        string[] memory capabilities = new string[](1);
        capabilities[0] = "Test";

        uint256 agentId = agent.createAgent(
            "Test Agent",
            "",
            "Test",
            "Test",
            capabilities,
            1 ether,
            1000
        );

        vm.deal(user1, 10 ether);
        vm.prank(user1);
        agent.purchaseAgentTokens{value: 5 ether}(agentId, 5);

        vm.prank(user1);
        uint256 listingId = agent.createListing(agentId, 2 ether, 3);

        (uint256 listingAgentId, address seller, uint256 price, uint256 amount, bool isActive) = agent.listings(listingId);
        assertEq(listingAgentId, agentId);
        assertEq(seller, user1);
        assertEq(price, 2 ether);
        assertEq(amount, 3);
        assertTrue(isActive);
    }
}

