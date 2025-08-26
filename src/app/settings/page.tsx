"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToggleSwitch } from "@/components/ui/toggle-switch";
import { SettingsSection } from "@/components/ui/settings-section";
import { PageLayout } from "@/components/layout/page-layout";
import {
	UserIcon,
	BellIcon,
	ShieldCheckIcon,
	CreditCardIcon,
	GlobeAltIcon,
	DocumentTextIcon,
	TrashIcon,
	KeyIcon,
	DevicePhoneMobileIcon,
	EnvelopeIcon,
	EyeIcon,
	EyeSlashIcon,
	PlusIcon,
	XMarkIcon,
	CheckIcon,
	ExclamationTriangleIcon,
	CogIcon,
	ArrowLeftIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";



export default function SettingsPage() {
	const [notifications, setNotifications] = useState({
		email: true,
		push: true,
		sms: false,
		deals: true,
		messages: true,
		updates: false,
		marketing: false,
	});

	const [privacy, setPrivacy] = useState({
		profileVisible: true,
		showEmail: false,
		showPhone: false,
		allowMessages: true,
		dataCollection: true,
	});

	const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [deleteConfirmation, setDeleteConfirmation] = useState("");

	return (
		<PageLayout>
			<div className="py-8">
			<div className="max-w-4xl mx-auto px-4">
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
							<CogIcon className="h-8 w-8 text-primary-600" />
						</div>
						<div>
							<h1 className="text-3xl font-bold text-neutral-900">Settings</h1>
							<p className="text-neutral-600">Manage your account preferences and privacy settings</p>
						</div>
					</div>
				</motion.div>

				{/* Account Settings */}
				<SettingsSection
					title="Account Settings"
					description="Manage your basic account information and preferences"
					icon={<UserIcon className="h-5 w-5 text-primary-600" />}
				>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium text-neutral-700 mb-1">
								First Name
							</label>
							<Input placeholder="Enter your first name" defaultValue="John" />
						</div>
						<div>
							<label className="block text-sm font-medium text-neutral-700 mb-1">
								Last Name
							</label>
							<Input placeholder="Enter your last name" defaultValue="Doe" />
						</div>
						<div>
							<label className="block text-sm font-medium text-neutral-700 mb-1">
								Email Address
							</label>
							<Input placeholder="Enter your email" defaultValue="john@example.com" />
						</div>
						<div>
							<label className="block text-sm font-medium text-neutral-700 mb-1">
								Phone Number
							</label>
							<Input placeholder="Enter your phone number" defaultValue="+1 (555) 123-4567" />
						</div>
					</div>
					<div className="flex justify-end pt-4">
						<Button>Save Changes</Button>
					</div>
				</SettingsSection>

				{/* Security Settings */}
				<SettingsSection
					title="Security & Authentication"
					description="Protect your account with advanced security features"
					icon={<ShieldCheckIcon className="h-5 w-5 text-primary-600" />}
				>
					<div className="space-y-6">
						{/* Password Change */}
						<div>
							<h4 className="font-medium text-neutral-900 mb-3">Change Password</h4>
							<div className="grid gap-3">
								<div className="relative">
									<Input
										type={showPassword ? "text" : "password"}
										placeholder="Current password"
									/>
									<button
										type="button"
										className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
										onClick={() => setShowPassword(!showPassword)}
									>
										{showPassword ? (
											<EyeSlashIcon className="h-4 w-4" />
										) : (
											<EyeIcon className="h-4 w-4" />
										)}
									</button>
								</div>
								<Input type="password" placeholder="New password" />
								<Input type="password" placeholder="Confirm new password" />
								<div className="flex justify-end">
									<Button variant="outline" size="sm">Update Password</Button>
								</div>
							</div>
						</div>

						{/* Two-Factor Authentication */}
						<div className="border-t border-neutral-200 pt-6">
							<ToggleSwitch
								enabled={twoFactorEnabled}
								onChange={setTwoFactorEnabled}
								label="Two-Factor Authentication"
								description="Add an extra layer of security to your account"
							/>
							{twoFactorEnabled && (
								<motion.div
									initial={{ opacity: 0, height: 0 }}
									animate={{ opacity: 1, height: "auto" }}
									exit={{ opacity: 0, height: 0 }}
									className="mt-4 p-4 bg-primary-50 rounded-lg"
								>
									<div className="flex items-center space-x-3">
										<DevicePhoneMobileIcon className="h-5 w-5 text-primary-600" />
										<div>
											<p className="font-medium text-primary-900">Authenticator App</p>
											<p className="text-sm text-primary-700">Use Google Authenticator or similar app</p>
										</div>
										<Button size="sm">Setup</Button>
									</div>
								</motion.div>
							)}
						</div>

						{/* Active Sessions */}
						<div className="border-t border-neutral-200 pt-6">
							<h4 className="font-medium text-neutral-900 mb-3">Active Sessions</h4>
							<div className="space-y-3">
								<div className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
									<div className="flex items-center space-x-3">
										<div className="p-2 bg-success-100 rounded-lg">
											<DevicePhoneMobileIcon className="h-4 w-4 text-success-600" />
										</div>
										<div>
											<p className="font-medium text-neutral-900">Current Session</p>
											<p className="text-sm text-neutral-600">Chrome on MacOS • San Francisco, CA</p>
										</div>
									</div>
									<span className="text-xs text-success-600 font-medium">Active now</span>
								</div>
								<div className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
									<div className="flex items-center space-x-3">
										<div className="p-2 bg-neutral-200 rounded-lg">
											<DevicePhoneMobileIcon className="h-4 w-4 text-neutral-600" />
										</div>
										<div>
											<p className="font-medium text-neutral-900">iPhone</p>
											<p className="text-sm text-neutral-600">Safari • 2 hours ago</p>
										</div>
									</div>
									<Button variant="outline" size="sm">Revoke</Button>
								</div>
							</div>
						</div>
					</div>
				</SettingsSection>

				{/* Notification Settings */}
				<SettingsSection
					title="Notifications"
					description="Control how and when you receive notifications"
					icon={<BellIcon className="h-5 w-5 text-primary-600" />}
				>
					<div className="space-y-6">
						{/* Communication Preferences */}
						<div>
							<h4 className="font-medium text-neutral-900 mb-4">Communication Preferences</h4>
							<div className="space-y-4">
								<ToggleSwitch
									enabled={notifications.email}
									onChange={(enabled) => setNotifications({ ...notifications, email: enabled })}
									label="Email Notifications"
									description="Receive updates via email"
								/>
								<ToggleSwitch
									enabled={notifications.push}
									onChange={(enabled) => setNotifications({ ...notifications, push: enabled })}
									label="Push Notifications"
									description="Browser and mobile push notifications"
								/>
								<ToggleSwitch
									enabled={notifications.sms}
									onChange={(enabled) => setNotifications({ ...notifications, sms: enabled })}
									label="SMS Notifications"
									description="Text messages for urgent updates"
								/>
							</div>
						</div>

						{/* Content Preferences */}
						<div className="border-t border-neutral-200 pt-6">
							<h4 className="font-medium text-neutral-900 mb-4">What you'll hear about</h4>
							<div className="space-y-4">
								<ToggleSwitch
									enabled={notifications.deals}
									onChange={(enabled) => setNotifications({ ...notifications, deals: enabled })}
									label="Deal Updates"
									description="New deals, status changes, and opportunities"
								/>
								<ToggleSwitch
									enabled={notifications.messages}
									onChange={(enabled) => setNotifications({ ...notifications, messages: enabled })}
									label="Messages"
									description="Direct messages and conversation updates"
								/>
								<ToggleSwitch
									enabled={notifications.updates}
									onChange={(enabled) => setNotifications({ ...notifications, updates: enabled })}
									label="Platform Updates"
									description="New features and product announcements"
								/>
								<ToggleSwitch
									enabled={notifications.marketing}
									onChange={(enabled) => setNotifications({ ...notifications, marketing: enabled })}
									label="Marketing & Tips"
									description="Educational content and promotional offers"
								/>
							</div>
						</div>
					</div>
				</SettingsSection>

				{/* Privacy Settings */}
				<SettingsSection
					title="Privacy & Visibility"
					description="Control who can see your information and how it's used"
					icon={<EyeIcon className="h-5 w-5 text-primary-600" />}
				>
					<div className="space-y-4">
						<ToggleSwitch
							enabled={privacy.profileVisible}
							onChange={(enabled) => setPrivacy({ ...privacy, profileVisible: enabled })}
							label="Public Profile"
							description="Make your profile visible to other users"
						/>
						<ToggleSwitch
							enabled={privacy.showEmail}
							onChange={(enabled) => setPrivacy({ ...privacy, showEmail: enabled })}
							label="Show Email Address"
							description="Display your email on your public profile"
						/>
						<ToggleSwitch
							enabled={privacy.showPhone}
							onChange={(enabled) => setPrivacy({ ...privacy, showPhone: enabled })}
							label="Show Phone Number"
							description="Display your phone number on your public profile"
						/>
						<ToggleSwitch
							enabled={privacy.allowMessages}
							onChange={(enabled) => setPrivacy({ ...privacy, allowMessages: enabled })}
							label="Allow Direct Messages"
							description="Let other users send you direct messages"
						/>
						<ToggleSwitch
							enabled={privacy.dataCollection}
							onChange={(enabled) => setPrivacy({ ...privacy, dataCollection: enabled })}
							label="Usage Analytics"
							description="Help improve the platform by sharing usage data"
						/>
					</div>
				</SettingsSection>

				{/* Billing & Subscription */}
				<SettingsSection
					title="Billing & Subscription"
					description="Manage your subscription and payment methods"
					icon={<CreditCardIcon className="h-5 w-5 text-primary-600" />}
				>
					<div className="space-y-6">
						{/* Current Plan */}
						<div className="p-4 bg-primary-50 rounded-lg border border-primary-200">
							<div className="flex items-center justify-between">
								<div>
									<h4 className="font-medium text-primary-900">Professional Plan</h4>
									<p className="text-sm text-primary-700">$49/month • Renews March 15, 2024</p>
								</div>
								<div className="text-right">
									<Button variant="outline" size="sm">Change Plan</Button>
								</div>
							</div>
						</div>

						{/* Payment Methods */}
						<div>
							<div className="flex items-center justify-between mb-4">
								<h4 className="font-medium text-neutral-900">Payment Methods</h4>
								<Button variant="outline" size="sm" leftIcon={<PlusIcon className="h-4 w-4" />}>
									Add Method
								</Button>
							</div>
							<div className="space-y-3">
								<div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
									<div className="flex items-center space-x-3">
										<div className="p-2 bg-neutral-100 rounded-lg">
											<CreditCardIcon className="h-5 w-5 text-neutral-600" />
										</div>
										<div>
											<p className="font-medium text-neutral-900">•••• •••• •••• 4242</p>
											<p className="text-sm text-neutral-600">Expires 12/25 • Default</p>
										</div>
									</div>
									<Button variant="outline" size="sm">Edit</Button>
								</div>
							</div>
						</div>

						{/* Billing History */}
						<div>
							<h4 className="font-medium text-neutral-900 mb-4">Recent Invoices</h4>
							<div className="space-y-2">
								{[
									{ date: "Feb 15, 2024", amount: "$49.00", status: "Paid" },
									{ date: "Jan 15, 2024", amount: "$49.00", status: "Paid" },
									{ date: "Dec 15, 2023", amount: "$49.00", status: "Paid" },
								].map((invoice, index) => (
									<div key={index} className="flex items-center justify-between py-2">
										<div>
											<p className="font-medium text-neutral-900">{invoice.date}</p>
											<p className="text-sm text-neutral-600">{invoice.amount}</p>
										</div>
										<div className="flex items-center space-x-3">
											<span className="text-sm text-success-600 font-medium">{invoice.status}</span>
											<Button variant="ghost" size="sm">Download</Button>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</SettingsSection>

				{/* Integrations */}
				<SettingsSection
					title="Integrations & Apps"
					description="Connect with third-party services and manage API access"
					icon={<GlobeAltIcon className="h-5 w-5 text-primary-600" />}
				>
					<div className="space-y-4">
						{[
							{
								name: "Google Workspace",
								description: "Sync contacts and calendar events",
								connected: true,
								icon: "🔗"
							},
							{
								name: "Slack",
								description: "Get notifications in your Slack workspace",
								connected: false,
								icon: "💬"
							},
							{
								name: "Zapier",
								description: "Automate workflows with 1000+ apps",
								connected: true,
								icon: "⚡"
							},
							{
								name: "DocuSign",
								description: "Electronic signature integration",
								connected: false,
								icon: "📄"
							},
						].map((integration, index) => (
							<div key={index} className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
								<div className="flex items-center space-x-3">
									<div className="text-2xl">{integration.icon}</div>
									<div>
										<p className="font-medium text-neutral-900">{integration.name}</p>
										<p className="text-sm text-neutral-600">{integration.description}</p>
									</div>
								</div>
								<div className="flex items-center space-x-2">
									{integration.connected ? (
										<>
											<span className="text-sm text-success-600 font-medium">Connected</span>
											<Button variant="outline" size="sm">Configure</Button>
										</>
									) : (
										<Button size="sm">Connect</Button>
									)}
								</div>
							</div>
						))}
					</div>
				</SettingsSection>

				{/* Data & Privacy */}
				<SettingsSection
					title="Data & Export"
					description="Download your data or request account deletion"
					icon={<DocumentTextIcon className="h-5 w-5 text-primary-600" />}
				>
					<div className="space-y-6">
						{/* Data Export */}
						<div>
							<h4 className="font-medium text-neutral-900 mb-2">Export Your Data</h4>
							<p className="text-sm text-neutral-600 mb-4">
								Download a copy of your account data including profile information, deals, and messages.
							</p>
							<Button variant="outline">Request Data Export</Button>
						</div>

						{/* Account Deletion */}
						<div className="border-t border-neutral-200 pt-6">
							<div className="flex items-start space-x-3 p-4 bg-error-50 rounded-lg border border-error-200">
								<ExclamationTriangleIcon className="h-5 w-5 text-error-600 mt-0.5" />
								<div className="flex-1">
									<h4 className="font-medium text-error-900 mb-2">Delete Account</h4>
									<p className="text-sm text-error-700 mb-4">
										This action cannot be undone. All your data, deals, and messages will be permanently deleted.
									</p>
									<div className="space-y-3">
										<Input
											placeholder='Type "DELETE" to confirm'
											value={deleteConfirmation}
											onChange={(e) => setDeleteConfirmation(e.target.value)}
											className="max-w-xs"
										/>
										<Button 
											variant="outline" 
											size="sm"
											disabled={deleteConfirmation !== "DELETE"}
											className="text-error-700 border-error-300 hover:bg-error-50"
											leftIcon={<TrashIcon className="h-4 w-4" />}
										>
											Delete Account
										</Button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</SettingsSection>
				</div>
			</div>
		</PageLayout>
	);
}