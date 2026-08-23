# Graph Report - .  (2026-08-23)

## Corpus Check
- Large corpus: 1133 files · ~396.498 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder, or use --no-semantic to run AST-only.

## Summary
- 1874 nodes · 5234 edges · 83 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output
- Edge kinds: ON_BRANCH: 1649 · contains: 1370 · MODIFIES: 811 · imports: 566 · imports_from: 373 · PARENT_OF: 293 · calls: 130 · references: 28 · reads_from: 9 · triggers: 5


## Input Scope
- Requested: auto
- Resolved: committed (source: default-auto)
- Included files: 1133 · Candidates: 1679
- Excluded: 4 untracked · 37036 ignored · 8 sensitive · 10 missing committed
- Recommendation: Use --scope all or graphify.yaml inputs.corpus for a knowledge-base folder.

## Graph Freshness
- Built from Git commit: `36d8ccb`
- Compare this hash to `git rev-parse HEAD` before trusting freshness-sensitive graph output.
## God Nodes (most connected - your core abstractions)
1. `breadcrumbJsonLd()` - 46 edges
2. `cn()` - 45 edges
3. `serviceJsonLd()` - 24 edges
4. `Footer()` - 19 edges
5. `CookieBanner()` - 17 edges
6. `Nav()` - 17 edges
7. `BranchPageData` - 16 edges
8. `BranchPage()` - 16 edges
9. `LocationPageData` - 16 edges
10. `LocationPageV2()` - 16 edges

## Surprising Connections (you probably didn't know these)
- `02d6137 fixes` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 24 → community 0_
- `032ba88 SEO` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 5 → community 0_
- `04564c5 fixes` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 16 → community 0_
- `04564c5 fixes` --PARENT_OF--> `36d8ccb new pages`  [EXTRACTED]
  git → git  _Bridges community 16 → community 3_
- `1713634 fixes` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 59 → community 0_

## Communities

### Community 0 - "Community 0"
Cohesion: 0.07
Nodes (211): main, seo-verbetering, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal, worktree-replicated-fluttering-whisper (+203 more)

### Community 1 - "Community 1"
Cohesion: 0.01
Nodes (136): ADMIN_LIKE_ROLES, adminAddCost, adminAddLeadActivity, adminAddMilestoneDependency, adminAddOnboardingItem, adminArchiveProject, adminAssignCustomRole, adminAttachmentUrl (+128 more)

### Community 2 - "Community 2"
Cohesion: 0.02
Nodes (106): Route, Route, Route, Route, Route, Route, Route, Route (+98 more)

### Community 3 - "Community 3"
Cohesion: 0.06
Nodes (60): 36d8ccb new pages, c27f4c8 new, BranchPage(), BranchPageData, BranchSectionId, sectionRenderers, LocationPageData, LocationPageV2() (+52 more)

### Community 4 - "Community 4"
Cohesion: 0.04
Nodes (50): ecdbe8e fixes, Breadcrumbs(), Crumb, Contact(), CookieBanner(), CookiePrefs, branches, cities (+42 more)

### Community 5 - "Community 5"
Cohesion: 0.06
Nodes (60): 032ba88 SEO, 04c01f8 SEO, 171eb96 leads functions, 1c0e00f fixes, 2d81f50 feat(seo): vervang /cases door eerlijke /werkwijze-pagina; geen valse projectclaims, 5d3df91 new, 6262799 fixes, 7a63e47 chore: graphify graph bijgewerkt (+52 more)

### Community 6 - "Community 6"
Cohesion: 0.06
Nodes (49): boot(), cdnScriptFor(), collectProps(), compileAttr(), compileTemplate(), contentKey(), createComponentFactory(), createExternalModules() (+41 more)

### Community 7 - "Community 7"
Cohesion: 0.05
Nodes (37): useIsMobile(), Input, Separator, SheetContent, SheetContentProps, SheetDescription, SheetHeader(), SheetOverlay (+29 more)

### Community 8 - "Community 8"
Cohesion: 0.08
Nodes (24): ONBOARDING_STATUS_COLOR, ONBOARDING_STATUS_LABEL, ROLE_LABEL, Route, STAFF_BASE_ROLES, ConfirmContext, ConfirmContextValue, ConfirmOptions (+16 more)

