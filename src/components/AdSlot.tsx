import { useEffect, useRef } from 'react'

interface AdSlotProps {
    isReady?: boolean;
}

export default function AdSlot({ isReady = true }: AdSlotProps) {
    const isProd = import.meta.env.PROD;
    const clientId = import.meta.env.VITE_ADSENSE_CLIENT_ID;
    const adRef = useRef<HTMLModElement>(null);

    useEffect(() => {
        if (isReady && clientId && adRef.current) {
            try {
                // @ts-ignore
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            } catch (err) {
                console.error('AdSense error:', err);
            }
        }
    }, [isReady, clientId]);

    if (!isReady) return null;

    if (isProd && !clientId) {
        return null;
    }

    if (!clientId) {
        // Development placeholder
        return (
            <div className="my-8 flex items-center justify-center rounded-[30px] border border-dashed border-dark-gray/20 bg-soft-cream/30 px-5 py-6 sm:px-7">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-soft-gray">Advertisement</p>
            </div>
        );
    }

    return (
        <div className="my-8 min-h-[120px] overflow-hidden rounded-[30px] bg-white shadow-[0_14px_28px_rgba(14,30,37,0.05)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-soft-gray text-center pt-2">Advertisement</p>
            <ins
                ref={adRef}
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client={clientId}
                data-ad-slot="auto"
                data-ad-format="auto"
                data-full-width-responsive="true"
            ></ins>
        </div>
    );
}
