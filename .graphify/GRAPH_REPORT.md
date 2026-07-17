# Graph Report - .  (2026-07-17)

## Corpus Check
- Large corpus: 1025 files · ~264.044 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder, or use --no-semantic to run AST-only.

## Summary
- 1356 nodes · 3614 edges · 72 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output
- Edge kinds: ON_BRANCH: 1417 · contains: 957 · MODIFIES: 499 · PARENT_OF: 261 · imports: 243 · imports_from: 158 · calls: 42 · references: 23 · reads_from: 9 · triggers: 5


## Input Scope
- Requested: auto
- Resolved: committed (source: default-auto)
- Included files: 1025 · Candidates: 1319
- Excluded: 18 untracked · 35596 ignored · 8 sensitive · 16 missing committed
- Recommendation: Use --scope all or graphify.yaml inputs.corpus for a knowledge-base folder.

## Graph Freshness
- Built from Git commit: `a3773ee`
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
  git → git  _Bridges community 34 → community 0_
- `02d6137 fixes` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 18 → community 0_
- `1713634 fixes` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 55 → community 0_
- `1a55bd1 Fix formatting in FAQ answers` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 10 → community 0_
- `2d50590 wip: lokale wijzigingen voor pull` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 14 → community 0_

## Communities

### Community 10 - "Community 10"
Cohesion: 0.16
Nodes (18): About(), Mode, Contact(), items, FAQ(), Hero(), Nav(), addons (+10 more)

### Community 18 - "Community 18"
Cohesion: 0.12
Nodes (12): Message, ChatRow, AdminChatPanel(), 02d6137 fixes, 2189780 fixes, 5d1e827 Log server-side (SSR) crashes to site_errors too, 6da1e20 Log root error boundary crashes to site_errors for visibility, 7443b54 Fix root cause: catch Supabase Realtime WebSocket crashes (+4 more)

### Community 15 - "Community 15"
Cohesion: 0.11
Nodes (6): BerichtenTab(), usePermissions(), Route, 3901302 Fix mojibake in admin dashboard and GET-blocking rate limit bug, a903820 Fix Rules of Hooks violation crashing admin Projecten tab, f7b9fd5 Merge branch 'main' of https://github.com/MilanDijksterhuis/aimi-digital-craft

### Community 40 - "Community 40"
Cohesion: 0.27
Nodes (6): Message, ChatWidget(), DeletedChangesTab(), Route, 37c0d11 Dock tokens toegevoegd & emojis weg, 97e70ec Changes

### Community 61 - "Community 61"
Cohesion: 0.40
Nodes (2): CookiePrefs, CookieBanner()

### Community 34 - "Community 34"
Cohesion: 0.23
Nodes (7): Footer(), phases, ProcessTimeline(), Route, Route, 00e2564 voorwaaren en privacy, ecdbe8e fixes

### Community 9 - "Community 9"
Cohesion: 0.08
Nodes (16): STATUSES, Status, STATUS_LABEL, STATUS_COLOR, STATUS_DOT, ACTIVITY_LABEL, SORTS, SortKey (+8 more)

### Community 0 - "Community 0"
Cohesion: 0.08
Nodes (185): links, public.admin_notifications, 00d6931 Changes, 0193196 monitoring, 020d807 Changes, 0332090 Changes, 05a6c9e Verbeter admin changes-tab layout en voeg verwijder-knop toe; verwijder Werk uit navigatie, 0b21971 Changes weergave verbeterd (+177 more)

### Community 25 - "Community 25"
Cohesion: 0.13
Nodes (6): ContactBlock, Contacts, FormState, STEP_TITLES, fadeVariants, OnboardingWizard()

### Community 22 - "Community 22"
Cohesion: 0.12
Nodes (7): ContactBlock, Contacts, FormState, Profile, STEP_TITLES, fadeVariants, PortalOnboardingTour()

### Community 8 - "Community 8"
Cohesion: 0.08
Nodes (18): Slide, SLIDES, fadeVariants, PortalTutorial(), isCategoryFree(), priceForChange(), ALLOWED_ATTACHMENT_MIME, Route (+10 more)

### Community 20 - "Community 20"
Cohesion: 0.18
Nodes (12): TeamTab(), getEffectivePermissions(), ensurePermission(), AppRole, ROLE_LABEL, STAFF_ROLES, ALL_PERMISSION_ACTIONS, can() (+4 more)

### Community 21 - "Community 21"
Cohesion: 0.16
Nodes (9): projects, ToasterProps, Toaster(), Route, 2db539c Work in progress, 538314c Contactformulier en adminfix, 90677bf Changes, 98edc37 Changes (+1 more)

### Community 5 - "Community 5"
Cohesion: 0.07
Nodes (22): AccordionItem, AccordionTrigger, AccordionContent, alertVariants, Alert, AlertTitle, AlertDescription, Avatar (+14 more)

