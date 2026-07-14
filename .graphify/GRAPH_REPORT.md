# Graph Report - .  (2026-07-14)

## Corpus Check
- Large corpus: 978 files · ~340.773 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder, or use --no-semantic to run AST-only.

## Summary
- 1264 nodes · 3240 edges · 60 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output
- Edge kinds: ON_BRANCH: 1200 · contains: 900 · MODIFIES: 441 · imports: 237 · PARENT_OF: 237 · imports_from: 154 · calls: 38 · references: 23 · reads_from: 5 · triggers: 5


## Input Scope
- Requested: auto
- Resolved: committed (source: default-auto)
- Included files: 978 · Candidates: 1079
- Excluded: 195 untracked · 35595 ignored · 8 sensitive · 13 missing committed
- Recommendation: Use --scope all or graphify.yaml inputs.corpus for a knowledge-base folder.

## Graph Freshness
- Built from Git commit: `a2681a9`
- Compare this hash to `git rev-parse HEAD` before trusting freshness-sensitive graph output.
## God Nodes (most connected - your core abstractions)
1. `cn()` - 44 edges
2. `Skeleton()` - 13 edges
3. `supabase` - 10 edges
4. `auth.users` - 8 edges
5. `STATUS_LABEL` - 7 edges
6. `ServerPage()` - 7 edges
7. `TabsList` - 6 edges
8. `TabsTrigger` - 6 edges
9. `TabsContent` - 6 edges
10. `usePermissions()` - 6 edges

## Surprising Connections (you probably didn't know these)
- `00e2564 voorwaaren en privacy` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 38 → community 0_
- `1a55bd1 Fix formatting in FAQ answers` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 4 → community 0_
- `2d50590 wip: lokale wijzigingen voor pull` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 14 → community 0_
- `4c90153 Merge branch 'main' of https://github.com/MilanDijksterhuis/aimi-digital-craft` --PARENT_OF--> `7f7208a new`  [EXTRACTED]
  git → git  _Bridges community 14 → community 8_
- `7f7208a new` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 8 → community 0_

## Communities

### Community 0 - "Community 0"
Cohesion: 0.07
Nodes (185): main, tmp-main-merge, tmp-revert-main, worktree-curious-wibbling-narwhal, worktree-fix-admin-projects-hooks, worktree-floofy-conjuring-petal, 00d6931 Changes, 0193196 monitoring (+177 more)

### Community 1 - "Community 1"
Cohesion: 0.02
Nodes (127): ADMIN_LIKE_ROLES, adminAddCost, adminAddLeadActivity, adminAddMilestoneDependency, adminAddOnboardingItem, adminArchiveProject, adminAssignCustomRole, adminAttachmentUrl (+119 more)

### Community 2 - "Community 2"
Cohesion: 0.06
Nodes (21): ONBOARDING_STATUS_COLOR, ONBOARDING_STATUS_LABEL, ROLE_LABEL, Route, STAFF_BASE_ROLES, RECURRENCE_LABEL, Route, ALL_PERMISSIONS (+13 more)

### Community 3 - "Community 3"
Cohesion: 0.04
Nodes (48): Route, Route, getRouter(), AlgemeneVoorwaardenRoute, ApiPublicHooksExpireAccountsRoute, ApiPublicSiteErrorRoute, ApiPublicSitePingRoute, AuthenticatedAccountRoute (+40 more)

### Community 4 - "Community 4"
Cohesion: 0.11
Nodes (31): 1a55bd1 Fix formatting in FAQ answers, 1a66af6 Verbeter layout en visueel ritme, 735e902 Verwijder alle section-label eyebrows, 85ad012 Cinematisch redesign: forest hero, donkere panels, Cormorant Garamond, 965b87a Fix foto, nav animaties, portal leesbaarheid, 98edc37 Changes, ab14295 Design overhauled, A11y-bar weg, ab23069 admin en klantportaal wijzigingen (+23 more)

### Community 5 - "Community 5"
Cohesion: 0.05
Nodes (37): useIsMobile(), Input, Separator, SheetContent, SheetContentProps, SheetDescription, SheetHeader(), SheetOverlay (+29 more)

