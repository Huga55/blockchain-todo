import hardhat from "hardhat";

const { ethers } = hardhat;

async function main() {
  const TaskContractFactory = await ethers.getContractFactory("TaskContract");
  console.log("Deploying contract...");
  const taskContract = await TaskContractFactory.deploy();
  console.log("Contract address");
  console.log(taskContract.target);

  const TabContractFactory = await ethers.getContractFactory("TabContract");
  const tabContract = await TabContractFactory.deploy(taskContract.target);

  console.log("App contracts deployed to:", tabContract.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