### Community 4 - "Community 4"
Cohesion: 0.07
Nodes (19): AlertDialogOverlay, AlertDialogContent, AlertDialogHeader(), AlertDialogFooter(), AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel (+11 more)

### Community 65 - "Community 65"
Cohesion: 0.67
Nodes (3): badgeVariants, BadgeProps, Badge()

### Community 48 - "Community 48"
Cohesion: 0.25
Nodes (5): Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage

### Community 28 - "Community 28"
Cohesion: 0.16
Nodes (6): buttonVariants, ButtonProps, Button, PaginationContent, PaginationItem, PaginationLinkProps

### Community 53 - "Community 53"
Cohesion: 0.29
Nodes (6): Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter

### Community 33 - "Community 33"
Cohesion: 0.14
Nodes (12): CarouselApi, UseCarouselParameters, CarouselOptions, CarouselPlugin, CarouselProps, CarouselContextProps, CarouselContext, Carousel (+4 more)

### Community 39 - "Community 39"
Cohesion: 0.18
Nodes (7): THEMES, ChartConfig, ChartContextProps, ChartContext, ChartContainer, ChartTooltipContent, ChartLegendContent

### Community 23 - "Community 23"
Cohesion: 0.13
Nodes (11): Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandSeparator, CommandItem, DialogOverlay (+3 more)

### Community 41 - "Community 41"
Cohesion: 0.20
Nodes (8): ContextMenuSubTrigger, ContextMenuSubContent, ContextMenuContent, ContextMenuItem, ContextMenuCheckboxItem, ContextMenuRadioItem, ContextMenuLabel, ContextMenuSeparator

### Community 49 - "Community 49"
Cohesion: 0.25
Nodes (4): DrawerOverlay, DrawerContent, DrawerTitle, DrawerDescription

### Community 42 - "Community 42"
Cohesion: 0.20
Nodes (8): DropdownMenuSubTrigger, DropdownMenuSubContent, DropdownMenuContent, DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuRadioItem, DropdownMenuLabel, DropdownMenuSeparator

### Community 30 - "Community 30"
Cohesion: 0.14
Nodes (11): FormFieldContextValue, FormFieldContext, FormItemContextValue, FormItemContext, FormItem, FormLabel, FormControl, FormDescription (+3 more)

### Community 63 - "Community 63"
Cohesion: 0.40
Nodes (4): InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator

### Community 3 - "Community 3"
Cohesion: 0.05
Nodes (37): Input, Separator, SheetOverlay, sheetVariants, SheetContentProps, SheetContent, SheetHeader(), SheetTitle (+29 more)

### Community 24 - "Community 24"
Cohesion: 0.12
Nodes (10): Menubar, MenubarTrigger, MenubarSubTrigger, MenubarSubContent, MenubarContent, MenubarItem, MenubarCheckboxItem, MenubarRadioItem (+2 more)

### Community 50 - "Community 50"
Cohesion: 0.25
Nodes (7): NavigationMenu, NavigationMenuList, navigationMenuTriggerStyle, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuViewport, NavigationMenuIndicator

### Community 51 - "Community 51"
Cohesion: 0.25
Nodes (7): SelectTrigger, SelectScrollUpButton, SelectScrollDownButton, SelectContent, SelectLabel, SelectItem, SelectSeparator

### Community 36 - "Community 36"
Cohesion: 0.18
Nodes (5): Skeleton(), STAFF_BASE_ROLES, ROLE_LABEL, Route, Section

### Community 45 - "Community 45"
Cohesion: 0.22
Nodes (8): Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption

### Community 54 - "Community 54"
Cohesion: 0.33
Nodes (5): ToggleGroupContext, ToggleGroup, ToggleGroupItem, toggleVariants, Toggle

### Community 19 - "Community 19"
Cohesion: 0.16
Nodes (9): AuthCtx, Ctx, AuthProvider(), useAuth(), supabase, Route, Route, 4b4ebd9 Catch getSession() network errors in the auth route guard (+1 more)

### Community 52 - "Community 52"
Cohesion: 0.38
Nodes (4): attachSupabaseAuth, renderErrorPage(), errorMiddleware, startInstance

### Community 27 - "Community 27"
Cohesion: 0.14
Nodes (12): requireSupabaseAuth, supabaseAdmin, Json, Database, DatabaseWithoutInternals, DefaultSchema, Tables, TablesInsert (+4 more)

### Community 13 - "Community 13"
Cohesion: 0.09
Nodes (23): ADMIN_LIKE, SUPER, getRoles(), ensureAdmin(), ensureSuper(), pingLastSeen, checkMyAccess, adminListAllAccounts (+15 more)

