# Graph Report - .  (2026-07-19)

## Corpus Check
- Large corpus: 1033 files · ~282.070 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder, or use --no-semantic to run AST-only.

## Summary
- 1402 nodes · 3755 edges · 73 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output
- Edge kinds: ON_BRANCH: 1424 · contains: 990 · MODIFIES: 546 · imports: 271 · PARENT_OF: 268 · imports_from: 173 · calls: 46 · references: 23 · reads_from: 9 · triggers: 5


## Input Scope
- Requested: auto
- Resolved: committed (source: default-auto)
- Included files: 1033 · Candidates: 1376
- Excluded: 17 untracked · 35598 ignored · 8 sensitive · 14 missing committed
- Recommendation: Use --scope all or graphify.yaml inputs.corpus for a knowledge-base folder.

## Graph Freshness
- Built from Git commit: `9a2689c`
- Compare this hash to `git rev-parse HEAD` before trusting freshness-sensitive graph output.
## God Nodes (most connected - your core abstractions)
1. `cn()` - 45 edges
2. `Skeleton()` - 13 edges
3. `supabase` - 10 edges
4. `auth.users` - 8 edges
5. `useConfirm()` - 7 edges
6. `STATUS_LABEL` - 7 edges
7. `ServerPage()` - 7 edges
8. `fetch()` - 7 edges
9. `AlertDialogContent` - 6 edges
10. `AlertDialogHeader()` - 6 edges

## Surprising Connections (you probably didn't know these)
- `02d6137 fixes` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 24 → community 0_
- `1713634 fixes` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 14 → community 0_
- `1a55bd1 Fix formatting in FAQ answers` --PARENT_OF--> `85ad012 Cinematisch redesign: forest hero, donkere panels, Cormorant Garamond`  [EXTRACTED]
  git → git  _Bridges community 0 → community 3_
- `2d50590 wip: lokale wijzigingen voor pull` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 12 → community 0_
- `2fcc9a3 fixes` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 56 → community 0_

## Communities

### Community 37 - "Community 37"
Cohesion: 0.17
Nodes (9): submitContactForm, adminListContactSubmissions, adminToggleContactHandled, adminDeleteContactSubmission, 3417a43 fixes, 74ecdc1 code fixes, 9c1fa06 perf fixes, STAFF_ROLES (+1 more)

### Community 3 - "Community 3"
Cohesion: 0.09
Nodes (30): About(), Mode, Contact(), CookiePrefs, CookieBanner(), items, FAQ(), Hero() (+22 more)

### Community 15 - "Community 15"
Cohesion: 0.10
Nodes (10): Message, ChatRow, AdminChatPanel(), 4510b3f perf fixes, 6da1e20 Log root error boundary crashes to site_errors for visibility, 7443b54 Fix root cause: catch Supabase Realtime WebSocket crashes, 7dbbf18 perf fixes, 99bd8ac Surface site_errors in the account Activiteit tab (+2 more)

### Community 35 - "Community 35"
Cohesion: 0.17
Nodes (11): BerichtenTab(), ConfirmOptions, PromptOptions, ConfirmContextValue, ConfirmContext, useConfirm(), PendingConfirm, PendingPrompt (+3 more)

### Community 24 - "Community 24"
Cohesion: 0.14
Nodes (14): Message, ChatWidget(), DeletedChangesTab(), 02d6137 fixes, 2189780 fixes, 37c0d11 Dock tokens toegevoegd & emojis weg, 5d1e827 Log server-side (SSR) crashes to site_errors too, 8e663f1 fixes (+6 more)

### Community 53 - "Community 53"
Cohesion: 0.29
Nodes (3): Footer(), Route, Route

### Community 16 - "Community 16"
Cohesion: 0.15
Nodes (12): ACTIVITY_EVENTS, IdleTimeout(), AlertDialogOverlay, AlertDialogContent, AlertDialogHeader(), AlertDialogFooter(), AlertDialogTitle, AlertDialogDescription (+4 more)

