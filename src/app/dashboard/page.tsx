"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageLayout } from "@/components/layout/page-layout";
import {
	UserIcon,
	BuildingOfficeIcon,
	ChartBarIcon,
	ArrowRightIcon,
	BanknotesIcon,
	MagnifyingGlassIcon,
	SparklesIcon,
	DocumentTextIcon,
	UsersIcon
} from "@heroicons/react/24/outline";
import Image from "next/image";

export default function DashboardIndex() {
	const [userType, setUserType] = useState<"buyer" | "seller" | null>(null);
	
	// In a real app, this would come from authentication/user context
	useEffect(() => {
		// For demo purposes, we'll show the selection screen
		// In production, this would check the user's role and redirect accordingly
	}, []);

	const dashboardOptions = [
		{
			type: "buyer" as const,
			title: "Buyer Dashboard",
			description: "Discover and evaluate business opportunities with AI-powered insights",
			features: [
				"Browse curated business listings",
				"AI-powered deal analysis",
				"Business valuation tools",
				"Direct seller communication"
			],
			href: "/dashboard/buyer",
			icon: <UserIcon className="h-8 w-8" />,
			color: "from-primary-500 to-primary-600",
			stats: {
				deals: "2,400+",
				avgPrice: "$2.1M",
				successRate: "87%"
			}
		},
		{
			type: "seller" as const,
			title: "Seller Dashboard", 
			description: "Connect with qualified buyers and manage your business sale process",
			features: [
				"Swipe-style buyer matching",
				"Business listing optimization",
				"Deal progress tracking",
				"Market insights & pricing"
			],
			href: "/dashboard/seller",
			icon: <BuildingOfficeIcon className="h-8 w-8" />,
			color: "from-secondary-500 to-secondary-600",
			stats: {
				buyers: "12K+",
				avgTime: "45 days",
				satisfaction: "94%"
			}
		}
	];

	return (
		<PageLayout>
			<div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-8">
				<div className="max-w-6xl mx-auto px-4">
					{/* Header */}
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3 }}
						className="text-center mb-12"
					>
						<div className="flex items-center justify-center space-x-3 mb-6">
							<div className="w-12 h-12 rounded-xl overflow-hidden">
								<Image src="/logo.png" alt="Caprae Logo" width={48} height={48} className="w-full h-full object-contain" />
							</div>
							<h1 className="text-4xl font-bold text-neutral-900">Choose Your Dashboard</h1>
						</div>
						<p className="text-xl text-neutral-600 max-w-3xl mx-auto">
							Access your personalized dashboard based on your role. Whether you&apos;re looking to buy or sell, 
							we have the tools to make your business journey successful.
						</p>
					</motion.div>

					{/* Dashboard Options */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
						{dashboardOptions.map((option, index) => (
							<motion.div
								key={option.type}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: index * 0.2 }}
							>
								<Card className="h-full hover:shadow-xl transition-all duration-300 group cursor-pointer border-2 border-transparent hover:border-primary-200">
									<Link href={option.href}>
										<CardHeader className="text-center">
											<div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${option.color} text-white flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
												{option.icon}
											</div>
											<CardTitle className="text-2xl mb-2">{option.title}</CardTitle>
											<p className="text-neutral-600">{option.description}</p>
										</CardHeader>
										<CardContent className="space-y-6">
											{/* Features */}
											<div>
												<h4 className="font-medium text-neutral-900 mb-3">Key Features:</h4>
												<ul className="space-y-2">
													{option.features.map((feature, featureIndex) => (
														<li key={featureIndex} className="flex items-start space-x-2 text-sm text-neutral-600">
															<div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
															<span>{feature}</span>
														</li>
													))}
												</ul>
											</div>

											{/* Stats */}
											<div className="grid grid-cols-3 gap-4 pt-4 border-t border-neutral-200">
												{Object.entries(option.stats).map(([key, value]) => (
													<div key={key} className="text-center">
														<div className="text-lg font-bold text-neutral-900">{value}</div>
														<div className="text-xs text-neutral-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
													</div>
												))}
											</div>

											{/* CTA Button */}
											<Button 
												className="w-full group-hover:bg-primary-600 transition-colors" 
												rightIcon={<ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform" />}
											>
												Access {option.title}
											</Button>
										</CardContent>
									</Link>
								</Card>
							</motion.div>
						))}
					</div>

					{/* Quick Access Section */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4 }}
						className="mb-12"
					>
						<Card className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white border-none">
							<CardContent className="p-8">
								<div className="text-center mb-8">
									<h2 className="text-2xl font-bold mb-2">Popular Tools & Features</h2>
									<p className="text-white/90">Quick access to the most used features across both dashboards</p>
								</div>
								
								<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
									<Link href="/dashboard/buyer" className="group">
										<div className="flex flex-col items-center p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
											<MagnifyingGlassIcon className="h-8 w-8 mb-2 group-hover:scale-110 transition-transform" />
											<span className="text-sm font-medium">Browse Deals</span>
										</div>
									</Link>
									
									<Link href="/dashboard/seller" className="group">
										<div className="flex flex-col items-center p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
											<UsersIcon className="h-8 w-8 mb-2 group-hover:scale-110 transition-transform" />
											<span className="text-sm font-medium">Find Buyers</span>
										</div>
									</Link>
									
									<Link href="/dashboard/buyer" className="group">
										<div className="flex flex-col items-center p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
											<BanknotesIcon className="h-8 w-8 mb-2 group-hover:scale-110 transition-transform" />
											<span className="text-sm font-medium">Valuations</span>
										</div>
									</Link>
									
									<Link href="/dashboard/buyer" className="group">
										<div className="flex flex-col items-center p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
											<ChartBarIcon className="h-8 w-8 mb-2 group-hover:scale-110 transition-transform" />
											<span className="text-sm font-medium">Analytics</span>
										</div>
									</Link>
								</div>
							</CardContent>
						</Card>
					</motion.div>

					{/* Recent Activity */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.6 }}
					>
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center space-x-2">
									<DocumentTextIcon className="h-5 w-5 text-primary-600" />
									<span>Platform Activity</span>
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
									<div className="text-center p-4 bg-success-50 rounded-lg">
										<div className="text-2xl font-bold text-success-600">47</div>
										<div className="text-sm text-neutral-600">Deals Closed Today</div>
									</div>
									<div className="text-center p-4 bg-primary-50 rounded-lg">
										<div className="text-2xl font-bold text-primary-600">156</div>
										<div className="text-sm text-neutral-600">New Listings</div>
									</div>
									<div className="text-center p-4 bg-secondary-50 rounded-lg">
										<div className="text-2xl font-bold text-secondary-600">2.1K</div>
										<div className="text-sm text-neutral-600">Active Users</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</motion.div>
				</div>
			</div>
		</PageLayout>
	);
}