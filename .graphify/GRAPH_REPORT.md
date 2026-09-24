# Graph Report - .  (2026-09-24)

## Corpus Check
- Large corpus: 1312 files · ~1.186.333 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder, or use --no-semantic to run AST-only.

## Summary
- 2249 nodes · 6222 edges · 96 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output
- Edge kinds: contains: 1672 · ON_BRANCH: 1667 · MODIFIES: 1103 · imports: 737 · imports_from: 448 · PARENT_OF: 312 · calls: 230 · references: 31 · reads_from: 9 · triggers: 6 · method: 5 · inherits: 1 · rationale_for: 1


## Input Scope
- Requested: auto
- Resolved: committed (source: default-auto)
- Included files: 1312 · Candidates: 2171
- Excluded: 16 untracked · 37127 ignored · 8 sensitive · 10 missing committed
- Recommendation: Use --scope all or graphify.yaml inputs.corpus for a knowledge-base folder.

## Graph Freshness
- Built from Git commit: `65ab188`
- Compare this hash to `git rev-parse HEAD` before trusting freshness-sensitive graph output.
## God Nodes (most connected - your core abstractions)
1. `breadcrumbJsonLd()` - 49 edges
2. `cn()` - 45 edges
3. `faqJsonLd()` - 42 edges
4. `serviceJsonLd()` - 39 edges
5. `Footer()` - 22 edges
6. `CookieBanner()` - 20 edges
7. `Nav()` - 20 edges
8. `cityOgImage()` - 17 edges
9. `BranchPageData` - 16 edges
10. `BranchPage()` - 16 edges

## Surprising Connections (you probably didn't know these)
- `02d6137 fixes` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 32 → community 0_
- `032ba88 SEO` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 8 → community 0_
- `04564c5 fixes` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 11 → community 0_
- `04564c5 fixes` --PARENT_OF--> `36d8ccb new pages`  [EXTRACTED]
  git → git  _Bridges community 11 → community 3_
- `13e217a SEO` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 3 → community 0_

## Communities

### Community 0 - "Community 0"
Cohesion: 0.06
Nodes (225): Route, main, seo-verbetering, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal (+217 more)

### Community 1 - "Community 1"
Cohesion: 0.01
Nodes (136): ADMIN_LIKE_ROLES, adminAddCost, adminAddLeadActivity, adminAddMilestoneDependency, adminAddOnboardingItem, adminArchiveProject, adminAssignCustomRole, adminAttachmentUrl (+128 more)

### Community 2 - "Community 2"
Cohesion: 0.02
Nodes (130): Route, Route, Route, Route, Route, Route, Route, Route (+122 more)

### Community 3 - "Community 3"
Cohesion: 0.08
Nodes (63): 13e217a SEO, 36d8ccb new pages, 4a960c6 SEO, aabf034 SEO, b5c2a22 blog, c27f4c8 new, BranchPage(), BranchPageData (+55 more)

### Community 4 - "Community 4"
Cohesion: 0.04
Nodes (58): 59bb970 eyoo, 6262799 fixes, 6e488ba fixes, 85a6666 SEO en robot, 8af95bc backlink, cc405f4 pagina updates, e84aa2e hoofdpagina, AnswerBlock() (+50 more)

### Community 5 - "Community 5"
Cohesion: 0.06
Nodes (50): 65ab188 fixes, boot(), cdnScriptFor(), collectProps(), compileAttr(), compileTemplate(), contentKey(), createComponentFactory() (+42 more)

### Community 6 - "Community 6"
Cohesion: 0.06
Nodes (49): boot(), cdnScriptFor(), collectProps(), compileAttr(), compileTemplate(), contentKey(), createComponentFactory(), createExternalModules() (+41 more)

### Community 7 - "Community 7"
Cohesion: 0.06
Nodes (29): ONBOARDING_STATUS_COLOR, ONBOARDING_STATUS_LABEL, ROLE_LABEL, Route, STAFF_BASE_ROLES, ALL_PERMISSIONS, ROLE_LABEL, Route (+21 more)

### Community 8 - "Community 8"
Cohesion: 0.08
Nodes (43): 032ba88 SEO, 04c01f8 SEO, 1c0e00f fixes, 2d81f50 feat(seo): vervang /cases door eerlijke /werkwijze-pagina; geen valse projectclaims, 5d3df91 new, 7a63e47 chore: graphify graph bijgewerkt, 8fdd571 SEO, 9965896 feat(seo): contact- en cases-pagina met LocalBusiness/Breadcrumb schema (+35 more)

