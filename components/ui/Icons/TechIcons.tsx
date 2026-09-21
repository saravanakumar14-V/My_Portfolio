import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
}

/**
 * Official Python Logo (Dual-tone Yellow & Blue Serpents)
 */
export function PythonIcon({ size = 16, className, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <path
        d="M11.91 2C8.75 2 6.84 3.38 6.84 5.92V7.79H12.04V8.42H4.49C2.42 8.42 1 9.9 1 12.18C1 14.47 2.15 15.82 4.49 15.82H6.06V13.88C6.06 11.75 7.6 10.3 9.77 10.3H15.11C16.89 10.3 18.28 8.87 18.28 7.15C18.28 4.29 16.27 2 11.91 2ZM9.66 3.63C10.27 3.63 10.77 4.13 10.77 4.74C10.77 5.35 10.27 5.85 9.66 5.85C9.05 5.85 8.55 5.35 8.55 4.74C8.55 4.13 9.05 3.63 9.66 3.63Z"
        fill="#3776AB"
      />
      <path
        d="M12.09 22C15.25 22 17.16 20.62 17.16 18.08V16.21H11.96V15.58H19.51C21.58 15.58 23 14.1 23 11.82C23 9.53 21.85 8.18 19.51 8.18H17.94V10.12C17.94 12.25 16.4 13.7 14.23 13.7H8.89C7.11 13.7 5.72 15.13 5.72 16.85C5.72 19.71 7.73 22 12.09 22ZM14.34 20.37C13.73 20.37 13.23 19.87 13.23 19.26C13.23 18.65 13.73 18.15 14.34 18.15C14.95 18.15 15.45 18.65 15.45 19.26C15.45 19.87 14.95 20.37 14.34 20.37Z"
        fill="#FFD43B"
      />
    </svg>
  );
}

/**
 * Official TypeScript Logo (Blue Square with White TS)
 */
