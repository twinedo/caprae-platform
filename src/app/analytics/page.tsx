"use client";

import { ComingSoon } from "@/components/ui/coming-soon";
import { ChartBarIcon } from "@heroicons/react/24/outline";

export default function AnalyticsPage() {
	return (
		<ComingSoon
			title="Advanced Analytics"
			description="Get deep insights into market trends, deal performance, and investment opportunities. Make data-driven decisions with comprehensive analytics and AI-powered market intelligence."
			icon={ChartBarIcon}
			expectedFeatures={[
				"Market trend analysis and forecasting",
				"Deal performance tracking and metrics",
				"Investment portfolio analytics",
				"Industry benchmarking and comparisons",
				"AI-powered valuation models",
				"Risk assessment tools",
				"Custom dashboard and reports",
				"Real-time market intelligence"
			]}
			expectedDate="Q2 2025"
		/>
	);
}