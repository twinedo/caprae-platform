import { type ClassValue, clsx } from "clsx";
import { cva, type VariantProps } from "class-variance-authority";

// Utility function for combining classes
export function cn(...inputs: ClassValue[]) {
	return clsx(inputs);
}

// Approachable Color Palette - Designed to feel inviting and ease business tension
export const colors = {
	// Primary: Warm and trustworthy purple
	primary: {
		50: "#faf7ff",
		100: "#f2edff",
		200: "#e8ddff",
		300: "#d4c2ff",
		400: "#bb98ff",
		500: "#9f67ff", // Main brand color - confident yet approachable
		600: "#8b46ff",
		700: "#7732e8",
		800: "#642bc3",
		900: "#522a9f",
		950: "#33176a",
	},

	// Secondary: Soft coral for warmth and approachability
	secondary: {
		50: "#fff7f4",
		100: "#ffede7",
		200: "#ffddd4",
		300: "#ffc2b2",
		400: "#ff9b80",
		500: "#ff7147", // Warm and inviting
		600: "#ed5a2b",
		700: "#c8471f",
		800: "#a53d1e",
		900: "#87371f",
		950: "#4a190d",
	},

	// Success: Fresh mint green
	success: {
		50: "#f0fdf9",
		100: "#ccfdf2",
		200: "#99fae6",
		300: "#5df2d6",
		400: "#2dd4bf",
		500: "#14b8a6",
		600: "#0d9488",
		700: "#0f766e",
		800: "#115e59",
		900: "#134e4a",
		950: "#042f2e",
	},

	// Warning: Gentle amber
	warning: {
		50: "#fffbeb",
		100: "#fef3c7",
		200: "#fde68a",
		300: "#fcd34d",
		400: "#fbbf24",
		500: "#f59e0b",
		600: "#d97706",
		700: "#b45309",
		800: "#92400e",
		900: "#78350f",
		950: "#451a03",
	},

	// Error: Soft but clear red
	error: {
		50: "#fef2f2",
		100: "#fee2e2",
		200: "#fecaca",
		300: "#fca5a5",
		400: "#f87171",
		500: "#ef4444",
		600: "#dc2626",
		700: "#b91c1c",
		800: "#991b1b",
		900: "#7f1d1d",
		950: "#450a0a",
	},

	// Neutrals: Warm grays with slight purple tint
	neutral: {
		50: "#fafafa",
		100: "#f5f5f6",
		200: "#e5e5e7",
		300: "#d4d4d8",
		400: "#a1a1aa",
		500: "#71717a",
		600: "#52525b",
		700: "#3f3f46",
		800: "#27272a",
		900: "#18181b",
		950: "#09090b",
	},
};

// Typography System
export const typography = {
	fonts: {
		sans: ["Inter", "system-ui", "sans-serif"],
		display: ["Cal Sans", "Inter", "system-ui", "sans-serif"],
		mono: ["JetBrains Mono", "Consolas", "monospace"],
	},
	sizes: {
		xs: "0.75rem", // 12px
		sm: "0.875rem", // 14px
		base: "1rem", // 16px
		lg: "1.125rem", // 18px
		xl: "1.25rem", // 20px
		"2xl": "1.5rem", // 24px
		"3xl": "1.875rem", // 30px
		"4xl": "2.25rem", // 36px
		"5xl": "3rem", // 48px
		"6xl": "3.75rem", // 60px
		"7xl": "4.5rem", // 72px
	},
	weights: {
		thin: "100",
		light: "300",
		normal: "400",
		medium: "500",
		semibold: "600",
		bold: "700",
		extrabold: "800",
		black: "900",
	},
};

// Spacing System (8pt grid)
export const spacing = {
	0: "0",
	1: "0.25rem", // 4px
	2: "0.5rem", // 8px
	3: "0.75rem", // 12px
	4: "1rem", // 16px
	5: "1.25rem", // 20px
	6: "1.5rem", // 24px
	8: "2rem", // 32px
	10: "2.5rem", // 40px
	12: "3rem", // 48px
	16: "4rem", // 64px
	20: "5rem", // 80px
	24: "6rem", // 96px
	32: "8rem", // 128px
	40: "10rem", // 160px
	48: "12rem", // 192px
	56: "14rem", // 224px
	64: "16rem", // 256px
};

// Border Radius System
export const borderRadius = {
	none: "0",
	sm: "0.125rem", // 2px
	base: "0.25rem", // 4px
	md: "0.375rem", // 6px
	lg: "0.5rem", // 8px
	xl: "0.75rem", // 12px
	"2xl": "1rem", // 16px
	"3xl": "1.5rem", // 24px
	full: "9999px",
};

// Shadows System
export const shadows = {
	sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
	base: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
	md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
	lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
	xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
	"2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
	inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
	none: "none",
};

// Animation presets
export const animations = {
	durations: {
		fast: "150ms",
		normal: "300ms",
		slow: "500ms",
		slower: "750ms",
	},
	easings: {
		linear: "linear",
		in: "cubic-bezier(0.4, 0, 1, 1)",
		out: "cubic-bezier(0, 0, 0.2, 1)",
		inOut: "cubic-bezier(0.4, 0, 0.2, 1)",
		spring: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
	},
};

// Component Variants using CVA
export const buttonVariants = cva(
	"inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			variant: {
				primary:
					"bg-primary-500 text-white hover:bg-primary-600 focus-visible:ring-primary-500 shadow-sm hover:shadow-md active:scale-95",
				secondary:
					"bg-secondary-100 text-secondary-700 hover:bg-secondary-200 focus-visible:ring-secondary-500 border border-secondary-200",
				outline:
					"border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50 hover:border-neutral-400 focus-visible:ring-primary-500",
				ghost:
					"text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 focus-visible:ring-primary-500",
				link: "text-primary-600 underline-offset-4 hover:underline focus-visible:ring-primary-500",
			},
			size: {
				sm: "h-8 px-3 text-xs",
				default: "h-10 px-4",
				lg: "h-12 px-6 text-base",
				xl: "h-14 px-8 text-lg",
				icon: "h-10 w-10",
			},
		},
		defaultVariants: {
			variant: "primary",
			size: "default",
		},
	},
);

export const cardVariants = cva(
	"rounded-xl border border-neutral-200 bg-white transition-all duration-200",
	{
		variants: {
			variant: {
				default: "shadow-sm hover:shadow-md",
				elevated: "shadow-md hover:shadow-lg",
				interactive:
					"shadow-sm hover:shadow-md hover:border-primary-200 cursor-pointer hover:-translate-y-1",
				flat: "shadow-none border-neutral-100",
			},
			padding: {
				none: "p-0",
				sm: "p-4",
				default: "p-6",
				lg: "p-8",
			},
		},
		defaultVariants: {
			variant: "default",
			padding: "default",
		},
	},
);

export const inputVariants = cva(
	"flex w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
	{
		variants: {
			variant: {
				default: "hover:border-neutral-400",
				error: "border-error-300 focus-visible:ring-error-500",
				success: "border-success-300 focus-visible:ring-success-500",
			},
			size: {
				sm: "h-8 px-2 text-xs",
				default: "h-10 px-3",
				lg: "h-12 px-4 text-base",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

// Helper types for component variants
export type ButtonVariants = VariantProps<typeof buttonVariants>;
export type CardVariants = VariantProps<typeof cardVariants>;
export type InputVariants = VariantProps<typeof inputVariants>;