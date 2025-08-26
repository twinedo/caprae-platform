"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
	HeartIcon,
	XMarkIcon,
	EyeIcon,
	MapPinIcon,
	BriefcaseIcon,
	CurrencyDollarIcon,
	ClockIcon,
	BuildingOfficeIcon,
	TrophyIcon,
	DocumentTextIcon,
	UserIcon,
	ChartBarIcon
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";

export interface BuyerProfile {
	id: string;
	firstName: string;
	lastName: string;
	title: string;
	company?: string;
	location: string;
	experience: "first-time" | "some" | "experienced" | "serial";
	budgetRange: string;
	timeframe: string;
	preferredIndustries: string[];
	preferredSize: string;
	acquisitionType: string;
	motivation: string;
	avatar?: string;
	verificationStatus: "verified" | "pending" | "unverified";
	dealHistory: {
		completed: number;
		avgTimeToClose: string;
		successRate: string;
	};
	matchScore?: number;
}

interface BuyerCardProps {
	buyer: BuyerProfile;
	onLike?: (buyerId: string) => void;
	onPass?: (buyerId: string) => void;
	onViewDetails?: (buyer: BuyerProfile) => void;
	compact?: boolean;
}

const experienceLabels = {
	"first-time": "First-time Buyer",
	"some": "1-3 Acquisitions",
	"experienced": "4+ Acquisitions", 
	"serial": "Serial Acquirer (10+)"
};

const experienceColors = {
	"first-time": "bg-blue-100 text-blue-700",
	"some": "bg-green-100 text-green-700",
	"experienced": "bg-purple-100 text-purple-700",
	"serial": "bg-gold-100 text-gold-700"
};

