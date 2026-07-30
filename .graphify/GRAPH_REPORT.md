# Graph Report - .  (2026-07-30)

## Corpus Check
- Large corpus: 1039 files · ~285.678 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder, or use --no-semantic to run AST-only.

## Summary
- 1441 nodes · 3829 edges · 77 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output
- Edge kinds: ON_BRANCH: 1425 · contains: 1023 · MODIFIES: 555 · imports: 285 · PARENT_OF: 269 · imports_from: 180 · calls: 54 · references: 24 · reads_from: 9 · triggers: 5


## Input Scope
- Requested: auto
- Resolved: committed (source: default-auto)
- Included files: 1039 · Candidates: 1393
- Excluded: 2 untracked · 35608 ignored · 8 sensitive · 14 missing committed
- Recommendation: Use --scope all or graphify.yaml inputs.corpus for a knowledge-base folder.

## Graph Freshness
- Built from Git commit: `f958216`
- Compare this hash to `git rev-parse HEAD` before trusting freshness-sensitive graph output.
## God Nodes (most connected - your core abstractions)
1. `cn()` - 45 edges
2. `Skeleton()` - 13 edges
3. `supabase` - 10 edges
4. `useConfirm()` - 8 edges
5. `auth.users` - 8 edges
6. `usePermissions()` - 7 edges
7. `STATUS_LABEL` - 7 edges
8. `ServerPage()` - 7 edges
9. `fetch()` - 7 edges
10. `AlertDialogContent` - 6 edges

## Surprising Connections (you probably didn't know these)
- `02d6137 fixes` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 45 → community 0_
- `02d6137 fixes` --PARENT_OF--> `f2eb4fe Fix root cause: catch Supabase Realtime WebSocket crashes`  [EXTRACTED]
  git → git  _Bridges community 45 → community 38_
- `1713634 fixes` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 50 → community 0_
- `1a55bd1 Fix formatting in FAQ answers` --PARENT_OF--> `85ad012 Cinematisch redesign: forest hero, donkere panels, Cormorant Garamond`  [EXTRACTED]
  git → git  _Bridges community 0 → community 2_
- `2d50590 wip: lokale wijzigingen voor pull` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 13 → community 0_

## Communities

### Community 0 - "Community 0"
Cohesion: 0.08
Nodes (193): main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal, worktree-replicated-fluttering-whisper, 00d6931 Changes (+185 more)

### Community 1 - "Community 1"
Cohesion: 0.01
Nodes (136): ADMIN_LIKE_ROLES, adminAddCost, adminAddLeadActivity, adminAddMilestoneDependency, adminAddOnboardingItem, adminArchiveProject, adminAssignCustomRole, adminAttachmentUrl (+128 more)

### Community 2 - "Community 2"
Cohesion: 0.09
Nodes (30): 1a66af6 Verbeter layout en visueel ritme, 735e902 Verwijder alle section-label eyebrows, 85ad012 Cinematisch redesign: forest hero, donkere panels, Cormorant Garamond, 98edc37 Changes, 9a2689c code fixes, ab14295 Design overhauled, A11y-bar weg, b6f9658 Redesign: donker editorial thema, Syne font, goud accent, cdd7702 Voeg FAQ toe, Hosting Only service, geanimeerde CTA-knop (+22 more)

### Community 3 - "Community 3"
Cohesion: 0.04
Nodes (48): Route, AlgemeneVoorwaardenRoute, ApiPublicHooksExpireAccountsRoute, ApiPublicSiteErrorRoute, ApiPublicSitePingRoute, AuthenticatedAccountRoute, AuthenticatedAdminAccountsAccountIdRoute, AuthenticatedAdminAccountsRoute (+40 more)

### Community 4 - "Community 4"
Cohesion: 0.07
Nodes (23): RECURRENCE_LABEL, Route, ALL_PERMISSIONS, ROLE_LABEL, Route, ConfirmContext, ConfirmContextValue, ConfirmOptions (+15 more)

### Community 5 - "Community 5"
Cohesion: 0.05
Nodes (37): useIsMobile(), Input, Separator, SheetContent, SheetContentProps, SheetDescription, SheetHeader(), SheetOverlay (+29 more)