### Community 9 - "Community 9"
Cohesion: 0.07
Nodes (22): cn(), AccordionContent, AccordionItem, AccordionTrigger, Alert, AlertDescription, AlertTitle, alertVariants (+14 more)

### Community 10 - "Community 10"
Cohesion: 0.08
Nodes (15): Route, Section, MonitoringSection(), Route, timeAgo(), isProjectOverdue(), PROJECT_PRIORITY_COLOR, PROJECT_PRIORITY_LABEL (+7 more)

### Community 11 - "Community 11"
Cohesion: 0.08
Nodes (19): ALLOWED_ATTACHMENT_MIME, ChangeCard(), FILTER_LABEL, FilterKey, mapStatus(), matchesFilter(), Route, STATUS_STYLE (+11 more)

### Community 12 - "Community 12"
Cohesion: 0.10
Nodes (13): Route, Route, Section, CATEGORY_KEYS, CATEGORY_LABEL, CHANGE_TEMPLATES, PRIORITY_COLOR, PRIORITY_LABEL (+5 more)

### Community 13 - "Community 13"
Cohesion: 0.11
Nodes (20): addDays(), CallbackAgenda(), CallbackItem(), fmtDayLabel(), fmtTime(), isToday(), sameDay(), startOfDay() (+12 more)

### Community 14 - "Community 14"
Cohesion: 0.10
Nodes (13): DISK_DAYS_OPTIONS, formatServerAge(), formatSslDate(), formatUptime(), HOURS_OPTIONS, LOG_LEVELS, na(), Route (+5 more)

### Community 15 - "Community 15"
Cohesion: 0.08
Nodes (24): cancelMyChange, getAttachmentUrl, getMyDashboard, logLogin, markAllNotificationsRead, markNotificationRead, portalCompleteOnboarding, portalCompleteTutorial (+16 more)

### Community 16 - "Community 16"
Cohesion: 0.09
Nodes (14): 04564c5 fixes, AnalyticsLoader(), CookiePrefs, PRICE_VALID_UNTIL, Route, faqs, included, notIncluded (+6 more)

### Community 17 - "Community 17"
Cohesion: 0.09
Nodes (12): ACTIVITY_LABEL, initials(), LeadDetail(), relTime(), SortKey, SORTS, Status, STATUS_COLOR (+4 more)

### Community 18 - "Community 18"
Cohesion: 0.09
Nodes (23): ADMIN_LIKE, adminArchiveChange, adminAssignChange, adminBulkArchive, adminChangeAccountRole, adminCreateTempAccount, adminGetAccountDetail, adminHardDeleteAccount (+15 more)

### Community 19 - "Community 19"
Cohesion: 0.11
Nodes (18): Bloom, Branch, build(), buildLeaves(), DETAIL_PAGE, EmberGroup, fadeUp(), FORK (+10 more)

### Community 20 - "Community 20"
Cohesion: 0.11
Nodes (6): Route, a903820 Fix Rules of Hooks violation crashing admin Projecten tab, BerichtenTab(), useConfirm(), DeletedChangesTab(), usePermissions()

### Community 21 - "Community 21"
Cohesion: 0.17
Nodes (18): 3901302 Fix mojibake in admin dashboard and GET-blocking rate limit bug, f7b9fd5 Merge branch 'main' of https://github.com/MilanDijksterhuis/aimi-digital-craft, consumeLastCapturedError(), applyAssetCaching(), applyRateLimit(), applySecurityHeaders(), brandedErrorResponse(), fetch() (+10 more)

### Community 22 - "Community 22"
Cohesion: 0.10
Nodes (17): ADMIN_LIKE, getAlerts, getDailyCheckLatest, getHetznerCostsHistory, getHetznerCostsLatest, getLogsExportCsv, getMetricsCompareWeeks, getMetricsExportCsv (+9 more)

### Community 23 - "Community 23"
Cohesion: 0.13
Nodes (7): RECURRENCE_LABEL, Route, 30d7c60 Merge project detail pages (admin + klantenportaal), 4c90153 Merge branch 'main' of https://github.com/MilanDijksterhuis/aimi-digital-craft, 500f718 Merge branch 'main' of https://github.com/MilanDijksterhuis/aimi-digital-craft, c7e76b2 Revert "Merge project detail pages (admin + klantenportaal)", c914318 ewa

