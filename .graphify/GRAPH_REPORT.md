# Graph Report - .  (2026-08-21)

## Corpus Check
- Large corpus: 1089 files · ~359.867 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder, or use --no-semantic to run AST-only.

## Summary
- 1698 nodes · 4652 edges · 76 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output
- Edge kinds: ON_BRANCH: 1646 · contains: 1234 · MODIFIES: 713 · imports: 360 · PARENT_OF: 290 · imports_from: 239 · calls: 128 · references: 28 · reads_from: 9 · triggers: 5


## Input Scope
- Requested: auto
- Resolved: committed (source: default-auto)
- Included files: 1089 · Candidates: 1510
- Excluded: 15 untracked · 35387 ignored · 8 sensitive · 10 missing committed
- Recommendation: Use --scope all or graphify.yaml inputs.corpus for a knowledge-base folder.

## Graph Freshness
- Built from Git commit: `6262799`
- Compare this hash to `git rev-parse HEAD` before trusting freshness-sensitive graph output.
## God Nodes (most connected - your core abstractions)
1. `cn()` - 45 edges
2. `Skeleton()` - 13 edges
3. `Footer()` - 11 edges
4. `supabase` - 10 edges
5. `breadcrumbJsonLd()` - 10 edges
6. `CookieBanner()` - 9 edges
7. `Nav()` - 9 edges
8. `useConfirm()` - 8 edges
9. `auth.users` - 8 edges
10. `walkChildren()` - 7 edges

## Surprising Connections (you probably didn't know these)
- `02d6137 fixes` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 23 → community 0_
- `032ba88 SEO` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 13 → community 0_
- `04c01f8 SEO` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 7 → community 0_
- `1713634 fixes` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 21 → community 0_
- `171eb96 leads functions` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 49 → community 0_

## Communities

### Community 0 - "Community 0"
Cohesion: 0.08
Nodes (204): main, seo-verbetering, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal, worktree-replicated-fluttering-whisper (+196 more)

### Community 1 - "Community 1"
Cohesion: 0.01
Nodes (136): ADMIN_LIKE_ROLES, adminAddCost, adminAddLeadActivity, adminAddMilestoneDependency, adminAddOnboardingItem, adminArchiveProject, adminAssignCustomRole, adminAttachmentUrl (+128 more)

### Community 2 - "Community 2"
Cohesion: 0.03
Nodes (76): getRouter(), AlgemeneVoorwaardenRoute, ApiPublicHooksExpireAccountsRoute, ApiPublicSiteErrorRoute, ApiPublicSitePingRoute, ApiTelegramWebhookRoute, AuthenticatedAccountRoute, AuthenticatedAdminAccountsAccountIdRoute (+68 more)

### Community 3 - "Community 3"
Cohesion: 0.06
Nodes (49): boot(), cdnScriptFor(), collectProps(), compileAttr(), compileTemplate(), contentKey(), createComponentFactory(), createExternalModules() (+41 more)

### Community 4 - "Community 4"
Cohesion: 0.06
Nodes (30): ONBOARDING_STATUS_COLOR, ONBOARDING_STATUS_LABEL, ROLE_LABEL, Route, STAFF_BASE_ROLES, ALL_PERMISSIONS, ROLE_LABEL, Route (+22 more)

### Community 5 - "Community 5"
Cohesion: 0.08
Nodes (31): 5d3df91 new, 6262799 fixes, 85a6666 SEO en robot, 9a2689c code fixes, ecdbe8e fixes, About(), Contact(), CookieBanner() (+23 more)

### Community 6 - "Community 6"
Cohesion: 0.05
Nodes (37): useIsMobile(), Input, Separator, SheetContent, SheetContentProps, SheetDescription, SheetHeader(), SheetOverlay (+29 more)

### Community 7 - "Community 7"
Cohesion: 0.12
Nodes (33): 04c01f8 SEO, 1c0e00f fixes, 8fdd571 SEO, 9965896 feat(seo): contact- en cases-pagina met LocalBusiness/Breadcrumb schema, bc99d99 achtegrond, e0f6b72 feat(seo): interne links op lokale landingspagina's, f207e52 feat(seo): dienstenpagina's website/webshop/hosting met unieke content + Service/FAQ/Breadcrumb schema, LocationData (+25 more)

### Community 8 - "Community 8"
Cohesion: 0.07
Nodes (22): cn(), AccordionContent, AccordionItem, AccordionTrigger, Alert, AlertDescription, AlertTitle, alertVariants (+14 more)

