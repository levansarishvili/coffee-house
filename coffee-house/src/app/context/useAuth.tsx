"use client";

import { createClient } from "@/utils/supabase/component";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthContextType, AuthUser, UserProfile } from "../types/interfaces";

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  userProfile: null,
  loading: true,
  signOutLoading: false,
  error: null,
  refreshUser: async () => {},
  refreshUserProfile: async () => {},
  signOut: async () => {},
});

// Hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Auth Provider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser>(null);
  const [userProfile, setUserProfile] = useState<UserProfile>(null);
  const [loading, setLoading] = useState(true);
  const [signOutLoading, setSignOutLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  // Function to get auth user data
  const getAuthUser = useCallback(async (): Promise<AuthUser> => {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        if (error.message.includes("JWT") || error.message.includes("token")) {
          console.error("Auth token error:", error);
        }
        throw error;
      }

      return user as AuthUser;
    } catch (error) {
      if (error instanceof Error) {
        if (
          !error.message.includes("Not logged in") &&
          !error.message.includes("No user") &&
          !error.message.includes("JWT")
        ) {
          setError(error.message);
        }
      }
      return null;
    }
  }, [supabase]);

  // Function to get user profile data from your table
  const getUserProfile = useCallback(
    async (userId: string): Promise<UserProfile> => {
      try {
        const { data, error } = await supabase
          .from("user_profiles")
          .select("*")
          .eq("user_id", userId)
          .single();

        if (error) {
          if (error.code === "PGRST116") {
            console.log("No user profile found for user:", userId);
            return null;
          }
          throw error;
        }

        return data;
      } catch (error) {
        console.error("Error fetching user profile:", error);
        return null;
      }
    },
    [supabase]
  );

  // Function to refresh both auth user and profile
  const refreshUser = async () => {
    setLoading(true);
    setError(null);

    try {
      const authUser = await getAuthUser();
      setUser(authUser);

      if (authUser?.id) {
        const profile = await getUserProfile(authUser.id);
        setUserProfile(profile);
      } else {
        setUserProfile(null);
      }
    } catch (error) {
      console.error("Error refreshing user:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to refresh only the profile
  const refreshUserProfile = async () => {
    if (!user?.id) return;

    try {
      const profile = await getUserProfile(user.id);
      setUserProfile(profile);
    } catch (error) {
      console.error("Error refreshing user profile:", error);
    }
  };

  // Function to sign out
  const signOut = async () => {
    setSignOutLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      setUser(null);
      setUserProfile(null);
    } catch (error) {
      console.error("Error signing out:", error);
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setSignOutLoading(false);
    }
  };

  // Initial user data fetch and auth state listener
  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      if (!mounted) return;

      try {
        // Get initial auth user
        const authUser = await getAuthUser();
        if (!mounted) return;

        setUser(authUser);

        // Get user profile if user exists
        if (authUser?.id) {
          const profile = await getUserProfile(authUser.id);
          if (mounted) {
            setUserProfile(profile);
          }
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        if (mounted) {
          setError(
            error instanceof Error ? error.message : "An error occurred"
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    // Cleanup function
    return () => {
      mounted = false;
    };
  }, [supabase, getAuthUser, getUserProfile]);

  const value: AuthContextType = {
    user,
    userProfile,
    loading,
    signOutLoading,
    error,
    refreshUser,
    refreshUserProfile,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext };
