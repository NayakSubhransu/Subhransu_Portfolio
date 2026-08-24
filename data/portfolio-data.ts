// ============================================================
// data/portfolio-data.ts - All data extracted from data.md
// ============================================================

import type {
  HeroData,
  WorkExperience,
  CurrentFocus,
  FlagshipProject,
  UtilityProject,
  CPPlatform,
  CPAchievement,
  SkillCategory,
  Paper,
  Education,
  Certification,
  ContactInfo,
} from "@/types";

export const heroData: HeroData = {
  name: "Subhransu Priyaranjan Nayak",
  title: "Software Developer & AI Engineer",
  headline:
    "Competitive Programming · Full-Stack Development · Microservices · Distributed Systems · GenAI/LLMs · RAG Pipelines · Data Engineering",
  bio: "IIT Bhubaneswar graduate specializing in scalable backends, distributed consensus architectures, and modern Agentic RAG pipelines. Proven track record designing low-latency AP key-value stores (Amazon Dynamo model), decoupled microservices, and BigQuery analytical platforms serving 600K+ users.Active competitive programmer passionate about solving advanced Data Structures and Algorithms problems",
  photoPath: "/images/subhransu-photo.jpeg",
  photoAlt: "Subhransu Priyaranjan Nayak - Software Engineer & AI Developer",
  resumePath: "/resume.pdf",
  coverLetterPath: "/cover-letter.pdf",
  socials: {
    github: {
      label: "GitHub",
      url: "https://github.com/NayakSubhransu",
      handle: "NayakSubhransu",
    },
    linkedin: {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/subhransu-p-nayak/",
      handle: "subhransu-p-nayak",
    },
    leetcode: {
      label: "LeetCode",
      url: "https://leetcode.com/u/Subhransu_Nayak_07/",
      handle: "Subhransu_Nayak_07",
    },
    codechef: {
      label: "CodeChef",
      url: "https://www.codechef.com/users/quantum_07",
      handle: "quantum_07",
    },
    codeforces: {
      label: "Codeforces",
      url: "https://codeforces.com/profile/Quantum-Questor",
      handle: "Quantum-Questor",
    },
  },
};

// export const currentFocus: CurrentFocus = {
//   title: "GitHub PR Reviewer",
//   status: "Active Engineering / In Development",
//   architecture:
//     "An autonomous multi-agent code analysis pipeline leveraging AST parsing, LLM diff reasoning, and GitHub Webhooks to execute deterministic linting, security vulnerability checks, and automated review commentary on open PRs.",
//   stack: [
//     "Python",
//     "FastAPI",
//     "AST Parsing",
//     "LangGraph",
//     "vLLM",
//     "GitHub REST & Webhook APIs",
//     "Docker",
//   ],
//   repoUrl: "https://github.com/NayakSubhransu",
// };

export const currentFocus: CurrentFocus = {
  status: "On Active Development",
  title: "AI GitHub Pull-Request Reviewer Agent",
  architecture:
    "Event-driven microservices architecture utilizing FastAPI, LangGraph workflow orchestration, Redis message queues with Celery workers, and a continuous feedback learner loop deployed on Kubernetes via Terraform.",
  stack: [
    "Python",
    "FastAPI",
    "LangGraph",
    "Celery",
    "Redis",
    "PostgreSQL",
    "Kubernetes",
    "Terraform",
    "Prometheus",
  ],
  repoUrl: "https://github.com/NayakSubhransu/github-ai-pull-request-reviewer-agent",
};

