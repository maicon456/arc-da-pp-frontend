// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script, console} from "forge-std/Script.sol";
import {VirtualAgent} from "../contracts/VirtualAgent.sol";

contract DeployVirtualAgent is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        VirtualAgent agent = new VirtualAgent();

        console.log("VirtualAgent deployed at:", address(agent));

        vm.stopBroadcast();
    }
}


