"use client";

import { MainNavigation } from "@/components/navigation/main-nav";

interface PageLayoutProps {
	children: React.ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
	return (
		<div className="min-h-screen bg-neutral-50">
			<MainNavigation />
			
			{/* Main Content */}
			<div className="lg:pl-72">
				<main className="min-h-screen">
					{children}
				</main>
			</div>
		</div>
	);
}