export type SupportedLanguage = 
  | "en" // English
  | "de" // German
  | "tr" // Turkish
  | "ar" // Arabic
  | "es" // Spanish
  | "ru" // Russian
  | "fr" // French
  | "pl" // Polish
  | "ur"; // Urdu

// Translation interface structure
export interface Translation {
  // Page headers
  pageTitle: string;
  pageSubtitle: string;
  
  // Speed section
  yourDrivingSpeed: string;
  howOftenDrive: string;
  resetToLimit: string;
  
  // Road types
  urban: string;
  rural: string;
  highway: string;
  
  // Frequency options
  rarely: string;
  occasionally: string;
  regularly: string;
  often: string;
  
  // Results section
  resultsTitle: string;
  pointsLabel: string;
  fineLabel: string;
  banLabel: string;
  suspensionRiskLabel: string;
  monthsUntilSuspensionLabel: string;
  neverLabel: string;
  
  // Educational section
  aboutTitle: string;
  
  // Educational info cards
  educationalInfo: Array<{
    title: string;
    content: string;
  }>;
  
  // Footer texts
  importantNotice: string;
  importantNoticeText: string;
  moreResources: string;
  germanPenaltyCatalog: string;
  adacCalculator: string;
  dataBasedOn: string;
  copyrightText: string;
}

// Default language (English)
export const en: Translation = {
  // Page headers
  pageTitle: "Speedkarte",
  pageSubtitle: "Calculate when you might lose your license based on your speeding habits in Germany.",
  
  // Speed section
  yourDrivingSpeed: "Your Driving Speed",
  howOftenDrive: "How often do you drive like this?",
  resetToLimit: "Reset to limit",
  
  // Road types
  urban: "Urban",
  rural: "Rural",
  highway: "Highway",
  
  // Frequency options
  rarely: "Rarely",
  occasionally: "Occasionally",
  regularly: "Regularly",
  often: "Often",
  
  // Results section
  resultsTitle: "Your Results",
  pointsLabel: "Points on License",
  fineLabel: "Fine Amount",
  banLabel: "License Ban",
  suspensionRiskLabel: "Risk of License Suspension",
  monthsUntilSuspensionLabel: "Months until possible suspension",
  neverLabel: "Never",
  
  // Educational section
  aboutTitle: "About the German Point System",
  
  // Educational info cards
  educationalInfo: [
    {
      title: "Points System",
      content: "The German point system assigns 1-3 points for traffic violations. Accumulating 8 points leads to license suspension. Points remain on your record for 2.5 to 10 years depending on severity."
    },
    {
      title: "Speed Penalties",
      content: "Speeding penalties in Germany include fines from €30 to €700, 1-2 points, and possible driving bans from 1-3 months depending on how much you exceed the limit."
    },
    {
      title: "License Suspension",
      content: "If you reach 8 points, your license will be suspended. Drivers with 4-5 points receive a written warning, while those with 6-7 points must attend a driving seminar."
    }
  ],
  
  // Footer texts
  importantNotice: "Important Notice",
  importantNoticeText: "This calculator is for informational purposes only. Actual penalties may vary based on specific circumstances, local regulations, and legal interpretations. Always consult with legal professionals for specific advice.",
  moreResources: "More Resources",
  germanPenaltyCatalog: "Official German Penalty Catalog",
  adacCalculator: "ADAC Fine Calculator (German)",
  dataBasedOn: "Data based on the latest German traffic regulations effective",
  copyrightText: "Speedkarte"
};