export const workExperience: WorkExperience[] = [
  {
    id: "healthyday",
    role: "Data Engineering Intern",
    company: "HealthyDay",
    companyUrl: "https://healthyday.co.in/",
    location: "Hybrid, India",
    duration: "Nov 2025 - Present (3 Mo. + 6 Mo. Extended)",
    type: "internship",
    verificationUrl:
      "https://drive.google.com/file/d/1Az1x0rX7HdN39RdKljrPsjGWNHC8vm1z/view?usp=drivesdk",
    bullets: [
      "Engineered a **BigQuery**-based data processing layer for a platform serving **600K+ registered students**, integrating Firestore and relational operational data by developing **50+ reusable SQL views** with CTEs, window functions, JSON parsing, regex classification, and temporal deduplication.",
      "Designed and optimized **150+ complex SQL queries** and data pipelines across user **attendance, referral, subscription, payment, and messaging workflows** using incremental aggregation strategies and query tuning.",
      "Built **end-to-end data pipelines** unifying heterogeneous sources **(Firestore Logs, Google/Meta Ads, WhatsApp/AiSensy messaging logs, transactional databases)**, implementing entity matching, and event sequencing across system boundaries.",
      "Developed automated data models and analytical views powering **Looker Studio** dashboards, implementing **funnel/event processing, cohort retention analysis, referral tracking, customer support metrics, and AI-classifier log monitoring**.",
    ],
    stack: [
      "Google BigQuery",
      "SQL",
      "Python",
      "Looker Studio",
      "Firestore",
      "PostgreSQL",
      "Data Modeling",
    ],
  },
  {
    id: "hanyaa",
    role: "Software/AI Engineering Intern",
    company: "Hanyaa Auto Technologies",
    companyUrl: "https://hanyaatech.com/",
    location: "Hyderabad, India",
    duration: "Jun 2025 - Jul 2025",
    type: "internship",
    verificationUrl:
      "https://drive.google.com/file/d/1g53s2MK5ZbcHWlSVwPpLtv_hyFDE0sAz/view?usp=sharing",
    bullets: [
      "Engineered an **AI text-to-animated-video narration pipeline** for Indian languages (English, Hindi, Telugu ) by fine-tuning **Dia-TTS (1.6B)**, optimizing training with **dynamic LR scheduling and gradient clipping** to eliminate robotic artifacts.",
      "Architected a **long-form audio generation engine** with sentence chunking (**NLTK**), input text normalization, failure-handling retry logic, and seed-locked speaker consistency (**IS11 tag**) for coherent synthesis.",
      "Built an interactive **Streamlit UI** integrating **Gemini 2.5 Flash TTS API** alongside proprietary media pipelines (Hanyaa's), enabling automated **multilingual narration generation**.",
    ],
    stack: [
      "Python",
      "PyTorch",
      "Transformers",
      "XTTS",
      "Dia-TTS (1.6B)",
      "Gemini 2.5 Flash API",
      "NLTK",
      "Streamlit",
    ],
  },
];