### Community 9 - "Community 9"
Cohesion: 0.08
Nodes (15): Route, Section, MonitoringSection(), Route, timeAgo(), isProjectOverdue(), PROJECT_PRIORITY_COLOR, PROJECT_PRIORITY_LABEL (+7 more)

### Community 10 - "Community 10"
Cohesion: 0.10
Nodes (22): f958216 leads functions, addDays(), CallbackAgenda(), CallbackItem(), fmtDayLabel(), fmtTime(), isToday(), sameDay() (+14 more)

### Community 11 - "Community 11"
Cohesion: 0.07
Nodes (17): Route, SectionKey, SECTIONS, CallbackScheduleForm(), ACTIVITY_LABEL, initials(), LeadDetail(), LeadsPanel() (+9 more)

### Community 12 - "Community 12"
Cohesion: 0.08
Nodes (19): ALLOWED_ATTACHMENT_MIME, ChangeCard(), FILTER_LABEL, FilterKey, mapStatus(), matchesFilter(), Route, STATUS_STYLE (+11 more)

### Community 13 - "Community 13"
Cohesion: 0.08
Nodes (21): 032ba88 SEO, 2d81f50 feat(seo): vervang /cases door eerlijke /werkwijze-pagina; geen valse projectclaims, 7a63e47 chore: graphify graph bijgewerkt, b48bbc0 chore: snapshot lokale SEO-pagina's (Veendam/Hoogeveen) + sitemap, ec1f322 feat(ui): Diensten-dropdown in nav + tijdlijn zonder nummers + sfeer-achtergrond op dienstenpagina's, ef44acd feat(seo): sitemap + llms.txt aangevuld met alle nieuwe pagina's, fa2ea52 feat(seo): nav + uitgebreide footer met interne links (geen orphan pages), fc7da2d animaties en paginas (+13 more)

### Community 14 - "Community 14"
Cohesion: 0.07
Nodes (27): 3417a43 fixes, 74ecdc1 code fixes, 9c1fa06 perf fixes, cancelMyChange, getAttachmentUrl, getMyDashboard, logLogin, markAllNotificationsRead (+19 more)

### Community 15 - "Community 15"
Cohesion: 0.09
Nodes (10): Route, Route, 37c0d11 Dock tokens toegevoegd & emojis weg, 97e70ec Changes, BerichtenTab(), ChatWidget(), Message, useConfirm() (+2 more)

### Community 16 - "Community 16"
Cohesion: 0.10
Nodes (13): Route, Route, Section, CATEGORY_KEYS, CATEGORY_LABEL, CHANGE_TEMPLATES, PRIORITY_COLOR, PRIORITY_LABEL (+5 more)

### Community 17 - "Community 17"
Cohesion: 0.12
Nodes (20): c480d2e leads, TeamTab(), ensureAdmin(), ensureRoles(), ensureStaff(), ensureSuperAdmin(), getRoles(), ensurePermission() (+12 more)

### Community 18 - "Community 18"
Cohesion: 0.12
Nodes (23): consumeLastCapturedError(), BAN_DURATIONS_MS, BanEntry, bans, checkRateLimit(), Entry, getClientIp(), isIpBanned() (+15 more)

### Community 19 - "Community 19"
Cohesion: 0.10
Nodes (13): DISK_DAYS_OPTIONS, formatServerAge(), formatSslDate(), formatUptime(), HOURS_OPTIONS, LOG_LEVELS, na(), Route (+5 more)

### Community 20 - "Community 20"
Cohesion: 0.09
Nodes (23): ADMIN_LIKE, adminArchiveChange, adminAssignChange, adminBulkArchive, adminChangeAccountRole, adminCreateTempAccount, adminGetAccountDetail, adminHardDeleteAccount (+15 more)

### Community 21 - "Community 21"
Cohesion: 0.12
Nodes (14): 1713634 fixes, 3901302 Fix mojibake in admin dashboard and GET-blocking rate limit bug, 4b4ebd9 Catch getSession() network errors in the auth route guard, 6b21362 Catch login network errors instead of crashing to the error boundary, 7f807c8 Catch login network errors instead of crashing to the error boundary, cf5e121 Catch getSession() network errors in the auth route guard, f7b9fd5 Merge branch 'main' of https://github.com/MilanDijksterhuis/aimi-digital-craft, AuthCtx (+6 more)

### Community 22 - "Community 22"
Cohesion: 0.12
Nodes (10): RECURRENCE_LABEL, Route, 30d7c60 Merge project detail pages (admin + klantenportaal), 39d363a server basic, 4c90153 Merge branch 'main' of https://github.com/MilanDijksterhuis/aimi-digital-craft, 500f718 Merge branch 'main' of https://github.com/MilanDijksterhuis/aimi-digital-craft, 5fa25a3 Add project detail pages for admin and client portal, a903820 Fix Rules of Hooks violation crashing admin Projecten tab (+2 more)

