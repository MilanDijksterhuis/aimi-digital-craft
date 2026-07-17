# Graph Report - .  (2026-07-17)

## Corpus Check
- Large corpus: 1019 files · ~374.294 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder, or use --no-semantic to run AST-only.

## Summary
- 1339 nodes · 3575 edges · 66 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output
- Edge kinds: ON_BRANCH: 1416 · contains: 946 · MODIFIES: 482 · PARENT_OF: 260 · imports: 240 · imports_from: 157 · calls: 41 · references: 23 · reads_from: 5 · triggers: 5


## Input Scope
- Requested: auto
- Resolved: committed (source: default-auto)
- Included files: 1019 · Candidates: 1281
- Excluded: 35 untracked · 35596 ignored · 8 sensitive · 14 missing committed
- Recommendation: Use --scope all or graphify.yaml inputs.corpus for a knowledge-base folder.

## Graph Freshness
- Built from Git commit: `c27ffd9`
- Compare this hash to `git rev-parse HEAD` before trusting freshness-sensitive graph output.
## God Nodes (most connected - your core abstractions)
1. `cn()` - 44 edges
2. `Skeleton()` - 13 edges
3. `supabase` - 10 edges
4. `auth.users` - 8 edges
5. `STATUS_LABEL` - 7 edges
6. `ServerPage()` - 7 edges
7. `fetch()` - 7 edges
8. `TabsList` - 6 edges
9. `TabsTrigger` - 6 edges
10. `TabsContent` - 6 edges

## Surprising Connections (you probably didn't know these)
- `00e2564 voorwaaren en privacy` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 36 → community 0_
- `02d6137 fixes` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 18 → community 0_
- `1713634 fixes` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 40 → community 0_
- `1a55bd1 Fix formatting in FAQ answers` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 3 → community 0_
- `2d50590 wip: lokale wijzigingen voor pull` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 54 → community 0_

## Communities

### Community 0 - "Community 0"
Cohesion: 0.08
Nodes (187): main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal, worktree-replicated-fluttering-whisper, 00d6931 Changes (+179 more)

### Community 1 - "Community 1"
Cohesion: 0.01
Nodes (128): ADMIN_LIKE_ROLES, adminAddCost, adminAddLeadActivity, adminAddMilestoneDependency, adminAddOnboardingItem, adminArchiveProject, adminAssignCustomRole, adminAttachmentUrl (+120 more)

### Community 2 - "Community 2"
Cohesion: 0.06
Nodes (21): ONBOARDING_STATUS_COLOR, ONBOARDING_STATUS_LABEL, ROLE_LABEL, Route, STAFF_BASE_ROLES, RECURRENCE_LABEL, Route, ALL_PERMISSIONS (+13 more)

### Community 3 - "Community 3"
Cohesion: 0.08
Nodes (32): 1a55bd1 Fix formatting in FAQ answers, 1a66af6 Verbeter layout en visueel ritme, 2db539c Work in progress, 538314c Contactformulier en adminfix, 735e902 Verwijder alle section-label eyebrows, 85ad012 Cinematisch redesign: forest hero, donkere panels, Cormorant Garamond, 90677bf Changes, 98edc37 Changes (+24 more)

### Community 4 - "Community 4"
Cohesion: 0.04
Nodes (46): getRouter(), AlgemeneVoorwaardenRoute, ApiPublicHooksExpireAccountsRoute, ApiPublicSiteErrorRoute, ApiPublicSitePingRoute, AuthenticatedAccountRoute, AuthenticatedAdminAccountsAccountIdRoute, AuthenticatedAdminAccountsRoute (+38 more)

### Community 5 - "Community 5"
Cohesion: 0.05
Nodes (37): useIsMobile(), Input, Separator, SheetContent, SheetContentProps, SheetDescription, SheetHeader(), SheetOverlay (+29 more)

### Community 6 - "Community 6"
Cohesion: 0.06
Nodes (35): 9be6953 bug fixes, abdbfe4 bug fixes 2, eccff4f bug fixes 2, assertPublicHost(), DayUptime, isPrivateOrReservedIp(), measureResponseTime(), MonitoringStats (+27 more)

### Community 7 - "Community 7"
Cohesion: 0.07
Nodes (23): Route, ALLOWED_ATTACHMENT_MIME, ChangeCard(), FILTER_LABEL, FilterKey, mapStatus(), matchesFilter(), Route (+15 more)

