/**
 * Projects Data - Premium Project Showcase
 * 
 * Project Object Structure:
 * {
 *   id: unique identifier
 *   title: project name
 *   description: brief description
 *   icon: emoji icon or category string for the project
 *   color: brand color for the project (#RRGGBB)
 *   status: "Completed" | "In Progress"
 *   featured: boolean - highlights as featured project
 *   year: publication year
 *   tech: array of technologies used
 *   features: array of key features
 *   challenges: array of challenges faced
 *   solutions: array of solutions implemented
 *   metrics: array of performance metrics with value and label
 *   stats: array of key stats (value, label) for featured section
 *   gallery: array of screenshot descriptions or placeholders
 *   timeline: array of project phases with icon, phase name, and description
 *   github: link to GitHub repository
 *   demo: link to live demo
 * }
 */

export const projects = [
    {
        id: 1,
        title: "DevSpace Dashboard",
        description: "A premium, glassmorphic productivity and workspace hub for developers. Features real-time system monitoring widgets, custom layout engines, integrated terminals, and interactive Kanban boards for optimal workspace flow.",
        icon: "🚀",
        color: "#06B6D4",
        status: "Completed",
        featured: true,
        year: 2024,
        tech: ["React", "Tailwind CSS", "Framer Motion", "Node.js", "WebSockets"],
        features: [
            "Real-time system telemetry and environment widget grid.",
            "Dynamic canvas layout with glassmorphic drag-and-drop mechanics.",
            "Interactive development planner synced to local Git repositories.",
            "Optimized state management ensuring sub-10ms UI response times under load."
        ],
        challenges: [
            "Achieving high-frame-rate rendering while animating complex drag-and-drop transitions for multiple heavy charts.",
            "Structuring a WebSocket system that gracefully handles concurrent event streams without UI blockages."
        ],
        solutions: [
            "Utilized requestAnimationFrame and layout-only Framer Motion components to offload position recalculations.",
            "Implemented a debounced rendering queue that batches updates into single-pass virtual DOM repaints."
        ],
        metrics: [
            { value: "60 FPS", label: "Render Rate" },
            { value: "0ms Delay", label: "Input Lag" },
            { value: "98/100", label: "Lighthouse Score" }
        ],
        stats: [
            { value: "10K+", label: "Installs" },
            { value: "99.2%", label: "Stability" }
        ],
        gallery: [
            "Interactive Dashboard Widgets",
            "Kanban Board Customizer",
            "System Performance Profiler"
        ],
        timeline: [
            {
                phase: "Architecture Design",
                icon: "📋",
                description: "Mapped layout engine schemas, designed glassmorphism theme components."
            },
            {
                phase: "Engine Development",
                icon: "⚙️",
                description: "Built the custom widget system, drag-and-drop features, and WebSocket telemetry integration."
            },
            {
                phase: "Performance Tuning",
                icon: "✅",
                description: "Profiled memory footprints, optimized render cycles, and achieved consistent 60 FPS."
            },
            {
                phase: "Deployment",
                icon: "🚀",
                description: "Hosted with production-grade monitoring systems on cloud infrastructure."
            }
        ],
        github: "https://github.com/nitin-gawade/devspace-dashboard",
        demo: "https://devspace-dashboard-demo.vercel.app"
    },
    {
        id: 2,
        title: "Quantum Visualizer",
        description: "An audio-responsive, 3D particle system explorer. Generates interactive geometries, vortexes, and frequency spectrum fields synchronized with real-time user microphone input or custom tracks.",
        icon: "🌐",
        color: "#EC4899",
        status: "Completed",
        featured: false,
        year: 2024,
        tech: ["HTML5 Canvas", "JavaScript", "React", "CSS Variables", "Web Audio API"],
        features: [
            "Dynamic physics-based particle movement matching audio frequencies.",
            "Custom shaders rendering complex glowing effects and neon tail vectors.",
            "Interactive controls adjusting gravity fields, friction, and visual themes.",
            "Real-time Fourier transform parsing microphone and media source inputs."
        ],
        challenges: [
            "Synchronizing thousands of visual nodes in real-time with Web Audio API response callbacks on low-end devices.",
            "Handling responsive scaling of high-DPI canvas drawings without resetting drawing buffers."
        ],
        solutions: [
            "Offloaded particle position calculations to localized coordinate matrices.",
            "Implemented an offscreen canvas backing store to prevent buffer loss during screen orientation changes."
        ],
        metrics: [
            { value: "5000+", label: "Particles" },
            { value: "60 FPS", label: "Smoothness" },
            { value: "0.2s", label: "Sync Latency" }
        ],
        stats: [
            { value: "50K+", label: "Streams" },
            { value: "98.9%", label: "Device Support" }
        ],
        gallery: [
            "Microphone Stream Waveform Mode",
            "Cosmic Dust Particle Field",
            "Interactive Geometry Controls"
        ],
        timeline: [
            {
                phase: "Audio Analysis",
                icon: "📋",
                description: "Created Web Audio node trees and fast Fourier transform structures."
            },
            {
                phase: "Physics Engine",
                icon: "⚙️",
                description: "Programmed mathematical equations for orbiters, attractors, and gravity modifiers."
            },
            {
                phase: "Visual Fine-Tuning",
                icon: "✅",
                description: "Polished gradient rendering, glow filters, and responsive scaling calculations."
            },
            {
                phase: "Launch",
                icon: "🚀",
                description: "Shipped fully responsive web implementation supporting desktop and mobile devices."
            }
        ],
        github: "https://github.com/nitin-gawade/quantum-visualizer",
        demo: "https://quantum-visualizer-demo.vercel.app"
    },
    {
        id: 3,
        title: "Apex Analytics Portal",
        description: "A high-performance metrics dashboard and log collector. Designed to stream and visualize server bandwidth, CPU usage, and network alerts in real-time, leveraging layered glass tables and responsive charting.",
        icon: "⚙️",
        color: "#F59E0B",
        status: "In Progress",
        featured: false,
        year: 2024,
        tech: ["React", "Tailwind CSS", "Chart.js", "Express", "MongoDB"],
        features: [
            "Streaming metrics charts updating dynamically every 500ms.",
            "Detailed activity logs with advanced filtering, searching, and exports.",
            "Predefined incident alert triggers configured with webhooks.",
            "Minimal CPU overhead and clean responsive layouts built on glassmorphism."
        ],
        challenges: [
            "Preventing chart layout recalculations from consuming excessive CPU cycles on long-running client sessions.",
            "Designing a modern and readable representation of massive, multi-level datasets."
        ],
        solutions: [
            "Used fixed database intervals and local buffer caching to limit paint updates to predefined steps.",
            "Implemented collapsible data-grid tables with interactive sorting and clean visual indicators."
        ],
        metrics: [
            { value: "500ms", label: "Telemetry Interval" },
            { value: "99.99%", label: "Alert Accuracy" },
            { value: "2MB", label: "Bundle Size" }
        ],
        stats: [
            { value: "480", label: "Monitored Hosts" },
            { value: "0% Leak", label: "Memory Retention" }
        ],
        gallery: [
            "Live Server Metrics Feed",
            "Incident Alert History",
            "System Logs Explorer"
        ],
        timeline: [
            {
                phase: "Database Architecture",
                icon: "📋",
                description: "Modeled high-frequency time-series datasets in MongoDB."
            },
            {
                phase: "Real-time Charts",
                icon: "⚙️",
                description: "Integrated streaming chart buffers and client-side memory optimizations."
            },
            {
                phase: "Testing",
                icon: "✅",
                description: "Simulated high metric throughput and verified rendering memory footprint."
            }
        ],
        github: "https://github.com/nitin-gawade/apex-analytics",
        demo: "https://apex-analytics-demo.vercel.app"
    }
];

export const projectTags = ["All", "React", "Tailwind CSS", "Framer Motion", "Node.js", "WebSockets", "HTML5 Canvas", "JavaScript", "CSS Variables", "Web Audio API", "Chart.js", "Express", "MongoDB"];
