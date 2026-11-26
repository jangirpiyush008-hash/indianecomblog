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
  {
    id: "de-deutschlandticket-2026",
    slug: "deutschlandticket-preis-kuendigung",
    title: "Deutschlandticket 2026: 63 € im Monat – und bis wann Sie kündigen müssen",
    seoTitle: "Deutschlandticket 2026: Preis 63 €, Kündigung bis zum 10., Jobticket-Rabatt",
    subtitle: "Das Ticket für Nah- und Regionalverkehr kostet seit Januar 2026 mehr. Was gilt, für wen es sich lohnt und wie die Kündigung funktioniert.",
    excerpt:
      "Das Deutschlandticket kostet 2026 63 € im Monat. Es ist ein monatlich kündbares Abo – wer zum Monatsende aussteigen will, muss in der Regel bis zum 10. kündigen.",
    category: "travel",
    tags: ["Deutschlandticket", "ÖPNV", "Deutsche Bahn", "Jobticket"],
    publishedAt: "2026-11-26T09:00:00+01:00",
    heroImage: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&h=1000&q=80",
    heroImageAlt: "Flugzeugflügel über den Wolken",
    keyTakeaways: [
      "Preis 2026: 63 € pro Monat (vorher 58 €).",
      "Gültig deutschlandweit in Bussen, Straßenbahnen, U- und S-Bahnen sowie im Regionalverkehr (RE, RB) – nicht im Fernverkehr wie ICE oder IC.",
      "Es ist ein Abo, monatlich kündbar – in der Regel bis zum 10. des Monats zum Monatsende.",
      "Als Jobticket gibt es Rabatt, wenn der Arbeitgeber mindestens 25 % zuschießt.",
    ],
    body: [
      { type: "h2", id: "was-gilt", text: "Wo das Ticket gilt" },
      {
        type: "ul",
        items: [
          "Alle Verkehrsmittel des Nahverkehrs: Bus, Tram, U-Bahn, S-Bahn.",
          "Regionalzüge der zweiten Klasse (RE, RB, IRE).",
          "Nicht gültig: ICE, IC/EC und Fernbusse.",
        ],
      },
      { type: "h2", id: "lohnt-es-sich", text: "Lohnt es sich?" },
      {
        type: "p",
        text: "Wer regelmäßig pendelt oder in einer Stadt mit teurer Monatskarte lebt, spart meist deutlich. Für gelegentliche Fahrten können Einzeltickets günstiger sein – rechnen Sie Ihre üblichen Fahrten pro Monat durch.",
      },
      { type: "h2", id: "kuendigen", text: "Kündigen: die Frist" },
      {
        type: "p",
        text: "Das Deutschlandticket ist ein Abonnement. Bei der Deutschen Bahn und den meisten Verkehrsverbünden kündigen Sie bis zum 10. eines Monats zum Monatsende. Einzelne Anbieter können abweichende Fristen haben – prüfen Sie Ihre Vertragsbedingungen.",
      },
      {
        type: "callout",
        title: "Tipp",
        text: "Wer nur in den Sommermonaten viel fährt, kann das Ticket gezielt für diese Monate abonnieren und danach kündigen.",
      },
      { type: "h2", id: "jobticket", text: "Deutschlandticket als Jobticket" },
      { type: "p", text: "Zahlt der Arbeitgeber mindestens 25 % des Preises, gewähren die Verkehrsunternehmen zusätzlich 5 % Rabatt. Fragen Sie in der Personalabteilung nach." },
    ],
    faq: [
      { question: "Was kostet das Deutschlandticket 2026?", answer: "63 € pro Monat." },
      { question: "Bis wann muss ich das Deutschlandticket kündigen?", answer: "In der Regel bis zum 10. eines Monats, damit es zum Monatsende endet. Die Frist kann je nach Anbieter abweichen." },
      { question: "Gilt das Deutschlandticket im ICE?", answer: "Nein. Es gilt nur im Nah- und Regionalverkehr." },
    ],
    sources: [
      { name: "Deutsche Bahn — Deutschlandticket FAQ", url: "https://www.bahn.de/angebot/regio/deutschland-ticket" },
    ],
    methodology: "Zusammengestellt aus Angaben der Deutschen Bahn und der Verbraucherzentrale, Stand 26. November 2026.",
  },
  {
    id: "de-kuendigungsbutton",
    slug: "kuendigungsbutton-vertraege-online-kuendigen",
    title: "Kündigungsbutton: So kündigen Sie Verträge online mit zwei Klicks",
    seoTitle: "Kündigungsbutton (§ 312k BGB): Online-Verträge einfach kündigen – Ihre Rechte",
    subtitle: "Wer Verträge online abschließen lässt, muss auch online eine einfache Kündigung anbieten. Was das Gesetz vorschreibt und was Sie tun können, wenn der Button fehlt.",
    excerpt:
      "Seit Juli 2022 müssen Unternehmen, die Abos im Internet anbieten, einen gut sichtbaren Kündigungsbutton bereitstellen. Fehlt er, können Sie jederzeit fristlos kündigen.",
    category: "technology",
    tags: ["Kündigungsbutton", "Verbraucherrecht", "Abos", "BGB"],
    publishedAt: "2026-11-26T08:00:00+01:00",
    heroImage: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1600&h=1000&q=80",
    heroImageAlt: "Smartphone mit App-Symbolen",
    keyTakeaways: [
      "Seit 1. Juli 2022 gilt § 312k BGB: Online abschließbare Dauerverträge müssen online kündbar sein.",
      "Der Button muss gut lesbar sein, etwa mit „Verträge hier kündigen“ beschriftet.",
      "Fehlt der Button oder ist er falsch umgesetzt, können Sie jederzeit und ohne Einhaltung einer Frist kündigen.",
      "Ausnahmen gelten u. a. für bestimmte Finanzdienstleistungen.",
    ],
    body: [
      { type: "h2", id: "was-gilt", text: "Was das Gesetz vorschreibt" },
      {
        type: "p",
        text: "Unternehmen, die über ihre Website Verbrauchern den Abschluss von Verträgen mit laufender Zahlung ermöglichen – etwa Streaming, Handy- oder Fitnessstudio-Verträge –, müssen eine Kündigungsschaltfläche anbieten. Sie muss ständig verfügbar und leicht zugänglich sein.",
      },
      { type: "h2", id: "so-gehts", text: "So funktioniert die Kündigung" },
      {
        type: "ol",
        items: [
          "Klicken Sie auf den Kündigungsbutton („Verträge hier kündigen“).",
          "Geben Sie die Angaben ein, mit denen Sie und der Vertrag eindeutig identifiziert werden können.",
          "Bestätigen Sie mit „jetzt kündigen“.",
          "Speichern Sie die Bestätigung – das Unternehmen muss den Eingang unverzüglich per E-Mail bestätigen.",
        ],
      },
      { type: "h2", id: "kein-button", text: "Wenn der Button fehlt" },
      {
        type: "callout",
        title: "Ihr Recht",
        text: "Hält sich ein Unternehmen nicht an die Pflicht, können Sie den Vertrag jederzeit ohne Einhaltung einer Kündigungsfrist kündigen.",
      },
      { type: "p", text: "Die Verbraucherzentralen nehmen Beschwerden über fehlende oder versteckte Kündigungsbuttons entgegen." },
    ],
    faq: [
      { question: "Seit wann gibt es den Kündigungsbutton?", answer: "Seit dem 1. Juli 2022 (§ 312k BGB)." },
      { question: "Was passiert, wenn es keinen Kündigungsbutton gibt?", answer: "Dann können Sie den Vertrag jederzeit ohne Kündigungsfrist kündigen." },
    ],
    sources: [
      { name: "Verbraucherzentrale — Kündigungsbutton", url: "https://www.verbraucherzentrale.de/kuendigungsbutton" },
      { name: "§ 312k BGB — gesetze-im-internet.de", url: "https://www.gesetze-im-internet.de/bgb/__312k.html" },
    ],
    methodology: "Zusammengestellt aus dem Gesetzestext und Informationen der Verbraucherzentrale, Stand 26. November 2026.",
  },
];

export const articles = buildArticles("de", drafts);
