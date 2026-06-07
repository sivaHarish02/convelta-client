export default function LoadingScreen() {
    return (
        <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh]">
            <div className="relative flex items-center justify-center">
                {/* Outer pulsing ring */}
                <div className="absolute inset-0 rounded-full border-4 border-light-aqua/20 animate-ping" />
                
                {/* Inner spinning ring */}
                <div className="relative w-12 h-12 rounded-full border-4 border-soft-gray/30 border-t-peach-orange animate-spin" />
            </div>
            <p className="mt-6 text-sm font-medium text-dark-gray tracking-widest uppercase animate-pulse">
                Loading
            </p>
        </div>
    )
}
