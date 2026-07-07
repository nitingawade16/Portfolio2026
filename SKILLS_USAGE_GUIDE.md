# Skills Page - Usage & Customization Guide

## 🎯 Quick Start

The redesigned Skills page is located at `/src/pages/Skills.jsx` and automatically integrates with your routing.

### View the Page
1. Skills are accessible via the main navigation
2. Default category: Frontend
3. Default view: Cards

## 🎮 User Interactions

### Viewing Modes
Click the buttons at the top to switch between views:
- **Cards** 🖼️ - Interactive skill cards with circular progress
- **Chart** 📊 - Traditional horizontal bar chart
- **Radar** 🎯 - Radial visualization of skill distribution
- **Tree** 🌳 - Skills organized by proficiency level

### Category Selection
- Click any category tab to filter skills
- Smooth animation transition
- Shows category-specific statistics

### Card Interactions (Cards View)
- **Hover**: Card lifts up with glowing background
- **Icons scale**: Emoji icons become larger
- **Experience shows**: View estimated years of experience
- **Color changes**: Accent color highlights on interaction

### All Views
- **Responsive**: Works on mobile, tablet, desktop
- **Accessible**: Keyboard navigable (tab through elements)
- **Smooth**: All transitions are animated and fluid

## 📝 Adding New Skills

### 1. Open Skills Data
File: `/src/data/skills.js`

### 2. Add to Existing Category
```javascript
{
    id: "frontend",
    label: "Frontend",
    color: "#E040FB",
    skills: [
        { name: "HTML5", level: 95, icon: "html" },
        { name: "CSS3", level: 90, icon: "css" },
        // Add here:
        { name: "Vue.js", level: 75, icon: "vue" },
    ],
}
```

### 3. Or Create New Category
```javascript
{
    id: "mobile",
    label: "Mobile",
    color: "#06b6d4", // New color
    skills: [
        { name: "React Native", level: 70, icon: "react-native" },
        { name: "Flutter", level: 65, icon: "flutter" },
    ],
}
```

### 4. Parameters
- `id`: Unique identifier (lowercase, no spaces)
- `label`: Display name for category
- `color`: Hex color code for visual identity
- `skills`: Array of skill objects
  - `name`: Skill name (displayed)
  - `level`: 0-100 proficiency score
  - `icon`: Icon key (see Icon Mapping below)

## 🎨 Icon Mapping

### Supported Icons (Emoji)
```javascript
const iconMap = {
    react: "⚛",
    html: "🌐",
    css: "🎨",
    javascript: "📜",
    tailwind: "💨",
    python: "🐍",
    node: "🟢",
    git: "🔀",
    figma: "✏️",
    mongodb: "🍃",
    express: "⚙️",
    api: "🔌",
    cpp: "⚡",
    typescript: "📘",
    mysql: "🗄️",
    firebase: "🔥",
    vscode: "💻",
    database: "📊",
    brain: "🧠",
    chat: "💬",
    users: "👥",
    refresh: "🔄",
    book: "📚",
};
```

### Adding New Icons
1. Edit `/src/components/ui/InteractiveSkillCard.jsx`
2. Add to `iconMap` object:
```javascript
const iconMap = {
    // ... existing
    vue: "💚",
    flutter: "🐦",
};
```
3. Use in skills data: `{ name: "Vue.js", level: 75, icon: "vue" }`

## 🎨 Customizing Colors

### Change Category Color
File: `/src/data/skills.js`
```javascript
{
    id: "frontend",
    label: "Frontend",
    color: "#00FF00", // New color
    skills: [...]
}
```

### Add Custom Colors for New Categories
Pick from:
- Primary Blue: `#0055ff`
- Secondary Purple: `#7c3aed`
- Accent Cyan: `#06b6d4`
- Success Green: `#10b981`
- Warning Orange: `#f97316`
- Error Red: `#ef4444`

## 📊 Proficiency Levels Guide

- **90-100%**: Expert level (deep knowledge, can teach others)
- **80-89%**: Advanced (can work independently)
- **70-79%**: Intermediate (can contribute to projects)
- **60-69%**: Competent (can handle common tasks)
- **50-59%**: Familiar (basic understanding)
- **Below 50%**: Learning (active learning phase)

