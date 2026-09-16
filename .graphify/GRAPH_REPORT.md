# Graph Report - .  (2026-09-16)

## Corpus Check
- Large corpus: 1227 files · ~879.238 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder, or use --no-semantic to run AST-only.

## Summary
- 2045 nodes · 5741 edges · 92 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output
- Edge kinds: ON_BRANCH: 1658 · contains: 1520 · MODIFIES: 956 · imports: 651 · imports_from: 402 · PARENT_OF: 302 · calls: 209 · references: 28 · reads_from: 9 · triggers: 5 · method: 1


## Input Scope
- Requested: auto
- Resolved: committed (source: default-auto)
- Included files: 1227 · Candidates: 1965
- Excluded: 10 untracked · 37046 ignored · 8 sensitive · 10 missing committed
- Recommendation: Use --scope all or graphify.yaml inputs.corpus for a knowledge-base folder.

## Graph Freshness
- Built from Git commit: `6e488ba`
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
  git → git  _Bridges community 27 → community 0_
- `032ba88 SEO` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 57 → community 0_
- `032ba88 SEO` --PARENT_OF--> `2d81f50 feat(seo): vervang /cases door eerlijke /werkwijze-pagina; geen valse projectclaims`  [EXTRACTED]
  git → git  _Bridges community 57 → community 4_
- `04564c5 fixes` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 29 → community 0_
- `04564c5 fixes` --PARENT_OF--> `36d8ccb new pages`  [EXTRACTED]
  git → git  _Bridges community 29 → community 3_

## Communities

### Community 6 - "Community 6"
Cohesion: 0.06
Nodes (49): getReact(), getReactDOM(), parseDcDocument(), parseDcText(), parseDataProps(), dcNameFromPath(), rootNameForDocument(), safeDecode() (+41 more)

### Community 7 - "Community 7"
Cohesion: 0.06
Nodes (49): getReact(), getReactDOM(), parseDcDocument(), parseDcText(), parseDataProps(), dcNameFromPath(), rootNameForDocument(), safeDecode() (+41 more)

### Community 4 - "Community 4"
Cohesion: 0.05
Nodes (45): Crumb, Breadcrumbs(), CookiePrefs, CookieBanner(), columns, cities, branches, Footer() (+37 more)

### Community 46 - "Community 46"
Cohesion: 0.15
Nodes (9): submitContactForm, adminListContactSubmissions, adminToggleContactHandled, adminDeleteContactSubmission, 3417a43 fixes, 74ecdc1 code fixes, 9c1fa06 perf fixes, STAFF_ROLES (+1 more)

### Community 77 - "Community 77"
Cohesion: 0.40
Nodes (2): Route, d38d9ab Add IndexNow key route

### Community 15 - "Community 15"
Cohesion: 0.10
Nodes (18): botToken(), botUsername(), sendTelegramMessage(), LinkScope, generateLinkToken(), TelegramUpdate, handleTelegramWebhook(), safeSend() (+10 more)

### Community 27 - "Community 27"
Cohesion: 0.12
Nodes (12): Message, ChatRow, AdminChatPanel(), Message, ChatWidget(), 02d6137 fixes, bbc9d80 Surface site_errors in the account Activiteit tab, f2eb4fe Fix root cause: catch Supabase Realtime WebSocket crashes (+4 more)

### Community 29 - "Community 29"
Cohesion: 0.12
Nodes (9): CookiePrefs, AnalyticsLoader(), ToasterProps, Toaster(), postalAddress(), businessIdentityJsonLd(), PRICE_VALID_UNTIL, Route (+1 more)

### Community 59 - "Community 59"
Cohesion: 0.22
Nodes (7): VEENDAM, HOOGEVEEN, AnswerBlock(), e84aa2e hoofdpagina, W, prices, facts

### Community 24 - "Community 24"
Cohesion: 0.12
Nodes (5): BerichtenTab(), useConfirm(), DeletedChangesTab(), usePermissions(), Route

