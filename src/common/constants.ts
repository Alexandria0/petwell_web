import {
  CalendarGreenOutlineIcon,
  StarGreenOutlineIcon,
  TickGreenOutlineIcon,
  UserGreenOutlineIcon,
} from "@/components/icons";

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

export const ABOUT_US = {
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