### Community 9 - "Community 9"
Cohesion: 0.06
Nodes (31): DISK_DAYS_OPTIONS, formatServerAge(), formatSslDate(), formatUptime(), HOURS_OPTIONS, LOG_LEVELS, na(), Route (+23 more)

### Community 10 - "Community 10"
Cohesion: 0.05
Nodes (37): useIsMobile(), Input, Separator, SheetContent, SheetContentProps, SheetDescription, SheetHeader(), SheetOverlay (+29 more)

### Community 11 - "Community 11"
Cohesion: 0.07
Nodes (26): 04564c5 fixes, BranchLinks(), FAQ(), FAQ_CATEGORIES, FaqCategory, FaqGrouped(), FaqItem, faqItems (+18 more)

### Community 12 - "Community 12"
Cohesion: 0.07
Nodes (22): ALLOWED_ATTACHMENT_MIME, ChangeCard(), FILTER_LABEL, FilterKey, mapStatus(), matchesFilter(), Route, STATUS_STYLE (+14 more)

### Community 13 - "Community 13"
Cohesion: 0.08
Nodes (15): Route, Section, MonitoringSection(), Route, timeAgo(), isProjectOverdue(), PROJECT_PRIORITY_COLOR, PROJECT_PRIORITY_LABEL (+7 more)

### Community 14 - "Community 14"
Cohesion: 0.10
Nodes (28): consumeLastCapturedError(), renderErrorPage(), applyAssetCaching(), applyRateLimit(), applySecurityHeaders(), brandedErrorResponse(), brotliCompressAsync, compressedAssetCache (+20 more)

### Community 15 - "Community 15"
Cohesion: 0.08
Nodes (18): cn(), AccordionContent, AccordionItem, AccordionTrigger, Avatar, AvatarFallback, AvatarImage, Checkbox (+10 more)

### Community 16 - "Community 16"
Cohesion: 0.09
Nodes (15): Route, Route, Section, DeletedChangesTab(), BLOG_STATUS_LABEL, CATEGORY_KEYS, CATEGORY_LABEL, CHANGE_TEMPLATES (+7 more)

### Community 17 - "Community 17"
Cohesion: 0.08
Nodes (19): 7a80ccf docs(seo): volledige SEO-audit 2026-09-20 (root cause dip + site-breed), e543723 Merge pull request #1 from MilanDijksterhuis/claude/aimi-seo-audit-dgsf4h, f80d1a3 blur, Breadcrumbs(), Crumb, ExampleSlideshow(), LOCAL_SERVICES, LocationSectionId (+11 more)

### Community 18 - "Community 18"
Cohesion: 0.10
Nodes (18): 6ccd4dc CMS, ALLOWED_IMAGE_MIME, BlogPostForm(), isoToLocalInput(), BlogPostLinksPanel(), countBodyImagesWithoutAlt(), extractInternalLinks(), hasInternalLink() (+10 more)

### Community 19 - "Community 19"
Cohesion: 0.09
Nodes (21): 2d50590 wip: lokale wijzigingen voor pull, isAuthorized(), Route, timingSafeStringEqual(), BAN_DURATIONS_MS, BanEntry, bans, checkRateLimit() (+13 more)

### Community 20 - "Community 20"
Cohesion: 0.11
Nodes (16): addDays(), BulkScheduleOptions, computeScheduleDates(), rollToWorkday(), adminCreateBlogPostImpl(), adminDuplicateBlogPostImpl(), adminSuggestLinkTargetsImpl(), adminUpdateBlogPostImpl() (+8 more)

### Community 21 - "Community 21"
Cohesion: 0.08
Nodes (24): cancelMyChange, getAttachmentUrl, getMyDashboard, logLogin, markAllNotificationsRead, markNotificationRead, portalCompleteOnboarding, portalCompleteTutorial (+16 more)

### Community 22 - "Community 22"
Cohesion: 0.10
Nodes (20): b48bbc0 chore: snapshot lokale SEO-pagina's (Veendam/Hoogeveen) + sitemap, fc7da2d animaties en paginas, Bloom, Branch, build(), buildLeaves(), DETAIL_PAGE, EmberGroup (+12 more)