### Community 6 - "Community 6"
Cohesion: 0.07
Nodes (22): cn(), AccordionContent, AccordionItem, AccordionTrigger, Alert, AlertDescription, AlertTitle, alertVariants (+14 more)

### Community 7 - "Community 7"
Cohesion: 0.08
Nodes (16): Route, Section, MonitoringSection(), Route, timeAgo(), 7f7208a new, isProjectOverdue(), PROJECT_PRIORITY_COLOR (+8 more)

### Community 8 - "Community 8"
Cohesion: 0.08
Nodes (19): ALLOWED_ATTACHMENT_MIME, ChangeCard(), FILTER_LABEL, FilterKey, mapStatus(), matchesFilter(), Route, STATUS_STYLE (+11 more)

### Community 9 - "Community 9"
Cohesion: 0.10
Nodes (13): Route, Route, Section, CATEGORY_KEYS, CATEGORY_LABEL, CHANGE_TEMPLATES, PRIORITY_COLOR, PRIORITY_LABEL (+5 more)

### Community 10 - "Community 10"
Cohesion: 0.12
Nodes (23): consumeLastCapturedError(), BAN_DURATIONS_MS, BanEntry, bans, checkRateLimit(), Entry, getClientIp(), isIpBanned() (+15 more)

### Community 11 - "Community 11"
Cohesion: 0.10
Nodes (13): DISK_DAYS_OPTIONS, formatServerAge(), formatSslDate(), formatUptime(), HOURS_OPTIONS, LOG_LEVELS, na(), Route (+5 more)

### Community 12 - "Community 12"
Cohesion: 0.08
Nodes (24): cancelMyChange, getAttachmentUrl, getMyDashboard, logLogin, markAllNotificationsRead, markNotificationRead, portalCompleteOnboarding, portalCompleteTutorial (+16 more)

### Community 13 - "Community 13"
Cohesion: 0.12
Nodes (10): Route, 2d50590 wip: lokale wijzigingen voor pull, 30d7c60 Merge project detail pages (admin + klantenportaal), 39d363a server basic, 4c90153 Merge branch 'main' of https://github.com/MilanDijksterhuis/aimi-digital-craft, 500f718 Merge branch 'main' of https://github.com/MilanDijksterhuis/aimi-digital-craft, 5fa25a3 Add project detail pages for admin and client portal, a903820 Fix Rules of Hooks violation crashing admin Projecten tab (+2 more)

### Community 14 - "Community 14"
Cohesion: 0.09
Nodes (23): ADMIN_LIKE, adminArchiveChange, adminAssignChange, adminBulkArchive, adminChangeAccountRole, adminCreateTempAccount, adminGetAccountDetail, adminHardDeleteAccount (+15 more)

### Community 15 - "Community 15"
Cohesion: 0.10
Nodes (8): ONBOARDING_STATUS_COLOR, ONBOARDING_STATUS_LABEL, ROLE_LABEL, Route, STAFF_BASE_ROLES, TabsContent, TabsList, TabsTrigger

### Community 16 - "Community 16"
Cohesion: 0.10
Nodes (17): ADMIN_LIKE, getAlerts, getDailyCheckLatest, getHetznerCostsHistory, getHetznerCostsLatest, getLogsExportCsv, getMetricsCompareWeeks, getMetricsExportCsv (+9 more)

### Community 17 - "Community 17"
Cohesion: 0.16
Nodes (13): BerichtenTab(), useConfirm(), DeletedChangesTab(), TeamTab(), usePermissions(), ensurePermission(), getEffectivePermissions(), ALL_PERMISSION_ACTIONS (+5 more)

### Community 18 - "Community 18"
Cohesion: 0.15
Nodes (10): 4b4ebd9 Catch getSession() network errors in the auth route guard, 6da1e20 Log root error boundary crashes to site_errors for visibility, 7f807c8 Catch login network errors instead of crashing to the error boundary, AuthCtx, AuthProvider(), Ctx, useAuth(), Route (+2 more)

