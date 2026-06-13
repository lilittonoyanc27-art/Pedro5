export interface Question {
  id: number;
  subject: string;
  verb: string;
  meaning: string;
  context: string;
  sentence: string;
  correctAnswer: string;
  options: string[];
  explanation: string;
  isIrregular: boolean;
}

export const QUESTS: Question[] = [
  {
    id: 1,
    subject: "Yo",
    verb: "hablar",
    meaning: "խոսել (hablar)",
    context: "Այս առավոտ ես խոսել եմ տնօրենի հետ",
    sentence: "Esta mañana yo ________ con el director sobre mi nota.",
    correctAnswer: "he hablado",
    options: ["he hablado", "has hablado", "hemos hablado", "hablé"],
    explanation: "«Yo» (ես) դեմքի համար «haber» օժանդակ բայը դառնում է «he»: «hablar» բայի համապատասխան դերբայը կանոնավոր է՝ «hablado»:",
    isIrregular: false
  },
  {
    id: 2,
    subject: "Tú",
    verb: "comer",
    meaning: "ուտել (comer)",
    context: "Վերջերս դու պաելյա՞ ես կերել",
    sentence: "¿Últimamente tú ________ paella en algún restaurante?",
    correctAnswer: "has comido",
    options: ["has comido", "he comido", "ha comido", "comiste"],
    explanation: "«Tú» (դու) դեմքի համար «haber» օժանդակ բայը դառնում է «has»: «comer» բայի համապատասխան դերբայը կանոնավոր է՝ «comido»:",
    isIrregular: false
  },
  {
    id: 3,
    subject: "Señor Pedro (Él)",
    verb: "hacer",
    meaning: "անել (hacer)",
    context: "Այսօր Սենյոր Պեդրոն իր բեղերի համար կախարդական թուրմ է պատրաստել",
    sentence: "Hoy el Señor Pedro ________ una poción mágica para su bigote.",
    correctAnswer: "ha hecho",
    options: ["ha hecho", "ha hacido", "he hecho", "hizo"],
    explanation: "Անկանոն դերբայ! «hacer» բայն ունի հատուկ անփոփոխ դերբայ՝ «hecho»: Երրորդ դեմքի՝ «Él» (նա՝ Սենյոր Պեդրոն) համար օգտագործում ենք «ha hecho»:",
    isIrregular: true
  },
  {
    id: 4,
    subject: "Nosotros",
    verb: "escribir",
    meaning: "գրել (escribir)",
    context: "Այս շաբաթ մենք նամակ ենք գրել Իսպանիա",
    sentence: "Esta semana nosotros ________ una carta a España.",
    correctAnswer: "hemos escrito",
    options: ["hemos escrito", "hemos escribido", "han escrito", "escribimos"],
    explanation: "Անկանոն դերբայ! «escribir» բայի դերբայը դառնում է «escrito»: «Nosotros» (մենք) դեմքի «hemos» օժանդակ բայի հետ ստացվում է «hemos escrito»:",
    isIrregular: true
  },
  {
    id: 5,
    subject: "Ustedes (Ellos)",
    verb: "ver",
    meaning: "տեսնել (ver)",
    context: "Այսօր դուք տեսե՞լ եք Դոն Կիխոտի մասին ֆիլմը",
    sentence: "¿Ustedes ________ la película de Don Quijote hoy?",
    correctAnswer: "han visto",
    options: ["han visto", "han vido", "habéis visto", "vieron"],
    explanation: "Անկանոն դերբայ! «ver» բայի դերբայը «visto»-ն է: «Ustedes» (դուք) ձևի համար օգտագործում ենք «han» օժանդակ բայը՝ ստանալով «han visto»:",
    isIrregular: true
  },
  {
    id: 6,
    subject: "Vosotros",
    verb: "vivir",
    meaning: "ապրել (vivir)",
    context: "Վերջերս դուք ապրել եք անդալուզյան տանը",
    sentence: "Últimamente vosotros ________ en una casa andaluza.",
    correctAnswer: "habéis vivido",
    options: ["habéis vivido", "han vivido", "hemos vivido", "vivisteis"],
    explanation: "«Vosotros» (դուք՝ հարգելի ընկերներ) դեմքի համար «haber» օժանդակ բայը «habéis»-ն է: «vivir» բայի համապատասխան դերբայը կանոնավոր է՝ «vivido»:",
    isIrregular: false
  },
  {
    id: 7,
    subject: "Ellas",
    verb: "volver",
    meaning: "վերադառնալ (volver)",
    context: "Այսօր կեսօրից հետո նրանք վերադարձել են Մադրիդից",
    sentence: "Esta tarde ellas ________ de su viaje a Madrid.",
    correctAnswer: "han vuelto",
    options: ["han vuelto", "han volvido", "ha vuelto", "volvieron"],
    explanation: "Անկանոն դերբայ! «volver» բայի դերբայը դառնում է «vuelto»: «Ellas» (նրանք՝ իգական) դեմքի համար օգտագործում ենք «han» օժանդակ բայը՝ ստանալով «han vuelto»:",
    isIrregular: true
  },
  {
    id: 8,
    subject: "Yo",
    verb: "abrir",
    meaning: "բացել (abrir)",
    context: "Մեկ րոպե առաջ ես բացեցի դասարանի պատուհանը",
    sentence: "Hace un minuto yo ________ la ventana de la clase.",
    correctAnswer: "he abierto",
    options: ["he abierto", "he abrido", "has abierto", "abrí"],
    explanation: "Անկանոն դերբայ! «abrir» բայի դերբայը դառնում է «abierto»: Առաջին դեմքի՝ «Yo» (ես) դեպքում (he) ստացվում է «he abierto»:",
    isIrregular: true
  },
  {
    id: 9,
    subject: "Tú",
    verb: "romper",
    meaning: "կոտրել (romper)",
    context: "Ա՜խ, դու կոտրեցի՞ր իմ բեղերի ոսկե սանրը",
    sentence: "¡Ay de mí! ¿Tú ________ el peine de oro de mi bigote?",
    correctAnswer: "has roto",
    options: ["has roto", "has rompido", "ha roto", "rompiste"],
    explanation: "Անկանոն դերբայ! «romper» բայի դերբայն է «roto»: «Tú» (դու) դեմքի համար օգտագործում ենք «has» օժանդակ բայը, հետևաբար՝ «has roto»:",
    isIrregular: true
  },
  {
    id: 10,
    subject: "Nosotros",
    verb: "decir",
    meaning: "ասել (decir)",
    context: "Այսօր մենք դատավորին ասել ենք ողջ ճշմարտությունը",
    sentence: "Hoy nosotros ________ toda la verdad al juez.",
    correctAnswer: "hemos dicho",
    options: ["hemos dicho", "hemos decido", "han dicho", "dijimos"],
    explanation: "Անկանոն դերբայ! «decir» բայի դերբայն է «dicho»: «Nosotros» (մենք) օժանդակ բայի «hemos»-ի հետ միասին ստացվում է «hemos dicho»:",
    isIrregular: true
  },
  {
    id: 11,
    subject: "Vosotros",
    verb: "poner",
    meaning: "դնել (poner)",
    context: "Այս գիշեր դուք հսկայական գլխարկներ եք դրել",
    sentence: "Esta noche vosotros os ________ sombreros gigantes.",
    correctAnswer: "habéis puesto",
    options: ["habéis puesto", "habéis ponido", "han puesto", "pusisteis"],
    explanation: "Անկանոն դերբայ! «poner» բայի դերբայն է «puesto»: «Vosotros» (դուք) օժանդակ բայի «habéis»-ի հետ միասին ստացվում է «habéis puesto»:",
    isIrregular: true
  },
  {
    id: 12,
    subject: "Mi hermano (Él)",
    verb: "morir",
    meaning: "մահանալ (morir)",
    context: "Իմ սիրելի կակտուսի ծաղիկն այսօր մահացել է",
    sentence: "Mi flor favorita de cactus ________ hoy.",
    correctAnswer: "ha muerto",
    options: ["ha muerto", "ha morido", "he muerto", "murió"],
    explanation: "Անկանոն դերբայ! «morir» բայի դերբայը փոխվում է «muerto»-ի: Ծաղկին («Ella»՝ այն) հղում անելիս օգտագործում ենք «ha», ստանալով «ha muerto»:",
    isIrregular: true
  },
  {
    id: 13,
    subject: "Yo",
    verb: "cantar",
    meaning: "երգել (cantar)",
    context: "Այս գիշեր ես մի գեղեցիկ ֆլամենկո երգ եմ երգել",
    sentence: "Esta noche yo ________ una canción de flamenco preciosa.",
    correctAnswer: "he cantado",
    options: ["he cantado", "has cantado", "he canté", "canté"],
    explanation: "«Yo» (ես) դեմքի համար «haber» օժանդակ բայը «he»-ն է: «cantar» բայի համապատասխան դերբայը կանոնավոր է՝ «cantado»:",
    isIrregular: false
  },
  {
    id: 14,
    subject: "Usted (Él/Ella)",
    verb: "resolver",
    meaning: "լուծել (resolver)",
    context: "Սենյոր Պեդրոն այսօր լուծել է իր կորած բեղերի առեղծվածը",
    sentence: "¡Excelente! El Señor Pedro ________ su misterio del bigote perdido hoy.",
    correctAnswer: "ha resuelto",
    options: ["ha resuelto", "ha resolvido", "hemos resuelto", "resolvió"],
    explanation: "Անկանոն դերբայ! «resolver» բայի դերբայն է «resuelto»: «Usted» (Դուք՝ քաղաքավարի երրորդ դեմք) ձևի համար օգտագործում ենք «ha»՝ ստանալով «ha resuelto»:",
    isIrregular: true
  },
  {
    id: 15,
    subject: "Mis amigos (Ellos)",
    verb: "aprender",
    meaning: "սովորել (aprender)",
    context: "Վերջերս իմ ընկերները շատ իսպաներեն են սովորել Պեդրոյի հետ",
    sentence: "Últimamente mis amigos ________ mucho español con Pedro.",
    correctAnswer: "han aprendido",
    options: ["han aprendido", "han aprendado", "habéis aprendido", "aprendieron"],
    explanation: "«Ellos» (նրանք՝ իմ ընկերները) դեմքի համար օգտագործում ենք «han» օժանդակ բայը: «aprender» բայի համապատասխան դերբայը կանոնավոր է՝ «aprendido»:",
    isIrregular: false
  }
];
