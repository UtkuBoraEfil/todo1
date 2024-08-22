export function HistoryDate({ given_date }: { given_date: string }) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let date = given_date.split("/");
  let day = date[0];
  let month = monthNames[parseInt(date[1]) - 1];
  let year = date[2];
  return (
    <div className=" xl:text-[100px] lg:text-[82px] text-[48px] font-bold text-center z-10 leading-none ">
      {day + " " + month}
    </div>
  );
}
