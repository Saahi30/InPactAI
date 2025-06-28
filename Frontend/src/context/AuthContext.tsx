import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { supabase, User } from "../utils/supabase";

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

async function ensureUserInTable(user: any) {
  if (!user) return;
  // Check if user exists in users table
  const { data, error } = await supabase
    .from("users")
    .select("id")
    .eq("id", user.id)
    .single();
  if (!data) {
    // Insert user into users table
    await supabase.from("users").insert({
      id: user.id,
      email: user.email,
      username: user.user_metadata?.name || user.email.split("@")[0],
      role: "creator", // default, can be updated in onboarding
      profile_image: user.user_metadata?.avatar_url || null,
      created_at: new Date().toISOString(),
    });
  }
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      setUser(data.session?.user || null);
      if (data.session?.user) {
        await ensureUserInTable(data.session.user);
      }
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user || null);
        if (session?.user) {
          setLoading(true);
          await ensureUserInTable(session.user);
          setLoading(false);
          navigate("/onboarding");
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    navigate("/dashboard");
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsAuthenticated(false);
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col">
        <div className="text-lg font-semibold text-purple-600">Loading...</div>
        <div className="text-xs text-gray-500 mt-2">(If this is taking too long, try refreshing the page.)</div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