export function BuyerCard({ 
	buyer, 
	onLike, 
	onPass, 
	onViewDetails, 
	compact = false 
}: BuyerCardProps) {
	const [showDetails, setShowDetails] = useState(false);
	const [liked, setLiked] = useState(false);

	const handleLike = () => {
		setLiked(true);
		onLike?.(buyer.id);
	};

	const handlePass = () => {
		onPass?.(buyer.id);
	};

	const handleViewDetails = () => {
		if (onViewDetails) {
			onViewDetails(buyer);
		} else {
			setShowDetails(true);
		}
	};

	if (compact) {
		return (
			<Card variant="interactive" className="hover:shadow-lg transition-all duration-300">
				<CardHeader className="pb-3">
					<div className="flex items-start justify-between">
						<div className="flex items-center space-x-3">
							<div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center">
								<UserIcon className="h-5 w-5 text-white" />
							</div>
							<div>
								<CardTitle className="text-lg">
									{buyer.firstName} {buyer.lastName}
								</CardTitle>
								<p className="text-sm text-neutral-600">{buyer.title}</p>
							</div>
						</div>
						{buyer.matchScore && (
							<div className="bg-success-100 text-success-700 px-2 py-1 rounded-full text-xs font-medium">
								{buyer.matchScore}% match
							</div>
						)}
					</div>
				</CardHeader>
				<CardContent className="pt-0">
					<div className="grid grid-cols-2 gap-4 text-sm">
						<div className="flex items-center space-x-2">
							<CurrencyDollarIcon className="h-4 w-4 text-neutral-400" />
							<span>{buyer.budgetRange}</span>
						</div>
						<div className="flex items-center space-x-2">
							<MapPinIcon className="h-4 w-4 text-neutral-400" />
							<span>{buyer.location}</span>
						</div>
					</div>
					<div className="flex space-x-2 mt-4">
						<Button size="sm" variant="outline" onClick={handleViewDetails} className="flex-1">
							<EyeIcon className="h-4 w-4 mr-1" />
							View
						</Button>
						<Button size="sm" onClick={handleLike} className="flex-1">
							<HeartIcon className="h-4 w-4 mr-1" />
							Like
						</Button>
					</div>
				</CardContent>
			</Card>
		);
	}

	return (
		<>
			<motion.div
				layout
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, x: liked ? 100 : -100 }}
				transition={{ duration: 0.3 }}
				className="relative"
			>
				<Card className="overflow-hidden hover:shadow-xl transition-all duration-300 max-w-sm mx-auto">
					{/* Header with Avatar and Basic Info */}
					<CardHeader className="relative bg-gradient-to-br from-primary-50 to-secondary-50">
						{buyer.verificationStatus === "verified" && (
							<div className="absolute top-4 right-4">
								<div className="bg-success-100 text-success-700 px-2 py-1 rounded-full text-xs font-medium flex items-center">
									<TrophyIcon className="h-3 w-3 mr-1" />
									Verified
								</div>
							</div>
						)}
						
						<div className="text-center">
							<div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center mx-auto mb-4">
								<UserIcon className="h-10 w-10 text-white" />
							</div>
							<CardTitle className="text-xl mb-2">
								{buyer.firstName} {buyer.lastName}
							</CardTitle>
							<p className="text-neutral-600 mb-2">{buyer.title}</p>
							{buyer.company && (
								<p className="text-sm text-neutral-500">{buyer.company}</p>
							)}
						</div>

						{buyer.matchScore && (
							<div className="absolute top-4 left-4">
								<div className="bg-white/90 backdrop-blur-sm text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
									{buyer.matchScore}% match
								</div>
							</div>
						)}
					</CardHeader>

					<CardContent className="space-y-4">
						{/* Quick Stats */}
						<div className="grid grid-cols-2 gap-4">
							<div className="text-center p-3 bg-neutral-50 rounded-lg">
								<div className="text-lg font-bold text-primary-600">
									{buyer.dealHistory.completed}
								</div>
								<div className="text-xs text-neutral-600">Deals Closed</div>
							</div>
							<div className="text-center p-3 bg-neutral-50 rounded-lg">
								<div className="text-lg font-bold text-secondary-600">
									{buyer.dealHistory.successRate}
								</div>
								<div className="text-xs text-neutral-600">Success Rate</div>
							</div>
						</div>

						{/* Key Information */}
						<div className="space-y-3">
							<div className="flex items-center space-x-2 text-sm">
								<CurrencyDollarIcon className="h-4 w-4 text-neutral-400" />
								<span className="font-medium">Budget:</span>
								<span>{buyer.budgetRange}</span>
							</div>
							
							<div className="flex items-center space-x-2 text-sm">
								<ClockIcon className="h-4 w-4 text-neutral-400" />
								<span className="font-medium">Timeline:</span>
								<span className="capitalize">{buyer.timeframe.replace("-", " ")}</span>
							</div>

							<div className="flex items-center space-x-2 text-sm">
								<MapPinIcon className="h-4 w-4 text-neutral-400" />
								<span className="font-medium">Location:</span>
								<span>{buyer.location}</span>
							</div>

							<div className="flex items-center space-x-2 text-sm">
								<BriefcaseIcon className="h-4 w-4 text-neutral-400" />
								<span className="font-medium">Experience:</span>
								<span className={`px-2 py-1 rounded-full text-xs ${experienceColors[buyer.experience]}`}>
									{experienceLabels[buyer.experience]}
								</span>
							</div>
						</div>

						{/* Industries */}
						<div>
							<p className="text-sm font-medium text-neutral-700 mb-2">Interested Industries:</p>
							<div className="flex flex-wrap gap-1">
								{buyer.preferredIndustries.slice(0, 3).map((industry) => (
									<span 
										key={industry} 
										className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
									>
										{industry}
									</span>
								))}
								{buyer.preferredIndustries.length > 3 && (
									<span className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-full">
										+{buyer.preferredIndustries.length - 3} more
									</span>
								)}
							</div>
						</div>

						{/* Action Buttons */}
						<div className="flex space-x-2 pt-4">
							<Button 
								variant="outline" 
								onClick={handlePass}
								className="flex-1 hover:bg-neutral-100 flex-row items-center"
								leftIcon={<XMarkIcon className="h-4 w-4 mr-1" />}
							>
								Pass
							</Button>
							<Button 
								variant="outline" 
								onClick={handleViewDetails}
								className="flex-1"
								leftIcon={<EyeIcon className="h-4 w-4 mr-1" />}
							>
								Details
							</Button>
							<Button 
								onClick={handleLike}
								className="flex-1 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600"
								leftIcon={<HeartIcon className="h-4 w-4 mr-1" />}
							>
								Like
							</Button>
						</div>
					</CardContent>
				</Card>
			</motion.div>

			{/* Detailed View Modal */}
			<AnimatePresence>
				{showDetails && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
						onClick={() => setShowDetails(false)}
					>
						<motion.div
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.9, opacity: 0 }}
							className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
							onClick={(e) => e.stopPropagation()}
						>
							<BuyerDetailedView buyer={buyer} onClose={() => setShowDetails(false)} />
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}

