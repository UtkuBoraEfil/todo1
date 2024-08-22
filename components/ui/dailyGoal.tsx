'use client';
import { SendIcon } from '@/components/icons/send';
import { Button } from '@/components/ui/deleteButton';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Check, RefreshCcw } from 'lucide-react';
import { completeGoal, bringGoalToToday } from '@/actions';


interface DailyGoalProps {
  goal: string;
  goal_id: string;
  isCompleted: boolean;
}


export function DailyGoal({ goal, goal_id, isCompleted }: DailyGoalProps) {
  const [completed, setCompleted] = useState(isCompleted);
  const handleCheck = async() =>{
    await completeGoal(goal_id, !completed);
    setCompleted(!completed);
  }
  // const [isClicked, setIsClicked] = useState(false);
  // function handleClick() {
  //   console.log('clicked');
  //   setIsClicked(!isClicked);
  // }
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  return (
    <div className="flex justify-between lg:gap-3 gap-1 z-10 ">
      <button
        onClick={handleCheck}
        className={cn(
          "bg-input-bg rounded-lg xl:w-12 xl:h-12 lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center",
          completed && "bg-light-gray"
        )}
      >
        <div className="bg-main-white xl:w-[36px] xl:h-[36px] w-6 h-6 rounded-md grid place-items-center">
          {completed && <Check className="w-full h-full" />}
        </div>
      </button>
      <form
        className={cn(
          "lg:w-[460px] w-[150px] bg-input-bg rounded-lg flex justify-between",
          completed && "bg-light-gray"
        )}
      >
        <input
          type="text"
          name="goalInput"
          disabled={completed}
          defaultValue={goal}
          className={cn(
            "w-full rounded-lg bg-transparent flex-1 pl-5 flex flex-col justify-center truncate focus:outline-none",
            completed && "line-through decoration-1"
          )}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
        {isInputFocused && <button className='xl:w-12 xl:h-12 lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center'><RefreshCcw /></button>}
        {!isInputFocused &&  <Button id={goal_id} />}
      </form>
      <button
        onClick={() => bringGoalToToday(goal_id)}
        className={cn(
          "bg-input-bg rounded-lg xl:w-12 xl:h-12 lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center",
          completed && "bg-light-gray"
        )}
      >
        <SendIcon />
      </button>
    </div>
  );
}

