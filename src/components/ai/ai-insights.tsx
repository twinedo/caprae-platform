"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
	SparklesIcon,
	ChartBarIcon,
	ArrowTrendingUpIcon,
	ArrowTrendingDownIcon,
	UserGroupIcon,
	GlobeAltIcon,
	BanknotesIcon,
	LightBulbIcon,
	ExclamationTriangleIcon,
	InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/design-system";

interface MarketInsight {
	id: string;
	type: "trend" | "opportunity" | "warning" | "tip";
	title: string;
	description: string;
	impact: "high" | "medium" | "low";
	category: "market" | "pricing" | "competition" | "regulation";
	timestamp: Date;
	confidence: number;
	source: string;
}

interface AIInsightsProps {
	userType: "buyer" | "seller";
	insights?: MarketInsight[];
	marketMetrics?: {
		averageDealSize: number;
		averageTimeToClose: number;
		successRate: number;
		marketTrend: "up" | "down" | "stable";
		hotSectors: string[];
		pricingTrends: {
			sector: string;
			change: number;
			trend: "up" | "down";
		}[];
	};
}

const mockInsights: MarketInsight[] = [
	{
		id: "1",
		type: "opportunity",
		title: "SaaS Valuations Trending Up",
		description:
			"SaaS companies are seeing 15% higher valuations this quarter due to renewed investor confidence in recurring revenue models.",
		impact: "high",
		category: "market",
		timestamp: new Date(Date.now() - 3600000),
		confidence: 94,
		source: "Market Analysis AI",
	},
	{
		id: "2",
		type: "warning",
		title: "Regulatory Changes in Healthcare",
		description:
			"New healthcare compliance requirements may impact valuations for healthcare-related businesses. Consider due diligence timing.",
		impact: "medium",
		category: "regulation",
		timestamp: new Date(Date.now() - 7200000),
		confidence: 87,
		source: "Legal Intelligence",
	},
	{
		id: "3",
		type: "trend",
		title: "Remote Work Business Premium",
		description:
			"Businesses with strong remote work capabilities are commanding 8-12% premium in current market conditions.",
		impact: "medium",
		category: "market",
		timestamp: new Date(Date.now() - 10800000),
		confidence: 91,
		source: "Trend Analysis",
	},
	{
		id: "4",
		type: "tip",
		title: "Optimal Deal Timing",
		description:
			"Based on seasonal patterns, Q2 shows 23% higher deal success rates compared to Q1. Consider timing for maximum impact.",
		impact: "low",
		category: "pricing",
		timestamp: new Date(Date.now() - 14400000),
		confidence: 89,
		source: "Seasonal Analytics",
	},
];

const mockMarketMetrics = {
	averageDealSize: 1850000,
	averageTimeToClose: 67,
	successRate: 73,
	marketTrend: "up" as const,
	hotSectors: ["SaaS", "Healthcare Technology", "E-commerce", "FinTech"],
	pricingTrends: [
		{ sector: "SaaS", change: 15, trend: "up" as const },
		{ sector: "Manufacturing", change: -3, trend: "down" as const },
		{ sector: "E-commerce", change: 8, trend: "up" as const },
		{ sector: "Healthcare", change: 12, trend: "up" as const },
	],
};

const insightTypeConfig = {
	trend: {
		icon: ArrowTrendingUpIcon,
		color: "text-blue-600",
		bgColor: "bg-blue-50",
		borderColor: "border-blue-200",
	},
	opportunity: {
		icon: LightBulbIcon,
		color: "text-success-600",
		bgColor: "bg-success-50",
		borderColor: "border-success-200",
	},
	warning: {
		icon: ExclamationTriangleIcon,
		color: "text-warning-600",
		bgColor: "bg-warning-50",
		borderColor: "border-warning-200",
	},
	tip: {
		icon: InformationCircleIcon,
		color: "text-primary-600",
		bgColor: "bg-primary-50",
		borderColor: "border-primary-200",
	},
};

const impactConfig = {
	high: { label: "High Impact", color: "text-error-600" },
	medium: { label: "Medium Impact", color: "text-warning-600" },
	low: { label: "Low Impact", color: "text-success-600" },
};