function BuyerDetailedView({ buyer, onClose }: { buyer: BuyerProfile; onClose: () => void }) {
	return (
		<div className="p-6">
			{/* Header */}
			<div className="flex items-start justify-between mb-6">
				<div className="flex items-center space-x-4">
					<div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center">
						<UserIcon className="h-8 w-8 text-white" />
					</div>
					<div>
						<h2 className="text-2xl font-bold text-neutral-900">
							{buyer.firstName} {buyer.lastName}
						</h2>
						<p className="text-neutral-600">{buyer.title}</p>
						{buyer.company && (
							<p className="text-sm text-neutral-500">{buyer.company}</p>
						)}
					</div>
				</div>
				<button
					onClick={onClose}
					className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
				>
					<XMarkIcon className="h-5 w-5" />
				</button>
			</div>

			{/* Content Sections */}
			<div className="space-y-6">
				{/* Investment Profile */}
				<section>
					<h3 className="text-lg font-semibold text-neutral-900 mb-3 flex items-center">
						<CurrencyDollarIcon className="h-5 w-5 mr-2 text-primary-600" />
						Investment Profile
					</h3>
					<div className="grid grid-cols-2 gap-4">
						<div className="bg-neutral-50 p-4 rounded-lg">
							<p className="text-sm text-neutral-600">Budget Range</p>
							<p className="font-semibold">{buyer.budgetRange}</p>
						</div>
						<div className="bg-neutral-50 p-4 rounded-lg">
							<p className="text-sm text-neutral-600">Timeline</p>
							<p className="font-semibold capitalize">{buyer.timeframe.replace("-", " ")}</p>
						</div>
						<div className="bg-neutral-50 p-4 rounded-lg">
							<p className="text-sm text-neutral-600">Acquisition Type</p>
							<p className="font-semibold">{buyer.acquisitionType}</p>
						</div>
						<div className="bg-neutral-50 p-4 rounded-lg">
							<p className="text-sm text-neutral-600">Experience Level</p>
							<p className="font-semibold">{experienceLabels[buyer.experience]}</p>
						</div>
					</div>
				</section>

				{/* Deal History */}
				<section>
					<h3 className="text-lg font-semibold text-neutral-900 mb-3 flex items-center">
						<ChartBarIcon className="h-5 w-5 mr-2 text-secondary-600" />
						Track Record
					</h3>
					<div className="grid grid-cols-3 gap-4">
						<div className="text-center p-4 bg-success-50 rounded-lg">
							<div className="text-2xl font-bold text-success-600">
								{buyer.dealHistory.completed}
							</div>
							<div className="text-sm text-neutral-600">Deals Completed</div>
						</div>
						<div className="text-center p-4 bg-primary-50 rounded-lg">
							<div className="text-2xl font-bold text-primary-600">
								{buyer.dealHistory.avgTimeToClose}
							</div>
							<div className="text-sm text-neutral-600">Avg. Time to Close</div>
						</div>
						<div className="text-center p-4 bg-secondary-50 rounded-lg">
							<div className="text-2xl font-bold text-secondary-600">
								{buyer.dealHistory.successRate}
							</div>
							<div className="text-sm text-neutral-600">Success Rate</div>
						</div>
					</div>
				</section>

				{/* Preferences */}
				<section>
					<h3 className="text-lg font-semibold text-neutral-900 mb-3 flex items-center">
						<BuildingOfficeIcon className="h-5 w-5 mr-2 text-primary-600" />
						Business Preferences
					</h3>
					<div className="space-y-3">
						<div>
							<p className="text-sm font-medium text-neutral-700 mb-2">Preferred Industries:</p>
							<div className="flex flex-wrap gap-2">
								{buyer.preferredIndustries.map((industry) => (
									<span 
										key={industry}
										className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full"
									>
										{industry}
									</span>
								))}
							</div>
						</div>
						<div>
							<p className="text-sm font-medium text-neutral-700">Preferred Business Size:</p>
							<p className="text-neutral-600">{buyer.preferredSize}</p>
						</div>
					</div>
				</section>

				{/* Motivation */}
				<section>
					<h3 className="text-lg font-semibold text-neutral-900 mb-3 flex items-center">
						<DocumentTextIcon className="h-5 w-5 mr-2 text-secondary-600" />
						Motivation & Goals
					</h3>
					<div className="bg-neutral-50 p-4 rounded-lg">
						<p className="text-neutral-700 leading-relaxed">{buyer.motivation}</p>
					</div>
				</section>

				{/* Action Buttons */}
				<div className="flex space-x-3 pt-4 border-t border-neutral-200">
					<Button variant="outline" className="flex-1">
						<XMarkIcon className="h-4 w-4 mr-2" />
						Not Interested
					</Button>
					<Button className="flex-1 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600">
						<HeartSolidIcon className="h-4 w-4 mr-2" />
						Show Interest
					</Button>
				</div>
			</div>
		</div>
	);
}