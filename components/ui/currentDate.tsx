export function CurrentDate () {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
    const date = new Date();
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
  return (
    <div className=" text-[100px] font-bold text-center leading-none ">
      {day + " " + month}
    </div>
  );
};