// German translations
export const de: Translation = {
  // Page headers
  pageTitle: "Speedkarte",
  pageSubtitle: "Berechnen Sie, wann Sie Ihren Führerschein aufgrund Ihrer Geschwindigkeitsgewohnheiten in Deutschland verlieren könnten.",
  
  // Speed section
  yourDrivingSpeed: "Ihre Fahrgeschwindigkeit",
  howOftenDrive: "Wie oft fahren Sie so?",
  resetToLimit: "Auf Limit zurücksetzen",
  
  // Road types
  urban: "Stadt",
  rural: "Landstraße",
  highway: "Autobahn",
  
  // Frequency options
  rarely: "Selten",
  occasionally: "Gelegentlich",
  regularly: "Regelmäßig",
  often: "Oft",
  
  // Results section
  resultsTitle: "Ihre Ergebnisse",
  pointsLabel: "Punkte im Führerschein",
  fineLabel: "Bußgeldbetrag",
  banLabel: "Fahrverbot",
  suspensionRiskLabel: "Risiko des Führerscheinentzugs",
  monthsUntilSuspensionLabel: "Monate bis zum möglichen Entzug",
  neverLabel: "Nie",
  
  // Educational section
  aboutTitle: "Über das deutsche Punktesystem",
  
  // Educational info cards
  educationalInfo: [
    {
      title: "Punktesystem",
      content: "Das deutsche Punktesystem vergibt 1-3 Punkte für Verkehrsverstöße. Bei 8 Punkten wird der Führerschein entzogen. Punkte bleiben je nach Schwere 2,5 bis 10 Jahre in der Akte."
    },
    {
      title: "Geschwindigkeitsstrafen",
      content: "Geschwindigkeitsstrafen in Deutschland umfassen Bußgelder von 30 € bis 700 €, 1-2 Punkte und mögliche Fahrverbote von 1-3 Monaten, abhängig davon, wie stark Sie das Limit überschreiten."
    },
    {
      title: "Führerscheinentzug",
      content: "Wenn Sie 8 Punkte erreichen, wird Ihr Führerschein entzogen. Fahrer mit 4-5 Punkten erhalten eine schriftliche Verwarnung, während Fahrer mit 6-7 Punkten an einem Fahrseminar teilnehmen müssen."
    }
  ],
  
  // Footer texts
  importantNotice: "Wichtiger Hinweis",
  importantNoticeText: "Dieser Rechner dient nur zu Informationszwecken. Die tatsächlichen Strafen können je nach spezifischen Umständen, lokalen Vorschriften und rechtlichen Auslegungen variieren. Konsultieren Sie immer Rechtsexperten für spezifische Beratung.",
  moreResources: "Weitere Ressourcen",
  germanPenaltyCatalog: "Offizieller deutscher Bußgeldkatalog",
  adacCalculator: "ADAC Bußgeldrechner",
  dataBasedOn: "Daten basierend auf den neuesten deutschen Verkehrsvorschriften, gültig ab",
  copyrightText: "Speedkarte"
};

// Turkish translations
export const tr: Translation = {
  // Page headers
  pageTitle: "Speedkarte",
  pageSubtitle: "Almanya'daki hız alışkanlıklarınıza göre ehliyetinizi ne zaman kaybedebileceğinizi hesaplayın.",
  
  // Speed section
  yourDrivingSpeed: "Sürüş Hızınız",
  howOftenDrive: "Ne sıklıkla böyle kullanıyorsunuz?",
  resetToLimit: "Limite sıfırla",
  
  // Road types
  urban: "Şehir içi",
  rural: "Kırsal",
  highway: "Otoyol",
  
  // Frequency options
  rarely: "Nadiren",
  occasionally: "Ara sıra",
  regularly: "Düzenli",
  often: "Sık sık",
  
  // Results section
  resultsTitle: "Sonuçlarınız",
  pointsLabel: "Ehliyetteki Puanlar",
  fineLabel: "Para Cezası Miktarı",
  banLabel: "Ehliyet Yasağı",
  suspensionRiskLabel: "Ehliyet İptal Riski",
  monthsUntilSuspensionLabel: "Olası iptale kadar aylar",
  neverLabel: "Asla",
  
  // Educational section
  aboutTitle: "Alman Puan Sistemi Hakkında",
  
  // Educational info cards
  educationalInfo: [
    {
      title: "Puan Sistemi",
      content: "Alman puan sistemi, trafik ihlalleri için 1-3 puan verir. 8 puan biriktirmek ehliyetin askıya alınmasına yol açar. Puanlar, ihlalin ciddiyetine bağlı olarak 2,5 ila 10 yıl arasında kayıtlarda kalır."
    },
    {
      title: "Hız Cezaları",
      content: "Almanya'daki hız cezaları, limiti aşma miktarınıza bağlı olarak 30 € ile 700 € arasında para cezaları, 1-2 puan ve 1-3 ay arasında olası sürüş yasakları içerir."
    },
    {
      title: "Ehliyet Askıya Alma",
      content: "8 puana ulaşırsanız, ehliyetiniz askıya alınacaktır. 4-5 puana sahip sürücüler yazılı bir uyarı alırken, 6-7 puana sahip olanlar bir sürüş seminerine katılmak zorundadır."
    }
  ],
  
  // Footer texts
  importantNotice: "Önemli Uyarı",
  importantNoticeText: "Bu hesaplayıcı yalnızca bilgilendirme amaçlıdır. Gerçek cezalar, belirli koşullara, yerel düzenlemelere ve yasal yorumlara göre değişebilir. Belirli tavsiyeler için her zaman hukuk uzmanlarına danışın.",
  moreResources: "Daha Fazla Kaynak",
  germanPenaltyCatalog: "Resmi Alman Ceza Kataloğu",
  adacCalculator: "ADAC Para Cezası Hesaplayıcı (Almanca)",
  dataBasedOn: "Veriler, geçerli olan en son Alman trafik düzenlemelerine dayanmaktadır",
  copyrightText: "Speedkarte"
};

