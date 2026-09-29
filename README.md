# MoTA Unified Scholarship Platform — SIH Frontend Prototype

A frontend-only, mobile-first SIH demonstration with synthetic data and mock verification connectors.

## Features
- 5 MoTA scholarship cards
- Scholarship Passport
- Smart eligibility demo
- Digital document wallet
- Unified verification center
- Exception handling / manual review path
- End-to-end application timeline
- JAGO prototype in English + Hindi
- Admin insights dashboard
- Unreached beneficiary discovery
- Offline/low-connectivity concept surfaced in UI
- Prototype-to-production adapter note

## Run locally
```bash
npm install
npm run dev
```
Open the localhost URL shown by Vite.

## Build
```bash
npm run build
npm run preview
```

## Deploy on Render
Create a **Static Site** from the GitHub repo.
- Build command: `npm install && npm run build`
- Publish directory: `dist`

## Important
This prototype does not call UIDAI, UDISE+, APAAR, DigiLocker, NSP, SFMP, NOS or any other protected government production APIs. All records shown are synthetic and all external checks are mock UI flows.
