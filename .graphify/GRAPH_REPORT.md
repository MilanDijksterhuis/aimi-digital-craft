# Graph Report - .  (2026-09-16)

## Corpus Check
- Large corpus: 1242 files · ~888.112 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder, or use --no-semantic to run AST-only.

## Summary
- 2066 nodes · 5803 edges · 91 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output
- Edge kinds: ON_BRANCH: 1659 · contains: 1537 · MODIFIES: 968 · imports: 668 · imports_from: 416 · PARENT_OF: 303 · calls: 209 · references: 28 · reads_from: 9 · triggers: 5 · method: 1


## Input Scope
- Requested: auto
- Resolved: committed (source: default-auto)
- Included files: 1242 · Candidates: 1990
- Excluded: 8 untracked · 37047 ignored · 8 sensitive · 11 missing committed
- Recommendation: Use --scope all or graphify.yaml inputs.corpus for a knowledge-base folder.

## Graph Freshness
- Built from Git commit: `b5c2a22`
- Compare this hash to `git rev-parse HEAD` before trusting freshness-sensitive graph output.
## God Nodes (most connected - your core abstractions)
1. `breadcrumbJsonLd()` - 49 edges
2. `cn()` - 45 edges
3. `faqJsonLd()` - 41 edges
4. `serviceJsonLd()` - 38 edges
5. `Footer()` - 22 edges
6. `CookieBanner()` - 20 edges
7. `Nav()` - 20 edges
8. `BranchPageData` - 16 edges
9. `BranchPage()` - 16 edges
10. `LocationPageData` - 16 edges

## Surprising Connections (you probably didn't know these)
- `02d6137 fixes` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 37 → community 0_
- `032ba88 SEO` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 57 → community 0_
- `032ba88 SEO` --PARENT_OF--> `2d81f50 feat(seo): vervang /cases door eerlijke /werkwijze-pagina; geen valse projectclaims`  [EXTRACTED]
  git → git  _Bridges community 57 → community 3_
- `04564c5 fixes` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 5 → community 0_
- `04564c5 fixes` --PARENT_OF--> `36d8ccb new pages`  [EXTRACTED]
  git → git  _Bridges community 5 → community 4_

## Communities

### Community 0 - "Community 0"
Cohesion: 0.07
Nodes (223): main, seo-verbetering, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal, worktree-replicated-fluttering-whisper (+215 more)

### Community 1 - "Community 1"
Cohesion: 0.01
Nodes (136): ADMIN_LIKE_ROLES, adminAddCost, adminAddLeadActivity, adminAddMilestoneDependency, adminAddOnboardingItem, adminArchiveProject, adminAssignCustomRole, adminAttachmentUrl (+128 more)

### Community 2 - "Community 2"
Cohesion: 0.02
Nodes (129): Route, Route, Route, Route, Route, Route, Route, Route (+121 more)

### Community 3 - "Community 3"
Cohesion: 0.04
Nodes (61): 2d81f50 feat(seo): vervang /cases door eerlijke /werkwijze-pagina; geen valse projectclaims, 59bb970 eyoo, 8af95bc backlink, cc405f4 pagina updates, ec1f322 feat(ui): Diensten-dropdown in nav + tijdlijn zonder nummers + sfeer-achtergrond op dienstenpagina's, fc7da2d animaties en paginas, Breadcrumbs(), Crumb (+53 more)

### Community 4 - "Community 4"
Cohesion: 0.09
Nodes (54): 36d8ccb new pages, aabf034 SEO, b5c2a22 blog, c27f4c8 new, BranchPage(), BranchPageData, BranchSectionId, sectionRenderers (+46 more)

### Community 5 - "Community 5"
Cohesion: 0.06
Nodes (56): 04564c5 fixes, 04c01f8 SEO, 1c0e00f fixes, 5d3df91 new, 6262799 fixes, 6e488ba fixes, 85a6666 SEO en robot, 8fdd571 SEO (+48 more)