### Community 3 - "Community 3"
Cohesion: 0.10
Nodes (47): BranchSectionId, BranchPageData, sectionRenderers, BranchPage(), WELLNESS_EXAMPLES, LocationPageData, LocationPageV2(), TrustStrip() (+39 more)

### Community 34 - "Community 34"
Cohesion: 0.18
Nodes (10): startOfDay(), addDays(), startOfWeek(), sameDay(), isToday(), fmtTime(), fmtDayLabel(), ViewMode (+2 more)

### Community 47 - "Community 47"
Cohesion: 0.19
Nodes (10): CallbackScheduleValue, CallbackScheduleForm(), CALLBACK_REASONS, CallbackStatus, CALLBACK_STATUS_LABEL, CALLBACK_OUTCOMES, AgendaColor, AGENDA_COLOR_CLASSES (+2 more)

### Community 11 - "Community 11"
Cohesion: 0.09
Nodes (20): ConfirmOptions, PromptOptions, ConfirmContextValue, ConfirmContext, PendingConfirm, PendingPrompt, Pending, ConfirmProvider() (+12 more)

### Community 5 - "Community 5"
Cohesion: 0.07
Nodes (54): Mode, Contact(), FAQ_CATEGORIES, FaqCategory, FaqItem, faqItems, HOMEPAGE_FAQ_QUESTIONS, homepageFaqItems (+46 more)

### Community 10 - "Community 10"
Cohesion: 0.09
Nodes (23): ServiceExample, ExampleSlideshow(), GENERIC_EXAMPLES, FaqGrouped(), LocationSectionId, LOCAL_SERVICES, sectionRenderers, Nav() (+15 more)

### Community 0 - "Community 0"
Cohesion: 0.07
Nodes (219): public.admin_notifications, 00d6931 Changes, 00e2564 voorwaaren en privacy, 0193196 monitoring, 020d807 Changes, 0332090 Changes, 05a6c9e Verbeter admin changes-tab layout en voeg verwijder-knop toe; verwijder Werk uit navigatie, 0b21971 Changes weergave verbeterd (+211 more)

### Community 18 - "Community 18"
Cohesion: 0.09
Nodes (12): STATUSES, Status, STATUS_LABEL, ACTIVITY_LABEL, STATUS_HEX, initials(), SORTS, SortKey (+4 more)

### Community 53 - "Community 53"
Cohesion: 0.22
Nodes (7): LeadsPanel(), Route, SECTIONS, SectionKey, lead_callbacks, leads, f958216 leads functions

### Community 35 - "Community 35"
Cohesion: 0.13
Nodes (6): ContactBlock, Contacts, FormState, STEP_TITLES, fadeVariants, OnboardingWizard()

### Community 30 - "Community 30"
Cohesion: 0.12
Nodes (7): ContactBlock, Contacts, FormState, Profile, STEP_TITLES, fadeVariants, PortalOnboardingTour()

### Community 13 - "Community 13"
Cohesion: 0.08
Nodes (19): Slide, SLIDES, fadeVariants, PortalTutorial(), useFormDraft(), isCategoryFree(), priceForChange(), ALLOWED_ATTACHMENT_MIME (+11 more)

### Community 44 - "Community 44"
Cohesion: 0.23
Nodes (9): TeamTab(), getEffectivePermissions(), ensurePermission(), AppRole, ROLE_LABEL, STAFF_ROLES, ALL_PERMISSION_ACTIONS, can() (+1 more)

### Community 26 - "Community 26"
Cohesion: 0.11
Nodes (6): TelegramMfaCard(), Route, ROLE_LABEL, ONBOARDING_STATUS_LABEL, ONBOARDING_STATUS_COLOR, STAFF_BASE_ROLES

### Community 9 - "Community 9"
Cohesion: 0.07
Nodes (22): AccordionItem, AccordionTrigger, AccordionContent, alertVariants, Alert, AlertTitle, AlertDescription, Avatar (+14 more)

### Community 81 - "Community 81"
Cohesion: 0.67
Nodes (3): badgeVariants, BadgeProps, Badge()

