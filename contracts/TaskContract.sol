// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract TaskContract {
    struct TaskStruct {
        string taskId;
        string taskIpfsHash;
        bool completed;
        string tabId;
    }

    mapping(string => TaskStruct[]) private tabTasks;

    event TaskCreated(string tabId, string taskId, string taskIpfsHash);
    event TaskEdited(string tabId, string taskId, string newTaskIpfsHash);
    event TaskDeleted(string tabId, string taskId);
    event TaskCompleted(string tabId, string taskId);

    function createTask(
        string memory tabId,
        string memory taskId,
        string memory taskIpfsHash
    ) external {
        TaskStruct memory newTask = TaskStruct({
            taskId: taskId,
            taskIpfsHash: taskIpfsHash,
            completed: false,
            tabId: tabId
        });

        tabTasks[tabId].push(newTask);
        emit TaskCreated(tabId, taskId, taskIpfsHash);
    }

    function editTask(
        string memory tabId,
        string memory taskId,
        string memory newTaskIpfsHash
    ) external {
        TaskStruct[] storage tasks = tabTasks[tabId];

        for (uint i = 0; i < tasks.length; i++) {
            if (
                keccak256(abi.encodePacked(tasks[i].taskId)) ==
                keccak256(abi.encodePacked(taskId))
            ) {
                tasks[i].taskIpfsHash = newTaskIpfsHash;
                emit TaskEdited(tabId, taskId, newTaskIpfsHash);
                return;
            }
        }

        revert("Task not found");
    }

    function completeTask(string memory tabId, string memory taskId) external {
        TaskStruct[] storage tasks = tabTasks[tabId];

        for (uint i = 0; i < tasks.length; i++) {
            if (
                keccak256(abi.encodePacked(tasks[i].taskId)) ==
                keccak256(abi.encodePacked(taskId))
            ) {
                tasks[i].completed = true;
                emit TaskCompleted(tabId, taskId);
                return;
            }
        }

        revert("Task not found");
    }

    function deleteTask(string memory tabId, string memory taskId) external {
        TaskStruct[] storage tasks = tabTasks[tabId];

        for (uint i = 0; i < tasks.length; i++) {
            if (
                keccak256(abi.encodePacked(tasks[i].taskId)) ==
                keccak256(abi.encodePacked(taskId))
            ) {
                tasks[i] = tasks[tasks.length - 1];
                tasks.pop();
                emit TaskDeleted(tabId, taskId);
                return;
            }
        }

        revert("Task not found");
    }

    function deleteTasksForTab(string memory tabId) external {
        delete tabTasks[tabId];
    }

    function getTasksForTab(
        string memory tabId
    ) external view returns (TaskStruct[] memory) {
        return tabTasks[tabId];
    }
}