export const flagshipProjects: FlagshipProject[] = [
  {
    id: "dynamocore",
    name: "DynamoCore",
    subheading:
      "End-to-End Implementation of the Amazon Dynamo (2007) Distributed Storage Paper",
    repoUrl: "https://github.com/NayakSubhransu/DynamoCore",
    paperUrl: "https://dl.acm.org/doi/epdf/10.1145/1323293.1294281",
    stack: [
      "Java",
      "RocksDB",
      "Maven",
      "Consistent Hashing(MurmurHash3)",
      "JDK HttpServer",
      "Gossip Protocol",
      "Vector Clocks",
      "Java Concurrency",
      "Merkle Tree",
      "Quorum Consensus", "Docker"
    ],
    highlights: [
      "Built a distributed **AP key-value store** with asynchronous quorum consensus (N=3, W=2, R=2) via non-blocking CompletableFuture pipelines, achieving **12 ms p99 write latency** under concurrent load.",
      "Implemented a **consistent hashing ring** (150 virtual nodes/host, MurmurHash3) with O(log N) key routing, achieving **sub-4% load distribution deviation** and bounded node-join/leave data migration to K/N.",
      "Sustained **100% Writes** during primary replica failures using **sloppy quorums**, hinted handoffs, and a **P2P Gossip failure detector** (ALIVE/SUSPECT/DEAD) with automated background recovery replay.",
      "Eliminated full-dataset reconciliation scans with **Merkle Tree anti-entropy** (O(1) root-hash, **6 ms p99**) and immutable **Vector Clocks** for causal conflict detection without global consistency locks.",
    ],
    imageHint: "distributed systems architecture diagram",
  },
  {
    id: "urbaneats",
    name: "UrbanEats",
    subheading:
      "Real-Time Spatial Courier Dispatch & Resilient Order Fulfillment Microservices",
    repoUrl: "https://github.com/NayakSubhransu/UrbanEats",
    stack: [
      "React.js",
      "Node.js",
      "TypeScript",
      "Express.js",
      "RabbitMQ(AMQP)",
      "Socket.IO(WebSockets)",
      "MongoDB", "Leaflet",
      "Docker",
    ],
    highlights: [
      "Decoupled core domains into **6 autonomous Node.js/TypeScript microservices** communicating via HTTP and asynchronous **RabbitMQ AMQP message queues**, ensuring fault tolerance and zero-downtime service autonomy.",
      "Built real-time courier dispatch with **MongoDB 2dsphere spatial indexing** and $nearSphere queries to match nearest courier within **500 m**; streamed live GPS telemetry at 10-second intervals via **Socket.IO** room-based routing.",
      "Automated abandoned cart with **MongoDB TTL indexes (15-mins)** and secured payment finalization with **Razorpay HMAC SHA-256** signature validation; atomic transaction persistence via RabbitMQ.",
      "Optimized media pipelines streaming Multer in-memory buffers as **Base64 DataURIs to Cloudinary CDN** for zero-disk uploads, utilizing native **MongoDB drivers** to eliminate ODM overhead.",
    ],
    imageHint: "food delivery microservices event driven architecture",
  },
  {
    id: "enterprise-rag",
    name: "Enterprise RAG Orchestrator",
    subheading:
      "Stateful Multi-Path Reasoning Engine with Human-In-The-Loop Governance",
    repoUrl:
      "https://github.com/NayakSubhransu/enterprise-rag-orchestrator",
    stack: [
      "Python",
      "FastAPI",
      "LangGraph",
      "Qdrant",
      "Upstash Redis",
      "PostgreSQL",
      "Docker",
      "Ragas"
    ],
    highlights: [
      "Built a **stateful multi-path reasoning engine** with LangGraph and **PostgreSQL checkpointers** dynamically routing queries across RAG, Text-to-SQL, and Hybrid paths; implemented **CRAG** web fallbacks and **Self-RAG** reflection loops to reduce hallucinations across a **95% noise document corpus**.",
      "Engineered a multi-stage retrieval pipeline with **Qdrant hybrid search (Dense + Sparse TF-IDF via RRF), HyDE expansion, and Cross-Encoder reranking (Top-20 to Top-5)**, backed by a 5-tier cryptographic **Redis cache**.",
      "Developed an **AST-guarded Text-to-SQL engine** over 7 PostgreSQL 16 tables on K8s; enforced SELECT-only execution policies and integrated LangGraph interrupt() **HITL** approval gates to block AI-generated mutation queries.",
      "Hardened a **9-layer defense architecture** across FastAPI endpoints with ML prompt injection scanning (llm-guard), **XML spotlighting, bidirectional PII redaction, token budgeting, and Ragas benchmarking**.",
    ],
    imageHint: "agentic RAG LangGraph orchestration pipeline",
  },
];