### Community 1 - "Community 1"
Cohesion: 0.01
Nodes (128): ADMIN_LIKE_ROLES, STAFF_ROLES_SRV, STAFF_BASE_ROLES, adminGetOverview, adminGetCustomer, adminCreateCustomerFn, adminUpdateCustomer, adminSaveOnboardingStep (+120 more)

### Community 58 - "Community 58"
Cohesion: 0.33
Nodes (6): getRoles(), ensureRoles(), ensureAdmin(), ensureSuperAdmin(), ensureStaff(), ensureLeadsAccess()

### Community 70 - "Community 70"
Cohesion: 1.00
Nodes (2): nextRecurrenceDueDate(), generateDueRecurringTaskInstances()

### Community 16 - "Community 16"
Cohesion: 0.12
Nodes (9): generateTempPassword(), adminCreateCustomer(), STAFF, genTempPw(), adminInviteStaffMember(), 7ca6d63 Changes, 8a81dd1 Fixed security issues, b29ceec Fixed weak PRNG and RLS (+1 more)

### Community 46 - "Community 46"
Cohesion: 0.25
Nodes (6): STAFF_ROLES, ADMIN_LIKE, submitContactForm, adminListContactSubmissions, adminToggleContactHandled, adminDeleteContactSubmission

### Community 38 - "Community 38"
Cohesion: 0.20
Nodes (5): escapeHtml(), transporter, sendWelcomeEmail(), a3773ee sec fixes, c27ffd9 fixes

### Community 26 - "Community 26"
Cohesion: 0.23
Nodes (13): consumeLastCapturedError(), logServerCrash(), ServerEntry, getServerEntry(), brandedErrorResponse(), isCatastrophicSsrErrorBody(), normalizeCatastrophicSsrResponse(), rateLimitedResponse() (+5 more)

### Community 17 - "Community 17"
Cohesion: 0.10
Nodes (17): LOG_LEVEL, HOURS, MONTHS, LIMIT, ADMIN_LIKE, getMonitoringLatest, getMonitoringHistory, getDailyCheckLatest (+9 more)

### Community 31 - "Community 31"
Cohesion: 0.20
Nodes (11): assertPublicHost(), isPrivateOrReservedIp(), measureResponseTime(), DayUptime, MonitoringStats, Body, cors, Route (+3 more)

### Community 12 - "Community 12"
Cohesion: 0.08
Nodes (24): getMyDashboard, updateMyProfile, portalGetOnboardingState, portalSaveOnboardingStep, portalCompleteOnboarding, portalGetTutorialState, portalCompleteTutorial, logLogin (+16 more)

### Community 6 - "Community 6"
Cohesion: 0.08
Nodes (16): PROJECT_STATUS_VALUES, ProjectStatus, PROJECT_STATUS_LABEL, PROJECT_STATUS_COLOR, PROJECT_PRIORITY_VALUES, ProjectPriority, PROJECT_PRIORITY_LABEL, PROJECT_PRIORITY_ORDER (+8 more)

### Community 32 - "Community 32"
Cohesion: 0.15
Nodes (12): checkRateLimit(), isIpBanned(), recordStrike(), getClientIp(), Body, cors, Route, Entry (+4 more)

### Community 7 - "Community 7"
Cohesion: 0.10
Nodes (13): STATUS_LABEL, STATUS_FLOW, STATUS_COLOR, PRIORITY_LABEL, PRIORITY_WEIGHT, PRIORITY_COLOR, CATEGORY_LABEL, CATEGORY_KEYS (+5 more)

### Community 2 - "Community 2"
Cohesion: 0.04
Nodes (46): TrackDotjsRoute, SitemapDotxmlRoute, PrivacybeleidRoute, LoginRoute, AlgemeneVoorwaardenRoute, AuthenticatedRoute, IndexRoute, AuthenticatedServerRoute (+38 more)

### Community 35 - "Community 35"
Cohesion: 0.18
Nodes (6): Route, accountStatus(), ACCOUNT_STATUS_LABEL, ACCOUNT_STATUS_COLOR, Section, AccountsListSection()

### Community 14 - "Community 14"
Cohesion: 0.12
Nodes (10): Route, RECURRENCE_LABEL, 2d50590 wip: lokale wijzigingen voor pull, 30d7c60 Merge project detail pages (admin + klantenportaal), 39d363a server basic, 4c90153 Merge branch 'main' of https://github.com/MilanDijksterhuis/aimi-digital-craft, 500f718 Merge branch 'main' of https://github.com/MilanDijksterhuis/aimi-digital-craft, 5fa25a3 Add project detail pages for admin and client portal (+2 more)

### Community 11 - "Community 11"
Cohesion: 0.10
Nodes (13): Route, formatUptime(), statusColor(), STATUS_DOT, HOURS_OPTIONS, LOG_LEVELS, na(), safeJsonParse() (+5 more)

### Community 64 - "Community 64"
Cohesion: 0.67
Nodes (3): timingSafeStringEqual(), isAuthorized(), Route