### Community 67 - "Community 67"
Cohesion: 0.25
Nodes (5): Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage

### Community 37 - "Community 37"
Cohesion: 0.16
Nodes (6): buttonVariants, ButtonProps, Button, PaginationContent, PaginationItem, PaginationLinkProps

### Community 72 - "Community 72"
Cohesion: 0.29
Nodes (6): Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter

### Community 45 - "Community 45"
Cohesion: 0.14
Nodes (12): CarouselApi, UseCarouselParameters, CarouselOptions, CarouselPlugin, CarouselProps, CarouselContextProps, CarouselContext, Carousel (+4 more)

### Community 52 - "Community 52"
Cohesion: 0.18
Nodes (7): THEMES, ChartConfig, ChartContextProps, ChartContext, ChartContainer, ChartTooltipContent, ChartLegendContent

### Community 31 - "Community 31"
Cohesion: 0.13
Nodes (11): Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandSeparator, CommandItem, DialogOverlay (+3 more)

### Community 55 - "Community 55"
Cohesion: 0.20
Nodes (8): ContextMenuSubTrigger, ContextMenuSubContent, ContextMenuContent, ContextMenuItem, ContextMenuCheckboxItem, ContextMenuRadioItem, ContextMenuLabel, ContextMenuSeparator

### Community 68 - "Community 68"
Cohesion: 0.25
Nodes (4): DrawerOverlay, DrawerContent, DrawerTitle, DrawerDescription

### Community 56 - "Community 56"
Cohesion: 0.20
Nodes (8): DropdownMenuSubTrigger, DropdownMenuSubContent, DropdownMenuContent, DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuRadioItem, DropdownMenuLabel, DropdownMenuSeparator

### Community 41 - "Community 41"
Cohesion: 0.14
Nodes (11): FormFieldContextValue, FormFieldContext, FormItemContextValue, FormItemContext, FormItem, FormLabel, FormControl, FormDescription (+3 more)

### Community 79 - "Community 79"
Cohesion: 0.40
Nodes (4): InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator

### Community 8 - "Community 8"
Cohesion: 0.05
Nodes (37): Input, Separator, SheetOverlay, sheetVariants, SheetContentProps, SheetContent, SheetHeader(), SheetTitle (+29 more)

### Community 32 - "Community 32"
Cohesion: 0.12
Nodes (10): Menubar, MenubarTrigger, MenubarSubTrigger, MenubarSubContent, MenubarContent, MenubarItem, MenubarCheckboxItem, MenubarRadioItem (+2 more)

### Community 69 - "Community 69"
Cohesion: 0.25
Nodes (7): NavigationMenu, NavigationMenuList, navigationMenuTriggerStyle, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuViewport, NavigationMenuIndicator

### Community 70 - "Community 70"
Cohesion: 0.25
Nodes (7): SelectTrigger, SelectScrollUpButton, SelectScrollDownButton, SelectContent, SelectLabel, SelectItem, SelectSeparator

### Community 49 - "Community 49"
Cohesion: 0.18
Nodes (5): Skeleton(), STAFF_BASE_ROLES, ROLE_LABEL, Route, Section

### Community 64 - "Community 64"
Cohesion: 0.22
Nodes (8): Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption

### Community 42 - "Community 42"
Cohesion: 0.18
Nodes (6): TabsList, TabsTrigger, TabsContent, ROLE_LABEL, ALL_PERMISSIONS, Route

### Community 73 - "Community 73"
Cohesion: 0.33
Nodes (5): ToggleGroupContext, ToggleGroup, ToggleGroupItem, toggleVariants, Toggle

### Community 21 - "Community 21"
Cohesion: 0.13
Nodes (13): AuthCtx, Ctx, AuthProvider(), useAuth(), supabase, Route, Route, 1713634 fixes (+5 more)

### Community 71 - "Community 71"
Cohesion: 0.38
Nodes (4): attachSupabaseAuth, renderErrorPage(), errorMiddleware, startInstance