## 🎬 Animation Customization

### Stagger Delay
File: `/src/components/ui/InteractiveSkillCard.jsx`
```javascript
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.4, delay: index * 0.05 }} // Change 0.05
```

### Hover Animation
```javascript
whileHover={{ y: -8 }} // Change -8 to different value
```

### Animation Duration
Most animations use `duration: 0.3` to `0.5`
Increase for slower animations, decrease for snappier feel

## 🔍 Viewing Statistics

### Category Overview Cards (Bottom Section)
Shows for each category:
- Category name and icon
- Average proficiency across skills
- Preview of 4 top skills
- "+X more" indicator

Average is calculated as:
```javascript
Math.round(sum of all skill levels / number of skills)
```

## 📱 Mobile Optimization

The skills page is fully responsive:
- Cards grid adapts to screen width
- Minimum card width: 160px on mobile
- Touch-friendly buttons
- Readable text at all sizes
- All visualizations remain clear on small screens

## 🎯 Skill Tree Categories

Automatically organized into:

### Expert (80%+)
- Green (#10b981)
- "Master level" tier
- First in hierarchy

### Intermediate (60-79%)
- Orange (#f97316)
- "Working level" tier
- Middle tier

### Learning (<60%)
- Purple (#8b5cf6)
- "Growth level" tier
- Foundation skills

## 🚀 Performance Tips

1. **Keep proficiency scores realistic** (0-100, no decimals)
2. **Use consistent icon names** (defined in iconMap)
3. **Limit skills per category** (10-15 is ideal)
4. **Test on mobile** before deploying changes
5. **Use web colors** for custom category colors

## 🐛 Troubleshooting

### Icons showing as 💡
- Icon key not defined in `iconMap`
- Check spelling matches exactly
- Add to map if new skill type

### Animations feel janky
- Check if reduced motion is enabled in accessibility settings
- Test on different browsers
- Verify no CSS conflicts

### Colors not showing
- Verify hex color format (#RRGGBB)
- Check color isn't too similar to background
- Use contrast checker tool

### Grid layout broken
- Check responsive grid values in CSS
- Verify card content doesn't overflow
- Test window resize

## 📚 Component Files Reference

```
/src/pages/Skills.jsx
├─ Main page component
├─ Category selection
├─ View mode management
└─ Layout management

/src/components/ui/InteractiveSkillCard.jsx
├─ Individual skill card
├─ Circular progress SVG
├─ Hover effects
└─ Experience calculation

/src/components/ui/SkillChart.jsx
├─ Bar chart visualization
├─ Animated bars
├─ Percentage labels
└─ Staggered animations

/src/components/ui/SkillRadar.jsx
├─ Radial/spider chart
├─ Grid circles
├─ Animated polygon
└─ Data points

/src/components/ui/SkillTree.jsx
├─ Hierarchical view
├─ Tier organization
└─ Staggered animations

/src/data/skills.js
├─ Skill categories
├─ Skill data
└─ Color definitions
```

## ✨ Best Practices

1. **Update proficiency annually** as skills grow
2. **Keep descriptions concise** in category labels
3. **Use appropriate icons** that represent skills visually
4. **Organize by categories** logically
5. **Test all views** when adding skills
6. **Keep colors consistent** with portfolio theme
7. **Use realistic levels** - be honest about proficiency

## 🎓 Example: Complete Skill Addition

Adding a new skill to frontend:

```javascript
// File: /src/data/skills.js

// Step 1: Find frontend category
{
    id: "frontend",
    label: "Frontend",
    color: "#E040FB",
    skills: [
        // ... existing skills
        // Step 2: Add new skill
        { name: "Next.js", level: 85, icon: "nextjs" },
    ],
}

// Step 3: Add icon mapping
// File: /src/components/ui/InteractiveSkillCard.jsx
const iconMap = {
    // ... existing icons
    nextjs: "▲", // Next.js logo
};
```

That's it! The skill will appear in:
- Cards view as an interactive card
- Chart view as a bar
- Radar view as a data point
- Tree view in appropriate tier
- Category overview in statistics

---

**Questions?** Check the component files for inline documentation and detailed comments.
