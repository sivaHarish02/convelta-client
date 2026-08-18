import { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { Copy, RefreshCw, CheckCircle2, AlertTriangle, Download, Settings2 } from 'lucide-react';
import { toast } from 'sonner';

type QRType = 'text' | 'url' | 'email' | 'phone' | 'wifi';
type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

interface QRCodeOptions {
    size: number;
    margin: number;
    errorCorrectionLevel: ErrorCorrectionLevel;
    color: {
        dark: string;
        light: string;
    };
}

export default function QRCodeToolUI() {
    const [qrType, setQrType] = useState<QRType>('url');
    
    // Inputs
    const [textValue, setTextValue] = useState('');
    const [urlValue, setUrlValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [emailSubject, setEmailSubject] = useState('');
    const [emailBody, setEmailBody] = useState('');
    const [phoneValue, setPhoneValue] = useState('');
    const [wifiSSID, setWifiSSID] = useState('');
    const [wifiPassword, setWifiPassword] = useState('');
    const [wifiEncryption, setWifiEncryption] = useState('WPA');
    const [wifiHidden, setWifiHidden] = useState(false);

    // Options
    const [options, setOptions] = useState<QRCodeOptions>({
        size: 512,
        margin: 4,
        errorCorrectionLevel: 'M',
        color: {
            dark: '#000000',
            light: '#ffffff'
        }
    });

    // State
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState('');
    const [previewUrl, setPreviewUrl] = useState('');
    const [svgContent, setSvgContent] = useState('');
    const [finalPayload, setFinalPayload] = useState('');
    const [showOptions, setShowOptions] = useState(false);

    useEffect(() => {
        // Clear outputs when changing type
        setPreviewUrl('');
        setSvgContent('');
        setFinalPayload('');
        setError('');
        setProgress(0);
    }, [qrType]);

    const buildPayload = (): string => {
        switch (qrType) {
            case 'text':
                return textValue;
            case 'url':
                // Simple protocol addition if missing
                return urlValue.match(/^https?:\/\//) ? urlValue : `https://${urlValue}`;
            case 'email':
                return `MATMSG:TO:${emailValue};SUB:${emailSubject};BODY:${emailBody};;`;
            case 'phone':
                return `tel:${phoneValue}`;
            case 'wifi':
                const enc = wifiEncryption === 'None' ? 'nopass' : wifiEncryption;
                const hidden = wifiHidden ? 'true' : 'false';
                return `WIFI:T:${enc};S:${wifiSSID};P:${wifiPassword};H:${hidden};;`;
            default:
                return '';
        }
    };

    const validateInputs = (): boolean => {
        if (qrType === 'text' && !textValue.trim()) {
            setError('Please enter some text.');
            return false;
        }
        if (qrType === 'url' && !urlValue.trim()) {
            setError('Please enter a URL.');
            return false;
        }
        if (qrType === 'email' && !emailValue.trim()) {
            setError('Please enter an email address.');
            return false;
        }
        if (qrType === 'email' && emailValue && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
            setError('Please enter a valid email address.');
            return false;
        }
        if (qrType === 'phone' && !phoneValue.trim()) {
            setError('Please enter a phone number.');
            return false;
        }
        if (qrType === 'wifi' && !wifiSSID.trim()) {
            setError('Please enter a WiFi SSID (Network Name).');
            return false;
        }
        if (options.size < 128 || options.size > 1024) {
            setError('Size must be between 128 and 1024.');
            return false;
        }
        return true;
    };

    const simulateProgress = () => {
        setProgress(10);
        setTimeout(() => setProgress(40), 100);
        setTimeout(() => setProgress(80), 300);
    };

    const handleGenerate = async () => {
        setError('');
        if (!validateInputs()) return;

        setIsProcessing(true);
        setPreviewUrl('');
        setSvgContent('');
        simulateProgress();

        const payload = buildPayload();
        setFinalPayload(payload);

        setTimeout(async () => {
            try {
                const qrOptions = {
                    errorCorrectionLevel: options.errorCorrectionLevel,
                    margin: options.margin,
                    width: options.size,
                    color: options.color
                };

                // Generate PNG Data URL for preview and PNG download
                const pngDataUrl = await QRCode.toDataURL(payload, { ...qrOptions, type: 'image/png' });
                
                // Generate SVG string for SVG download
                const svgString = await QRCode.toString(payload, { ...qrOptions, type: 'svg' });

                setProgress(100);
                setPreviewUrl(pngDataUrl);
                setSvgContent(svgString);
                toast.success('QR Code generated successfully');
            } catch (err: any) {
                setError(err.message || 'Failed to generate QR code.');
                setProgress(0);
            } finally {
                setIsProcessing(false);
            }
        }, 350);
    };

    const handleDownload = (format: 'png' | 'svg') => {
        if (format === 'png' && previewUrl) {
            const link = document.createElement('a');
            link.download = `qrcode-${Date.now()}.png`;
            link.href = previewUrl;
            link.click();
            toast.success('Downloaded PNG file');
        } else if (format === 'svg' && svgContent) {
            const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.download = `qrcode-${Date.now()}.svg`;
            link.href = url;
            link.click();
            URL.revokeObjectURL(url);
            toast.success('Downloaded SVG file');
        }
    };

    const handleCopyData = () => {
        navigator.clipboard.writeText(finalPayload);
        toast.success('Copied QR data to clipboard');
    };

    const handleReset = () => {
        setTextValue('');
        setUrlValue('');
        setEmailValue('');
        setEmailSubject('');
        setEmailBody('');
        setPhoneValue('');
        setWifiSSID('');
        setWifiPassword('');
        setWifiEncryption('WPA');
        setWifiHidden(false);
        setPreviewUrl('');
        setSvgContent('');
        setFinalPayload('');
        setError('');
        setProgress(0);
        setOptions({
            size: 512,
            margin: 4,
            errorCorrectionLevel: 'M',
            color: { dark: '#000000', light: '#ffffff' }
        });
    };

    const renderInputs = () => {
        switch (qrType) {
            case 'url':
                return (
                    <div>
                        <label className="block text-sm font-semibold text-dark-navy mb-2">Website URL</label>
                        <input
                            type="url"
                            value={urlValue}
                            onChange={(e) => setUrlValue(e.target.value)}
                            placeholder="https://example.com"
                            disabled={isProcessing}
                            className="w-full rounded-2xl border border-soft-gray/30 bg-white/70 px-4 py-3 text-dark-navy focus:border-peach-orange focus:outline-none focus:ring-1 focus:ring-peach-orange disabled:opacity-50"
                        />
                    </div>
                );
            case 'text':
                return (
                    <div>
                        <label className="block text-sm font-semibold text-dark-navy mb-2">Plain Text</label>
                        <textarea
                            rows={4}
                            value={textValue}
                            onChange={(e) => setTextValue(e.target.value)}
                            placeholder="Enter any text or message..."
                            disabled={isProcessing}
                            className="w-full rounded-2xl border border-soft-gray/30 bg-white/70 px-4 py-3 text-dark-navy focus:border-peach-orange focus:outline-none focus:ring-1 focus:ring-peach-orange disabled:opacity-50 resize-y"
                        />
                    </div>
                );
            case 'email':
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-dark-navy mb-2">Email Address</label>
                            <input
                                type="email"
                                value={emailValue}
                                onChange={(e) => setEmailValue(e.target.value)}
                                placeholder="contact@example.com"
                                disabled={isProcessing}
                                className="w-full rounded-2xl border border-soft-gray/30 bg-white/70 px-4 py-3 text-dark-navy focus:border-peach-orange focus:outline-none focus:ring-1 focus:ring-peach-orange disabled:opacity-50"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-dark-navy mb-2">Subject (Optional)</label>
                            <input
                                type="text"
                                value={emailSubject}
                                onChange={(e) => setEmailSubject(e.target.value)}
                                placeholder="Message subject"
                                disabled={isProcessing}
                                className="w-full rounded-2xl border border-soft-gray/30 bg-white/70 px-4 py-3 text-dark-navy focus:border-peach-orange focus:outline-none focus:ring-1 focus:ring-peach-orange disabled:opacity-50"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-dark-navy mb-2">Message Body (Optional)</label>
                            <textarea
                                rows={3}
                                value={emailBody}
                                onChange={(e) => setEmailBody(e.target.value)}
                                placeholder="Type the email body..."
                                disabled={isProcessing}
                                className="w-full rounded-2xl border border-soft-gray/30 bg-white/70 px-4 py-3 text-dark-navy focus:border-peach-orange focus:outline-none focus:ring-1 focus:ring-peach-orange disabled:opacity-50 resize-y"
                            />
                        </div>
                    </div>
                );
            case 'phone':
                return (
                    <div>
                        <label className="block text-sm font-semibold text-dark-navy mb-2">Phone Number</label>
                        <input
                            type="tel"
                            value={phoneValue}
                            onChange={(e) => setPhoneValue(e.target.value)}
                            placeholder="+1 234 567 8900"
                            disabled={isProcessing}
                            className="w-full rounded-2xl border border-soft-gray/30 bg-white/70 px-4 py-3 text-dark-navy focus:border-peach-orange focus:outline-none focus:ring-1 focus:ring-peach-orange disabled:opacity-50"
                        />
                    </div>
                );
            case 'wifi':
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-dark-navy mb-2">Network Name (SSID)</label>
                            <input
                                type="text"
                                value={wifiSSID}
                                onChange={(e) => setWifiSSID(e.target.value)}
                                placeholder="MyWiFiNetwork"
                                disabled={isProcessing}
                                className="w-full rounded-2xl border border-soft-gray/30 bg-white/70 px-4 py-3 text-dark-navy focus:border-peach-orange focus:outline-none focus:ring-1 focus:ring-peach-orange disabled:opacity-50"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-dark-navy mb-2">Password</label>
                            <input
                                type="text"
                                value={wifiPassword}
                                onChange={(e) => setWifiPassword(e.target.value)}
                                placeholder="Network password (leave blank if none)"
                                disabled={isProcessing}
                                className="w-full rounded-2xl border border-soft-gray/30 bg-white/70 px-4 py-3 text-dark-navy focus:border-peach-orange focus:outline-none focus:ring-1 focus:ring-peach-orange disabled:opacity-50"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-dark-navy mb-2">Security</label>
                                <select
                                    value={wifiEncryption}
                                    onChange={(e) => setWifiEncryption(e.target.value)}
                                    disabled={isProcessing}
                                    className="w-full rounded-2xl border border-soft-gray/30 bg-white/70 px-4 py-3 text-dark-navy focus:border-peach-orange focus:outline-none focus:ring-1 focus:ring-peach-orange disabled:opacity-50"
                                >
                                    <option value="WPA">WPA/WPA2</option>
                                    <option value="WEP">WEP</option>
                                    <option value="None">None</option>
                                </select>
                            </div>
                            <div className="flex flex-col justify-end pb-3">
                                <label className="inline-flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={wifiHidden}
                                        onChange={(e) => setWifiHidden(e.target.checked)}
                                        disabled={isProcessing}
                                        className="rounded border-soft-gray/70 text-peach-orange focus:ring-peach-orange h-4 w-4 disabled:opacity-50"
                                    />
                                    <span className="text-sm text-dark-gray font-medium">Hidden Network</span>
                                </label>
                            </div>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="space-y-8">
            <div className="card p-6 sm:p-8">
                {/* Tabs */}
                <div className="flex flex-wrap border-b border-soft-gray/30 mb-6 gap-2 sm:gap-0">
                    {[
                        { id: 'url', label: 'URL' },
                        { id: 'text', label: 'Text' },
                        { id: 'email', label: 'Email' },
                        { id: 'phone', label: 'Phone' },
                        { id: 'wifi', label: 'WiFi' }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            className={`flex-1 min-w-[80px] py-3 text-sm sm:text-base font-bold transition-colors border-b-2 ${
                                qrType === tab.id ? 'border-peach-orange text-peach-orange' : 'border-transparent text-dark-gray hover:text-dark-navy'
                            }`}
                            onClick={() => setQrType(tab.id as QRType)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-dark-navy sm:text-2xl">
                            Enter QR Code Details
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
                        <p className="text-sm text-dark-gray mt-1">QR codes are generated securely inside your browser. Your input data is never uploaded to our servers.</p>
                    </div>
                </div>

                <div className="space-y-6">
                    {renderInputs()}

                    {/* Advanced Options Toggle */}
                    <div className="border-t border-soft-gray/20 pt-6 mt-6">
                        <button 
                            type="button"
                            onClick={() => setShowOptions(!showOptions)}
                            className="flex items-center gap-2 text-dark-navy font-bold hover:text-peach-orange transition-colors"
                        >
                            <Settings2 size={18} /> {showOptions ? 'Hide Advanced Options' : 'Show Advanced Options'}
                        </button>

                        {showOptions && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 bg-soft-cream/40 p-5 rounded-[24px] border border-soft-gray/20">
                                <div>
                                    <label className="block text-sm font-semibold text-dark-navy mb-1">Image Size (px)</label>
                                    <input
                                        type="number"
                                        min="128"
                                        max="1024"
                                        value={options.size}
                                        onChange={(e) => setOptions({ ...options, size: parseInt(e.target.value) || 512 })}
                                        className="w-full rounded-xl border border-soft-gray/70 bg-white px-3 py-2 text-sm font-medium text-dark-navy outline-none focus:ring-1 focus:ring-peach-orange"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-dark-navy mb-1">Error Correction</label>
                                    <select
                                        value={options.errorCorrectionLevel}
                                        onChange={(e) => setOptions({ ...options, errorCorrectionLevel: e.target.value as ErrorCorrectionLevel })}
                                        className="w-full rounded-xl border border-soft-gray/70 bg-white px-3 py-2 text-sm font-medium text-dark-navy outline-none focus:ring-1 focus:ring-peach-orange"
                                    >
                                        <option value="L">Low (7%)</option>
                                        <option value="M">Medium (15%)</option>
                                        <option value="Q">Quartile (25%)</option>
                                        <option value="H">High (30%)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-dark-navy mb-1">Foreground Color</label>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="color"
                                            value={options.color.dark}
                                            onChange={(e) => setOptions({ ...options, color: { ...options.color, dark: e.target.value } })}
                                            className="h-9 w-9 rounded cursor-pointer border-0 p-0 bg-transparent"
                                        />
                                        <input 
                                            type="text" 
                                            value={options.color.dark} 
                                            onChange={(e) => setOptions({ ...options, color: { ...options.color, dark: e.target.value } })}
                                            className="flex-1 min-w-0 rounded-xl border border-soft-gray/70 bg-white px-3 py-2 text-sm font-medium text-dark-navy outline-none focus:ring-1 focus:ring-peach-orange"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-dark-navy mb-1">Background Color</label>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="color"
                                            value={options.color.light}
                                            onChange={(e) => setOptions({ ...options, color: { ...options.color, light: e.target.value } })}
                                            className="h-9 w-9 rounded cursor-pointer border-0 p-0 bg-transparent"
                                        />
                                        <input 
                                            type="text" 
                                            value={options.color.light} 
                                            onChange={(e) => setOptions({ ...options, color: { ...options.color, light: e.target.value } })}
                                            className="flex-1 min-w-0 rounded-xl border border-soft-gray/70 bg-white px-3 py-2 text-sm font-medium text-dark-navy outline-none focus:ring-1 focus:ring-peach-orange"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {error && <div className="text-sm text-red-500 font-medium">{error}</div>}

                    <button
                        onClick={handleGenerate}
                        disabled={isProcessing}
                        className="btn-primary w-full disabled:opacity-50 mt-4"
                    >
                        {isProcessing ? 'Generating...' : 'Generate QR Code'}
                    </button>
                </div>

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
            {previewUrl && !isProcessing && (
                <div className="card border border-light-aqua/50 bg-light-aqua/5 p-6 sm:p-8 space-y-6 animate-fadeIn">
                    <h3 className="text-xl font-bold text-dark-navy flex items-center gap-2">
                        <CheckCircle2 className="text-green-500" /> QR Code Ready
                    </h3>
                    
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        {/* Preview Image */}
                        <div className="bg-white p-4 rounded-3xl border border-soft-gray/20 shadow-sm shrink-0 mx-auto md:mx-0">
                            <img src={previewUrl} alt="Generated QR Code" className="w-48 h-48 sm:w-64 sm:h-64 object-contain" />
                        </div>

                        {/* Actions */}
                        <div className="flex-1 w-full space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <button
                                    onClick={() => handleDownload('png')}
                                    className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-dark-navy text-white font-bold rounded-xl hover:bg-dark-teal transition-colors shadow-sm"
                                >
                                    <Download size={18} /> Download PNG
                                </button>
                                <button
                                    onClick={() => handleDownload('svg')}
                                    className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-white border border-dark-navy/20 text-dark-navy font-bold rounded-xl hover:bg-soft-cream/50 transition-colors shadow-sm"
                                >
                                    <Download size={18} /> Download SVG
                                </button>
                            </div>

                            <div className="pt-4 border-t border-soft-gray/20">
                                <label className="block text-sm font-semibold text-dark-navy mb-2">Decoded Data Payload</label>
                                <div className="relative">
                                    <div className="p-3 bg-white/80 rounded-xl border border-soft-gray/20 font-mono text-xs text-dark-gray break-all pr-12 max-h-32 overflow-y-auto">
                                        {finalPayload}
                                    </div>
                                    <button
                                        onClick={handleCopyData}
                                        className="absolute right-2 top-2 p-2 bg-white rounded-lg border border-soft-gray/20 text-dark-gray hover:text-peach-orange transition-colors shadow-sm"
                                        title="Copy data payload"
                                    >
                                        <Copy size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
