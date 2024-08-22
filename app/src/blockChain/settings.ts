import {
  RPC_URL,
  TAB_CONTRACT_ADDRESS,
  TASK_CONTRACT_ADDRESS,
} from "../const/config";
import { ethers } from "ethers";
// import taskAbi from "./../../../artifacts/contracts/TaskContract.sol/TaskContract.json";
// import tabAbi from "./../../../artifacts/contracts/TabContract.sol/TabContract.json";
import taskAbi from "./abi/TaskContract.json";
import tabAbi from "./abi/TabContract.json";
console.log("RPC_URL", process.env);
export const ethersProvider = new ethers.JsonRpcProvider(RPC_URL);
export const ethersSigner = ethersProvider.getSigner();

export const tabContract = new ethers.Contract(
  TAB_CONTRACT_ADDRESS ?? "",
  tabAbi.abi
  //   ethersSigner
);
export const taskContract = new ethers.Contract(
  TASK_CONTRACT_ADDRESS ?? "",
  taskAbi.abi
  //   ethersSigner
);

class EtherSettings {
  private provider: ethers.BrowserProvider | null = null;
  private signer: ethers.JsonRpcSigner | null = null;

  async getProvider() {
    if (!window.ethereum) {
      throw new Error("MetaMask is not installed");
    }

    return this.provider ?? (await this.getProviderAndSigner())?.provider;
  }

  async getSigner() {
    if (!window.ethereum) {
      throw new Error("MetaMask is not installed");
    }

    return this.signer ?? (await this.getProviderAndSigner())?.signer;
  }

  async getProviderAndSigner() {
    // Запрашиваем доступ к аккаунтам MetaMask
    await window.ethereum.request({ method: "eth_requestAccounts" });

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    this.provider = provider;
    this.signer = signer;

    return { provider, signer };
  }
}

export const etherSettings = new EtherSettings();

class EtherContracts {
  private tabContract: ethers.Contract | null = null;
  private taskContract: ethers.Contract | null = null;

  async getTabContract() {
    if (this.tabContract) {
      return this.tabContract;
    }

    const signer = await etherSettings.getSigner();

    this.tabContract = new ethers.Contract(
      TAB_CONTRACT_ADDRESS ?? "",
      tabAbi.abi,
      signer
    );

    return this.tabContract;
  }
  async getTaskContract() {
    if (this.taskContract) {
      return this.taskContract;
    }

    const signer = await etherSettings.getSigner();

    this.taskContract = new ethers.Contract(
      TASK_CONTRACT_ADDRESS ?? "",
      taskAbi.abi,
      signer
    );

    return this.taskContract;
  }
}

export const etherContracts = new EtherContracts();