### Community 19 - "Community 19"
Cohesion: 0.11
Nodes (8): ACTIVITY_LABEL, SortKey, SORTS, Status, STATUS_COLOR, STATUS_DOT, STATUS_LABEL, STATUSES

### Community 20 - "Community 20"
Cohesion: 0.13
Nodes (7): b29ceec Fixed weak PRNG and RLS, c4498f5 Changes, adminCreateCustomer(), adminInviteStaffMember(), generateTempPassword(), genTempPw(), STAFF

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
Cohesion: 0.18
Nodes (10): addDays(), CallbackAgenda(), CallbackItem(), fmtDayLabel(), fmtTime(), isToday(), sameDay(), startOfDay() (+2 more)

### Community 25 - "Community 25"
Cohesion: 0.13
Nodes (6): ContactBlock, Contacts, fadeVariants, FormState, OnboardingWizard(), STEP_TITLES

### Community 26 - "Community 26"
Cohesion: 0.14
Nodes (12): requireSupabaseAuth, supabaseAdmin, CompositeTypes, Constants, Database, DatabaseWithoutInternals, DefaultSchema, Enums (+4 more)

### Community 27 - "Community 27"
Cohesion: 0.16
Nodes (6): Button, ButtonProps, buttonVariants, PaginationContent, PaginationItem, PaginationLinkProps

### Community 28 - "Community 28"
Cohesion: 0.24
Nodes (11): auth.users, change_requests_touch, on_auth_user_created, profiles_touch, public.change_requests, public.extra_credits, public.handle_new_user(), public.notifications (+3 more)

### Community 29 - "Community 29"
Cohesion: 0.14
Nodes (11): FormControl, FormDescription, FormFieldContext, FormFieldContextValue, FormItem, FormItemContext, FormItemContextValue, FormLabel (+3 more)

### Community 30 - "Community 30"
Cohesion: 0.19
Nodes (10): 9be6953 bug fixes, eccff4f bug fixes 2, assertPublicHost(), DayUptime, isPrivateOrReservedIp(), measureResponseTime(), MonitoringStats, Body (+2 more)

### Community 31 - "Community 31"
Cohesion: 0.15
Nodes (7): a3773ee sec fixes, escapeHtml(), sendWelcomeEmail(), transporter, Body, cors, Route

### Community 32 - "Community 32"
Cohesion: 0.14
Nodes (12): Carousel, CarouselApi, CarouselContent, CarouselContext, CarouselContextProps, CarouselItem, CarouselNext, CarouselOptions (+4 more)

### Community 33 - "Community 33"
Cohesion: 0.19
Nodes (10): c480d2e leads, CsvParseResult, detectDelimiter(), HEADER_ALIASES, parseCsv(), ParsedLead, parseLeadsCsv(), TRUE_VALUES (+2 more)

### Community 34 - "Community 34"
Cohesion: 0.19
Nodes (10): CallbackScheduleForm(), CallbackScheduleValue, AGENDA_COLOR_CLASSES, AgendaColor, CALLBACK_OUTCOMES, CALLBACK_REASONS, CALLBACK_STATUS_LABEL, CallbackStatus (+2 more)

### Community 35 - "Community 35"
Cohesion: 0.18
Nodes (6): ACCOUNT_STATUS_COLOR, ACCOUNT_STATUS_LABEL, AccountsListSection(), accountStatus(), Route, Section

### Community 36 - "Community 36"
Cohesion: 0.18
Nodes (5): ROLE_LABEL, Route, Section, STAFF_BASE_ROLES, Skeleton()

### Community 37 - "Community 37"
Cohesion: 0.17
Nodes (9): 3417a43 fixes, 74ecdc1 code fixes, 9c1fa06 perf fixes, ADMIN_LIKE, adminDeleteContactSubmission, adminListContactSubmissions, adminToggleContactHandled, STAFF_ROLES (+1 more)

### Community 38 - "Community 38"
Cohesion: 0.18
Nodes (10): 7443b54 Fix root cause: catch Supabase Realtime WebSocket crashes, 99bd8ac Surface site_errors in the account Activiteit tab, c27ffd9 fixes, dbd0657 Log server-side (SSR) crashes to site_errors too, f2eb4fe Fix root cause: catch Supabase Realtime WebSocket crashes, AdminChatPanel(), ChatRow, Message (+2 more)

