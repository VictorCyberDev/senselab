# SenseLab — Science Beyond Sight

## Inspiration
Science is often presented through graphs, diagrams and visual laboratory interfaces. A blind learner may receive a description while someone else controls the investigation. SenseLab focuses on the missing layer: agency.

## What it does
Learners independently ask a question, make a hypothesis, change valid variables, run a deterministic model, inspect results as table, graph or sound, write an evidence-based conclusion and save it to a scientist's notebook. Four investigations cover thermal physics, electricity, motion and population biology.

## How it was built
The dependency-light PWA uses semantic HTML, CSS and ES modules. Pure functions validate units and ranges while one result representation drives text, tables, SVG and audio. A service worker supports offline learning. Node tests verify equations and boundaries. An optional Supabase migration defines future persistence with RLS.

## Difference
SenseLab is not a screen reader wrapped around a visual simulation. Accessibility is part of experiment state: variables are semantic controls, results are exact data, and the complete inquiry cycle is operable without sight.

## Limitations and next steps
The baseline saves data on one device. Authenticated synchronization, classroom sharing, educator rubric review and consented blind/low-vision learner testing are next. We make no fictional learning-gain or usability claims.
