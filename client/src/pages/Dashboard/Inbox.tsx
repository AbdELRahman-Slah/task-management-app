import { InboxIcon } from "lucide-react";

function Inbox() {
  return (
    <div className="w-fit mx-auto">
      <div className="flex flex-col justify-center items-center gap-2 h-80 w-80 border shadow-sm bg-muted rounded-md">
        <InboxIcon size={160} strokeWidth={1.2} />

        <p className="text-muted-foreground text-xl">Inbox is empty</p>
      </div>
    </div>
  );
}

export default Inbox;