### Community 8 - "Community 8"
Cohesion: 0.07
Nodes (22): cn(), AccordionContent, AccordionItem, AccordionTrigger, Alert, AlertDescription, AlertTitle, alertVariants (+14 more)

### Community 9 - "Community 9"
Cohesion: 0.08
Nodes (15): Route, Section, MonitoringSection(), Route, timeAgo(), isProjectOverdue(), PROJECT_PRIORITY_COLOR, PROJECT_PRIORITY_LABEL (+7 more)

### Community 10 - "Community 10"
Cohesion: 0.09
Nodes (14): Route, Route, Section, CATEGORY_KEYS, CATEGORY_LABEL, CHANGE_TEMPLATES, isCategoryFree(), priceForChange() (+6 more)

### Community 11 - "Community 11"
Cohesion: 0.08
Nodes (16): ACTIVITY_LABEL, LeadsPanel(), SortKey, SORTS, Status, STATUS_COLOR, STATUS_DOT, STATUS_LABEL (+8 more)

### Community 12 - "Community 12"
Cohesion: 0.10
Nodes (13): DISK_DAYS_OPTIONS, formatServerAge(), formatSslDate(), formatUptime(), HOURS_OPTIONS, LOG_LEVELS, na(), Route (+5 more)

### Community 13 - "Community 13"
Cohesion: 0.13
Nodes (22): consumeLastCapturedError(), BAN_DURATIONS_MS, BanEntry, bans, checkRateLimit(), Entry, getClientIp(), isIpBanned() (+14 more)

### Community 14 - "Community 14"
Cohesion: 0.09
Nodes (23): ADMIN_LIKE, adminArchiveChange, adminAssignChange, adminBulkArchive, adminChangeAccountRole, adminCreateTempAccount, adminGetAccountDetail, adminHardDeleteAccount (+15 more)

### Community 15 - "Community 15"
Cohesion: 0.12
Nodes (9): Route, 30d7c60 Merge project detail pages (admin + klantenportaal), 39d363a server basic, 4c90153 Merge branch 'main' of https://github.com/MilanDijksterhuis/aimi-digital-craft, 500f718 Merge branch 'main' of https://github.com/MilanDijksterhuis/aimi-digital-craft, 5fa25a3 Add project detail pages for admin and client portal, a903820 Fix Rules of Hooks violation crashing admin Projecten tab, c7e76b2 Revert "Merge project detail pages (admin + klantenportaal)" (+1 more)

### Community 16 - "Community 16"
Cohesion: 0.10
Nodes (17): ADMIN_LIKE, getAlerts, getDailyCheckLatest, getHetznerCostsHistory, getHetznerCostsLatest, getLogsExportCsv, getMetricsCompareWeeks, getMetricsExportCsv (+9 more)

### Community 17 - "Community 17"
Cohesion: 0.15
Nodes (10): 4b4ebd9 Catch getSession() network errors in the auth route guard, 6da1e20 Log root error boundary crashes to site_errors for visibility, 7f807c8 Catch login network errors instead of crashing to the error boundary, AuthCtx, AuthProvider(), Ctx, useAuth(), Route (+2 more)

### Community 18 - "Community 18"
Cohesion: 0.12
Nodes (12): 02d6137 fixes, 2189780 fixes, 5d1e827 Log server-side (SSR) crashes to site_errors too, 7443b54 Fix root cause: catch Supabase Realtime WebSocket crashes, 99bd8ac Surface site_errors in the account Activiteit tab, bbc9d80 Surface site_errors in the account Activiteit tab, c27ffd9 fixes, dbd0657 Log server-side (SSR) crashes to site_errors too (+4 more)

### Community 19 - "Community 19"
Cohesion: 0.13
Nodes (7): b29ceec Fixed weak PRNG and RLS, c4498f5 Changes, adminCreateCustomer(), adminInviteStaffMember(), generateTempPassword(), genTempPw(), STAFF

### Community 20 - "Community 20"
Cohesion: 0.16
Nodes (12): c480d2e leads, BerichtenTab(), TeamTab(), usePermissions(), ALL_PERMISSION_ACTIONS, AppRole, can(), PermissionAction (+4 more)

### Community 21 - "Community 21"
Cohesion: 0.12
Nodes (7): ContactBlock, Contacts, fadeVariants, FormState, PortalOnboardingTour(), Profile, STEP_TITLES

### Community 22 - "Community 22"
Cohesion: 0.13
Nodes (11): Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, DialogContent (+3 more)

