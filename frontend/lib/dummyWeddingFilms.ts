
export type WeddingFilm = {
  id: string;
  couple: string;
  slug: string;
  location: string;
  city: string;
  state: string;
  date: string;
  latitude: number;
  longitude: number;
  image: string;
  filmUrl: string;
};

export const dummyWeddingFilms: WeddingFilm[] = [
  {
    id: "film_001",
    couple: "RAKUL & JACKKY",
    slug: "rakul-jackky",
    location: "Goa",
    city: "Panaji",
    state: "Goa",
    date: "April 2025",
    latitude: 15.4909,
    longitude: 73.8278,
    image: "/pc_logo.png",
    filmUrl: "/films/rakul-jackky",
  },

  {
    id: "film_002",
    couple: "NIKKI & VISHAL",
    slug: "nikki-vishal",
    location: "Mumbai",
    city: "Mumbai",
    state: "Maharashtra",
    date: "March 2025",
    latitude: 19.076,
    longitude: 72.8777,
    image: "/pc_logo.png",
    filmUrl: "/films/nikki-vishal",
  },

  {
    id: "film_003",
    couple: "APOORVA & KSHITIJ",
    slug: "apoorya-kshitij",
    location: "Jaipur",
    city: "Jaipur",
    state: "Rajasthan",
    date: "March 2025",
    latitude: 26.9124,
    longitude: 75.7873,
    image: "/pc_logo.png",
    filmUrl: "/films/apoorya-kshitij",
  },

  {
    id: "film_004",
    couple: "PV SINDHU & DATTA",
    slug: "pv-sindhu-datta",
    location: "Hyderabad",
    city: "Hyderabad",
    state: "Telangana",
    date: "December 2024",
    latitude: 17.385,
    longitude: 78.4867,
    image: "/pc_logo.png",
    filmUrl: "/films/pv-sindhu-datta",
  },

  {
    id: "film_005",
    couple: "PRIYA & AKSHAY",
    slug: "priya-akshay",
    location: "Udaipur",
    city: "Udaipur",
    state: "Rajasthan",
    date: "December 2024",
    latitude: 24.5854,
    longitude: 73.7125,
    image: "/pc_logo.png",
    filmUrl: "/films/priya-akshay",
  },
];