// Arabic translations
export const ar: Translation = {
  // Page headers
  pageTitle: "Speedkarte",
  pageSubtitle: "احسب متى قد تفقد رخصتك بناءً على عادات السرعة لديك في ألمانيا.",
  
  // Speed section
  yourDrivingSpeed: "سرعة القيادة لديك",
  howOftenDrive: "كم مرة تقود بهذه الطريقة؟",
  resetToLimit: "إعادة إلى الحد",
  
  // Road types
  urban: "حضري",
  rural: "ريفي",
  highway: "طريق سريع",
  
  // Frequency options
  rarely: "نادرًا",
  occasionally: "أحيانًا",
  regularly: "بانتظام",
  often: "غالبًا",
  
  // Results section
  resultsTitle: "نتائجك",
  pointsLabel: "النقاط على الرخصة",
  fineLabel: "مقدار الغرامة",
  banLabel: "حظر الرخصة",
  suspensionRiskLabel: "خطر تعليق الرخصة",
  monthsUntilSuspensionLabel: "الأشهر حتى التعليق المحتمل",
  neverLabel: "أبدًا",
  
  // Educational section
  aboutTitle: "حول نظام النقاط الألماني",
  
  // Educational info cards
  educationalInfo: [
    {
      title: "نظام النقاط",
      content: "يمنح نظام النقاط الألماني 1-3 نقاط للمخالفات المرورية. تراكم 8 نقاط يؤدي إلى تعليق الرخصة. تبقى النقاط في سجلك لمدة 2.5 إلى 10 سنوات حسب الخطورة."
    },
    {
      title: "عقوبات السرعة",
      content: "تشمل عقوبات السرعة في ألمانيا غرامات من 30 يورو إلى 700 يورو، 1-2 نقطة، وحظر قيادة محتمل من 1-3 أشهر حسب مقدار تجاوزك للحد."
    },
    {
      title: "تعليق الرخصة",
      content: "إذا وصلت إلى 8 نقاط، سيتم تعليق رخصتك. يتلقى السائقون الذين لديهم 4-5 نقاط تحذيرًا كتابيًا، بينما يجب على أولئك الذين لديهم 6-7 نقاط حضور ندوة قيادة."
    }
  ],
  
  // Footer texts
  importantNotice: "إشعار مهم",
  importantNoticeText: "هذه الآلة الحاسبة هي لأغراض إعلامية فقط. قد تختلف العقوبات الفعلية بناءً على ظروف محددة ولوائح محلية وتفسيرات قانونية. استشر دائمًا المهنيين القانونيين للحصول على نصائح محددة.",
  moreResources: "موارد إضافية",
  germanPenaltyCatalog: "كتالوج العقوبات الألماني الرسمي",
  adacCalculator: "آلة حاسبة ADAC للغرامات (بالألمانية)",
  dataBasedOn: "البيانات مستندة إلى أحدث لوائح المرور الألمانية السارية",
  copyrightText: "Speedkarte"
};

