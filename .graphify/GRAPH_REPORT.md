# Graph Report - .  (2026-08-09)

## Corpus Check
- Large corpus: 1069 files · ~323.424 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder, or use --no-semantic to run AST-only.

## Summary
- 1662 nodes · 4489 edges · 81 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output
- Edge kinds: ON_BRANCH: 1639 · contains: 1207 · MODIFIES: 627 · imports: 341 · PARENT_OF: 283 · imports_from: 225 · calls: 125 · references: 28 · reads_from: 9 · triggers: 5


## Input Scope
- Requested: auto
- Resolved: committed (source: default-auto)
- Included files: 1069 · Candidates: 1495
- Excluded: 0 untracked · 35665 ignored · 8 sensitive · 14 missing committed
- Recommendation: Use --scope all or graphify.yaml inputs.corpus for a knowledge-base folder.

## Graph Freshness
- Built from Git commit: `2d81f50`
- Compare this hash to `git rev-parse HEAD` before trusting freshness-sensitive graph output.
## God Nodes (most connected - your core abstractions)
1. `cn()` - 45 edges
2. `Skeleton()` - 13 edges
3. `Footer()` - 10 edges
4. `supabase` - 10 edges
5. `CookieBanner()` - 9 edges
6. `Nav()` - 9 edges
7. `useConfirm()` - 8 edges
8. `auth.users` - 8 edges
9. `walkChildren()` - 7 edges
10. `walk()` - 7 edges

## Surprising Connections (you probably didn't know these)
- `02d6137 fixes` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 31 → community 0_
- `032ba88 SEO` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 8 → community 0_
- `1713634 fixes` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 47 → community 0_
- `1713634 fixes` --PARENT_OF--> `cf5e121 Catch getSession() network errors in the auth route guard`  [EXTRACTED]
  git → git  _Bridges community 47 → community 69_
- `1a55bd1 Fix formatting in FAQ answers` --PARENT_OF--> `85ad012 Cinematisch redesign: forest hero, donkere panels, Cormorant Garamond`  [EXTRACTED]
  git → git  _Bridges community 0 → community 9_

## Communities

### Community 0 - "Community 0"
Cohesion: 0.08
Nodes (195): main, seo-verbetering, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal, worktree-replicated-fluttering-whisper (+187 more)

### Community 1 - "Community 1"
Cohesion: 0.01
Nodes (136): ADMIN_LIKE_ROLES, adminAddCost, adminAddLeadActivity, adminAddMilestoneDependency, adminAddOnboardingItem, adminArchiveProject, adminAssignCustomRole, adminAttachmentUrl (+128 more)

### Community 2 - "Community 2"
Cohesion: 0.03
Nodes (63): Route, getRouter(), AlgemeneVoorwaardenRoute, ApiPublicHooksExpireAccountsRoute, ApiPublicSiteErrorRoute, ApiPublicSitePingRoute, ApiTelegramWebhookRoute, AuthenticatedAccountRoute (+55 more)

### Community 3 - "Community 3"
Cohesion: 0.06
Nodes (49): boot(), cdnScriptFor(), collectProps(), compileAttr(), compileTemplate(), contentKey(), createComponentFactory(), createExternalModules() (+41 more)

### Community 4 - "Community 4"
Cohesion: 0.05
Nodes (37): useIsMobile(), Input, Separator, SheetContent, SheetContentProps, SheetDescription, SheetHeader(), SheetOverlay (+29 more)

### Community 5 - "Community 5"
Cohesion: 0.07
Nodes (22): cn(), AccordionContent, AccordionItem, AccordionTrigger, Alert, AlertDescription, AlertTitle, alertVariants (+14 more)

### Community 6 - "Community 6"
Cohesion: 0.08
Nodes (16): Route, Section, MonitoringSection(), Route, timeAgo(), 7f7208a new, isProjectOverdue(), PROJECT_PRIORITY_COLOR (+8 more)

### Community 7 - "Community 7"
Cohesion: 0.07
Nodes (16): DISK_DAYS_OPTIONS, formatServerAge(), formatSslDate(), formatUptime(), HOURS_OPTIONS, LOG_LEVELS, na(), Route (+8 more)