### Community 23 - "Community 23"
Cohesion: 0.12
Nodes (10): Menubar, MenubarCheckboxItem, MenubarContent, MenubarItem, MenubarLabel, MenubarRadioItem, MenubarSeparator, MenubarSubContent (+2 more)

### Community 24 - "Community 24"
Cohesion: 0.13
Nodes (6): ContactBlock, Contacts, fadeVariants, FormState, OnboardingWizard(), STEP_TITLES

### Community 25 - "Community 25"
Cohesion: 0.14
Nodes (12): requireSupabaseAuth, supabaseAdmin, CompositeTypes, Constants, Database, DatabaseWithoutInternals, DefaultSchema, Enums (+4 more)

### Community 26 - "Community 26"
Cohesion: 0.16
Nodes (6): Button, ButtonProps, buttonVariants, PaginationContent, PaginationItem, PaginationLinkProps

### Community 27 - "Community 27"
Cohesion: 0.24
Nodes (11): auth.users, change_requests_touch, on_auth_user_created, profiles_touch, public.change_requests, public.extra_credits, public.handle_new_user(), public.notifications (+3 more)

### Community 28 - "Community 28"
Cohesion: 0.14
Nodes (11): FormControl, FormDescription, FormFieldContext, FormFieldContextValue, FormItem, FormItemContext, FormItemContextValue, FormLabel (+3 more)

### Community 29 - "Community 29"
Cohesion: 0.14
Nodes (12): Carousel, CarouselApi, CarouselContent, CarouselContext, CarouselContextProps, CarouselItem, CarouselNext, CarouselOptions (+4 more)

### Community 30 - "Community 30"
Cohesion: 0.18
Nodes (6): ACCOUNT_STATUS_COLOR, ACCOUNT_STATUS_LABEL, AccountsListSection(), accountStatus(), Route, Section

### Community 31 - "Community 31"
Cohesion: 0.18
Nodes (5): ROLE_LABEL, Route, Section, STAFF_BASE_ROLES, Skeleton()

### Community 32 - "Community 32"
Cohesion: 0.24
Nodes (11): auth.users, on_auth_user_created, public.change_attachments, public.change_comments, public.change_requests, public.customer_costs, public.handle_new_user(), public.onboarding_items (+3 more)

### Community 33 - "Community 33"
Cohesion: 0.18
Nodes (7): ChartConfig, ChartContainer, ChartContext, ChartContextProps, ChartLegendContent, ChartTooltipContent, THEMES

### Community 34 - "Community 34"
Cohesion: 0.20
Nodes (8): ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuSubContent, ContextMenuSubTrigger

### Community 35 - "Community 35"
Cohesion: 0.20
Nodes (8): DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuSubContent, DropdownMenuSubTrigger

### Community 36 - "Community 36"
Cohesion: 0.33
Nodes (4): 00e2564 voorwaaren en privacy, Footer(), Route, Route

### Community 37 - "Community 37"
Cohesion: 0.44
Nodes (8): auth.users, public.project_milestone_dependencies, public.project_milestones, public.project_task_time_entries, public.project_tasks, public.project_template_milestones, public.project_templates, public.projects

### Community 38 - "Community 38"
Cohesion: 0.31
Nodes (8): dns_checks, monitoring_alerts, profiles, project_members, projects, role_permissions, site_response_times, ssl_checks

### Community 39 - "Community 39"
Cohesion: 0.22
Nodes (8): Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow

### Community 40 - "Community 40"
Cohesion: 0.25
Nodes (8): 1713634 fixes, 3901302 Fix mojibake in admin dashboard and GET-blocking rate limit bug, 6b21362 Catch login network errors instead of crashing to the error boundary, 8e663f1 fixes, b75b00d fixes, cf5e121 Catch getSession() network errors in the auth route guard, d2da4c9 Log root error boundary crashes to site_errors for visibility, f7b9fd5 Merge branch 'main' of https://github.com/MilanDijksterhuis/aimi-digital-craft

### Community 41 - "Community 41"
Cohesion: 0.32
Nodes (5): 7f7208a new, 81a87ed commit, auth.users, public.roles, public.user_custom_roles

### Community 42 - "Community 42"
Cohesion: 0.25
Nodes (6): ADMIN_LIKE, adminDeleteContactSubmission, adminListContactSubmissions, adminToggleContactHandled, STAFF_ROLES, submitContactForm

### Community 43 - "Community 43"
Cohesion: 0.25
Nodes (5): Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage

### Community 44 - "Community 44"
Cohesion: 0.25
Nodes (4): DrawerContent, DrawerDescription, DrawerOverlay, DrawerTitle