### Community 23 - "Community 23"
Cohesion: 0.09
Nodes (22): adminBulkDeleteBlogPosts, adminBulkScheduleBlogPosts, adminBulkSetBlogPostStatus, adminBulkShiftBlogPosts, adminCreateBlogPost, adminDeleteBlogPost, adminDuplicateBlogPost, adminGetBlogPost (+14 more)

### Community 24 - "Community 24"
Cohesion: 0.09
Nodes (12): ACTIVITY_LABEL, initials(), LeadDetail(), relTime(), SortKey, SORTS, Status, STATUS_COLOR (+4 more)

### Community 25 - "Community 25"
Cohesion: 0.09
Nodes (23): ADMIN_LIKE, adminArchiveChange, adminAssignChange, adminBulkArchive, adminChangeAccountRole, adminCreateTempAccount, adminGetAccountDetail, adminHardDeleteAccount (+15 more)

### Community 26 - "Community 26"
Cohesion: 0.14
Nodes (20): assertHttpUrl(), BLOCKED_HOSTNAMES, BLOCKED_IPV4_RANGES, CategoryScore, CheckResult, CheckStatus, FetchedPage, fetchSafely() (+12 more)

### Community 27 - "Community 27"
Cohesion: 0.10
Nodes (17): ADMIN_LIKE, getAlerts, getDailyCheckLatest, getHetznerCostsHistory, getHetznerCostsLatest, getLogsExportCsv, getMetricsCompareWeeks, getMetricsExportCsv (+9 more)

### Community 28 - "Community 28"
Cohesion: 0.13
Nodes (11): EXAMPLE, getFindings(), GROUPS, HERO_CATEGORIES, isLikelyValidUrl(), ReportCard(), Route, scoreVerdict() (+3 more)

### Community 29 - "Community 29"
Cohesion: 0.13
Nodes (8): Route, Section, TabKey, BlogCalendar(), PostLite, BulkScheduleDialog(), RedirectsPanel(), BLOG_STATUS_COLOR

### Community 30 - "Community 30"
Cohesion: 0.13
Nodes (5): RECURRENCE_LABEL, Route, TabsContent, TabsList, TabsTrigger

### Community 31 - "Community 31"
Cohesion: 0.13
Nodes (8): Route, ROLE_LABEL, Route, Section, STAFF_BASE_ROLES, BlogPostFaqItem, BlogPostFormPayload, Skeleton()

### Community 32 - "Community 32"
Cohesion: 0.13
Nodes (11): 02d6137 fixes, 2189780 fixes, 5d1e827 Log server-side (SSR) crashes to site_errors too, 7443b54 Fix root cause: catch Supabase Realtime WebSocket crashes, 99bd8ac Surface site_errors in the account Activiteit tab, bbc9d80 Surface site_errors in the account Activiteit tab, c27ffd9 fixes, f2eb4fe Fix root cause: catch Supabase Realtime WebSocket crashes (+3 more)

### Community 33 - "Community 33"
Cohesion: 0.12
Nodes (7): ContactBlock, Contacts, fadeVariants, FormState, PortalOnboardingTour(), Profile, STEP_TITLES

### Community 34 - "Community 34"
Cohesion: 0.17
Nodes (8): AuthCtx, AuthProvider(), Ctx, useAuth(), Route, Route, Route, supabase

### Community 35 - "Community 35"
Cohesion: 0.12
Nodes (15): byFullPathMatch, dupes, errors, EXCLUDE_EXACT, migrationFiles, migrationsDir, pageDatesMatch, pageDatesSet (+7 more)

### Community 36 - "Community 36"
Cohesion: 0.12
Nodes (10): Menubar, MenubarCheckboxItem, MenubarContent, MenubarItem, MenubarLabel, MenubarRadioItem, MenubarSeparator, MenubarSubContent (+2 more)

### Community 37 - "Community 37"
Cohesion: 0.18
Nodes (10): addDays(), CallbackAgenda(), CallbackItem(), fmtDayLabel(), fmtTime(), isToday(), sameDay(), startOfDay() (+2 more)

### Community 38 - "Community 38"
Cohesion: 0.13
Nodes (6): ContactBlock, Contacts, fadeVariants, FormState, OnboardingWizard(), STEP_TITLES