### Community 6 - "Community 6"
Cohesion: 0.06
Nodes (49): boot(), cdnScriptFor(), collectProps(), compileAttr(), compileTemplate(), contentKey(), createComponentFactory(), createExternalModules() (+41 more)

### Community 7 - "Community 7"
Cohesion: 0.06
Nodes (49): boot(), cdnScriptFor(), collectProps(), compileAttr(), compileTemplate(), contentKey(), createComponentFactory(), createExternalModules() (+41 more)

### Community 8 - "Community 8"
Cohesion: 0.05
Nodes (37): useIsMobile(), Input, Separator, SheetContent, SheetContentProps, SheetDescription, SheetHeader(), SheetOverlay (+29 more)

### Community 9 - "Community 9"
Cohesion: 0.07
Nodes (22): cn(), AccordionContent, AccordionItem, AccordionTrigger, Alert, AlertDescription, AlertTitle, alertVariants (+14 more)

### Community 10 - "Community 10"
Cohesion: 0.09
Nodes (20): RECURRENCE_LABEL, Route, ConfirmContext, ConfirmContextValue, ConfirmOptions, ConfirmProvider(), Pending, PendingConfirm (+12 more)

### Community 11 - "Community 11"
Cohesion: 0.08
Nodes (15): Route, Section, MonitoringSection(), Route, timeAgo(), isProjectOverdue(), PROJECT_PRIORITY_COLOR, PROJECT_PRIORITY_LABEL (+7 more)

### Community 12 - "Community 12"
Cohesion: 0.08
Nodes (23): dca01f9 pagina updates, ExampleSlideshow(), GENERIC_EXAMPLES, ServiceExample, LOCAL_SERVICES, LocationSectionId, sectionRenderers, InternalLink (+15 more)

### Community 13 - "Community 13"
Cohesion: 0.09
Nodes (15): Route, Route, Section, BLOG_STATUS_COLOR, BLOG_STATUS_LABEL, CATEGORY_KEYS, CATEGORY_LABEL, CHANGE_TEMPLATES (+7 more)

### Community 14 - "Community 14"
Cohesion: 0.08
Nodes (19): ALLOWED_ATTACHMENT_MIME, ChangeCard(), FILTER_LABEL, FilterKey, mapStatus(), matchesFilter(), Route, STATUS_STYLE (+11 more)

### Community 15 - "Community 15"
Cohesion: 0.09
Nodes (19): Route, 171eb96 leads functions, 2b1d78f telegram, bc842b8 leads functions, botToken(), botUsername(), generateAndSendMfaCode(), generateLinkToken() (+11 more)

### Community 16 - "Community 16"
Cohesion: 0.10
Nodes (13): DISK_DAYS_OPTIONS, formatServerAge(), formatSslDate(), formatUptime(), HOURS_OPTIONS, LOG_LEVELS, na(), Route (+5 more)

### Community 17 - "Community 17"
Cohesion: 0.08
Nodes (24): cancelMyChange, getAttachmentUrl, getMyDashboard, logLogin, markAllNotificationsRead, markNotificationRead, portalCompleteOnboarding, portalCompleteTutorial (+16 more)

### Community 18 - "Community 18"
Cohesion: 0.09
Nodes (12): ACTIVITY_LABEL, initials(), LeadDetail(), relTime(), SortKey, SORTS, Status, STATUS_COLOR (+4 more)

### Community 19 - "Community 19"
Cohesion: 0.09
Nodes (23): ADMIN_LIKE, adminArchiveChange, adminAssignChange, adminBulkArchive, adminChangeAccountRole, adminCreateTempAccount, adminGetAccountDetail, adminHardDeleteAccount (+15 more)

### Community 20 - "Community 20"
Cohesion: 0.14
Nodes (22): renderErrorPage(), applyAssetCaching(), applyRateLimit(), applySecurityHeaders(), brandedErrorResponse(), brotliCompressAsync, compressedAssetCache, compressionInFlight (+14 more)

