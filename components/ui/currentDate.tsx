export function CurrentDate () {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
    const date = new Date();
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
  return (
    <div className=" xl:text-[100px] lg:text-[82px] text-[48px] font-bold text-center z-10 leading-none ">
      {day + " " + month}
    </div>
  );
};
