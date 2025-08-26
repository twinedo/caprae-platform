"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
	DocumentTextIcon,
	CloudArrowUpIcon,
	CheckCircleIcon,
	ExclamationTriangleIcon,
	SparklesIcon,
	EyeIcon,
	ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/design-system";

interface DocumentAnalysis {
	id: string;
	filename: string;
	type: "financial" | "legal" | "operational" | "tax";
	status: "analyzing" | "completed" | "error";
	uploadedAt: Date;
	analysis?: {
		summary: string;
		keyFindings: string[];
		riskFactors: string[];
		recommendations: string[];
		confidence: number;
	};
}

interface DocumentAnalyzerProps {
	documents?: DocumentAnalysis[];
	onUpload?: (files: FileList) => void;
	onAnalyze?: (documentId: string) => void;
}

const mockDocuments: DocumentAnalysis[] = [
	{
		id: "1",
		filename: "Financial_Statements_2023.pdf",
		type: "financial",
		status: "completed",
		uploadedAt: new Date(Date.now() - 86400000),
		analysis: {
			summary: "Strong financial performance with consistent revenue growth of 23% YoY. EBITDA margin improved from 18% to 24%. Working capital management shows efficiency gains.",
			keyFindings: [
				"Revenue increased 23% year-over-year",
				"EBITDA margin improved to 24%",
				"Debt-to-equity ratio at healthy 0.6",
				"Strong cash flow generation",
			],
			riskFactors: [
				"High customer concentration (top 3 = 45% revenue)",
				"Seasonal revenue fluctuations in Q1",
			],
			recommendations: [
				"Consider customer diversification strategy",
				"Evaluate seasonal working capital needs",
			],
			confidence: 92,
		},
	},
	{
		id: "2",
		filename: "Tax_Returns_2022_2023.pdf",
		type: "tax",
		status: "analyzing",
		uploadedAt: new Date(Date.now() - 3600000),
	},
	{
		id: "3",
		filename: "Legal_Contracts_Summary.pdf",
		type: "legal",
		status: "completed",
		uploadedAt: new Date(Date.now() - 7200000),
		analysis: {
			summary: "Comprehensive legal review shows well-structured contracts with standard terms. No significant legal risks identified. IP portfolio is properly protected.",
			keyFindings: [
				"All major contracts are properly executed",
				"IP portfolio includes 3 patents and 8 trademarks",
				"No pending litigation",
				"Compliance documentation up to date",
			],
			riskFactors: [
				"Two contracts expire within 6 months",
				"Non-compete clauses need review",
			],
			recommendations: [
				"Renew expiring contracts before acquisition",
				"Update employee agreements",
			],
			confidence: 88,
		},
	},
];

const documentTypeConfig = {
	financial: {
		color: "text-primary-600",
		bgColor: "bg-primary-50",
		icon: DocumentTextIcon,
		label: "Financial",
	},
	legal: {
		color: "text-blue-600",
		bgColor: "bg-blue-50",
		icon: DocumentTextIcon,
		label: "Legal",
	},
	operational: {
		color: "text-green-600",
		bgColor: "bg-green-50",
		icon: DocumentTextIcon,
		label: "Operational",
	},
	tax: {
		color: "text-amber-600",
		bgColor: "bg-amber-50",
		icon: DocumentTextIcon,
		label: "Tax",
	},
};

