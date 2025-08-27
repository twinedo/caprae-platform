"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BuyerCard, type BuyerProfile } from "@/components/profiles/buyer-card";
import { PageLayout } from "@/components/layout/page-layout";
import {
	HeartIcon,
	XMarkIcon,
	EyeIcon,
	AdjustmentsHorizontalIcon,
	BellIcon,
	Cog6ToothIcon,
	UserIcon,
	SparklesIcon,
	ArrowPathIcon,
	ChatBubbleLeftRightIcon
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";

// Mock buyer data
const mockBuyers: BuyerProfile[] = [
	{
		id: "1",
		firstName: "Sarah",
		lastName: "Chen",
		title: "Investment Manager",
		company: "Pacific Ventures",
		location: "San Francisco, CA",
		experience: "experienced",
		budgetRange: "$5M - $15M",
		timeframe: "3-6 months",
		preferredIndustries: ["Technology", "SaaS", "E-commerce"],
		preferredSize: "Medium Business",
		acquisitionType: "Strategic Acquisition",
		motivation: "Looking to expand our portfolio with profitable tech companies that have strong recurring revenue models and scalable operations.",
		verificationStatus: "verified",
		dealHistory: {
			completed: 7,
			avgTimeToClose: "65 days",
			successRate: "89%"
		},
		matchScore: 94
	},
	{
		id: "2", 
		firstName: "Michael",
		lastName: "Rodriguez",
		title: "Serial Entrepreneur",
		location: "Austin, TX",
		experience: "serial",
		budgetRange: "$2M - $8M",
		timeframe: "immediate",
		preferredIndustries: ["E-commerce", "Manufacturing", "Food & Beverage"],
		preferredSize: "Small to Medium",
		acquisitionType: "Roll-up Strategy",
		motivation: "Building a portfolio of complementary businesses in the consumer goods space. Seeking established brands with loyal customer bases.",
		verificationStatus: "verified",
		dealHistory: {
			completed: 12,
			avgTimeToClose: "45 days",
			successRate: "92%"
		},
		matchScore: 87
	},
	{
		id: "3",
		firstName: "Emma",
		lastName: "Thompson",
		title: "Private Equity Associate",
		company: "Growth Capital Partners",
		location: "New York, NY",
		experience: "some",
		budgetRange: "$10M - $50M",
		timeframe: "flexible",
		preferredIndustries: ["Healthcare", "Professional Services", "Technology"],
		preferredSize: "Medium to Large",
		acquisitionType: "Financial Investment",
		motivation: "Focused on businesses with strong management teams and clear growth opportunities. We provide capital and strategic guidance.",
		verificationStatus: "verified",
		dealHistory: {
			completed: 4,
			avgTimeToClose: "90 days",
			successRate: "85%"
		},
		matchScore: 82
	},
	{
		id: "4",
		firstName: "David",
		lastName: "Kumar",
		title: "Business Owner",
		location: "Seattle, WA",
		experience: "first-time",
		budgetRange: "$500K - $2M",
		timeframe: "6-12 months",
		preferredIndustries: ["Technology", "Professional Services", "Retail"],
		preferredSize: "Small Business",
		acquisitionType: "Strategic Acquisition",
		motivation: "First-time buyer looking to acquire a stable, profitable business that I can operate and grow. Interested in businesses with existing teams.",
		verificationStatus: "pending",
		dealHistory: {
			completed: 0,
			avgTimeToClose: "N/A",
			successRate: "N/A"
		},
		matchScore: 76
	}
];

export default function SellerDashboard() {
	const [currentBuyers, setCurrentBuyers] = useState<BuyerProfile[]>(mockBuyers);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [likedBuyers, setLikedBuyers] = useState<string[]>([]);
	const [passedBuyers, setPassedBuyers] = useState<string[]>([]);
	const [showingFilters, setShowingFilters] = useState(false);
	const [matches, setMatches] = useState(2); // Number of mutual matches

	const currentBuyer = currentBuyers[currentIndex];

	const handleLike = (buyerId: string) => {
		setLikedBuyers(prev => [...prev, buyerId]);
		nextBuyer();
		// Simulate match notification
		if (Math.random() > 0.7) {
			setTimeout(() => {
				setMatches(prev => prev + 1);
			}, 1000);
		}
	};

	const handlePass = (buyerId: string) => {
		setPassedBuyers(prev => [...prev, buyerId]);
		nextBuyer();
	};

	const nextBuyer = () => {
		if (currentIndex < currentBuyers.length - 1) {
			setCurrentIndex(prev => prev + 1);
		} else {
			// In a real app, fetch more buyers
			setCurrentIndex(0);
		}
	};

	const handleDrag = (_: MouseEvent, info: PanInfo) => {
		const offset = info.offset.x;
		const velocity = info.velocity.x;

		if (offset > 100 || velocity > 500) {
			// Swipe right - like
			handleLike(currentBuyer.id);
		} else if (offset < -100 || velocity < -500) {
			// Swipe left - pass
			handlePass(currentBuyer.id);
		}
	};

	return (
		<PageLayout>
			<div className="bg-gradient-to-br from-secondary-50 via-white to-primary-50 min-h-screen">
				<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Main Matching Interface */}
					<div className="lg:col-span-2">
						<div className="mb-6">
							<h1 className="text-3xl font-bold text-neutral-900 mb-2">
								Discover Buyers
							</h1>
							<p className="text-neutral-600">
								Swipe right to show interest, left to pass. You make the first move!
							</p>
						</div>

						{/* Filters */}
						<div className="mb-6 flex items-center space-x-4">
							<Button
								variant="outline"
								onClick={() => setShowingFilters(!showingFilters)}
								leftIcon={<AdjustmentsHorizontalIcon className="h-4 w-4" />}
							>
								Filters
							</Button>
							<Button
								variant="ghost"
								leftIcon={<ArrowPathIcon className="h-4 w-4" />}
							>
								Refresh
							</Button>
							<div className="text-sm text-neutral-500">
								{currentBuyers.length - currentIndex} potential buyers remaining
							</div>
						</div>

						{/* Card Stack */}
						<div className="relative h-[600px] flex items-center justify-center">
							<AnimatePresence mode="wait">
								{currentBuyer ? (
									<motion.div
										key={currentBuyer.id}
										drag="x"
										dragConstraints={{ left: 0, right: 0 }}
										onDragEnd={handleDrag}
										initial={{ opacity: 0, scale: 0.9 }}
										animate={{ opacity: 1, scale: 1 }}
										exit={{ 
											opacity: 0, 
											x: likedBuyers.includes(currentBuyer.id) ? 300 : -300,
											rotate: likedBuyers.includes(currentBuyer.id) ? 15 : -15
										}}
										transition={{ duration: 0.3 }}
										className="absolute cursor-grab active:cursor-grabbing"
										whileDrag={{ scale: 1.05, rotate: 5 }}
									>
										<BuyerCard
											buyer={currentBuyer}
											onLike={handleLike}
											onPass={handlePass}
										/>
									</motion.div>
								) : (
									<motion.div
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										className="text-center"
									>
										<Card className="p-8">
											<SparklesIcon className="h-16 w-16 text-primary-500 mx-auto mb-4" />
											<h3 className="text-xl font-semibold text-neutral-900 mb-2">
												No more buyers for now
											</h3>
											<p className="text-neutral-600 mb-4">
												Check back later for new potential matches, or adjust your preferences.
											</p>
											<Button onClick={() => setCurrentIndex(0)}>
												Start Over
											</Button>
										</Card>
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					</div>

					{/* Sidebar */}
					<div className="space-y-6">
						{/* Quick Stats */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center">
									<SparklesIcon className="h-5 w-5 mr-2 text-primary-600" />
									Your Activity
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div className="flex justify-between items-center">
										<span className="text-neutral-600">Mutual Matches</span>
										<span className="font-semibold text-success-600">{matches}</span>
									</div>
									<div className="flex justify-between items-center">
										<span className="text-neutral-600">Buyers Liked</span>
										<span className="font-semibold text-primary-600">{likedBuyers.length}</span>
									</div>
									<div className="flex justify-between items-center">
										<span className="text-neutral-600">Profile Views</span>
										<span className="font-semibold text-neutral-900">47</span>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Recent Matches */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center">
									<ChatBubbleLeftRightIcon className="h-5 w-5 mr-2 text-secondary-600" />
									Recent Matches
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-3">
									{likedBuyers.slice(0, 3).map((buyerId) => {
										const buyer = mockBuyers.find(b => b.id === buyerId);
										if (!buyer) return null;
										
										return (
											<div key={buyerId} className="flex items-center space-x-3 p-2 hover:bg-neutral-50 rounded-lg cursor-pointer">
												<div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center">
													<UserIcon className="h-5 w-5 text-white" />
												</div>
												<div className="flex-1">
													<p className="font-medium text-sm">{buyer.firstName} {buyer.lastName}</p>
													<p className="text-xs text-neutral-500">{buyer.title}</p>
												</div>
											</div>
										);
									})}
									{likedBuyers.length === 0 && (
										<p className="text-sm text-neutral-500 text-center py-4">
											No matches yet. Start swiping!
										</p>
									)}
								</div>
							</CardContent>
						</Card>

						{/* Tips */}
						<Card>
							<CardHeader>
								<CardTitle className="text-lg">💡 Pro Tips</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-3 text-sm text-neutral-600">
									<p>• Be selective - quality over quantity leads to better matches</p>
									<p>• Read their full profile before deciding</p>
									<p>• Your business story matters - keep your profile updated</p>
									<p>• Respond quickly to matches to show serious intent</p>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
				</div>
			</div>
		</PageLayout>
	);
}