### Community 21 - "Community 21"
Cohesion: 0.11
Nodes (18): Bloom, Branch, build(), buildLeaves(), DETAIL_PAGE, EmberGroup, fadeUp(), FORK (+10 more)

### Community 22 - "Community 22"
Cohesion: 0.14
Nodes (20): assertHttpUrl(), BLOCKED_HOSTNAMES, BLOCKED_IPV4_RANGES, CategoryScore, CheckResult, CheckStatus, FetchedPage, fetchSafely() (+12 more)

### Community 23 - "Community 23"
Cohesion: 0.12
Nodes (5): Route, BerichtenTab(), useConfirm(), DeletedChangesTab(), usePermissions()

### Community 24 - "Community 24"
Cohesion: 0.10
Nodes (17): ADMIN_LIKE, getAlerts, getDailyCheckLatest, getHetznerCostsHistory, getHetznerCostsLatest, getLogsExportCsv, getMetricsCompareWeeks, getMetricsExportCsv (+9 more)

### Community 25 - "Community 25"
Cohesion: 0.11
Nodes (6): ONBOARDING_STATUS_COLOR, ONBOARDING_STATUS_LABEL, ROLE_LABEL, Route, STAFF_BASE_ROLES, TelegramMfaCard()

### Community 26 - "Community 26"
Cohesion: 0.13
Nodes (11): EXAMPLE, getFindings(), GROUPS, HERO_CATEGORIES, isLikelyValidUrl(), ReportCard(), Route, scoreVerdict() (+3 more)

### Community 27 - "Community 27"
Cohesion: 0.13
Nodes (14): BAN_DURATIONS_MS, BanEntry, bans, checkRateLimit(), Entry, getClientIp(), isIpBanned(), recordStrike() (+6 more)

### Community 28 - "Community 28"
Cohesion: 0.12
Nodes (7): ContactBlock, Contacts, fadeVariants, FormState, PortalOnboardingTour(), Profile, STEP_TITLES

### Community 29 - "Community 29"
Cohesion: 0.13
Nodes (11): Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, DialogContent (+3 more)

### Community 30 - "Community 30"
Cohesion: 0.12
Nodes (10): Menubar, MenubarCheckboxItem, MenubarContent, MenubarItem, MenubarLabel, MenubarRadioItem, MenubarSeparator, MenubarSubContent (+2 more)

### Community 31 - "Community 31"
Cohesion: 0.14
Nodes (7): AnalyticsLoader(), CookiePrefs, businessIdentityJsonLd(), postalAddress(), Route, Toaster(), ToasterProps

### Community 32 - "Community 32"
Cohesion: 0.18
Nodes (10): addDays(), CallbackAgenda(), CallbackItem(), fmtDayLabel(), fmtTime(), isToday(), sameDay(), startOfDay() (+2 more)

### Community 33 - "Community 33"
Cohesion: 0.17
Nodes (8): ChatWidget(), Message, AuthCtx, AuthProvider(), Ctx, useAuth(), Route, supabase

### Community 34 - "Community 34"
Cohesion: 0.13
Nodes (6): ContactBlock, Contacts, fadeVariants, FormState, OnboardingWizard(), STEP_TITLES

### Community 35 - "Community 35"
Cohesion: 0.14
Nodes (12): requireSupabaseAuth, supabaseAdmin, CompositeTypes, Constants, Database, DatabaseWithoutInternals, DefaultSchema, Enums (+4 more)

### Community 36 - "Community 36"
Cohesion: 0.16
Nodes (6): Button, ButtonProps, buttonVariants, PaginationContent, PaginationItem, PaginationLinkProps

### Community 37 - "Community 37"
Cohesion: 0.14
Nodes (9): 02d6137 fixes, 7443b54 Fix root cause: catch Supabase Realtime WebSocket crashes, 99bd8ac Surface site_errors in the account Activiteit tab, bbc9d80 Surface site_errors in the account Activiteit tab, dbd0657 Log server-side (SSR) crashes to site_errors too, f2eb4fe Fix root cause: catch Supabase Realtime WebSocket crashes, AdminChatPanel(), ChatRow (+1 more)

