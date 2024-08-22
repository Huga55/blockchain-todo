import { tabContract, etherContracts } from "../settings";

class TabModel {
  async getTabs() {
    try {
      const tabContract = await etherContracts.getTabContract();
      const tabs = await tabContract.getTabs();

      return tabs;
    } catch (error) {
      console.error("Error fetching tabs:", error);
      throw error;
    }
  }

  async createTab(tabId: string, ipfsHash: string) {
    try {
      const tx = await tabContract.createTab(tabId, ipfsHash);
      await tx.wait();
    } catch (error) {
      console.error("Error creating tab:", error);
      throw error;
    }
  }

  async editTab(tabId: string, newIpfsHash: string) {
    try {
      const tx = await tabContract.editTab(tabId, newIpfsHash);
      await tx.wait();
    } catch (error) {
      console.error("Error editing tab:", error);
      throw error;
    }
  }

  async deleteTab(tabId: string) {
    try {
      const tx = await tabContract.deleteTab(tabId);
      await tx.wait();
    } catch (error) {
      console.error("Error deleting tab:", error);
      throw error;
    }
  }
}

export const tabModel = new TabModel();
