import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { bsc, bscTestnet } from 'wagmi/chains'

export const config = getDefaultConfig({
  appName: 'BABT Token Checker',
  projectId: 'YOUR_PROJECT_ID', // Get one at https://cloud.walletconnect.com
  chains: [bsc, bscTestnet],
  ssr: false,
})

// BABT Token Contract Address on BSC
export const BABT_CONTRACT_ADDRESS = '0x2B09d47D550061f995A3b5C6F0Fd58005215D7c8'