### Community 38 - "Community 38"
Cohesion: 0.15
Nodes (5): adminCreateCustomer(), adminInviteStaffMember(), generateTempPassword(), genTempPw(), STAFF

### Community 39 - "Community 39"
Cohesion: 0.13
Nodes (13): adminCreateRecipient, adminDeleteRecipient, adminGenerateRecipientLink, adminGenerateTelegramLink, adminGetTelegramStatus, adminListRecipients, adminSetMfaEnabled, adminSetRecipientNotify (+5 more)

### Community 40 - "Community 40"
Cohesion: 0.24
Nodes (11): auth.users, change_requests_touch, on_auth_user_created, profiles_touch, public.change_requests, public.extra_credits, public.handle_new_user(), public.notifications (+3 more)

### Community 41 - "Community 41"
Cohesion: 0.14
Nodes (11): FormControl, FormDescription, FormFieldContext, FormFieldContextValue, FormItem, FormItemContext, FormItemContextValue, FormLabel (+3 more)

### Community 42 - "Community 42"
Cohesion: 0.18
Nodes (6): ALL_PERMISSIONS, ROLE_LABEL, Route, TabsContent, TabsList, TabsTrigger

### Community 43 - "Community 43"
Cohesion: 0.16
Nodes (8): 2fcc9a3 fixes, 7f7208a new, 81a87ed commit, a2681a9 ewa, ee6f2e6 fixes, auth.users, public.roles, public.user_custom_roles

### Community 44 - "Community 44"
Cohesion: 0.23
Nodes (9): TeamTab(), ensurePermission(), getEffectivePermissions(), ALL_PERMISSION_ACTIONS, AppRole, can(), PermissionAction, ROLE_LABEL (+1 more)

### Community 45 - "Community 45"
Cohesion: 0.14
Nodes (12): Carousel, CarouselApi, CarouselContent, CarouselContext, CarouselContextProps, CarouselItem, CarouselNext, CarouselOptions (+4 more)

### Community 46 - "Community 46"
Cohesion: 0.19
Nodes (10): CallbackScheduleForm(), CallbackScheduleValue, AGENDA_COLOR_CLASSES, AgendaColor, CALLBACK_OUTCOMES, CALLBACK_REASONS, CALLBACK_STATUS_LABEL, CallbackStatus (+2 more)

### Community 47 - "Community 47"
Cohesion: 0.18
Nodes (6): ACCOUNT_STATUS_COLOR, ACCOUNT_STATUS_LABEL, AccountsListSection(), accountStatus(), Route, Section

### Community 48 - "Community 48"
Cohesion: 0.18
Nodes (5): ROLE_LABEL, Route, Section, STAFF_BASE_ROLES, Skeleton()

### Community 49 - "Community 49"
Cohesion: 0.20
Nodes (5): 3417a43 fixes, 4510b3f perf fixes, 7dbbf18 perf fixes, 9c1fa06 perf fixes, 9d0b477 perf fixes

### Community 50 - "Community 50"
Cohesion: 0.24
Nodes (11): auth.users, on_auth_user_created, public.change_attachments, public.change_comments, public.change_requests, public.customer_costs, public.handle_new_user(), public.onboarding_items (+3 more)

### Community 51 - "Community 51"
Cohesion: 0.20
Nodes (5): a3773ee sec fixes, c27ffd9 fixes, escapeHtml(), sendWelcomeEmail(), transporter

### Community 52 - "Community 52"
Cohesion: 0.18
Nodes (7): ChartConfig, ChartContainer, ChartContext, ChartContextProps, ChartLegendContent, ChartTooltipContent, THEMES

### Community 53 - "Community 53"
Cohesion: 0.22
Nodes (7): Route, SectionKey, SECTIONS, f958216 leads functions, LeadsPanel(), lead_callbacks, leads

### Community 54 - "Community 54"
Cohesion: 0.24
Nodes (6): 74ecdc1 code fixes, assertPublicHost(), DayUptime, isPrivateOrReservedIp(), measureResponseTime(), MonitoringStats

