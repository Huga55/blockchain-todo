// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./TaskContract.sol";

contract TabContract {
    TaskContract private taskContract;

    constructor(address taskContractAddress) {
        taskContract = TaskContract(taskContractAddress);
    }

    struct TabStruct {
        string id;
        string ipfsHash;
        address owner;
    }

    mapping(address => TabStruct[]) private userTabs;

    event TabCreated(address indexed user, string tabId, string ipfsHash);
    event TabEdited(address indexed user, string tabId, string newIpfsHash);
    event TabDeleted(address indexed user, string tabId);

    function createTab(string memory id, string memory ipfsHash) external {
        TabStruct memory newTab = TabStruct({
            id: id,
            ipfsHash: ipfsHash,
            owner: msg.sender
        });

        userTabs[msg.sender].push(newTab);
        emit TabCreated(msg.sender, id, ipfsHash);
    }

    function editTab(string memory id, string memory newIpfsHash) external {
        TabStruct[] storage tabs = userTabs[msg.sender];

        for (uint i = 0; i < tabs.length; i++) {
            if (
                keccak256(abi.encodePacked(tabs[i].id)) ==
                keccak256(abi.encodePacked(id))
            ) {
                require(
                    tabs[i].owner == msg.sender,
                    "You are not the owner of this tab"
                );

                tabs[i].ipfsHash = newIpfsHash;
                emit TabEdited(msg.sender, id, newIpfsHash);

                return;
            }
        }

        revert("Tab not found");
    }

    function deleteTab(string memory id) external {
        TabStruct[] storage tabs = userTabs[msg.sender];

        for (uint i = 0; i < tabs.length; i++) {
            if (
                keccak256(abi.encodePacked(tabs[i].id)) ==
                keccak256(abi.encodePacked(id))
            ) {
                require(
                    tabs[i].owner == msg.sender,
                    "You are not the owner of this tab"
                );

                tabs[i] = tabs[tabs.length - 1];
                tabs.pop();

                taskContract.deleteTasksForTab(id);

                emit TabDeleted(msg.sender, id);
                return;
            }
        }

        revert("Tab not found");
    }

    function getTabs() external view returns (TabStruct[] memory) {
        return userTabs[msg.sender];
    }
}