### Community 23 - "Community 23"
Cohesion: 0.10
Nodes (16): 02d6137 fixes, 2189780 fixes, 5d1e827 Log server-side (SSR) crashes to site_errors too, 6da1e20 Log root error boundary crashes to site_errors for visibility, 7443b54 Fix root cause: catch Supabase Realtime WebSocket crashes, 8e663f1 fixes, 99bd8ac Surface site_errors in the account Activiteit tab, b75b00d fixes (+8 more)

### Community 24 - "Community 24"
Cohesion: 0.11
Nodes (17): Bloom, Branch, build(), buildLeaves(), EmberGroup, fadeUp(), FORK, MeerDiensten() (+9 more)

### Community 25 - "Community 25"
Cohesion: 0.10
Nodes (17): ADMIN_LIKE, getAlerts, getDailyCheckLatest, getHetznerCostsHistory, getHetznerCostsLatest, getLogsExportCsv, getMetricsCompareWeeks, getMetricsExportCsv (+9 more)

### Community 26 - "Community 26"
Cohesion: 0.13
Nodes (7): b29ceec Fixed weak PRNG and RLS, c4498f5 Changes, adminCreateCustomer(), adminInviteStaffMember(), generateTempPassword(), genTempPw(), STAFF

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
Cohesion: 0.18
Nodes (11): 2d50590 wip: lokale wijzigingen voor pull, 9be6953 bug fixes, eccff4f bug fixes 2, assertPublicHost(), DayUptime, isPrivateOrReservedIp(), measureResponseTime(), MonitoringStats (+3 more)

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
Cohesion: 0.16
Nodes (8): 2fcc9a3 fixes, 7f7208a new, 81a87ed commit, a2681a9 ewa, ee6f2e6 fixes, auth.users, public.roles, public.user_custom_roles

### Community 38 - "Community 38"
Cohesion: 0.15
Nodes (7): a3773ee sec fixes, escapeHtml(), sendWelcomeEmail(), transporter, Body, cors, Route

### Community 39 - "Community 39"
Cohesion: 0.16
Nodes (5): AnalyticsLoader(), CookiePrefs, Route, Toaster(), ToasterProps

### Community 40 - "Community 40"
Cohesion: 0.14
Nodes (12): Carousel, CarouselApi, CarouselContent, CarouselContext, CarouselContextProps, CarouselItem, CarouselNext, CarouselOptions (+4 more)

### Community 41 - "Community 41"
Cohesion: 0.18
Nodes (6): ACCOUNT_STATUS_COLOR, ACCOUNT_STATUS_LABEL, AccountsListSection(), accountStatus(), Route, Section

### Community 42 - "Community 42"
Cohesion: 0.18
Nodes (5): ROLE_LABEL, Route, Section, STAFF_BASE_ROLES, Skeleton()

### Community 43 - "Community 43"
Cohesion: 0.24
Nodes (9): botToken(), botUsername(), generateAndSendMfaCode(), generateLinkToken(), handleTelegramWebhook(), LinkScope, safeSend(), sendTelegramMessage() (+1 more)

### Community 44 - "Community 44"
Cohesion: 0.24
Nodes (11): auth.users, on_auth_user_created, public.change_attachments, public.change_comments, public.change_requests, public.customer_costs, public.handle_new_user(), public.onboarding_items (+3 more)

### Community 45 - "Community 45"
Cohesion: 0.18
Nodes (7): ChartConfig, ChartContainer, ChartContext, ChartContextProps, ChartLegendContent, ChartTooltipContent, THEMES

### Community 46 - "Community 46"
Cohesion: 0.24
Nodes (3): 4510b3f perf fixes, 7dbbf18 perf fixes, 9d0b477 perf fixes

### Community 47 - "Community 47"
Cohesion: 0.20
Nodes (8): ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuSubContent, ContextMenuSubTrigger

### Community 48 - "Community 48"
Cohesion: 0.20
Nodes (8): DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuSubContent, DropdownMenuSubTrigger

### Community 49 - "Community 49"
Cohesion: 0.22
Nodes (4): Route, 171eb96 leads functions, 2b1d78f telegram, bc842b8 leads functions

### Community 50 - "Community 50"
Cohesion: 0.22
Nodes (6): ADMIN_LIKE, adminDeleteContactSubmission, adminListContactSubmissions, adminToggleContactHandled, STAFF_ROLES, submitContactForm

