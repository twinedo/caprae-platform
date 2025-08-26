"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageLayout } from "@/components/layout/page-layout";
import {
	UserIcon,
	PencilIcon,
	CheckIcon,
	XMarkIcon,
	CameraIcon,
	MapPinIcon,
	BriefcaseIcon,
	BuildingOfficeIcon,
	GlobeAltIcon,
	PhoneIcon,
	EnvelopeIcon,
	CalendarIcon,
	TrophyIcon,
	ChartBarIcon,
	DocumentTextIcon,
	LinkIcon,
	PlusIcon,
	TrashIcon,
	ArrowLeftIcon,
	StarIcon
} from "@heroicons/react/24/outline";
import { StarIcon as StarSolidIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

interface EditableFieldProps {
	label: string;
	value: string;
	onSave: (value: string) => void;
	type?: "text" | "email" | "tel" | "url" | "textarea";
	placeholder?: string;
	multiline?: boolean;
}

function EditableField({ 
	label, 
	value, 
	onSave, 
	type = "text", 
	placeholder,
	multiline = false 
}: EditableFieldProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [editValue, setEditValue] = useState(value);

	const handleSave = () => {
		onSave(editValue);
		setIsEditing(false);
	};

	const handleCancel = () => {
		setEditValue(value);
		setIsEditing(false);
	};

	return (
		<div className="group">
			<label className="block text-sm font-medium text-neutral-700 mb-1">
				{label}
			</label>
			{isEditing ? (
				<div className="space-y-2">
					{multiline ? (
						<textarea
							value={editValue}
							onChange={(e) => setEditValue(e.target.value)}
							placeholder={placeholder}
							className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
							rows={4}
							autoFocus
						/>
					) : (
						<Input
							type={type}
							value={editValue}
							onChange={(e) => setEditValue(e.target.value)}
							placeholder={placeholder}
							autoFocus
						/>
					)}
					<div className="flex space-x-2">
						<Button size="sm" onClick={handleSave}>
							<CheckIcon className="h-4 w-4 mr-1" />
							Save
						</Button>
						<Button size="sm" variant="outline" onClick={handleCancel}>
							<XMarkIcon className="h-4 w-4 mr-1" />
							Cancel
						</Button>
					</div>
				</div>
			) : (
				<div className="flex items-center justify-between group">
					<div className="flex-1">
						{multiline ? (
							<p className="text-neutral-900 whitespace-pre-wrap min-h-[3rem]">
								{value || <span className="text-neutral-400">No {label.toLowerCase()} provided</span>}
							</p>
						) : (
							<p className="text-neutral-900">
								{value || <span className="text-neutral-400">No {label.toLowerCase()} provided</span>}
							</p>
						)}
					</div>
					<Button
						size="sm"
						variant="ghost"
						onClick={() => setIsEditing(true)}
						className="opacity-0 group-hover:opacity-100 transition-opacity"
					>
						<PencilIcon className="h-4 w-4" />
					</Button>
				</div>
			)}
		</div>
	);
}

interface Skill {
	id: string;
	name: string;
	level: 1 | 2 | 3 | 4 | 5;
}

interface Experience {
	id: string;
	company: string;
	position: string;
	duration: string;
	description: string;
}

interface Achievement {
	id: string;
	title: string;
	description: string;
	date: string;
	icon: string;
}

export default function ProfilePage() {
	const [profileData, setProfileData] = useState({
		firstName: "John",
		lastName: "Doe",
		title: "Senior Business Development Manager",
		company: "Tech Ventures Inc.",
		location: "San Francisco, CA",
		email: "john.doe@techventures.com",
		phone: "+1 (555) 123-4567",
		website: "https://johndoe.com",
		bio: "Experienced business development professional with 8+ years in M&A, specializing in tech startups and SaaS companies. Passionate about connecting innovative entrepreneurs with growth capital.",
		joinDate: "March 2023",
	});

	const [skills, setSkills] = useState<Skill[]>([
		{ id: "1", name: "Due Diligence", level: 5 },
		{ id: "2", name: "Financial Analysis", level: 4 },
		{ id: "3", name: "Negotiation", level: 5 },
		{ id: "4", name: "Market Research", level: 4 },
		{ id: "5", name: "SaaS Valuation", level: 5 },
		{ id: "6", name: "Strategic Planning", level: 4 },
	]);

	const [experiences, setExperiences] = useState<Experience[]>([
		{
			id: "1",
			company: "Tech Ventures Inc.",
			position: "Senior Business Development Manager",
			duration: "2021 - Present",
			description: "Led 15+ successful acquisitions totaling $120M in deal value. Specialized in SaaS and fintech startups."
		},
		{
			id: "2",
			company: "Growth Capital Partners",
			position: "Investment Analyst",
			duration: "2019 - 2021",
			description: "Conducted financial analysis and due diligence for mid-market acquisitions. Supported deals ranging from $5M-$50M."
		},
		{
			id: "3",
			company: "Startup Advisors",
			position: "Business Consultant",
			duration: "2017 - 2019",
			description: "Advised early-stage startups on growth strategies and fundraising. Helped 20+ companies raise seed funding."
		},
	]);

	const [achievements, setAchievements] = useState<Achievement[]>([
		{
			id: "1",
			title: "Top Performer 2023",
			description: "Closed the highest deal volume in company history",
			date: "December 2023",
			icon: "🏆"
		},
		{
			id: "2",
			title: "Certified M&A Professional",
			description: "Completed advanced M&A certification program",
			date: "June 2023",
			icon: "🎓"
		},
		{
			id: "3",
			title: "Deal of the Year",
			description: "Led acquisition of TechCorp for $45M",
			date: "March 2023",
			icon: "💼"
		},
	]);

	const [isUploading, setIsUploading] = useState(false);

	const updateProfileField = (field: keyof typeof profileData, value: string) => {
		setProfileData(prev => ({ ...prev, [field]: value }));
	};

	const handleAvatarUpload = () => {
		setIsUploading(true);
		// Simulate upload
		setTimeout(() => {
			setIsUploading(false);
		}, 2000);
	};

	const addSkill = (name: string, level: number) => {
		const newSkill: Skill = {
			id: Date.now().toString(),
			name,
			level: level as 1 | 2 | 3 | 4 | 5,
		};
		setSkills([...skills, newSkill]);
	};

	const removeSkill = (id: string) => {
		setSkills(skills.filter(skill => skill.id !== id));
	};

	const renderStars = (level: number) => {
		return Array.from({ length: 5 }, (_, i) => (
			i < level ? (
				<StarSolidIcon key={i} className="h-4 w-4 text-warning-500" />
			) : (
				<StarIcon key={i} className="h-4 w-4 text-neutral-300" />
			)
		));
	};

	return (
		<PageLayout>
			<div className="py-8">
			<div className="max-w-6xl mx-auto px-4">
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3 }}
					className="mb-8"
				>
					<Link
						href="/dashboard"
						className="inline-flex items-center text-neutral-600 hover:text-neutral-900 mb-4 transition-colors"
					>
						<ArrowLeftIcon className="h-4 w-4 mr-2" />
						Back to Dashboard
					</Link>
					<div className="flex items-center space-x-4">
						<div className="p-3 bg-primary-100 rounded-xl">
							<UserIcon className="h-8 w-8 text-primary-600" />
						</div>
						<div>
							<h1 className="text-3xl font-bold text-neutral-900">My Profile</h1>
							<p className="text-neutral-600">Manage your professional profile and showcase your expertise</p>
						</div>
					</div>
				</motion.div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Left Column - Profile Overview */}
					<div className="lg:col-span-1 space-y-6">
						{/* Profile Card */}
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.3 }}
						>
							<Card>
								<CardContent className="p-6 text-center">
									{/* Avatar */}
									<div className="relative mb-6">
										<div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center mx-auto">
											<UserIcon className="h-16 w-16 text-white" />
										</div>
										<motion.button
											className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-lg border border-neutral-200 hover:bg-neutral-50"
											onClick={handleAvatarUpload}
											whileHover={{ scale: 1.05 }}
											whileTap={{ scale: 0.95 }}
										>
											{isUploading ? (
												<motion.div
													className="h-4 w-4 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"
													initial={{ opacity: 0 }}
													animate={{ opacity: 1 }}
												/>
											) : (
												<CameraIcon className="h-4 w-4 text-neutral-600" />
											)}
										</motion.button>
									</div>

									{/* Basic Info */}
									<h2 className="text-2xl font-bold text-neutral-900 mb-1">
										{profileData.firstName} {profileData.lastName}
									</h2>
									<p className="text-neutral-600 mb-2">{profileData.title}</p>
									<p className="text-sm text-neutral-500 mb-4">{profileData.company}</p>

									{/* Stats */}
									<div className="grid grid-cols-3 gap-4 mb-6">
										<div className="text-center">
											<div className="text-xl font-bold text-primary-600">23</div>
											<div className="text-xs text-neutral-600">Deals</div>
										</div>
										<div className="text-center">
											<div className="text-xl font-bold text-secondary-600">95%</div>
											<div className="text-xs text-neutral-600">Success Rate</div>
										</div>
										<div className="text-center">
											<div className="text-xl font-bold text-success-600">4.9</div>
											<div className="text-xs text-neutral-600">Rating</div>
										</div>
									</div>

									{/* Quick Contact */}
									<div className="space-y-2 text-sm">
										<div className="flex items-center justify-center space-x-2 text-neutral-600">
											<EnvelopeIcon className="h-4 w-4" />
											<span>{profileData.email}</span>
										</div>
										<div className="flex items-center justify-center space-x-2 text-neutral-600">
											<PhoneIcon className="h-4 w-4" />
											<span>{profileData.phone}</span>
										</div>
										<div className="flex items-center justify-center space-x-2 text-neutral-600">
											<MapPinIcon className="h-4 w-4" />
											<span>{profileData.location}</span>
										</div>
										<div className="flex items-center justify-center space-x-2 text-neutral-600">
											<CalendarIcon className="h-4 w-4" />
											<span>Member since {profileData.joinDate}</span>
										</div>
									</div>
								</CardContent>
							</Card>
						</motion.div>

						{/* Skills Card */}
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.3, delay: 0.1 }}
						>
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center justify-between">
										<span>Skills & Expertise</span>
										<Button size="sm" variant="ghost" leftIcon={<PlusIcon className="h-4 w-4" />}>
											Add
										</Button>
									</CardTitle>
								</CardHeader>
								<CardContent className="space-y-3">
									{skills.map((skill) => (
										<div key={skill.id} className="group">
											<div className="flex items-center justify-between mb-1">
												<span className="text-sm font-medium text-neutral-900">{skill.name}</span>
												<button
													onClick={() => removeSkill(skill.id)}
													className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-neutral-100 rounded"
												>
													<XMarkIcon className="h-3 w-3 text-neutral-400" />
												</button>
											</div>
											<div className="flex space-x-1">
												{renderStars(skill.level)}
											</div>
										</div>
									))}
								</CardContent>
							</Card>
						</motion.div>

						{/* Achievements Card */}
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.3, delay: 0.2 }}
						>
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center space-x-2">
										<TrophyIcon className="h-5 w-5 text-warning-500" />
										<span>Achievements</span>
									</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									{achievements.map((achievement) => (
										<div key={achievement.id} className="flex items-start space-x-3">
											<div className="text-2xl">{achievement.icon}</div>
											<div className="flex-1">
												<h4 className="font-medium text-neutral-900">{achievement.title}</h4>
												<p className="text-sm text-neutral-600">{achievement.description}</p>
												<p className="text-xs text-neutral-500 mt-1">{achievement.date}</p>
											</div>
										</div>
									))}
								</CardContent>
							</Card>
						</motion.div>
					</div>

					{/* Right Column - Detailed Information */}
					<div className="lg:col-span-2 space-y-6">
						{/* Basic Information */}
						<motion.div
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.3 }}
						>
							<Card>
								<CardHeader>
									<CardTitle>Basic Information</CardTitle>
								</CardHeader>
								<CardContent className="space-y-6">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<EditableField
											label="First Name"
											value={profileData.firstName}
											onSave={(value) => updateProfileField("firstName", value)}
											placeholder="Enter your first name"
										/>
										<EditableField
											label="Last Name"
											value={profileData.lastName}
											onSave={(value) => updateProfileField("lastName", value)}
											placeholder="Enter your last name"
										/>
										<EditableField
											label="Professional Title"
											value={profileData.title}
											onSave={(value) => updateProfileField("title", value)}
											placeholder="e.g. Senior Business Development Manager"
										/>
										<EditableField
											label="Company"
											value={profileData.company}
											onSave={(value) => updateProfileField("company", value)}
											placeholder="Your current company"
										/>
										<EditableField
											label="Email Address"
											value={profileData.email}
											onSave={(value) => updateProfileField("email", value)}
											type="email"
											placeholder="your.email@company.com"
										/>
										<EditableField
											label="Phone Number"
											value={profileData.phone}
											onSave={(value) => updateProfileField("phone", value)}
											type="tel"
											placeholder="+1 (555) 123-4567"
										/>
										<EditableField
											label="Location"
											value={profileData.location}
											onSave={(value) => updateProfileField("location", value)}
											placeholder="City, State/Country"
										/>
										<EditableField
											label="Website"
											value={profileData.website}
											onSave={(value) => updateProfileField("website", value)}
											type="url"
											placeholder="https://your-website.com"
										/>
									</div>
									<EditableField
										label="Professional Bio"
										value={profileData.bio}
										onSave={(value) => updateProfileField("bio", value)}
										placeholder="Tell others about your experience, expertise, and what you're looking for..."
										multiline
									/>
								</CardContent>
							</Card>
						</motion.div>

						{/* Professional Experience */}
						<motion.div
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.3, delay: 0.1 }}
						>
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center justify-between">
										<span>Professional Experience</span>
										<Button size="sm" variant="ghost" leftIcon={<PlusIcon className="h-4 w-4" />}>
											Add Experience
										</Button>
									</CardTitle>
								</CardHeader>
								<CardContent className="space-y-6">
									{experiences.map((experience, index) => (
										<div key={experience.id} className="group relative">
											{index !== experiences.length - 1 && (
												<div className="absolute left-6 top-12 bottom-0 w-px bg-neutral-200" />
											)}
											<div className="flex items-start space-x-4">
												<div className="p-2 bg-primary-100 rounded-lg mt-1">
													<BriefcaseIcon className="h-4 w-4 text-primary-600" />
												</div>
												<div className="flex-1">
													<div className="flex items-start justify-between">
														<div>
															<h4 className="font-medium text-neutral-900">{experience.position}</h4>
															<p className="text-sm text-neutral-600">{experience.company}</p>
															<p className="text-xs text-neutral-500">{experience.duration}</p>
														</div>
														<Button
															size="sm"
															variant="ghost"
															className="opacity-0 group-hover:opacity-100 transition-opacity"
														>
															<PencilIcon className="h-4 w-4" />
														</Button>
													</div>
													<p className="text-sm text-neutral-700 mt-2">{experience.description}</p>
												</div>
											</div>
										</div>
									))}
								</CardContent>
							</Card>
						</motion.div>

						{/* Performance Analytics */}
						<motion.div
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.3, delay: 0.2 }}
						>
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center space-x-2">
										<ChartBarIcon className="h-5 w-5 text-primary-600" />
										<span>Performance Analytics</span>
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
										<div className="text-center p-4 bg-primary-50 rounded-lg">
											<div className="text-2xl font-bold text-primary-600">23</div>
											<div className="text-sm text-neutral-600">Total Deals</div>
										</div>
										<div className="text-center p-4 bg-success-50 rounded-lg">
											<div className="text-2xl font-bold text-success-600">$2.4M</div>
											<div className="text-sm text-neutral-600">Deal Volume</div>
										</div>
										<div className="text-center p-4 bg-secondary-50 rounded-lg">
											<div className="text-2xl font-bold text-secondary-600">45 days</div>
											<div className="text-sm text-neutral-600">Avg. Close Time</div>
										</div>
										<div className="text-center p-4 bg-warning-50 rounded-lg">
											<div className="text-2xl font-bold text-warning-600">95%</div>
											<div className="text-sm text-neutral-600">Success Rate</div>
										</div>
									</div>

									{/* Recent Activity */}
									<div className="mt-8">
										<h4 className="font-medium text-neutral-900 mb-4">Recent Activity</h4>
										<div className="space-y-3">
											{[
												{ action: "Closed deal with TechStartup Inc.", date: "2 days ago", type: "success" },
												{ action: "Started due diligence for MarketCorp", date: "1 week ago", type: "progress" },
												{ action: "Initial meeting with DataFlow Ltd.", date: "2 weeks ago", type: "meeting" },
											].map((activity, index) => (
												<div key={index} className="flex items-center space-x-3 p-3 bg-neutral-50 rounded-lg">
													<div className={`w-2 h-2 rounded-full ${
														activity.type === 'success' ? 'bg-success-500' :
														activity.type === 'progress' ? 'bg-warning-500' :
														'bg-primary-500'
													}`} />
													<div className="flex-1">
														<p className="text-sm text-neutral-900">{activity.action}</p>
														<p className="text-xs text-neutral-500">{activity.date}</p>
													</div>
												</div>
											))}
										</div>
									</div>
								</CardContent>
							</Card>
						</motion.div>
					</div>
				</div>
				</div>
			</div>
		</PageLayout>
	);
}