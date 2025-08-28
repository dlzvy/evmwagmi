import React from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { Shield, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { BABT_CONTRACT_ADDRESS } from '../wagmi';

const BABT_ABI = [
  {
    inputs: [{ name: 'owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

export function BABTChecker() {
  const { address, isConnected } = useAccount();

  const { data: balance, isLoading, error } = useReadContract({
    address: BABT_CONTRACT_ADDRESS,
    abi: BABT_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && isConnected,
    },
  });

  const hasBABT = balance && balance > 0n;

  if (!isConnected) {
    return (
      <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8 shadow-2xl">
        <div className="text-center">
          <Shield className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">BABT Token Checker</h3>
          <p className="text-gray-400 text-lg">
            Connect your wallet to check BABT token status
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8 shadow-2xl">
      <div className="text-center mb-6">
        <Shield className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">BABT Token Status</h3>
        <p className="text-gray-400">
          Binance Account Bound Token (BABT) Verification
        </p>
      </div>

      <div className="bg-gray-800/50 rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-300 font-medium">Wallet Address:</span>
          <span className="text-yellow-400 font-mono text-sm">
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </span>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-300 font-medium">Network:</span>
          <span className="text-yellow-400 font-semibold">BSC Mainnet</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-300 font-medium">BABT Status:</span>
          <div className="flex items-center gap-2">
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 text-yellow-400 animate-spin" />
                <span className="text-yellow-400">Checking...</span>
              </>
            ) : error ? (
              <>
                <XCircle className="w-5 h-5 text-red-400" />
                <span className="text-red-400">Error</span>
              </>
            ) : hasBABT ? (
              <>
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-green-400 font-semibold">Verified</span>
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5 text-red-400" />
                <span className="text-red-400">Not Verified</span>
              </>
            )}
          </div>
        </div>
      </div>

      {!isLoading && !error && (
        <div className={`rounded-xl p-6 border-2 ${
          hasBABT 
            ? 'bg-green-900/20 border-green-500/30' 
            : 'bg-red-900/20 border-red-500/30'
        }`}>
          <div className="text-center">
            {hasBABT ? (
              <>
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                <h4 className="text-xl font-bold text-green-400 mb-2">
                  BABT Verified! ✨
                </h4>
                <p className="text-gray-300">
                  Your wallet holds a Binance Account Bound Token, confirming your verified status.
                </p>
                <div className="mt-4 text-sm text-gray-400">
                  Balance: {balance?.toString()} BABT
                </div>
              </>
            ) : (
              <>
                <XCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
                <h4 className="text-xl font-bold text-red-400 mb-2">
                  No BABT Found
                </h4>
                <p className="text-gray-300">
                  This wallet doesn't hold a BABT token. Complete KYC verification on Binance to get one.
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-900/20 border-2 border-red-500/30 rounded-xl p-6">
          <div className="text-center">
            <XCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
            <h4 className="text-xl font-bold text-red-400 mb-2">
              Error Checking BABT
            </h4>
            <p className="text-gray-300 text-sm">
              {error.message || 'Failed to check BABT token balance'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}