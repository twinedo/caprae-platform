"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DocumentAnalyzer } from "@/components/ai/document-analyzer";
import { DealOptimizer } from "@/components/ai/deal-optimizer";
import { AIInsights } from "@/components/ai/ai-insights";
import {
	CheckIcon,
	ClockIcon,
	DocumentTextIcon,
	SparklesIcon,
	CurrencyDollarIcon,
	HandRaisedIcon,
	BanknotesIcon,
	ShieldCheckIcon,
	ChatBubbleLeftRightIcon,
	EyeIcon,
	ExclamationTriangleIcon
} from "@heroicons/react/24/outline";
import { CheckIcon as CheckSolidIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

interface Deal {
	id: string;
	buyerName: string;
	sellerName: string;
	businessName: string;
	stage: DealStage;
	value: string;
	progress: number;
	documents: { name: string; status: string; aiSummary?: string }[];
	tasks: { title: string; assignee: string; status: string; priority: string }[];
	aiInsights: { type: string; title: string; message: string }[];
}

type DealStage = "initial_contact" | "nda_signed" | "due_diligence" | "valuation" | "negotiation" | "closing" | "completed";

const stageInfo: Record<DealStage, { title: string; icon: any; color: string }> = {
	initial_contact: { title: "Initial Contact", icon: ChatBubbleLeftRightIcon, color: "bg-blue-100 text-blue-700" },
	nda_signed: { title: "NDA Signed", icon: ShieldCheckIcon, color: "bg-green-100 text-green-700" },
	due_diligence: { title: "Due Diligence", icon: DocumentTextIcon, color: "bg-purple-100 text-purple-700" },
	valuation: { title: "Valuation", icon: CurrencyDollarIcon, color: "bg-yellow-100 text-yellow-700" },
	negotiation: { title: "Negotiation", icon: HandRaisedIcon, color: "bg-orange-100 text-orange-700" },
	closing: { title: "Closing", icon: BanknotesIcon, color: "bg-emerald-100 text-emerald-700" },
	completed: { title: "Completed", icon: CheckSolidIcon, color: "bg-success-100 text-success-700" }
};

const mockDeal: Deal = {
	id: "deal-001",
	buyerName: "Sarah Chen",
	sellerName: "Mike Johnson", 
	businessName: "TechFlow Solutions",
	stage: "due_diligence",
	value: "$2.8M",
	progress: 45,
	documents: [
		{ name: "Financial Statements", status: "reviewed", aiSummary: "Strong revenue growth, healthy margins" },
		{ name: "Tax Returns", status: "pending" },
		{ name: "Customer Contracts", status: "uploaded" },
		{ name: "Employee Records", status: "approved" }
	],
	tasks: [
		{ title: "Review Q4 financials", assignee: "buyer", status: "in_progress", priority: "high" },
		{ title: "Upload tax returns", assignee: "seller", status: "pending", priority: "high" },
		{ title: "Schedule interviews", assignee: "both", status: "completed", priority: "medium" }
	],
	aiInsights: [
		{ type: "recommendation", title: "Valuation Range", message: "Based on comparables: $2.6M - $3.2M" },
		{ type: "warning", title: "Customer Risk", message: "Top 3 customers = 67% of revenue" },
		{ type: "opportunity", title: "Growth Potential", message: "40%+ growth potential identified" }
	]
};

export default function AcquisitionWorkflow() {
	const [activeTab, setActiveTab] = useState<"overview" | "documents" | "tasks" | "optimizer" | "insights">("overview");
	const [deal] = useState<Deal>(mockDeal);

	return (
		<div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
			{/* Navigation */}
			<nav className="border-b border-neutral-200/50 bg-white/80 backdrop-blur-sm">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="flex h-16 items-center justify-between">
						<Link href="/" className="flex items-center space-x-2">
							<div className="flex h-8 w-8 items-center justify-center rounded-lg overflow-hidden">
								<Image src="/logo.png" alt="Caprae Logo" width={32} height={32} className="w-full h-full object-contain" />
							</div>
							<span className="text-xl font-bold gradient-text">Caprae</span>
						</Link>
						<Link href="/dashboard/seller" className="text-neutral-600 hover:text-primary-600 transition-colors">
							← Back to Dashboard
						</Link>
					</div>
				</div>
			</nav>

			<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
				{/* Deal Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="mb-8"
				>
					<div className="flex items-start justify-between mb-6">
						<div>
							<h1 className="text-3xl font-bold text-neutral-900 mb-2">
								{deal.businessName} Acquisition
							</h1>
							<p className="text-neutral-600">
								{deal.buyerName} ↔ {deal.sellerName} • Deal Value: {deal.value}
							</p>
						</div>
						<div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${stageInfo[deal.stage].color}`}>
							{stageInfo[deal.stage].title}
						</div>
					</div>

					{/* Progress Timeline */}
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center">
								<ClockIcon className="h-5 w-5 mr-2 text-primary-600" />
								Deal Progress
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="mb-4">
								<div className="flex justify-between text-sm text-neutral-600 mb-2">
									<span>Progress</span>
									<span>{deal.progress}% Complete</span>
								</div>
								<div className="w-full bg-neutral-200 rounded-full h-2">
									<motion.div
										className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full"
										initial={{ width: 0 }}
										animate={{ width: `${deal.progress}%` }}
										transition={{ duration: 1 }}
									/>
								</div>
							</div>

							<div className="grid grid-cols-4 lg:grid-cols-7 gap-4">
								{Object.entries(stageInfo).map(([stage, info], index) => {
									const Icon = info.icon;
									const isCompleted = Object.keys(stageInfo).indexOf(deal.stage) >= index;
									const isCurrent = stage === deal.stage;

									return (
										<div key={stage} className="text-center">
											<div className={`
												w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-2
												${isCurrent ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white ring-4 ring-primary-200" 
												: isCompleted ? "bg-success-500 text-white" 
												: "bg-neutral-200 text-neutral-400"}
											`}>
												<Icon className="h-5 w-5" />
											</div>
											<p className="text-xs font-medium text-neutral-700">{info.title}</p>
										</div>
									);
								})}
							</div>
						</CardContent>
					</Card>
				</motion.div>

				{/* Navigation Tabs */}
				<div className="border-b border-neutral-200 mb-6">
					<nav className="flex space-x-8">
						{[
							{ id: "overview", label: "Overview", icon: EyeIcon },
							{ id: "documents", label: "Documents", icon: DocumentTextIcon },
							{ id: "tasks", label: "Tasks", icon: CheckIcon },
							{ id: "optimizer", label: "AI Optimizer", icon: SparklesIcon },
							{ id: "insights", label: "Market Intelligence", icon: SparklesIcon }
						].map((tab) => {
							const Icon = tab.icon;
							return (
								<button
									key={tab.id}
									onClick={() => setActiveTab(tab.id as any)}
									className={`
										flex items-center space-x-2 py-4 px-1 border-b-2 transition-colors
										${activeTab === tab.id 
											? "border-primary-500 text-primary-600" 
											: "border-transparent text-neutral-500 hover:text-neutral-700"}
									`}
								>
									<Icon className="h-5 w-5" />
									<span className="font-medium">{tab.label}</span>
								</button>
							);
						})}
					</nav>
				</div>

				{/* Tab Content */}
				<AnimatePresence mode="wait">
					{activeTab === "overview" && (
						<motion.div
							key="overview"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							className="grid grid-cols-1 lg:grid-cols-2 gap-6"
						>
							<Card>
								<CardHeader>
									<CardTitle>Deal Summary</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="flex justify-between">
										<span className="text-neutral-600">Deal Value</span>
										<span className="font-semibold">{deal.value}</span>
									</div>
									<div className="flex justify-between">
										<span className="text-neutral-600">Stage</span>
										<span className="font-semibold">{stageInfo[deal.stage].title}</span>
									</div>
									<div className="flex justify-between">
										<span className="text-neutral-600">Documents</span>
										<span className="font-semibold">{deal.documents.length}</span>
									</div>
									<div className="flex justify-between">
										<span className="text-neutral-600">Active Tasks</span>
										<span className="font-semibold">{deal.tasks.filter(t => t.status !== "completed").length}</span>
									</div>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle>Next Steps</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="space-y-3">
										{deal.tasks.filter(t => t.status !== "completed").slice(0, 3).map((task, index) => (
											<div key={index} className="flex items-center space-x-3">
												<div className={`w-2 h-2 rounded-full ${task.priority === "high" ? "bg-red-500" : "bg-yellow-500"}`} />
												<div className="flex-1">
													<p className="text-sm font-medium">{task.title}</p>
													<p className="text-xs text-neutral-500">{task.assignee}</p>
												</div>
											</div>
										))}
									</div>
								</CardContent>
							</Card>
						</motion.div>
					)}

					{activeTab === "documents" && (
						<motion.div
							key="documents"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
						>
							<DocumentAnalyzer />
						</motion.div>
					)}

					{activeTab === "optimizer" && (
						<motion.div
							key="optimizer"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
						>
							<DealOptimizer dealId={deal.id} />
						</motion.div>
					)}

					{activeTab === "insights" && (
						<motion.div
							key="insights"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
						>
							<AIInsights userType="seller" />
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
}