// Spanish translations
export const es: Translation = {
  // Page headers
  pageTitle: "Speedkarte",
  pageSubtitle: "Calcule cuándo podría perder su licencia según sus hábitos de velocidad en Alemania.",
  
  // Speed section
  yourDrivingSpeed: "Su Velocidad de Conducción",
  howOftenDrive: "¿Con qué frecuencia conduce así?",
  resetToLimit: "Restablecer al límite",
  
  // Road types
  urban: "Urbano",
  rural: "Rural",
  highway: "Autopista",
  
  // Frequency options
  rarely: "Raramente",
  occasionally: "Ocasionalmente",
  regularly: "Regularmente",
  often: "Frecuentemente",
  
  // Results section
  resultsTitle: "Sus Resultados",
  pointsLabel: "Puntos en la Licencia",
  fineLabel: "Monto de la Multa",
  banLabel: "Prohibición de Licencia",
  suspensionRiskLabel: "Riesgo de Suspensión de Licencia",
  monthsUntilSuspensionLabel: "Meses hasta posible suspensión",
  neverLabel: "Nunca",
  
  // Educational section
  aboutTitle: "Sobre el Sistema de Puntos Alemán",
  
  // Educational info cards
  educationalInfo: [
    {
      title: "Sistema de Puntos",
      content: "El sistema de puntos alemán asigna 1-3 puntos por infracciones de tráfico. Acumular 8 puntos lleva a la suspensión de la licencia. Los puntos permanecen en su registro de 2.5 a 10 años dependiendo de la gravedad."
    },
    {
      title: "Penalizaciones por Velocidad",
      content: "Las penalizaciones por exceso de velocidad en Alemania incluyen multas desde €30 hasta €700, 1-2 puntos y posibles prohibiciones de conducir de 1-3 meses dependiendo de cuánto exceda el límite."
    },
    {
      title: "Suspensión de Licencia",
      content: "Si alcanza 8 puntos, su licencia será suspendida. Los conductores con 4-5 puntos reciben una advertencia por escrito, mientras que aquellos con 6-7 puntos deben asistir a un seminario de conducción."
    }
  ],
  
  // Footer texts
  importantNotice: "Aviso Importante",
  importantNoticeText: "Esta calculadora es solo para fines informativos. Las sanciones reales pueden variar según circunstancias específicas, regulaciones locales e interpretaciones legales. Consulte siempre con profesionales legales para obtener asesoramiento específico.",
  moreResources: "Más Recursos",
  germanPenaltyCatalog: "Catálogo Oficial de Sanciones Alemán",
  adacCalculator: "Calculadora de Multas ADAC (Alemán)",
  dataBasedOn: "Datos basados en las últimas regulaciones de tráfico alemanas vigentes",
  copyrightText: "Speedkarte"
};

