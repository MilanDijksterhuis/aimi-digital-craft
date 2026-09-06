# Graph Report - .  (2026-09-04)

## Corpus Check
- Large corpus: 1171 files · ~521.916 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder, or use --no-semantic to run AST-only.

## Summary
- 1943 nodes · 5458 edges · 86 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output
- Edge kinds: ON_BRANCH: 1651 · contains: 1430 · MODIFIES: 872 · imports: 630 · imports_from: 387 · PARENT_OF: 295 · calls: 150 · references: 28 · reads_from: 9 · triggers: 5 · method: 1


## Input Scope
- Requested: auto
- Resolved: committed (source: default-auto)
- Included files: 1171 · Candidates: 1735
- Excluded: 6 untracked · 37043 ignored · 8 sensitive · 10 missing committed
- Recommendation: Use --scope all or graphify.yaml inputs.corpus for a knowledge-base folder.

## Graph Freshness
- Built from Git commit: `aabf034`
- Compare this hash to `git rev-parse HEAD` before trusting freshness-sensitive graph output.
## God Nodes (most connected - your core abstractions)
1. `breadcrumbJsonLd()` - 47 edges
2. `cn()` - 45 edges
3. `faqJsonLd()` - 41 edges
4. `serviceJsonLd()` - 38 edges
5. `Footer()` - 20 edges
6. `CookieBanner()` - 18 edges
7. `Nav()` - 18 edges
8. `BranchPageData` - 16 edges
9. `BranchPage()` - 16 edges
10. `LocationPageData` - 16 edges

## Surprising Connections (you probably didn't know these)
- `02d6137 fixes` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 57 → community 0_
- `032ba88 SEO` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 3 → community 0_
- `04564c5 fixes` --PARENT_OF--> `36d8ccb new pages`  [EXTRACTED]
  git → git  _Bridges community 3 → community 5_
- `1713634 fixes` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 48 → community 0_
- `23bb181 sec` --PARENT_OF--> `ecdbe8e fixes`  [EXTRACTED]
  git → git  _Bridges community 0 → community 4_

## Communities

### Community 0 - "Community 0"
Cohesion: 0.07
Nodes (212): main, seo-verbetering, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal, worktree-replicated-fluttering-whisper (+204 more)

### Community 1 - "Community 1"
Cohesion: 0.01
Nodes (136): ADMIN_LIKE_ROLES, adminAddCost, adminAddLeadActivity, adminAddMilestoneDependency, adminAddOnboardingItem, adminArchiveProject, adminAssignCustomRole, adminAttachmentUrl (+128 more)

### Community 2 - "Community 2"
Cohesion: 0.02
Nodes (124): Route, Route, Route, Route, Route, Route, Route, Route (+116 more)

### Community 3 - "Community 3"
Cohesion: 0.05
Nodes (65): 032ba88 SEO, 04564c5 fixes, 04c01f8 SEO, 171eb96 leads functions, 1c0e00f fixes, 2d81f50 feat(seo): vervang /cases door eerlijke /werkwijze-pagina; geen valse projectclaims, 5d3df91 new, 6262799 fixes (+57 more)

### Community 4 - "Community 4"
Cohesion: 0.04
Nodes (53): ecdbe8e fixes, Breadcrumbs(), Crumb, CookieBanner(), CookiePrefs, ExampleSlideshow(), GENERIC_EXAMPLES, ServiceExample (+45 more)

### Community 5 - "Community 5"
Cohesion: 0.09
Nodes (52): 36d8ccb new pages, aabf034 SEO, c27f4c8 new, dda7a04 web tester, BranchPage(), BranchPageData, BranchSectionId, sectionRenderers (+44 more)

### Community 6 - "Community 6"
Cohesion: 0.06
Nodes (49): boot(), cdnScriptFor(), collectProps(), compileAttr(), compileTemplate(), contentKey(), createComponentFactory(), createExternalModules() (+41 more)

### Community 7 - "Community 7"
Cohesion: 0.05
Nodes (37): useIsMobile(), Input, Separator, SheetContent, SheetContentProps, SheetDescription, SheetHeader(), SheetOverlay (+29 more)

### Community 8 - "Community 8"
Cohesion: 0.07
Nodes (22): cn(), AccordionContent, AccordionItem, AccordionTrigger, Alert, AlertDescription, AlertTitle, alertVariants (+14 more)