### Community 39 - "Community 39"
Cohesion: 0.16
Nodes (6): Button, ButtonProps, buttonVariants, PaginationContent, PaginationItem, PaginationLinkProps

### Community 40 - "Community 40"
Cohesion: 0.15
Nodes (5): 1727351 blog, public.blog_posts, public.post_links, auth.users, public.redirects

### Community 41 - "Community 41"
Cohesion: 0.20
Nodes (11): InternalLinkPicker(), LinkPickTarget, CORE_PAGES, Command, CommandDialog(), CommandEmpty, CommandGroup, CommandInput (+3 more)

### Community 42 - "Community 42"
Cohesion: 0.15
Nodes (5): adminCreateCustomer(), adminInviteStaffMember(), generateTempPassword(), genTempPw(), STAFF

### Community 43 - "Community 43"
Cohesion: 0.13
Nodes (13): adminCreateRecipient, adminDeleteRecipient, adminGenerateRecipientLink, adminGenerateTelegramLink, adminGetTelegramStatus, adminListRecipients, adminSetMfaEnabled, adminSetRecipientNotify (+5 more)

### Community 44 - "Community 44"
Cohesion: 0.24
Nodes (11): auth.users, change_requests_touch, on_auth_user_created, profiles_touch, public.change_requests, public.extra_credits, public.handle_new_user(), public.notifications (+3 more)

### Community 45 - "Community 45"
Cohesion: 0.14
Nodes (11): FormControl, FormDescription, FormFieldContext, FormFieldContextValue, FormItem, FormItemContext, FormItemContextValue, FormLabel (+3 more)

### Community 46 - "Community 46"
Cohesion: 0.16
Nodes (8): 2fcc9a3 fixes, 7f7208a new, 81a87ed commit, a2681a9 ewa, ee6f2e6 fixes, auth.users, public.roles, public.user_custom_roles

### Community 47 - "Community 47"
Cohesion: 0.16
Nodes (5): AnalyticsLoader(), CookiePrefs, Route, Toaster(), ToasterProps

### Community 48 - "Community 48"
Cohesion: 0.15
Nodes (11): supabaseAdmin, CompositeTypes, Constants, Database, DatabaseWithoutInternals, DefaultSchema, Enums, Json (+3 more)

### Community 49 - "Community 49"
Cohesion: 0.14
Nodes (12): Carousel, CarouselApi, CarouselContent, CarouselContext, CarouselContextProps, CarouselItem, CarouselNext, CarouselOptions (+4 more)

### Community 50 - "Community 50"
Cohesion: 0.15
Nodes (9): 3417a43 fixes, 74ecdc1 code fixes, 9c1fa06 perf fixes, ADMIN_LIKE, adminDeleteContactSubmission, adminListContactSubmissions, adminToggleContactHandled, STAFF_ROLES (+1 more)

### Community 51 - "Community 51"
Cohesion: 0.19
Nodes (10): CallbackScheduleForm(), CallbackScheduleValue, AGENDA_COLOR_CLASSES, AgendaColor, CALLBACK_OUTCOMES, CALLBACK_REASONS, CALLBACK_STATUS_LABEL, CallbackStatus (+2 more)

### Community 52 - "Community 52"
Cohesion: 0.18
Nodes (6): ACCOUNT_STATUS_COLOR, ACCOUNT_STATUS_LABEL, AccountsListSection(), accountStatus(), Route, Section

### Community 53 - "Community 53"
Cohesion: 0.24
Nodes (9): botToken(), botUsername(), generateAndSendMfaCode(), generateLinkToken(), handleTelegramWebhook(), LinkScope, safeSend(), sendTelegramMessage() (+1 more)

### Community 54 - "Community 54"
Cohesion: 0.24
Nodes (11): auth.users, on_auth_user_created, public.change_attachments, public.change_comments, public.change_requests, public.customer_costs, public.handle_new_user(), public.onboarding_items (+3 more)

### Community 55 - "Community 55"
Cohesion: 0.18
Nodes (5): Route, 171eb96 leads functions, 2b1d78f telegram, bc842b8 leads functions, Route