### Community 18 - "Community 18"
Cohesion: 0.10
Nodes (9): STATUSES, Status, STATUS_LABEL, STATUS_COLOR, STATUS_DOT, ACTIVITY_LABEL, SORTS, SortKey (+1 more)

### Community 25 - "Community 25"
Cohesion: 0.13
Nodes (6): ContactBlock, Contacts, FormState, STEP_TITLES, fadeVariants, OnboardingWizard()

### Community 21 - "Community 21"
Cohesion: 0.12
Nodes (7): ContactBlock, Contacts, FormState, Profile, STEP_TITLES, fadeVariants, PortalOnboardingTour()

### Community 7 - "Community 7"
Cohesion: 0.08
Nodes (19): Slide, SLIDES, fadeVariants, PortalTutorial(), useFormDraft(), isCategoryFree(), priceForChange(), ALLOWED_ATTACHMENT_MIME (+11 more)

### Community 28 - "Community 28"
Cohesion: 0.22
Nodes (10): TeamTab(), usePermissions(), getEffectivePermissions(), ensurePermission(), AppRole, ROLE_LABEL, STAFF_ROLES, ALL_PERMISSION_ACTIONS (+2 more)

### Community 6 - "Community 6"
Cohesion: 0.07
Nodes (22): AccordionItem, AccordionTrigger, AccordionContent, alertVariants, Alert, AlertTitle, AlertDescription, Avatar (+14 more)

### Community 64 - "Community 64"
Cohesion: 0.67
Nodes (3): badgeVariants, BadgeProps, Badge()

### Community 49 - "Community 49"
Cohesion: 0.25
Nodes (5): Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage

### Community 27 - "Community 27"
Cohesion: 0.16
Nodes (6): buttonVariants, ButtonProps, Button, PaginationContent, PaginationItem, PaginationLinkProps

### Community 54 - "Community 54"
Cohesion: 0.29
Nodes (6): Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter

### Community 33 - "Community 33"
Cohesion: 0.14
Nodes (12): CarouselApi, UseCarouselParameters, CarouselOptions, CarouselPlugin, CarouselProps, CarouselContextProps, CarouselContext, Carousel (+4 more)

### Community 39 - "Community 39"
Cohesion: 0.18
Nodes (7): THEMES, ChartConfig, ChartContextProps, ChartContext, ChartContainer, ChartTooltipContent, ChartLegendContent

### Community 22 - "Community 22"
Cohesion: 0.13
Nodes (11): Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandSeparator, CommandItem, DialogOverlay (+3 more)

### Community 41 - "Community 41"
Cohesion: 0.20
Nodes (8): ContextMenuSubTrigger, ContextMenuSubContent, ContextMenuContent, ContextMenuItem, ContextMenuCheckboxItem, ContextMenuRadioItem, ContextMenuLabel, ContextMenuSeparator

### Community 50 - "Community 50"
Cohesion: 0.25
Nodes (4): DrawerOverlay, DrawerContent, DrawerTitle, DrawerDescription

### Community 42 - "Community 42"
Cohesion: 0.20
Nodes (8): DropdownMenuSubTrigger, DropdownMenuSubContent, DropdownMenuContent, DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuRadioItem, DropdownMenuLabel, DropdownMenuSeparator

### Community 30 - "Community 30"
Cohesion: 0.14
Nodes (11): FormFieldContextValue, FormFieldContext, FormItemContextValue, FormItemContext, FormItem, FormLabel, FormControl, FormDescription (+3 more)

### Community 61 - "Community 61"
Cohesion: 0.40
Nodes (4): InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator

### Community 5 - "Community 5"
Cohesion: 0.05
Nodes (37): Input, Separator, SheetOverlay, sheetVariants, SheetContentProps, SheetContent, SheetHeader(), SheetTitle (+29 more)

### Community 23 - "Community 23"
Cohesion: 0.12
Nodes (10): Menubar, MenubarTrigger, MenubarSubTrigger, MenubarSubContent, MenubarContent, MenubarItem, MenubarCheckboxItem, MenubarRadioItem (+2 more)