### Community 24 - "Community 24"
Cohesion: 0.12
Nodes (12): 02d6137 fixes, 7443b54 Fix root cause: catch Supabase Realtime WebSocket crashes, 99bd8ac Surface site_errors in the account Activiteit tab, bbc9d80 Surface site_errors in the account Activiteit tab, c27ffd9 fixes, dbd0657 Log server-side (SSR) crashes to site_errors too, f2eb4fe Fix root cause: catch Supabase Realtime WebSocket crashes, AdminChatPanel() (+4 more)

### Community 25 - "Community 25"
Cohesion: 0.15
Nodes (10): 4b4ebd9 Catch getSession() network errors in the auth route guard, 6da1e20 Log root error boundary crashes to site_errors for visibility, 7f807c8 Catch login network errors instead of crashing to the error boundary, AuthCtx, AuthProvider(), Ctx, useAuth(), Route (+2 more)

### Community 26 - "Community 26"
Cohesion: 0.12
Nodes (7): ContactBlock, Contacts, fadeVariants, FormState, PortalOnboardingTour(), Profile, STEP_TITLES

### Community 27 - "Community 27"
Cohesion: 0.13
Nodes (11): Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, DialogContent (+3 more)

### Community 28 - "Community 28"
Cohesion: 0.12
Nodes (10): Menubar, MenubarCheckboxItem, MenubarContent, MenubarItem, MenubarLabel, MenubarRadioItem, MenubarSeparator, MenubarSubContent (+2 more)

### Community 29 - "Community 29"
Cohesion: 0.13
Nodes (6): ContactBlock, Contacts, fadeVariants, FormState, OnboardingWizard(), STEP_TITLES

### Community 30 - "Community 30"
Cohesion: 0.14
Nodes (12): requireSupabaseAuth, supabaseAdmin, CompositeTypes, Constants, Database, DatabaseWithoutInternals, DefaultSchema, Enums (+4 more)

### Community 31 - "Community 31"
Cohesion: 0.16
Nodes (6): Button, ButtonProps, buttonVariants, PaginationContent, PaginationItem, PaginationLinkProps

### Community 32 - "Community 32"
Cohesion: 0.15
Nodes (5): adminCreateCustomer(), adminInviteStaffMember(), generateTempPassword(), genTempPw(), STAFF

### Community 33 - "Community 33"
Cohesion: 0.13
Nodes (13): adminCreateRecipient, adminDeleteRecipient, adminGenerateRecipientLink, adminGenerateTelegramLink, adminGetTelegramStatus, adminListRecipients, adminSetMfaEnabled, adminSetRecipientNotify (+5 more)

### Community 34 - "Community 34"
Cohesion: 0.24
Nodes (11): auth.users, change_requests_touch, on_auth_user_created, profiles_touch, public.change_requests, public.extra_credits, public.handle_new_user(), public.notifications (+3 more)

### Community 35 - "Community 35"
Cohesion: 0.14
Nodes (11): FormControl, FormDescription, FormFieldContext, FormFieldContextValue, FormItem, FormItemContext, FormItemContextValue, FormLabel (+3 more)

### Community 36 - "Community 36"
Cohesion: 0.18
Nodes (6): ALL_PERMISSIONS, ROLE_LABEL, Route, TabsContent, TabsList, TabsTrigger

### Community 37 - "Community 37"
Cohesion: 0.16
Nodes (8): 2fcc9a3 fixes, 7f7208a new, 81a87ed commit, a2681a9 ewa, ee6f2e6 fixes, auth.users, public.roles, public.user_custom_roles

### Community 38 - "Community 38"
Cohesion: 0.23
Nodes (9): TeamTab(), ensurePermission(), getEffectivePermissions(), ALL_PERMISSION_ACTIONS, AppRole, can(), PermissionAction, ROLE_LABEL (+1 more)

