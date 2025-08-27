"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
	SparklesIcon,
	ArrowTrendingUpIcon,
	ShieldCheckIcon,
	ExclamationTriangleIcon,
	LightBulbIcon,
	ChartBarIcon,
	BanknotesIcon,
	ClockIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/design-system";

interface DealOptimization {
	dealValue: number;
	riskScore: number;
	successProbability: number;
	timeToClose: number;
	recommendations: {
		id: string;
		type: "pricing" | "structure" | "timeline" | "risk";
		priority: "high" | "medium" | "low";
		title: string;
		description: string;
		impact: string;
		effort: "low" | "medium" | "high";
	}[];
	risks: {
		id: string;
		category: string;
		severity: "low" | "medium" | "high";
		description: string;
		mitigation: string;
		probability: number;
	}[];
	insights: {
		pricing: {
			suggestedRange: { min: number; max: number };
			marketComparison: string;
			reasoning: string;
		};
		structure: {
			recommended: string;
			alternatives: string[];
			taxImplications: string;
		};
		timeline: {
			optimized: number;
			factors: string[];
		};
	};
}

interface DealOptimizerProps {
	optimization?: DealOptimization;
	dealId?: string;
	onOptimize?: () => void;
}

const mockOptimization: DealOptimization = {
	dealValue: 2500000,
	riskScore: 6.2,
	successProbability: 87,
	timeToClose: 45,
	recommendations: [
		{
			id: "1",
			type: "pricing",
			priority: "high",
			title: "Optimize Valuation Multiple",
			description:
				"Based on industry comparables, current 4.2x EBITDA multiple could be increased to 4.8x given strong market position.",
			impact: "+$380k deal value",
			effort: "medium",
		},
		{
			id: "2",
			type: "structure",
			priority: "high",
			title: "Asset Purchase Structure",
			description:
				"Asset purchase instead of stock sale reduces buyer's liability exposure and improves tax efficiency.",
			impact: "15% faster close",
			effort: "low",
		},
		{
			id: "3",
			type: "timeline",
			priority: "medium",
			title: "Parallel Due Diligence",
			description:
				"Run financial and legal DD simultaneously to reduce timeline by 2-3 weeks.",
			impact: "-21 days",
			effort: "low",
		},
		{
			id: "4",
			type: "risk",
			priority: "medium",
			title: "Customer Concentration Risk",
			description:
				"Negotiate customer retention guarantees or earnout structure to mitigate concentration risk.",
			impact: "Risk score -1.2",
			effort: "medium",
		},
	],
	risks: [
		{
			id: "1",
			category: "Financial",
			severity: "medium",
			description: "Customer concentration (top 3 customers = 45% revenue)",
			mitigation: "Negotiate 12-month customer retention guarantees",
			probability: 35,
		},
		{
			id: "2",
			category: "Market",
			severity: "low",
			description: "Seasonal revenue fluctuations in Q1",
			mitigation: "Structure payment terms to account for seasonality",
			probability: 20,
		},
		{
			id: "3",
			category: "Legal",
			severity: "low",
			description: "Two major contracts expire within 6 months",
			mitigation: "Require contract renewals as closing condition",
			probability: 15,
		},
	],
	insights: {
		pricing: {
			suggestedRange: { min: 2400000, max: 2800000 },
			marketComparison: "15% above industry median due to strong growth profile",
			reasoning:
				"Company's 23% YoY growth and improving margins justify premium valuation",
		},
		structure: {
			recommended: "Asset Purchase with 20% earnout",
			alternatives: ["Stock Sale", "Merger", "Management Buyout"],
			taxImplications: "Asset structure provides step-up basis for buyer",
		},
		timeline: {
			optimized: 38,
			factors: [
				"Clean financial records",
				"Experienced management team",
				"No pending litigation",
			],
		},
	},
};

const priorityConfig = {
	high: {
		color: "text-error-600",
		bgColor: "bg-error-50",
		borderColor: "border-error-200",
	},
	medium: {
		color: "text-warning-600",
		bgColor: "bg-warning-50",
		borderColor: "border-warning-200",
	},
	low: {
		color: "text-success-600",
		bgColor: "bg-success-50",
		borderColor: "border-success-200",
	},
};

const severityConfig = {
	high: { color: "text-error-600", bgColor: "bg-error-50" },
	medium: { color: "text-warning-600", bgColor: "bg-warning-50" },
	low: { color: "text-success-600", bgColor: "bg-success-50" },
};

const typeIcons = {
	pricing: BanknotesIcon,
	structure: ChartBarIcon,
	timeline: ClockIcon,
	risk: ShieldCheckIcon,
};