### Community 9 - "Community 9"
Cohesion: 0.09
Nodes (20): RECURRENCE_LABEL, Route, ConfirmContext, ConfirmContextValue, ConfirmOptions, ConfirmProvider(), Pending, PendingConfirm (+12 more)

### Community 10 - "Community 10"
Cohesion: 0.08
Nodes (15): Route, Section, MonitoringSection(), Route, timeAgo(), isProjectOverdue(), PROJECT_PRIORITY_COLOR, PROJECT_PRIORITY_LABEL (+7 more)

### Community 11 - "Community 11"
Cohesion: 0.07
Nodes (22): ALLOWED_ATTACHMENT_MIME, ChangeCard(), FILTER_LABEL, FilterKey, mapStatus(), matchesFilter(), Route, STATUS_STYLE (+14 more)

### Community 12 - "Community 12"
Cohesion: 0.10
Nodes (13): Route, Route, Section, CATEGORY_KEYS, CATEGORY_LABEL, CHANGE_TEMPLATES, PRIORITY_COLOR, PRIORITY_LABEL (+5 more)

### Community 13 - "Community 13"
Cohesion: 0.11
Nodes (20): addDays(), CallbackAgenda(), CallbackItem(), fmtDayLabel(), fmtTime(), isToday(), sameDay(), startOfDay() (+12 more)

### Community 14 - "Community 14"
Cohesion: 0.08
Nodes (16): AnalyticsLoader(), CookiePrefs, businessIdentityJsonLd(), postalAddress(), PRICE_VALID_UNTIL, Route, comparison, faqs (+8 more)

### Community 15 - "Community 15"
Cohesion: 0.10
Nodes (13): DISK_DAYS_OPTIONS, formatServerAge(), formatSslDate(), formatUptime(), HOURS_OPTIONS, LOG_LEVELS, na(), Route (+5 more)

### Community 16 - "Community 16"
Cohesion: 0.08
Nodes (24): cancelMyChange, getAttachmentUrl, getMyDashboard, logLogin, markAllNotificationsRead, markNotificationRead, portalCompleteOnboarding, portalCompleteTutorial (+16 more)

### Community 17 - "Community 17"
Cohesion: 0.14
Nodes (22): consumeLastCapturedError(), applyAssetCaching(), applyRateLimit(), applySecurityHeaders(), brandedErrorResponse(), brotliCompressAsync, compressedAssetCache, compressionInFlight (+14 more)

### Community 18 - "Community 18"
Cohesion: 0.09
Nodes (12): ACTIVITY_LABEL, initials(), LeadDetail(), relTime(), SortKey, SORTS, Status, STATUS_COLOR (+4 more)

### Community 19 - "Community 19"
Cohesion: 0.09
Nodes (23): ADMIN_LIKE, adminArchiveChange, adminAssignChange, adminBulkArchive, adminChangeAccountRole, adminCreateTempAccount, adminGetAccountDetail, adminHardDeleteAccount (+15 more)

### Community 20 - "Community 20"
Cohesion: 0.11
Nodes (18): Bloom, Branch, build(), buildLeaves(), DETAIL_PAGE, EmberGroup, fadeUp(), FORK (+10 more)

### Community 21 - "Community 21"
Cohesion: 0.11
Nodes (6): Route, a903820 Fix Rules of Hooks violation crashing admin Projecten tab, BerichtenTab(), useConfirm(), DeletedChangesTab(), usePermissions()

### Community 22 - "Community 22"
Cohesion: 0.14
Nodes (20): assertHttpUrl(), BLOCKED_HOSTNAMES, BLOCKED_IPV4_RANGES, CategoryScore, CheckResult, CheckStatus, FetchedPage, fetchSafely() (+12 more)

### Community 23 - "Community 23"
Cohesion: 0.10
Nodes (17): ADMIN_LIKE, getAlerts, getDailyCheckLatest, getHetznerCostsHistory, getHetznerCostsLatest, getLogsExportCsv, getMetricsCompareWeeks, getMetricsExportCsv (+9 more)

### Community 24 - "Community 24"
Cohesion: 0.11
Nodes (6): ONBOARDING_STATUS_COLOR, ONBOARDING_STATUS_LABEL, ROLE_LABEL, Route, STAFF_BASE_ROLES, TelegramMfaCard()

### Community 25 - "Community 25"
Cohesion: 0.13
Nodes (11): EXAMPLE, getFindings(), GROUPS, HERO_CATEGORIES, isLikelyValidUrl(), ReportCard(), Route, scoreVerdict() (+3 more)

