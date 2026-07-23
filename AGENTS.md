# Agent Rules

- **Token Optimization**: Use caveman (ultra) & graphify. Avoid reading whole project; use graphify to query/locate relevant files. Update `.gitignore` as needed. Run `graphify update .` post-edits.
- **Skills**: Use emil-design-eng & deslop for clean senior-level code (ask user before using tools). Keep code junior-dev readable.
- **Structure**: Modular code. Never dump layouts/views/navigation (e.g., sidebars) into monolithic pages (e.g., `Home.tsx`). Split into smaller subcomponents (e.g., `Sidebar`, `Header`, `BlankState`) inside domain directories.

## Code Quality & UI

1. **Micro-interactions**: Scaling on press (`transition: transform 200ms cubic-bezier(0.23, 1, 0.32, 1)`, `active:scale-[0.97]` or `[0.98]`). Use custom cubic-bezier transitions.
2. **Load States**: Prevent layout shifts using spinners (dual-ring overlay: `animate-pulse` + `animate-spin` borders) and skeletons during loading/session checks.
3. **Visual Depth**: Use glassmorphism (`bg-card/40 backdrop-blur-md`), grid overlay patterns, and radial gradients (`bg-[radial-gradient(ellipse_...)]`). No flat monotone styles.
4. **TypeScript Safety**: Match custom states/interfaces (e.g., `UserState`, `DashboardProps`) with external auth schemas (e.g., Better Auth) via optional properties (`email?: string`). No `any` casting or fallback strings.
5. **Anti-AI Design & UI Components**: Always use shadcn component blocks instead of raw Tailwind CSS. Install components via CLI (e.g. `npx shadcn@latest add`) before using; do not rewrite or build custom layouts from scratch with raw Tailwind CSS.
6. **Notifications**: Use `react-hot-toast` for actions (auth, errors, etc.). Mount `<Toaster />` globally at app root (`App.tsx`).
7. **State Sync**: In login/register/logout, dispatch `setUserData` immediately on success. Do not wait for hooks (e.g., `useSession`) to resolve.
8. **API Response Format**: All HTTP responses must follow a consistent structure: `{ success: boolean, message: string, data?: any }`.
9. **Beginner Step-by-Step Learning Workflow**: Always break code implementation into small, clear steps. Explain each step simply for a beginner developer, and wait for user review & explicit approval before proceeding to the next step.
10. **Strict shadcn UI Component Usage**: Always follow `/shadcn` standards. Install primitives via CLI (e.g., `npx shadcn@latest add <component>`) and compose using official shadcn components (e.g., `ToggleGroup`, `Tooltip`, `Card`). Never write raw HTML/Tailwind loops or AI-slop patterns when shadcn UI components exist.
11. **High-Contrast Active States**: Ensure active/selected states have strong contrast and visibility (e.g., explicit `data-[state=on]:bg-primary` & `data-[state=on]:text-primary-foreground`) so active options are clearly visible in both light and dark modes.
12. **Always Use shadcn Components**: Do not create custom CSS/Tailwind components unless the component is unavailable in shadcn/ui. Always prefer official shadcn components like `ToggleGroup`, `Tooltip`, `Card`, etc. for UI elements.
