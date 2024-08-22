import Link from "next/link";

interface Date {
  date: string;
  slug: string;
}

export function Date ({date, slug }: Date) {
  return (
    <Link href={`/about/dates/${slug}`} className="bg-main-white w-28  py-1 rounded-md ">
      <div className="w-full flex justify-center">
        <p className="lg:text-lg text-sm ">{date}</p>
      </div>
    </Link> 
  );
};
