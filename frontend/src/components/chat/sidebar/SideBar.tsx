import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {
  setConversations,
  addConversation,
  removeConversation,
  setSelectedConversation,
  setIsLoadingConversations,
} from "@/redux/slices/conversation.slice";
import {clearUser} from "@/redux/slices/user.slice";
import {chatService} from "@/services/chatService";
import {signOut} from "@/lib/auth-client";
import toast from "react-hot-toast";

import {Sidebar, SidebarRail} from "@/components/ui/sidebar";
import {SidebarHeaderSection} from "./SidebarHeaderSection";
import {SidebarConversationList} from "./SidebarConversationList";
import {SidebarUserProfile} from "./SidebarUserProfile";

const SideBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const {conversations, selectedConversation, isLoadingConversations} =
    useAppSelector((state) => state.conversation);
  const {user} = useAppSelector((state) => state.user);

  const [searchQuery, setSearchQuery] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    const fetchConversations = async () => {
      dispatch(setIsLoadingConversations(true));
      try {
        const response = await chatService.getConversations();
        if (response.success && response.data) {
          dispatch(setConversations(response.data));
          if (response.data.length > 0 && !selectedConversation) {
            dispatch(setSelectedConversation(response.data[0]._id));
          }
        }
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to load conversations",
        );
      } finally {
        dispatch(setIsLoadingConversations(false));
      }
    };

    fetchConversations();
  }, [dispatch]);

  const handleCreateConversation = async () => {
    if (isCreating) return;
    setIsCreating(true);
    try {
      const response = await chatService.createConversation();
      if (response.success && response.data) {
        dispatch(addConversation(response.data));
        dispatch(setSelectedConversation(response.data._id));
        toast.success("New conversation started");
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to create conversation",
      );
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteConversation = async (conversationId: string) => {
    try {
      const response = await chatService.deleteConversation(conversationId);
      if (response.success) {
        dispatch(removeConversation(conversationId));
        toast.success("Conversation deleted");
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to delete conversation",
      );
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      dispatch(clearUser());
      toast.success("Signed out successfully");
    } catch {
      toast.error("Error signing out");
    }
  };

  const filteredConversations = conversations.filter((convo) =>
    (convo.title || "Untitled Chat")
      .toLowerCase()
      .includes(searchQuery.toLowerCase()),
  );

  return (
    <Sidebar collapsible="icon" className="border-r border-border/50">
      <SidebarHeaderSection
        onNewChat={handleCreateConversation}
        isCreating={isCreating}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <SidebarConversationList
        conversations={filteredConversations}
        activeId={selectedConversation}
        isLoading={isLoadingConversations}
        onSelect={(id) => dispatch(setSelectedConversation(id))}
        onDelete={handleDeleteConversation}
        onRename={() => toast("Rename feature coming soon", {icon: "ℹ️"})}
      />

      <SidebarUserProfile user={user} onSignOut={handleSignOut} />

      <SidebarRail />
    </Sidebar>
  );
};

export default SideBar;
