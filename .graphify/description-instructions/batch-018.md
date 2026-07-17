# Node Description Batch 19 of 34

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

- "components_leadspanel_status": "Status" | kind=code-symbol | source=src/components/LeadsPanel.tsx:L24 | neighbors=[LeadsPanel.tsx]
- "components_leadspanel_status_color": "STATUS_COLOR" | kind=code-symbol | source=src/components/LeadsPanel.tsx:L35 | neighbors=[LeadsPanel.tsx]
- "components_leadspanel_status_dot": "STATUS_DOT" | kind=code-symbol | source=src/components/LeadsPanel.tsx:L45 | neighbors=[LeadsPanel.tsx]
- "components_leadspanel_status_label": "STATUS_LABEL" | kind=code-symbol | source=src/components/LeadsPanel.tsx:L26 | neighbors=[LeadsPanel.tsx]
- "components_leadspanel_statuses": "STATUSES" | kind=code-symbol | source=src/components/LeadsPanel.tsx:L23 | neighbors=[LeadsPanel.tsx]
- "components_nav_links": "links" | kind=code-symbol | source=src/components/Nav.tsx:L3 | neighbors=[Nav.tsx]
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
- "components_portalonboardingtour_contacts": "Contacts" | kind=code-symbol | source=src/components/PortalOnboardingTour.tsx:L13 | neighbors=[PortalOnboardingTour.tsx]
- "components_portalonboardingtour_donescreen": "DoneScreen()" | kind=code-symbol | source=src/components/PortalOnboardingTour.tsx:L245 | neighbors=[PortalOnboardingTour.tsx]
- "components_portalonboardingtour_fadevariants": "fadeVariants" | kind=code-symbol | source=src/components/PortalOnboardingTour.tsx:L40 | neighbors=[PortalOnboardingTour.tsx]
- "components_portalonboardingtour_field": "Field()" | kind=code-symbol | source=src/components/PortalOnboardingTour.tsx:L285 | neighbors=[PortalOnboardingTour.tsx]
- "components_portalonboardingtour_formstate": "FormState" | kind=code-symbol | source=src/components/PortalOnboardingTour.tsx:L15 | neighbors=[PortalOnboardingTour.tsx]
- "components_portalonboardingtour_profile": "Profile" | kind=code-symbol | source=src/components/PortalOnboardingTour.tsx:L25 | neighbors=[PortalOnboardingTour.tsx]
- "components_portalonboardingtour_progressbar": "ProgressBar()" | kind=code-symbol | source=src/components/PortalOnboardingTour.tsx:L265 | neighbors=[PortalOnboardingTour.tsx]
- "components_portalonboardingtour_step_titles": "STEP_TITLES" | kind=code-symbol | source=src/components/PortalOnboardingTour.tsx:L38 | neighbors=[PortalOnboardingTour.tsx]
- "components_portalonboardingtour_stepcompany": "StepCompany()" | kind=code-symbol | source=src/components/PortalOnboardingTour.tsx:L300 | neighbors=[PortalOnboardingTour.tsx]
- "components_portalonboardingtour_stepcontact": "StepContact()" | kind=code-symbol | source=src/components/PortalOnboardingTour.tsx:L315 | neighbors=[PortalOnboardingTour.tsx]
- "components_portalonboardingtour_stepcontacts": "StepContacts()" | kind=code-symbol | source=src/components/PortalOnboardingTour.tsx:L346 | neighbors=[PortalOnboardingTour.tsx]
- "components_portalonboardingtour_stepproject": "StepProject()" | kind=code-symbol | source=src/components/PortalOnboardingTour.tsx:L336 | neighbors=[PortalOnboardingTour.tsx]
- "components_portalonboardingtour_stepsummary": "StepSummary()" | kind=code-symbol | source=src/components/PortalOnboardingTour.tsx:L370 | neighbors=[PortalOnboardingTour.tsx]
- "components_portalonboardingtour_welcomescreen": "WelcomeScreen()" | kind=code-symbol | source=src/components/PortalOnboardingTour.tsx:L207 | neighbors=[PortalOnboardingTour.tsx]
- "components_portaltutorial_fadevariants": "fadeVariants" | kind=code-symbol | source=src/components/PortalTutorial.tsx:L45 | neighbors=[PortalTutorial.tsx]
- "components_portaltutorial_progressdots": "ProgressDots()" | kind=code-symbol | source=src/components/PortalTutorial.tsx:L151 | neighbors=[PortalTutorial.tsx]
- "components_portaltutorial_slide": "Slide" | kind=code-symbol | source=src/components/PortalTutorial.tsx:L11 | neighbors=[PortalTutorial.tsx]
- "components_portaltutorial_slides": "SLIDES" | kind=code-symbol | source=src/components/PortalTutorial.tsx:L17 | neighbors=[PortalTutorial.tsx]
- "components_pricing_addons": "addons" | kind=code-symbol | source=src/components/Pricing.tsx:L4 | neighbors=[Pricing.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\milan\Documents\AIMI\aimi-digital-craft\.graphify\description-instructions\batch-018.json

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