### Community 6 - "Community 6"
Cohesion: 0.07
Nodes (25): cn(), AccordionContent, AccordionItem, AccordionTrigger, Alert, AlertDescription, AlertTitle, alertVariants (+17 more)

### Community 7 - "Community 7"
Cohesion: 0.06
Nodes (33): 9be6953 bug fixes, abdbfe4 bug fixes 2, eccff4f bug fixes 2, assertPublicHost(), DayUptime, isPrivateOrReservedIp(), measureResponseTime(), MonitoringStats (+25 more)

### Community 8 - "Community 8"
Cohesion: 0.08
Nodes (16): Route, Section, MonitoringSection(), Route, timeAgo(), 7f7208a new, isProjectOverdue(), PROJECT_PRIORITY_COLOR (+8 more)

### Community 9 - "Community 9"
Cohesion: 0.08
Nodes (28): consumeLastCapturedError(), renderErrorPage(), BAN_DURATIONS_MS, BanEntry, bans, checkRateLimit(), Entry, getClientIp() (+20 more)

### Community 10 - "Community 10"
Cohesion: 0.09
Nodes (14): Route, Route, Section, DeletedChangesTab(), CATEGORY_KEYS, CATEGORY_LABEL, CHANGE_TEMPLATES, PRIORITY_COLOR (+6 more)

### Community 11 - "Community 11"
Cohesion: 0.08
Nodes (16): ACTIVITY_LABEL, LeadsPanel(), SortKey, SORTS, Status, STATUS_COLOR, STATUS_DOT, STATUS_LABEL (+8 more)

### Community 12 - "Community 12"
Cohesion: 0.10
Nodes (16): ALLOWED_ATTACHMENT_MIME, ChangeCard(), FILTER_LABEL, FilterKey, mapStatus(), matchesFilter(), Route, STATUS_STYLE (+8 more)

### Community 13 - "Community 13"
Cohesion: 0.10
Nodes (13): DISK_DAYS_OPTIONS, formatServerAge(), formatSslDate(), formatUptime(), HOURS_OPTIONS, LOG_LEVELS, na(), Route (+5 more)

### Community 14 - "Community 14"
Cohesion: 0.12
Nodes (10): Route, 2d50590 wip: lokale wijzigingen voor pull, 30d7c60 Merge project detail pages (admin + klantenportaal), 39d363a server basic, 4c90153 Merge branch 'main' of https://github.com/MilanDijksterhuis/aimi-digital-craft, 500f718 Merge branch 'main' of https://github.com/MilanDijksterhuis/aimi-digital-craft, 5fa25a3 Add project detail pages for admin and client portal, a903820 Fix Rules of Hooks violation crashing admin Projecten tab (+2 more)

### Community 15 - "Community 15"
Cohesion: 0.09
Nodes (23): ADMIN_LIKE, adminArchiveChange, adminAssignChange, adminBulkArchive, adminChangeAccountRole, adminCreateTempAccount, adminGetAccountDetail, adminHardDeleteAccount (+15 more)

### Community 16 - "Community 16"
Cohesion: 0.14
Nodes (10): AdminChatPanel(), ChatRow, Message, AuthCtx, AuthProvider(), Ctx, useAuth(), Route (+2 more)

### Community 17 - "Community 17"
Cohesion: 0.13
Nodes (7): b29ceec Fixed weak PRNG and RLS, c4498f5 Changes, adminCreateCustomer(), adminInviteStaffMember(), generateTempPassword(), genTempPw(), STAFF

### Community 18 - "Community 18"
Cohesion: 0.18
Nodes (11): c480d2e leads, BerichtenTab(), TeamTab(), usePermissions(), AppRole, can(), PermissionAction, ROLE_LABEL (+3 more)

### Community 19 - "Community 19"
Cohesion: 0.12
Nodes (13): ADMIN_LIKE, getAlerts, getDailyCheckLatest, getHetznerCostsHistory, getHetznerCostsLatest, getLogsExportCsv, getMetricsCompareWeeks, getMetricsExportCsv (+5 more)

