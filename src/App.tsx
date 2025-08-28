import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { config } from './wagmi';
import '@rainbow-me/rainbowkit/styles.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import {
  RainbowKitProvider,
  ConnectButton,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import { BABTChecker } from './components/BABTChecker';
import { useAccount } from 'wagmi';
import { Github, Twitter, Send } from 'lucide-react';

const queryClient = new QueryClient();

function AppContent() {
  const { isConnected } = useAccount();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,215,0,0.02)_50%,transparent_75%)]"></div>
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <div className="max-w-2xl w-full space-y-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl mb-6 shadow-2xl">
              <span className="text-3xl font-bold text-black">B</span>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent mb-4">
              BABT Checker
            </h1>
            <p className="text-xl text-gray-300 max-w-lg mx-auto leading-relaxed">
              Verify if your wallet holds a Binance Account Bound Token on BSC network
            </p>
          </div>

          {/* Connect Button */}
          <div className="flex justify-center mb-8">
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-1 rounded-2xl shadow-2xl">
              <div className="bg-black rounded-xl p-4">
                <ConnectButton />
              </div>
            </div>
          </div>

          {/* BABT Checker Component */}
          <BABTChecker />

          {/* Info Section */}
          <div className="bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-800 rounded-2xl p-8 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-white mb-4">About BABT</h3>
            <div className="space-y-4 text-gray-300">
              <p>
                <strong className="text-yellow-400">Binance Account Bound Token (BABT)</strong> is a non-transferable 
                token that serves as a digital verification credential for users who have completed 
                KYC verification on Binance.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="bg-gray-800/50 rounded-xl p-4">
                  <h4 className="font-semibold text-yellow-400 mb-2">✨ Benefits</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Proof of identity verification</li>
                    <li>• Access to exclusive features</li>
                    <li>• Enhanced security credentials</li>
                  </ul>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4">
                  <h4 className="font-semibold text-yellow-400 mb-2">🔒 Properties</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Non-transferable</li>
                    <li>• Soul-bound to wallet</li>
                    <li>• BSC network based</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center items-center gap-6 mt-8">
            <a
              href="#"
              className="group flex items-center justify-center w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl hover:border-yellow-400/50 transition-all duration-300 hover:scale-110"
              target="https://x.com/XBerryAO"
              rel="noopener noreferrer"
            >
              <Twitter className="w-5 h-5 text-gray-400 group-hover:text-yellow-400 transition-colors" />
            </a>
            <a
              href="#"
              className="group flex items-center justify-center w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl hover:border-yellow-400/50 transition-all duration-300 hover:scale-110"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Send className="w-5 h-5 text-gray-400 group-hover:text-yellow-400 transition-colors" />
            </a>
            <a
              href="#"
              className="group flex items-center justify-center w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl hover:border-yellow-400/50 transition-all duration-300 hover:scale-110"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-5 h-5 text-gray-400 group-hover:text-yellow-400 transition-colors" />
            </a>
          </div>

          {/* Credit */}
          <div className="text-center mt-8">
            <p className="text-gray-500 text-sm">
              Build by <span className="text-yellow-400 font-semibold">XBerry</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider 
          theme={darkTheme({
            accentColor: '#facc15',
            accentColorForeground: 'black',
            borderRadius: 'large',
            fontStack: 'system',
          })}
        >
          <AppContent />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;