### Community 39 - "Community 39"
Cohesion: 0.24
Nodes (11): auth.users, on_auth_user_created, public.change_attachments, public.change_comments, public.change_requests, public.customer_costs, public.handle_new_user(), public.onboarding_items (+3 more)

### Community 40 - "Community 40"
Cohesion: 0.18
Nodes (7): ChartConfig, ChartContainer, ChartContext, ChartContextProps, ChartLegendContent, ChartTooltipContent, THEMES

### Community 41 - "Community 41"
Cohesion: 0.22
Nodes (7): Route, SectionKey, SECTIONS, f958216 leads functions, LeadsPanel(), lead_callbacks, leads

### Community 42 - "Community 42"
Cohesion: 0.24
Nodes (3): 4510b3f perf fixes, 7dbbf18 perf fixes, 9d0b477 perf fixes

### Community 43 - "Community 43"
Cohesion: 0.20
Nodes (8): ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuSubContent, ContextMenuSubTrigger

### Community 44 - "Community 44"
Cohesion: 0.20
Nodes (8): DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuSubContent, DropdownMenuSubTrigger

### Community 45 - "Community 45"
Cohesion: 0.22
Nodes (4): 02d6137 fixes, 2189780 fixes, 5d1e827 Log server-side (SSR) crashes to site_errors too, bbc9d80 Surface site_errors in the account Activiteit tab

### Community 46 - "Community 46"
Cohesion: 0.33
Nodes (8): ensureAdmin(), ensureRoles(), ensureStaff(), ensureSuperAdmin(), getRoles(), ADMIN_LIKE_ROLES, STAFF_GUARD_ROLES, SUPER_ADMIN_ROLES

### Community 47 - "Community 47"
Cohesion: 0.44
Nodes (8): auth.users, public.project_milestone_dependencies, public.project_milestones, public.project_task_time_entries, public.project_tasks, public.project_template_milestones, public.project_templates, public.projects

### Community 48 - "Community 48"
Cohesion: 0.31
Nodes (8): dns_checks, monitoring_alerts, profiles, project_members, projects, role_permissions, site_response_times, ssl_checks

### Community 49 - "Community 49"
Cohesion: 0.22
Nodes (8): Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow

### Community 50 - "Community 50"
Cohesion: 0.25
Nodes (8): 1713634 fixes, 3901302 Fix mojibake in admin dashboard and GET-blocking rate limit bug, 6b21362 Catch login network errors instead of crashing to the error boundary, 8e663f1 fixes, b75b00d fixes, cf5e121 Catch getSession() network errors in the auth route guard, d2da4c9 Log root error boundary crashes to site_errors for visibility, f7b9fd5 Merge branch 'main' of https://github.com/MilanDijksterhuis/aimi-digital-craft

### Community 51 - "Community 51"
Cohesion: 0.39
Nodes (6): public.check_rate_limit(), public.rate_limit_bans, public.rate_limit_hits, public.record_strike(), v_count, v_strikes

### Community 52 - "Community 52"
Cohesion: 0.25
Nodes (5): Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage

### Community 53 - "Community 53"
Cohesion: 0.25
Nodes (4): DrawerContent, DrawerDescription, DrawerOverlay, DrawerTitle

### Community 54 - "Community 54"
Cohesion: 0.25
Nodes (7): NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle, NavigationMenuViewport

### Community 55 - "Community 55"
Cohesion: 0.25
Nodes (7): SelectContent, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger

### Community 56 - "Community 56"
Cohesion: 0.29
Nodes (3): Footer(), Route, Route

### Community 57 - "Community 57"
Cohesion: 0.38
Nodes (4): renderErrorPage(), errorMiddleware, startInstance, attachSupabaseAuth

### Community 58 - "Community 58"
Cohesion: 0.29
Nodes (6): Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle

### Community 59 - "Community 59"
Cohesion: 0.33
Nodes (5): ToggleGroup, ToggleGroupContext, ToggleGroupItem, Toggle, toggleVariants