### Community 8 - "Community 8"
Cohesion: 0.09
Nodes (26): 032ba88 SEO, 171eb96 leads functions, 2d81f50 feat(seo): vervang /cases door eerlijke /werkwijze-pagina; geen valse projectclaims, 7a63e47 chore: graphify graph bijgewerkt, 9965896 feat(seo): contact- en cases-pagina met LocalBusiness/Breadcrumb schema, b48bbc0 chore: snapshot lokale SEO-pagina's (Veendam/Hoogeveen) + sitemap, bc842b8 leads functions, e0f6b72 feat(seo): interne links op lokale landingspagina's (+18 more)

### Community 9 - "Community 9"
Cohesion: 0.15
Nodes (23): 735e902 Verwijder alle section-label eyebrows, 85a6666 SEO en robot, 85ad012 Cinematisch redesign: forest hero, donkere panels, Cormorant Garamond, 98edc37 Changes, 9a2689c code fixes, ab14295 Design overhauled, A11y-bar weg, b6f9658 Redesign: donker editorial thema, Syne font, goud accent, cdd7702 Voeg FAQ toe, Hosting Only service, geanimeerde CTA-knop (+15 more)

### Community 10 - "Community 10"
Cohesion: 0.11
Nodes (21): ALL_PERMISSIONS, ROLE_LABEL, Route, ConfirmContext, ConfirmContextValue, ConfirmOptions, ConfirmProvider(), Pending (+13 more)

### Community 11 - "Community 11"
Cohesion: 0.08
Nodes (19): ALLOWED_ATTACHMENT_MIME, ChangeCard(), FILTER_LABEL, FilterKey, mapStatus(), matchesFilter(), Route, STATUS_STYLE (+11 more)

### Community 12 - "Community 12"
Cohesion: 0.10
Nodes (15): fc7da2d animaties en paginas, CookieBanner(), CookiePrefs, links, Nav(), services, Route, Route (+7 more)

### Community 13 - "Community 13"
Cohesion: 0.09
Nodes (10): Route, Route, 37c0d11 Dock tokens toegevoegd & emojis weg, 97e70ec Changes, BerichtenTab(), ChatWidget(), Message, useConfirm() (+2 more)

### Community 14 - "Community 14"
Cohesion: 0.10
Nodes (13): Route, Route, Section, CATEGORY_KEYS, CATEGORY_LABEL, CHANGE_TEMPLATES, PRIORITY_COLOR, PRIORITY_LABEL (+5 more)

### Community 15 - "Community 15"
Cohesion: 0.09
Nodes (20): 2d50590 wip: lokale wijzigingen voor pull, a3773ee sec fixes, isAuthorized(), Route, timingSafeStringEqual(), BAN_DURATIONS_MS, BanEntry, bans (+12 more)

### Community 16 - "Community 16"
Cohesion: 0.08
Nodes (15): f958216 leads functions, CallbackScheduleForm(), CallbackScheduleValue, ACTIVITY_LABEL, initials(), LeadDetail(), relTime(), SortKey (+7 more)

### Community 17 - "Community 17"
Cohesion: 0.08
Nodes (24): cancelMyChange, getAttachmentUrl, getMyDashboard, logLogin, markAllNotificationsRead, markNotificationRead, portalCompleteOnboarding, portalCompleteTutorial (+16 more)

### Community 18 - "Community 18"
Cohesion: 0.13
Nodes (18): 81a87ed commit, TeamTab(), ensureAdmin(), ensureRoles(), ensureStaff(), ensureSuperAdmin(), getRoles(), ensurePermission() (+10 more)

### Community 19 - "Community 19"
Cohesion: 0.12
Nodes (18): addDays(), CallbackAgenda(), CallbackItem(), fmtDayLabel(), fmtTime(), isToday(), sameDay(), startOfDay() (+10 more)

### Community 20 - "Community 20"
Cohesion: 0.10
Nodes (9): ONBOARDING_STATUS_COLOR, ONBOARDING_STATUS_LABEL, ROLE_LABEL, Route, STAFF_BASE_ROLES, TelegramMfaCard(), TabsContent, TabsList (+1 more)

### Community 21 - "Community 21"
Cohesion: 0.17
Nodes (19): f207e52 feat(seo): dienstenpagina's website/webshop/hosting met unieke content + Service/FAQ/Breadcrumb schema, InternalLink, ServiceFaq, ServicePage(), ServicePageData, breadcrumbJsonLd(), faqJsonLd(), ld() (+11 more)