### Community 20 - "Community 20"
Cohesion: 0.13
Nodes (11): Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, DialogContent (+3 more)

### Community 21 - "Community 21"
Cohesion: 0.12
Nodes (10): Menubar, MenubarCheckboxItem, MenubarContent, MenubarItem, MenubarLabel, MenubarRadioItem, MenubarSeparator, MenubarSubContent (+2 more)

### Community 22 - "Community 22"
Cohesion: 0.16
Nodes (6): Button, ButtonProps, buttonVariants, PaginationContent, PaginationItem, PaginationLinkProps

### Community 23 - "Community 23"
Cohesion: 0.24
Nodes (11): auth.users, change_requests_touch, on_auth_user_created, profiles_touch, public.change_requests, public.extra_credits, public.handle_new_user(), public.notifications (+3 more)

### Community 24 - "Community 24"
Cohesion: 0.14
Nodes (11): FormControl, FormDescription, FormFieldContext, FormFieldContextValue, FormItem, FormItemContext, FormItemContextValue, FormLabel (+3 more)

### Community 25 - "Community 25"
Cohesion: 0.15
Nodes (11): supabaseAdmin, CompositeTypes, Constants, Database, DatabaseWithoutInternals, DefaultSchema, Enums, Json (+3 more)

### Community 26 - "Community 26"
Cohesion: 0.14
Nodes (12): Carousel, CarouselApi, CarouselContent, CarouselContext, CarouselContextProps, CarouselItem, CarouselNext, CarouselOptions (+4 more)

### Community 27 - "Community 27"
Cohesion: 0.18
Nodes (6): ACCOUNT_STATUS_COLOR, ACCOUNT_STATUS_LABEL, AccountsListSection(), accountStatus(), Route, Section

### Community 28 - "Community 28"
Cohesion: 0.18
Nodes (5): ROLE_LABEL, Route, Section, STAFF_BASE_ROLES, Skeleton()

### Community 29 - "Community 29"
Cohesion: 0.20
Nodes (5): 81a87ed commit, a2681a9 ewa, auth.users, public.roles, public.user_custom_roles

### Community 30 - "Community 30"
Cohesion: 0.24
Nodes (11): auth.users, on_auth_user_created, public.change_attachments, public.change_comments, public.change_requests, public.customer_costs, public.handle_new_user(), public.onboarding_items (+3 more)

### Community 31 - "Community 31"
Cohesion: 0.18
Nodes (7): ChartConfig, ChartContainer, ChartContext, ChartContextProps, ChartLegendContent, ChartTooltipContent, THEMES

### Community 32 - "Community 32"
Cohesion: 0.22
Nodes (7): ADMIN_LIKE, adminDeleteContactSubmission, adminListContactSubmissions, adminToggleContactHandled, STAFF_ROLES, submitContactForm, requireSupabaseAuth

### Community 33 - "Community 33"
Cohesion: 0.20
Nodes (8): ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuSubContent, ContextMenuSubTrigger

### Community 34 - "Community 34"
Cohesion: 0.20
Nodes (8): DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuSubContent, DropdownMenuSubTrigger

### Community 35 - "Community 35"
Cohesion: 0.44
Nodes (8): auth.users, public.project_milestone_dependencies, public.project_milestones, public.project_task_time_entries, public.project_tasks, public.project_template_milestones, public.project_templates, public.projects

### Community 36 - "Community 36"
Cohesion: 0.31
Nodes (8): dns_checks, monitoring_alerts, profiles, project_members, projects, role_permissions, site_response_times, ssl_checks

### Community 37 - "Community 37"
Cohesion: 0.22
Nodes (8): Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow

### Community 38 - "Community 38"
Cohesion: 0.29
Nodes (4): 00e2564 voorwaaren en privacy, Footer(), Route, Route

### Community 39 - "Community 39"
Cohesion: 0.25
Nodes (5): Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage

### Community 40 - "Community 40"
Cohesion: 0.25
Nodes (4): DrawerContent, DrawerDescription, DrawerOverlay, DrawerTitle

### Community 41 - "Community 41"
Cohesion: 0.25
Nodes (7): NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle, NavigationMenuViewport