### Community 60 - "Community 60"
Cohesion: 0.33
Nodes (3): 2fcc9a3 fixes, a2681a9 ewa, ee6f2e6 fixes

### Community 61 - "Community 61"
Cohesion: 0.47
Nodes (4): 81a87ed commit, auth.users, public.roles, public.user_custom_roles

### Community 62 - "Community 62"
Cohesion: 0.33
Nodes (6): ensureAdmin(), ensureLeadsAccess(), ensureRoles(), ensureStaff(), ensureSuperAdmin(), getRoles()

### Community 63 - "Community 63"
Cohesion: 0.53
Nodes (5): public.chat_messages, public.chats, public.touch_chat_last_message(), public.user_presence, trg_touch_chat_last_message

### Community 64 - "Community 64"
Cohesion: 0.33
Nodes (1): public.audit_log

### Community 65 - "Community 65"
Cohesion: 0.40
Nodes (4): public.client_contacts, public.login_events, public.site_errors, public.site_pings

### Community 66 - "Community 66"
Cohesion: 0.40
Nodes (4): InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot

### Community 67 - "Community 67"
Cohesion: 0.67
Nodes (3): isAuthorized(), Route, timingSafeStringEqual()

### Community 68 - "Community 68"
Cohesion: 0.67
Nodes (3): Badge(), BadgeProps, badgeVariants

### Community 69 - "Community 69"
Cohesion: 0.67
Nodes (1): Route

### Community 70 - "Community 70"
Cohesion: 0.67
Nodes (2): public.extra_change_requests, public.password_reset_requests

### Community 71 - "Community 71"
Cohesion: 0.67
Nodes (2): Route, SitemapEntry

### Community 72 - "Community 72"
Cohesion: 0.67
Nodes (2): cors, Route

### Community 73 - "Community 73"
Cohesion: 1.00
Nodes (2): generateDueRecurringTaskInstances(), nextRecurrenceDueDate()

### Community 74 - "Community 74"
Cohesion: 1.00
Nodes (1): public.appointments

### Community 80 - "Community 80"
Cohesion: 1.00
Nodes (1): public.contact_submissions

### Community 81 - "Community 81"
Cohesion: 1.00
Nodes (1): getRouter()

## Knowledge Gaps
- **554 isolated node(s):** `Message`, `ChatRow`, `ViewMode`, `CallbackScheduleValue`, `Message` (+549 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 64`** (1 nodes): `public.audit_log`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 69`** (1 nodes): `Route`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 70`** (2 nodes): `public.extra_change_requests`, `public.password_reset_requests`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 71`** (2 nodes): `Route`, `SitemapEntry`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 72`** (2 nodes): `cors`, `Route`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 73`** (2 nodes): `generateDueRecurringTaskInstances()`, `nextRecurrenceDueDate()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 74`** (1 nodes): `public.appointments`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 80`** (1 nodes): `public.contact_submissions`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 81`** (1 nodes): `getRouter()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 6` to `Community 4`, `Community 68`, `Community 52`, `Community 27`, `Community 58`, `Community 32`, `Community 40`, `Community 22`, `Community 43`, `Community 53`, `Community 44`, `Community 29`, `Community 5`, `Community 66`, `Community 23`, `Community 54`, `Community 55`, `Community 36`, `Community 49`, `Community 15`, `Community 59`?**
  _High betweenness centrality (0.127) - this node is a cross-community bridge._
- **Why does `Skeleton()` connect `Community 36` to `Community 13`, `Community 35`, `Community 15`, `Community 9`, `Community 7`, `Community 4`, `Community 8`, `Community 5`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **Why does `requireSupabaseAuth` connect `Community 26` to `Community 14`, `Community 1`, `Community 37`, `Community 16`, `Community 12`?**
  _High betweenness centrality (0.003) - this node is a cross-community bridge._
- **What connects `Message`, `ChatRow`, `ViewMode` to the rest of the system?**
  _554 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.07593703532789828 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.014084507042253521 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.09143686502177069 - nodes in this community are weakly interconnected._