### Community 22 - "Community 22"
Cohesion: 0.09
Nodes (23): ADMIN_LIKE, adminArchiveChange, adminAssignChange, adminBulkArchive, adminChangeAccountRole, adminCreateTempAccount, adminGetAccountDetail, adminHardDeleteAccount (+15 more)

### Community 23 - "Community 23"
Cohesion: 0.12
Nodes (10): RECURRENCE_LABEL, Route, 30d7c60 Merge project detail pages (admin + klantenportaal), 39d363a server basic, 4c90153 Merge branch 'main' of https://github.com/MilanDijksterhuis/aimi-digital-craft, 500f718 Merge branch 'main' of https://github.com/MilanDijksterhuis/aimi-digital-craft, 5fa25a3 Add project detail pages for admin and client portal, a903820 Fix Rules of Hooks violation crashing admin Projecten tab (+2 more)

### Community 24 - "Community 24"
Cohesion: 0.10
Nodes (17): ADMIN_LIKE, getAlerts, getDailyCheckLatest, getHetznerCostsHistory, getHetznerCostsLatest, getLogsExportCsv, getMetricsCompareWeeks, getMetricsExportCsv (+9 more)

### Community 25 - "Community 25"
Cohesion: 0.11
Nodes (16): Bloom, Branch, build(), buildLeaves(), EmberGroup, FORK, MeerDiensten(), Pt (+8 more)

### Community 26 - "Community 26"
Cohesion: 0.13
Nodes (7): b29ceec Fixed weak PRNG and RLS, c4498f5 Changes, adminCreateCustomer(), adminInviteStaffMember(), generateTempPassword(), genTempPw(), STAFF

### Community 27 - "Community 27"
Cohesion: 0.12
Nodes (7): ContactBlock, Contacts, fadeVariants, FormState, PortalOnboardingTour(), Profile, STEP_TITLES

### Community 28 - "Community 28"
Cohesion: 0.21
Nodes (14): consumeLastCapturedError(), applyAssetCaching(), applyRateLimit(), applySecurityHeaders(), brandedErrorResponse(), fetch(), getServerEntry(), isCatastrophicSsrErrorBody() (+6 more)

### Community 29 - "Community 29"
Cohesion: 0.13
Nodes (11): Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, DialogContent (+3 more)

### Community 30 - "Community 30"
Cohesion: 0.12
Nodes (10): Menubar, MenubarCheckboxItem, MenubarContent, MenubarItem, MenubarLabel, MenubarRadioItem, MenubarSeparator, MenubarSubContent (+2 more)

### Community 31 - "Community 31"
Cohesion: 0.13
Nodes (10): 02d6137 fixes, 2189780 fixes, 7443b54 Fix root cause: catch Supabase Realtime WebSocket crashes, 99bd8ac Surface site_errors in the account Activiteit tab, bbc9d80 Surface site_errors in the account Activiteit tab, c27ffd9 fixes, f2eb4fe Fix root cause: catch Supabase Realtime WebSocket crashes, AdminChatPanel() (+2 more)

### Community 32 - "Community 32"
Cohesion: 0.13
Nodes (6): ContactBlock, Contacts, fadeVariants, FormState, OnboardingWizard(), STEP_TITLES

### Community 33 - "Community 33"
Cohesion: 0.14
Nodes (12): requireSupabaseAuth, supabaseAdmin, CompositeTypes, Constants, Database, DatabaseWithoutInternals, DefaultSchema, Enums (+4 more)

### Community 34 - "Community 34"
Cohesion: 0.16
Nodes (6): Button, ButtonProps, buttonVariants, PaginationContent, PaginationItem, PaginationLinkProps

### Community 35 - "Community 35"
Cohesion: 0.13
Nodes (13): adminCreateRecipient, adminDeleteRecipient, adminGenerateRecipientLink, adminGenerateTelegramLink, adminGetTelegramStatus, adminListRecipients, adminSetMfaEnabled, adminSetRecipientNotify (+5 more)

### Community 36 - "Community 36"
Cohesion: 0.24
Nodes (11): auth.users, change_requests_touch, on_auth_user_created, profiles_touch, public.change_requests, public.extra_credits, public.handle_new_user(), public.notifications (+3 more)