### Community 26 - "Community 26"
Cohesion: 0.13
Nodes (14): BAN_DURATIONS_MS, BanEntry, bans, checkRateLimit(), Entry, getClientIp(), isIpBanned(), recordStrike() (+6 more)

### Community 27 - "Community 27"
Cohesion: 0.12
Nodes (7): ContactBlock, Contacts, fadeVariants, FormState, PortalOnboardingTour(), Profile, STEP_TITLES

### Community 28 - "Community 28"
Cohesion: 0.13
Nodes (11): Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, DialogContent (+3 more)

### Community 29 - "Community 29"
Cohesion: 0.12
Nodes (10): Menubar, MenubarCheckboxItem, MenubarContent, MenubarItem, MenubarLabel, MenubarRadioItem, MenubarSeparator, MenubarSubContent (+2 more)

### Community 30 - "Community 30"
Cohesion: 0.13
Nodes (6): ContactBlock, Contacts, fadeVariants, FormState, OnboardingWizard(), STEP_TITLES

### Community 31 - "Community 31"
Cohesion: 0.14
Nodes (12): requireSupabaseAuth, supabaseAdmin, CompositeTypes, Constants, Database, DatabaseWithoutInternals, DefaultSchema, Enums (+4 more)

### Community 32 - "Community 32"
Cohesion: 0.16
Nodes (6): Button, ButtonProps, buttonVariants, PaginationContent, PaginationItem, PaginationLinkProps

### Community 33 - "Community 33"
Cohesion: 0.15
Nodes (5): adminCreateCustomer(), adminInviteStaffMember(), generateTempPassword(), genTempPw(), STAFF

### Community 34 - "Community 34"
Cohesion: 0.13
Nodes (13): adminCreateRecipient, adminDeleteRecipient, adminGenerateRecipientLink, adminGenerateTelegramLink, adminGetTelegramStatus, adminListRecipients, adminSetMfaEnabled, adminSetRecipientNotify (+5 more)

### Community 35 - "Community 35"
Cohesion: 0.24
Nodes (11): auth.users, change_requests_touch, on_auth_user_created, profiles_touch, public.change_requests, public.extra_credits, public.handle_new_user(), public.notifications (+3 more)

### Community 36 - "Community 36"
Cohesion: 0.14
Nodes (11): FormControl, FormDescription, FormFieldContext, FormFieldContextValue, FormItem, FormItemContext, FormItemContextValue, FormLabel (+3 more)

### Community 37 - "Community 37"
Cohesion: 0.18
Nodes (6): ALL_PERMISSIONS, ROLE_LABEL, Route, TabsContent, TabsList, TabsTrigger

### Community 38 - "Community 38"
Cohesion: 0.16
Nodes (8): 2fcc9a3 fixes, 7f7208a new, 81a87ed commit, a2681a9 ewa, ee6f2e6 fixes, auth.users, public.roles, public.user_custom_roles

### Community 39 - "Community 39"
Cohesion: 0.23
Nodes (9): TeamTab(), ensurePermission(), getEffectivePermissions(), ALL_PERMISSION_ACTIONS, AppRole, can(), PermissionAction, ROLE_LABEL (+1 more)

### Community 40 - "Community 40"
Cohesion: 0.14
Nodes (12): Carousel, CarouselApi, CarouselContent, CarouselContext, CarouselContextProps, CarouselItem, CarouselNext, CarouselOptions (+4 more)

### Community 41 - "Community 41"
Cohesion: 0.15
Nodes (9): 3417a43 fixes, 74ecdc1 code fixes, 9c1fa06 perf fixes, ADMIN_LIKE, adminDeleteContactSubmission, adminListContactSubmissions, adminToggleContactHandled, STAFF_ROLES (+1 more)

### Community 42 - "Community 42"
Cohesion: 0.19
Nodes (10): c480d2e leads, CsvParseResult, detectDelimiter(), HEADER_ALIASES, parseCsv(), ParsedLead, parseLeadsCsv(), TRUE_VALUES (+2 more)

### Community 43 - "Community 43"
Cohesion: 0.22
Nodes (6): AuthCtx, AuthProvider(), Ctx, useAuth(), Route, supabase

### Community 44 - "Community 44"
Cohesion: 0.18
Nodes (6): ACCOUNT_STATUS_COLOR, ACCOUNT_STATUS_LABEL, AccountsListSection(), accountStatus(), Route, Section

