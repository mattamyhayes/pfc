# pfc

PFC Assignment tracker and grading workflow demo.

## Run locally

Because this repository is a lightweight static prototype, no package install is required.

```bash
cd /tmp/workspace/mattamyhayes/pfc
python3 -m http.server 8000
```

Then open `http://localhost:8000` in a browser.

## Included demo workflows

- Admin setup for classes, assignments, and question counts
- Program Sponsor setup for institutions, students, coaches, and volunteers
- Coach upload flow for PDFs or mobile photos with language selection and grader assignment
- Volunteer review flow with per-question feedback, translation view, completion gating, and PDF packet generation
- Coach reporting with pending status and volunteer aging
- Role-switch links to compare Coach, Volunteer, Program Sponsor, and Admin screens
