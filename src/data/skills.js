/**
 * Skills Data
 * Add / remove skills in each category as needed
 */

export const skillCategories = [
    {
        id: "frontend",
        label: "Frontend",
        icon: "monitor",
        color: "#E040FB",
        skills: [
            { name: "HTML5", level: 95, icon: "html" },
            { name: "CSS3", level: 90, icon: "css" },
            { name: "JavaScript", level: 85, icon: "javascript" },
            { name: "Tailwind CSS", level: 88, icon: "tailwind" },
        ],
    },
    {
        id: "backend",
        label: "Backend",
        icon: "server",
        color: "#7C4DFF",
        skills: [
            { name: "Node.js", level: 65, icon: "node" },
            { name: "Express.js", level: 60, icon: "express" },
            { name: "REST APIs", level: 70, icon: "api" },
        ],
    },
    {
        id: "programming",
        label: "Programming",
        icon: "code",
        color: "#7C4DFF",
        skills: [
            { name: "Python", level: 82, icon: "python" },
            { name: "JavaScript", level: 85, icon: "javascript" },
            { name: "C++", level: 65, icon: "cpp" },
            { name: "TypeScript", level: 60, icon: "typescript" },
        ],
    },
    {
        id: "database",
        label: "Database",
        icon: "database",
        color: "#C084FC",
        skills: [
            { name: "MongoDB", level: 65, icon: "mongodb" },
            { name: "MySQL", level: 60, icon: "mysql" },
            { name: "Firebase", level: 60, icon: "firebase" },
            { name: "DBMS", level: 70, icon: "database" },
        ],
    },
    {
        id: "tools",
        label: "Tools & DevOps",
        icon: "tool",
        color: "#34D399",
        skills: [
            { name: "Git & GitHub", level: 80, icon: "git" },
            { name: "VS Code", level: 90, icon: "vscode" },
            { name: "Figma", level: 65, icon: "figma" },
        ],
    },
    {
        id: "soft",
        label: "Soft Skills",
        icon: "users",
        color: "#F472B6",
        skills: [
            { name: "Problem Solving", level: 90, icon: "brain" },
            { name: "Communication", level: 85, icon: "chat" },
            { name: "Team Work", level: 88, icon: "users" },
            { name: "Adaptability", level: 90, icon: "refresh" },
            { name: "Quick Learner", level: 92, icon: "book" },
        ],
    },
];
