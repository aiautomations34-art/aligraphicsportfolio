import fs from "fs";
import path from "path";
import PortfolioClient from "./PortfolioClient";

export const dynamic = "force-static";

function getOrbitImages(): string[] {
  const orbitDir = path.join(process.cwd(), "public", "orbit");

  try {
    const files = fs.readdirSync(orbitDir).filter((file) =>
      /\.(webp|png|jpg|jpeg|svg|gif|avif)$/i.test(file)
    );

    return files.map((file) => `/orbit/${file}`);
  } catch {
    return [];
  }
}

export default function Home() {
  const orbitImages = getOrbitImages();

  return <PortfolioClient orbitImages={orbitImages} />;
}