export const utilityProjects: UtilityProject[] = [
  {
    id: "collab-editor",
    name: "Realtime Collaborative Editor",
    summary:
      "A full-stack, real-time collaborative document editor featuring CRDT-based multi-user concurrent editing, live cursor presence, and rich-text formatting. Built with a reactive serverless architecture using Convex and Liveblocks to handle zero-latency synchronization, paired with Clerk for edge-authenticated access control and document organization.",
    repoUrl:
      "https://github.com/NayakSubhransu/realtime-collaborative-editor",
    stack: [
      "Next.js",
      "Convex",
      "Liveblocks",
      "Tiptap",
      "Clerk",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui"
    ],
  }, {
    id: "ledger",
    name: "Transaction Processing Ledger Backend",
    summary:
      "A double-entry financial ledger and transaction processing API built with Node.js and MongoDB. Features immutable debit-credit audit trails, multi-account balance management, JWT blacklisting, and async email alerts to ensure strict data integrity across money transfers.",
    repoUrl:
      "https://github.com/NayakSubhransu/transaction-processing-ledger-backend",
    stack: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "JWT",
      "Bcrypt",
      "Nodemailer",
      "REST APIs"
    ]
  },
  {
    id: "gc-app",
    name: "IIT Bhubaneswar GC 2024 Mobile App",
    summary:
      "A cross-platform mobile application developed with React Native and Expo to track IIT Bhubaneswar's General Championship (GC) 2024. Features real-time sports and tech/cultural event schedules, live scorecards, points tally leaderboards, interactive team following, and an integrated admin panel for match and event score updates.",
    repoUrl: "https://github.com/Neuroiitbbs/GC_2024_App",
    stack: ["React Native", "Expo", "JavaScript", "React Navigation"],
  },
  
  {
    id: "maze-quest",
    name: "Medieval Maze Quest",
    summary:
      "A first-person medieval dungeon puzzle game built in Unreal Engine 5 featuring modular C++ game mechanics, physics-based object manipulation via line tracing, and tag-filtered trigger systems for environmental puzzle solving.",
    repoUrl:
      "https://github.com/NayakSubhransu/GameDev-Hackathon--Medieval-Maze-Quest",
    stack: ["Unreal Engine 5", "C++", "Physics Handle", "Component Architecture"],
    award: "Game Dev Hackathon - 3rd Place",
  },
  {
    id: "campus-erp",
    name: "Campus ERP System",
    summary:
      "Built an end-to-end MERN ERP suite delivering modular role-based portals for academic workflows, automated course registration, attendance monitoring, and stateful SAC inventory and equipment lifecycle management.",
    repoUrl: "https://github.com/NayakSubhransu/ERP_System_WebAthon",
    stack: ["React", "Vite","Node.js", "Express.js", "MongoDB"],
    award: "WebDev Hackathon - 3rd Place",
  },
  
];

export const cpPlatforms: CPPlatform[] = [
  {
    id: "codeforces",
    name: "Codeforces",
    handle: "Quantum-Questor",
    profileUrl: "https://codeforces.com/profile/Quantum-Questor",
    peakRating: 1345,
    ratingLabel: "Pupil",
    problemsSolved: 200,
    colorClass: "text-sky-400",
    accentColor: "#1DA1F2",
    badgeLabel: "Pupil",
  },
  {
    id: "leetcode",
    name: "LeetCode",
    handle: "Subhransu_Nayak_07",
    profileUrl: "https://leetcode.com/u/Subhransu_Nayak_07/",
    peakRating: 1934,
    ratingLabel: "Top 4% Globally",
    problemsSolved: 1000,
    colorClass: "text-yellow-400",
    accentColor: "#FFA116",
    badgeLabel: "Knight",
  },
  {
    id: "codechef",
    name: "CodeChef",
    handle: "quantum_07",
    profileUrl: "https://www.codechef.com/users/quantum_07",
    peakRating: 1682,
    ratingLabel: "3-Star Division 2",
    colorClass: "text-amber-500",
    accentColor: "#F4A233",
    badgeLabel: "3★ Rated",
  },
  
];


