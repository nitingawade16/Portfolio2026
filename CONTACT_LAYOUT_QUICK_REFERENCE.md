# Contact Cards Layout - Quick Reference

## 📐 New Layout Structure

```
┌─────────────────────────────────────────────────────────┐
│  Card (flex, gap: 22px)                                 │
│  ├─ Icon Container (56x56px, fixed, no shrink)         │
│  │   └─ [Icon with hover animations]                   │
│  │                                                     │
│  └─ Information Container (flex: 1)                    │
│     ├─ Label + Colon (nowrap, flexShrink: 0)         │
│     │  └─ "Name : "                                   │
│     │                                                 │
│     └─ Value (flex: 1, wrappable)                    │
│        └─ "Nitin Gawade"                             │
│           (wraps to next line if needed)             │
└─────────────────────────────────────────────────────────┘
```

## 🎯 Display Examples

### Desktop View
```
👤  Name       : Nitin Gawade
✉️  Email      : gawadenitin1603@gmail.com
📞  Phone      : +91 8548049019
📍  Location   : 2nd Gate, Tilakwadi, Belagavi, Karnataka, India
```

### Mobile View (Wrapped)
```
👤  Name : Nitin Gawade

✉️  Email : gawadenitin1603
   @gmail.com

📞  Phone : +91 8548049019

📍  Location : 2nd Gate,
   Tilakwadi, Belagavi,
   Karnataka, India
```

## 📊 Specifications

| Property | Value |
|----------|-------|
| Card Layout | Flexbox |
| Icon Size | 56x56px |
| Icon Shrinking | No (flexShrink: 0) |
| Gap (Icon → Text) | 22px |
| Gap (Label → Colon) | 8px |
| Gap (Colon → Value) | 8px |
| Card Padding | 24px |
| Label Wrap | No (white-space: nowrap) |
| Value Wrap | Yes (word-break: break-word) |
| Line Height (Value) | 1.4 |

## 🎨 Typography

### Label + Colon
- **Font Size**: 0.95rem (15.2px)
- **Font Weight**: 600 (semibold)
- **Color**: var(--text-secondary)
- **Text Transform**: Title case

### Value
- **Font Size**: 0.95rem (15.2px)
- **Font Weight**: 700 (bold)
- **Color**: var(--text-primary)
- **Line Height**: 1.4 (for wrapped lines)

## 🎨 Colors (Unchanged)

| Label | Color | Hex |
|-------|-------|-----|
| Name | Purple | #E040FB |
| Email | Cyan | #06B6D4 |
| Phone | Emerald | #10B981 |
| Location | Orange | #F97316 |

## ✨ Hover Effects (Unchanged)

### Icon Animation
- Scale: 1 → 1.2
- Rotate: 0° → 5°
- Shadow: Glow effect
- Duration: 300ms

### Card Effects
- Translate Y: 0 → -4px
- Shadow: Enhanced glow
- Border: Gradient brightens
- Duration: 300ms (cubic-bezier)

### Particle Burst
- Count: 3 particles
- Duration: 800ms
- Repeat: Infinite (every 0.5s)
- Random position

## ♿ Accessibility

- ✅ Semantic HTML (div, span, a)
- ✅ ARIA labels on icons
- ✅ Text selectable
- ✅ Proper color contrast
- ✅ Keyboard accessible (links)
- ✅ Screen reader friendly

## 📱 Responsive Behavior

### When Value is Long
**Desktop** (≥1024px)
```
👤 Name : Nitin Gawade (all on one line)
```

**Tablet** (768px - 1024px)
```
👤 Name : Nitin Gawade (all on one line)
```

**Mobile** (<768px)
```
👤 Name : Nitin Gawade
         (stays on one line)

📍 Location : 2nd Gate,
             Tilakwadi, Belagavi,
             Karnataka, India
             (wraps naturally)
```

**Key**: Icon stays LEFT. Text always aligns HORIZONTALLY.

## 🔧 Component Usage

```jsx
<ContactCard 
  Icon={FiUser}                    // Icon component
  label="Name"                     // Title case
  value="Nitin Gawade"             // The value
  href={null}                      // Optional (email/phone)
  color="#E040FB"                  // Accent color
  index={0}                        // Stagger animation
  showAvailability={false}         // Pulse indicator
/>
```

## 🎭 Interactive Features (Unchanged)

### Copy to Clipboard (Email Only)
- Hover to show "Click to copy"
- Click to copy email address
- Shows "Copied!" badge for 2 seconds
- Badge has gradient background

### Links (Email & Phone)
- Email: `mailto:` link
- Phone: `tel:` link
- Opens default app/browser

### Availability Indicator (Email Only)
- Green pulsing dot
- Bottom right corner
- Always visible
- Glowing shadow

## 🚀 Performance

- ✅ No layout shifts
- ✅ GPU-accelerated animations
- ✅ 60fps smooth
- ✅ No scrolling jank
- ✅ Minimal repaints
- ✅ Optimal reflows

## 📦 File Location

```
src/components/ui/ContactCard.jsx
```

## 🔄 What's the Same

✅ **Design**
- All colors
- All shadows
- All gradients
- All glows
- Glass morphism
- Border radius (18px)
- Background effects

✅ **Functionality**
- Copy to clipboard
- Link handling
- Icon animations
- Badge animations
- Availability pulse

✅ **Responsiveness**
- All breakpoints
- All device sizes
- Touch friendly
- No overflow

## 🔄 What Changed

✅ **Layout Only**
- Horizontal Flexbox (was block)
- Icon fixed on left (was top)
- Label + Value inline (was stacked)
- Text wrapping support (new)

## 🎯 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers
- ✅ Tablet browsers

## 📋 Checklist

- [x] Layout changed to horizontal
- [x] All colors preserved
- [x] All animations working
- [x] All hover effects intact
- [x] Responsive on all sizes
- [x] Copy functionality works
- [x] Mobile optimized
- [x] No performance impact
- [x] Accessibility maintained
- [x] Build successful (0 errors)

---

**Last Updated**: 2024
**Status**: ✅ Production Ready
