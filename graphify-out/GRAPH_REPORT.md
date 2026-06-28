# Graph Report - C:\Users\milan\Documents\AIMI\aimi-digital-craft  (2026-06-28)

## Corpus Check
- 147 files · ~242,723 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 779 nodes · 1118 edges · 58 communities (51 shown, 7 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.84)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 36|Community 36]]
- [[_COMMUNITY_Community 37|Community 37]]
- [[_COMMUNITY_Community 38|Community 38]]
- [[_COMMUNITY_Community 39|Community 39]]
- [[_COMMUNITY_Community 40|Community 40]]
- [[_COMMUNITY_Community 41|Community 41]]
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Community 44|Community 44]]
- [[_COMMUNITY_Community 45|Community 45]]
- [[_COMMUNITY_Community 46|Community 46]]
- [[_COMMUNITY_Community 47|Community 47]]
- [[_COMMUNITY_Community 48|Community 48]]
- [[_COMMUNITY_Community 49|Community 49]]
- [[_COMMUNITY_Community 51|Community 51]]
- [[_COMMUNITY_Community 54|Community 54]]

## God Nodes (most connected - your core abstractions)
1. `cn()` - 69 edges
2. `compilerOptions` - 17 edges
3. `FileRoutesByPath` - 16 edges
4. `usePermissions()` - 9 edges
5. `supabase` - 9 edges
6. `scripts` - 8 edges
7. `Lovable implementation plan (8 feature phases)` - 8 edges
8. `supabaseAdmin` - 7 edges
9. `aliases` - 6 edges
10. `buttonVariants` - 6 edges

## Surprising Connections (you probably didn't know these)
- `CLAUDE.md graphify usage instructions` --conceptually_related_to--> `Lovable implementation plan (8 feature phases)`  [INFERRED]
  CLAUDE.md → .lovable/plan.md
- `AIMI favicon — 'A.' logo mark (dark bg, red dot)` --conceptually_related_to--> `AIMI — web agency (design, development & hosting)`  [INFERRED]
  public/favicon.svg → public/llms.txt
- `AIMI OG image — large 'A.' on dark background (1200x630)` --conceptually_related_to--> `AIMI — web agency (design, development & hosting)`  [INFERRED]
  public/og-image.svg → public/llms.txt
- `Inner()` --calls--> `Nav()`  [INFERRED]
  src/routes/_authenticated.tsx → src/components/Nav.tsx
