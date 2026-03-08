import { useState } from "react";
import { useAuth, SignInButton } from "@clerk/clerk-react";
import { useCreateComment, useDeleteComment } from "../hooks/useComment";
import {
  SendIcon,
  Trash2Icon,
  MessageSquareIcon,
  LogInIcon,
} from "lucide-react";

import type { Comment } from "../lib/fetch";

type Props = {
  productId: string;
  comments?: Comment[];
  currentUser: string;
};

export default function CommentSection({
  currentUser,
  productId,
  comments,
}: Props) {
  let [content, setContent] = useState("");
  let { isSignedIn } = useAuth();
  let createComment = useCreateComment();
  let deleteComment = useDeleteComment(productId);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    if (!content.trim()) return;

    e.preventDefault();
    createComment.mutate(
      { productId, content },
      {
        onSuccess: () => {
          setContent("");
        },
      },
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <MessageSquareIcon className="size-4 text-primary" />
        <h3 className="font-bold">Comments</h3>
        <span className="badge badge-primary badge-sm">{comments?.length}</span>
      </div>

      {isSignedIn ? (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            placeholder="Add a comment..."
            onChange={(e) => {
              setContent(e.target.value);
            }}
            className="input input-bordered input-sm flex-1 bg-base-200"
            value={content}
            disabled={createComment.isPending}
          />
          <button
            disabled={createComment.isPending || !content.trim()}
            type="submit"
            className="btn btn-primary btn-sm btn-square"
          >
            {createComment.isPending ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <SendIcon className="size-4" />
            )}
          </button>
        </form>
      ) : (
        <>
          <div className="flex items-center justify-between bg-base-300 rounded-lg p-3">
            <span className="text-sm text-base-content/60">
              Sign in to join the conversation{" "}
            </span>
            <SignInButton mode="modal">
              <button className="btn btn-primary btn-sm gap-1">
                <LogInIcon className="size-4" />
                Sign In
              </button>
            </SignInButton>
          </div>
        </>
      )}

      <div className="space-y-2 max-h-80 overflow-y-auto">
        {comments?.length === 0 || comments === undefined ? (
          <>
            <div className="text-center py-8 text-base-content/50">
              <MessageSquareIcon className="size-8 mx-auto mb-2 opacity-30" />
              <p className="text-sm ">No comment yet, be first!</p>
            </div>
          </>
        ) : (
          <>
            {comments?.map((text) => {
              return (
                <div key={text.id} className="chat chat-start">
                  <div className="chat-image avatar">
                    <div className="w-8 rounded-full">
                      <img
                          src={text.user?.imageUrl ?? undefined}
                       alt={text.user?.fullname ?? "User avatar"}
                      />
                    </div>
                  </div>

                  <div className="chat-header text-sm opacity-70 mb-2">
                    {text.user?.fullname}
                    <time className="ml-2 text-sm opacity-50">
                      {new Date(text.createdAt).toLocaleDateString()}
                    </time>
                  </div>

                  <div className="chat-bubble chat-bubble-neutral text-sm">
                    {text.content}
                  </div>

                  {currentUser === text.userId && (
                    <div className="chat-footer">
                      <button
                        onClick={() =>
                          confirm("Delete ? ") && deleteComment.mutate(text.id)
                        }
                        className="btn btn-ghost btn-sm text-error"
                        disabled={deleteComment.isPending}
                      >
                        {deleteComment.isPending ? (
                          <span className="loading loading-spinner loading-xs "></span>
                        ) : (
                          <Trash2Icon className="size-4" />
                        )}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