### Community 37 - "Community 37"
Cohesion: 0.14
Nodes (11): FormControl, FormDescription, FormFieldContext, FormFieldContextValue, FormItem, FormItemContext, FormItemContextValue, FormLabel (+3 more)

### Community 38 - "Community 38"
Cohesion: 0.14
Nodes (12): Carousel, CarouselApi, CarouselContent, CarouselContext, CarouselContextProps, CarouselItem, CarouselNext, CarouselOptions (+4 more)

### Community 39 - "Community 39"
Cohesion: 0.21
Nodes (7): Route, 2b1d78f telegram, profiles, telegram_link_tokens, telegram_mfa_codes, telegram_notification_recipients, telegram_pending_logins

### Community 40 - "Community 40"
Cohesion: 0.15
Nodes (9): 3417a43 fixes, 74ecdc1 code fixes, 9c1fa06 perf fixes, ADMIN_LIKE, adminDeleteContactSubmission, adminListContactSubmissions, adminToggleContactHandled, STAFF_ROLES (+1 more)

### Community 41 - "Community 41"
Cohesion: 0.19
Nodes (10): c480d2e leads, CsvParseResult, detectDelimiter(), HEADER_ALIASES, parseCsv(), ParsedLead, parseLeadsCsv(), TRUE_VALUES (+2 more)

### Community 42 - "Community 42"
Cohesion: 0.22
Nodes (6): AuthCtx, AuthProvider(), Ctx, useAuth(), Route, supabase

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
Cohesion: 0.20
Nodes (9): 1713634 fixes, 3901302 Fix mojibake in admin dashboard and GET-blocking rate limit bug, 4b4ebd9 Catch getSession() network errors in the auth route guard, 6b21362 Catch login network errors instead of crashing to the error boundary, 6da1e20 Log root error boundary crashes to site_errors for visibility, 7f807c8 Catch login network errors instead of crashing to the error boundary, dbd0657 Log server-side (SSR) crashes to site_errors too, f7b9fd5 Merge branch 'main' of https://github.com/MilanDijksterhuis/aimi-digital-craft (+1 more)

### Community 48 - "Community 48"
Cohesion: 0.18
Nodes (7): ChartConfig, ChartContainer, ChartContext, ChartContextProps, ChartLegendContent, ChartTooltipContent, THEMES

### Community 49 - "Community 49"
Cohesion: 0.20
Nodes (8): ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuSubContent, ContextMenuSubTrigger

### Community 50 - "Community 50"
Cohesion: 0.20
Nodes (8): DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuSubContent, DropdownMenuSubTrigger

### Community 51 - "Community 51"
Cohesion: 0.44
Nodes (8): auth.users, public.project_milestone_dependencies, public.project_milestones, public.project_task_time_entries, public.project_tasks, public.project_template_milestones, public.project_templates, public.projects

### Community 52 - "Community 52"
Cohesion: 0.25
Nodes (3): Route, Toaster(), ToasterProps

### Community 53 - "Community 53"
Cohesion: 0.31
Nodes (8): dns_checks, monitoring_alerts, profiles, project_members, projects, role_permissions, site_response_times, ssl_checks

### Community 54 - "Community 54"
Cohesion: 0.22
Nodes (8): Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow

### Community 55 - "Community 55"
Cohesion: 0.32
Nodes (5): assertPublicHost(), DayUptime, isPrivateOrReservedIp(), measureResponseTime(), MonitoringStats

### Community 56 - "Community 56"
Cohesion: 0.39
Nodes (6): public.check_rate_limit(), public.rate_limit_bans, public.rate_limit_hits, public.record_strike(), v_count, v_strikes

### Community 57 - "Community 57"
Cohesion: 0.25
Nodes (5): Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage

### Community 58 - "Community 58"
Cohesion: 0.25
Nodes (4): DrawerContent, DrawerDescription, DrawerOverlay, DrawerTitle

### Community 59 - "Community 59"
Cohesion: 0.25
Nodes (7): NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle, NavigationMenuViewport

### Community 60 - "Community 60"
Cohesion: 0.25
Nodes (7): SelectContent, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger

### Community 61 - "Community 61"
Cohesion: 0.38
Nodes (4): renderErrorPage(), errorMiddleware, startInstance, attachSupabaseAuth