### Community 36 - "Community 36"
Cohesion: 0.14
Nodes (12): requireSupabaseAuth, supabaseAdmin, Json, Database, DatabaseWithoutInternals, DefaultSchema, Tables, TablesInsert (+4 more)

### Community 19 - "Community 19"
Cohesion: 0.09
Nodes (23): pingLastSeen, checkMyAccess, adminListAllAccounts, adminGetAccountDetail, adminChangeAccountRole, adminSetBlocked, adminSetAccountTags, adminSetAccessExpiry (+15 more)

### Community 1 - "Community 1"
Cohesion: 0.01
Nodes (136): STAFF_BASE_ROLES, adminGetOverview, adminGetCustomer, adminCreateCustomerFn, adminUpdateCustomer, adminSaveOnboardingStep, adminCompleteOnboarding, adminResetOnboarding (+128 more)

### Community 87 - "Community 87"
Cohesion: 1.00
Nodes (2): nextRecurrenceDueDate(), generateDueRecurringTaskInstances()

### Community 74 - "Community 74"
Cohesion: 0.33
Nodes (6): ensureLeadsAccess(), getRoles(), ensureRoles(), ensureAdmin(), ensureSuperAdmin(), ensureStaff()

### Community 38 - "Community 38"
Cohesion: 0.15
Nodes (5): generateTempPassword(), adminCreateCustomer(), STAFF, genTempPw(), adminInviteStaffMember()

### Community 60 - "Community 60"
Cohesion: 0.33
Nodes (8): getRoles(), ensureRoles(), ensureAdmin(), ensureSuperAdmin(), ensureStaff(), ADMIN_LIKE_ROLES, SUPER_ADMIN_ROLES, STAFF_GUARD_ROLES

### Community 61 - "Community 61"
Cohesion: 0.28
Nodes (7): detectDelimiter(), parseCsv(), HEADER_ALIASES, TRUE_VALUES, ParsedLead, CsvParseResult, parseLeadsCsv()

### Community 51 - "Community 51"
Cohesion: 0.20
Nodes (5): escapeHtml(), transporter, sendWelcomeEmail(), a3773ee sec fixes, c27ffd9 fixes

### Community 83 - "Community 83"
Cohesion: 0.67
Nodes (1): consumeLastCapturedError()

### Community 25 - "Community 25"
Cohesion: 0.10
Nodes (17): LOG_LEVEL, HOURS, MONTHS, LIMIT, getMonitoringLatest, getMonitoringHistory, getDailyCheckLatest, getMonitoringLogs (+9 more)

### Community 65 - "Community 65"
Cohesion: 0.32
Nodes (5): assertPublicHost(), isPrivateOrReservedIp(), measureResponseTime(), DayUptime, MonitoringStats

### Community 17 - "Community 17"
Cohesion: 0.08
Nodes (24): getMyDashboard, updateMyProfile, portalGetOnboardingState, portalSaveOnboardingStep, portalCompleteOnboarding, portalGetTutorialState, portalCompleteTutorial, logLogin (+16 more)

### Community 12 - "Community 12"
Cohesion: 0.08
Nodes (15): PROJECT_STATUS_VALUES, ProjectStatus, PROJECT_STATUS_LABEL, PROJECT_STATUS_COLOR, PROJECT_PRIORITY_VALUES, ProjectPriority, PROJECT_PRIORITY_LABEL, PROJECT_PRIORITY_ORDER (+7 more)

### Community 33 - "Community 33"
Cohesion: 0.16
Nodes (13): checkRateLimit(), Body, cors, Route, Body, cors, Route, 2d50590 wip: lokale wijzigingen voor pull (+5 more)

### Community 20 - "Community 20"
Cohesion: 0.14
Nodes (23): isIpBanned(), recordStrike(), brotliCompressAsync, gzipAsync, logServerCrash(), ServerEntry, getServerEntry(), brandedErrorResponse() (+15 more)

### Community 58 - "Community 58"
Cohesion: 0.22
Nodes (5): getClientIp(), UrlInput, checkWebsite, public.website_checks, dda7a04 web tester