export const cpAchievements: CPAchievement[] = [
  {
    id: "inter-iit",
    title: "Bronze Medal - Inter IIT Tech Meet 10.0 (2022)",
    description:
      "Secured 3rd position representing IIT Bhubaneswar in the `Gmetri's Growth Strategy for Metaverse` event at Inter-IIT Tech Meet 10.0 conducted by IIT Kharagpur, designing strategic growth frameworks and solutions for emerging metaverse ecosystems.",
    certUrl:
      "https://drive.google.com/file/d/1EaAh0NhMKyq-5XM5L7PDq1qvw-X8HsDI/view",
  },
  {
    id: "gamedev-hackathon",
    title: "Intra-IIT Hackathon - Game Dev 3rd Place",
    description:
      "Engineered `Medieval Maze Quest`, a 3D first-person puzzle-dungeon game built in Unreal Engine 5. Implemented core gameplay systems in C++, including physics handle raycasting for dynamic object interactions, custom actor movement interpolation, and tag-based trigger volumes for interactive environmental puzzles.",
    githubUrl: "https://github.com/NayakSubhransu/GameDev-Hackathon--Medieval-Maze-Quest",
  },
  {
    id: "webdev-hackathon",
    title: "Intra-IIT Hackathon - WebDev 3rd Place",
    description:
      "Architected and built a full-stack Academic ERP system featuring dedicated portals for students and administrators. Key implementations include automated course registration, attendance tracking, student profile management, feedback collection, grading views, and a SAC equipment issuance workflow using React, Node.js, Express, and MongoDB.",
    githubUrl: "https://github.com/NayakSubhransu/ERP_System_WebAthon",
  }
];

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    title: "Core Languages",
    icon: "Code2",
    skills: [
      "C++",
      "Java",
      "Python",
      "C",
      "TypeScript",
      "JavaScript (ES6+)",
      "SQL",
      "HTML5 / CSS3",
    ],
  },
  {
    id: "ai-ml",
    title: "AI & LLM Engineering",
    icon: "Brain",
    skills: [
      "LangGraph",
      "GenAI", "LLMs",
      "RAG Pipelines",
      "Vector DBs (Qdrant)",
      "PyTorch",
      "Hugging Face Transformers",
      "TensorFlow",
      "Scikit-learn",
      "XGBoost",
      "NLTK",
    ],
  },
  {
    id: "core-cs",
    title: "Core Computer Science",
    icon: "Cpu",
    skills: [
      "Data Structures & Algorithms", 
      "Operating Systems & Multithreading", 
      "Computer Networks", 
      "Database Management Systems (DBMS)", 
      "Object-Oriented Programming (OOPs)",
      "SOLID Principles",
      "Design Patterns", 
    ],
  }, 
  {
    id: "backend",
    title: "Backend & Distributed Systems",
    icon: "Server",
    skills: [
      "Distributed Systems Design",
      "Microservices Architecture & HLD",
      "FastAPI",
      "Node.js & Express.js",
      "RabbitMQ (AMQP)",
      "Socket.io (WebSockets)",
      "Data Modelling",
      "PostgreSQL",
      "BigQuery",
      "MongoDB",
      "Firestore",
      "API Design",
    ],
  },
  {
    id: "frontend-devops",
    title: "Frontend",
    icon: "Layers",
    skills: [
      "Next.js (App Router)",
      "React.js",
      "React Native",
      "Tailwind CSS",
      "Streamlit",
      "Docker & Kubernetes Basics",
      "Git",
      "CI / CD",
      "Linux & Bash",
    ],
  },
];