### Community 45 - "Community 45"
Cohesion: 0.25
Nodes (7): NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle, NavigationMenuViewport

### Community 46 - "Community 46"
Cohesion: 0.25
Nodes (7): SelectContent, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger

### Community 47 - "Community 47"
Cohesion: 0.38
Nodes (4): renderErrorPage(), errorMiddleware, startInstance, attachSupabaseAuth

### Community 48 - "Community 48"
Cohesion: 0.29
Nodes (6): Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle

### Community 49 - "Community 49"
Cohesion: 0.33
Nodes (5): ToggleGroup, ToggleGroupContext, ToggleGroupItem, Toggle, toggleVariants

### Community 50 - "Community 50"
Cohesion: 0.33
Nodes (3): 2fcc9a3 fixes, a2681a9 ewa, ee6f2e6 fixes

### Community 51 - "Community 51"
Cohesion: 0.33
Nodes (6): ensureAdmin(), ensureLeadsAccess(), ensureRoles(), ensureStaff(), ensureSuperAdmin(), getRoles()

### Community 52 - "Community 52"
Cohesion: 0.53
Nodes (5): public.chat_messages, public.chats, public.touch_chat_last_message(), public.user_presence, trg_touch_chat_last_message

### Community 53 - "Community 53"
Cohesion: 0.33
Nodes (1): public.audit_log

### Community 54 - "Community 54"
Cohesion: 0.50
Nodes (4): 2d50590 wip: lokale wijzigingen voor pull, isAuthorized(), Route, timingSafeStringEqual()

### Community 55 - "Community 55"
Cohesion: 0.40
Nodes (4): public.client_contacts, public.login_events, public.site_errors, public.site_pings

### Community 56 - "Community 56"
Cohesion: 0.40
Nodes (4): InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot

### Community 57 - "Community 57"
Cohesion: 0.67
Nodes (3): escapeHtml(), sendWelcomeEmail(), transporter

### Community 58 - "Community 58"
Cohesion: 0.50
Nodes (3): Body, cors, Route

### Community 59 - "Community 59"
Cohesion: 0.67
Nodes (3): Badge(), BadgeProps, badgeVariants

### Community 60 - "Community 60"
Cohesion: 0.67
Nodes (2): public.extra_change_requests, public.password_reset_requests

### Community 61 - "Community 61"
Cohesion: 0.67
Nodes (2): Route, SitemapEntry

### Community 62 - "Community 62"
Cohesion: 0.67
Nodes (2): cors, Route

### Community 64 - "Community 64"
Cohesion: 1.00
Nodes (2): generateDueRecurringTaskInstances(), nextRecurrenceDueDate()

### Community 65 - "Community 65"
Cohesion: 1.00
Nodes (1): public.appointments

### Community 71 - "Community 71"
Cohesion: 1.00
Nodes (1): public.contact_submissions

## Knowledge Gaps
- **532 isolated node(s):** `Message`, `ChatRow`, `Message`, `Mode`, `CookiePrefs` (+527 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 53`** (1 nodes): `public.audit_log`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 60`** (2 nodes): `public.extra_change_requests`, `public.password_reset_requests`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 61`** (2 nodes): `Route`, `SitemapEntry`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 62`** (2 nodes): `cors`, `Route`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 64`** (2 nodes): `generateDueRecurringTaskInstances()`, `nextRecurrenceDueDate()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 65`** (1 nodes): `public.appointments`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 71`** (1 nodes): `public.contact_submissions`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 8` to `Community 2`, `Community 59`, `Community 43`, `Community 26`, `Community 48`, `Community 29`, `Community 33`, `Community 22`, `Community 34`, `Community 44`, `Community 35`, `Community 28`, `Community 5`, `Community 56`, `Community 23`, `Community 45`, `Community 46`, `Community 31`, `Community 39`, `Community 49`?**
  _High betweenness centrality (0.136) - this node is a cross-community bridge._
- **Why does `Skeleton()` connect `Community 31` to `Community 15`, `Community 30`, `Community 2`, `Community 10`, `Community 9`, `Community 7`, `Community 5`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **Why does `requireSupabaseAuth` connect `Community 25` to `Community 14`, `Community 1`, `Community 42`, `Community 16`, `Community 6`?**
  _High betweenness centrality (0.009) - this node is a cross-community bridge._
- **What connects `Message`, `ChatRow`, `Message` to the rest of the system?**
  _532 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.07734629560386731 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.014925373134328358 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.057912457912457915 - nodes in this community are weakly interconnected._