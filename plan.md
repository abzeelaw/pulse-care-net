# Kaduna Health Connect - Implementation Plan

Kaduna Health Connect is a mobile-first digital healthcare platform for Kaduna State, enabling citizens to access doctors, emergency services, and health records.

## Scope Summary
- **Mobile-First UI**: Responsive design optimized for mobile users.
- **Emergency System**: One-tap SOS, ambulance requests, and GPS sharing simulation.
- **Consultation System**: Doctor browsing, filtering, and booking.
- **Directory**: Hospital and clinic listings with service details.
- **Medical Records**: Digital prescriptions and history tracking.
- **Persistence**: Client-side state management (localStorage/Context) for demo purposes (No Supabase).
- **Rural Mode**: Low-bandwidth/SMS fallback UI options.

## Assumptions & Risks
- **No Backend**: All data will be mocked. Persistence is limited to browser `localStorage`.
- **GPS Simulation**: Real GPS requires user permission; fallback to manual location input for the demo.
- **Consultation Simulation**: Chat/Video calls will be simulated interfaces, not real-time peer-to-peer connections.

## Affected Areas
- **Frontend**: All UI components, state management for "current user" and "bookings".
- **Navigation**: Multi-tab/Drawer navigation suitable for a mobile health app.
- **Data**: Mocked datasets for Doctors, Hospitals, and Health Tips.

---

## Phases

### Phase 1: Foundation & Core Layout
- Set up routing (React Router) and primary navigation (Bottom Bar/Sidebar).
- Define global theme (Health-centric: Greens/Blues).
- Create basic data models and mock stores.
- **Owner**: `frontend_engineer`

### Phase 2: Dashboard & Emergency SOS
- Build the Home Dashboard with quick actions.
- Implement the "Emergency Medical Help" flow with GPS simulation and category selection.
- Build the "Rural Mode" toggle (lightweight UI).
- **Owner**: `frontend_engineer`

### Phase 3: Doctor Consultation & Booking
- Create the Doctor Directory with filtering (Specialties).
- Build the Doctor Profile and Booking modal/calendar.
- Implement the simulated "Consultation Room" (Chat UI).
- **Owner**: `frontend_engineer`

### Phase 4: Hospital Directory & Health Records
- Build the Hospital/Clinic search and detail views.
- Implement the "My Records" section for prescriptions and history.
- Add "Medicine Reminders" and "Health Alerts".
- **Owner**: `frontend_engineer`

### Phase 5: Admin/Provider Simulation
- Create a simplified "Health Authority" view to monitor emergency requests and verify professionals.
- Final UI polish and accessibility check.
- **Owner**: `frontend_engineer`

---

## Execution Handoff

**Plan status:** ready

**Dispatch order:**
1. frontend_engineer — Implementation of the entire mobile-first platform using mock data and localStorage.

**Per-agent instructions:**

### 1. frontend_engineer
- **Phases:** 1, 2, 3, 4, 5
- **Scope:** 
    - Build a high-fidelity mobile-first React application.
    - Use `lucide-react` for health/medical icons.
    - Implement a robust mock data layer for doctors, hospitals, and users.
    - Create a persistent "User Profile" in `localStorage` to track appointments and medical history.
    - Focus heavily on the "Emergency" UI/UX—it should feel urgent and easy to use.
    - Implement "Rural Mode" as a CSS/Feature flag that simplifies the UI and swaps images for text.
- **Files:** 
    - `src/App.tsx` (Routing)
    - `src/components/*` (Health UI components)
    - `src/hooks/useHealthStore.ts` (State management)
    - `src/data/mockData.ts` (Static data for doctors/hospitals)
- **Depends on:** none
- **Acceptance criteria:**
    - App is fully responsive and looks like a native mobile app on small screens.
    - Emergency button triggers a multi-step flow (Category -> Location -> Confirm).
    - Users can "book" an appointment and see it reflected in their "My Records" or Dashboard.
    - Doctor filtering by specialty works correctly.
    - Rural mode significantly reduces visual clutter.
