"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageLayout } from "@/components/layout/page-layout";
import {
	BuildingOfficeIcon,
	MapPinIcon,
	BanknotesIcon,
	ArrowTrendingUpIcon,
	UsersIcon,
	ClockIcon,
	StarIcon,
	EyeIcon,
	ChatBubbleLeftRightIcon,
	MagnifyingGlassIcon,
	CheckCircleIcon
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/design-system";

interface Company {
	id: string;
	name: string;
	industry: string;
	location: string;
	size: "startup" | "small" | "medium" | "large";
	revenue: string;
	employees: number;
	founded: number;
	website: string;
	description: string;
	logo: string;
	status: "listed" | "in_negotiation" | "sold" | "withdrawn";
	listingDate: string;
	price: string;
	verified: boolean;
	rating: number;
	totalDeals: number;
	successRate: number;
	averageDealTime: number;
	tags: string[];
}

const mockCompanies: Company[] = [
	{
		id: "1",
		name: "TechFlow Solutions",
		industry: "SaaS",
		location: "Austin, TX",
		size: "small",
		revenue: "$1.2M",
		employees: 12,
		founded: 2019,
		website: "techflow.com",
		description: "Cloud-based project management platform serving 500+ SMB clients with 95% retention rate and growing revenue.",
		logo: "/api/placeholder/80/80",
		status: "listed",
		listingDate: "2024-01-15",
		price: "$2.8M",
		verified: true,
		rating: 4.8,
		totalDeals: 3,
		successRate: 100,
		averageDealTime: 45,
		tags: ["SaaS", "B2B", "Recurring Revenue", "High Retention"]
	},
	{
		id: "2",
		name: "EcoCommerce Inc",
		industry: "E-commerce",
		location: "Denver, CO",
		size: "small",
		revenue: "$950K",
		employees: 8,
		founded: 2020,
		website: "ecocommerce.com",
		description: "Sustainable products marketplace with strong brand recognition and loyal customer base in the eco-friendly space.",
		logo: "/api/placeholder/80/80",
		status: "in_negotiation",
		listingDate: "2024-01-08",
		price: "$1.9M",
		verified: true,
		rating: 4.6,
		totalDeals: 1,
		successRate: 100,
		averageDealTime: 60,
		tags: ["E-commerce", "Sustainable", "B2C", "Brand Recognition"]
	},
	{
		id: "3",
		name: "HealthTech Innovations",
		industry: "Healthcare",
		location: "Seattle, WA",
		size: "medium",
		revenue: "$2.1M",
		employees: 18,
		founded: 2018,
		website: "healthtech-innov.com",
		description: "Healthcare technology solutions improving patient care through innovative software and regulatory compliant systems.",
		logo: "/api/placeholder/80/80",
		status: "listed",
		listingDate: "2024-01-20",
		price: "$4.2M",
		verified: true,
		rating: 4.9,
		totalDeals: 5,
		successRate: 80,
		averageDealTime: 75,
		tags: ["HealthTech", "B2B", "Regulated", "Innovation"]
	},
	{
		id: "4",
		name: "Local Logistics Hub",
		industry: "Logistics",
		location: "Phoenix, AZ", 
		size: "medium",
		revenue: "$1.8M",
		employees: 25,
		founded: 2017,
		website: "locallogistics.com",
		description: "Regional logistics and warehousing solutions with established contracts and prime location advantages.",
		logo: "/api/placeholder/80/80",
		status: "sold",
		listingDate: "2023-11-15",
		price: "$3.5M",
		verified: true,
		rating: 4.7,
		totalDeals: 2,
		successRate: 100,
		averageDealTime: 90,
		tags: ["Logistics", "B2B", "Established", "Prime Location"]
	},
	{
		id: "5",
		name: "Creative Studio Plus",
		industry: "Creative Services",
		location: "Portland, OR",
		size: "startup",
		revenue: "$420K",
		employees: 6,
		founded: 2021,
		website: "creativestudioplus.com",
		description: "Full-service digital agency specializing in brand development, web design, and creative solutions for SMB clients.",
		logo: "/api/placeholder/80/80",
		status: "listed",
		listingDate: "2024-01-25",
		price: "$850K",
		verified: false,
		rating: 4.3,
		totalDeals: 0,
		successRate: 0,
		averageDealTime: 0,
		tags: ["Creative", "Agency", "B2B", "Digital"]
	},
	{
		id: "6",
		name: "PayFlow Systems",
		industry: "FinTech",
		location: "San Francisco, CA",
		size: "small",
		revenue: "$1.5M",
		employees: 14,
		founded: 2019,
		website: "payflowsys.com",
		description: "Payment processing solutions for small businesses with focus on security and compliance in financial services.",
		logo: "/api/placeholder/80/80",
		status: "withdrawn",
		listingDate: "2023-12-01",
		price: "$3.2M",
		verified: true,
		rating: 4.4,
		totalDeals: 1,
		successRate: 0,
		averageDealTime: 120,
		tags: ["FinTech", "Payments", "B2B", "Compliance"]
	}
];

const sizeConfig = {
	startup: { label: "Startup", color: "text-blue-600", bg: "bg-blue-100" },
	small: { label: "Small", color: "text-success-600", bg: "bg-success-100" },
	medium: { label: "Medium", color: "text-warning-600", bg: "bg-warning-100" },
	large: { label: "Large", color: "text-primary-600", bg: "bg-primary-100" }
};

const statusConfig = {
	listed: { label: "Listed", color: "text-success-600", bg: "bg-success-100", icon: CheckCircleIcon },
	in_negotiation: { label: "In Negotiation", color: "text-warning-600", bg: "bg-warning-100", icon: ChatBubbleLeftRightIcon },
	sold: { label: "Sold", color: "text-primary-600", bg: "bg-primary-100", icon: CheckCircleIcon },
	withdrawn: { label: "Withdrawn", color: "text-neutral-600", bg: "bg-neutral-100", icon: ClockIcon }
};

export default function CompaniesPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedIndustry, setSelectedIndustry] = useState("All");
	const [selectedSize, setSelectedSize] = useState("All");
	const [selectedStatus, setSelectedStatus] = useState("All");
	const [sortBy, setSortBy] = useState<"name" | "revenue" | "employees" | "founded">("name");
	const [viewMode, setViewMode] = useState<"cards" | "table">("cards");

	const industries = ["All", ...Array.from(new Set(mockCompanies.map(c => c.industry)))];
	const sizes = ["All", "startup", "small", "medium", "large"];
	const statuses = ["All", "listed", "in_negotiation", "sold", "withdrawn"];

	const filteredCompanies = mockCompanies.filter(company => {
		const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			company.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
			company.industry.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesIndustry = selectedIndustry === "All" || company.industry === selectedIndustry;
		const matchesSize = selectedSize === "All" || company.size === selectedSize;
		const matchesStatus = selectedStatus === "All" || company.status === selectedStatus;
		
		return matchesSearch && matchesIndustry && matchesSize && matchesStatus;
	});

	const CompanyCard = ({ company }: { company: Company }) => {
		const sizeInfo = sizeConfig[company.size];
		const statusInfo = statusConfig[company.status];
		const StatusIcon = statusInfo.icon;

		return (
			<Card variant="interactive" className="h-full">
				<CardContent className="p-6">
					<div className="flex items-start space-x-4 mb-4">
						{/* Logo */}
						<div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center flex-shrink-0">
							<BuildingOfficeIcon className="h-8 w-8 text-primary-500" />
						</div>
						
						{/* Company Info */}
						<div className="flex-1 min-w-0">
							<div className="flex items-start justify-between mb-2">
								<h3 className="text-lg font-semibold text-neutral-900 truncate">
									{company.name}
								</h3>
								{company.verified && (
									<StarIcon className="h-5 w-5 text-warning-500 fill-current flex-shrink-0" />
								)}
							</div>
							<div className="flex items-center space-x-2 mb-2">
								<span className={cn(
									"px-2 py-1 rounded-full text-xs font-medium",
									sizeInfo.bg,
									sizeInfo.color
								)}>
									{sizeInfo.label}
								</span>
								<span className={cn(
									"px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1",
									statusInfo.bg,
									statusInfo.color
								)}>
									<StatusIcon className="h-3 w-3" />
									<span>{statusInfo.label}</span>
								</span>
							</div>
							<div className="text-sm text-neutral-600 mb-2">
								{company.industry} • {company.location}
							</div>
						</div>
					</div>

					{/* Description */}
					<p className="text-sm text-neutral-600 mb-4 line-clamp-2">
						{company.description}
					</p>

					{/* Tags */}
					<div className="flex flex-wrap gap-1 mb-4">
						{company.tags.slice(0, 3).map((tag, idx) => (
							<span
								key={idx}
								className="px-2 py-1 bg-primary-50 text-primary-700 rounded text-xs"
							>
								{tag}
							</span>
						))}
						{company.tags.length > 3 && (
							<span className="px-2 py-1 bg-neutral-100 text-neutral-600 rounded text-xs">
								+{company.tags.length - 3} more
							</span>
						)}
					</div>

					{/* Stats Grid */}
					<div className="grid grid-cols-2 gap-4 mb-4 text-sm">
						<div>
							<div className="text-neutral-600">Revenue</div>
							<div className="font-semibold text-neutral-900">{company.revenue}</div>
						</div>
						<div>
							<div className="text-neutral-600">Employees</div>
							<div className="font-semibold text-neutral-900">{company.employees}</div>
						</div>
						<div>
							<div className="text-neutral-600">Founded</div>
							<div className="font-semibold text-neutral-900">{company.founded}</div>
						</div>
						<div>
							<div className="text-neutral-600">Rating</div>
							<div className="font-semibold text-neutral-900 flex items-center">
								{company.rating > 0 ? (
									<>
										{company.rating}
										<StarIcon className="h-4 w-4 text-warning-500 fill-current ml-1" />
									</>
								) : (
									<span className="text-neutral-400">No rating</span>
								)}
							</div>
						</div>
					</div>

					{/* Deal History */}
					{company.totalDeals > 0 && (
						<div className="mb-4 p-3 bg-neutral-50 rounded-lg">
							<div className="text-xs text-neutral-600 mb-2">Deal History</div>
							<div className="grid grid-cols-3 gap-2 text-xs">
								<div>
									<div className="font-medium text-neutral-900">{company.totalDeals}</div>
									<div className="text-neutral-600">Total Deals</div>
								</div>
								<div>
									<div className="font-medium text-success-600">{company.successRate}%</div>
									<div className="text-neutral-600">Success Rate</div>
								</div>
								<div>
									<div className="font-medium text-neutral-900">{company.averageDealTime}d</div>
									<div className="text-neutral-600">Avg. Time</div>
								</div>
							</div>
						</div>
					)}

					{/* Price and Actions */}
					<div className="flex items-center justify-between pt-4 border-t border-neutral-200">
						<div>
							{company.status !== "withdrawn" && (
								<>
									<div className="text-xl font-bold text-neutral-900">{company.price}</div>
									<div className="text-xs text-neutral-500">Listed price</div>
								</>
							)}
						</div>
						<div className="flex space-x-2">
							<Button variant="outline" size="sm" leftIcon={<EyeIcon className="h-4 w-4" />}>
								View
							</Button>
							{company.status === "listed" && (
								<Link href={`/company/${company.id}`}>
									<Button size="sm">
										Contact
									</Button>
								</Link>
							)}
						</div>
					</div>
				</CardContent>
			</Card>
		);
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
									Company Directory
								</h1>
								<p className="text-neutral-600">
									Explore businesses available for acquisition and their track records
								</p>
							</div>
							<Button leftIcon={<BuildingOfficeIcon className="h-4 w-4" />}>
								List Your Company
							</Button>
						</div>

						{/* Stats Overview */}
						<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
							<Card>
								<CardContent className="p-4 text-center">
									<BuildingOfficeIcon className="h-8 w-8 mx-auto text-primary-500 mb-2" />
									<div className="text-2xl font-bold text-neutral-900">{mockCompanies.length}</div>
									<div className="text-sm text-neutral-600">Total Companies</div>
								</CardContent>
							</Card>

							<Card>
								<CardContent className="p-4 text-center">
									<CheckCircleIcon className="h-8 w-8 mx-auto text-success-500 mb-2" />
									<div className="text-2xl font-bold text-neutral-900">
										{mockCompanies.filter(c => c.status === "listed").length}
									</div>
									<div className="text-sm text-neutral-600">Available</div>
								</CardContent>
							</Card>

							<Card>
								<CardContent className="p-4 text-center">
									<ChatBubbleLeftRightIcon className="h-8 w-8 mx-auto text-warning-500 mb-2" />
									<div className="text-2xl font-bold text-neutral-900">
										{mockCompanies.filter(c => c.status === "in_negotiation").length}
									</div>
									<div className="text-sm text-neutral-600">In Negotiation</div>
								</CardContent>
							</Card>

							<Card>
								<CardContent className="p-4 text-center">
									<BanknotesIcon className="h-8 w-8 mx-auto text-secondary-500 mb-2" />
									<div className="text-2xl font-bold text-neutral-900">
										{mockCompanies.filter(c => c.verified).length}
									</div>
									<div className="text-sm text-neutral-600">Verified</div>
								</CardContent>
							</Card>
						</div>

						{/* Search and Filters */}
						<div className="flex flex-col lg:flex-row gap-4 mb-6">
							{/* Search */}
							<div className="relative flex-1">
								<MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
								<input
									type="text"
									placeholder="Search companies..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
								/>
							</div>

							{/* Filters */}
							<div className="flex flex-wrap gap-2">
								<select
									value={selectedIndustry}
									onChange={(e) => setSelectedIndustry(e.target.value)}
									className="px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-sm"
								>
									{industries.map(industry => (
										<option key={industry} value={industry}>
											{industry === "All" ? "All Industries" : industry}
										</option>
									))}
								</select>

								<select
									value={selectedSize}
									onChange={(e) => setSelectedSize(e.target.value)}
									className="px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-sm"
								>
									{sizes.map(size => (
										<option key={size} value={size}>
											{size === "All" ? "All Sizes" : sizeConfig[size as keyof typeof sizeConfig]?.label || size}
										</option>
									))}
								</select>

								<select
									value={selectedStatus}
									onChange={(e) => setSelectedStatus(e.target.value)}
									className="px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-sm"
								>
									{statuses.map(status => (
										<option key={status} value={status}>
											{status === "All" ? "All Statuses" : statusConfig[status as keyof typeof statusConfig]?.label || status}
										</option>
									))}
								</select>
							</div>
						</div>

						{/* Results Summary */}
						<div className="flex items-center justify-between text-sm text-neutral-600">
							<span>{filteredCompanies.length} companies found</span>
							<div className="flex items-center space-x-2">
								<span>Sort by:</span>
								<select
									value={sortBy}
									onChange={(e) => setSortBy(e.target.value as "name" | "revenue" | "employees" | "founded")}
									className="border border-neutral-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-primary-500"
								>
									<option value="name">Company Name</option>
									<option value="revenue">Revenue</option>
									<option value="employees">Employees</option>
									<option value="founded">Founded Year</option>
								</select>
							</div>
						</div>
					</motion.div>

					{/* Companies Grid */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.2 }}
						className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
					>
						{filteredCompanies.map((company, index) => (
							<motion.div
								key={company.id}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: index * 0.1 }}
							>
								<CompanyCard company={company} />
							</motion.div>
						))}
					</motion.div>

					{filteredCompanies.length === 0 && (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							className="text-center py-12"
						>
							<BuildingOfficeIcon className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
							<h3 className="text-xl font-semibold text-neutral-900 mb-2">
								No companies found
							</h3>
							<p className="text-neutral-600 mb-6">
								Try adjusting your search criteria to find more companies.
							</p>
							<Button onClick={() => {
								setSearchTerm("");
								setSelectedIndustry("All");
								setSelectedSize("All");
								setSelectedStatus("All");
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