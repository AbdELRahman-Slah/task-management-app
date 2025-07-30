import { TextareaHTMLAttributes, useEffect, useRef } from "react";
import { Textarea } from "./ui/textarea";

const CustomTextarea = (props: TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight + 2}px`;
    }
  }, [props.value]);

  return (
    <Textarea
      autoFocus
      ref={textareaRef}
      rows={1}
      style={{
        overflow: "hidden",
        wordBreak: "break-all",
      }}
      {...props}
    />
  );
};

export default CustomTextarea;