export function DealOptimizer({
	optimization = mockOptimization,
	onOptimize,
}: DealOptimizerProps) {
	const [activeTab, setActiveTab] = useState<
		"overview" | "recommendations" | "risks" | "insights"
	>("overview");

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}).format(amount);
	};

	return (
		<div className="space-y-6">
			{/* Header with Key Metrics */}
			<Card className="bg-gradient-to-br from-primary-500 to-secondary-500">
				<CardHeader>
					<CardTitle className="text-white flex items-center space-x-2">
						<SparklesIcon className="h-6 w-6" />
						<span>AI Deal Optimization</span>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
						<div className="text-center">
							<div className="text-2xl font-bold text-white">
								{formatCurrency(optimization.dealValue)}
							</div>
							<div className="text-primary-100 text-sm">Deal Value</div>
						</div>
						<div className="text-center">
							<div className="text-2xl font-bold text-white">
								{optimization.successProbability}%
							</div>
							<div className="text-primary-100 text-sm">Success Probability</div>
						</div>
						<div className="text-center">
							<div className="text-2xl font-bold text-white">
								{optimization.timeToClose} days
							</div>
							<div className="text-primary-100 text-sm">Time to Close</div>
						</div>
						<div className="text-center">
							<div className="text-2xl font-bold text-white">
								{optimization.riskScore}/10
							</div>
							<div className="text-primary-100 text-sm">Risk Score</div>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Tabs */}
			<div className="border-b border-neutral-200">
				<nav className="flex space-x-8">
					{[
						{ id: "overview", label: "Overview", icon: ChartBarIcon },
						{ id: "recommendations", label: "Recommendations", icon: LightBulbIcon },
						{ id: "risks", label: "Risk Analysis", icon: ExclamationTriangleIcon },
						{ id: "insights", label: "AI Insights", icon: SparklesIcon },
					].map((tab) => (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id as "overview" | "recommendations" | "risks" | "insights")}
							className={cn(
								"flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors",
								activeTab === tab.id
									? "border-primary-500 text-primary-600"
									: "border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300",
							)}
						>
							<tab.icon className="h-4 w-4" />
							<span>{tab.label}</span>
						</button>
					))}
				</nav>
			</div>

			{/* Tab Content */}
			<motion.div
				key={activeTab}
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3 }}
			>
				{activeTab === "overview" && (
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* Success Factors */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center space-x-2">
									<ArrowTrendingUpIcon className="h-5 w-5 text-success-500" />
									<span>Success Factors</span>
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-3">
									{[
										"Strong financial performance (+23% YoY growth)",
										"Experienced management team",
										"Clean legal structure",
										"Growing market segment",
									].map((factor, index) => (
										<div key={index} className="flex items-center space-x-2">
											<div className="w-2 h-2 bg-success-500 rounded-full" />
											<span className="text-sm text-neutral-600">{factor}</span>
										</div>
									))}
								</div>
							</CardContent>
						</Card>

						{/* Optimization Potential */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center space-x-2">
									<SparklesIcon className="h-5 w-5 text-primary-500" />
									<span>Optimization Potential</span>
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div className="flex justify-between items-center">
										<span className="text-sm text-neutral-600">Value Upside</span>
										<span className="font-semibold text-success-600">+$380k</span>
									</div>
									<div className="flex justify-between items-center">
										<span className="text-sm text-neutral-600">Time Reduction</span>
										<span className="font-semibold text-primary-600">-7 days</span>
									</div>
									<div className="flex justify-between items-center">
										<span className="text-sm text-neutral-600">Risk Mitigation</span>
										<span className="font-semibold text-warning-600">-1.2 points</span>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				)}

				{activeTab === "recommendations" && (
					<div className="space-y-4">
						{optimization.recommendations.map((rec) => {
							const config = priorityConfig[rec.priority];
							const IconComponent = typeIcons[rec.type];

							return (
								<Card key={rec.id} className="border border-neutral-200">
									<CardContent className="p-4">
										<div className="flex items-start space-x-4">
											<div
												className={cn(
													"p-2 rounded-lg",
													config.bgColor,
												)}
											>
												<IconComponent
													className={cn("h-5 w-5", config.color)}
												/>
											</div>
											<div className="flex-1">
												<div className="flex items-center justify-between mb-2">
													<h4 className="font-semibold text-neutral-900">
														{rec.title}
													</h4>
													<span
														className={cn(
															"px-2 py-1 rounded-full text-xs font-medium",
															config.bgColor,
															config.color,
														)}
													>
														{rec.priority} priority
													</span>
												</div>
												<p className="text-sm text-neutral-600 mb-3">
													{rec.description}
												</p>
												<div className="flex items-center justify-between">
													<span className="text-sm font-medium text-success-600">
														{rec.impact}
													</span>
													<span className="text-xs text-neutral-500">
														{rec.effort} effort
													</span>
												</div>
											</div>
										</div>
									</CardContent>
								</Card>
							);
						})}
					</div>
				)}

				{activeTab === "risks" && (
					<div className="space-y-4">
						{optimization.risks.map((risk) => {
							const config = severityConfig[risk.severity];

							return (
								<Card key={risk.id} className="border border-neutral-200">
									<CardContent className="p-4">
										<div className="flex items-start space-x-4">
											<div
												className={cn(
													"p-2 rounded-lg",
													config.bgColor,
												)}
											>
												<ExclamationTriangleIcon
													className={cn("h-5 w-5", config.color)}
												/>
											</div>
											<div className="flex-1">
												<div className="flex items-center justify-between mb-2">
													<h4 className="font-semibold text-neutral-900">
														{risk.category} Risk
													</h4>
													<div className="flex items-center space-x-2">
														<span
															className={cn(
																"px-2 py-1 rounded-full text-xs font-medium",
																config.bgColor,
																config.color,
															)}
														>
															{risk.severity}
														</span>
														<span className="text-xs text-neutral-500">
															{risk.probability}% probability
														</span>
													</div>
												</div>
												<p className="text-sm text-neutral-600 mb-2">
													{risk.description}
												</p>
												<div className="bg-neutral-50 rounded-lg p-3">
													<h5 className="text-xs font-medium text-neutral-700 mb-1">
														Mitigation Strategy
													</h5>
													<p className="text-sm text-neutral-600">
														{risk.mitigation}
													</p>
												</div>
											</div>
										</div>
									</CardContent>
								</Card>
							);
						})}
					</div>
				)}

				{activeTab === "insights" && (
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						{/* Pricing Insights */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center space-x-2">
									<BanknotesIcon className="h-5 w-5 text-primary-500" />
									<span>Pricing Analysis</span>
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div>
										<div className="text-sm text-neutral-600 mb-1">
											Suggested Range
										</div>
										<div className="text-lg font-semibold text-neutral-900">
											{formatCurrency(optimization.insights.pricing.suggestedRange.min)} -{" "}
											{formatCurrency(optimization.insights.pricing.suggestedRange.max)}
										</div>
									</div>
									<div>
										<div className="text-sm text-neutral-600 mb-1">
											Market Comparison
										</div>
										<div className="text-sm text-neutral-800">
											{optimization.insights.pricing.marketComparison}
										</div>
									</div>
									<div>
										<div className="text-sm text-neutral-600 mb-1">
											AI Reasoning
										</div>
										<div className="text-sm text-neutral-800">
											{optimization.insights.pricing.reasoning}
										</div>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Structure Insights */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center space-x-2">
									<ChartBarIcon className="h-5 w-5 text-secondary-500" />
									<span>Deal Structure</span>
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div>
										<div className="text-sm text-neutral-600 mb-1">
											Recommended Structure
										</div>
										<div className="text-lg font-semibold text-neutral-900">
											{optimization.insights.structure.recommended}
										</div>
									</div>
									<div>
										<div className="text-sm text-neutral-600 mb-1">
											Alternatives
										</div>
										<div className="flex flex-wrap gap-2">
											{optimization.insights.structure.alternatives.map((alt, index) => (
												<span
													key={index}
													className="px-2 py-1 bg-neutral-100 rounded-full text-xs text-neutral-700"
												>
													{alt}
												</span>
											))}
										</div>
									</div>
									<div>
										<div className="text-sm text-neutral-600 mb-1">
											Tax Implications
										</div>
										<div className="text-sm text-neutral-800">
											{optimization.insights.structure.taxImplications}
										</div>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Timeline Insights */}
						<Card className="lg:col-span-2">
							<CardHeader>
								<CardTitle className="flex items-center space-x-2">
									<ClockIcon className="h-5 w-5 text-success-500" />
									<span>Timeline Optimization</span>
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<div className="text-sm text-neutral-600 mb-1">
											Optimized Timeline
										</div>
										<div className="text-3xl font-bold text-success-600 mb-2">
											{optimization.insights.timeline.optimized} days
										</div>
										<div className="text-sm text-neutral-600">
											vs {optimization.timeToClose} days current estimate
										</div>
									</div>
									<div>
										<div className="text-sm text-neutral-600 mb-2">
											Acceleration Factors
										</div>
										<div className="space-y-1">
											{optimization.insights.timeline.factors.map((factor, index) => (
												<div key={index} className="flex items-center space-x-2">
													<div className="w-1.5 h-1.5 bg-success-500 rounded-full" />
													<span className="text-sm text-neutral-700">{factor}</span>
												</div>
											))}
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				)}
			</motion.div>

			{/* Action Button */}
			<div className="flex justify-end">
				<Button
					onClick={onOptimize}
					leftIcon={<SparklesIcon className="h-4 w-4" />}
					variant="primary"
				>
					Regenerate Analysis
				</Button>
			</div>
		</div>
	);
}