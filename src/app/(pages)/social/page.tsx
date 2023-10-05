import FigureComponent from "./components/figure";
import FooterComponent from "./components/footer";
import LinkTable from "./components/links";

export default function Social() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <section className="flex flex-col items-center space-y-5 p-6">
        <FigureComponent />
        {/* Social links */}
        <LinkTable />
        {/* Contact buttons */}
        <FooterComponent />
      </section>
    </main>
  );
}
