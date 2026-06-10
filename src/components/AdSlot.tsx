
interface AdSlotProps {
    isReady?: boolean;
}

export default function AdSlot({ isReady = true }: AdSlotProps) {
    const isProd = import.meta.env.PROD;

    // Temporarily disabled for AdSense appeal
    if (isProd) return null;

    if (!isReady) return null;

    // Development placeholder
    return (
        <div className="my-8 flex items-center justify-center rounded-[30px] border border-dashed border-dark-gray/20 bg-soft-cream/30 px-5 py-6 sm:px-7">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-soft-gray">Advertisement</p>
        </div>
    );
}
