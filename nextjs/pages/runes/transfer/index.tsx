import Layout from "@/components/Layout";
import TransferRunes from "@/components/Runes/Transfer";

export default function Transfer() {
  return (
    <Layout>
      <main className={`w-full flex flex-row items-center justify-around p-5`}>
        <TransferRunes />
      </main>
    </Layout>
  );
}
