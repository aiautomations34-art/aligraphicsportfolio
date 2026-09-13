import fs from "fs";
import path from "path";
import PortfolioClient from "./PortfolioClient";

export const dynamic = "force-static";

interface Category {
  name: string;
  folder: string;
  images: string[];
}

function getCategories(): Category[] {
  const rootDir = path.join(process.cwd(), "public", "images", "r");

  try {
    const folders = fs.readdirSync(rootDir).filter((folder) =>
      fs.statSync(path.join(rootDir, folder)).isDirectory()
    );

    return folders.map((folder) => {
      const folderPath = path.join(rootDir, folder);
      const files = fs.readdirSync(folderPath).filter((file) =>
        /\.(webp|png|jpg|jpeg|svg|gif|avif)$/i.test(file)
      );

      return {
        name: folder
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
        folder,
        images: files.map((file) =>
          `/images/r/${encodeURIComponent(folder)}/${encodeURIComponent(file)}`
        ),
      };
    });
  } catch {
    return [];
  }
}

export default function Home() {
  const categories = getCategories();

  return <PortfolioClient categories={categories} />;
}
