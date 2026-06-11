import { useState, useEffect } from 'react';
import bcrypt from 'bcryptjs';
import { Copy, RefreshCw, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

export default function BcryptToolUI() {
    const [activeTab, setActiveTab] = useState<'generate' | 'verify'>('generate');
    
    // Generate state
    const [password, setPassword] = useState('');
    const [saltRounds, setSaltRounds] = useState(10);
    const [generatedHash, setGeneratedHash] = useState('');
    
    // Verify state
    const [verifyPassword, setVerifyPassword] = useState('');
    const [verifyHash, setVerifyHash] = useState('');
    const [isMatch, setIsMatch] = useState<boolean | null>(null);
    
    // Shared state
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState('');

    useEffect(() => {
        // Reset results when switching tabs
        setGeneratedHash('');
        setIsMatch(null);
        setError('');
        setProgress(0);
    }, [activeTab]);

    const simulateProgress = () => {
        setProgress(10);
        setTimeout(() => setProgress(40), 100);
        setTimeout(() => setProgress(80), 300);
    };

    const handleGenerate = async () => {
        if (!password) {
            setError('Please enter a password to hash.');
            return;
        }
        if (saltRounds < 4 || saltRounds > 15) {
            setError('Salt rounds must be between 4 and 15.');
            return;
        }

        setIsProcessing(true);
        setError('');
        setGeneratedHash('');
        simulateProgress();

        // Use setTimeout to allow UI to update progress before heavy processing
        setTimeout(() => {
            try {
                // bcryptjs is synchronous for browser in some cases, but we can use the async pattern
                const salt = bcrypt.genSaltSync(saltRounds);
                const hash = bcrypt.hashSync(password, salt);
                setProgress(100);
                setGeneratedHash(hash);
                toast.success('Hash generated successfully');
            } catch (err: any) {
                setError(err.message || 'Failed to generate hash.');
                setProgress(0);
            } finally {
                setIsProcessing(false);
            }
        }, 350);
    };

    const handleVerify = async () => {
        if (!verifyPassword) {
            setError('Please enter a password.');
            return;
        }
        if (!verifyHash) {
            setError('Please enter a bcrypt hash.');
            return;
        }
        
        // Basic format check
        if (!verifyHash.startsWith('$2a$') && !verifyHash.startsWith('$2b$') && !verifyHash.startsWith('$2y$')) {
            setError('Invalid bcrypt hash format. It should start with $2a$, $2b$, or $2y$.');
            return;
        }

        setIsProcessing(true);
        setError('');
        setIsMatch(null);
        simulateProgress();

        setTimeout(() => {
            try {
                const match = bcrypt.compareSync(verifyPassword, verifyHash);
                setProgress(100);
                setIsMatch(match);
                if (match) {
                    toast.success('Password matches the hash!');
                } else {
                    toast.error('Password does not match.');
                }
            } catch (err: any) {
                setError('Failed to verify: ' + (err.message || 'Invalid hash format.'));
                setProgress(0);
            } finally {
                setIsProcessing(false);
            }
        }, 350);
    };

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success('Copied to clipboard');
    };

    const handleReset = () => {
        if (activeTab === 'generate') {
            setPassword('');
            setSaltRounds(10);
            setGeneratedHash('');
        } else {
            setVerifyPassword('');
            setVerifyHash('');
            setIsMatch(null);
        }
        setError('');
        setProgress(0);
    };

    return (
        <div className="space-y-8">
            <div className="card p-6 sm:p-8">
                {/* Tabs */}
                <div className="flex border-b border-soft-gray/30 mb-6">
                    <button
                        className={`flex-1 py-3 text-sm sm:text-base font-bold transition-colors border-b-2 ${
                            activeTab === 'generate' ? 'border-peach-orange text-peach-orange' : 'border-transparent text-dark-gray hover:text-dark-navy'
                        }`}
                        onClick={() => setActiveTab('generate')}
                    >
                        Generate Hash
                    </button>
                    <button
                        className={`flex-1 py-3 text-sm sm:text-base font-bold transition-colors border-b-2 ${
                            activeTab === 'verify' ? 'border-peach-orange text-peach-orange' : 'border-transparent text-dark-gray hover:text-dark-navy'
                        }`}
                        onClick={() => setActiveTab('verify')}
                    >
                        Verify Hash
                    </button>
                </div>

                <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-dark-navy sm:text-2xl">
                            {activeTab === 'generate' ? 'Generate a secure hash' : 'Verify password against hash'}
                        </h2>
                    </div>
                    <button
                        type="button"
                        onClick={handleReset}
                        className="btn-secondary self-start px-4 py-2 text-sm flex items-center gap-2"
                    >
                        <RefreshCw size={14} /> Reset
                    </button>
                </div>

                {/* Privacy Warning */}
                <div className="mb-6 rounded-[24px] border border-peach-orange/30 bg-peach-orange/8 p-4 flex items-start gap-3">
                    <AlertTriangle className="text-peach-orange shrink-0 mt-0.5" size={20} />
                    <div>
                        <h4 className="font-bold text-dark-navy text-sm">Privacy Note</h4>
                        <p className="text-sm text-dark-gray mt-1">This tool runs 100% locally in your browser. However, do not use real production passwords on shared devices.</p>
                    </div>
                </div>

                {/* Generate Tab */}
                {activeTab === 'generate' && (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-dark-navy mb-2">Plain Text Password</label>
                            <input
                                type="text"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password to hash..."
                                disabled={isProcessing}
                                className="w-full rounded-2xl border border-soft-gray/30 bg-white/70 px-4 py-3 text-dark-navy focus:border-peach-orange focus:outline-none focus:ring-1 focus:ring-peach-orange disabled:opacity-50"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-dark-navy mb-2">
                                Salt Rounds (4 - 15) <span className="text-xs font-normal text-soft-gray ml-2">Default: 10</span>
                            </label>
                            <input
                                type="number"
                                min="4"
                                max="15"
                                value={saltRounds}
                                onChange={(e) => setSaltRounds(parseInt(e.target.value) || 10)}
                                disabled={isProcessing}
                                className="w-full sm:w-1/3 rounded-2xl border border-soft-gray/30 bg-white/70 px-4 py-3 text-dark-navy focus:border-peach-orange focus:outline-none focus:ring-1 focus:ring-peach-orange disabled:opacity-50"
                            />
                        </div>

                        {error && <div className="text-sm text-red-500 font-medium">{error}</div>}

                        <button
                            onClick={handleGenerate}
                            disabled={isProcessing || !password}
                            className="btn-primary w-full disabled:opacity-50"
                        >
                            {isProcessing ? 'Generating...' : 'Generate Bcrypt Hash'}
                        </button>
                    </div>
                )}

                {/* Verify Tab */}
                {activeTab === 'verify' && (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-dark-navy mb-2">Plain Text Password</label>
                            <input
                                type="text"
                                value={verifyPassword}
                                onChange={(e) => setVerifyPassword(e.target.value)}
                                placeholder="Enter password to check..."
                                disabled={isProcessing}
                                className="w-full rounded-2xl border border-soft-gray/30 bg-white/70 px-4 py-3 text-dark-navy focus:border-peach-orange focus:outline-none focus:ring-1 focus:ring-peach-orange disabled:opacity-50"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-dark-navy mb-2">Bcrypt Hash</label>
                            <input
                                type="text"
                                value={verifyHash}
                                onChange={(e) => setVerifyHash(e.target.value)}
                                placeholder="e.g. $2a$10$..."
                                disabled={isProcessing}
                                className="w-full rounded-2xl border border-soft-gray/30 bg-white/70 px-4 py-3 text-dark-navy font-mono text-sm focus:border-peach-orange focus:outline-none focus:ring-1 focus:ring-peach-orange disabled:opacity-50"
                            />
                        </div>

                        {error && <div className="text-sm text-red-500 font-medium">{error}</div>}

                        <button
                            onClick={handleVerify}
                            disabled={isProcessing || !verifyPassword || !verifyHash}
                            className="btn-primary w-full disabled:opacity-50"
                        >
                            {isProcessing ? 'Verifying...' : 'Verify Password'}
                        </button>
                    </div>
                )}

                {/* Progress Bar */}
                {isProcessing && (
                    <div className="mt-6">
                        <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-dark-navy mb-2">
                            <span>Processing</span>
                            <span>{progress}%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-soft-gray/20 overflow-hidden">
                            <div 
                                className="h-full bg-peach-orange transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>
                )}
            </div>

            {/* Results Section */}
            {generatedHash && activeTab === 'generate' && !isProcessing && (
                <div className="card border border-light-aqua/50 bg-light-aqua/5 p-6 sm:p-8 space-y-4 animate-fadeIn">
                    <h3 className="text-xl font-bold text-dark-navy flex items-center gap-2">
                        <CheckCircle2 className="text-green-500" /> Hash Generated
                    </h3>
                    <div className="relative">
                        <div className="p-4 bg-white/80 rounded-2xl border border-soft-gray/20 font-mono text-sm text-dark-navy break-all pr-12">
                            {generatedHash}
                        </div>
                        <button
                            onClick={() => handleCopy(generatedHash)}
                            className="absolute right-2 top-2 p-2 text-dark-gray hover:text-peach-orange transition-colors"
                            title="Copy to clipboard"
                        >
                            <Copy size={18} />
                        </button>
                    </div>
                    <p className="text-xs text-dark-gray font-medium">Keep this hash secure. It cannot be reversed.</p>
                </div>
            )}

            {isMatch !== null && activeTab === 'verify' && !isProcessing && (
                <div className={`card border p-6 sm:p-8 space-y-4 animate-fadeIn ${isMatch ? 'border-green-500/50 bg-green-50/50' : 'border-red-500/50 bg-red-50/50'}`}>
                    <h3 className={`text-xl font-bold flex items-center gap-2 ${isMatch ? 'text-green-700' : 'text-red-700'}`}>
                        {isMatch ? <CheckCircle2 /> : <XCircle />} 
                        {isMatch ? 'Password matches this bcrypt hash!' : 'Password does NOT match this bcrypt hash.'}
                    </h3>
                    <p className="text-sm text-dark-gray">
                        {isMatch 
                            ? 'The plain text password you entered correctly validates against the provided hash.' 
                            : 'The password and hash combination is incorrect.'}
                    </p>
                </div>
            )}
        </div>
    );
}