// Russian translations
export const ru: Translation = {
  // Page headers
  pageTitle: "Speedkarte",
  pageSubtitle: "Рассчитайте, когда вы можете потерять водительские права в зависимости от ваших привычек превышения скорости в Германии.",
  
  // Speed section
  yourDrivingSpeed: "Ваша скорость вождения",
  howOftenDrive: "Как часто вы так водите?",
  resetToLimit: "Сбросить до лимита",
  
  // Road types
  urban: "Город",
  rural: "Сельская местность",
  highway: "Автомагистраль",
  
  // Frequency options
  rarely: "Редко",
  occasionally: "Время от времени",
  regularly: "Регулярно",
  often: "Часто",
  
  // Results section
  resultsTitle: "Ваши результаты",
  pointsLabel: "Баллы в правах",
  fineLabel: "Сумма штрафа",
  banLabel: "Запрет на вождение",
  suspensionRiskLabel: "Риск лишения прав",
  monthsUntilSuspensionLabel: "Месяцев до возможного лишения",
  neverLabel: "Никогда",
  
  // Educational section
  aboutTitle: "О немецкой системе баллов",
  
  // Educational info cards
  educationalInfo: [
    {
      title: "Система баллов",
      content: "Немецкая система баллов присваивает 1-3 балла за нарушения ПДД. Накопление 8 баллов приводит к приостановке действия прав. Баллы остаются в вашем деле от 2,5 до 10 лет в зависимости от тяжести нарушения."
    },
    {
      title: "Штрафы за превышение скорости",
      content: "Штрафы за превышение скорости в Германии включают штрафы от 30 до 700 евро, 1-2 балла и возможные запреты на вождение от 1 до 3 месяцев в зависимости от того, насколько вы превысили лимит."
    },
    {
      title: "Приостановка действия прав",
      content: "Если вы наберете 8 баллов, ваши права будут приостановлены. Водители с 4-5 баллами получают письменное предупреждение, а те, у кого 6-7 баллов, должны посетить семинар по вождению."
    }
  ],
  
  // Footer texts
  importantNotice: "Важное уведомление",
  importantNoticeText: "Этот калькулятор предназначен только для информационных целей. Фактические штрафы могут различаться в зависимости от конкретных обстоятельств, местных правил и юридических интерпретаций. Всегда консультируйтесь с юристами для получения конкретных советов.",
  moreResources: "Дополнительные ресурсы",
  germanPenaltyCatalog: "Официальный каталог штрафов Германии",
  adacCalculator: "Калькулятор штрафов ADAC (на немецком)",
  dataBasedOn: "Данные основаны на последних правилах дорожного движения Германии, действующих с",
  copyrightText: "Speedkarte"
};

// French translations
export const fr: Translation = {
  // Page headers
  pageTitle: "Speedkarte",
  pageSubtitle: "Calculez quand vous pourriez perdre votre permis en fonction de vos habitudes de vitesse en Allemagne.",
  
  // Speed section
  yourDrivingSpeed: "Votre Vitesse de Conduite",
  howOftenDrive: "À quelle fréquence conduisez-vous ainsi ?",
  resetToLimit: "Réinitialiser à la limite",
  
  // Road types
  urban: "Urbain",
  rural: "Rural",
  highway: "Autoroute",
  
  // Frequency options
  rarely: "Rarement",
  occasionally: "Occasionnellement",
  regularly: "Régulièrement",
  often: "Souvent",
  
  // Results section
  resultsTitle: "Vos Résultats",
  pointsLabel: "Points sur le Permis",
  fineLabel: "Montant de l'Amende",
  banLabel: "Interdiction de Permis",
  suspensionRiskLabel: "Risque de Suspension de Permis",
  monthsUntilSuspensionLabel: "Mois jusqu'à suspension possible",
  neverLabel: "Jamais",
  
  // Educational section
  aboutTitle: "À propos du Système de Points Allemand",
  
  // Educational info cards
  educationalInfo: [
    {
      title: "Système de Points",
      content: "Le système de points allemand attribue 1 à 3 points pour les infractions au code de la route. L'accumulation de 8 points entraîne la suspension du permis. Les points restent sur votre dossier de 2,5 à 10 ans selon la gravité."
    },
    {
      title: "Sanctions pour Excès de Vitesse",
      content: "Les sanctions pour excès de vitesse en Allemagne comprennent des amendes de 30 € à 700 €, 1 à 2 points et des interdictions de conduire possibles de 1 à 3 mois selon le dépassement de la limite."
    },
    {
      title: "Suspension de Permis",
      content: "Si vous atteignez 8 points, votre permis sera suspendu. Les conducteurs avec 4-5 points reçoivent un avertissement écrit, tandis que ceux avec 6-7 points doivent assister à un séminaire de conduite."
    }
  ],
  
  // Footer texts
  importantNotice: "Avis Important",
  importantNoticeText: "Ce calculateur est uniquement à titre informatif. Les sanctions réelles peuvent varier en fonction des circonstances spécifiques, des réglementations locales et des interprétations juridiques. Consultez toujours des professionnels du droit pour des conseils spécifiques.",
  moreResources: "Plus de Ressources",
  germanPenaltyCatalog: "Catalogue Officiel des Sanctions Allemand",
  adacCalculator: "Calculateur d'Amendes ADAC (Allemand)",
  dataBasedOn: "Données basées sur les dernières réglementations de circulation allemandes en vigueur",
  copyrightText: "Speedkarte"
};

