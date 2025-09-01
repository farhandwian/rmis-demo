"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { X, Sparkles } from "lucide-react";

interface AISuggestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  suggestions: string[];
  onSelect: (selectedSuggestions: string[]) => void;
}

export function AISuggestionModal({
  isOpen,
  onClose,
  title,
  description,
  suggestions,
  onSelect,
}: AISuggestionModalProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  if (!isOpen) return null;

  const handleToggleItem = (suggestion: string) => {
    setSelectedItems((prev) =>
      prev.includes(suggestion)
        ? prev.filter((item) => item !== suggestion)
        : [...prev, suggestion]
    );
  };

  const handleSelectAll = () => {
    setSelectedItems(suggestions);
  };

  const handleClearAll = () => {
    setSelectedItems([]);
  };

  const handleConfirm = () => {
    onSelect(selectedItems);
    setSelectedItems([]);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden">
        <Card className="card-dashboard">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-pu-accent to-pu-blue rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-pu-blue">{title}</CardTitle>
                  <CardDescription>{description}</CardDescription>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Selection Controls */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSelectAll}
                  disabled={selectedItems.length === suggestions.length}
                >
                  Pilih Semua
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearAll}
                  disabled={selectedItems.length === 0}
                >
                  Bersihkan
                </Button>
                <div className="ml-auto text-sm text-pu-gray-500">
                  {selectedItems.length} dari {suggestions.length} dipilih
                </div>
              </div>

              {/* Suggestions List */}
              <div className="max-h-60 overflow-y-auto space-y-2">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedItems.includes(suggestion)
                        ? "bg-pu-yellow/10 border-pu-yellow"
                        : "bg-white border-pu-gray-200 hover:bg-pu-gray-50"
                    }`}
                    onClick={() => handleToggleItem(suggestion)}
                  >
                    <Checkbox
                      checked={selectedItems.includes(suggestion)}
                      onChange={() => handleToggleItem(suggestion)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <p className="text-sm text-pu-gray-700">{suggestion}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t">
                <Button
                  onClick={handleConfirm}
                  className="btn-primary flex-1"
                  disabled={selectedItems.length === 0}
                >
                  Tambahkan {selectedItems.length} Saran
                </Button>
                <Button variant="outline" onClick={onClose}>
                  Batal
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