export function DocumentAnalyzer({
	documents = mockDocuments,
	onUpload,
	onAnalyze,
}: DocumentAnalyzerProps) {
	const [dragActive, setDragActive] = useState(false);
	const [selectedDocument, setSelectedDocument] = useState<string | null>(null);

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		setDragActive(false);
		if (onUpload && e.dataTransfer.files) {
			onUpload(e.dataTransfer.files);
		}
	};

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		setDragActive(true);
	};

	const handleDragLeave = (e: React.DragEvent) => {
		e.preventDefault();
		setDragActive(false);
	};

	const getStatusIcon = (status: DocumentAnalysis["status"]) => {
		switch (status) {
			case "completed":
				return <CheckCircleIcon className="h-5 w-5 text-success-500" />;
			case "analyzing":
				return (
					<motion.div
						animate={{ rotate: 360 }}
						transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
					>
						<SparklesIcon className="h-5 w-5 text-primary-500" />
					</motion.div>
				);
			case "error":
				return <ExclamationTriangleIcon className="h-5 w-5 text-error-500" />;
		}
	};

	return (
		<div className="space-y-6">
			{/* Upload Zone */}
			<Card className="relative border border-neutral-200">
				<CardContent className="p-8">
					<motion.div
						className={cn(
							"border-2 border-dashed rounded-lg p-8 text-center transition-colors",
							dragActive
								? "border-primary-400 bg-primary-50"
								: "border-neutral-300 hover:border-primary-300",
						)}
						onDrop={handleDrop}
						onDragOver={handleDragOver}
						onDragLeave={handleDragLeave}
						whileHover={{ scale: 1.01 }}
						transition={{ type: "spring", stiffness: 300, damping: 30 }}
					>
						<CloudArrowUpIcon className="mx-auto h-12 w-12 text-neutral-400 mb-4" />
						<h3 className="text-lg font-semibold text-neutral-900 mb-2">
							Upload Financial Documents
						</h3>
						<p className="text-neutral-600 mb-4">
							Drag and drop your files here, or click to browse
						</p>
						<Button variant="outline" leftIcon={<DocumentTextIcon className="h-4 w-4" />}>
							Choose Files
						</Button>
						<p className="text-xs text-neutral-500 mt-4">
							Supports: PDF, DOC, XLS, CSV (Max 10MB per file)
						</p>
					</motion.div>
				</CardContent>
			</Card>

			{/* Document List */}
			<div className="grid gap-4">
				{documents.map((doc) => {
					const config = documentTypeConfig[doc.type];
					const IconComponent = config.icon;

					return (
						<motion.div
							key={doc.id}
							layout
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3 }}
						>
							<Card
								variant="interactive"
								className="cursor-pointer"
								onClick={() =>
									setSelectedDocument(
										selectedDocument === doc.id ? null : doc.id,
									)
								}
							>
								<CardContent className="p-4">
									<div className="flex items-center justify-between">
										<div className="flex items-center space-x-3">
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
											<div>
												<h4 className="font-medium text-neutral-900">
													{doc.filename}
												</h4>
												<div className="flex items-center space-x-2 text-sm text-neutral-600">
													<span className={config.color}>
														{config.label}
													</span>
													<span>•</span>
													<span>
														{doc.uploadedAt.toLocaleDateString()}
													</span>
												</div>
											</div>
										</div>
										<div className="flex items-center space-x-3">
											{getStatusIcon(doc.status)}
											<EyeIcon className="h-4 w-4 text-neutral-400" />
										</div>
									</div>

									<AnimatePresence>
										{selectedDocument === doc.id && doc.analysis && (
											<motion.div
												initial={{ opacity: 0, height: 0 }}
												animate={{ opacity: 1, height: "auto" }}
												exit={{ opacity: 0, height: 0 }}
												transition={{ duration: 0.3 }}
												className="mt-4 pt-4 border-t border-neutral-200"
											>
												<div className="space-y-4">
													{/* Confidence Score */}
													<div className="flex items-center justify-between">
														<span className="text-sm font-medium text-neutral-700">
															AI Confidence
														</span>
														<div className="flex items-center space-x-2">
															<div className="w-20 h-2 bg-neutral-200 rounded-full overflow-hidden">
																<motion.div
																	className="h-full bg-gradient-to-r from-primary-500 to-success-500"
																	initial={{ width: 0 }}
																	animate={{
																		width: `${doc.analysis.confidence}%`,
																	}}
																	transition={{ duration: 1, delay: 0.2 }}
																/>
															</div>
															<span className="text-sm font-semibold text-neutral-900">
																{doc.analysis.confidence}%
															</span>
														</div>
													</div>

													{/* Summary */}
													<div>
														<h5 className="text-sm font-medium text-neutral-900 mb-2">
															Summary
														</h5>
														<p className="text-sm text-neutral-600">
															{doc.analysis.summary}
														</p>
													</div>

													{/* Key Findings */}
													<div>
														<h5 className="text-sm font-medium text-neutral-900 mb-2">
															Key Findings
														</h5>
														<ul className="space-y-1">
															{doc.analysis.keyFindings.map(
																(finding, index) => (
																	<li
																		key={index}
																		className="flex items-start space-x-2 text-sm text-neutral-600"
																	>
																		<CheckCircleIcon className="h-4 w-4 text-success-500 mt-0.5 flex-shrink-0" />
																		<span>{finding}</span>
																	</li>
																),
															)}
														</ul>
													</div>

													{/* Risk Factors */}
													{doc.analysis.riskFactors.length > 0 && (
														<div>
															<h5 className="text-sm font-medium text-neutral-900 mb-2">
																Risk Factors
															</h5>
															<ul className="space-y-1">
																{doc.analysis.riskFactors.map(
																	(risk, index) => (
																		<li
																			key={index}
																			className="flex items-start space-x-2 text-sm text-neutral-600"
																		>
																			<ExclamationTriangleIcon className="h-4 w-4 text-warning-500 mt-0.5 flex-shrink-0" />
																			<span>{risk}</span>
																		</li>
																	),
																)}
															</ul>
														</div>
													)}

													{/* Recommendations */}
													<div>
														<h5 className="text-sm font-medium text-neutral-900 mb-2">
															AI Recommendations
														</h5>
														<ul className="space-y-1">
															{doc.analysis.recommendations.map(
																(rec, index) => (
																	<li
																		key={index}
																		className="flex items-start space-x-2 text-sm text-neutral-600"
																	>
																		<SparklesIcon className="h-4 w-4 text-primary-500 mt-0.5 flex-shrink-0" />
																		<span>{rec}</span>
																	</li>
																),
															)}
														</ul>
													</div>

													{/* Actions */}
													<div className="flex space-x-2 pt-2">
														<Button
															size="sm"
															variant="outline"
															leftIcon={
																<ArrowDownTrayIcon className="h-4 w-4" />
															}
														>
															Download Report
														</Button>
														<Button
															size="sm"
															variant="outline"
															leftIcon={<EyeIcon className="h-4 w-4" />}
														>
															View Details
														</Button>
													</div>
												</div>
											</motion.div>
										)}
									</AnimatePresence>
								</CardContent>
							</Card>
						</motion.div>
					);
				})}
			</div>
		</div>
	);
}