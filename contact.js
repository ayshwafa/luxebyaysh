// Contact form: send data to Java backend endpoint (simulated).

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const statusEl = document.getElementById("contact-status");
  const yearSpan = document.getElementById("footer-year");

  if (yearSpan) {
    yearSpan.textContent = String(new Date().getFullYear());
  }

  if (!form || !statusEl) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    statusEl.textContent = "Sending your message…";
    statusEl.classList.remove("la-success", "la-error");

    try {
      // Adjust URL to where your Java backend is hosted.
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        statusEl.textContent = "Thank you — your message has been received.";
        statusEl.classList.add("la-success");
        // @ts-ignore
        form.reset();
      } else {
        throw new Error("Request failed");
      }
    } catch {
      statusEl.textContent =
        "We could not reach the server right now. Your message has not been sent, please try again shortly.";
      statusEl.classList.add("la-error");
    }
  });
});

