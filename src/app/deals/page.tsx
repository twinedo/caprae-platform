"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageLayout } from "@/components/layout/page-layout";
import {
	DocumentTextIcon,
	ClockIcon,
	CheckCircleIcon,
	ExclamationTriangleIcon,
	BanknotesIcon,
	BuildingOfficeIcon,
	UserIcon,
	FunnelIcon,
	PlusIcon,
	EyeIcon,
	ChatBubbleLeftRightIcon
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/design-system";

interface Deal {
	id: string;
	businessName: string;
	sellerName: string;
	buyerName?: string;
	industry: string;
	value: string;
	status: "active" | "under_review" | "negotiating" | "closing" | "completed" | "cancelled";
	stage: string;
	progress: number;
	daysActive: number;
	lastActivity: string;
	location: string;
	revenue: string;
	priority: "high" | "medium" | "low";
}

const mockDeals: Deal[] = [
	{
		id: "1",
		businessName: "TechFlow Solutions",
		sellerName: "Mike Johnson",
		buyerName: "Sarah Chen",
		industry: "SaaS",
		value: "$2.8M",
		status: "negotiating",
		stage: "Due Diligence",
		progress: 75,
		daysActive: 23,
		lastActivity: "2 hours ago",
		location: "Austin, TX",
		revenue: "$1.2M",
		priority: "high"
	},
	{
		id: "2",
		businessName: "EcoCommerce",
		sellerName: "Amanda Rodriguez",
		buyerName: "David Kumar",
		industry: "E-commerce",
		value: "$1.9M",
		status: "under_review",
		stage: "Document Review",
		progress: 45,
		daysActive: 12,
		lastActivity: "1 day ago",
		location: "Denver, CO",
		revenue: "$950K",
		priority: "medium"
	},
	{
		id: "3",
		businessName: "PayFlow Systems",
		sellerName: "David Kim",
		industry: "FinTech",
		value: "$4.2M",
		status: "active",
		stage: "Initial Interest",
		progress: 20,
		daysActive: 5,
		lastActivity: "3 hours ago",
		location: "San Francisco, CA",
		revenue: "$2.1M",
		priority: "high"
	},
	{
		id: "4",
		businessName: "Local Logistics Co",
		sellerName: "Maria Santos",
		buyerName: "Tech Ventures LLC",
		industry: "Logistics",
		value: "$3.5M",
		status: "closing",
		stage: "Final Paperwork",
		progress: 95,
		daysActive: 67,
		lastActivity: "30 minutes ago",
		location: "Phoenix, AZ",
		revenue: "$1.8M",
		priority: "high"
	},
	{
		id: "5",
		businessName: "Creative Studio Plus",
		sellerName: "Alex Thompson",
		industry: "Creative Services",
		value: "$850K",
		status: "completed",
		stage: "Closed",
		progress: 100,
		daysActive: 89,
		lastActivity: "Completed 2 weeks ago",
		location: "Portland, OR",
		revenue: "$420K",
		priority: "low"
	}
];

const statusConfig = {
	active: { 
		color: "text-blue-600", 
		bg: "bg-blue-100", 
		label: "Active",
		icon: ClockIcon
	},
	under_review: { 
		color: "text-yellow-600", 
		bg: "bg-yellow-100", 
		label: "Under Review",
		icon: EyeIcon
	},
	negotiating: { 
		color: "text-orange-600", 
		bg: "bg-orange-100", 
		label: "Negotiating",
		icon: ChatBubbleLeftRightIcon
	},
	closing: { 
		color: "text-purple-600", 
		bg: "bg-purple-100", 
		label: "Closing",
		icon: DocumentTextIcon
	},
	completed: { 
		color: "text-success-600", 
		bg: "bg-success-100", 
		label: "Completed",
		icon: CheckCircleIcon
	},
	cancelled: { 
		color: "text-error-600", 
		bg: "bg-error-100", 
		label: "Cancelled",
		icon: ExclamationTriangleIcon
	}
};

const priorityConfig = {
	high: { color: "text-error-600", bg: "bg-error-100" },
	medium: { color: "text-warning-600", bg: "bg-warning-100" },
	low: { color: "text-neutral-600", bg: "bg-neutral-100" }
};

export default function DealsPage() {
	const [filter, setFilter] = useState<"all" | Deal["status"]>("all");
	const [sortBy, setSortBy] = useState<"value" | "activity" | "progress">("activity");

	const filteredDeals = mockDeals.filter(deal => 
		filter === "all" || deal.status === filter
	);

	const dealStats = {
		total: mockDeals.length,
		active: mockDeals.filter(d => ["active", "under_review", "negotiating", "closing"].includes(d.status)).length,
		completed: mockDeals.filter(d => d.status === "completed").length,
		totalValue: mockDeals.reduce((sum, deal) => sum + parseFloat(deal.value.replace(/[$M,]/g, "")), 0)
	};

	return (
		<PageLayout>
			<div className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 min-h-screen">
				<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
					{/* Header */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="mb-8"
					>
						<div className="flex items-center justify-between mb-6">
							<div>
								<h1 className="text-3xl font-bold text-neutral-900 mb-2">
									Deal Management
								</h1>
								<p className="text-neutral-600">
									Track and manage all your business acquisition deals in one place
								</p>
							</div>
							<Button leftIcon={<PlusIcon className="h-4 w-4" />}>
								New Deal
							</Button>
						</div>

						{/* Stats Cards */}
						<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
							<Card>
								<CardContent className="p-4 text-center">
									<DocumentTextIcon className="h-8 w-8 mx-auto text-primary-500 mb-2" />
									<div className="text-2xl font-bold text-neutral-900">{dealStats.total}</div>
									<div className="text-sm text-neutral-600">Total Deals</div>
								</CardContent>
							</Card>

							<Card>
								<CardContent className="p-4 text-center">
									<ClockIcon className="h-8 w-8 mx-auto text-orange-500 mb-2" />
									<div className="text-2xl font-bold text-neutral-900">{dealStats.active}</div>
									<div className="text-sm text-neutral-600">Active Deals</div>
								</CardContent>
							</Card>

							<Card>
								<CardContent className="p-4 text-center">
									<CheckCircleIcon className="h-8 w-8 mx-auto text-success-500 mb-2" />
									<div className="text-2xl font-bold text-neutral-900">{dealStats.completed}</div>
									<div className="text-sm text-neutral-600">Completed</div>
								</CardContent>
							</Card>

							<Card>
								<CardContent className="p-4 text-center">
									<BanknotesIcon className="h-8 w-8 mx-auto text-secondary-500 mb-2" />
									<div className="text-2xl font-bold text-neutral-900">${dealStats.totalValue.toFixed(1)}M</div>
									<div className="text-sm text-neutral-600">Total Value</div>
								</CardContent>
							</Card>
						</div>

						{/* Filters */}
						<div className="flex flex-wrap gap-4 items-center">
							<div className="flex items-center space-x-2">
								<FunnelIcon className="h-5 w-5 text-neutral-400" />
								<span className="text-sm font-medium text-neutral-700">Filter:</span>
							</div>
							{["all", "active", "under_review", "negotiating", "closing", "completed"].map((status) => (
								<button
									key={status}
									onClick={() => setFilter(status as "all" | Deal["status"])}
									className={cn(
										"px-3 py-1 rounded-full text-sm font-medium transition-colors",
										filter === status
											? "bg-primary-100 text-primary-700"
											: "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
									)}
								>
									{status === "all" ? "All" : statusConfig[status as Deal["status"]]?.label || status}
								</button>
							))}
						</div>
					</motion.div>

					{/* Deals List */}
					<div className="space-y-4">
						{filteredDeals.map((deal, index) => {
							const statusInfo = statusConfig[deal.status];
							const priorityInfo = priorityConfig[deal.priority];
							const StatusIcon = statusInfo.icon;

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
															"px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1",
															statusInfo.bg,
															statusInfo.color
														)}>
															<StatusIcon className="h-3 w-3" />
															<span>{statusInfo.label}</span>
														</span>
														<span className={cn(
															"px-2 py-1 rounded-full text-xs font-medium",
															priorityInfo.bg,
															priorityInfo.color
														)}>
															{deal.priority.toUpperCase()}
														</span>
													</div>
													<div className="text-sm text-neutral-600 mb-3">
														{deal.industry} • {deal.location} • {deal.revenue} revenue
													</div>
													<div className="flex items-center space-x-6 text-sm text-neutral-600">
														<div className="flex items-center space-x-1">
															<UserIcon className="h-4 w-4" />
															<span>Seller: {deal.sellerName}</span>
														</div>
														{deal.buyerName && (
															<div className="flex items-center space-x-1">
																<BuildingOfficeIcon className="h-4 w-4" />
																<span>Buyer: {deal.buyerName}</span>
															</div>
														)}
														<div className="flex items-center space-x-1">
															<ClockIcon className="h-4 w-4" />
															<span>{deal.daysActive} days active</span>
														</div>
													</div>
												</div>

												<div className="text-right">
													<div className="text-2xl font-bold text-neutral-900 mb-1">
														{deal.value}
													</div>
													<div className="text-sm text-neutral-600 mb-2">
														{deal.stage}
													</div>
													<div className="text-xs text-neutral-500">
														{deal.lastActivity}
													</div>
												</div>
											</div>

											{/* Progress Bar */}
											<div className="mb-4">
												<div className="flex items-center justify-between mb-2">
													<span className="text-sm font-medium text-neutral-700">Progress</span>
													<span className="text-sm text-neutral-600">{deal.progress}%</span>
												</div>
												<div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
													<motion.div
														className="h-full bg-gradient-to-r from-primary-500 to-success-500"
														initial={{ width: 0 }}
														animate={{ width: `${deal.progress}%` }}
														transition={{ duration: 1, delay: index * 0.1 }}
													/>
												</div>
											</div>

											{/* Actions */}
											<div className="flex items-center justify-between">
												<div className="flex space-x-2">
													<Button variant="outline" size="sm">
														View Details
													</Button>
													<Button variant="outline" size="sm">
														Messages
													</Button>
												</div>
												<Link href={`/deal/${deal.id}`}>
													<Button size="sm">
														Manage Deal
													</Button>
												</Link>
											</div>
										</CardContent>
									</Card>
								</motion.div>
							);
						})}
					</div>

					{filteredDeals.length === 0 && (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							className="text-center py-12"
						>
							<DocumentTextIcon className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
							<h3 className="text-xl font-semibold text-neutral-900 mb-2">
								No deals found
							</h3>
							<p className="text-neutral-600 mb-6">
								No deals match your current filter. Try adjusting your search criteria.
							</p>
							<Button onClick={() => setFilter("all")}>
								Show All Deals
							</Button>
						</motion.div>
					)}
				</div>
			</div>
		</PageLayout>
	);
}