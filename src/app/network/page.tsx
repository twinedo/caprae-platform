"use client";

import { ComingSoon } from "@/components/ui/coming-soon";
import { UsersIcon } from "@heroicons/react/24/outline";

export default function NetworkPage() {
	return (
		<ComingSoon
			title="Professional Network"
			description="Connect with like-minded entrepreneurs, investors, and industry experts. Build valuable relationships that can accelerate your business acquisition journey and provide ongoing support."
			icon={UsersIcon}
			expectedFeatures={[
				"Connect with verified buyers and sellers",
				"Join industry-specific discussion groups",
				"Access mentorship from experienced acquirers",
				"Attend virtual networking events and webinars",
				"Direct messaging with network members",
				"Reputation system based on successful deals",
				"Industry expert Q&A sessions",
				"Regional meetups and conferences"
			]}
			expectedDate="Q3 2025"
		/>
	);
}