### Community 39 - "Community 39"
Cohesion: 0.15
Nodes (12): BAN_DURATIONS_MS, BanEntry, bans, checkRateLimit(), Entry, getClientIp(), isIpBanned(), recordStrike() (+4 more)

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
Cohesion: 0.18
Nodes (6): ACCOUNT_STATUS_COLOR, ACCOUNT_STATUS_LABEL, AccountsListSection(), accountStatus(), Route, Section

### Community 44 - "Community 44"
Cohesion: 0.18
Nodes (5): ROLE_LABEL, Route, Section, STAFF_BASE_ROLES, Skeleton()

### Community 45 - "Community 45"
Cohesion: 0.24
Nodes (9): botToken(), botUsername(), generateAndSendMfaCode(), generateLinkToken(), handleTelegramWebhook(), LinkScope, safeSend(), sendTelegramMessage() (+1 more)

### Community 46 - "Community 46"
Cohesion: 0.24
Nodes (11): auth.users, on_auth_user_created, public.change_attachments, public.change_comments, public.change_requests, public.customer_costs, public.handle_new_user(), public.onboarding_items (+3 more)

### Community 47 - "Community 47"
Cohesion: 0.18
Nodes (7): ChartConfig, ChartContainer, ChartContext, ChartContextProps, ChartLegendContent, ChartTooltipContent, THEMES

### Community 48 - "Community 48"
Cohesion: 0.22
Nodes (7): Route, SectionKey, SECTIONS, f958216 leads functions, LeadsPanel(), lead_callbacks, leads

### Community 49 - "Community 49"
Cohesion: 0.24
Nodes (3): 4510b3f perf fixes, 7dbbf18 perf fixes, 9d0b477 perf fixes

### Community 50 - "Community 50"
Cohesion: 0.22
Nodes (4): a3773ee sec fixes, escapeHtml(), sendWelcomeEmail(), transporter

### Community 51 - "Community 51"
Cohesion: 0.20
Nodes (8): ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuSubContent, ContextMenuSubTrigger

### Community 52 - "Community 52"
Cohesion: 0.20
Nodes (8): DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuSubContent, DropdownMenuSubTrigger

### Community 53 - "Community 53"
Cohesion: 0.22
Nodes (3): Route, 2b1d78f telegram, Route

### Community 54 - "Community 54"
Cohesion: 0.25
Nodes (7): 2d50590 wip: lokale wijzigingen voor pull, isAuthorized(), Route, timingSafeStringEqual(), Body, cors, Route

### Community 55 - "Community 55"
Cohesion: 0.33
Nodes (8): ensureAdmin(), ensureRoles(), ensureStaff(), ensureSuperAdmin(), getRoles(), ADMIN_LIKE_ROLES, STAFF_GUARD_ROLES, SUPER_ADMIN_ROLES

### Community 56 - "Community 56"
Cohesion: 0.44
Nodes (8): auth.users, public.project_milestone_dependencies, public.project_milestones, public.project_task_time_entries, public.project_tasks, public.project_template_milestones, public.project_templates, public.projects

### Community 57 - "Community 57"
Cohesion: 0.31
Nodes (8): dns_checks, monitoring_alerts, profiles, project_members, projects, role_permissions, site_response_times, ssl_checks

### Community 58 - "Community 58"
Cohesion: 0.22
Nodes (8): Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow

### Community 59 - "Community 59"
Cohesion: 0.25
Nodes (8): 1713634 fixes, 2189780 fixes, 5d1e827 Log server-side (SSR) crashes to site_errors too, 6b21362 Catch login network errors instead of crashing to the error boundary, 8e663f1 fixes, b75b00d fixes, cf5e121 Catch getSession() network errors in the auth route guard, d2da4c9 Log root error boundary crashes to site_errors for visibility

### Community 60 - "Community 60"
Cohesion: 0.32
Nodes (5): assertPublicHost(), DayUptime, isPrivateOrReservedIp(), measureResponseTime(), MonitoringStats

### Community 61 - "Community 61"
Cohesion: 0.39
Nodes (6): public.check_rate_limit(), public.rate_limit_bans, public.rate_limit_hits, public.record_strike(), v_count, v_strikes

### Community 62 - "Community 62"
Cohesion: 0.25
Nodes (5): Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage

