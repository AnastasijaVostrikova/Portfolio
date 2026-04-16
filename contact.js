document.addEventListener("DOMContentLoaded", () => {
    const contactCard = document.querySelector(".contact-card");
    if (!contactCard) return;

    const rows = Array.from(contactCard.querySelectorAll("p"));
    const fragment = document.createDocumentFragment();

    rows.forEach((row) => {
        const text = row.textContent.trim();
        if (!text.includes(":")) return;

        const [rawLabel, ...rest] = text.split(":");
        const label = rawLabel.trim();
        const value = rest.join(":").trim();

        const item = document.createElement("div");
        item.className = "contact-row";

        const labelEl = document.createElement("div");
        labelEl.className = "contact-label";
        labelEl.textContent = label;

        const valueEl = document.createElement("div");
        valueEl.className = "contact-value";

        let copyValue = value;
        let shouldShowCopy = false;

        if (!value) {
            valueEl.innerHTML = `<span>Not provided</span>`;
        } else if (label.toLowerCase() === "email") {
            valueEl.innerHTML = `<a href="mailto:${value}">${value}</a>`;
            shouldShowCopy = true;
        } else if (label.toLowerCase() === "github") {
            valueEl.innerHTML = `<a href="${value}" target="_blank" rel="noopener noreferrer">${value}</a>`;
            shouldShowCopy = true;
        } else if (label.toLowerCase() === "phone") {
            const telValue = value.replace(/\s+/g, "");
            valueEl.innerHTML = `<a href="tel:${telValue}">${value}</a>`;
            copyValue = value;
            shouldShowCopy = true;
        } else {
            valueEl.textContent = value;
        }

        item.appendChild(labelEl);
        item.appendChild(valueEl);

        if (shouldShowCopy) {
            const btn = document.createElement("button");
            btn.className = "contact-copy-btn";
            btn.type = "button";
            btn.textContent = "Copy";
            btn.dataset.copy = copyValue;

            btn.addEventListener("click", async () => {
                try {
                    await navigator.clipboard.writeText(btn.dataset.copy);
                    btn.textContent = "Copied";
                    btn.classList.add("copied");

                    setTimeout(() => {
                        btn.textContent = "Copy";
                        btn.classList.remove("copied");
                    }, 1300);
                } catch (error) {
                    btn.textContent = "Error";

                    setTimeout(() => {
                        btn.textContent = "Copy";
                    }, 1300);
                }
            });

            item.appendChild(btn);
        }

        fragment.appendChild(item);
    });

    contactCard.innerHTML = "";
    contactCard.appendChild(fragment);
});