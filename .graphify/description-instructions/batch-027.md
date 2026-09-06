# Node Description Batch 28 of 49

Graphify is running in assistant/skill mode (no API key). You are the host
assistant (Claude Code / Codex / Gemini CLI). Read the prompt below and write
your JSON answer to the answer file.

## Prompt

You are documenting nodes in a knowledge graph.
For each entry below, write ONE concise factual plain-language sentence
describing what it is or does. Use only the provided context.
For a code symbol (kind=code-symbol — a function, class, or constant),
describe what the function/symbol does based on its name, source location
and neighbors — e.g. "Resolves the configured ontology profile from graphify.yaml.".
Write every description in English (en). Do not switch languages.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "components_leadspanel_sorts": "SORTS" | kind=code-symbol | source=src/components/LeadsPanel.tsx:L81 | neighbors=[LeadsPanel.tsx]
- "components_leadspanel_statcard": "StatCard()" | kind=code-symbol | source=src/components/LeadsPanel.tsx:L824 | neighbors=[LeadsPanel.tsx]
- "components_leadspanel_status": "Status" | kind=code-symbol | source=src/components/LeadsPanel.tsx:L38 | neighbors=[LeadsPanel.tsx]
- "components_leadspanel_status_color": "STATUS_COLOR" | kind=code-symbol | source=src/components/LeadsPanel.tsx:L53 | neighbors=[LeadsPanel.tsx]
- "components_leadspanel_status_dot": "STATUS_DOT" | kind=code-symbol | source=src/components/LeadsPanel.tsx:L63 | neighbors=[LeadsPanel.tsx]
- "components_leadspanel_status_hex": "STATUS_HEX" | kind=code-symbol | source=src/components/LeadsPanel.tsx:L56 | neighbors=[LeadsPanel.tsx]
- "components_leadspanel_status_label": "STATUS_LABEL" | kind=code-symbol | source=src/components/LeadsPanel.tsx:L40 | neighbors=[LeadsPanel.tsx]
- "components_leadspanel_statuses": "STATUSES" | kind=code-symbol | source=src/components/LeadsPanel.tsx:L37 | neighbors=[LeadsPanel.tsx]
- "components_locationlanding_locationfaq": "LocationFaq" | kind=code-symbol | source=src/components/LocationLanding.tsx:L16 | neighbors=[LocationLanding.tsx]
- "components_locationlanding_reasons": "REASONS" | kind=code-symbol | source=src/components/LocationLanding.tsx:L46 | neighbors=[LocationLanding.tsx]
- "components_locationlanding_services": "SERVICES" | kind=code-symbol | source=src/components/LocationLanding.tsx:L27 | neighbors=[LocationLanding.tsx]
- "components_locationpagev2_businesstypessection": "BusinessTypesSection()" | kind=code-symbol | source=src/components/LocationPageV2.tsx:L99 | neighbors=[LocationPageV2.tsx]
- "components_locationpagev2_contextsection": "ContextSection()" | kind=code-symbol | source=src/components/LocationPageV2.tsx:L73 | neighbors=[LocationPageV2.tsx]
- "components_locationpagev2_faqsection": "FaqSection()" | kind=code-symbol | source=src/components/LocationPageV2.tsx:L157 | neighbors=[LocationPageV2.tsx]
- "components_locationpagev2_local_services": "LOCAL_SERVICES" | kind=code-symbol | source=src/components/LocationPageV2.tsx:L25 | neighbors=[LocationPageV2.tsx]
- "components_locationpagev2_locationsectionid": "LocationSectionId" | kind=code-symbol | source=src/components/LocationPageV2.tsx:L20 | neighbors=[LocationPageV2.tsx]
- "components_locationpagev2_sectionrenderers": "sectionRenderers" | kind=code-symbol | source=src/components/LocationPageV2.tsx:L190 | neighbors=[LocationPageV2.tsx]
- "components_locationpagev2_workflowsection": "WorkflowSection()" | kind=code-symbol | source=src/components/LocationPageV2.tsx:L122 | neighbors=[LocationPageV2.tsx]
- "components_nav_links": "links" | kind=code-symbol | source=src/components/Nav.tsx:L37 | neighbors=[Nav.tsx]
- "components_nav_mobilemenu": "MobileMenu()" | kind=code-symbol | source=src/components/Nav.tsx:L178 | neighbors=[Nav.tsx]
- "components_nav_motionlink": "MotionLink" | kind=code-symbol | source=src/components/Nav.tsx:L6 | neighbors=[Nav.tsx]
- "components_nav_navlink": "NavLink()" | kind=code-symbol | source=src/components/Nav.tsx:L45 | neighbors=[Nav.tsx]
- "components_nav_servicecategories": "serviceCategories" | kind=code-symbol | source=src/components/Nav.tsx:L8 | neighbors=[Nav.tsx]
- "components_nav_services": "services" | kind=code-symbol | source=src/components/Nav.tsx:L35 | neighbors=[Nav.tsx]
- "components_nav_servicesmenu": "ServicesMenu()" | kind=code-symbol | source=src/components/Nav.tsx:L70 | neighbors=[Nav.tsx]
- "components_onboardingwizard_contactblock": "ContactBlock" | kind=code-symbol | source=src/components/OnboardingWizard.tsx:L16 | neighbors=[OnboardingWizard.tsx]
- "components_onboardingwizard_contacts": "Contacts" | kind=code-symbol | source=src/components/OnboardingWizard.tsx:L17 | neighbors=[OnboardingWizard.tsx]
- "components_onboardingwizard_donescreen": "DoneScreen()" | kind=code-symbol | source=src/components/OnboardingWizard.tsx:L256 | neighbors=[OnboardingWizard.tsx]
- "components_onboardingwizard_fadevariants": "fadeVariants" | kind=code-symbol | source=src/components/OnboardingWizard.tsx:L37 | neighbors=[OnboardingWizard.tsx]
- "components_onboardingwizard_field": "Field()" | kind=code-symbol | source=src/components/OnboardingWizard.tsx:L294 | neighbors=[OnboardingWizard.tsx]
- "components_onboardingwizard_formstate": "FormState" | kind=code-symbol | source=src/components/OnboardingWizard.tsx:L19 | neighbors=[OnboardingWizard.tsx]
- "components_onboardingwizard_progressbar": "ProgressBar()" | kind=code-symbol | source=src/components/OnboardingWizard.tsx:L274 | neighbors=[OnboardingWizard.tsx]
- "components_onboardingwizard_step_titles": "STEP_TITLES" | kind=code-symbol | source=src/components/OnboardingWizard.tsx:L29 | neighbors=[OnboardingWizard.tsx]
- "components_onboardingwizard_stepcompany": "StepCompany()" | kind=code-symbol | source=src/components/OnboardingWizard.tsx:L308 | neighbors=[OnboardingWizard.tsx]
- "components_onboardingwizard_stepcontact": "StepContact()" | kind=code-symbol | source=src/components/OnboardingWizard.tsx:L322 | neighbors=[OnboardingWizard.tsx]
- "components_onboardingwizard_stepcontacts": "StepContacts()" | kind=code-symbol | source=src/components/OnboardingWizard.tsx:L355 | neighbors=[OnboardingWizard.tsx]
- "components_onboardingwizard_stepproject": "StepProject()" | kind=code-symbol | source=src/components/OnboardingWizard.tsx:L343 | neighbors=[OnboardingWizard.tsx]
- "components_onboardingwizard_stepsummary": "StepSummary()" | kind=code-symbol | source=src/components/OnboardingWizard.tsx:L378 | neighbors=[OnboardingWizard.tsx]
- "components_onboardingwizard_welcomescreen": "WelcomeScreen()" | kind=code-symbol | source=src/components/OnboardingWizard.tsx:L223 | neighbors=[OnboardingWizard.tsx]
- "components_portalonboardingtour_contactblock": "ContactBlock" | kind=code-symbol | source=src/components/PortalOnboardingTour.tsx:L12 | neighbors=[PortalOnboardingTour.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-027.json

Keep each description factual and concise (one sentence). No markdown, no prose
outside the JSON object. It is acceptable to omit a node if context is
insufficient — but include every node you can ground confidently.

Example answer format:
```json
{
  "node_id_1": "Resolves the configured ontology profile from graphify.yaml.",
  "node_id_2": "Colonel James Barclay, an antagonist in The Crooked Man."
}
```
