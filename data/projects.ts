import type { Project } from '@/types/project';

export const projects: Project[] = [
  {
    id: 'nexarks',
    slug: 'nexarks',
    title: 'Nexarks',
    tagline: 'Freelance project management platform with automated proposals and milestone payments.',
    description: 'A full-stack client-freelancer platform designed around service discovery, structured project requests, proposal workflows, milestone billing via Razorpay, and client workspace management.',
    
    problem: 'Freelance client onboarding and milestone billing are typically fragmented across disparate tools, creating communication overhead, ambiguous requirements, and manual invoice chasing.',
    research: [
      'Researched client engagement lifecycles, structured requirement intake questionnaires, and milestone-based project staging.',
      'Architected server-authoritative billing schedules with double-charge protection, idempotent checkout order generation, and timing-safe webhook reconciliation.',
      'Engineered a dual-portal experience (Admin Studio & Client Workspace) with role-based session isolation and immutable audit trail logging.'
    ],
    
    architecture: [
      { id: 'client-portal', label: 'Client Workspace UI', description: 'Next.js App Router interface for proposal review, invoice tracking, and payment actions', type: 'client', connections: ['server-actions', 'payment-api'] },
      { id: 'server-actions', label: 'Server Actions & Services', description: 'Type-safe request intake, proposal generation, and invoice business logic validated with Zod', type: 'server', connections: ['db-layer', 'payment-api'] },
      { id: 'payment-api', label: 'Payment Adapter & Webhooks', description: 'Server-side Razorpay order creation, checkout verification, and HMAC-SHA256 webhook handler', type: 'server', connections: ['db-layer'] },
      { id: 'db-layer', label: 'PostgreSQL & Drizzle ORM', description: 'Relational data model covering customers, proposals, line items, payment schedules, invoices, and audit logs', type: 'database', connections: [] },
    ],

    features: [
      { title: 'Structured Project Intake', description: 'Interactive studio questionnaire collecting detailed project scope, milestones, and deliverable specifications.' },
      { title: 'Automated Proposal Workflows', description: 'Generates itemized client proposals with milestone-linked payment schedules and digital acceptance.' },
      { title: 'Razorpay Milestone Billing', description: 'Seamless checkout modal with UPI, NetBanking, and card support, verified via server-side HMAC signatures.' },
      { title: 'Client Workspace & Invoicing', description: 'Dedicated dashboard for clients to track active milestones, download invoices, and initiate due payments.' },
    ],

    lessons: [
      { type: 'success', title: 'Payment Security', description: 'Implemented strict server-side order generation and webhook-driven transactional state updates.' },
      { type: 'challenge', title: 'Idempotency', description: 'Prevented double-charge edge cases through idempotent checkout session tracking and database transactions.' }
    ],

    theme: { primaryHue: '#38bdf8', ambientIntensity: 0.15 },
    status: 'live',
    category: 'fullstack',
    year: 2026,
    role: 'Full-Stack Developer',
    duration: 'Completed',
    tech: [
      { name: 'Next.js', category: 'frontend' },
      { name: 'TypeScript', category: 'frontend' },
      { name: 'PostgreSQL', category: 'database' },
      { name: 'Drizzle ORM', category: 'database' },
      { name: 'Zod', category: 'backend' },
      { name: 'Razorpay', category: 'backend' },
    ],
    links: [
      { label: 'Case Study', href: '/projects/nexarks', type: 'case-study' },
    ],
    thumbnail: '/projects/nexarks/hero.svg',
    hero: '/projects/nexarks/hero.svg',
    gallery: [
      {
        src: '/projects/nexarks/hero.svg',
        alt: 'Nexarks client portal and milestone billing interface',
        type: 'image',
        caption: 'CLIENT PORTAL / MILESTONE INVOICING & CHECKOUT',
        width: 1200,
        height: 675,
      },
      {
        src: '/projects/nexarks/proposals.svg',
        alt: 'Nexarks proposal builder and structured scope intake',
        type: 'image',
        caption: 'PROPOSAL BUILDER / STRUCTURED SCOPE & TERMS',
        width: 800,
        height: 600,
      },
      {
        src: '/projects/nexarks/payments.svg',
        alt: 'Nexarks Razorpay payment gateway and HMAC webhook architecture',
        type: 'image',
        caption: 'PAYMENT GATEWAY ARCHITECTURE / WEBHOOK RECONCILIATION',
        width: 800,
        height: 600,
      },
    ],
    featured: true,
    featuredOrder: 1,
  },

  {
    id: 'rezel',
    slug: 'rezel',
    title: 'Rezel',
    tagline: 'AI desktop assistant platform combining local state, tool execution, and an interactive interface.',
    description: 'An ongoing desktop AI project exploring local model integrations, a lightweight Tauri native shell, modular tool execution, and an interactive 3D spatial viewport.',
    
    problem: 'Desktop AI tools are often isolated within browser tabs without OS-level workflow integration or privacy-first local state.',
    research: [
      'Studied local-first execution paradigms, on-device model integrations, and cross-platform native application wrappers.',
      'Explored modular tool dispatch patterns to execute local desktop automations safely.',
      'Designed local state persistence structures using embedded local storage for zero-latency retrieval.'
    ],
    
    architecture: [
      { id: 'desktop-shell', label: 'Tauri Native Shell', description: 'Lightweight Rust core with system tray and window management', type: 'client', connections: ['ui-canvas', 'local-memory'] },
      { id: 'ui-canvas', label: '3D Spatial Interface', description: 'React Three Fiber & TypeScript rendering layer', type: 'client', connections: ['agent-orchestrator'] },
      { id: 'agent-orchestrator', label: 'AI Planner & Dispatcher', description: 'Modular services for intent inference and tool dispatch', type: 'ai', connections: ['local-memory', 'tool-engine'] },
      { id: 'local-memory', label: 'Local State Store', description: 'Embedded SQLite vector and contextual state store', type: 'database', connections: [] },
      { id: 'tool-engine', label: 'Tool Execution Engine', description: 'Sandboxed native execution for desktop automation', type: 'server', connections: [] },
    ],

    features: [
      { title: 'Interactive 3D Canvas', description: 'React Three Fiber viewport providing spatial interaction and visualization.' },
      { title: 'Local-First State', description: 'On-device contextual indexing ensuring privacy and offline capability.' },
      { title: 'Modular Tool Dispatch', description: 'Task execution pipeline exploring automated desktop workflows.' },
    ],

    lessons: [
      { type: 'challenge', title: 'Native Performance', description: 'Balancing WebGL rendering performance with background process execution.' },
      { type: 'future', title: 'Active Roadmap', description: 'Exploring real-time voice interaction and multi-modal screen perception.' }
    ],

    theme: { primaryHue: 'var(--color-primary)', ambientIntensity: 0.15 },
    status: 'in-progress',
    category: 'tool',
    year: 2024,
    role: 'Creator & Lead Developer',
    duration: 'Active Development',
    tech: [
      { name: 'Tauri', category: 'backend' },
      { name: 'TypeScript', category: 'frontend' },
      { name: 'React Three Fiber', category: 'frontend' },
      { name: 'Local AI', category: 'other' },
      { name: 'SQLite', category: 'database' },
    ],
    links: [
      { label: 'Case Study', href: '/projects/rezel', type: 'case-study' },
    ],
    thumbnail: '/projects/rezel/rezel-preview.png',
    hero: '/projects/rezel/rezel-preview.png',
    gallery: [
      {
        src: '/projects/rezel/rezel-preview.png',
        alt: 'Rezel desktop AI assistant spatial interface preview showing 3D cognitive field',
        type: 'image',
        caption: 'SPATIAL DESKTOP INTERFACE / ACTIVE SYSTEM VIEWPORT',
        width: 1024,
        height: 400,
      },
      {
        src: '/projects/rezel/interface.svg',
        alt: 'Rezel 3D interaction canvas and orbital node lattice',
        type: 'image',
        caption: '3D INTERACTION CANVAS / ORBITAL MEMORY LATTICE',
        width: 800,
        height: 600,
      },
      {
        src: '/projects/rezel/architecture.svg',
        alt: 'Rezel system architecture diagram showing Tauri, React Three Fiber, and SQLite',
        type: 'image',
        caption: 'SYSTEM ARCHITECTURE / LOCAL-FIRST RUNTIME INTEGRATION',
        width: 800,
        height: 600,
      },
    ],
    featured: true,
    featuredOrder: 2,
  },
  
  {
    id: 'ai-resume-analyzer',
    slug: 'ai-resume-analyzer',
    title: 'AI Resume Analyzer',
    tagline: 'Intelligent resume evaluation, keyword gap analysis, and candidate recommendations.',
    description: 'An AI-powered resume analysis application evaluating candidate resumes against target job descriptions using NLP and scikit-learn to calculate match scores and extract missing keywords.',
    
    problem: 'Job seekers struggle to understand how automated Applicant Tracking Systems (ATS) evaluate their resumes, leading to missed opportunities.',
    research: [
      'Analyzed ATS parsing heuristics and tokenization techniques across diverse resume layouts.',
      'Developed vector similarity and TF-IDF matching pipelines to quantify resume-to-job-description alignment.'
    ],
    
    architecture: [
      { id: 'web-ui', label: 'Interactive Dashboard', description: 'Clean interface for document upload and score visualization', type: 'client', connections: ['flask-api'] },
      { id: 'flask-api', label: 'Flask Backend', description: 'REST API orchestrating document parsing and ML inference', type: 'server', connections: ['nlp-engine'] },
      { id: 'nlp-engine', label: 'NLP & Scoring Engine', description: 'scikit-learn and NLTK text processing for keyword gap extraction', type: 'ai', connections: [] },
    ],

    features: [
      { title: 'Automated Resume Parsing', description: 'Extracts skills, experience, and education from PDF and DOCX formats.' },
      { title: 'ATS Compatibility Scoring', description: 'Evaluates structural readability and formatting standards.' },
      { title: 'Skill-Gap Analysis', description: 'Identifies high-impact missing keywords specific to the target role.' },
    ],

    lessons: [
      { type: 'success', title: 'Scoring Precision', description: 'Achieved robust match scoring and high precision in missing skill identification.' }
    ],

    theme: { primaryHue: '#38bdf8', ambientIntensity: 0.15 },
    status: 'live',
    category: 'web',
    year: 2024,
    role: 'Full-Stack & ML Developer',
    duration: 'Completed',
    tech: [
      { name: 'Python', category: 'backend' },
      { name: 'Flask', category: 'backend' },
      { name: 'NLP', category: 'other' },
      { name: 'scikit-learn', category: 'other' },
    ],
    links: [
      { label: 'Case Study', href: '/projects/ai-resume-analyzer', type: 'case-study' },
      { label: 'View on GitHub', href: 'https://github.com/saravanakumar14-V/Resume-Analyzer', type: 'github' },
    ],
    thumbnail: '/projects/ai-resume-analyzer/hero.svg',
    hero: '/projects/ai-resume-analyzer/hero.svg',
    gallery: [
      {
        src: '/projects/ai-resume-analyzer/hero.svg',
        alt: 'AI Resume Analyzer scoring and keyword gap dashboard',
        type: 'image',
        caption: 'ATS EVALUATION DASHBOARD / SCORING TELEMETRY',
        width: 1200,
        height: 675,
      },
      {
        src: '/projects/ai-resume-analyzer/dashboard.svg',
        alt: 'Resume parsing and document ingestion engine view',
        type: 'image',
        caption: 'DOCUMENT INGESTION / TF-IDF VECTOR SPACE PARSER',
        width: 800,
        height: 600,
      },
      {
        src: '/projects/ai-resume-analyzer/analysis.svg',
        alt: 'Skill-gap extraction and missing keyword recommendations',
        type: 'image',
        caption: 'SKILL-GAP EXTRACTION / CANDIDATE RECOMMENDATIONS',
        width: 800,
        height: 600,
      },
    ],
    featured: true,
    featuredOrder: 3,
  },

  {
    id: 'sheild',
    slug: 'sheild',
    title: 'SHEiLD',
    tagline: 'Smart Hybrid Emergency Intelligent Location Defense for rapid public safety response.',
    description: 'A mobile emergency response application providing one-tap panic activation, live location tracking telemetry, emergency contact dispatching, and safety helpline awareness.',
    
    problem: 'During high-stress emergencies, individuals need immediate, zero-friction emergency activation and location broadcasting.',
    research: [
      'Researched emergency interaction patterns, tactile panic triggers, and background GPS tracking constraints.',
      'Designed offline-resilient dispatch protocols to buffer and transmit coordinates during intermittent connectivity.'
    ],
    
    architecture: [
      { id: 'mobile-app', label: 'React Native Client', description: 'Mobile application with hardware trigger integration', type: 'client', connections: ['api-backend'] },
      { id: 'api-backend', label: 'Emergency Dispatch API', description: 'Backend routing real-time coordinates and alerts', type: 'server', connections: ['geo-service'] },
      { id: 'geo-service', label: 'Location Intelligence', description: 'Map and routing service for emergency responders and contacts', type: 'external', connections: [] },
    ],

    features: [
      { title: 'One-Tap Panic Activation', description: 'Alerts predefined emergency contacts with live tracking links.' },
      { title: 'Live Location & Geofencing', description: 'Location telemetry for real-time situational awareness.' },
      { title: 'Safety Awareness Hub', description: 'Emergency helpline directories and safety guidance resources.' },
    ],

    lessons: [
      { type: 'success', title: 'Rapid Response', description: 'Optimized alert dispatch latency upon emergency trigger.' }
    ],

    theme: { primaryHue: '#67D9FF', ambientIntensity: 0.15 },
    status: 'live',
    category: 'mobile',
    year: 2024,
    role: 'Mobile & Full-Stack Developer',
    duration: 'Completed',
    tech: [
      { name: 'TypeScript', category: 'frontend' },
      { name: 'React Native', category: 'frontend' },
      { name: 'Mobile Dev', category: 'frontend' },
      { name: 'Public Safety Tech', category: 'other' },
    ],
    links: [
      { label: 'Case Study', href: '/projects/sheild', type: 'case-study' },
      { label: 'View on GitHub', href: 'https://github.com/saravanakumar14-V/sheild-women-safety-app', type: 'github' },
    ],
    thumbnail: '/projects/sheild/hero.svg',
    hero: '/projects/sheild/hero.svg',
    gallery: [
      {
        src: '/projects/sheild/hero.svg',
        alt: 'SHEiLD emergency defense app mobile UI and live tracking radar',
        type: 'image',
        caption: 'EMERGENCY MOBILE UI / ONE-TAP PANIC ACTIVATION',
        width: 1200,
        height: 675,
      },
      {
        src: '/projects/sheild/map.svg',
        alt: 'SHEiLD live GPS map telemetry and incident routing',
        type: 'image',
        caption: 'LIVE MAP TELEMETRY / REAL-TIME COORDINATE LOGS',
        width: 800,
        height: 600,
      },
      {
        src: '/projects/sheild/emergency.svg',
        alt: 'Automated contact dispatch and SMS broadcast verification',
        type: 'image',
        caption: 'EMERGENCY DISPATCH PIPELINE / MULTI-CHANNEL BROADCAST',
        width: 800,
        height: 600,
      },
    ],
    featured: true,
    featuredOrder: 4,
  },

  {
    id: 'cloud-deduplication',
    slug: 'cloud-deduplication',
    title: 'Cloud Data Deduplication Platform',
    tagline: 'Storage optimization and validation platform with cryptographic integrity verification.',
    description: 'A cloud storage optimization platform eliminating redundant data blocks across distributed environments using chunking algorithms and cryptographic hash verification with MongoDB.',
    
    problem: 'Growth of unstructured data creates storage redundancy, increasing cloud expenses and slowing backup operations.',
    research: [
      'Benchmarked fixed-size and variable-length chunking strategies for storage efficiency.',
      'Designed a hash index in MongoDB for fast deduplication lookup.'
    ],
    
    architecture: [
      { id: 'web-portal', label: 'Web Management Portal', description: 'Upload and analytics dashboard displaying deduplication ratios', type: 'client', connections: ['dedup-engine'] },
      { id: 'dedup-engine', label: 'Deduplication Service', description: 'Block-level hashing and validation engine', type: 'server', connections: ['mongo-index'] },
      { id: 'mongo-index', label: 'Hash & Metadata DB', description: 'MongoDB collection indexing unique chunk signatures', type: 'database', connections: [] },
    ],

    features: [
      { title: 'Block-Level Deduplication', description: 'Identifies and removes duplicate file chunks prior to persistence.' },
      { title: 'Cryptographic Validation', description: 'Ensures data integrity through end-to-end hash verification.' },
      { title: 'Storage Metrics Dashboard', description: 'Telemetry showing storage saved and bandwidth optimization.' },
    ],

    lessons: [
      { type: 'success', title: 'Storage Efficiency', description: 'Demonstrated significant reductions in redundant storage footprint during batch uploads.' }
    ],

    theme: { primaryHue: '#3BA7FF', ambientIntensity: 0.15 },
    status: 'live',
    category: 'backend',
    year: 2024,
    role: 'Cloud & Backend Developer',
    duration: 'Completed',
    tech: [
      { name: 'Cloud Computing', category: 'devops' },
      { name: 'MongoDB', category: 'database' },
      { name: 'Python', category: 'backend' },
      { name: 'Web Dev', category: 'frontend' },
    ],
    links: [
      { label: 'Case Study', href: '/projects/cloud-deduplication', type: 'case-study' },
      { label: 'View on GitHub', href: 'https://github.com/saravanakumar14-V/Cloud-Based-Data-Deduplication-and-Validation-Platform', type: 'github' },
    ],
    thumbnail: '/projects/cloud-deduplication/hero.svg',
    hero: '/projects/cloud-deduplication/hero.svg',
    gallery: [
      {
        src: '/projects/cloud-deduplication/hero.svg',
        alt: 'Cloud data deduplication storage reduction metrics and block chunking view',
        type: 'image',
        caption: 'STORAGE OPTIMIZATION CONSOLE / DEDUPLICATION TELEMETRY',
        width: 1200,
        height: 675,
      },
      {
        src: '/projects/cloud-deduplication/validation.svg',
        alt: 'Rabin-Karp chunk boundary and SHA-256 fingerprint verification',
        type: 'image',
        caption: 'BLOCK CHUNKING PIPELINE / INTEGRITY VERIFICATION',
        width: 800,
        height: 600,
      },
      {
        src: '/projects/cloud-deduplication/analytics.svg',
        alt: 'Distributed storage savings and bandwidth telemetry',
        type: 'image',
        caption: 'STORAGE SAVINGS TELEMETRY / MONGODB INDEX REGISTRY',
        width: 800,
        height: 600,
      },
    ],
    featured: true,
    featuredOrder: 5,
  },

  {
    id: 'sql-injection-prevention',
    slug: 'sql-injection-prevention',
    title: 'SQL Injection Prevention System',
    tagline: 'Cybersecurity web platform featuring parameterized query validation and cryptographic data protection.',
    description: 'A cybersecurity web platform demonstrating parameterized query validation, input sanitization, and cryptographic data protection to prevent SQL injection vulnerabilities.',
    
    problem: 'SQL injection exposes database endpoints to unauthorized data exfiltration and destructive manipulation.',
    research: [
      'Analyzed common SQLi attack vectors (tautology, union-based, blind SQLi) and input validation techniques.',
      'Architected strict parameterized query abstractions combined with encryption layers for stored data.'
    ],
    
    architecture: [
      { id: 'secure-ui', label: 'Secured Interface', description: 'Client application with input pattern constraints', type: 'client', connections: ['flask-guard'] },
      { id: 'flask-guard', label: 'Flask Security Layer', description: 'Authorization middleware and query validator', type: 'server', connections: ['crypto-module', 'sqlite-db'] },
      { id: 'crypto-module', label: 'Encryption Module', description: 'Cryptographic hashing and payload encryption', type: 'server', connections: [] },
      { id: 'sqlite-db', label: 'Protected Database', description: 'SQLite database accessed strictly via parameterized bindings', type: 'database', connections: [] },
    ],

    features: [
      { title: 'Parameterized Query Enforcement', description: 'Eliminates raw dynamic SQL execution across application routes.' },
      { title: 'Capability-Based Authorization', description: 'Role-based access control protecting administrative endpoints.' },
      { title: 'Payload Encryption', description: 'Encrypts sensitive database fields to prevent plain-text disclosure.' },
    ],

    lessons: [
      { type: 'success', title: 'Defensive Reliability', description: 'Successfully neutralized automated and manual SQLi payload test suites.' }
    ],

    theme: { primaryHue: '#67D9FF', ambientIntensity: 0.15 },
    status: 'live',
    category: 'backend',
    year: 2024,
    role: 'Security & Backend Developer',
    duration: 'Completed',
    tech: [
      { name: 'Flask', category: 'backend' },
      { name: 'Python', category: 'backend' },
      { name: 'Cybersecurity', category: 'other' },
      { name: 'SQLite', category: 'database' },
    ],
    links: [
      { label: 'Case Study', href: '/projects/sql-injection-prevention', type: 'case-study' },
      { label: 'View on GitHub', href: 'https://github.com/saravanakumar14-V/Sql-Injection-Data-Leak-Prevention', type: 'github' },
    ],
    thumbnail: '/projects/sql-injection-prevention/hero.svg',
    hero: '/projects/sql-injection-prevention/hero.svg',
    gallery: [
      {
        src: '/projects/sql-injection-prevention/hero.svg',
        alt: 'SQL injection defense console with query validation and interception logs',
        type: 'image',
        caption: 'SECURITY DEFENSE CONSOLE / INJECTION INTERCEPTION',
        width: 1200,
        height: 675,
      },
      {
        src: '/projects/sql-injection-prevention/security.svg',
        alt: 'Parameterized query validator and input isolation view',
        type: 'image',
        caption: 'PARAMETER VALIDATION ENGINE / ATTACK ISOLATION',
        width: 800,
        height: 600,
      },
      {
        src: '/projects/sql-injection-prevention/results.svg',
        alt: 'Security audit test results and validation verification',
        type: 'image',
        caption: 'SECURITY AUDIT LOGS / ATTACK VECTOR MITIGATION',
        width: 800,
        height: 600,
      },
    ],
    featured: true,
    featuredOrder: 6,
  },

  {
    id: 'diabetes-prediction',
    slug: 'diabetes-prediction',
    title: 'Diabetes Prediction System',
    tagline: 'Machine-learning project predicting diabetes risk from structured health data.',
    description: 'A machine-learning web project predicting diabetes risk probability from structured physiological parameters using scikit-learn classification models and a Flask interface.',
    
    problem: 'Early identification of potential health risk factors is vital for proactive intervention.',
    research: [
      'Evaluated classification algorithms (Logistic Regression, Random Forest) for sensitivity on structured dataset splits.',
      'Implemented data preprocessing pipelines including standard feature scaling and imputation.'
    ],
    
    architecture: [
      { id: 'patient-form', label: 'Clinical Input UI', description: 'Form interface for physiological parameter entry', type: 'client', connections: ['flask-predictor'] },
      { id: 'flask-predictor', label: 'Flask Prediction API', description: 'Backend pipeline loading serialized ML model weights', type: 'server', connections: ['ml-model'] },
      { id: 'ml-model', label: 'scikit-learn Classifier', description: 'Trained predictive model computing risk probabilities', type: 'ai', connections: [] },
    ],

    features: [
      { title: 'Multi-Parameter Risk Evaluation', description: 'Computes predictive risk based on physiological attributes.' },
      { title: 'Probabilistic Output', description: 'Delivers feedback with confidence distributions.' },
      { title: 'Interactive Web Dashboard', description: 'Clean, responsive interface for structured data exploration.' },
    ],

    lessons: [
      { type: 'success', title: 'Classification Accuracy', description: 'Achieved robust classification performance on dataset validation splits.' }
    ],

    theme: { primaryHue: '#38bdf8', ambientIntensity: 0.15 },
    status: 'live',
    category: 'web',
    year: 2024,
    role: 'ML & Full-Stack Developer',
    duration: 'Completed',
    tech: [
      { name: 'Python', category: 'backend' },
      { name: 'Machine Learning', category: 'other' },
      { name: 'Flask', category: 'backend' },
      { name: 'scikit-learn', category: 'other' },
    ],
    links: [
      { label: 'Case Study', href: '/projects/diabetes-prediction', type: 'case-study' },
      { label: 'View on GitHub', href: 'https://github.com/saravanakumar14-V/Diabetes-Prediction-System', type: 'github' },
    ],
    thumbnail: '/projects/diabetes-prediction/hero.svg',
    hero: '/projects/diabetes-prediction/hero.svg',
    gallery: [
      {
        src: '/projects/diabetes-prediction/hero.svg',
        alt: 'Diabetes prediction web application with clinical inputs and risk dial',
        type: 'image',
        caption: 'PHYSIOLOGICAL PARAMETER ENTRY / RISK PROBABILITY DIAL',
        width: 1200,
        height: 675,
      },
      {
        src: '/projects/diabetes-prediction/prediction.svg',
        alt: 'ML classification confidence gauge and risk probability output',
        type: 'image',
        caption: 'ML PREDICTION GAUGE / PROBABILISTIC RISK EVALUATION',
        width: 800,
        height: 600,
      },
      {
        src: '/projects/diabetes-prediction/results.svg',
        alt: 'Classifier validation metrics and feature importance weights',
        type: 'image',
        caption: 'MODEL VALIDATION METRICS / FEATURE IMPORTANCE ANALYSIS',
        width: 800,
        height: 600,
      },
    ],
    featured: false,
    featuredOrder: 7,
  },

  {
    id: 'nexmart',
    slug: 'nexmart',
    title: 'NEXMART',
    tagline: 'E-commerce platform with product catalogs, shopping cart, and order workflows.',
    description: 'An e-commerce web platform featuring dynamic product catalog browsing, reactive shopping cart state management, user authentication, and order workflows.',
    
    problem: 'Online retail interfaces require responsive cart interactions and clean catalog state management.',
    research: [
      'Designed state-driven shopping cart mechanisms and reactive UI updates for product filtering and search.',
      'Implemented clean backend data models for products, categories, and customer orders.'
    ],
    
    architecture: [
      { id: 'storefront', label: 'E-Commerce Frontend', description: 'Responsive storefront with dynamic product grids and cart state', type: 'client', connections: ['api-service'] },
      { id: 'api-service', label: 'Commerce API', description: 'Backend service managing catalog, auth, and order processing', type: 'server', connections: ['commerce-db'] },
      { id: 'commerce-db', label: 'Database', description: 'Database holding inventory and user records', type: 'database', connections: [] },
    ],

    features: [
      { title: 'Dynamic Product Catalog', description: 'Categorized catalog with search and filtering.' },
      { title: 'Interactive Shopping Cart', description: 'Seamless client-side cart updates and checkout state.' },
      { title: 'User Order Workflows', description: 'Authentication and order summary views.' },
    ],

    lessons: [
      { type: 'success', title: 'Responsive Experience', description: 'Optimized checkout flows with instant feedback across all device viewports.' }
    ],

    theme: { primaryHue: '#3b82f6', ambientIntensity: 0.1 },
    status: 'live',
    category: 'web',
    year: 2023,
    role: 'Full-Stack Developer',
    duration: 'Completed',
    tech: [
      { name: 'React', category: 'frontend' },
      { name: 'Node.js', category: 'backend' },
      { name: 'Web Dev', category: 'frontend' },
      { name: 'JavaScript', category: 'frontend' },
    ],
    links: [
      { label: 'Case Study', href: '/projects/nexmart', type: 'case-study' },
      { label: 'View on GitHub', href: 'https://github.com/saravanakumar14-V/NexMartWeb', type: 'github' },
    ],
    thumbnail: '/projects/nexmart/hero.svg',
    hero: '/projects/nexmart/hero.svg',
    gallery: [
      {
        src: '/projects/nexmart/hero.svg',
        alt: 'NEXMART e-commerce storefront with dynamic product catalog and live cart',
        type: 'image',
        caption: 'E-COMMERCE STOREFRONT / REACTIVE CART DRAWER',
        width: 1200,
        height: 675,
      },
      {
        src: '/projects/nexmart/storefront.svg',
        alt: 'Dynamic product catalog grid and category filtering view',
        type: 'image',
        caption: 'PRODUCT CATALOG GRID / CATEGORY FILTERS & SEARCH',
        width: 800,
        height: 600,
      },
      {
        src: '/projects/nexmart/cart.svg',
        alt: 'Shopping cart drawer and checkout workflow',
        type: 'image',
        caption: 'SHOPPING CART & CHECKOUT / STATE MANAGEMENT',
        width: 800,
        height: 600,
      },
    ],
    featured: false,
    featuredOrder: 8,
  },
];

export function getFeaturedProjects(): Project[] {
  return projects
    .filter((p) => p.featured)
    .sort((a, b) => (a.featuredOrder ?? 99) - (b.featuredOrder ?? 99));
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}

export function getAllProjects(): Project[] {
  return projects;
}