export const papers: Paper[] = [
  {
    id: "dynamo-2007",
    title: "Dynamo: Amazon's Highly Available Key-value Store (2007)",
    authors:
      "Giuseppe DeCandia, Deniz Hastorun, Madan Jampani, Gunavardhan Kakulapati, Avinash Lakshman, Alex Pilchin, Swaminathan Sivasubramanian, Peter Vosshall, Werner Vogels",
    year: 2007,
    category: "Distributed Systems & Storage",
    pdfPath: "/papers/amazon-dynamo-2007.pdf",
    originalUrl:
      "https://dl.acm.org/doi/epdf/10.1145/1323293.1294281",
    tldr: {
      problem:
        "Providing always-on, high-throughput storage for critical e-commerce cart operations where network partitions and hardware failures are regular occurrences.",
      breakthrough:
        "Combining consistent hashing, sloppy quorums with hinted handoffs, Merkle tree anti-entropy, and vector clocks to achieve high availability (AP in CAP theorem) without global locks.",
      takeaways: [
        "Tuning N, W, R parameters allows dynamic trade-offs between consistency and latency at runtime.",
        "Gossip protocols drastically minimize centralized coordination overhead in large-scale distributed clusters.",
      ],
    },
  },
  {
    id: "attention-2017",
    title: "Attention Is All You Need (2017) - Transformers Paper",
    authors:
      "Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Łukasz Kaiser, Illia Polosukhin",
    year: 2017,
    category: "LLM Architecture & Deep Learning",
    pdfPath: "/papers/attention-is-all-you-need.pdf",
    originalUrl: "https://arxiv.org/abs/1706.03762",
    tldr: {
      problem:
        "Sequential bottlenecks and vanishing gradients in recurrent networks (RNNs/LSTMs) preventing efficient parallelized long-context training.",
      breakthrough:
        "Introducing the Transformer architecture based entirely on multi-head scaled dot-product self-attention mechanisms, enabling full parallelization.",
      takeaways: [
        "O(N²) sequence length computation necessitates memory optimizations like FlashAttention during inference.",
        "Selective KV-caching is essential for high-throughput inference serving in production LLM deployments.",
      ],
    },
  },
  {
    id: "crag-2024",
    title: "Corrective Retrieval Augmented Generation (CRAG, 2024)",
    authors: "Shi-Qi Yan, J.-C. Gu, Yun Zhu, Zhen-Hua Ling",
    year: 2024,
    category: "Agentic AI & RAG Pipelines",
    pdfPath: "/papers/crag-corrective-rag.pdf",
    originalUrl: "https://arxiv.org/abs/2401.15884",
    tldr: {
      problem:
        "Standard RAG pipelines indiscriminately pass irrelevant or hallucinated retrieved chunks into the generative LLM prompt context.",
      breakthrough:
        "A lightweight retrieval evaluator that classifies retrieval quality into Correct, Ambiguous, or Incorrect, triggering automated web search fallbacks or document strip-refinement.",
      takeaways: [
        "Integrating a dedicated grading step in LangGraph checkpointers prevents garbage-in/garbage-out across noisy enterprise corpora.",
        "Dynamic fallback to web search when retrieval confidence is low dramatically reduces hallucination rates at low cost.",
      ],
    },
  },
];

export const education : Education[] = [
  {
    institution: "Indian Institute of Technology ( IIT ) Bhubaneswar",
    degree: "Integrated B.Tech",
    major: "Mechanical System Design Engineering",
    duration: "2021 - 2026",
    cgpa: "8.3 / 10.0",
    location: "Odisha, Bhubaneswar, India",
    logoHint: "IIT Bhubaneswar logo",
  },
  {
    institution: "Ascent Junior College",
    degree: "Senior Secondary ( Grade 12 )",
    major: "Science ( PCM )",
    duration: "2018 - 2020",
    cgpa: "9.82 / 10.0",
    location: "Visakhapatnam, Andhra Pradesh, India",
    logoHint: "Ascent Junior College logo",
  },
  {
    institution: "Jeevan Jyothi Convent ( ICSE ) School",
    degree: "Secondary School ( Grade 10 )",
    duration: "2010 - 2018",
    percentage: "93.2%",
    location: "Koraput, Odisha, India",
    logoHint: "Jeevan Jyothi Convent logo",
  },
];

// export const education: Education = {
//   institution: "Indian Institute of Technology (IIT) Bhubaneswar",
//   degree: "Integrated B.Tech",
//   major: "Mechanical System Design Engineering",
//   duration: "2021 - 2026",
//   cgpa: "8.3 / 10.0",
//   location: "Odisha, India",
//   // coursework: [
//   //   "Data Structures & Algorithms",
//   //   "Operating Systems",
//   //   "Multithreading",
//   //   "Computer Networking",
//   //   "Database Management Systems",
//   //   "Distributed Systems",
//   //   "Microservices Architecture",
//   //   "Object-Oriented Programming",
//   //   "Design Patterns",
//   // ],
//   logoHint: "IIT Bhubaneswar logo",
// };

