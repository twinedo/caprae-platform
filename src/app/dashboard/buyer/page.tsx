"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AIInsights } from "@/components/ai/ai-insights";
import { BusinessValuator } from "@/components/ai/business-valuator";
import {
	HeartIcon,
	BellIcon,
	MagnifyingGlassIcon,
	ChartBarIcon,
	BanknotesIcon,
	SparklesIcon,
	ArrowTrendingUpIcon,
	HandRaisedIcon,
	DocumentTextIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/design-system";

interface DealOpportunity {
	id: string;
	businessName: string;
	industry: string;
	revenue: string;
	growthRate: number;
	location: string;
	matchScore: number;
	price: string;
	status: "new" | "reviewing" | "negotiating" | "closed";
	sellerName: string;
	highlights: string[];
}

const mockDeals: DealOpportunity[] = [
	{
		id: "1",
		businessName: "TechFlow Solutions",
		industry: "SaaS",
		revenue: "$1.2M",
		growthRate: 23,
		location: "Austin, TX",
		matchScore: 94,
		price: "$2.8M",
		status: "negotiating",
		sellerName: "Mike Johnson",
		highlights: ["Growing market", "Recurring revenue", "Strong team"],
	},
	{
		id: "2",
		businessName: "EcoCommerce",
		industry: "E-commerce",
		revenue: "$950K",
		growthRate: 31,
		location: "Denver, CO",
		matchScore: 87,
		price: "$1.9M",
		status: "reviewing",
		sellerName: "Amanda Rodriguez",
		highlights: ["Sustainable products", "High margins", "Loyal customers"],
	},
	{
		id: "3",
		businessName: "PayFlow Systems",
		industry: "FinTech",
		revenue: "$2.1M",
		growthRate: 18,
		location: "San Francisco, CA",
		matchScore: 91,
		price: "$4.2M",
		status: "new",
		sellerName: "David Kim",
		highlights: ["Fintech expertise", "Regulatory compliance", "B2B focus"],
	},
];

const statusConfig = {
	new: { color: "text-blue-600", bg: "bg-blue-100", label: "New" },
	reviewing: { color: "text-yellow-600", bg: "bg-yellow-100", label: "Reviewing" },
	negotiating: { color: "text-orange-600", bg: "bg-orange-100", label: "Negotiating" },
	closed: { color: "text-success-600", bg: "bg-success-100", label: "Closed" },
};

export default function BuyerDashboard() {
	const [activeTab, setActiveTab] = useState<"deals" | "insights" | "valuation">("deals");

	return (
		<div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
			{/* Navigation */}
			<nav className="border-b border-neutral-200/50 bg-white/80 backdrop-blur-sm">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="flex h-16 items-center justify-between">
						<Link href="/" className="flex items-center space-x-2">
							<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500">
								<HeartIcon className="h-5 w-5 text-white" />
							</div>
							<span className="text-xl font-bold gradient-text">Caprae</span>
						</Link>

						<div className="flex items-center space-x-4">
							<Button variant="ghost" size="sm" className="relative">
								<BellIcon className="h-5 w-5" />
								<span className="absolute -top-1 -right-1 h-4 w-4 bg-error-500 rounded-full text-xs text-white flex items-center justify-center">
									7
								</span>
							</Button>
							<div className="text-sm text-neutral-600">
								Welcome back, <strong>Sarah Chen</strong>
							</div>
						</div>
					</div>
				</div>
			</nav>

			<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
				{/* Dashboard Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="mb-8"
				>
					<div className="flex items-center justify-between mb-6">
						<div>
							<h1 className="text-3xl font-bold text-neutral-900 mb-2">
								Buyer Dashboard
							</h1>
							<p className="text-neutral-600">
								Discover, analyze, and acquire businesses with AI-powered insights
							</p>
						</div>
						<Button leftIcon={<MagnifyingGlassIcon className="h-4 w-4" />}>
							Find Opportunities
						</Button>
					</div>

					{/* Key Metrics */}
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
						<Card>
							<CardContent className="p-4 text-center">
								<ChartBarIcon className="h-8 w-8 mx-auto text-primary-500 mb-2" />
								<div className="text-2xl font-bold text-neutral-900">
									{mockDeals.length}
								</div>
								<div className="text-sm text-neutral-600">Active Deals</div>
							</CardContent>
						</Card>

						<Card>
							<CardContent className="p-4 text-center">
								<BanknotesIcon className="h-8 w-8 mx-auto text-secondary-500 mb-2" />
								<div className="text-2xl font-bold text-neutral-900">
									$1M - $5M
								</div>
								<div className="text-sm text-neutral-600">Budget Range</div>
							</CardContent>
						</Card>

						<Card>
							<CardContent className="p-4 text-center">
								<HandRaisedIcon className="h-8 w-8 mx-auto text-success-500 mb-2" />
								<div className="text-2xl font-bold text-neutral-900">
									8
								</div>
								<div className="text-sm text-neutral-600">Deals Closed</div>
							</CardContent>
						</Card>

						<Card>
							<CardContent className="p-4 text-center">
								<DocumentTextIcon className="h-8 w-8 mx-auto text-warning-500 mb-2" />
								<div className="text-2xl font-bold text-neutral-900">
									3
								</div>
								<div className="text-sm text-neutral-600">Active LOIs</div>
							</CardContent>
						</Card>
					</div>
				</motion.div>

				{/* Navigation Tabs */}
				<div className="border-b border-neutral-200 mb-6">
					<nav className="flex space-x-8">
						{[
							{ id: "deals", label: "Deal Opportunities", icon: ChartBarIcon },
							{ id: "insights", label: "AI Market Intelligence", icon: SparklesIcon },
							{ id: "valuation", label: "Business Valuator", icon: BanknotesIcon },
						].map((tab) => {
							const Icon = tab.icon;
							return (
								<button
									key={tab.id}
									onClick={() => setActiveTab(tab.id as any)}
									className={cn(
										"flex items-center space-x-2 py-4 px-1 border-b-2 transition-colors",
										activeTab === tab.id
											? "border-primary-500 text-primary-600"
											: "border-transparent text-neutral-500 hover:text-neutral-700",
									)}
								>
									<Icon className="h-5 w-5" />
									<span className="font-medium">{tab.label}</span>
								</button>
							);
						})}
					</nav>
				</div>

				{/* Tab Content */}
				{activeTab === "deals" && (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3 }}
						className="space-y-6"
					>
						<div className="flex items-center justify-between">
							<h2 className="text-xl font-semibold text-neutral-900">Deal Opportunities</h2>
							<div className="text-sm text-neutral-600">
								{mockDeals.length} opportunities • Sorted by match score
							</div>
						</div>

						<div className="grid gap-6">
							{mockDeals.map((deal, index) => {
								const statusInfo = statusConfig[deal.status];

								return (
									<motion.div
										key={deal.id}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: index * 0.1 }}
									>
										<Card variant="interactive" className="hover:shadow-lg transition-shadow">
											<CardContent className="p-6">
												<div className="flex items-start justify-between mb-4">
													<div className="flex-1">
														<div className="flex items-center space-x-3 mb-2">
															<h3 className="text-xl font-semibold text-neutral-900">
																{deal.businessName}
															</h3>
															<span className={cn(
																"px-2 py-1 rounded-full text-xs font-medium",
																statusInfo.bg,
																statusInfo.color,
															)}>
																{statusInfo.label}
															</span>
														</div>
														<div className="text-sm text-neutral-600 mb-3">
															{deal.industry} • {deal.location} • {deal.sellerName}
														</div>
														<div className="flex flex-wrap gap-2 mb-3">
															{deal.highlights.map((highlight, idx) => (
																<span
																	key={idx}
																	className="px-2 py-1 bg-primary-50 text-primary-700 rounded-lg text-xs"
																>
																	{highlight}
																</span>
															))}
														</div>
													</div>

													<div className="text-right">
														<div className="mb-2">
															<div className="text-2xl font-bold text-neutral-900">
																{deal.price}
															</div>
															<div className="text-sm text-neutral-600">
																{deal.revenue} revenue
															</div>
														</div>
														<div className="flex items-center space-x-2 text-sm">
															<ArrowTrendingUpIcon className="h-4 w-4 text-success-500" />
															<span className="text-success-600 font-medium">
																+{deal.growthRate}% YoY
															</span>
														</div>
													</div>
												</div>

												<div className="flex items-center justify-between">
													<div className="flex items-center space-x-2">
														<span className="text-sm text-neutral-600">Match Score:</span>
														<div className="flex items-center space-x-1">
															<div className="w-16 h-2 bg-neutral-200 rounded-full overflow-hidden">
																<motion.div
																	className="h-full bg-gradient-to-r from-primary-500 to-success-500"
																	initial={{ width: 0 }}
																	animate={{ width: `${deal.matchScore}%` }}
																	transition={{ duration: 1, delay: index * 0.1 }}
																/>
															</div>
															<span className="text-sm font-semibold text-neutral-900">
																{deal.matchScore}%
															</span>
														</div>
													</div>
													<div className="flex space-x-2">
														<Button variant="outline" size="sm">
															View Details
														</Button>
														<Link href={`/deal/${deal.id}`}>
															<Button size="sm">
																Review Deal
															</Button>
														</Link>
													</div>
												</div>
											</CardContent>
										</Card>
									</motion.div>
								);
							})}
						</div>
					</motion.div>
				)}

				{activeTab === "insights" && (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3 }}
					>
						<AIInsights userType="buyer" />
					</motion.div>
				)}

				{activeTab === "valuation" && (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3 }}
					>
						<BusinessValuator />
					</motion.div>
				)}
			</div>
		</div>
	);
}