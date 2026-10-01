// "use client"
// import type { Metadata } from "next";
// import localFont from "next/font/local";
// import SmoothScroll from "@/components/SmoothScroll";
// import MainNav from "@/components/MainNav";
// import Footer from "@/components/Footer";
// import SplashScreen from "@/components/SplashScreen";
// import VideoFooter from "@/components/VideoFooter";
// import Header from "@/components/Header";
// import "./globals.css";
// // import { useRouter } from "next/navigation";


// /* =========================
//    FONTS
//    ========================= */
//   // const router = useRouter();
//   // console.log("@@@@",router)

//   //  const isNoSidebar = 

// const playfair = localFont({
//   src: [
//     {
//       path: "../public/fonts/PlayfairDisplay-Medium.woff2",
//       weight: "500",
//       style: "normal",
//     },
//     {
//       path: "../public/fonts/PlayfairDisplay-SemiBold.woff2",
//       weight: "600",
//       style: "normal",
//     },
//     {
//       path: "../public/fonts/PlayfairDisplay-Bold.woff2",
//       weight: "700",
//       style: "normal",
//     },
//   ],
//   variable: "--font-playfair",
//   display: "swap",
// });

// const inter = localFont({
//   src: [
//     {
//       path: "../public/fonts/Inter_24pt-Regular.woff2",
//       weight: "400",
//       style: "normal",
//     },
//     {
//       path: "../public/fonts/Inter_24pt-Medium.woff2",
//       weight: "500",
//       style: "normal",
//     },
//     {
//       path: "../public/fonts/Inter_24pt-SemiBold.woff2",
//       weight: "600",
//       style: "normal",
//     },
//   ],
//   variable: "--font-inter",
//   display: "swap",
// });

// const cormorant = localFont({
//   src: [
//     {
//       path: "../public/fonts/CormorantGaramond-Regular.woff2",
//       weight: "400",
//       style: "normal",
//     },
//     {
//       path: "../public/fonts/CormorantGaramond-Medium.woff2",
//       weight: "500",
//       style: "normal",
//     },
//     {
//       path: "../public/fonts/CormorantGaramond-SemiBold.woff2",
//       weight: "600",
//       style: "normal",
//     },
//     {
//       path: "../public/fonts/CormorantGaramond-Italic.woff2",
//       weight: "400",
//       style: "italic",
//     },
//   ],
//   variable: "--font-cormorant",
//   display: "swap",
// });

// const marck = localFont({
//   src: "../public/fonts/MarckScript-Regular.woff2",
//   variable: "--font-script",
//   display: "swap",
// });




// export const metadata: Metadata = {
//   title: "PC Photography — Cinematic Wedding Films",
//   description:
//     "Cinematic wedding films from Lake Como to Udaipur. PC Photography tells real love stories with patience, light, and a little bit of nerve.",
// };

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en" className={`${playfair.variable} ${inter.variable} ${cormorant.variable} ${marck.variable}`}>
//       <body className="font-body">
//         {/* ADD as the very first thing inside <body>, before <SmoothScroll> */}
// {/* <SplashScreen /> */}
//         <SmoothScroll>
//           {/* <MainNav /> */}
//           {/* <Header/> */}
//           {/* <div className="lg:pl-[230px]"> */}
//           <div >
          
//           {/* <div className=""> */}
//             <main>{children}</main>
//             {/* <Footer /> */}
//             <VideoFooter/>
//           </div>
//         </SmoothScroll>
//       </body>
//     </html>
//   );
// }

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ClientProviders from "./ClientProviders";

/* =========================
   FONTS
   ========================= */
const playfair = localFont({
  src: [
    {
      path: "../public/fonts/PlayfairDisplay-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/PlayfairDisplay-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/PlayfairDisplay-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-playfair",
  display: "swap",
});

const inter = localFont({
  src: [
    {
      path: "../public/fonts/Inter_24pt-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Inter_24pt-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Inter_24pt-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = localFont({
  src: [
    {
      path: "../public/fonts/CormorantGaramond-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/CormorantGaramond-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/CormorantGaramond-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/CormorantGaramond-Italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-cormorant",
  display: "swap",
});

const marck = localFont({
  src: "../public/fonts/MarckScript-Regular.woff2",
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PC Photography — Cinematic Wedding Films",
  description:
    "Cinematic wedding films from Lake Como to Udaipur. PC Photography tells real love stories with patience, light, and a little bit of nerve.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${cormorant.variable} ${marck.variable}`}
    >
      <body className="font-body">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