### Community 67 - "Community 67"
Cohesion: 0.67
Nodes (2): SitemapEntry, Route

### Community 68 - "Community 68"
Cohesion: 0.67
Nodes (2): cors, Route

### Community 44 - "Community 44"
Cohesion: 0.31
Nodes (8): site_response_times, ssl_checks, dns_checks, monitoring_alerts, role_permissions, projects, profiles, project_members

### Community 29 - "Community 29"
Cohesion: 0.24
Nodes (11): public.user_roles, auth.users, public.profiles, public.change_requests, public.extra_credits, public.notifications, public.purchase_requests, on_auth_user_created (+3 more)

### Community 37 - "Community 37"
Cohesion: 0.24
Nodes (11): public.change_attachments, public.change_requests, public.change_comments, public.customer_costs, public.onboarding_items, public.reply_snippets, on_auth_user_created, auth.users (+3 more)

### Community 71 - "Community 71"
Cohesion: 1.00
Nodes (1): public.appointments

### Community 62 - "Community 62"
Cohesion: 0.40
Nodes (4): public.client_contacts, public.login_events, public.site_pings, public.site_errors

### Community 59 - "Community 59"
Cohesion: 0.53
Nodes (5): public.chats, public.chat_messages, public.user_presence, trg_touch_chat_last_message, public.touch_chat_last_message()

### Community 60 - "Community 60"
Cohesion: 0.33
Nodes (1): public.audit_log

### Community 77 - "Community 77"
Cohesion: 1.00
Nodes (1): public.contact_submissions

### Community 66 - "Community 66"
Cohesion: 0.67
Nodes (2): public.password_reset_requests, public.extra_change_requests

### Community 43 - "Community 43"
Cohesion: 0.44
Nodes (8): public.project_tasks, public.projects, auth.users, public.project_task_time_entries, public.project_milestone_dependencies, public.project_milestones, public.project_templates, public.project_template_milestones

### Community 57 - "Community 57"
Cohesion: 0.47
Nodes (4): public.roles, public.user_custom_roles, auth.users, 81a87ed commit

### Community 56 - "Community 56"
Cohesion: 0.33
Nodes (3): 2fcc9a3 fixes, a2681a9 ewa, ee6f2e6 fixes

### Community 47 - "Community 47"
Cohesion: 0.39
Nodes (6): public.rate_limit_hits, public.rate_limit_bans, public.check_rate_limit(), v_count, public.record_strike(), v_strikes

### Community 55 - "Community 55"
Cohesion: 0.33
Nodes (6): 1713634 fixes, 6b21362 Catch login network errors instead of crashing to the error boundary, 8e663f1 fixes, b75b00d fixes, cf5e121 Catch getSession() network errors in the auth route guard, d2da4c9 Log root error boundary crashes to site_errors for visibility

## Knowledge Gaps
- **531 isolated node(s):** `Message`, `ChatRow`, `Message`, `Mode`, `CookiePrefs` (+526 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 61`** (2 nodes): `CookiePrefs`, `CookieBanner()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 70`** (2 nodes): `nextRecurrenceDueDate()`, `generateDueRecurringTaskInstances()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 67`** (2 nodes): `SitemapEntry`, `Route`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 68`** (2 nodes): `cors`, `Route`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 71`** (1 nodes): `public.appointments`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 60`** (1 nodes): `public.audit_log`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 77`** (1 nodes): `public.contact_submissions`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 66`** (2 nodes): `public.password_reset_requests`, `public.extra_change_requests`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 5` to `Community 4`, `Community 65`, `Community 48`, `Community 28`, `Community 53`, `Community 33`, `Community 39`, `Community 23`, `Community 41`, `Community 49`, `Community 42`, `Community 30`, `Community 3`, `Community 63`, `Community 24`, `Community 50`, `Community 51`, `Community 36`, `Community 45`, `Community 54`?**
  _High betweenness centrality (0.134) - this node is a cross-community bridge._
- **Why does `Skeleton()` connect `Community 36` to `Community 15`, `Community 35`, `Community 4`, `Community 7`, `Community 6`, `Community 14`, `Community 8`, `Community 3`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **Why does `requireSupabaseAuth` connect `Community 27` to `Community 13`, `Community 1`, `Community 46`, `Community 17`, `Community 12`?**
  _High betweenness centrality (0.005) - this node is a cross-community bridge._
- **What connects `Message`, `ChatRow`, `Message` to the rest of the system?**
  _531 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 18` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._
- **Should `Community 15` be split into smaller, more focused modules?**
  _Cohesion score 0.10952380952380952 - nodes in this community are weakly interconnected._
- **Should `Community 9` be split into smaller, more focused modules?**
  _Cohesion score 0.07635467980295567 - nodes in this community are weakly interconnected._