export function AIInsights({
	userType,
	insights = mockInsights,
	marketMetrics = mockMarketMetrics,
}: AIInsightsProps) {
	const [selectedCategory, setSelectedCategory] = useState<string>("all");

	const categories = ["all", "market", "pricing", "competition", "regulation"];

	const filteredInsights = insights.filter(
		(insight) => selectedCategory === "all" || insight.category === selectedCategory,
	);

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}).format(amount);
	};

	const formatTimeAgo = (date: Date) => {
		const now = new Date();
		const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
		
		if (diffInHours < 1) return "Just now";
		if (diffInHours < 24) return `${diffInHours}h ago`;
		return `${Math.floor(diffInHours / 24)}d ago`;
	};

	return (
		<div className="space-y-6">
			{/* Market Overview */}
			<Card className="bg-gradient-to-br from-primary-500 to-secondary-500">
				<CardHeader>
					<CardTitle className="text-white flex items-center space-x-2">
						<SparklesIcon className="h-6 w-6" />
						<span>AI Market Intelligence</span>
						<div className="ml-auto flex items-center space-x-1">
							<div className="w-2 h-2 bg-success-400 rounded-full animate-pulse" />
							<span className="text-sm text-primary-100">Live</span>
						</div>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
						<div className="text-center">
							<div className="text-2xl font-bold text-white">
								{formatCurrency(marketMetrics.averageDealSize)}
							</div>
							<div className="text-primary-100 text-sm">Avg Deal Size</div>
						</div>
						<div className="text-center">
							<div className="text-2xl font-bold text-white">
								{marketMetrics.averageTimeToClose}d
							</div>
							<div className="text-primary-100 text-sm">Avg Time to Close</div>
						</div>
						<div className="text-center">
							<div className="text-2xl font-bold text-white">
								{marketMetrics.successRate}%
							</div>
							<div className="text-primary-100 text-sm">Success Rate</div>
						</div>
						<div className="text-center">
							<div className="flex items-center justify-center space-x-1">
								<span className="text-2xl font-bold text-white">Market</span>
								{marketMetrics.marketTrend === "up" ? (
									<ArrowTrendingUpIcon className="h-6 w-6 text-success-300" />
								) : (
									<ArrowTrendingDownIcon className="h-6 w-6 text-error-300" />
								)}
							</div>
							<div className="text-primary-100 text-sm">Overall Trend</div>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Hot Sectors & Pricing Trends */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center space-x-2">
							<GlobeAltIcon className="h-5 w-5 text-primary-500" />
							<span>Hot Sectors</span>
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-2 gap-3">
							{marketMetrics.hotSectors.map((sector, index) => (
								<motion.div
									key={sector}
									initial={{ opacity: 0, scale: 0.9 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ delay: index * 0.1 }}
									className="p-3 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-lg border border-primary-100"
								>
									<div className="text-sm font-medium text-neutral-900">{sector}</div>
									<div className="text-xs text-primary-600 flex items-center space-x-1">
										<ArrowTrendingUpIcon className="h-3 w-3" />
										<span>Trending</span>
									</div>
								</motion.div>
							))}
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center space-x-2">
							<ChartBarIcon className="h-5 w-5 text-secondary-500" />
							<span>Pricing Trends</span>
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-3">
							{marketMetrics.pricingTrends.map((trend, index) => (
								<motion.div
									key={trend.sector}
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: index * 0.1 }}
									className="flex items-center justify-between"
								>
									<span className="text-sm text-neutral-700">{trend.sector}</span>
									<div className="flex items-center space-x-2">
										<span
											className={cn(
												"text-sm font-semibold",
												trend.trend === "up" ? "text-success-600" : "text-error-600",
											)}
										>
											{trend.change > 0 ? "+" : ""}{trend.change}%
										</span>
										{trend.trend === "up" ? (
											<ArrowTrendingUpIcon className="h-4 w-4 text-success-500" />
										) : (
											<ArrowTrendingDownIcon className="h-4 w-4 text-error-500" />
										)}
									</div>
								</motion.div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Category Filter */}
			<div className="flex space-x-2 overflow-x-auto pb-2">
				{categories.map((category) => (
					<Button
						key={category}
						variant={selectedCategory === category ? "primary" : "outline"}
						size="sm"
						onClick={() => setSelectedCategory(category)}
						className="flex-shrink-0 capitalize"
					>
						{category}
					</Button>
				))}
			</div>

			{/* Insights Feed */}
			<div className="space-y-4">
				<div className="flex items-center justify-between">
					<h3 className="text-lg font-semibold text-neutral-900">
						AI Insights {userType === "buyer" ? "for Buyers" : "for Sellers"}
					</h3>
					<Button
						variant="ghost"
						size="sm"
						leftIcon={<SparklesIcon className="h-4 w-4" />}
					>
						Refresh
					</Button>
				</div>

				{filteredInsights.map((insight, index) => {
					const config = insightTypeConfig[insight.type];
					const IconComponent = config.icon;
					const impactInfo = impactConfig[insight.impact];

					return (
						<motion.div
							key={insight.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.1 }}
						>
							<Card
								variant="interactive"
								className={cn("border-l-4", config.borderColor)}
							>
								<CardContent className="p-4">
									<div className="flex items-start space-x-4">
										<div className={cn("p-2 rounded-lg", config.bgColor)}>
											<IconComponent className={cn("h-5 w-5", config.color)} />
										</div>
										<div className="flex-1 space-y-2">
											<div className="flex items-center justify-between">
												<h4 className="font-semibold text-neutral-900">
													{insight.title}
												</h4>
												<div className="flex items-center space-x-2">
													<span className={cn("text-xs font-medium", impactInfo.color)}>
														{impactInfo.label}
													</span>
													<span className="text-xs text-neutral-500">
														{formatTimeAgo(insight.timestamp)}
													</span>
												</div>
											</div>
											<p className="text-sm text-neutral-600">{insight.description}</p>
											<div className="flex items-center justify-between">
												<div className="flex items-center space-x-2">
													<span className="text-xs text-neutral-500">
														Source: {insight.source}
													</span>
													<span className="text-xs text-neutral-400">•</span>
													<div className="flex items-center space-x-1">
														<span className="text-xs text-neutral-500">Confidence:</span>
														<div className="flex items-center space-x-1">
															<div className="w-12 h-1.5 bg-neutral-200 rounded-full overflow-hidden">
																<motion.div
																	className="h-full bg-gradient-to-r from-primary-500 to-success-500"
																	initial={{ width: 0 }}
																	animate={{ width: `${insight.confidence}%` }}
																	transition={{ duration: 1, delay: index * 0.1 }}
																/>
															</div>
															<span className="text-xs font-medium text-neutral-700">
																{insight.confidence}%
															</span>
														</div>
													</div>
												</div>
												<span className="text-xs text-neutral-500 capitalize">
													{insight.category}
												</span>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						</motion.div>
					);
				})}
			</div>

			{/* Personalized Recommendations */}
			<Card className="bg-gradient-to-br from-secondary-50 to-primary-50">
				<CardHeader>
					<CardTitle className="flex items-center space-x-2">
						<UserGroupIcon className="h-5 w-5 text-secondary-500" />
						<span>Personalized for {userType === "buyer" ? "Buyers" : "Sellers"}</span>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-3">
						{userType === "buyer" ? (
							<>
								<div className="flex items-start space-x-3">
									<div className="w-2 h-2 bg-secondary-500 rounded-full mt-2" />
									<div>
										<h5 className="font-medium text-neutral-900">Optimal Deal Timing</h5>
										<p className="text-sm text-neutral-600">
											Based on your investment profile, Q2 presents the best opportunities with 23% higher success rates.
										</p>
									</div>
								</div>
								<div className="flex items-start space-x-3">
									<div className="w-2 h-2 bg-secondary-500 rounded-full mt-2" />
									<div>
										<h5 className="font-medium text-neutral-900">Budget Optimization</h5>
										<p className="text-sm text-neutral-600">
											Consider increasing your budget range by 15% to access premium SaaS opportunities in the current market.
										</p>
									</div>
								</div>
							</>
						) : (
							<>
								<div className="flex items-start space-x-3">
									<div className="w-2 h-2 bg-secondary-500 rounded-full mt-2" />
									<div>
										<h5 className="font-medium text-neutral-900">Valuation Enhancement</h5>
										<p className="text-sm text-neutral-600">
											Your business profile suggests 12% above-market valuation potential. Highlight your remote work capabilities.
										</p>
									</div>
								</div>
								<div className="flex items-start space-x-3">
									<div className="w-2 h-2 bg-secondary-500 rounded-full mt-2" />
									<div>
										<h5 className="font-medium text-neutral-900">Market Timing</h5>
										<p className="text-sm text-neutral-600">
											List your business now to take advantage of the current 15% SaaS valuation premium.
										</p>
									</div>
								</div>
							</>
						)}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}