export function TypeScriptIcon({ size = 16, className, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <rect width="24" height="24" rx="4" fill="#3178C6" />
      <path
        d="M11.75 14.5C11.75 16.43 10.3 17.75 7.88 17.75C6.35 17.75 5.12 17.2 4.4 16.48L5.3 14.88C5.88 15.43 6.8 15.93 7.82 15.93C9.05 15.93 9.78 15.35 9.78 14.48C9.78 12.65 6.08 13.3 6.08 9.93C6.08 8.1 7.42 6.75 9.68 6.75C10.95 6.75 11.95 7.2 12.58 7.78L11.78 9.33C11.25 8.85 10.5 8.5 9.65 8.5C8.68 8.5 8.05 9.03 8.05 9.78C8.05 11.55 11.75 10.98 11.75 14.5ZM13.88 8.65H11.22V6.95H18.52V8.65H15.88V17.5H13.88V8.65Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

/**
 * Official JavaScript Logo (Yellow Square with Black JS)
 */
export function JavaScriptIcon({ size = 16, className, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <rect width="24" height="24" rx="4" fill="#F7DF1E" />
      <path
        d="M6.25 17.15L8 16.12C8.35 16.8 8.85 17.35 9.8 17.35C10.75 17.35 11.3 16.9 11.3 15.8V9H13.35V15.8C13.35 18 12.05 19 10 19C8.35 19 7.15 18.15 6.25 17.15ZM14.75 16.85L16.5 15.85C17.05 16.75 17.85 17.35 19.1 17.35C20.25 17.35 20.95 16.75 20.95 15.95C20.95 15.05 20.35 14.65 18.9 14.05L18.2 13.75C16.2 12.9 14.95 11.8 14.95 9.95C14.95 8.1 16.35 6.75 18.4 6.75C19.9 6.75 21 7.4 21.8 8.7L20.15 9.75C19.7 8.95 19.15 8.5 18.4 8.5C17.65 8.5 17 8.95 17 9.75C17 10.5 17.5 10.9 18.8 11.45L19.5 11.75C21.75 12.7 23 13.75 23 15.85C23 17.9 21.4 19.1 19.1 19.1C16.95 19.1 15.55 18.1 14.75 16.85Z"
        fill="#000000"
      />
    </svg>
  );
}

/**
 * Official React / React Native Logo (Cyan Atomic Orbits)
 */
export function ReactIcon({ size = 16, className, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.6" transform="rotate(0 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.6" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.6" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="2" fill="#61DAFB" />
    </svg>
  );
}

/**
 * Official MongoDB Logo (Vibrant Green Leaf)
 */
export function MongoDBIcon({ size = 16, className, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <path
        d="M12.05 1.5C11.95 1.5 11.85 1.55 11.8 1.65C10.55 3.75 6 10.35 6 14.5C6 18.25 8.7 21.5 11.8 22.45C11.9 22.5 12.1 22.5 12.2 22.45C15.3 21.5 18 18.25 18 14.5C18 10.35 13.45 3.75 12.2 1.65C12.15 1.55 12.1 1.5 12.05 1.5Z"
        fill="#00ED64"
      />
      <path
        d="M12 22.5C12.1 22.5 12.2 22.45 12.2 22.45C15.3 21.5 18 18.25 18 14.5C18 10.35 13.45 3.75 12.2 1.65C12.15 1.55 12.1 1.5 12 1.5V22.5Z"
        fill="#13AA52"
      />
      <path
        d="M11.95 22.8C11.9 22.8 11.85 22.75 11.85 22.7C11.7 20.8 11.55 19.55 10.9 18.6C10.25 17.65 9.75 17.4 9.7 17.4C9.65 17.35 9.65 17.25 9.7 17.2C9.75 17.15 9.85 17.15 9.9 17.2C10.4 17.45 11 18.15 11.55 19.2C12.1 20.25 12.15 21.8 12.05 22.75C12.05 22.8 12 22.8 11.95 22.8Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

/**
 * Official Flask Python Framework Logo
 */
export function FlaskIcon({ size = 16, className, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <path
        d="M9 3H15M10 3V8L5.5 17C4.6 18.8 5.9 21 8 21H16C18.1 21 19.4 18.8 18.5 17L14 8V3"
        stroke="#E2E8F0"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 16H17M8.5 13H15.5"
        stroke="#67D9FF"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * SQL / Relational Database Logo
 */
export function SQLIcon({ size = 16, className, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <ellipse cx="12" cy="5" rx="9" ry="3" fill="#336791" stroke="#67D9FF" strokeWidth="1.4" />
      <path d="M21 5V12C21 13.66 16.97 15 12 15C7.03 15 3 13.66 3 12V5" stroke="#67D9FF" strokeWidth="1.4" />
      <path d="M21 12V19C21 20.66 16.97 22 12 22C7.03 22 3 20.66 3 19V12" stroke="#67D9FF" strokeWidth="1.4" />
      <path d="M3 12C3 13.66 7.03 15 12 15C16.97 15 21 13.66 21 12" fill="#336791" fillOpacity="0.3" />
    </svg>
  );
}

/**
 * Cloud Computing Domain Icon
 */
export function CloudIcon({ size = 16, className, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <path
        d="M17.5 19H6.5C4.01 19 2 16.99 2 14.5C2 12.16 3.79 10.24 6.09 10.03C6.72 6.61 9.7 4 13.25 4C17.06 4 20.19 6.95 20.47 10.7C21.94 11.45 23 12.98 23 14.75C23 17.1 21.1 19 18.75 19H17.5Z"
        fill="#38BDF8"
        fillOpacity="0.2"
        stroke="#38BDF8"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Cybersecurity Shield Icon
 */
export function CybersecurityIcon({ size = 16, className, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <path
        d="M12 2L3 6V11.5C3 16.8 6.8 21.7 12 23C17.2 21.7 21 16.8 21 11.5V6L12 2Z"
        fill="#10B981"
        fillOpacity="0.2"
        stroke="#10B981"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M9 11.5L11 13.5L15 9.5" stroke="#10B981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Encryption / Cryptographic Lock Icon
 */
export function EncryptionIcon({ size = 16, className, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <rect x="4" y="10" width="16" height="12" rx="3" fill="#F59E0B" fillOpacity="0.2" stroke="#F59E0B" strokeWidth="1.8" />
      <path d="M7 10V7C7 4.24 9.24 2 12 2C14.76 2 17 4.24 17 7V10" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="15" r="1.5" fill="#F59E0B" />
      <path d="M12 16.5V18.5" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Artificial Intelligence (AI) Neural Spark Icon
 */
export function AIIcon({ size = 16, className, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <path
        d="M12 2L14.2 8.3L20.5 10.5L14.2 12.7L12 19L9.8 12.7L3.5 10.5L9.8 8.3L12 2Z"
        fill="#A855F7"
        fillOpacity="0.25"
        stroke="#A855F7"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M19 16L20 18.5L22.5 19.5L20 20.5L19 23L18 20.5L15.5 19.5L18 18.5L19 16Z"
        fill="#67D9FF"
        stroke="#67D9FF"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * LLM & Generative AI Sparkles Icon
 */
export function LLMIcon({ size = 16, className, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <path
        d="M12 3C12 3 13.5 7.5 16 10C18.5 12.5 23 14 23 14C23 14 18.5 15.5 16 18C13.5 20.5 12 25 12 25C12 25 10.5 20.5 8 18C5.5 15.5 1 14 1 14C1 14 5.5 12.5 8 10C10.5 7.5 12 3 12 3Z"
        fill="#67D9FF"
        fillOpacity="0.2"
        stroke="#67D9FF"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M19 3C19 3 19.75 5.25 21 6.5C22.25 7.75 24.5 8.5 24.5 8.5C24.5 8.5 22.25 9.25 21 10.5C19.75 11.75 19 14 19 14C19 14 18.25 11.75 17 10.5C15.75 9.25 13.5 8.5 13.5 8.5C13.5 8.5 15.75 7.75 17 6.5C18.25 5.25 19 3 19 3Z"
        fill="#3BA7FF"
        stroke="#3BA7FF"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Machine Learning Brain/Nodes Icon
 */
export function MLIcon({ size = 16, className, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <path
        d="M9.5 2A4.5 4.5 0 0 0 5 6.5c0 .77.2 1.5.54 2.13A4.5 4.5 0 0 0 3 12.5c0 1.9 1.18 3.52 2.86 4.18A4.5 4.5 0 0 0 10 21V19M14.5 2A4.5 4.5 0 0 1 19 6.5c0 .77-.2 1.5-.54 2.13A4.5 4.5 0 0 1 21 12.5c0 1.9-1.18 3.52-2.86 4.18A4.5 4.5 0 0 1 14 21V19"
        stroke="#EC4899"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path d="M12 5V19M8 10H16M7 15H17" stroke="#EC4899" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Natural Language Processing (NLP) Icon
 */
export function NLPIcon({ size = 16, className, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <path
        d="M21 11.5A8.38 8.38 0 0 1 18.5 17.5L19 22L14.5 20.5A8.5 8.5 0 1 1 21 11.5Z"
        fill="#06B6D4"
        fillOpacity="0.2"
        stroke="#06B6D4"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M8 10H16M8 14H13" stroke="#06B6D4" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Full-Stack Development Layer Stack Icon
 */
export function FullStackIcon({ size = 16, className, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#3B82F6" fillOpacity="0.2" stroke="#3B82F6" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M2 12L12 17L22 12" stroke="#67D9FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 17L12 22L22 17" stroke="#38BDF8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * API Development & Integration Connector Icon
 */
export function APIIcon({ size = 16, className, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <rect x="3" y="6" width="18" height="12" rx="3" fill="#8B5CF6" fillOpacity="0.2" stroke="#8B5CF6" strokeWidth="1.7" />
      <path d="M8 12H16M8 9H11M13 15H16" stroke="#A78BFA" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="7" cy="12" r="1.5" fill="#8B5CF6" />
      <circle cx="17" cy="12" r="1.5" fill="#8B5CF6" />
    </svg>
  );
}

/**
 * Desktop Application Development Icon
 */
export function DesktopIcon({ size = 16, className, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <rect x="2" y="3" width="20" height="14" rx="2" fill="#38BDF8" fillOpacity="0.15" stroke="#38BDF8" strokeWidth="1.7" />
      <path d="M8 21H16M12 17V21M6 7H7M9 7H10" stroke="#38BDF8" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Web Development Icon
 */
export function WebDevIcon({ size = 16, className, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <circle cx="12" cy="12" r="9.5" fill="#3B82F6" fillOpacity="0.15" stroke="#3B82F6" strokeWidth="1.7" />
      <path d="M2.5 12H21.5M12 2.5C14.5 6 16 9 16 12C16 15 14.5 18 12 21.5C9.5 18 8 15 8 12C8 9 9.5 6 12 2.5Z" stroke="#3B82F6" strokeWidth="1.4" />
    </svg>
  );
}
