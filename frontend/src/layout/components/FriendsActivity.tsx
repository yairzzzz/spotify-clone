import { useChatStore } from "@/stores/useChatStore";
import { HeadphonesIcon } from "lucide-react";

const FriendsActivity = () => {
  const { fetchUsers, users, isLoading } = useChatStore();
  return (
    <div>
      <LoginPrompt />
    </div>
  );
};

export default FriendsActivity;

const LoginPrompt = () => (
  <div className="h-full flex flex-col items-center justify-center p-6 text-center space-y-4">
    <div className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full blur-lg opacity-75 animate-pulse" />

      <div className="relative w-full bg-zinc-900 rounded-full p-4 flex justify-center">
        <HeadphonesIcon className="size-8 text-emerald-400" />
      </div>
    </div>

    <div className="space-y-2 max-w-[250px]">
      <h3 className="text-lg font-semibold text-white">
        See What Friends Are Playing
      </h3>
      <p className="text-sm text-zinc-400">
        Login to discover what music your friends are enjoying right now
      </p>
    </div>
  </div>
);