- `AlertDialogHeader()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/alert-dialog.tsx → src/lib/utils.ts

## Import Cycles
- None detected.

## Communities (58 total, 7 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.03
Nodes (59): dependencies, class-variance-authority, @cloudflare/vite-plugin, clsx, cmdk, date-fns, embla-carousel-react, @hookform/resolvers (+51 more)

### Community 1 - "Community 1"
Cohesion: 0.05
Nodes (33): ADMIN_LIKE, adminArchiveChange, adminAssignChange, adminBulkArchive, adminChangeAccountRole, adminCreateTempAccount, adminHardDeleteAccount, adminListAllAccounts (+25 more)

### Community 2 - "Community 2"
Cohesion: 0.05
Nodes (38): useIsMobile(), Input, Separator, SheetContent, SheetContentProps, SheetDescription, SheetFooter(), SheetHeader() (+30 more)

### Community 3 - "Community 3"
Cohesion: 0.06
Nodes (36): ADMIN_LIKE_ROLES, adminAddOnboardingItem, adminApproveExtraChangeRequest, adminBulkComplete, adminBulkSoftDelete, adminCreateAppointment, adminCreateChangeForCustomer, adminCreateContactMoment (+28 more)

### Community 4 - "Community 4"
Cohesion: 0.07
Nodes (29): devDependencies, eslint, eslint-config-prettier, @eslint/js, eslint-plugin-prettier, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals (+21 more)

### Community 5 - "Community 5"
Cohesion: 0.09
Nodes (20): BerichtenTab(), Contact(), Mode, ADMIN_LIKE, adminDeleteContactSubmission, adminListContactSubmissions, adminToggleContactHandled, STAFF_ROLES (+12 more)

### Community 6 - "Community 6"
Cohesion: 0.08
Nodes (15): Alert, AlertDescription, AlertTitle, alertVariants, Checkbox, HoverCardContent, PopoverContent, Progress (+7 more)

### Community 7 - "Community 7"
Cohesion: 0.09
Nodes (24): getRouter(), AlgemeneVoorwaardenRoute, ApiPublicHooksExpireAccountsRoute, ApiPublicSiteErrorRoute, ApiPublicSitePingRoute, AuthenticatedAccountRoute, AuthenticatedAdminRoute, AuthenticatedPortalRoute (+16 more)

### Community 8 - "Community 8"
Cohesion: 0.11
Nodes (19): AdminPage(), DeletedChangesTab(), TeamTab(), usePermissions(), adminChangeRole, adminGetAuditLog, adminGetMyRoles, adminHardDeleteChange (+11 more)

### Community 9 - "Community 9"
Cohesion: 0.12
Nodes (11): About(), CookieBanner(), CookiePrefs, FAQ(), items, Hero(), links, Nav() (+3 more)

### Community 10 - "Community 10"
Cohesion: 0.13
Nodes (14): AdminChatPanel(), ChatRow, Message, ChatWidget(), Message, AuthCtx, AuthProvider(), Ctx (+6 more)

### Community 11 - "Community 11"
Cohesion: 0.17
Nodes (17): cn(), Button, ButtonProps, buttonVariants, Calendar(), CalendarDayButton(), Pagination(), PaginationContent (+9 more)

### Community 12 - "Community 12"
Cohesion: 0.10
Nodes (19): compilerOptions, allowImportingTsExtensions, jsx, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch (+11 more)

### Community 13 - "Community 13"
Cohesion: 0.11
Nodes (18): aliases, components, hooks, lib, ui, utils, iconLibrary, registries (+10 more)

### Community 14 - "Community 14"
Cohesion: 0.15
Nodes (9): Route, expireBlockedAccountsImpl(), Body, cors, Route, Body, cors, Route (+1 more)

### Community 15 - "Community 15"
Cohesion: 0.12
Nodes (14): Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut() (+6 more)

### Community 16 - "Community 16"
Cohesion: 0.12
Nodes (11): Menubar, MenubarCheckboxItem, MenubarContent, MenubarItem, MenubarLabel, MenubarRadioItem, MenubarSeparator, MenubarShortcut() (+3 more)

### Community 17 - "Community 17"
Cohesion: 0.16
Nodes (10): ChangeCard(), FILTER_LABEL, FilterKey, mapStatus(), matchesFilter(), STATUS_STYLE, StatusKey, stepIndex() (+2 more)

### Community 18 - "Community 18"
Cohesion: 0.22
Nodes (10): consumeLastCapturedError(), renderErrorPage(), brandedErrorResponse(), fetch(), getServerEntry(), isCatastrophicSsrErrorBody(), normalizeCatastrophicSsrResponse(), ServerEntry (+2 more)

### Community 19 - "Community 19"
Cohesion: 0.15
Nodes (12): cancelMyChange, getAttachmentUrl, getMyDashboard, logLogin, markAllNotificationsRead, markNotificationRead, postCustomerComment, requestExtraChanges (+4 more)

### Community 20 - "Community 20"
Cohesion: 0.15
Nodes (11): adminCreateCustomer(), adminGenerateRecoveryLink(), adminGetCustomerDetail(), adminGetGrowthMetrics(), adminInviteStaffMember(), adminListCustomers(), adminSetUserPassword(), adminUpdateUserEmail() (+3 more)

### Community 21 - "Community 21"
Cohesion: 0.14
Nodes (11): FormControl, FormDescription, FormFieldContext, FormFieldContextValue, FormItem, FormItemContext, FormItemContextValue, FormLabel (+3 more)

### Community 22 - "Community 22"
Cohesion: 0.16
Nodes (14): CLAUDE.md graphify usage instructions, admin_notifications DB table, change_requests DB table (extended), Cron edge function (dagelijks 02:00 UTC, verlopen accounts), Fase 1 — Database fundering, Fase 2 — Accounts beheer pagina, Fase 3 — Tijdelijke accounts, Fase 4 — Changes archiveren + bulk + assign (+6 more)

### Community 23 - "Community 23"
Cohesion: 0.14
Nodes (12): Carousel, CarouselApi, CarouselContent, CarouselContext, CarouselContextProps, CarouselItem, CarouselNext, CarouselOptions (+4 more)

### Community 24 - "Community 24"
Cohesion: 0.18
Nodes (12): PortalPage(), CATEGORY_KEYS, CATEGORY_LABEL, CHANGE_TEMPLATES, isCategoryFree(), priceForChange(), PRIORITY_COLOR, PRIORITY_LABEL (+4 more)

### Community 25 - "Community 25"
Cohesion: 0.18
Nodes (10): Route, Route, Route, Route, Route, Route, Route, SitemapEntry (+2 more)

### Community 26 - "Community 26"
Cohesion: 0.18
Nodes (7): ChartConfig, ChartContainer, ChartContext, ChartContextProps, ChartLegendContent, ChartTooltipContent, THEMES

### Community 27 - "Community 27"
Cohesion: 0.20
Nodes (9): ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuShortcut(), ContextMenuSubContent (+1 more)

### Community 28 - "Community 28"
Cohesion: 0.20
Nodes (9): DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut(), DropdownMenuSubContent (+1 more)

### Community 29 - "Community 29"
Cohesion: 0.22
Nodes (8): AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter(), AlertDialogHeader(), AlertDialogOverlay, AlertDialogTitle

### Community 30 - "Community 30"
Cohesion: 0.22
Nodes (8): Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow

### Community 31 - "Community 31"
Cohesion: 0.32
Nodes (3): Footer(), Route, Route

### Community 33 - "Community 33"
Cohesion: 0.25
Nodes (7): Breadcrumb, BreadcrumbEllipsis(), BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator()

### Community 34 - "Community 34"
Cohesion: 0.25
Nodes (6): DrawerContent, DrawerDescription, DrawerFooter(), DrawerHeader(), DrawerOverlay, DrawerTitle

### Community 35 - "Community 35"
Cohesion: 0.25
Nodes (7): NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle, NavigationMenuViewport

### Community 36 - "Community 36"
Cohesion: 0.25
Nodes (7): SelectContent, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger

### Community 37 - "Community 37"
Cohesion: 0.38
Nodes (3): adminExists, setupFirstAdmin, Route

### Community 38 - "Community 38"
Cohesion: 0.29
Nodes (6): Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle

### Community 39 - "Community 39"
Cohesion: 0.33
Nodes (5): ToggleGroup, ToggleGroupContext, ToggleGroupItem, Toggle, toggleVariants

### Community 40 - "Community 40"
Cohesion: 0.40
Nodes (4): InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot

### Community 41 - "Community 41"
Cohesion: 0.67
Nodes (4): AIMI — web agency (design, development & hosting), AIMI favicon — 'A.' logo mark (dark bg, red dot), AIMI agency description (llms.txt), AIMI OG image — large 'A.' on dark background (1200x630)

### Community 42 - "Community 42"
Cohesion: 0.50
Nodes (3): AccordionContent, AccordionItem, AccordionTrigger

### Community 43 - "Community 43"
Cohesion: 0.50
Nodes (3): Avatar, AvatarFallback, AvatarImage

### Community 44 - "Community 44"
Cohesion: 0.67
Nodes (3): Badge(), BadgeProps, badgeVariants

### Community 45 - "Community 45"
Cohesion: 0.50
Nodes (3): TabsContent, TabsList, TabsTrigger

## Knowledge Gaps
- **382 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `css` (+377 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 11` to `Community 2`, `Community 6`, `Community 15`, `Community 16`, `Community 21`, `Community 23`, `Community 26`, `Community 27`, `Community 28`, `Community 29`, `Community 30`, `Community 33`, `Community 34`, `Community 35`, `Community 36`, `Community 38`, `Community 39`, `Community 40`, `Community 42`, `Community 43`, `Community 44`, `Community 45`?**
  _High betweenness centrality (0.213) - this node is a cross-community bridge._
- **Why does `DialogHeader()` connect `Community 15` to `Community 17`, `Community 11`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **Why does `DialogFooter()` connect `Community 15` to `Community 17`, `Community 11`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _382 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.03389830508474576 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.04713804713804714 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.052525252525252523 - nodes in this community are weakly interconnected._