### Community 45 - "Community 45"
Cohesion: 0.18
Nodes (5): ROLE_LABEL, Route, Section, STAFF_BASE_ROLES, Skeleton()

### Community 46 - "Community 46"
Cohesion: 0.24
Nodes (9): botToken(), botUsername(), generateAndSendMfaCode(), generateLinkToken(), handleTelegramWebhook(), LinkScope, safeSend(), sendTelegramMessage() (+1 more)

### Community 47 - "Community 47"
Cohesion: 0.24
Nodes (11): auth.users, on_auth_user_created, public.change_attachments, public.change_comments, public.change_requests, public.customer_costs, public.handle_new_user(), public.onboarding_items (+3 more)

### Community 48 - "Community 48"
Cohesion: 0.20
Nodes (9): 1713634 fixes, 3901302 Fix mojibake in admin dashboard and GET-blocking rate limit bug, 4b4ebd9 Catch getSession() network errors in the auth route guard, 6b21362 Catch login network errors instead of crashing to the error boundary, 6da1e20 Log root error boundary crashes to site_errors for visibility, 7f807c8 Catch login network errors instead of crashing to the error boundary, dbd0657 Log server-side (SSR) crashes to site_errors too, f7b9fd5 Merge branch 'main' of https://github.com/MilanDijksterhuis/aimi-digital-craft (+1 more)

### Community 49 - "Community 49"
Cohesion: 0.18
Nodes (7): ChartConfig, ChartContainer, ChartContext, ChartContextProps, ChartLegendContent, ChartTooltipContent, THEMES

### Community 50 - "Community 50"
Cohesion: 0.22
Nodes (7): Route, SectionKey, SECTIONS, f958216 leads functions, LeadsPanel(), lead_callbacks, leads

### Community 51 - "Community 51"
Cohesion: 0.24
Nodes (3): 4510b3f perf fixes, 7dbbf18 perf fixes, 9d0b477 perf fixes

### Community 52 - "Community 52"
Cohesion: 0.20
Nodes (4): 7443b54 Fix root cause: catch Supabase Realtime WebSocket crashes, 99bd8ac Surface site_errors in the account Activiteit tab, ChatWidget(), Message

### Community 53 - "Community 53"
Cohesion: 0.22
Nodes (4): a3773ee sec fixes, escapeHtml(), sendWelcomeEmail(), transporter

### Community 54 - "Community 54"
Cohesion: 0.20
Nodes (8): ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuSubContent, ContextMenuSubTrigger

### Community 55 - "Community 55"
Cohesion: 0.20
Nodes (8): DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuSubContent, DropdownMenuSubTrigger

### Community 56 - "Community 56"
Cohesion: 0.22
Nodes (3): Route, 2b1d78f telegram, Route

### Community 57 - "Community 57"
Cohesion: 0.22
Nodes (8): 02d6137 fixes, 2189780 fixes, bbc9d80 Surface site_errors in the account Activiteit tab, c27ffd9 fixes, f2eb4fe Fix root cause: catch Supabase Realtime WebSocket crashes, AdminChatPanel(), ChatRow, Message

### Community 58 - "Community 58"
Cohesion: 0.25
Nodes (7): 2d50590 wip: lokale wijzigingen voor pull, isAuthorized(), Route, timingSafeStringEqual(), Body, cors, Route

### Community 59 - "Community 59"
Cohesion: 0.33
Nodes (8): ensureAdmin(), ensureRoles(), ensureStaff(), ensureSuperAdmin(), getRoles(), ADMIN_LIKE_ROLES, STAFF_GUARD_ROLES, SUPER_ADMIN_ROLES

### Community 60 - "Community 60"
Cohesion: 0.44
Nodes (8): auth.users, public.project_milestone_dependencies, public.project_milestones, public.project_task_time_entries, public.project_tasks, public.project_template_milestones, public.project_templates, public.projects

### Community 61 - "Community 61"
Cohesion: 0.31
Nodes (8): dns_checks, monitoring_alerts, profiles, project_members, projects, role_permissions, site_response_times, ssl_checks

### Community 62 - "Community 62"
Cohesion: 0.22
Nodes (8): Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow

### Community 63 - "Community 63"
Cohesion: 0.32
Nodes (5): assertPublicHost(), DayUptime, isPrivateOrReservedIp(), measureResponseTime(), MonitoringStats

