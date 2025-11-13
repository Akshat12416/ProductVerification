import { AptosClient } from "aptos";

// Devnet fullnode
export const NODE_URL = "https://fullnode.devnet.aptoslabs.com/v1";
export const client = new AptosClient(NODE_URL);

// Your published module address (publisher)
export const MODULE_ADDRESS = "0xc462e1b0a7c1911c2d41b63b67428ef3d96c4e27a06210942bf0bcf91bbd9bec";