### Community 56 - "Community 56"
Cohesion: 0.20
Nodes (9): 1713634 fixes, 3901302 Fix mojibake in admin dashboard and GET-blocking rate limit bug, 4b4ebd9 Catch getSession() network errors in the auth route guard, 6b21362 Catch login network errors instead of crashing to the error boundary, 6da1e20 Log root error boundary crashes to site_errors for visibility, 7f807c8 Catch login network errors instead of crashing to the error boundary, dbd0657 Log server-side (SSR) crashes to site_errors too, f7b9fd5 Merge branch 'main' of https://github.com/MilanDijksterhuis/aimi-digital-craft (+1 more)

### Community 57 - "Community 57"
Cohesion: 0.20
Nodes (4): HTMLParser, analyze(), Extract, Crawl sitemap URLs and extract on-page SEO signals into crawl-data.json.

### Community 58 - "Community 58"
Cohesion: 0.18
Nodes (7): ChartConfig, ChartContainer, ChartContext, ChartContextProps, ChartLegendContent, ChartTooltipContent, THEMES

### Community 59 - "Community 59"
Cohesion: 0.24
Nodes (3): 4510b3f perf fixes, 7dbbf18 perf fixes, 9d0b477 perf fixes

### Community 60 - "Community 60"
Cohesion: 0.22
Nodes (4): a3773ee sec fixes, escapeHtml(), sendWelcomeEmail(), transporter

### Community 61 - "Community 61"
Cohesion: 0.29
Nodes (7): PostLite, DialogContent, DialogDescription, DialogFooter(), DialogHeader(), DialogOverlay, DialogTitle

### Community 62 - "Community 62"
Cohesion: 0.20
Nodes (8): ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuSubContent, ContextMenuSubTrigger

### Community 63 - "Community 63"
Cohesion: 0.20
Nodes (8): DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuSubContent, DropdownMenuSubTrigger

### Community 64 - "Community 64"
Cohesion: 0.31
Nodes (8): dns_checks, monitoring_alerts, profiles, project_members, projects, role_permissions, site_response_times, ssl_checks

### Community 65 - "Community 65"
Cohesion: 0.28
Nodes (7): CsvParseResult, detectDelimiter(), HEADER_ALIASES, parseCsv(), ParsedLead, parseLeadsCsv(), TRUE_VALUES

### Community 66 - "Community 66"
Cohesion: 0.44
Nodes (8): auth.users, public.project_milestone_dependencies, public.project_milestones, public.project_task_time_entries, public.project_tasks, public.project_template_milestones, public.project_templates, public.projects

### Community 67 - "Community 67"
Cohesion: 0.22
Nodes (8): Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow

### Community 68 - "Community 68"
Cohesion: 0.32
Nodes (5): assertPublicHost(), DayUptime, isPrivateOrReservedIp(), measureResponseTime(), MonitoringStats

### Community 69 - "Community 69"
Cohesion: 0.39
Nodes (6): public.check_rate_limit(), public.rate_limit_bans, public.rate_limit_hits, public.record_strike(), v_count, v_strikes

### Community 70 - "Community 70"
Cohesion: 0.32
Nodes (7): __dirname, loadEnv(), log(), LOG_DIR, LOG_FILE, main(), REPO_ROOT

### Community 71 - "Community 71"
Cohesion: 0.25
Nodes (5): Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage

### Community 72 - "Community 72"
Cohesion: 0.25
Nodes (4): DrawerContent, DrawerDescription, DrawerOverlay, DrawerTitle

### Community 73 - "Community 73"
Cohesion: 0.25
Nodes (7): NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle, NavigationMenuViewport

### Community 74 - "Community 74"
Cohesion: 0.25
Nodes (7): SelectContent, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger

### Community 75 - "Community 75"
Cohesion: 0.29
Nodes (5): Route, SectionKey, SECTIONS, f958216 leads functions, LeadsPanel()

### Community 76 - "Community 76"
Cohesion: 0.29
Nodes (6): Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle

### Community 77 - "Community 77"
Cohesion: 0.33
Nodes (5): ToggleGroup, ToggleGroupContext, ToggleGroupItem, Toggle, toggleVariants

### Community 78 - "Community 78"
Cohesion: 0.60
Nodes (5): profiles, telegram_link_tokens, telegram_mfa_codes, telegram_notification_recipients, telegram_pending_logins

