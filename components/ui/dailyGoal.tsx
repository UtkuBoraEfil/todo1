"use client";
import { SendIcon } from "@/components/icons/send";
import { Button } from "@/components/ui/deleteButton";
import { useState, useEffect, useRef, FormEvent } from "react";
import { cn } from "@/lib/utils";
import { Check, RefreshCcw } from "lucide-react";
import { completeGoal, bringGoalToToday, updateGoal } from "@/actions";

interface DailyGoalProps {
  goal: string;
  goal_id: string;
  isCompleted: boolean;
}

export  function DailyGoal({ goal, goal_id, isCompleted }: DailyGoalProps) {
  const [value, setValue] = useState(goal);
  const [completed, setCompleted] = useState(isCompleted);

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) { 
    setValue(event.target.value);
    event.preventDefault();
  }



  const handleSubmit =  updateGoal.bind(null,goal_id);

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("value", value);
    await updateGoal(goal_id, formData);
    console.log("Form submitted");
  };

  const handleCheck = async () => {
    await completeGoal(goal_id, !completed);
    setCompleted(!completed);
  };

  const [isInputFocused, setIsInputFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      if(textareaRef.current.scrollHeight > 40)
        textareaRef.current.style.height = "auto";
      if (isInputFocused) {
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      } else {
        textareaRef.current.style.height = "1.5rem"; // Adjust this value based on your line height
      }
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [goal, isInputFocused]);
 

  const handleInputFocus = () => {
    setIsInputFocused(true);
    adjustTextareaHeight();
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
    adjustTextareaHeight();
  };

  const handleButtonClick = () => {
    console.log("Button clicked");
    console.log("nolur calis artik");
  };


  return (
    <div className="flex justify-around lg:gap-3 gap-1 z-10 w-full  lg:px-10">
      <button
        onClick={handleCheck}
        className={cn(
          "bg-input-bg rounded-lg xl:w-12 xl:h-12 lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center shrink-0",
          completed && "bg-light-gray"
        )}
      >
        <div className="bg-main-white xl:w-[36px] xl:h-[36px] w-6 h-6 rounded-md grid place-items-center">
          {completed && <Check className="w-full h-full" />}
        </div>
      </button>
      <form
        onSubmit={handleFormSubmit}
        className={cn(
          "w-full  bg-input-bg rounded-lg flex justify-between",
          completed && "bg-light-gray"
        )}
      >
        <div className="w-full h-auto grid place-items-center" >
          <textarea
            ref={textareaRef}
            name="goalInput"
            disabled={completed}
            value={value}
            onChange={handleChange}
            className={cn(
              "w-full h-full overflow-hidden bg-transparent flex-1 pl-5 focus:outline-none active:outline-none transition-all duration-300 ease-in-out",
              completed && "line-through decoration-1",
              isInputFocused ? "h-full lg:py-2" : "h-full truncate"
            )}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onInput={adjustTextareaHeight}
            style={{ resize: "none", transition: "height 0.3s ease", height: isInputFocused ? `${textareaRef.current?.scrollHeight}px` : "1.5rem" }}
          />
        </div>
        <button  type="submit" >submit</button>
        {/* {isInputFocused && (

            <button type="button" onClick={handleButtonClick} className="xl:w-12 lg:w-10 w-6">
              <RefreshCcw />
            </button>
        )} 
        {!isInputFocused && <div  className="h-full grid place-items-center"><Button id={goal_id} /></div>}
        */}
         <div  className="h-full grid place-items-center"><Button id={goal_id} /></div>
      </form>
      <button
        onClick={() => bringGoalToToday(goal_id)}
        className={cn(
          "bg-input-bg rounded-lg xl:w-12 xl:h-12 lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center shrink-0",
          completed && "bg-light-gray"
        )}
      >
        <SendIcon />
      </button>
    </div>
  );
}
