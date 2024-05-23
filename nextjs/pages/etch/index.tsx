import Layout from "@/components/Layout";
import EtchRunes from "@/components/Runes/Etch";

export default function Etch() {
  return (
    <Layout>
      <main className={`w-full flex flex-row items-center justify-around p-24`}>
        <EtchRunes />
      </main>
    </Layout>
  );
}