### Community 51 - "Community 51"
Cohesion: 0.25
Nodes (7): NavigationMenu, NavigationMenuList, navigationMenuTriggerStyle, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuViewport, NavigationMenuIndicator

### Community 52 - "Community 52"
Cohesion: 0.25
Nodes (7): SelectTrigger, SelectScrollUpButton, SelectScrollDownButton, SelectContent, SelectLabel, SelectItem, SelectSeparator

### Community 8 - "Community 8"
Cohesion: 0.10
Nodes (16): Skeleton(), STATUS_LABEL, STATUS_FLOW, STATUS_COLOR, PRIORITY_LABEL, PRIORITY_WEIGHT, PRIORITY_COLOR, CATEGORY_LABEL (+8 more)

### Community 47 - "Community 47"
Cohesion: 0.22
Nodes (8): Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption

### Community 34 - "Community 34"
Cohesion: 0.19
Nodes (4): TabsList, TabsTrigger, TabsContent, Route

### Community 55 - "Community 55"
Cohesion: 0.33
Nodes (5): ToggleGroupContext, ToggleGroup, ToggleGroupItem, toggleVariants, Toggle

### Community 14 - "Community 14"
Cohesion: 0.12
Nodes (14): AuthCtx, Ctx, AuthProvider(), useAuth(), supabase, Route, Route, 1713634 fixes (+6 more)

### Community 2 - "Community 2"
Cohesion: 0.05
Nodes (39): attachSupabaseAuth, escapeHtml(), transporter, sendWelcomeEmail(), consumeLastCapturedError(), renderErrorPage(), checkRateLimit(), isIpBanned() (+31 more)

### Community 26 - "Community 26"
Cohesion: 0.14
Nodes (12): requireSupabaseAuth, supabaseAdmin, Json, Database, DatabaseWithoutInternals, DefaultSchema, Tables, TablesInsert (+4 more)

### Community 13 - "Community 13"
Cohesion: 0.09
Nodes (23): pingLastSeen, checkMyAccess, adminListAllAccounts, adminGetAccountDetail, adminChangeAccountRole, adminSetBlocked, adminSetAccountTags, adminSetAccessExpiry (+15 more)

### Community 1 - "Community 1"
Cohesion: 0.01
Nodes (136): STAFF_BASE_ROLES, adminGetOverview, adminGetCustomer, adminCreateCustomerFn, adminUpdateCustomer, adminSaveOnboardingStep, adminCompleteOnboarding, adminResetOnboarding (+128 more)

### Community 69 - "Community 69"
Cohesion: 1.00
Nodes (2): nextRecurrenceDueDate(), generateDueRecurringTaskInstances()

### Community 57 - "Community 57"
Cohesion: 0.33
Nodes (6): ensureLeadsAccess(), getRoles(), ensureRoles(), ensureAdmin(), ensureSuperAdmin(), ensureStaff()

### Community 20 - "Community 20"
Cohesion: 0.13
Nodes (7): generateTempPassword(), adminCreateCustomer(), STAFF, genTempPw(), adminInviteStaffMember(), b29ceec Fixed weak PRNG and RLS, c4498f5 Changes

### Community 43 - "Community 43"
Cohesion: 0.33
Nodes (8): getRoles(), ensureRoles(), ensureAdmin(), ensureSuperAdmin(), ensureStaff(), ADMIN_LIKE_ROLES, SUPER_ADMIN_ROLES, STAFF_GUARD_ROLES

### Community 44 - "Community 44"
Cohesion: 0.28
Nodes (7): detectDelimiter(), parseCsv(), HEADER_ALIASES, TRUE_VALUES, ParsedLead, CsvParseResult, parseLeadsCsv()

### Community 17 - "Community 17"
Cohesion: 0.10
Nodes (17): LOG_LEVEL, HOURS, MONTHS, LIMIT, getMonitoringLatest, getMonitoringHistory, getDailyCheckLatest, getMonitoringLogs (+9 more)

