"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  UserIcon,
  CogIcon,
  BellIcon,
  ChartBarIcon,
  DocumentTextIcon,
  UsersIcon,
  BuildingOfficeIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
  MagnifyingGlassIcon
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/design-system";
import { LogOutIcon } from "lucide-react";
import Image from "next/image";

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  badge?: number;
}

const navigation: NavigationItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { name: "Deals", href: "/deals", icon: DocumentTextIcon },
  { name: "Browse", href: "/browse", icon: MagnifyingGlassIcon },
  { name: "Companies", href: "/companies", icon: BuildingOfficeIcon },
  { name: "Network", href: "/network", icon: UsersIcon },
  { name: "Analytics", href: "/analytics", icon: ChartBarIcon },
  { name: "Notifications", href: "/notifications", icon: BellIcon, badge: 3 },
];

const userNavigation = [
  { name: "Profile", href: "/profile", icon: UserIcon },
  { name: "Settings", href: "/settings", icon: CogIcon },
];

export function MainNavigation() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-neutral-200 bg-white px-6 pb-4">
          {/* Logo */}
          <div className="flex h-16 shrink-0 items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg overflow-hidden">
                <Image src="/logo.png" alt="Caprae Logo" width={32} height={32} className="w-full h-full object-contain" />
              </div>
              <span className="text-xl font-bold text-neutral-900">Caprae</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={cn(
                          "group flex gap-x-3 rounded-lg p-3 text-sm leading-6 font-medium transition-colors",
                          isActive(item.href)
                            ? "bg-primary-50 text-primary-700"
                            : "text-neutral-700 hover:text-primary-700 hover:bg-primary-50"
                        )}
                      >
                        <item.icon
                          className={cn(
                            "h-5 w-5 shrink-0 transition-colors",
                            isActive(item.href)
                              ? "text-primary-700"
                              : "text-neutral-400 group-hover:text-primary-700"
                          )}
                        />
                        <span className="flex-1">{item.name}</span>
                        {item.badge && (
                          <span className="ml-auto w-5 h-5 text-xs bg-error-100 text-error-700 rounded-full flex items-center justify-center">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {/* User Navigation */}
              <li className="mt-auto">
                <div className="text-xs font-semibold leading-6 text-neutral-400 uppercase tracking-wide">
                  Account
                </div>
                <ul role="list" className="-mx-2 mt-2 space-y-1">
                  {userNavigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={cn(
                          "group flex gap-x-3 rounded-lg p-3 text-sm leading-6 font-medium transition-colors",
                          isActive(item.href)
                            ? "bg-primary-50 text-primary-700"
                            : "text-neutral-700 hover:text-primary-700 hover:bg-primary-50"
                        )}
                      >
                        <item.icon
                          className={cn(
                            "h-5 w-5 shrink-0 transition-colors",
                            isActive(item.href)
                              ? "text-primary-700"
                              : "text-neutral-400 group-hover:text-primary-700"
                          )}
                        />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link href="/">
                      <button className="group flex w-full gap-x-3 rounded-lg p-3 text-sm leading-6 font-medium text-neutral-700 hover:text-error-700 hover:bg-error-50 transition-colors">
                        <LogOutIcon className="h-5 w-5 shrink-0 text-neutral-400 group-hover:text-error-700 transition-colors" />
                        Sign out
                      </button>
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-neutral-700 lg:hidden"
          onClick={() => setIsMobileOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon className="h-6 w-6" />
        </button>
        <div className="flex-1 text-sm font-semibold leading-6 text-neutral-900">
          {navigation.find(item => isActive(item.href))?.name || "Caprae"}
        </div>
        <Link href="/profile">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center">
            <UserIcon className="h-4 w-4 text-white" />
          </div>
        </Link>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 lg:hidden"
              onClick={() => setIsMobileOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-50 w-64 bg-white px-6 py-6 lg:hidden"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg overflow-hidden">
                    <Image src="/logo.png" alt="Caprae Logo" width={32} height={32} className="w-full h-full object-contain" />
                  </div>
                  <span className="text-xl font-bold text-neutral-900">Caprae</span>
                </div>
                <button
                  type="button"
                  className="-m-2.5 p-2.5 text-neutral-700"
                  onClick={() => setIsMobileOpen(false)}
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <nav className="mt-8">
                <ul role="list" className="space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={cn(
                          "group flex gap-x-3 rounded-lg p-3 text-sm leading-6 font-medium transition-colors",
                          isActive(item.href)
                            ? "bg-primary-50 text-primary-700"
                            : "text-neutral-700 hover:text-primary-700 hover:bg-primary-50"
                        )}
                        onClick={() => setIsMobileOpen(false)}
                      >
                        <item.icon
                          className={cn(
                            "h-5 w-5 shrink-0 transition-colors",
                            isActive(item.href)
                              ? "text-primary-700"
                              : "text-neutral-400 group-hover:text-primary-700"
                          )}
                        />
                        <span className="flex-1">{item.name}</span>
                        {item.badge && (
                          <span className="ml-auto w-5 h-5 text-xs bg-error-100 text-error-700 rounded-full flex items-center justify-center">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Mobile User Navigation */}
                <div className="mt-8 pt-8 border-t border-neutral-200">
                  <div className="text-xs font-semibold leading-6 text-neutral-400 uppercase tracking-wide mb-4">
                    Account
                  </div>
                  <ul role="list" className="space-y-1">
                    {userNavigation.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={cn(
                            "group flex gap-x-3 rounded-lg p-3 text-sm leading-6 font-medium transition-colors",
                            isActive(item.href)
                              ? "bg-primary-50 text-primary-700"
                              : "text-neutral-700 hover:text-primary-700 hover:bg-primary-50"
                          )}
                          onClick={() => setIsMobileOpen(false)}
                        >
                          <item.icon
                            className={cn(
                              "h-5 w-5 shrink-0 transition-colors",
                              isActive(item.href)
                                ? "text-primary-700"
                                : "text-neutral-400 group-hover:text-primary-700"
                            )}
                          />
                          {item.name}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link href="/">
                        <button className="group flex w-full gap-x-3 rounded-lg p-3 text-sm leading-6 font-medium text-neutral-700 hover:text-error-700 hover:bg-error-50 transition-colors">
                          <LogOutIcon className="h-5 w-5 shrink-0 text-neutral-400 group-hover:text-error-700 transition-colors" />
                          Sign out
                        </button>
                      </Link>
                    </li>
                  </ul>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}