### Community 55 - "Community 55"
Cohesion: 0.20
Nodes (8): ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuSubContent, ContextMenuSubTrigger

### Community 56 - "Community 56"
Cohesion: 0.20
Nodes (8): DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuSubContent, DropdownMenuSubTrigger

### Community 57 - "Community 57"
Cohesion: 0.22
Nodes (8): 032ba88 SEO, 7a63e47 chore: graphify graph bijgewerkt, ef44acd feat(seo): sitemap + llms.txt aangevuld met alle nieuwe pagina's, fa2ea52 feat(seo): nav + uitgebreide footer met interne links (geen orphan pages), PAGE_DATES, LASTMOD, Route, SitemapEntry

### Community 58 - "Community 58"
Cohesion: 0.25
Nodes (7): 2d50590 wip: lokale wijzigingen voor pull, isAuthorized(), Route, timingSafeStringEqual(), Body, cors, Route

### Community 59 - "Community 59"
Cohesion: 0.22
Nodes (7): e84aa2e hoofdpagina, AnswerBlock(), facts, HOOGEVEEN, prices, VEENDAM, W

### Community 60 - "Community 60"
Cohesion: 0.33
Nodes (8): ensureAdmin(), ensureRoles(), ensureStaff(), ensureSuperAdmin(), getRoles(), ADMIN_LIKE_ROLES, STAFF_GUARD_ROLES, SUPER_ADMIN_ROLES

### Community 61 - "Community 61"
Cohesion: 0.22
Nodes (6): ADMIN_LIKE, adminDeleteContactSubmission, adminListContactSubmissions, adminToggleContactHandled, STAFF_ROLES, submitContactForm

### Community 62 - "Community 62"
Cohesion: 0.28
Nodes (7): CsvParseResult, detectDelimiter(), HEADER_ALIASES, parseCsv(), ParsedLead, parseLeadsCsv(), TRUE_VALUES

### Community 63 - "Community 63"
Cohesion: 0.44
Nodes (8): auth.users, public.project_milestone_dependencies, public.project_milestones, public.project_task_time_entries, public.project_tasks, public.project_template_milestones, public.project_templates, public.projects

### Community 64 - "Community 64"
Cohesion: 0.31
Nodes (8): dns_checks, monitoring_alerts, profiles, project_members, projects, role_permissions, site_response_times, ssl_checks

### Community 65 - "Community 65"
Cohesion: 0.22
Nodes (8): Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow

### Community 66 - "Community 66"
Cohesion: 0.39
Nodes (6): public.check_rate_limit(), public.rate_limit_bans, public.rate_limit_hits, public.record_strike(), v_count, v_strikes

### Community 67 - "Community 67"
Cohesion: 0.25
Nodes (5): Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage

### Community 68 - "Community 68"
Cohesion: 0.25
Nodes (4): DrawerContent, DrawerDescription, DrawerOverlay, DrawerTitle

### Community 69 - "Community 69"
Cohesion: 0.25
Nodes (7): NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle, NavigationMenuViewport

### Community 70 - "Community 70"
Cohesion: 0.25
Nodes (7): SelectContent, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger

### Community 71 - "Community 71"
Cohesion: 0.29
Nodes (6): Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle

### Community 72 - "Community 72"
Cohesion: 0.33
Nodes (5): ToggleGroup, ToggleGroupContext, ToggleGroupItem, Toggle, toggleVariants

### Community 73 - "Community 73"
Cohesion: 0.33
Nodes (6): 3901302 Fix mojibake in admin dashboard and GET-blocking rate limit bug, 4b4ebd9 Catch getSession() network errors in the auth route guard, 6b21362 Catch login network errors instead of crashing to the error boundary, 6da1e20 Log root error boundary crashes to site_errors for visibility, 7f807c8 Catch login network errors instead of crashing to the error boundary, f7b9fd5 Merge branch 'main' of https://github.com/MilanDijksterhuis/aimi-digital-craft

