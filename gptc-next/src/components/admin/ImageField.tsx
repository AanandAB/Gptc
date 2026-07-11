"use client";

import { useState, useRef, useCallback } from "react";
import { Link, Upload, X } from "lucide-react";

type Props = {
  name: string;
  label?: string;
  defaultValue?: string;
  hint?: string;
};

const MAX_DIMENSION_PX = 1200;
const JPEG_QUALITY = 0.8;

export default function ImageField({
  name,
  label,
  defaultValue = "",
  hint,
}: Props) {
  const [tab, setTab] = useState<"url" | "upload">("url");
  const [value, setValue] = useState(defaultValue);
  const [preview, setPreview] = useState<string | null>(defaultValue || null);
  const [compressing, setCompressing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUrlChange = (url: string) => {
    setValue(url);
    setPreview(url || null);
  };

  const handleUrlClear = () => {
    setValue("");
    setPreview(null);
  };

  const compressImage = useCallback(
    (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const img = new window.Image();
          img.onload = () => {
            let { width, height } = img;

            // Scale down if exceeds max dimension
            if (width > MAX_DIMENSION_PX || height > MAX_DIMENSION_PX) {
              if (width > height) {
                height = Math.round((height * MAX_DIMENSION_PX) / width);
                width = MAX_DIMENSION_PX;
              } else {
                width = Math.round((width * MAX_DIMENSION_PX) / height);
                height = MAX_DIMENSION_PX;
              }
            }

            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d")!;
            ctx.drawImage(img, 0, 0, width, height);

            const dataUrl = canvas.toDataURL("image/jpeg", JPEG_QUALITY);
            resolve(dataUrl);
          };
          img.onerror = () => reject(new Error("Failed to load image"));
          img.src = reader.result as string;
        };
        reader.onerror = () => reject(new Error("Failed to read file"));
        reader.readAsDataURL(file);
      });
    },
    []
  );

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    setCompressing(true);
    try {
      const dataUrl = await compressImage(file);
      setValue(dataUrl);
      setPreview(dataUrl);
    } catch {
      alert("Failed to process image. Please try again.");
    } finally {
      setCompressing(false);
      // Reset file input so the same file can be re-selected
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const tabBase =
    "px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 transition-colors";
  const tabActive = "border-current";
  const tabInactive = "border-transparent";

  return (
    <div>
      {label && (
        <label
          className="block text-sm font-medium mb-1"
          style={{ color: "var(--text-secondary)" }}
        >
          {label}
        </label>
      )}

      {/* Hidden input that stores the actual form value */}
      <input type="hidden" name={name} value={value} />

      {/* Preview */}
      {preview && (
        <div className="relative mb-3 rounded-xl overflow-hidden border" style={{ borderColor: "var(--border-color)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover"
          />
          <button
            type="button"
            onClick={() => {
              setPreview(null);
              setValue("");
            }}
            className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center bg-black/50 text-white hover:bg-black/70 transition-colors"
            title="Remove image"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b" style={{ borderColor: "var(--border-color)" }}>
        <button
          type="button"
          onClick={() => setTab("url")}
          className={`${tabBase} ${tab === "url" ? tabActive : tabInactive} flex items-center gap-1.5`}
          style={{
            color: tab === "url" ? "var(--primary, #047857)" : "var(--text-secondary)",
            borderColor: tab === "url" ? "var(--primary, #047857)" : "transparent",
          }}
        >
          <Link size={14} />
          URL
        </button>
        <button
          type="button"
          onClick={() => setTab("upload")}
          className={`${tabBase} ${tab === "upload" ? tabActive : tabInactive} flex items-center gap-1.5`}
          style={{
            color: tab === "upload" ? "var(--primary, #047857)" : "var(--text-secondary)",
            borderColor: tab === "upload" ? "var(--primary, #047857)" : "transparent",
          }}
        >
          <Upload size={14} />
          Upload
        </button>
      </div>

      {/* Tab content */}
      <div
        className="p-4 rounded-b-xl border border-t-0"
        style={{
          borderColor: "var(--border-color)",
          background: "var(--bg-secondary)",
        }}
      >
        {tab === "url" ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={value}
              onChange={(e) => handleUrlChange(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="flex-1 rounded-xl border px-3 py-2 text-sm bg-transparent"
              style={{
                borderColor: "var(--border-color)",
                color: "var(--text-primary)",
              }}
            />
            {value && (
              <button
                type="button"
                onClick={handleUrlClear}
                className="rounded-xl px-3 py-2 text-sm border"
                style={{
                  borderColor: "var(--border-color)",
                  color: "var(--text-secondary)",
                }}
              >
                <X size={14} />
              </button>
            )}
          </div>
        ) : (
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:text-white file:cursor-pointer"
              style={{
                color: "var(--text-secondary)",
              }}
            />
            {compressing && (
              <p className="mt-2 text-xs" style={{ color: "var(--text-secondary)" }}>
                Compressing image&hellip;
              </p>
            )}
          </div>
        )}
      </div>

      {hint && (
        <p
          className="mt-1 text-xs"
          style={{ color: "var(--text-secondary)" }}
        >
          {hint}
        </p>
      )}
    </div>
  );
}