// Polish translations
export const pl: Translation = {
  // Page headers
  pageTitle: "Speedkarte",
  pageSubtitle: "Oblicz, kiedy możesz stracić prawo jazdy w zależności od Twoich nawyków przekraczania prędkości w Niemczech.",
  
  // Speed section
  yourDrivingSpeed: "Twoja Prędkość Jazdy",
  howOftenDrive: "Jak często tak jeździsz?",
  resetToLimit: "Resetuj do limitu",
  
  // Road types
  urban: "Miasto",
  rural: "Poza miastem",
  highway: "Autostrada",
  
  // Frequency options
  rarely: "Rzadko",
  occasionally: "Okazjonalnie",
  regularly: "Regularnie",
  often: "Często",
  
  // Results section
  resultsTitle: "Twoje Wyniki",
  pointsLabel: "Punkty na Prawie Jazdy",
  fineLabel: "Wysokość Kary",
  banLabel: "Zakaz Prowadzenia",
  suspensionRiskLabel: "Ryzyko Zawieszenia Prawa Jazdy",
  monthsUntilSuspensionLabel: "Miesięcy do możliwego zawieszenia",
  neverLabel: "Nigdy",
  
  // Educational section
  aboutTitle: "O Niemieckim Systemie Punktowym",
  
  // Educational info cards
  educationalInfo: [
    {
      title: "System Punktowy",
      content: "Niemiecki system punktowy przypisuje 1-3 punkty za naruszenia przepisów ruchu drogowego. Zgromadzenie 8 punktów prowadzi do zawieszenia prawa jazdy. Punkty pozostają w Twoim rejestrze od 2,5 do 10 lat, w zależności od wagi wykroczenia."
    },
    {
      title: "Kary za Przekroczenie Prędkości",
      content: "Kary za przekroczenie prędkości w Niemczech obejmują grzywny od 30 € do 700 €, 1-2 punkty i możliwe zakazy prowadzenia pojazdów od 1 do 3 miesięcy, w zależności od tego, o ile przekroczysz limit."
    },
    {
      title: "Zawieszenie Prawa Jazdy",
      content: "Jeśli osiągniesz 8 punktów, Twoje prawo jazdy zostanie zawieszone. Kierowcy z 4-5 punktami otrzymują pisemne ostrzeżenie, podczas gdy osoby z 6-7 punktami muszą uczestniczyć w seminarium dotyczącym jazdy."
    }
  ],
  
  // Footer texts
  importantNotice: "Ważna Informacja",
  importantNoticeText: "Ten kalkulator służy wyłącznie do celów informacyjnych. Rzeczywiste kary mogą się różnić w zależności od konkretnych okoliczności, lokalnych przepisów i interpretacji prawnych. Zawsze konsultuj się z profesjonalistami prawnymi w celu uzyskania konkretnych porad.",
  moreResources: "Więcej Zasobów",
  germanPenaltyCatalog: "Oficjalny Niemiecki Katalog Kar",
  adacCalculator: "Kalkulator Grzywien ADAC (po niemiecku)",
  dataBasedOn: "Dane oparte na najnowszych niemieckich przepisach drogowych obowiązujących od",
  copyrightText: "Speedkarte"
};