### Community 74 - "Community 74"
Cohesion: 0.33
Nodes (6): ensureAdmin(), ensureLeadsAccess(), ensureRoles(), ensureStaff(), ensureSuperAdmin(), getRoles()

### Community 75 - "Community 75"
Cohesion: 0.53
Nodes (5): public.chat_messages, public.chats, public.touch_chat_last_message(), public.user_presence, trg_touch_chat_last_message

### Community 76 - "Community 76"
Cohesion: 0.33
Nodes (1): public.audit_log

### Community 77 - "Community 77"
Cohesion: 0.40
Nodes (2): d38d9ab Add IndexNow key route, Route

### Community 78 - "Community 78"
Cohesion: 0.40
Nodes (4): public.client_contacts, public.login_events, public.site_errors, public.site_pings

### Community 79 - "Community 79"
Cohesion: 0.50
Nodes (3): errorMiddleware, startInstance, attachSupabaseAuth

### Community 80 - "Community 80"
Cohesion: 0.40
Nodes (4): InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot

### Community 81 - "Community 81"
Cohesion: 0.50
Nodes (2): dda7a04 web tester, public.website_checks

### Community 82 - "Community 82"
Cohesion: 0.67
Nodes (3): Badge(), BadgeProps, badgeVariants

### Community 83 - "Community 83"
Cohesion: 0.67
Nodes (1): Route

### Community 84 - "Community 84"
Cohesion: 0.67
Nodes (1): consumeLastCapturedError()

### Community 85 - "Community 85"
Cohesion: 0.67
Nodes (2): public.extra_change_requests, public.password_reset_requests

### Community 86 - "Community 86"
Cohesion: 0.67
Nodes (2): cors, Route

### Community 87 - "Community 87"
Cohesion: 1.00
Nodes (2): lead_activities, leads

### Community 88 - "Community 88"
Cohesion: 1.00
Nodes (2): generateDueRecurringTaskInstances(), nextRecurrenceDueDate()

### Community 89 - "Community 89"
Cohesion: 1.00
Nodes (1): public.appointments

### Community 95 - "Community 95"
Cohesion: 1.00
Nodes (1): public.contact_submissions

## Knowledge Gaps
- **761 isolated node(s):** `Message`, `ChatRow`, `CookiePrefs`, `VEENDAM`, `HOOGEVEEN` (+756 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 76`** (1 nodes): `public.audit_log`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 77`** (2 nodes): `d38d9ab Add IndexNow key route`, `Route`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 81`** (2 nodes): `dda7a04 web tester`, `public.website_checks`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 83`** (1 nodes): `Route`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 84`** (1 nodes): `consumeLastCapturedError()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 85`** (2 nodes): `public.extra_change_requests`, `public.password_reset_requests`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 86`** (2 nodes): `cors`, `Route`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 87`** (2 nodes): `lead_activities`, `leads`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 88`** (2 nodes): `generateDueRecurringTaskInstances()`, `nextRecurrenceDueDate()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 89`** (1 nodes): `public.appointments`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 95`** (1 nodes): `public.contact_submissions`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 9` to `Community 10`, `Community 82`, `Community 67`, `Community 36`, `Community 71`, `Community 45`, `Community 52`, `Community 29`, `Community 55`, `Community 68`, `Community 56`, `Community 41`, `Community 8`, `Community 80`, `Community 30`, `Community 69`, `Community 70`, `Community 48`, `Community 65`, `Community 42`, `Community 72`?**
  _High betweenness centrality (0.092) - this node is a cross-community bridge._
- **Why does `Skeleton()` connect `Community 48` to `Community 23`, `Community 47`, `Community 25`, `Community 13`, `Community 11`, `Community 10`, `Community 42`, `Community 14`, `Community 8`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **What connects `Message`, `ChatRow`, `CookiePrefs` to the rest of the system?**
  _761 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.06877892222719809 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.014084507042253521 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.015384615384615385 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.03702924468756575 - nodes in this community are weakly interconnected._