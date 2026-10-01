export type Film = {
  slug: string;
  couple: string;
  location: string;
  date: string;
  teaser: string;
  category: string;
  image: string;
};

export type Category = {
  slug: string;
  label: string;
  films: Film[];
};

export const filmSections: Category[] = [
  {
    slug: "destination",
    label: "Destination",
    films: [
      {
        slug: "arya-federico",
        couple: "Arya & Federico",
        location: "Lake Como, Italy",
        date: "June 2025",
        teaser:
          "When a supermodel married her Italian stallion on a horse ranch outside Milan, it was so dreamy that they had to have two ceremonies just to fit everyone in.",
        category: "Destination",
        image:
          "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop",
      },
      {
        slug: "maya-thomas",
        couple: "Maya & Thomas",
        location: "Santorini, Greece",
        date: "September 2024",
        teaser:
          "A cliffside chapel, a sea the color of ink, and vows written on the back of a napkin the night before.",
        category: "Destination",
        image:
          "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=2000&auto=format&fit=crop",
      },
    ],
  },

  {
    slug: "indian",
    label: "Indian",
    films: [
      {
        slug: "akshay-riya",
        couple: "Akshay & Riya",
        location: "Udaipur, India",
        date: "February 2025",
        teaser:
          "Someone somewhere is made for you but you have to survive the haldi first — turmeric, marigolds, and a lake palace at golden hour.",
        category: "Indian",
        image:
          "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=2000&auto=format&fit=crop",
      },
      {
        slug: "diya-arjun",
        couple: "Diya & Arjun",
        location: "Jaipur, India",
        date: "December 2024",
        teaser:
          "Three days, one pink city, and a baraat that stopped traffic on the way to the fort.",
        category: "Indian",
        image:
          "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=2000&auto=format&fit=crop",
      },
    ],
  },

  {
    slug: "intimate",
    label: "Intimate",
    films: [
      {
        slug: "elle-noah",
        couple: "Elle & Noah",
        location: "Provence, France",
        date: "July 2024",
        teaser:
          "Lavender fields, a long table dinner under fairy lights, and a first look that made the whole crew tear up.",
        category: "Intimate",
        image:
          "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=2000&auto=format&fit=crop",
      },
    ],
  },

  {
    slug: "editorial",
    label: "Editorial",
    films: [
      {
        slug: "sana-vikram",
        couple: "Sana & Vikram",
        location: "Goa, India",
        date: "November 2023",
        teaser:
          "Barefoot on the sand, a beach shack turned ballroom, and a sangeet that lasted until sunrise.",
        category: "Editorial",
        image:
          "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2000&auto=format&fit=crop",
      },
    ],
  },
];