### Community 63 - "Community 63"
Cohesion: 0.25
Nodes (4): DrawerContent, DrawerDescription, DrawerOverlay, DrawerTitle

### Community 64 - "Community 64"
Cohesion: 0.25
Nodes (7): NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle, NavigationMenuViewport

### Community 65 - "Community 65"
Cohesion: 0.25
Nodes (7): SelectContent, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger

### Community 66 - "Community 66"
Cohesion: 0.38
Nodes (4): renderErrorPage(), errorMiddleware, startInstance, attachSupabaseAuth

### Community 67 - "Community 67"
Cohesion: 0.29
Nodes (6): Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle

### Community 68 - "Community 68"
Cohesion: 0.33
Nodes (5): ToggleGroup, ToggleGroupContext, ToggleGroupItem, Toggle, toggleVariants

### Community 69 - "Community 69"
Cohesion: 0.33
Nodes (6): ensureAdmin(), ensureLeadsAccess(), ensureRoles(), ensureStaff(), ensureSuperAdmin(), getRoles()

### Community 70 - "Community 70"
Cohesion: 0.53
Nodes (5): public.chat_messages, public.chats, public.touch_chat_last_message(), public.user_presence, trg_touch_chat_last_message

### Community 71 - "Community 71"
Cohesion: 0.33
Nodes (1): public.audit_log

### Community 72 - "Community 72"
Cohesion: 0.60
Nodes (5): profiles, telegram_link_tokens, telegram_mfa_codes, telegram_notification_recipients, telegram_pending_logins

### Community 73 - "Community 73"
Cohesion: 0.40
Nodes (4): public.client_contacts, public.login_events, public.site_errors, public.site_pings

### Community 74 - "Community 74"
Cohesion: 0.40
Nodes (4): InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot

### Community 75 - "Community 75"
Cohesion: 0.67
Nodes (3): Badge(), BadgeProps, badgeVariants

### Community 76 - "Community 76"
Cohesion: 0.67
Nodes (1): Route

### Community 77 - "Community 77"
Cohesion: 0.67
Nodes (1): projects

### Community 78 - "Community 78"
Cohesion: 0.67
Nodes (2): public.extra_change_requests, public.password_reset_requests

### Community 79 - "Community 79"
Cohesion: 0.67
Nodes (2): cors, Route

### Community 80 - "Community 80"
Cohesion: 1.00
Nodes (2): generateDueRecurringTaskInstances(), nextRecurrenceDueDate()

### Community 81 - "Community 81"
Cohesion: 1.00
Nodes (1): public.appointments

### Community 87 - "Community 87"
Cohesion: 1.00
Nodes (1): public.contact_submissions

## Knowledge Gaps
- **713 isolated node(s):** `Message`, `ChatRow`, `CookiePrefs`, `BranchSectionId`, `sectionRenderers` (+708 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 71`** (1 nodes): `public.audit_log`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 76`** (1 nodes): `Route`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 77`** (1 nodes): `projects`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 78`** (2 nodes): `public.extra_change_requests`, `public.password_reset_requests`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 79`** (2 nodes): `cors`, `Route`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 80`** (2 nodes): `generateDueRecurringTaskInstances()`, `nextRecurrenceDueDate()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 81`** (1 nodes): `public.appointments`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 87`** (1 nodes): `public.contact_submissions`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 9` to `Community 8`, `Community 75`, `Community 62`, `Community 31`, `Community 67`, `Community 40`, `Community 47`, `Community 27`, `Community 51`, `Community 63`, `Community 52`, `Community 35`, `Community 7`, `Community 74`, `Community 28`, `Community 64`, `Community 65`, `Community 44`, `Community 58`, `Community 36`, `Community 68`?**
  _High betweenness centrality (0.100) - this node is a cross-community bridge._
- **Why does `Skeleton()` connect `Community 44` to `Community 20`, `Community 43`, `Community 8`, `Community 12`, `Community 10`, `Community 23`, `Community 36`, `Community 11`, `Community 7`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **What connects `Message`, `ChatRow`, `CookiePrefs` to the rest of the system?**
  _713 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.07408473879062115 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.014084507042253521 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.018691588785046728 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.05890603085553997 - nodes in this community are weakly interconnected._