import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface CreateBoardModalProps {
  isOpen: boolean;
  onBoardCreated: () => void;
}

const backgrounds = [
  "bg-gradient-to-br from-purple-400 to-pink-400",
  "bg-gradient-to-br from-blue-400 to-cyan-400",
  "bg-gradient-to-br from-green-400 to-teal-400",
  "bg-gradient-to-br from-orange-400 to-red-400",
];

interface User {
  id: string;
  role: string;
}

interface Data {
  title: string;
  users: User[];
  background: string;
}

const API_URL = import.meta.env.VITE_API_URL;

const CreateBoardModal: React.FC<CreateBoardModalProps> = ({
  isOpen,
  onBoardCreated,
}) => {
  const userId = JSON.parse(localStorage.getItem("user") as string).id;

  const initUsers = [{ id: userId, role: "ADMIN" }];
  const userToken = localStorage.getItem("token");

  const [title, setTitle] = useState("");
  const [users, setUsers] = useState<User[]>(initUsers);
  const [background, setBackground] = useState(backgrounds[0]);
  const [loading, setLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: (data: Data) =>
      axios.post(`${API_URL}/boards`, data, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }),
    onSuccess: () => {
      if (onBoardCreated) onBoardCreated();
    },
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    mutation.mutate({ title, users, background });

    setLoading(false);
    setTitle("");
    setBackground(backgrounds[0]);
    setUsers([{ id: "686d02b9d7a9810de37d7bee", role: "ADMIN" }]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <Card className="w-full max-w-md shadow-lg border-border">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4 text-foreground">
            Create New Board
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-foreground">
                Board Title
              </label>
              <input
                className="w-full px-3 py-2 border rounded bg-background text-foreground focus:outline-none focus:ring focus:border-primary"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Enter board title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-foreground">
                Background
              </label>
              <div className="flex gap-2">
                {backgrounds.map((bg, idx) => (
                  <button
                    type="button"
                    key={bg}
                    className={`h-8 w-8 rounded ${bg} border-2 ${
                      background === bg
                        ? "border-primary"
                        : "border-transparent"
                    }`}
                    onClick={() => setBackground(bg)}
                    aria-label={`Select background ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button
                type="button"
                variant="secondary"
                onClick={handleSubmit}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading || !title}>
                {loading ? "Creating..." : "Create"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateBoardModal;
