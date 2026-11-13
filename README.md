# SenseLab — Science Beyond Sight

SenseLab is an accessible scientific investigation platform built first for blind and low-vision learners. It makes the complete inquiry loop operable without vision: question, hypothesis, experimental design, reproducible trial, exact data inspection, optional sonification, explanation, transfer and reflection.

**Live product:** https://senselab-accessed.vercel.app

## Working product

- Four deterministic investigations: thermal physics, circuits, motion and population dynamics.
- Keyboard- and screen-reader-first eight-stage investigation flow.
- One dataset represented as a semantic table, described graph and optional sound.
- Device-local scientist's notebook with export and deletion.
- Contrast, text size, motion and audio preferences.
- Teacher assignment and safe linear experiment-authoring previews.
- Offline-first PWA service worker, scientific boundary tests and CI gate.
- Optional Supabase schema with row-level security for an authenticated release.

## Run and verify

```bash
npm test
npm run check
npx serve . -l 3000
```

Open `http://localhost:3000`. No account or environment variables are required for the public learning flow.

## Truth boundary

The current baseline persists data in the learner's browser. Multi-device authentication, classroom sharing and real participant usability evidence are not claimed until configured and verified. The public guest inquiry and notebook flow has been production-smoke-tested. See [release status](docs/deployment/RELEASE_STATUS.md) and [validation matrix](docs/validation/JUDGING_EVIDENCE_MATRIX.md).

## Documentation

- [Architecture](docs/architecture/ARCHITECTURE.md)
- [Scientific model validation](docs/science/MODEL_VALIDATION.md)
- [Accessibility requirements](docs/research/ACCESSIBILITY_REQUIREMENTS.md)
- [Competitive landscape](docs/research/COMPETITIVE_LANDSCAPE.md)
- [Learning-science evidence](docs/research/LEARNING_SCIENCE_EVIDENCE.md)
- [Testing](docs/validation/TESTING.md)
- [Hackathon narrative](docs/hackathon/DEVPOST_DRAFT.md)

License: [MIT](LICENSE).
