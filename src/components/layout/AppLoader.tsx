'use client';

import { Plant } from '@phosphor-icons/react';

export default function AppLoader() {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/80 backdrop-blur-sm">
            <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                    <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
                    <div className="relative bg-white p-4 rounded-full shadow-lg border-2 border-primary/10">
                        <Plant size={40} weight="fill" className="h-10 w-10 text-primary animate-bounce" />
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <h2 className="text-xl font-bold text-primary font-display tracking-widest">AGRODYKE</h2>
                    <div className="flex space-x-1 mt-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary animate-[bounce_1s_infinite_100ms]" />
                        <div className="h-1.5 w-1.5 rounded-full bg-primary animate-[bounce_1s_infinite_200ms]" />
                        <div className="h-1.5 w-1.5 rounded-full bg-primary animate-[bounce_1s_infinite_300ms]" />
                    </div>
                </div>
            </div>
        </div>
    );
}
