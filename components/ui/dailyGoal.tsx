import { SendIcon } from '@/components/icons/send';
import { Button } from '@/components/ui/deleteButton';


interface DailyGoalProps {
  goal: string;
  goal_id: string;
}


export function DailyGoal({ goal, goal_id }: DailyGoalProps) {
  return (
    <form action="" className="flex justify-between gap-3 z-10">
      <button className=" bg-input-bg rounded-lg w-12 h-12 flex justify-center items-center">
        <div className="bg-main-white w-[36px] h-[36px] rounded-md"></div>
      </button>
      <div  className=" w-[460px] bg-input-bg rounded-lg flex justify-between">
        <div className="rounded-lg bg-transparent flex-1 pl-5 flex flex-col justify-center">{goal}</div>
        <Button id={goal_id}/>
      </div>
      <button type='submit'  className=" bg-input-bg rounded-lg w-12 h-12 flex justify-center items-center">
        <SendIcon />
      </button>
    </form>
  );
}

