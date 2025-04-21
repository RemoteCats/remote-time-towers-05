
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogIn, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function AuthButton() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <Button 
        onClick={() => navigate("/auth")}
        variant="outline" 
        className="bg-transparent border-[#999266] text-[#999266] hover:bg-[#999266] hover:text-black"
      >
        <LogIn className="mr-2 h-4 w-4" />
        Sign In
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.user_metadata.avatar_url} alt={user.email || ""} />
            <AvatarFallback>{user.email?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-black border-[#999266]" align="end">
        <DropdownMenuItem asChild>
          <Link to="/profile" className="flex items-center text-[#999266] hover:text-black hover:bg-[#999266]">
            <User className="mr-2 h-4 w-4" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => signOut()}
          className="text-[#999266] hover:text-black hover:bg-[#999266] cursor-pointer"
        >
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
