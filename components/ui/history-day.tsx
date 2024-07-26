import Link from "next/link";

interface Date {
  date: string;
  slug: string;
}

export function Date ({date, slug }: Date) {
  return (
    <Link href={`/about/dates/${slug}`} className="bg-main-white w-fit px-4 py-1 rounded-md">
        <p className="text-lg">{date}</p>
    </Link> 
  );
};
