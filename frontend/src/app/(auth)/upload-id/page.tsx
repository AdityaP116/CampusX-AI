"use client";

// =========================================================
// Upload Student ID Page
// Pixel-perfect conversion of design/1/upload_student_id
// =========================================================

import { useState, useRef, DragEvent, ChangeEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ROUTES } from "@/constants/routes";
import { fadeInUp } from "@/lib/motion";

export default function UploadIdPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isConsented, setIsConsented] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFile = (selectedFile: File | null) => {
    if (!selectedFile) return;

    setFile(selectedFile);

    if (selectedFile.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      // PDF fallback image
      setPreview("https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&q=80&w=400");
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async () => {
    if (!file || !isConsented) return;
    
    setIsSubmitting(true);
    // Mock upload delay
    setTimeout(() => {
      setIsSubmitting(false);
      router.push(ROUTES.AUTH_SUCCESS);
    }, 1500);
  };

  const canSubmit = !!file && isConsented && !isSubmitting;

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col">
      {/* TopNavBar - Simplified */}
      <header className="fixed top-0 w-full z-50 glass-nav border-b border-outline-variant/30 h-16">
        <div className="flex justify-between items-center w-full px-gutter max-w-container-max mx-auto h-full">
          <div className="flex items-center gap-2">
            <span className="font-bold text-title text-primary">CampusX</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-surface-container rounded-full border border-outline-variant/20">
              <span className="material-symbols-outlined text-primary text-[18px]">verified_user</span>
              <span className="font-medium text-small text-on-surface-variant">Secure Verification</span>
            </div>
            <button className="text-on-surface-variant hover:text-primary transition-colors duration-200">
              <span className="material-symbols-outlined">help</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow pt-24 pb-xxl px-margin-mobile md:px-gutter max-w-4xl mx-auto w-full">
        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-small">1</div>
            <div className="w-12 h-0.5 bg-primary-container" />
            <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-small">2</div>
            <div className="w-12 h-0.5 bg-outline-variant" />
            <div className="w-8 h-8 rounded-full border-2 border-outline-variant text-outline flex items-center justify-center font-bold text-small">3</div>
          </div>
        </div>

        {/* Header Section */}
        <motion.div 
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="text-center mb-xl"
        >
          <h1 className="font-bold text-h1-mobile md:text-h1 text-on-background mb-4">One last step.</h1>
          <p className="text-on-surface-variant text-body max-w-lg mx-auto">
            Upload your student ID to verify your campus status. This helps us maintain a safe and trusted community for students.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-lg items-start">
          {/* Instructions Panel */}
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-md"
          >
            <div className="bg-surface-container-low p-lg rounded-xl border border-outline-variant/30">
              <h3 className="font-semibold text-title text-on-surface mb-md">What we need to see</h3>
              <ul className="space-y-4">
                {[
                  { title: "Full Name", subtitle: "Must match your account name" },
                  { title: "Photo", subtitle: "Clear headshot visible on card" },
                  { title: "Expiration Date", subtitle: "Must be currently valid" },
                  { title: "Campus Name", subtitle: "Your university or college logo" }
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                      check_circle
                    </span>
                    <div>
                      <p className="font-medium text-small text-on-surface">{item.title}</p>
                      <p className="text-caption text-on-surface-variant">{item.subtitle}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-tertiary-fixed p-md rounded-xl flex gap-3 items-start">
              <span className="material-symbols-outlined text-tertiary-container">info</span>
              <p className="text-caption text-on-tertiary-fixed-variant leading-relaxed">
                Your ID data is encrypted and used only for verification. We never share your sensitive documents with other users.
              </p>
            </div>
          </motion.div>

          {/* Upload Area */}
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => !file && fileInputRef.current?.click()}
              className={`rounded-xl bg-surface-container-lowest p-xl min-h-[340px] flex flex-col items-center justify-center text-center transition-all duration-300 group ${!file ? 'cursor-pointer' : ''} ${isDragging ? 'bg-primary/5 border-primary' : ''}`}
              style={{
                backgroundImage: !file && !isDragging 
                  ? `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='18' ry='18' stroke='%23C7C4D8' stroke-width='2' stroke-dasharray='8%2c 12' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")` 
                  : (isDragging ? `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='18' ry='18' stroke='%234F46E5' stroke-width='3' stroke-dasharray='10%2c 10' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")` : 'none'),
                border: file ? '1px solid var(--color-outline-variant)' : 'none'
              }}
            >
              <input 
                ref={fileInputRef}
                type="file" 
                accept="image/*,.pdf" 
                className="hidden" 
                onChange={handleChange}
              />
              
              {!file ? (
                <div className="flex flex-col items-center pointer-events-none">
                  <div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center mb-md group-hover:scale-110 transition-transform duration-300">
                    <span className="material-symbols-outlined text-primary text-h2">upload_file</span>
                  </div>
                  <h4 className="font-semibold text-title text-on-surface mb-2">Drag and drop your ID</h4>
                  <p className="text-on-surface-variant text-small mb-lg">Supports JPG, PNG, or PDF (Max 10MB)</p>
                  <button className="bg-primary text-on-primary px-lg py-3 rounded-full font-medium text-small hover:bg-primary-container transition-all active:scale-95 pointer-events-auto">
                    Browse Files
                  </button>
                </div>
              ) : (
                <div className="w-full h-full flex flex-col items-center">
                  <div className="relative w-full max-w-sm aspect-[1.6/1] bg-surface-container rounded-xl overflow-hidden border border-outline-variant shadow-sm mb-md">
                    {preview && (
                      <img 
                        src={preview} 
                        alt="Document preview" 
                        className="w-full h-full object-cover" 
                      />
                    )}
                    <button 
                      onClick={removeFile}
                      className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70 transition-colors"
                      aria-label="Remove file"
                    >
                      <span className="material-symbols-outlined text-title">close</span>
                    </button>
                  </div>
                  <p className="font-medium text-small text-on-surface truncate max-w-xs mb-1">
                    {file.name}
                  </p>
                  <p className="text-caption text-on-surface-variant mb-md">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              )}
            </div>

            <div className="mt-lg flex flex-col gap-md">
              <div className="flex items-start gap-3 p-3">
                <div className="mt-1">
                  <input 
                    id="consent" 
                    type="checkbox" 
                    checked={isConsented}
                    onChange={(e) => setIsConsented(e.target.checked)}
                    className="rounded border-outline-variant text-primary focus:ring-primary w-4 h-4"
                  />
                </div>
                <label htmlFor="consent" className="text-caption text-on-surface-variant cursor-pointer select-none">
                  I confirm that the uploaded document is my official student identification and that the information provided is accurate and truthful.
                </label>
              </div>
              
              <button 
                onClick={handleSubmit}
                disabled={!canSubmit}
                className={`w-full py-4 rounded-full font-semibold text-title transition-all flex items-center justify-center gap-2 ${
                  canSubmit 
                    ? 'bg-primary text-on-primary hover:bg-primary-container active:scale-[0.98]' 
                    : 'bg-primary/40 text-on-primary cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-on-primary border-t-transparent rounded-full animate-spin" />
                    Uploading...
                  </>
                ) : (
                  "Submit for Review"
                )}
              </button>
              
              <Link 
                href={ROUTES.DASHBOARD}
                className="w-full text-center text-on-surface-variant hover:text-primary py-2 font-medium text-small transition-colors"
              >
                Skip for now
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer Security Badges */}
      <footer className="mt-auto py-lg border-t border-outline-variant/20 bg-surface-container-lowest">
        <div className="max-w-container-max mx-auto px-gutter flex flex-wrap justify-center gap-xl md:gap-xxl">
          <div className="flex items-center gap-2 opacity-60">
            <span className="material-symbols-outlined text-title">lock</span>
            <span className="text-caption font-medium uppercase tracking-wider">End-to-end Encrypted</span>
          </div>
          <div className="flex items-center gap-2 opacity-60">
            <span className="material-symbols-outlined text-title">shield</span>
            <span className="text-caption font-medium uppercase tracking-wider">Secure Storage</span>
          </div>
          <div className="flex items-center gap-2 opacity-60">
            <span className="material-symbols-outlined text-title">gavel</span>
            <span className="text-caption font-medium uppercase tracking-wider">GDPR Compliant</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