### Community 64 - "Community 64"
Cohesion: 0.39
Nodes (6): public.check_rate_limit(), public.rate_limit_bans, public.rate_limit_hits, public.record_strike(), v_count, v_strikes

### Community 65 - "Community 65"
Cohesion: 0.25
Nodes (5): Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage

### Community 66 - "Community 66"
Cohesion: 0.25
Nodes (4): DrawerContent, DrawerDescription, DrawerOverlay, DrawerTitle

### Community 67 - "Community 67"
Cohesion: 0.25
Nodes (7): NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle, NavigationMenuViewport

### Community 68 - "Community 68"
Cohesion: 0.25
Nodes (7): SelectContent, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger

### Community 69 - "Community 69"
Cohesion: 0.38
Nodes (4): renderErrorPage(), errorMiddleware, startInstance, attachSupabaseAuth

### Community 70 - "Community 70"
Cohesion: 0.29
Nodes (6): Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle

### Community 71 - "Community 71"
Cohesion: 0.33
Nodes (5): ToggleGroup, ToggleGroupContext, ToggleGroupItem, Toggle, toggleVariants

### Community 72 - "Community 72"
Cohesion: 0.33
Nodes (6): ensureAdmin(), ensureLeadsAccess(), ensureRoles(), ensureStaff(), ensureSuperAdmin(), getRoles()

### Community 73 - "Community 73"
Cohesion: 0.53
Nodes (5): public.chat_messages, public.chats, public.touch_chat_last_message(), public.user_presence, trg_touch_chat_last_message

### Community 74 - "Community 74"
Cohesion: 0.33
Nodes (1): public.audit_log

### Community 75 - "Community 75"
Cohesion: 0.60
Nodes (5): profiles, telegram_link_tokens, telegram_mfa_codes, telegram_notification_recipients, telegram_pending_logins

### Community 76 - "Community 76"
Cohesion: 0.40
Nodes (4): public.client_contacts, public.login_events, public.site_errors, public.site_pings

### Community 77 - "Community 77"
Cohesion: 0.40
Nodes (4): InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot

### Community 78 - "Community 78"
Cohesion: 0.67
Nodes (3): Badge(), BadgeProps, badgeVariants

### Community 79 - "Community 79"
Cohesion: 0.67
Nodes (1): Route

### Community 80 - "Community 80"
Cohesion: 0.67
Nodes (2): public.extra_change_requests, public.password_reset_requests

### Community 81 - "Community 81"
Cohesion: 0.67
Nodes (1): public.website_checks

### Community 82 - "Community 82"
Cohesion: 0.67
Nodes (2): cors, Route

### Community 83 - "Community 83"
Cohesion: 1.00
Nodes (2): generateDueRecurringTaskInstances(), nextRecurrenceDueDate()

### Community 84 - "Community 84"
Cohesion: 1.00
Nodes (1): public.appointments

### Community 90 - "Community 90"
Cohesion: 1.00
Nodes (1): public.contact_submissions

## Knowledge Gaps
- **734 isolated node(s):** `Message`, `ChatRow`, `CookiePrefs`, `BranchSectionId`, `sectionRenderers` (+729 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 74`** (1 nodes): `public.audit_log`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 79`** (1 nodes): `Route`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 80`** (2 nodes): `public.extra_change_requests`, `public.password_reset_requests`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 81`** (1 nodes): `public.website_checks`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 82`** (2 nodes): `cors`, `Route`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 83`** (2 nodes): `generateDueRecurringTaskInstances()`, `nextRecurrenceDueDate()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 84`** (1 nodes): `public.appointments`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 90`** (1 nodes): `public.contact_submissions`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 8` to `Community 9`, `Community 78`, `Community 65`, `Community 32`, `Community 70`, `Community 40`, `Community 49`, `Community 28`, `Community 54`, `Community 66`, `Community 55`, `Community 36`, `Community 7`, `Community 77`, `Community 29`, `Community 67`, `Community 68`, `Community 45`, `Community 62`, `Community 37`, `Community 71`?**
  _High betweenness centrality (0.097) - this node is a cross-community bridge._
- **Why does `Skeleton()` connect `Community 45` to `Community 21`, `Community 44`, `Community 24`, `Community 12`, `Community 10`, `Community 9`, `Community 37`, `Community 11`, `Community 7`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **What connects `Message`, `ChatRow`, `CookiePrefs` to the rest of the system?**
  _734 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.07389719743621968 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.014084507042253521 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.016 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.05362614913176711 - nodes in this community are weakly interconnected._