### Community 42 - "Community 42"
Cohesion: 0.25
Nodes (7): SelectContent, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger

### Community 43 - "Community 43"
Cohesion: 0.29
Nodes (6): Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle

### Community 44 - "Community 44"
Cohesion: 0.33
Nodes (5): ToggleGroup, ToggleGroupContext, ToggleGroupItem, Toggle, toggleVariants

### Community 45 - "Community 45"
Cohesion: 0.33
Nodes (6): ensureAdmin(), ensureLeadsAccess(), ensureRoles(), ensureStaff(), ensureSuperAdmin(), getRoles()

### Community 46 - "Community 46"
Cohesion: 0.53
Nodes (5): public.chat_messages, public.chats, public.touch_chat_last_message(), public.user_presence, trg_touch_chat_last_message

### Community 47 - "Community 47"
Cohesion: 0.33
Nodes (1): public.audit_log

### Community 48 - "Community 48"
Cohesion: 0.40
Nodes (4): public.client_contacts, public.login_events, public.site_errors, public.site_pings

### Community 49 - "Community 49"
Cohesion: 0.40
Nodes (4): InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot

### Community 50 - "Community 50"
Cohesion: 0.67
Nodes (3): isAuthorized(), Route, timingSafeStringEqual()

### Community 51 - "Community 51"
Cohesion: 0.67
Nodes (1): Route

### Community 52 - "Community 52"
Cohesion: 0.67
Nodes (1): transporter

### Community 53 - "Community 53"
Cohesion: 0.67
Nodes (2): public.extra_change_requests, public.password_reset_requests

### Community 54 - "Community 54"
Cohesion: 0.67
Nodes (2): Route, SitemapEntry

### Community 55 - "Community 55"
Cohesion: 0.67
Nodes (2): cors, Route

### Community 56 - "Community 56"
Cohesion: 0.67
Nodes (2): Toaster(), ToasterProps

### Community 58 - "Community 58"
Cohesion: 1.00
Nodes (2): generateDueRecurringTaskInstances(), nextRecurrenceDueDate()

### Community 59 - "Community 59"
Cohesion: 1.00
Nodes (1): public.appointments

### Community 65 - "Community 65"
Cohesion: 1.00
Nodes (1): public.contact_submissions

## Knowledge Gaps
- **510 isolated node(s):** `Message`, `ChatRow`, `Message`, `Mode`, `CookiePrefs` (+505 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 47`** (1 nodes): `public.audit_log`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 51`** (1 nodes): `Route`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 52`** (1 nodes): `transporter`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 53`** (2 nodes): `public.extra_change_requests`, `public.password_reset_requests`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 54`** (2 nodes): `Route`, `SitemapEntry`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 55`** (2 nodes): `cors`, `Route`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 56`** (2 nodes): `Toaster()`, `ToasterProps`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 58`** (2 nodes): `generateDueRecurringTaskInstances()`, `nextRecurrenceDueDate()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 59`** (1 nodes): `public.appointments`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 65`** (1 nodes): `public.contact_submissions`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 6` to `Community 2`, `Community 39`, `Community 22`, `Community 43`, `Community 26`, `Community 31`, `Community 20`, `Community 33`, `Community 40`, `Community 34`, `Community 24`, `Community 5`, `Community 49`, `Community 21`, `Community 41`, `Community 42`, `Community 28`, `Community 37`, `Community 44`?**
  _High betweenness centrality (0.143) - this node is a cross-community bridge._
- **Why does `Skeleton()` connect `Community 28` to `Community 14`, `Community 27`, `Community 2`, `Community 10`, `Community 8`, `Community 12`, `Community 5`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **Why does `requireSupabaseAuth` connect `Community 32` to `Community 15`, `Community 1`, `Community 19`, `Community 7`?**
  _High betweenness centrality (0.009) - this node is a cross-community bridge._
- **What connects `Message`, `ChatRow`, `Message` to the rest of the system?**
  _510 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.0673469387755102 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.015037593984962405 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.057912457912457915 - nodes in this community are weakly interconnected._