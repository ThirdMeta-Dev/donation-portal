# Project Status & CMS Handoff

## Current Phase: Phase C — Frontend Wiring
The goal of this phase is to connect the hardcoded React pages to the Supabase CMS backend using the `useCmsPage` hook.

## ✅ Completed Wiring
The following pages have been fully wired to the CMS. They now fetch data from the database (with hardcoded fallbacks in `src/app/lib/constants.ts`).

1.  **About Page (`AboutPage.tsx`)**:
    *   Wired `FounderBioSection`, `MissionVisionSection`, `AboutMilestonesSection`, `TeamSection`, and `CertificationsSection`.
    *   Integrated global `BrandSettings`.
2.  **Contact Page (`ContactPage.tsx`)**:
    *   Wired `ContactInfoSection` (Address, Email, Phone, Socials, Maps).
    *   Wired `ContactGridSection` (Images for the "In My Words" section).
    *   Wired `ClosingSection` (Shared from Home schemas).
3.  **Donate Page (`DonatePage.tsx`)**:
    *   Wired `PresetAmountsSection` (Dynamic donation pills).
    *   Wired `ImpactMessagesSection` (Dynamic logic for "Your donation feeds X children").

## 🚧 Work In Progress: Home Page (`HomeV2Page.tsx`)
The Home Page is a high-complexity file (~5,500 lines). The wiring has started but is only partially complete.

**What's done on Home:**
*   `useCmsPage("home")` and `useCmsPage("brand")` hooks are initialized at the top level.
*   **HeroSection** is fully wired:
    *   `backgroundImage`, `awards`, `title`, `subtitle`, `ctaText`, and `secondaryCtaText` are now dynamic.

**🔴 Pending Tasks (Pick up here):**
The following sections in `HomeV2Page.tsx` are still using hardcoded arrays and strings. They need to be updated to accept a `data` prop from the parent:
*   `ProgramBanner` (Map to `ProgramBannerSection`)
*   `Section3` (Image Carousel -> `QuotesCarouselSection` or similar)
*   `Section4` (Recognitions -> `RecognitionsSection`)
*   `Section5` (Beyond Syllabus -> `BeyondSyllabusSection`)
*   `Section6` (Testimonials -> `TestimonialsSection`)
*   `Section8` (Sticky Card Stack -> `ProgramsSection` or `ProcessFlowSection`)
*   `Section9` (Progress -> `TestimonialsSection` variants)
*   `Section10` (Get Involved -> `GetInvolvedSection`)
*   `SectionHonestImpact` (Needs a new schema or mapping to existing)
*   `Section13` (CTA Banner -> `ClosingSection` variants)
*   `Section14/15/16/17` (Team, FAQs, Social Grid)
*   `SectionClosing` (Map to `ClosingSection`)

## 🛠 CMS Reference
*   **Hook:** `const { getSection } = useCmsPage("page-slug");`
*   **Accessing Data:** `const { content, items } = getSection("SectionName");`
*   **Environment:** Currently targeting the `STAGING` environment via `VITE_ENVIRONMENT`.

## 🔑 Admin Access (Staging)
*   **URL:** `staging.ujjwalawadekar.com/admin`
*   **Username:** `admin@shiksharaj.org`
*   **Password:** `Admin@123`