// Urdu translations
export const ur: Translation = {
  // Page headers
  pageTitle: "Speedkarte",
  pageSubtitle: "جرمنی میں اپنی سپیڈنگ عادات کی بنیاد پر حساب لگائیں کہ آپ کب اپنا لائسنس کھو سکتے ہیں۔",
  
  // Speed section
  yourDrivingSpeed: "آپ کی ڈرائیونگ کی رفتار",
  howOftenDrive: "آپ اس طرح کتنی بار گاڑی چلاتے ہیں؟",
  resetToLimit: "حد تک دوبارہ ترتیب دیں",
  
  // Road types
  urban: "شہری",
  rural: "دیہی",
  highway: "ہائی وے",
  
  // Frequency options
  rarely: "شاذ و نادر",
  occasionally: "کبھی کبھار",
  regularly: "باقاعدگی سے",
  often: "اکثر",
  
  // Results section
  resultsTitle: "آپ کے نتائج",
  pointsLabel: "لائسنس پر پوائنٹس",
  fineLabel: "جرمانے کی رقم",
  banLabel: "لائسنس پر پابندی",
  suspensionRiskLabel: "لائسنس معطلی کا خطرہ",
  monthsUntilSuspensionLabel: "ممکنہ معطلی تک مہینے",
  neverLabel: "کبھی نہیں",
  
  // Educational section
  aboutTitle: "جرمن پوائنٹ سسٹم کے بارے میں",
  
  // Educational info cards
  educationalInfo: [
    {
      title: "پوائنٹ سسٹم",
      content: "جرمن پوائنٹ سسٹم ٹریفک خلاف ورزیوں کے لیے 1-3 پوائنٹس تفویض کرتا ہے۔ 8 پوائنٹس جمع کرنے سے لائسنس معطل ہو جاتا ہے۔ پوائنٹس شدت کے لحاظ سے 2.5 سے 10 سال تک آپ کے ریکارڈ میں رہتے ہیں۔"
    },
    {
      title: "سپیڈ کی سزائیں",
      content: "جرمنی میں سپیڈنگ کی سزاؤں میں 30€ سے 700€ تک جرمانے، 1-2 پوائنٹس، اور آپ کے حد سے زیادہ تجاوز کرنے کے لحاظ سے 1-3 ماہ تک ممکنہ ڈرائیونگ پر پابندیاں شامل ہیں۔"
    },
    {
      title: "لائسنس معطلی",
      content: "اگر آپ 8 پوائنٹس تک پہنچ جاتے ہیں، تو آپ کا لائسنس معطل ہو جائے گا۔ 4-5 پوائنٹس والے ڈرائیوروں کو تحریری انتباہ ملتا ہے، جبکہ 6-7 پوائنٹس والوں کو ڈرائیونگ سیمینار میں شرکت کرنا ضروری ہے۔"
    }
  ],
  
  // Footer texts
  importantNotice: "اہم نوٹس",
  importantNoticeText: "یہ کیلکولیٹر صرف معلوماتی مقاصد کے لیے ہے۔ اصل سزائیں مخصوص حالات، مقامی ضوابط، اور قانونی تشریحات کی بنیاد پر مختلف ہو سکتی ہیں۔ مخصوص مشورے کے لیے ہمیشہ قانونی پیشہ ور افراد سے مشورہ کریں۔",
  moreResources: "مزید وسائل",
  germanPenaltyCatalog: "سرکاری جرمن سزا کیٹلاگ",
  adacCalculator: "ADAC جرمانہ کیلکولیٹر (جرمن میں)",
  dataBasedOn: "ڈیٹا جرمنی کے تازہ ترین ٹریفک ضوابط پر مبنی ہے جو مؤثر ہیں",
  copyrightText: "Speedkarte"
};

// Update all supported languages
export const translations: Record<SupportedLanguage, Translation> = {
  en,
  de,
  tr,
  ar,
  es,
  ru,
  fr,
  pl,
  ur
};

// Update language names (for the selector)
export const languageNames: Record<SupportedLanguage, string> = {
  en: "English",
  de: "Deutsch",
  tr: "Türkçe",
  ar: "العربية",
  es: "Español",
  ru: "Русский",
  fr: "Français",
  pl: "Polski",
  ur: "اردو"
};

// Default language
export const DEFAULT_LANGUAGE: SupportedLanguage = "en";
