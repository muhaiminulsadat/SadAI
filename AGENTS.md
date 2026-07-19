Always use:

- caveman ultra skill to reduce token cost.
- use graphify for token optimization.
- update the gitignore when necessary
- run 'graphify update .' after making edits to codebase to keep the graphify knowledge graph current.
- do not read the whole project in every new session; use graphify to query, locate, and read only relevant files to optimize token consumption.
- must use the emil-design-eng /deslop for better senior level code writing, and debugging skill. (always ask the user before using tools) should be understandable by junior devs also.
- write moduler code, dont dump everything in one file

## Code Quality & UI Guidelines

1. **Modular Architecture**:
   - Never dump layouts, views, or navigation side-panels into a single monolithic page component (e.g., `Home.tsx`).
   - Split views into smaller, highly focused subcomponents (e.g., `Sidebar.tsx`, `Header.tsx`, `BlankState.tsx`) nested inside domain directories.

2. **Tactile Micro-interactions**:
   - Always integrate physical press-scaling feedbacks on clickable elements (e.g., buttons, tabs, navigators) with `transition: transform 200ms cubic-bezier(0.23, 1, 0.32, 1)` and `active:scale-[0.97]` or `active:scale-[0.98]`.
   - Use custom cubic-bezier curves for transitions to make animations feel intentional and premium.

3. **Perceived Performance & Load States**:
   - Use explicit, polished spinners with dual-ring overlays (`animate-pulse` + `animate-spin` borders) and layout skeletons during session checks and asset loading to avoid layout shifts.

4. **Visual Depth & Canvas Overlays**:
   - Keep background canvases premium by using glassmorphism layouts (`bg-card/40 backdrop-blur-md`), grid overlay patterns, and radial background gradients (`bg-[radial-gradient(ellipse_...)]`) rather than solid monotone flat styles.

5. **TypeScript Safety**:
   - Ensure custom states and interfaces (`UserState`, `DashboardProps`) match external auth schemas (e.g. Better Auth) via optional properties (`email?: string`) rather than casting to `any` or defaulting to fallback string fallbacks.

6. **Avoid "AI-Generated" Aesthetics**:
   - The UI must look like it was designed by a human, not an AI. Avoid generic templates, repetitive visual elements, and unnecessary decorative clutter.
   - Use standard Shadcn components and native Tailwind utility classes instead of writing custom Tailwind configurations or specialized raw CSS classes.

7. **Important Action Notifications**:
   - Always use `react-hot-toast` to notify the user of important operational outcomes (e.g., successful login/logout, registration successes, errors, and system-level actions).
   - Ensure the `<Toaster />` provider is mounted globally at the app root level (e.g., `App.tsx`).

8. **Instant Redux State Sync**:
   - In login/register/logout handlers, explicitly dispatch `setUserData` immediately upon success rather than waiting for background hook fetches (e.g., `useSession`) to complete. This ensures immediate visual feedback and prevents layout lag.