### Community 51 - "Community 51"
Cohesion: 0.28
Nodes (7): CsvParseResult, detectDelimiter(), HEADER_ALIASES, parseCsv(), ParsedLead, parseLeadsCsv(), TRUE_VALUES

### Community 52 - "Community 52"
Cohesion: 0.44
Nodes (8): auth.users, public.project_milestone_dependencies, public.project_milestones, public.project_task_time_entries, public.project_tasks, public.project_template_milestones, public.project_templates, public.projects

### Community 53 - "Community 53"
Cohesion: 0.31
Nodes (8): dns_checks, monitoring_alerts, profiles, project_members, projects, role_permissions, site_response_times, ssl_checks

### Community 54 - "Community 54"
Cohesion: 0.22
Nodes (8): Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow

### Community 55 - "Community 55"
Cohesion: 0.39
Nodes (6): public.check_rate_limit(), public.rate_limit_bans, public.rate_limit_hits, public.record_strike(), v_count, v_strikes

### Community 56 - "Community 56"
Cohesion: 0.25
Nodes (5): Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage

### Community 57 - "Community 57"
Cohesion: 0.25
Nodes (4): DrawerContent, DrawerDescription, DrawerOverlay, DrawerTitle

### Community 58 - "Community 58"
Cohesion: 0.25
Nodes (7): NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle, NavigationMenuViewport

### Community 59 - "Community 59"
Cohesion: 0.25
Nodes (7): SelectContent, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger

### Community 60 - "Community 60"
Cohesion: 0.38
Nodes (4): renderErrorPage(), errorMiddleware, startInstance, attachSupabaseAuth

### Community 61 - "Community 61"
Cohesion: 0.29
Nodes (6): Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle

### Community 62 - "Community 62"
Cohesion: 0.33
Nodes (5): ToggleGroup, ToggleGroupContext, ToggleGroupItem, Toggle, toggleVariants

### Community 63 - "Community 63"
Cohesion: 0.33
Nodes (6): ensureAdmin(), ensureLeadsAccess(), ensureRoles(), ensureStaff(), ensureSuperAdmin(), getRoles()

### Community 64 - "Community 64"
Cohesion: 0.53
Nodes (5): public.chat_messages, public.chats, public.touch_chat_last_message(), public.user_presence, trg_touch_chat_last_message

### Community 65 - "Community 65"
Cohesion: 0.33
Nodes (1): public.audit_log

### Community 66 - "Community 66"
Cohesion: 0.60
Nodes (5): profiles, telegram_link_tokens, telegram_mfa_codes, telegram_notification_recipients, telegram_pending_logins

### Community 67 - "Community 67"
Cohesion: 0.40
Nodes (4): public.client_contacts, public.login_events, public.site_errors, public.site_pings

### Community 68 - "Community 68"
Cohesion: 0.40
Nodes (4): InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot

### Community 69 - "Community 69"
Cohesion: 0.67
Nodes (3): isAuthorized(), Route, timingSafeStringEqual()

### Community 70 - "Community 70"
Cohesion: 0.67
Nodes (3): Badge(), BadgeProps, badgeVariants

### Community 71 - "Community 71"
Cohesion: 0.67
Nodes (2): public.extra_change_requests, public.password_reset_requests

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

## Knowledge Gaps
- **633 isolated node(s):** `Message`, `ChatRow`, `CookiePrefs`, `ViewMode`, `CallbackScheduleValue` (+628 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 65`** (1 nodes): `public.audit_log`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 71`** (2 nodes): `public.extra_change_requests`, `public.password_reset_requests`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 72`** (2 nodes): `cors`, `Route`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 73`** (2 nodes): `generateDueRecurringTaskInstances()`, `nextRecurrenceDueDate()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 74`** (1 nodes): `public.appointments`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 80`** (1 nodes): `public.contact_submissions`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 8` to `Community 4`, `Community 70`, `Community 56`, `Community 32`, `Community 61`, `Community 40`, `Community 45`, `Community 28`, `Community 47`, `Community 57`, `Community 48`, `Community 36`, `Community 6`, `Community 68`, `Community 29`, `Community 58`, `Community 59`, `Community 42`, `Community 54`, `Community 62`?**
  _High betweenness centrality (0.110) - this node is a cross-community bridge._
- **Why does `Skeleton()` connect `Community 42` to `Community 15`, `Community 41`, `Community 4`, `Community 16`, `Community 9`, `Community 22`, `Community 12`, `Community 6`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **What connects `Message`, `ChatRow`, `CookiePrefs` to the rest of the system?**
  _633 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.07563573136274723 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.014084507042253521 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.02596559558584875 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.058173076923076925 - nodes in this community are weakly interconnected._