export const certifications: Certification[] = [
  {
    id: "sys-design-grokking",
    name: "System Design (Grokking the System Design Interview)",
    issuer: "DesignGurus",
    year: 2026,
    verifyUrl:
      "https://www.designgurus.io/certificate/WyI2MzZiMWQwOTNiMjJmYWEzZTg5YjI0OTEiLCI2OWFjYTBmMDJmYTMyNTFmMWM2NmY5NWYiXQ==",
    skills: ["System Design", "Distributed Systems", "Scalability"],
  },
  {
    id: "sys-design-udemy",
    name: "System Design From Basics to Cracking Interviews",
    issuer: "Udemy",
    year: 2026,
    verifyUrl:
      "https://www.udemy.com/certificate/UC-4458615f-6eab-4450-acc2-9b2e581e011e/",
    skills: ["HLD", "LLD", "Architecture Patterns"],
  },
  {
    id: "advanced-sql",
    name: "Advanced SQL Querying",
    issuer: "Udemy",
    year: 2025,
    verifyUrl:
      "https://www.udemy.com/certificate/UC-e1dc5ba4-708a-45e8-99c5-da1df6cad873/",
    skills: ["SQL", "CTEs", "Window Functions", "Query Optimization"],
  },
  {
    id: "algo-cp",
    name: "Algorithms & Competitive Programming",
    issuer: "Accredited Training",
    year: 2025,
    verifyUrl:
      "https://drive.google.com/file/d/1kd0ajaig1xsxeCuuiMdO9F1HE2XHiNl6/view?usp=drive_link",
    skills: ["DSA", "Competitive Programming", "Algorithms"],
  },
  {
    id: "react-guide",
    name: "The React.js Guide",
    issuer: "Accredited Training",
    year: 2025,
    verifyUrl:
      "https://drive.google.com/file/d/1yqz3KZtkEc-7J6Pgo5WukM4LUp7YBzIv/view?usp=drive_link",
    skills: ["React.js", "Hooks", "State Management"],
  },
  {
    id: "react-native-guide",
    name: "The React Native Guide",
    issuer: "Accredited Training",
    year: 2025,
    verifyUrl:
      "https://drive.google.com/file/d/1h06vc4XufEuwzezkBbrBVxV5ngCrW7bi/view?usp=drive_link",
    skills: ["React Native", "TypeScript", "Mobile Development"],
  },
  {
    id: "sql-cert",
    name: "SQL Certification",
    issuer: "Accredited Training",
    year: 2023,
    verifyUrl:
      "https://drive.google.com/file/d/16WM3NoD9SJ_AYrq4DE6kEQdYVnHLvmwH/view?usp=drive_link",
    skills: ["SQL", "Database Design"],
  },
  {
    id: "java-indepth",
    name: "Java In-Depth",
    issuer: "Accredited Training",
    year: 2023,
    verifyUrl:
      "https://drive.google.com/file/d/186CJasK7U8m1nMscVLvgaKPVguEj6H4g/view?usp=drive_link",
    skills: ["Java", "OOP", "Multithreading", "JVM Internals"],
  },
  {
    id: "deep-learning",
    name: "Deep Learning",
    issuer: "Accredited Training",
    year: 2023,
    verifyUrl:
      "https://drive.google.com/file/d/1S-g2BPqVliDFh62TYsUdq2wxWXYrn0_-/view?usp=drive_link",
    skills: ["Neural Networks", "PyTorch", "CNN", "Transformers"],
  },
  {
    id: "machine-learning",
    name: "Machine Learning",
    issuer: "Accredited Training",
    year: 2023,
    verifyUrl:
      "https://drive.google.com/file/d/1zV1XXIGhWRWit_SGPzBvoYztTuLmbSEr/view?usp=drive_link",
    skills: ["ML Algorithms", "Scikit-learn", "XGBoost", "Feature Engineering"],
  },
];

export const contactInfo: ContactInfo = {
  email: "subhransu.nayak.connect@gmail.com",
  location: "Odisha, India / Hybrid",
  github: "https://github.com/NayakSubhransu",
  linkedin: "https://www.linkedin.com/in/subhransu-p-nayak/",
};
