# CSE 134B Homework 4

Aaron Delgado

For this homework, I added two contact forms, light and dark themes, and page transitions to my portfolio. I kept the form working with HTML first, then used JavaScript to add feedback as someone fills it out.

| File | Purpose |
| :--- | :--- |
| `form-no-js.html` | Parts 1 and 2: form submission and validation without JavaScript |
| `form-with-js.html` | Part 3: the same form with error messages and a character counter |
| `form.js` | Form feedback and error history |
| `theme.js` | Theme switching and saving the preference |
| `styles.css` | Shared styling, both themes, validation states, and page transitions |
| `experiments.js` | The existing Hello World and canvas demonstrations |
| `TESTING.md` | Completed checks and checks still needed before submission |

## Forms

Both forms submit to `https://httpbin.org/post`, which returns the submitted fields. They do not send me an email. Use sample information when testing.

Names accept 1–100 characters, including one-character names and punctuation. Comments accept 10–1,000 characters. Email uses the browser's built-in email validation. The hidden `possible_bot` field demonstrates submitting a hidden value; it is not bot detection.

The version with JavaScript shows errors after someone leaves a field they've edited or tries to submit. Once they fix the field, the error goes away. The character count gives a warning with 100 characters left and another message when it reaches the limit.

The `form_errors` array records each invalid field once per failed submission attempt. Editing updates feedback without adding history entries. A successful submission includes the JSON history in the hidden `form-errors` field. The history contains field names and error messages, not the values entered by the user.

The form keeps native validation enabled. A capturing `invalid` listener records failed attempts because those can happen before the browser fires `submit`. Editing checks inspect `.validity` without calling validation methods that would create extra `invalid` events.

## Themes and transitions

The default theme is light. The theme button appears only after its JavaScript is ready. Theme colors use CSS custom properties, and `localStorage` remembers the selection. Reading and writing storage are handled separately so switching still works on the current page if saving fails.

`form-no-js.html` has no scripts or theme button and keeps the default theme.

Normal links between portfolio pages use the View Transition API through `@view-transition`. The cross-fade lasts 160 milliseconds. The reduced-motion rule removes the animation. Navigation does not depend on transition support.

## Keeping it small

The site uses plain HTML, CSS, and JavaScript, with no framework, web fonts, or build step. Scripts use `const` and `let` and load with `defer`. Form submission does not require a fetch request or custom routing.

The portrait and two project previews use smaller image files. Their WebP versions total 112,880 bytes, compared with 3,420,519 bytes for the previous displayed image files—a reduction of about 96.7% for those images. This is a file-size comparison, not a measured page-load improvement. Original project screenshots remain available through links.

The experiments page includes a generated three-tone audio sample and a silent test-pattern video. Media uses `preload="none"` so it is requested when needed.

## Run locally

From this folder, start a local web server:

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000/`. Use a server instead of opening HTML files directly so storage and same-origin page transitions can be checked properly.

## Publish and submit

1. Create a separate Homework 4 GitHub repository. Keep the Homework 2 and Homework 3 repositories and deployments unchanged.
2. Put these files at the new repository's root. Keep `assets` and `part1` in their existing folders. Both form pages must stay at the root.
3. Create a separate Netlify deployment from that repository. This is a static site: no build command is needed, and the publish directory is the repository root (`.`).
4. Complete the remaining checks in `TESTING.md` on the deployed site, including the View Transition API in the latest stable desktop Chrome.
5. Submit the actual Homework 4 repository URL and deployed website URL through Gradescope. Make sure both are accessible to graders and that the committed and deployed files match.

The Homework 4 repository and deployment still need to be set up. `TESTING.md` lists the checks that are still open.