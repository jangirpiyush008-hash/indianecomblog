import { buildArticles, type Draft } from "../build";

const drafts: Draft[] = [
  {
    id: "de-schufa-datenkopie",
    slug: "schufa-auskunft-kostenlos-datenkopie",
    title: "SCHUFA-Auskunft kostenlos: So beantragen Sie die Datenkopie nach Art. 15 DSGVO",
    seoTitle: "SCHUFA-Auskunft kostenlos beantragen – Datenkopie nach Art. 15 DSGVO (2026)",
    subtitle: "Die SCHUFA muss Ihnen Ihre gespeicherten Daten kostenlos mitteilen. Wichtig ist, das richtige Formular zu wählen – und nicht das Bezahlprodukt.",
    excerpt:
      "Die kostenlose SCHUFA-Auskunft heißt „Datenkopie nach Art. 15 DS-GVO“. So beantragen Sie sie online oder per Brief, was drinsteht und was sich beim neuen Score ändert.",
    category: "money",
    tags: ["SCHUFA", "Datenkopie", "DSGVO", "Bonität", "Score"],
    publishedAt: "2026-11-25T09:00:00+01:00",
    heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&h=1000&q=80",
    heroImageAlt: "Laptop mit Finanzdiagrammen",
    featured: true,
    keyTakeaways: [
      "Die kostenlose Auskunft heißt bei der SCHUFA „Datenkopie nach Art. 15 DS-GVO“ – nicht „Selbstauskunft“ oder „BonitätsCheck“.",
      "Beantragen online auf meineschufa.de oder formlos per Brief an die SCHUFA Holding AG, Postfach 10 25 66, 44725 Bochum.",
      "Weder für die Datenkopie noch für den Versand fallen Gebühren an.",
      "Die SCHUFA führt schrittweise einen neuen Score von 100 bis 999 ein, der die bisherigen Scores ersetzt.",
    ],
    body: [
      { type: "h2", id: "ihr-recht", text: "Ihr Recht auf eine kostenlose Auskunft" },
      {
        type: "p",
        text: "Nach Artikel 15 der Datenschutz-Grundverordnung müssen Unternehmen Ihnen mitteilen, welche Daten sie über Sie speichern. Bei der SCHUFA heißt dieses kostenlose Angebot „Datenkopie nach Art. 15 DS-GVO“. Eine Begründung brauchen Sie nicht.",
      },
      {
        type: "callout",
        title: "Vorsicht, Verwechslungsgefahr",
        text: "Auf den Seiten der SCHUFA werden auch kostenpflichtige Produkte angeboten. Achten Sie auf den Begriff „Datenkopie nach Art. 15 DS-GVO“.",
      },
      { type: "h2", id: "online", text: "So beantragen Sie die Datenkopie online" },
      {
        type: "ol",
        items: [
          "Öffnen Sie meineschufa.de.",
          "Scrollen Sie bis zum Bereich „Datenkopie nach Art. 15 DS-GVO“ und wählen Sie „Datenkopie bestellen“.",
          "Geben Sie Ihre Daten ein, inklusive früherer Anschriften der letzten Jahre.",
          "Die Datenkopie kommt per Post.",
        ],
      },
      { type: "h2", id: "brief", text: "Per Brief" },
      {
        type: "p",
        text: "Sie können auch formlos schreiben: an die SCHUFA Holding AG, Postfach 10 25 66, 44725 Bochum, mit der Bitte um eine Datenkopie nach Art. 15 DS-GVO. Die Verbraucherzentrale rät von telefonischen Anfragen ab und empfiehlt den schriftlichen oder Online-Weg.",
      },
      { type: "h2", id: "pruefen", text: "Worauf Sie achten sollten" },
      {
        type: "ul",
        items: [
          "Stimmen Name, Geburtsdatum und Anschriften?",
          "Gibt es Konten, Kredite oder Verträge, die Sie nicht kennen?",
          "Sind erledigte Forderungen als erledigt markiert?",
        ],
      },
      {
        type: "p",
        text: "Falsche Einträge können Sie bei der SCHUFA und beim meldenden Unternehmen berichtigen lassen.",
      },
      { type: "h2", id: "neuer-score", text: "Der neue SCHUFA-Score" },
      {
        type: "p",
        text: "Die SCHUFA führt nach und nach einen neuen Score mit Werten zwischen 100 und 999 ein, der die bisherigen Branchenscores und den Basisscore ersetzt. Laut Stiftung Warentest soll sich der Wert anhand weniger Kriterien nachvollziehen lassen.",
      },
    ],
    faq: [
      {
        question: "Ist die SCHUFA-Auskunft kostenlos?",
        answer: "Ja. Die „Datenkopie nach Art. 15 DS-GVO“ ist kostenlos, inklusive Versand.",
      },
      {
        question: "Wie oft kann ich die Datenkopie bestellen?",
        answer: "Die DSGVO legt keine feste Häufigkeit fest; Quellen nennen mindestens einmal pro Jahr kostenlos. Prüfen Sie die aktuellen Bedingungen bei der SCHUFA.",
      },
    ],
    sources: [
      { name: "Verbraucherzentrale — Scoring und Auskunfteien", url: "https://www.verbraucherzentrale.de/scoring" },
      { name: "Stiftung Warentest — Schufa-Daten prüfen", url: "https://www.test.de/Gewusst-wie-Schufa-Daten-pruefen-4530316-0/" },
      { name: "Stiftung Warentest — Vorsicht Kostenfalle bei der Eigenauskunft", url: "https://www.test.de/Schufa-Eigenauskunft-Vorsicht-Kostenfalle-5356583-0/" },
    ],
    methodology: "Zusammengestellt aus Angaben der Verbraucherzentrale und der Stiftung Warentest, geprüft am 25. November 2026.",
  },
];

export const articles = buildArticles("de", drafts);