### Community 57 - "Community 57"
Cohesion: 0.22
Nodes (8): PAGE_DATES, Route, 032ba88 SEO, 7a63e47 chore: graphify graph bijgewerkt, ef44acd feat(seo): sitemap + llms.txt aangevuld met alle nieuwe pagina's, fa2ea52 feat(seo): nav + uitgebreide footer met interne links (geen orphan pages), SitemapEntry, LASTMOD

### Community 14 - "Community 14"
Cohesion: 0.10
Nodes (13): STATUS_LABEL, STATUS_FLOW, STATUS_COLOR, PRIORITY_LABEL, PRIORITY_WEIGHT, PRIORITY_COLOR, CATEGORY_LABEL, CATEGORY_KEYS (+5 more)

### Community 39 - "Community 39"
Cohesion: 0.13
Nodes (13): adminGenerateTelegramLink, adminGetTelegramStatus, adminUnlinkTelegram, adminSetMfaEnabled, adminListRecipients, adminCreateRecipient, adminGenerateRecipientLink, adminToggleRecipient (+5 more)

### Community 22 - "Community 22"
Cohesion: 0.14
Nodes (20): BLOCKED_HOSTNAMES, ipToLong(), inCidr(), BLOCKED_IPV4_RANGES, isBlockedIpv4(), isBlockedIpv6(), isBlockedIp(), SsrfBlockedError (+12 more)

### Community 2 - "Community 2"
Cohesion: 0.01
Nodes (141): WordpressOfMaatwerkRoute, WerkwijzeRoute, WebsiteLatenVernieuwenRoute, WebsiteLatenMakenWinschotenRoute, WebsiteLatenMakenVeendamRoute, WebsiteLatenMakenStadskanaalRoute, WebsiteLatenMakenSneekRoute, WebsiteLatenMakenSchoonheidssalonRoute (+133 more)

### Community 95 - "Community 95"
Cohesion: 1.00
Nodes (1): getRouter()

### Community 82 - "Community 82"
Cohesion: 0.67
Nodes (1): Route

### Community 48 - "Community 48"
Cohesion: 0.18
Nodes (6): Route, accountStatus(), ACCOUNT_STATUS_LABEL, ACCOUNT_STATUS_COLOR, Section, AccountsListSection()

### Community 16 - "Community 16"
Cohesion: 0.10
Nodes (13): Route, formatUptime(), statusColor(), STATUS_DOT, HOURS_OPTIONS, LOG_LEVELS, na(), safeJsonParse() (+5 more)

### Community 80 - "Community 80"
Cohesion: 0.67
Nodes (3): timingSafeStringEqual(), isAuthorized(), Route

### Community 96 - "Community 96"
Cohesion: 1.00
Nodes (1): Route

### Community 23 - "Community 23"
Cohesion: 0.11
Nodes (17): SERVICES, DETAIL_PAGE, fadeUp(), MeerDiensten(), Service, ROOT, FORK, Pt (+9 more)

### Community 85 - "Community 85"
Cohesion: 0.67
Nodes (2): cors, Route

### Community 28 - "Community 28"
Cohesion: 0.13
Nodes (11): Route, isLikelyValidUrl(), usePrefersReducedMotion(), useCountUp(), EXAMPLE, HERO_CATEGORIES, scoreVerdict(), getFindings() (+3 more)

### Community 86 - "Community 86"
Cohesion: 1.00
Nodes (2): leads, lead_activities

### Community 63 - "Community 63"
Cohesion: 0.31
Nodes (8): site_response_times, ssl_checks, dns_checks, monitoring_alerts, role_permissions, projects, profiles, project_members

### Community 40 - "Community 40"
Cohesion: 0.24
Nodes (11): public.user_roles, auth.users, public.profiles, public.change_requests, public.extra_credits, public.notifications, public.purchase_requests, on_auth_user_created (+3 more)

### Community 50 - "Community 50"
Cohesion: 0.24
Nodes (11): public.change_attachments, public.change_requests, public.change_comments, public.customer_costs, public.onboarding_items, public.reply_snippets, on_auth_user_created, auth.users (+3 more)

