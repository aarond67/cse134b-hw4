const contactForm = document.querySelector("#contact-form");
const fields = Array.from(contactForm.querySelectorAll("[required]"));
const comments = document.querySelector("#comments");
const errorArea = document.querySelector("#form-feedback");
const errorHeading = document.querySelector("#error-heading");
const informationArea = document.querySelector("#form-information");
const characterCount = document.querySelector("#character-count");
const lengthWarning = document.querySelector("#length-warning");
const errorHistory = document.querySelector("#error-history");
const warningThreshold = 100;
const form_errors = [];
const editedFields = new Set();
const reviewedFields = new Set();
const fieldMessages = new Map(fields.map(function (field) {
    return [field, document.getElementById(field.id + "-error")];
}));
let triedToSubmit = false;

function validateField(field) {
    field.setCustomValidity("");
    let message = "";

    if (field.validity.valueMissing) {
        if (field === comments) {
            message = "Write a comment before submitting.";
        } else {
            message = "Enter your " + field.name + ".";
        }
    } else if (field.validity.typeMismatch) {
        message = "Enter an email address, such as aaron@example.com.";
    } else if (field.validity.tooShort) {
        message = "Use at least " + field.minLength + " characters.";
    } else if (!field.validity.valid) {
        message = "Check this field and try again.";
    }

    field.setCustomValidity(message);
    return message;
}

function showFieldMessage(field, message) {
    const feedback = fieldMessages.get(field);
    const label = field.labels[0].textContent.replace(" (required)", "");
    const text = message ? label + ": " + message : "";

    if (feedback.textContent !== text) {
        feedback.textContent = text;
    }
    feedback.hidden = !message;

    if (message) {
        field.setAttribute("aria-invalid", "true");
    } else {
        field.removeAttribute("aria-invalid");
    }
    errorHeading.hidden = fields.every(function (control) {
        return fieldMessages.get(control).hidden;
    });
}

function updateCharacterCount() {
    const remaining = comments.maxLength - comments.value.length;
    characterCount.textContent = remaining + " characters remaining.";
    informationArea.classList.toggle("near-limit", remaining <= warningThreshold);

    let message = "";
    if (remaining === 0) {
        message = "You've reached the limit. You can still edit or submit your comment.";
    } else if (remaining <= warningThreshold) {
        message = "You're close to the limit.";
    }
    if (lengthWarning.textContent !== message) {
        lengthWarning.textContent = message;
    }
}

for (const field of fields) {
    field.addEventListener("input", function () {
        editedFields.add(field);
        const message = validateField(field);
        if (triedToSubmit || reviewedFields.has(field)) {
            showFieldMessage(field, message);
        }
        if (field === comments) {
            updateCharacterCount();
        }
    });

    field.addEventListener("blur", function () {
        if (editedFields.has(field)) {
            reviewedFields.add(field);
            showFieldMessage(field, validateField(field));
        }
    });
}

contactForm.addEventListener("invalid", function (event) {
    const field = event.target;
    if (!fieldMessages.has(field)) {
        return;
    }
    triedToSubmit = true;
    const message = validateField(field);
    showFieldMessage(field, message);
    form_errors.push({ field: field.name, message: message });
}, true);

contactForm.addEventListener("submit", function () {
    errorHistory.value = JSON.stringify(form_errors);
});

updateCharacterCount();
errorArea.hidden = false;
informationArea.hidden = false;