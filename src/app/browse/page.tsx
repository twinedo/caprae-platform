"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageLayout } from "@/components/layout/page-layout";
import {
	MagnifyingGlassIcon,
	MapPinIcon,
	ArrowTrendingUpIcon,
	BuildingOfficeIcon,
	StarIcon,
	HeartIcon,
	EyeIcon,
	AdjustmentsHorizontalIcon,
	Squares2X2Icon,
	ListBulletIcon
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import { cn } from "@/lib/design-system";

interface Business {
	id: string;
	name: string;
	industry: string;
	location: string;
	revenue: string;
	price: string;
	growthRate: number;
	employees: number;
	founded: number;
	description: string;
	highlights: string[];
	images: string[];
	featured: boolean;
	verified: boolean;
	matchScore: number;
	sellerType: "individual" | "broker" | "corporate";
	listedDays: number;
}

const mockBusinesses: Business[] = [
	{
		id: "1",
		name: "TechFlow Solutions",
		industry: "SaaS",
		location: "Austin, TX",
		revenue: "$1.2M",
		price: "$2.8M",
		growthRate: 23,
		employees: 12,
		founded: 2019,
		description: "Cloud-based project management platform serving 500+ SMB clients with 95% retention rate.",
		highlights: ["Recurring revenue", "Strong team", "Growing market"],
		images: ["/api/placeholder/400/300"],
		featured: true,
		verified: true,
		matchScore: 94,
		sellerType: "individual",
		listedDays: 15
	},
	{
		id: "2", 
		name: "EcoCommerce",
		industry: "E-commerce",
		location: "Denver, CO",
		revenue: "$950K",
		price: "$1.9M",
		growthRate: 31,
		employees: 8,
		founded: 2020,
		description: "Sustainable products marketplace with loyal customer base and strong brand recognition.",
		highlights: ["Sustainable focus", "High margins", "Loyal customers"],
		images: ["/api/placeholder/400/300"],
		featured: false,
		verified: true,
		matchScore: 87,
		sellerType: "individual",
		listedDays: 23
	},
	{
		id: "3",
		name: "Local Logistics Hub",
		industry: "Logistics",
		location: "Phoenix, AZ",
		revenue: "$1.8M",
		price: "$3.5M",
		growthRate: 18,
		employees: 25,
		founded: 2017,
		description: "Regional logistics and warehousing solutions with established client contracts.",
		highlights: ["Established contracts", "Prime location", "Scalable operations"],
		images: ["/api/placeholder/400/300"],
		featured: true,
		verified: true,
		matchScore: 82,
		sellerType: "broker",
		listedDays: 8
	},
	{
		id: "4",
		name: "Creative Studio Plus",
		industry: "Creative Services",
		location: "Portland, OR",
		revenue: "$420K",
		price: "$850K",
		growthRate: 45,
		employees: 6,
		founded: 2021,
		description: "Full-service digital agency specializing in brand development and web design.",
		highlights: ["High growth", "Creative talent", "Diverse portfolio"],
		images: ["/api/placeholder/400/300"],
		featured: false,
		verified: false,
		matchScore: 76,
		sellerType: "individual",
		listedDays: 31
	},
	{
		id: "5",
		name: "HealthTech Innovations",
		industry: "Healthcare",
		location: "Seattle, WA",
		revenue: "$2.1M",
		price: "$4.2M",
		growthRate: 28,
		employees: 18,
		founded: 2018,
		description: "Healthcare technology solutions improving patient care through innovative software.",
		highlights: ["Healthcare focus", "Regulatory compliance", "Growing demand"],
		images: ["/api/placeholder/400/300"],
		featured: true,
		verified: true,
		matchScore: 91,
		sellerType: "corporate",
		listedDays: 12
	}
];

const industries = ["All", "SaaS", "E-commerce", "Healthcare", "FinTech", "Logistics", "Creative Services", "Manufacturing"];
const locations = ["All", "Austin, TX", "Denver, CO", "Seattle, WA", "San Francisco, CA", "Phoenix, AZ", "Portland, OR"];
const priceRanges = ["All", "Under $1M", "$1M - $3M", "$3M - $5M", "$5M+"];

export default function BrowsePage() {
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedIndustry, setSelectedIndustry] = useState("All");
	const [selectedLocation, setSelectedLocation] = useState("All");
	const [selectedPriceRange, setSelectedPriceRange] = useState("All");
	const [showFilters, setShowFilters] = useState(false);
	const [likedBusinesses, setLikedBusinesses] = useState<string[]>([]);
	const [sortBy, setSortBy] = useState<"match" | "price" | "revenue" | "growth">("match");

	const filteredBusinesses = mockBusinesses.filter(business => {
		const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			business.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
			business.description.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesIndustry = selectedIndustry === "All" || business.industry === selectedIndustry;
		const matchesLocation = selectedLocation === "All" || business.location === selectedLocation;
		
		let matchesPrice = true;
		if (selectedPriceRange !== "All") {
			const price = parseFloat(business.price.replace(/[$M,]/g, ""));
			switch (selectedPriceRange) {
				case "Under $1M": matchesPrice = price < 1; break;
				case "$1M - $3M": matchesPrice = price >= 1 && price <= 3; break;
				case "$3M - $5M": matchesPrice = price > 3 && price <= 5; break;
				case "$5M+": matchesPrice = price > 5; break;
			}
		}
		
		return matchesSearch && matchesIndustry && matchesLocation && matchesPrice;
	});

	const toggleLike = (businessId: string) => {
		setLikedBusinesses(prev => 
			prev.includes(businessId) 
				? prev.filter(id => id !== businessId)
				: [...prev, businessId]
		);
	};

	const BusinessCard = ({ business, isLiked }: { business: Business; isLiked: boolean }) => (
		<Card variant="interactive" className="h-full group">
			<div className="relative">
				{/* Business Image */}
				<div className="aspect-video bg-gradient-to-br from-primary-100 to-secondary-100 rounded-t-xl relative overflow-hidden">
					<div className="absolute inset-0 flex items-center justify-center">
						<BuildingOfficeIcon className="h-16 w-16 text-primary-300" />
					</div>
					
					{/* Featured Badge */}
					{business.featured && (
						<div className="absolute top-3 left-3 bg-secondary-500 text-white px-2 py-1 rounded-full text-xs font-medium">
							Featured
						</div>
					)}
					
					{/* Like Button */}
					<button
						onClick={() => toggleLike(business.id)}
						className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
					>
						{isLiked ? (
							<HeartSolidIcon className="h-5 w-5 text-error-500" />
						) : (
							<HeartIcon className="h-5 w-5 text-neutral-600" />
						)}
					</button>
					
					{/* Match Score */}
					<div className="absolute bottom-3 right-3 bg-primary-500 text-white px-2 py-1 rounded-full text-xs font-medium">
						{business.matchScore}% match
					</div>
				</div>

				<CardContent className="p-6">
					<div className="mb-4">
						<div className="flex items-start justify-between mb-2">
							<h3 className="text-lg font-semibold text-neutral-900 group-hover:text-primary-700 transition-colors">
								{business.name}
							</h3>
							{business.verified && (
								<div className="flex items-center space-x-1 text-success-600">
									<StarIcon className="h-4 w-4 fill-current" />
								</div>
							)}
						</div>
						<div className="flex items-center space-x-4 text-sm text-neutral-600 mb-3">
							<span className="font-medium">{business.industry}</span>
							<div className="flex items-center space-x-1">
								<MapPinIcon className="h-4 w-4" />
								<span>{business.location}</span>
							</div>
						</div>
						<p className="text-sm text-neutral-600 line-clamp-2">
							{business.description}
						</p>
					</div>

					{/* Highlights */}
					<div className="flex flex-wrap gap-2 mb-4">
						{business.highlights.slice(0, 3).map((highlight, idx) => (
							<span
								key={idx}
								className="px-2 py-1 bg-primary-50 text-primary-700 rounded-lg text-xs"
							>
								{highlight}
							</span>
						))}
					</div>

					{/* Stats */}
					<div className="grid grid-cols-2 gap-4 mb-4 text-sm">
						<div>
							<div className="text-neutral-600">Revenue</div>
							<div className="font-semibold text-neutral-900">{business.revenue}</div>
						</div>
						<div>
							<div className="text-neutral-600">Growth</div>
							<div className="font-semibold text-success-600 flex items-center">
								<ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
								+{business.growthRate}%
							</div>
						</div>
						<div>
							<div className="text-neutral-600">Employees</div>
							<div className="font-semibold text-neutral-900">{business.employees}</div>
						</div>
						<div>
							<div className="text-neutral-600">Founded</div>
							<div className="font-semibold text-neutral-900">{business.founded}</div>
						</div>
					</div>

					{/* Price and Actions */}
					<div className="flex items-center justify-between pt-4 border-t border-neutral-200">
						<div>
							<div className="text-2xl font-bold text-neutral-900">{business.price}</div>
							<div className="text-xs text-neutral-500">{business.listedDays} days listed</div>
						</div>
						<div className="flex space-x-2">
							<Button variant="outline" size="sm" leftIcon={<EyeIcon className="h-4 w-4" />}>
								View
							</Button>
							<Link href={`/business/${business.id}`}>
								<Button size="sm">
									Details
								</Button>
							</Link>
						</div>
					</div>
				</CardContent>
			</div>
		</Card>
	);

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
									Browse Businesses
								</h1>
								<p className="text-neutral-600">
									Discover acquisition opportunities that match your investment criteria
								</p>
							</div>
							<div className="flex items-center space-x-2">
								<button
									onClick={() => setViewMode("grid")}
									className={cn(
										"p-2 rounded-lg transition-colors",
										viewMode === "grid" ? "bg-primary-100 text-primary-700" : "text-neutral-500 hover:text-neutral-700"
									)}
								>
									<Squares2X2Icon className="h-5 w-5" />
								</button>
								<button
									onClick={() => setViewMode("list")}
									className={cn(
										"p-2 rounded-lg transition-colors",
										viewMode === "list" ? "bg-primary-100 text-primary-700" : "text-neutral-500 hover:text-neutral-700"
									)}
								>
									<ListBulletIcon className="h-5 w-5" />
								</button>
							</div>
						</div>

						{/* Search and Filters */}
						<div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
							{/* Search */}
							<div className="relative flex-1">
								<MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
								<input
									type="text"
									placeholder="Search businesses..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
								/>
							</div>
							
							{/* Filters Toggle */}
							<Button
								variant="outline"
								onClick={() => setShowFilters(!showFilters)}
								leftIcon={<AdjustmentsHorizontalIcon className="h-4 w-4" />}
							>
								Filters
							</Button>
						</div>

						{/* Filter Panel */}
						{showFilters && (
							<motion.div
								initial={{ opacity: 0, height: 0 }}
								animate={{ opacity: 1, height: "auto" }}
								exit={{ opacity: 0, height: 0 }}
								className="mt-4 p-4 bg-white rounded-lg border border-neutral-200"
							>
								<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
									<div>
										<label className="block text-sm font-medium text-neutral-700 mb-2">Industry</label>
										<select
											value={selectedIndustry}
											onChange={(e) => setSelectedIndustry(e.target.value)}
											className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
										>
											{industries.map(industry => (
												<option key={industry} value={industry}>{industry}</option>
											))}
										</select>
									</div>
									<div>
										<label className="block text-sm font-medium text-neutral-700 mb-2">Location</label>
										<select
											value={selectedLocation}
											onChange={(e) => setSelectedLocation(e.target.value)}
											className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
										>
											{locations.map(location => (
												<option key={location} value={location}>{location}</option>
											))}
										</select>
									</div>
									<div>
										<label className="block text-sm font-medium text-neutral-700 mb-2">Price Range</label>
										<select
											value={selectedPriceRange}
											onChange={(e) => setSelectedPriceRange(e.target.value)}
											className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
										>
											{priceRanges.map(range => (
												<option key={range} value={range}>{range}</option>
											))}
										</select>
									</div>
								</div>
							</motion.div>
						)}

						{/* Results Summary */}
						<div className="mt-6 flex items-center justify-between text-sm text-neutral-600">
							<span>{filteredBusinesses.length} businesses found</span>
							<div className="flex items-center space-x-2">
								<span>Sort by:</span>
								<select
									value={sortBy}
									onChange={(e) => setSortBy(e.target.value as "match" | "price" | "revenue" | "growth")}
									className="border border-neutral-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-primary-500"
								>
									<option value="match">Best Match</option>
									<option value="price">Price</option>
									<option value="revenue">Revenue</option>
									<option value="growth">Growth Rate</option>
								</select>
							</div>
						</div>
					</motion.div>

					{/* Business Grid */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.2 }}
						className={cn(
							"grid gap-6",
							viewMode === "grid" ? "grid-cols-1 lg:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
						)}
					>
						{filteredBusinesses.map((business, index) => (
							<motion.div
								key={business.id}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: index * 0.1 }}
							>
								<BusinessCard 
									business={business} 
									isLiked={likedBusinesses.includes(business.id)}
								/>
							</motion.div>
						))}
					</motion.div>

					{filteredBusinesses.length === 0 && (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							className="text-center py-12"
						>
							<MagnifyingGlassIcon className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
							<h3 className="text-xl font-semibold text-neutral-900 mb-2">
								No businesses found
							</h3>
							<p className="text-neutral-600 mb-6">
								Try adjusting your search criteria or filters to find more opportunities.
							</p>
							<Button onClick={() => {
								setSearchTerm("");
								setSelectedIndustry("All");
								setSelectedLocation("All");
								setSelectedPriceRange("All");
							}}>
								Clear Filters
							</Button>
						</motion.div>
					)}
				</div>
			</div>
		</PageLayout>
	);
}