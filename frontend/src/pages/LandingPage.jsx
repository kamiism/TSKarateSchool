import Header from '../components/landing/Header';
import Hero from '../components/landing/Hero';
import Marquee from '../components/landing/Marquee';
import About from '../components/landing/About';
import Programs from '../components/landing/Programs';
import WhyUs from '../components/landing/WhyUs';
import Testimonial from '../components/landing/Testimonial';
import CTA from '../components/landing/CTA';
import Footer from '../components/landing/Footer';

export default function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Programs />
        <WhyUs />
        <Testimonial />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
