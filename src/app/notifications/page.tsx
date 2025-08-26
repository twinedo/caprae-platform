"use client";

import { ComingSoon } from "@/components/ui/coming-soon";
import { BellIcon } from "@heroicons/react/24/outline";

export default function NotificationsPage() {
	return (
		<ComingSoon
			title="Smart Notifications"
			description="Stay informed with intelligent notifications about deal updates, new opportunities, and important milestones. Never miss a critical moment in your acquisition journey."
			icon={BellIcon}
			expectedFeatures={[
				"Real-time deal status updates",
				"New listing alerts based on your criteria",
				"Deadline and milestone reminders",
				"Price change notifications",
				"Message and communication alerts",
				"Custom notification preferences",
				"Mobile push notifications",
				"Weekly digest and summary reports"
			]}
			expectedDate="Q1 2025"
		/>
	);
}