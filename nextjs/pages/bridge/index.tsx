import BridgeRunes from "@/components/Bridge";
import Layout from "@/components/Layout";

export default function Bridge() {
  return (
    <Layout>
      <main className={`w-full flex flex-row items-center justify-around p-5`}>
        <BridgeRunes />
      </main>
    </Layout>
  );
}
