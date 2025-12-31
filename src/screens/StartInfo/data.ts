import Intro1 from "../../../assets/SVGs/intro_1.svg";
import Intro2 from "../../../assets/SVGs/intro_2.svg";
import Intro3 from "../../../assets/SVGs/intro_3.svg";

export type IntroPage = {
  id: string;
  title: string;
  description: string;
  image: React.ComponentType<{ width?: number; height?: number }>;
};

export const introPages: IntroPage[] = [
  {
    id: "1",
    title: "Choose Products",
    description:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.",
    image: Intro1,
  },
  {
    id: "2",
    title: "Make Payment",
    description:
      "Pay securely with multiple options and track your orders in real time.",
    image: Intro2,
  },
  {
    id: "3",
    title: "Get Your Order",
    description:
      "Fast delivery with real-time updates right to your doorstep.",
    image: Intro3,
  },
];