### Community 88 - "Community 88"
Cohesion: 1.00
Nodes (1): public.appointments

### Community 78 - "Community 78"
Cohesion: 0.40
Nodes (4): public.client_contacts, public.login_events, public.site_pings, public.site_errors

### Community 75 - "Community 75"
Cohesion: 0.53
Nodes (5): public.chats, public.chat_messages, public.user_presence, trg_touch_chat_last_message, public.touch_chat_last_message()

### Community 76 - "Community 76"
Cohesion: 0.33
Nodes (1): public.audit_log

### Community 94 - "Community 94"
Cohesion: 1.00
Nodes (1): public.contact_submissions

### Community 84 - "Community 84"
Cohesion: 0.67
Nodes (2): public.password_reset_requests, public.extra_change_requests

### Community 43 - "Community 43"
Cohesion: 0.16
Nodes (8): public.roles, public.user_custom_roles, auth.users, 2fcc9a3 fixes, 7f7208a new, 81a87ed commit, a2681a9 ewa, ee6f2e6 fixes

### Community 62 - "Community 62"
Cohesion: 0.44
Nodes (8): public.project_tasks, public.projects, auth.users, public.project_task_time_entries, public.project_milestone_dependencies, public.project_milestones, public.project_templates, public.project_template_milestones

### Community 66 - "Community 66"
Cohesion: 0.39
Nodes (6): public.rate_limit_hits, public.rate_limit_bans, public.check_rate_limit(), v_count, public.record_strike(), v_strikes

### Community 54 - "Community 54"
Cohesion: 0.24
Nodes (3): 4510b3f perf fixes, 7dbbf18 perf fixes, 9d0b477 perf fixes

## Knowledge Gaps
- **750 isolated node(s):** `Message`, `ChatRow`, `CookiePrefs`, `VEENDAM`, `HOOGEVEEN` (+745 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 77`** (2 nodes): `Route`, `d38d9ab Add IndexNow key route`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 87`** (2 nodes): `nextRecurrenceDueDate()`, `generateDueRecurringTaskInstances()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 83`** (1 nodes): `consumeLastCapturedError()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 95`** (1 nodes): `getRouter()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 82`** (1 nodes): `Route`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 96`** (1 nodes): `Route`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 85`** (2 nodes): `cors`, `Route`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 86`** (2 nodes): `leads`, `lead_activities`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 88`** (1 nodes): `public.appointments`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 76`** (1 nodes): `public.audit_log`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 94`** (1 nodes): `public.contact_submissions`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 84`** (2 nodes): `public.password_reset_requests`, `public.extra_change_requests`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 9` to `Community 11`, `Community 81`, `Community 67`, `Community 37`, `Community 72`, `Community 45`, `Community 52`, `Community 31`, `Community 55`, `Community 68`, `Community 56`, `Community 41`, `Community 8`, `Community 79`, `Community 32`, `Community 69`, `Community 70`, `Community 49`, `Community 64`, `Community 42`, `Community 73`?**
  _High betweenness centrality (0.093) - this node is a cross-community bridge._
- **Why does `Skeleton()` connect `Community 49` to `Community 24`, `Community 48`, `Community 26`, `Community 14`, `Community 12`, `Community 11`, `Community 42`, `Community 13`, `Community 8`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **What connects `Message`, `ChatRow`, `CookiePrefs` to the rest of the system?**
  _750 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 6` be split into smaller, more focused modules?**
  _Cohesion score 0.058173076923076925 - nodes in this community are weakly interconnected._
- **Should `Community 7` be split into smaller, more focused modules?**
  _Cohesion score 0.058173076923076925 - nodes in this community are weakly interconnected._
- **Should `Community 4` be split into smaller, more focused modules?**
  _Cohesion score 0.048130322102924845 - nodes in this community are weakly interconnected._
- **Should `Community 15` be split into smaller, more focused modules?**
  _Cohesion score 0.09971509971509972 - nodes in this community are weakly interconnected._