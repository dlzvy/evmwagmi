import React from 'react';
import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi';
import { Wallet, LogOut } from 'lucide-react';

export function WalletConnect() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isLoading, pendingConnector } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({
    address: address,
  });

  if (isConnected) {
    return (
      <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-lg shadow-lg">
        <div className="flex items-center gap-2">
          <Wallet className="w-6 h-6 text-blue-500" />
          <span className="font-medium">Connected Wallet</span>
        </div>
        <div className="text-sm text-gray-600">
          Address: {address?.slice(0, 6)}...{address?.slice(-4)}
        </div>
        {balance && (
          <div className="text-sm text-gray-600">
            Balance: {parseFloat(balance?.formatted).toFixed(4)} {balance?.symbol}
          </div>
        )}
        <button
          onClick={() => disconnect()}
          className="flex items-center gap-2 px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-center">Connect Wallet</h2>
      <div className="flex flex-col gap-2">
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              !connector.ready
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
            disabled={!connector.ready}
          >
            <Wallet className="w-4 h-4" />
            {connector.name}
            {isLoading && connector.uid === pendingConnector?.uid && ' (connecting...)'}
          </button>
        ))}
      </div>
    </div>
  );
}