### Community 32 - "Community 32"
Cohesion: 0.19
Nodes (10): assertPublicHost(), isPrivateOrReservedIp(), measureResponseTime(), DayUptime, MonitoringStats, Body, cors, Route (+2 more)

### Community 11 - "Community 11"
Cohesion: 0.08
Nodes (24): getMyDashboard, updateMyProfile, portalGetOnboardingState, portalSaveOnboardingStep, portalCompleteOnboarding, portalGetTutorialState, portalCompleteTutorial, logLogin (+16 more)

### Community 9 - "Community 9"
Cohesion: 0.10
Nodes (12): PROJECT_STATUS_VALUES, ProjectStatus, PROJECT_STATUS_LABEL, PROJECT_STATUS_COLOR, PROJECT_PRIORITY_VALUES, ProjectPriority, PROJECT_PRIORITY_LABEL, PROJECT_PRIORITY_ORDER (+4 more)

### Community 4 - "Community 4"
Cohesion: 0.04
Nodes (48): TrackDotjsRoute, SitemapDotxmlRoute, PrivacybeleidRoute, LoginRoute, AlgemeneVoorwaardenRoute, AuthenticatedRoute, IndexRoute, AuthenticatedServerRoute (+40 more)

### Community 77 - "Community 77"
Cohesion: 1.00
Nodes (1): getRouter()

### Community 65 - "Community 65"
Cohesion: 0.67
Nodes (1): Route

### Community 19 - "Community 19"
Cohesion: 0.11
Nodes (5): Route, ROLE_LABEL, ONBOARDING_STATUS_LABEL, ONBOARDING_STATUS_COLOR, STAFF_BASE_ROLES

### Community 36 - "Community 36"
Cohesion: 0.18
Nodes (6): Route, accountStatus(), ACCOUNT_STATUS_LABEL, ACCOUNT_STATUS_COLOR, Section, AccountsListSection()

### Community 31 - "Community 31"
Cohesion: 0.14
Nodes (2): Route, RECURRENCE_LABEL

### Community 40 - "Community 40"
Cohesion: 0.20
Nodes (4): STAFF_BASE_ROLES, ROLE_LABEL, Route, Section

### Community 12 - "Community 12"
Cohesion: 0.12
Nodes (10): Route, 2d50590 wip: lokale wijzigingen voor pull, 30d7c60 Merge project detail pages (admin + klantenportaal), 39d363a server basic, 4c90153 Merge branch 'main' of https://github.com/MilanDijksterhuis/aimi-digital-craft, 500f718 Merge branch 'main' of https://github.com/MilanDijksterhuis/aimi-digital-craft, 5fa25a3 Add project detail pages for admin and client portal, a903820 Fix Rules of Hooks violation crashing admin Projecten tab (+2 more)

### Community 10 - "Community 10"
Cohesion: 0.10
Nodes (13): Route, formatUptime(), statusColor(), STATUS_DOT, HOURS_OPTIONS, LOG_LEVELS, na(), safeJsonParse() (+5 more)

### Community 63 - "Community 63"
Cohesion: 0.67
Nodes (3): timingSafeStringEqual(), isAuthorized(), Route

### Community 67 - "Community 67"
Cohesion: 0.67
Nodes (2): SitemapEntry, Route

### Community 68 - "Community 68"
Cohesion: 0.67
Nodes (2): cors, Route

### Community 62 - "Community 62"
Cohesion: 0.67
Nodes (3): leads, lead_activities, c480d2e leads

### Community 46 - "Community 46"
Cohesion: 0.31
Nodes (8): site_response_times, ssl_checks, dns_checks, monitoring_alerts, role_permissions, projects, profiles, project_members

### Community 29 - "Community 29"
Cohesion: 0.24
Nodes (11): public.user_roles, auth.users, public.profiles, public.change_requests, public.extra_credits, public.notifications, public.purchase_requests, on_auth_user_created (+3 more)

### Community 38 - "Community 38"
Cohesion: 0.24
Nodes (11): public.change_attachments, public.change_requests, public.change_comments, public.customer_costs, public.onboarding_items, public.reply_snippets, on_auth_user_created, auth.users (+3 more)