### Community 62 - "Community 62"
Cohesion: 0.29
Nodes (6): Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle

### Community 63 - "Community 63"
Cohesion: 0.33
Nodes (5): ToggleGroup, ToggleGroupContext, ToggleGroupItem, Toggle, toggleVariants

### Community 64 - "Community 64"
Cohesion: 0.33
Nodes (4): Route, SectionKey, SECTIONS, LeadsPanel()

### Community 65 - "Community 65"
Cohesion: 0.33
Nodes (3): 2fcc9a3 fixes, a2681a9 ewa, ee6f2e6 fixes

### Community 66 - "Community 66"
Cohesion: 0.33
Nodes (6): ensureAdmin(), ensureLeadsAccess(), ensureRoles(), ensureStaff(), ensureSuperAdmin(), getRoles()

### Community 67 - "Community 67"
Cohesion: 0.53
Nodes (5): public.chat_messages, public.chats, public.touch_chat_last_message(), public.user_presence, trg_touch_chat_last_message

### Community 68 - "Community 68"
Cohesion: 0.33
Nodes (1): public.audit_log

### Community 69 - "Community 69"
Cohesion: 0.40
Nodes (5): 5d1e827 Log server-side (SSR) crashes to site_errors too, 8e663f1 fixes, b75b00d fixes, cf5e121 Catch getSession() network errors in the auth route guard, d2da4c9 Log root error boundary crashes to site_errors for visibility

### Community 70 - "Community 70"
Cohesion: 0.40
Nodes (4): public.client_contacts, public.login_events, public.site_errors, public.site_pings

### Community 71 - "Community 71"
Cohesion: 0.40
Nodes (4): InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot

### Community 72 - "Community 72"
Cohesion: 0.67
Nodes (3): escapeHtml(), sendWelcomeEmail(), transporter

### Community 73 - "Community 73"
Cohesion: 0.83
Nodes (3): auth.users, public.roles, public.user_custom_roles

### Community 74 - "Community 74"
Cohesion: 0.67
Nodes (3): Badge(), BadgeProps, badgeVariants

### Community 75 - "Community 75"
Cohesion: 0.67
Nodes (2): public.extra_change_requests, public.password_reset_requests

### Community 76 - "Community 76"
Cohesion: 0.67
Nodes (2): cors, Route

### Community 77 - "Community 77"
Cohesion: 1.00
Nodes (2): lead_callbacks, leads

### Community 78 - "Community 78"
Cohesion: 1.00
Nodes (2): generateDueRecurringTaskInstances(), nextRecurrenceDueDate()

### Community 79 - "Community 79"
Cohesion: 1.00
Nodes (1): public.appointments

### Community 85 - "Community 85"
Cohesion: 1.00
Nodes (1): public.contact_submissions

## Knowledge Gaps
- **616 isolated node(s):** `Message`, `ChatRow`, `ViewMode`, `CallbackScheduleValue`, `Message` (+611 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 68`** (1 nodes): `public.audit_log`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 75`** (2 nodes): `public.extra_change_requests`, `public.password_reset_requests`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 76`** (2 nodes): `cors`, `Route`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 77`** (2 nodes): `lead_callbacks`, `leads`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 78`** (2 nodes): `generateDueRecurringTaskInstances()`, `nextRecurrenceDueDate()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 79`** (1 nodes): `public.appointments`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 85`** (1 nodes): `public.contact_submissions`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 5` to `Community 10`, `Community 74`, `Community 57`, `Community 34`, `Community 62`, `Community 38`, `Community 48`, `Community 29`, `Community 49`, `Community 58`, `Community 50`, `Community 37`, `Community 4`, `Community 71`, `Community 30`, `Community 59`, `Community 60`, `Community 44`, `Community 54`, `Community 20`, `Community 63`?**
  _High betweenness centrality (0.112) - this node is a cross-community bridge._
- **Why does `Skeleton()` connect `Community 44` to `Community 13`, `Community 43`, `Community 20`, `Community 14`, `Community 6`, `Community 23`, `Community 10`, `Community 11`, `Community 4`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **What connects `Message`, `ChatRow`, `ViewMode` to the rest of the system?**
  _616 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.08221105527638191 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.014084507042253521 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.031235431235431235 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.058173076923076925 - nodes in this community are weakly interconnected._