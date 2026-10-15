(() => {
  "use strict";

  const yearElements = document.querySelectorAll("#year");
  yearElements.forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });

  const form = document.getElementById("booking-form");

  if (!form) return;

  const dateInput = document.getElementById("data");
  const status = document.getElementById("form-status");

  const getLocalDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  };

  dateInput.min = getLocalDateTime();

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    status.textContent = "";

    if (!form.reportValidity()) {
      return;
    }

    const nome = document.getElementById("nome").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const partenza = document.getElementById("partenza").value.trim();
    const destinazione = document.getElementById("destinazione").value.trim();
    const data = document.getElementById("data").value;

    if (!nome || !telefono || !partenza || !destinazione || !data) {
      status.textContent = "Controlla i campi obbligatori.";
      return;
    }

    const selectedDate = new Date(data);

    if (Number.isNaN(selectedDate.getTime()) || selectedDate < new Date()) {
      status.textContent = "Seleziona una data e un'ora future.";
      dateInput.focus();
      return;
    }

    const formattedDate = new Intl.DateTimeFormat("it-IT", {
      dateStyle: "full",
      timeStyle: "short"
    }).format(selectedDate);

    const message = [
      "Richiesta di prenotazione NCC",
      "",
      "Nome: " + nome,
      "Telefono: " + telefono,
      "Partenza: " + partenza,
      "Destinazione: " + destinazione,
      "Data e ora desiderate: " + formattedDate,
      "",
      "Richiesta da verificare e confermare con l'autista."
    ].join("\n");

const whatsappUrl =
  "https://wa.me/393388413408?text=" + encodeURIComponent(message);

    const newWindow = window.open(
      whatsappUrl,
      "_blank",
      "noopener,noreferrer"
    );

    if (!newWindow) {
      status.textContent =
        "WhatsApp non si è aperto. Consenti l'apertura della nuova scheda oppure contatta l'autista telefonicamente.";
      return;
    }

    status.textContent =
      "WhatsApp è stato aperto. Controlla il messaggio e premi Invia per trasmettere la richiesta.";
  });
})();