### Community 79 - "Community 79"
Cohesion: 0.33
Nodes (6): ensureAdmin(), ensureLeadsAccess(), ensureRoles(), ensureStaff(), ensureSuperAdmin(), getRoles()

### Community 80 - "Community 80"
Cohesion: 0.53
Nodes (5): public.chat_messages, public.chats, public.touch_chat_last_message(), public.user_presence, trg_touch_chat_last_message

### Community 81 - "Community 81"
Cohesion: 0.33
Nodes (1): public.audit_log

### Community 82 - "Community 82"
Cohesion: 0.40
Nodes (2): d38d9ab Add IndexNow key route, Route

### Community 83 - "Community 83"
Cohesion: 0.40
Nodes (4): public.client_contacts, public.login_events, public.site_errors, public.site_pings

### Community 84 - "Community 84"
Cohesion: 0.40
Nodes (4): Alert, AlertDescription, AlertTitle, alertVariants

### Community 85 - "Community 85"
Cohesion: 0.40
Nodes (4): InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot

### Community 86 - "Community 86"
Cohesion: 0.50
Nodes (2): dda7a04 web tester, public.website_checks

### Community 87 - "Community 87"
Cohesion: 0.83
Nodes (3): auth.users, blog_posts_touch_updated_at, public.blog_posts

### Community 88 - "Community 88"
Cohesion: 0.67
Nodes (3): Badge(), BadgeProps, badgeVariants

### Community 89 - "Community 89"
Cohesion: 1.00
Nodes (2): lead_callbacks, leads

### Community 90 - "Community 90"
Cohesion: 1.00
Nodes (2): lead_activities, leads

### Community 91 - "Community 91"
Cohesion: 0.67
Nodes (2): public.extra_change_requests, public.password_reset_requests

### Community 92 - "Community 92"
Cohesion: 0.67
Nodes (2): cors, Route

### Community 93 - "Community 93"
Cohesion: 1.00
Nodes (2): generateDueRecurringTaskInstances(), nextRecurrenceDueDate()

### Community 94 - "Community 94"
Cohesion: 1.00
Nodes (1): public.appointments

### Community 100 - "Community 100"
Cohesion: 1.00
Nodes (1): public.contact_submissions

## Knowledge Gaps
- **809 isolated node(s):** `Crawl sitemap URLs and extract on-page SEO signals into crawl-data.json.`, `ROOT`, `errors`, `seoSrc`, `pageDatesMatch` (+804 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 81`** (1 nodes): `public.audit_log`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 82`** (2 nodes): `d38d9ab Add IndexNow key route`, `Route`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 86`** (2 nodes): `dda7a04 web tester`, `public.website_checks`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 89`** (2 nodes): `lead_callbacks`, `leads`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 90`** (2 nodes): `lead_activities`, `leads`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 91`** (2 nodes): `public.extra_change_requests`, `public.password_reset_requests`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 92`** (2 nodes): `cors`, `Route`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 93`** (2 nodes): `generateDueRecurringTaskInstances()`, `nextRecurrenceDueDate()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 94`** (1 nodes): `public.appointments`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 100`** (1 nodes): `public.contact_submissions`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 15` to `Community 7`, `Community 84`, `Community 88`, `Community 71`, `Community 39`, `Community 76`, `Community 49`, `Community 58`, `Community 41`, `Community 62`, `Community 61`, `Community 72`, `Community 63`, `Community 45`, `Community 10`, `Community 85`, `Community 36`, `Community 73`, `Community 74`, `Community 31`, `Community 67`, `Community 30`, `Community 77`?**
  _High betweenness centrality (0.080) - this node is a cross-community bridge._
- **Why does `Skeleton()` connect `Community 31` to `Community 0`, `Community 52`, `Community 7`, `Community 29`, `Community 16`, `Community 13`, `Community 30`, `Community 12`, `Community 10`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **Why does `requireSupabaseAuth` connect `Community 23` to `Community 25`, `Community 1`, `Community 50`, `Community 27`, `Community 21`, `Community 43`?**
  _High betweenness centrality (0.005) - this node is a cross-community bridge._
- **What connects `Crawl sitemap URLs and extract on-page SEO signals into crawl-data.json.`, `ROOT`, `errors` to the rest of the system?**
  _809 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.060284460489869594 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.014084507042253521 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.015267175572519083 - nodes in this community are weakly interconnected._