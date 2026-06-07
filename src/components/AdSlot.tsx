export default function AdSlot() {
    return (
        <div className="my-8 overflow-hidden rounded-[30px] border border-dark-gray/10 bg-gradient-to-r from-warm-beige/90 via-soft-cream to-white px-5 py-6 shadow-[0_14px_28px_rgba(14,30,37,0.05)] sm:px-7">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-peach-orange">Sponsored space</p>
                    <p className="mt-2 text-sm font-medium text-dark-navy sm:text-base">
                        Premium ad placement reserved for partners and promotions.
                    </p>
                </div>
                <div className="rounded-2xl border border-dark-gray/10 bg-white/70 px-4 py-3 text-left text-xs text-soft-gray sm:min-w-[220px]">
                    Responsive placement
                    <div className="mt-1 text-dark-gray">Optimized for mobile and desktop layouts.</div>
                </div>
            </div>
        </div>
    )
}
