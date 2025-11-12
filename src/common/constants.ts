import {
  CalendarGreenOutlineIcon,
  StarGreenOutlineIcon,
  TickGreenOutlineIcon,
  UserGreenOutlineIcon,
} from "@/components/icons";
import {Heart, Shield, LucidePersonStanding, Badge} from "lucide-react";

export const APP_NAME = "PetWell";

export const API_BASE_URL = "http://localhost:5137";

export const NAV_LINKS: {title: string; href: string}[] = [
  {
    title: "Acasă",
    href: "/",
  },
  {
    title: "Servicii",
    href: "/services",
  },
  {
    title: "Contact",
    href: "/contacts",
  },
  {
    title: "Despre noi",
    href: "/about-us",
  },
];

export const TYPES_OF_PROFILES = [
  {
    title: "Utilizator",
    description:
      "Caută și utilizează servicii pentru animalele de fermă sau gospodărie.",
    features: [
      "Căutarea serviciilor în zona dorită",
      "Vizualizarea recenziilor și evaluărilor",
      "Rezervarea programărilor online",
      "Comunicarea cu prestatorii",
    ],
    type: 0,
    iconList: [
      TickGreenOutlineIcon,
      StarGreenOutlineIcon,
      CalendarGreenOutlineIcon,
      UserGreenOutlineIcon,
    ],
  },
  {
    title: "Prestator servicii",
    description:
      "Oferă servicii de îngrijire și consultanță pentru animalele fermierilor.",
    features: [
      "Publicarea și gestionarea serviciilor",
      "Primirea recenziilor și evaluărilor",
      "Administrarea programărilor",
      "Comunicarea directă cu clienții",
    ],
    type: 1,
    iconList: [
      TickGreenOutlineIcon,
      StarGreenOutlineIcon,
      CalendarGreenOutlineIcon,
      UserGreenOutlineIcon,
    ],
  },
];

export const CONTACT_US = {
  title: "Contactează-ne",
  info: {
    header: "Unde ne găsești",
    address: "Str. Agricultorilor nr. 10, Chișinău",
    phone: "+373 67 225 431",
    email: "info@petwell.com",
  },
  program: [
    "Luni – Vineri: 09:00 – 18:00",
    "Sâmbătă: 10:00 – 15:00",
    "Duminică: Închis",
  ],
  map_img: "/assets/images/map.jpg",
};

export const ABOUT_US = {
  t1: "Despre cum a început totul?",
  p1: "AnimalCare s-a născut din dorința de a simplifica procesul de găsire a serviciilor veterinare și de îngrijire pentru animalele de companie. Am observat că mulți proprietari de animale întâmpină dificultăți în găsirea profesioniștilor potriviți. Astfel, am creat o platformă care să conecteze rapid și eficient proprietarii de animale cu cei mai buni profesioniști din zona lor, oferind transparență în servicii, prețuri și disponibilitate. Astăzi, AnimalCare este partenerul de încredere pentru mii de proprietari de animale din România, facilitând accesul la servicii de calitate pentru prietenii lor blănoși.",
  t2: "Valorile noastre",
  p2: [
    {
      icon: Heart,
      title: "Dragoste pentru animale",
      description:
        "Fiecare animal merită cea mai bună îngrijire și atenție din partea profesioniștilor dedicați.",
    },
    {
      icon: Shield,
      title: "Siguranță și încredere",
      description:
        "Verificăm cu atenție toți partenerii noștri pentru a vă asigura servicii de cea mai înaltă calitate.",
    },
    {
      icon: LucidePersonStanding,
      title: "Comunitate unită",
      description:
        "Conectăm iubitorii de animale cu profesioniști de încredere într-o comunitate solidară.",
    },
    {
      icon: Badge,
      title: "Excelență în servicii",
      description:
        "Ne străduim să oferim doar cele mai bune servicii pentru prietenii dumneavoastră blănoși.",
    },
  ],
};

export const CAROUSEL_CONTENT = [
  {
    img: "/assets/images/cow.jpg",
    title: "Vaccinare",
  },
  {
    img: "/assets/images/puppy.jpg",
    title: "Controale veterinare",
  },
  {
    img: "/assets/images/little.jpg",
    title: "Hrănire asistată",
  },
  {
    img: "/assets/images/man_with_tablet.jpg",
    title: "Sfaturi și bune practici",
  },
  {
    img: "/assets/images/cow.jpg",
    title: "Vaccinare",
  },
  {
    img: "/assets/images/puppy.jpg",
    title: "Controale veterinare",
  },
  {
    img: "/assets/images/little.jpg",
    title: "Hrănire asistată",
  },
  {
    img: "/assets/images/man_with_tablet.jpg",
    title: "Sfaturi și bune practici",
  },
];
