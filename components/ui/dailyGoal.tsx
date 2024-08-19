import { SendIcon } from '@/components/icons/send';
import { Button } from '@/components/ui/deleteButton';


interface DailyGoalProps {
  goal: string;
  goal_id: string;
}


export function DailyGoal({ goal, goal_id }: DailyGoalProps) {
  return (
    <form action="" className="flex justify-between lg:gap-3 gap-1 z-10 ">
        <button className=" bg-input-bg rounded-lg xl:w-12 xl:h-12 lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center">
          <div className="bg-main-white xl:w-[36px] xl:h-[36px] w-6 h-6 rounded-md"></div>
        </button>
      <div  className=" lg:w-[460px] w-[150px]  bg-input-bg rounded-lg flex justify-between">
        <div className="rounded-lg bg-transparent flex-1 pl-5 flex flex-col justify-center">{goal}</div>
        <Button id={goal_id}/>
      </div>
      <button type='submit'  className=" bg-input-bg rounded-lg xl:w-12 xl:h-12 lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center">
        <SendIcon />
      </button>
    </form>
  );
}