### Community 70 - "Community 70"
Cohesion: 1.00
Nodes (1): public.appointments

### Community 60 - "Community 60"
Cohesion: 0.40
Nodes (4): public.client_contacts, public.login_events, public.site_pings, public.site_errors

### Community 58 - "Community 58"
Cohesion: 0.53
Nodes (5): public.chats, public.chat_messages, public.user_presence, trg_touch_chat_last_message, public.touch_chat_last_message()

### Community 59 - "Community 59"
Cohesion: 0.33
Nodes (1): public.audit_log

### Community 76 - "Community 76"
Cohesion: 1.00
Nodes (1): public.contact_submissions

### Community 0 - "Community 0"
Cohesion: 0.08
Nodes (191): public.admin_notifications, 00d6931 Changes, 00e2564 voorwaaren en privacy, 0193196 monitoring, 020d807 Changes, 0332090 Changes, 05a6c9e Verbeter admin changes-tab layout en voeg verwijder-knop toe; verwijder Werk uit navigatie, 0b21971 Changes weergave verbeterd (+183 more)

### Community 66 - "Community 66"
Cohesion: 0.67
Nodes (2): public.password_reset_requests, public.extra_change_requests

### Community 48 - "Community 48"
Cohesion: 0.32
Nodes (5): public.roles, public.user_custom_roles, auth.users, 7f7208a new, 81a87ed commit

### Community 45 - "Community 45"
Cohesion: 0.44
Nodes (8): public.project_tasks, public.projects, auth.users, public.project_task_time_entries, public.project_milestone_dependencies, public.project_milestones, public.project_templates, public.project_template_milestones

### Community 56 - "Community 56"
Cohesion: 0.33
Nodes (3): 2fcc9a3 fixes, a2681a9 ewa, ee6f2e6 fixes

## Knowledge Gaps
- **549 isolated node(s):** `Message`, `ChatRow`, `Message`, `ConfirmOptions`, `PromptOptions` (+544 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 69`** (2 nodes): `nextRecurrenceDueDate()`, `generateDueRecurringTaskInstances()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 77`** (1 nodes): `getRouter()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 65`** (1 nodes): `Route`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 31`** (2 nodes): `Route`, `RECURRENCE_LABEL`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 67`** (2 nodes): `SitemapEntry`, `Route`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 68`** (2 nodes): `cors`, `Route`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 70`** (1 nodes): `public.appointments`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 59`** (1 nodes): `public.audit_log`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 76`** (1 nodes): `public.contact_submissions`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 66`** (2 nodes): `public.password_reset_requests`, `public.extra_change_requests`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 6` to `Community 35`, `Community 16`, `Community 64`, `Community 49`, `Community 27`, `Community 54`, `Community 33`, `Community 39`, `Community 22`, `Community 41`, `Community 50`, `Community 42`, `Community 30`, `Community 5`, `Community 61`, `Community 23`, `Community 51`, `Community 52`, `Community 8`, `Community 47`, `Community 34`, `Community 55`?**
  _High betweenness centrality (0.130) - this node is a cross-community bridge._
- **Why does `Skeleton()` connect `Community 8` to `Community 12`, `Community 36`, `Community 19`, `Community 34`, `Community 9`, `Community 31`, `Community 40`, `Community 16`, `Community 7`, `Community 5`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **Why does `requireSupabaseAuth` connect `Community 26` to `Community 13`, `Community 1`, `Community 37`, `Community 17`, `Community 11`?**
  _High betweenness centrality (0.003) - this node is a cross-community bridge._
- **What connects `Message`, `ChatRow`, `Message` to the rest of the system?**
  _549 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.09143686502177069 - nodes in this community are weakly interconnected._
- **Should `Community 15` be split into smaller, more focused modules?**
  _Cohesion score 0.09881422924901186 - nodes in this community are weakly interconnected._
- **Should `Community 24` be split into smaller, more focused modules?**
  _Cohesion score 0.14166666666666666 - nodes in this community are weakly interconnected._