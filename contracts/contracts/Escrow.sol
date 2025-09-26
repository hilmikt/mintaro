// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Escrow {
    enum Status { Funded, Released, Refunded }

    struct Job {
        address client;
        address freelancer;
        uint256 amount;
        Status status;
    }

    uint256 public jobCount;
    mapping(uint256 => Job) public jobs;

    event JobFunded(uint256 indexed jobId, address indexed client, address indexed freelancer, uint256 amount);
    event JobReleased(uint256 indexed jobId);
    event JobRefunded(uint256 indexed jobId);

    function fundJob(address freelancer) external payable returns (uint256 jobId) {
        require(msg.value > 0, "No funds");
        jobId = ++jobCount;
        jobs[jobId] = Job(msg.sender, freelancer, msg.value, Status.Funded);
        emit JobFunded(jobId, msg.sender, freelancer, msg.value);
    }

    function release(uint256 jobId) external {
        Job storage j = jobs[jobId];
        require(msg.sender == j.client, "Only client");
        require(j.status == Status.Funded, "Not funded");
        j.status = Status.Released;
        (bool ok, ) = j.freelancer.call{value: j.amount}("");
        require(ok, "Transfer failed");
        emit JobReleased(jobId);
    }

    function refund(uint256 jobId) external {
        Job storage j = jobs[jobId];
        require(msg.sender == j.freelancer || msg.sender == j.client, "Not allowed");
        require(j.status == Status.Funded, "Not funded");
        j.status = Status.Refunded;
        (bool ok, ) = j.client.call{value: j.amount}("");
        require(ok, "Transfer failed");
        emit JobRefunded(jobId);
    }
}
