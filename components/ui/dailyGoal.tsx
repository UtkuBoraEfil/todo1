"use client";
import { SendIcon } from "@/components/icons/send";
import { Button } from "@/components/ui/deleteButton";
import { UpdateGoalButton } from "@/components/ui/updateGoalButton";
import { useState, useEffect, useRef, FormEvent } from "react";
import { cn } from "@/lib/utils";
import { Check, RefreshCcw } from "lucide-react";
import { completeGoal, bringGoalToToday, updateGoal } from "@/actions";

interface DailyGoalProps {
  goal: string;
  goal_id: string;
  isCompleted: boolean;
}

export function DailyGoal({ goal, goal_id, isCompleted }: DailyGoalProps) {
  const [value, setValue] = useState(goal);
  const [completed, setCompleted] = useState(isCompleted);

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    event.preventDefault();
    setValue(event.target.value);
  }

  const handleSubmit = updateGoal.bind(null, goal_id);

  // const handleFormSubmit = async (event: FormEvent) => {
  //   event.preventDefault();
  //   const formData = new FormData();
  //   formData.append("value", value);
  //   await updateGoal(goal_id, formData);
  //   console.log("Form submitted");
  // };

  const handleCheck = async () => {
    await completeGoal(goal_id, !completed);
    setCompleted(!completed);
  };

  const handleUpdateClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("clicked");
    textareaRef.current?.focus();
    // handleInputFocus();
    await updateGoal(goal_id, value);
    // handleInputBlur();
  };
  const [isInputFocused, setIsInputFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      if (textareaRef.current.scrollHeight > 40)
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
  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
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
        // onSubmit={handleFormSubmit}
        className={cn(
          "w-full  bg-input-bg rounded-lg flex justify-between",
          completed && "bg-light-gray"
        )}
      >
        <div className="w-full h-auto grid place-items-center">
          <textarea
            ref={textareaRef}
            name="goalInput"
            spellCheck="false"
            disabled={completed}
            value={value}
            onChange={handleChange}
            className={cn(
              "w-full h-full overflow-hidden bg-transparent flex-1 pl-5 focus:outline-none active:outline-none transition-all duration-300 ease-in-out",
              completed && "line-through decoration-1",
              isInputFocused
                ? "h-full lg:py-2 "
                : "h-full truncate"
            )}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onInput={adjustTextareaHeight}
            style={{
              resize: "none",
              transition: "height 0.3s ease",
              height: isInputFocused
                ? `${textareaRef.current?.scrollHeight}px`
                : "1.5rem",
            }}
          />
        </div>
        {/* <div className="h-full grid place-items-center">
          <UpdateGoalButton id={goal_id} value={value} />
        </div> */}
        {isInputFocused && (
          // <div className="h-full grid place-items-center w-6 z-[2]">
          //   <UpdateGoalButton id={goal_id} value={value} />
          // </div>
          <button
            onMouseDown={handleMouseDown}
            onClick={handleUpdateClick}
            className="flex items-center justify-center pr-2"
          >
            <RefreshCcw />
          </button>
        )}
        {!isInputFocused && (
          <div className="h-full grid place-items-center">
            <Button id={goal_id} />
          </div>
        )}

        {/* <div className="h-full grid place-items-center">
          <Button id={goal_id} />
        </div> */}
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
