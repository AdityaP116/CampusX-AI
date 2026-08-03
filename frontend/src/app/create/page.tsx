"use client"

import * as React from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { VerifiedBadge } from "@/shared/components/ui/verified-badge"
import { CloudUpload, CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCreateListing } from "@/features/marketplace/hooks/useListings"
import { useAuthStore } from "@/features/auth/store/authStore"

const STEPS = ["Details", "Pricing", "Review"] as const

const createListingSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(60, "Title is too long"),
  category: z.string().min(1, "Please select a category"),
  condition: z.string().min(1, "Please select a condition"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.coerce.number().min(0, "Price cannot be negative"),
  negotiable: z.boolean().default(false),
  listingType: z.enum(["sell", "rent", "exchange", "free"]),
  meetupLocation: z.string().min(3, "Please provide a meetup location"),
})

type CreateListingValues = z.infer<typeof createListingSchema>

export default function CreateListingPage() {
  const router = useRouter()
  const { user } = useAuthStore()
  const { mutateAsync: createListing } = useCreateListing()
  const [step, setStep] = React.useState(0)
  const [dragging, setDragging] = React.useState(false)
  const [files, setFiles] = React.useState<File[]>([])
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors, isSubmitting }
  } = useForm<CreateListingValues>({
    resolver: zodResolver(createListingSchema),
    defaultValues: {
      title: "",
      category: "",
      condition: "",
      description: "",
      price: 0,
      negotiable: false,
      listingType: "sell",
      meetupLocation: "",
    }
  })

  const formValues = watch()

  const handleNext = async () => {
    let isValid = false
    if (step === 0) {
      isValid = await trigger(["title", "category", "condition", "description"])
    } else if (step === 1) {
      isValid = await trigger(["price", "listingType", "meetupLocation"])
    }

    if (isValid && step < STEPS.length - 1) {
      setStep((s) => s + 1)
    }
  }

  const onSubmit = async (data: CreateListingValues) => {
    if (!user) {
      alert("You must be logged in to create a listing")
      router.push("/login")
      return
    }

    try {
      await createListing({
        sellerId: user.uid,
        data,
        files
      })
      alert("Listing published successfully!")
      router.push("/marketplace")
    } catch (error) {
      console.error(error)
      alert("Failed to publish listing")
    }
  }

  return (
    <div className="bg-surface min-h-screen">
      <main className="pt-12 pb-32 max-w-[800px] mx-auto px-4 md:px-6">
        <header className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 bg-surface-container-low rounded-full">
            <VerifiedBadge className="w-4 h-4" />
            <span className="font-label text-xs text-primary uppercase tracking-wider font-bold">Listing Creation Flow</span>
          </div>
          <h1 className="font-headline text-3xl md:text-4xl font-bold text-on-surface mb-3">What are you listing today?</h1>
          <p className="font-body text-on-surface-variant max-w-[500px] mx-auto">
            Complete three simple steps to get your item in front of thousands of verified students.
          </p>
        </header>

        <div className="relative flex justify-between items-center mb-10 px-6">
          <div className="absolute top-5 left-6 right-6 h-[2px] bg-outline-variant -z-10" />
          <div
            className="absolute top-5 left-6 h-[2px] bg-primary -z-10 transition-all duration-500 ease-in-out"
            style={{ width: `calc((${step} / 2) * (100% - 3rem))` }}
          />

          {STEPS.map((label, i) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300",
                  i < step
                    ? "bg-primary text-on-primary shadow-md"
                    : i === step
                    ? "bg-primary text-on-primary shadow-md ring-4 ring-primary/20"
                    : "bg-surface-container-highest text-on-surface-variant"
                )}
              >
                {i < step ? <CheckCircle2 className="w-5 h-5" /> : i + 1}
              </div>
              <span
                className={cn(
                  "font-label text-xs uppercase tracking-wider font-bold",
                  i <= step ? "text-primary" : "text-on-surface-variant"
                )}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-[0px_1px_2px_rgba(0,0,0,0.05),0px_4px_12px_rgba(0,0,0,0.05)] p-6 md:p-8 border border-outline-variant/30">
          <form onSubmit={handleSubmit(onSubmit)} id="listing-form">
            {step === 0 && (
              <div className="space-y-8">
                <div>
                  <h2 className="font-headline text-xl font-bold text-on-surface border-b border-outline-variant/20 pb-3 mb-6">
                    Basic Details
                  </h2>
                  <div className="space-y-5">
                    <div>
                      <label className="font-label text-xs text-on-surface-variant block mb-1.5 ml-1 uppercase tracking-wider font-bold">Listing Title</label>
                      <Input
                        {...register("title")}
                        placeholder="e.g., MacBook Pro 14-inch M2 (2023)"
                        className="h-12"
                      />
                      {errors.title && <p className="text-xs text-error mt-1 ml-1">{errors.title.message}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="font-label text-xs text-on-surface-variant block mb-1.5 ml-1 uppercase tracking-wider font-bold">Category</label>
                        <select
                          {...register("category")}
                          className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-body appearance-none text-on-surface"
                        >
                          <option value="" disabled>Select category</option>
                          <option value="electronics">Electronics</option>
                          <option value="textbooks">Textbooks</option>
                          <option value="furniture">Furniture</option>
                          <option value="clothing">Clothing</option>
                          <option value="sports">Sports & Fitness</option>
                          <option value="other">Other</option>
                        </select>
                        {errors.category && <p className="text-xs text-error mt-1 ml-1">{errors.category.message}</p>}
                      </div>
                      <div>
                        <label className="font-label text-xs text-on-surface-variant block mb-1.5 ml-1 uppercase tracking-wider font-bold">Condition</label>
                        <select
                          {...register("condition")}
                          className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-body appearance-none text-on-surface"
                        >
                          <option value="" disabled>Select condition</option>
                          <option value="new">New</option>
                          <option value="like-new">Like New</option>
                          <option value="good">Good</option>
                          <option value="fair">Fair</option>
                          <option value="poor">Poor / For Parts</option>
                        </select>
                        {errors.condition && <p className="text-xs text-error mt-1 ml-1">{errors.condition.message}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="font-label text-xs text-on-surface-variant block mb-1.5 ml-1 uppercase tracking-wider font-bold">Description</label>
                      <textarea
                        {...register("description")}
                        placeholder="Describe your item in detail — specs, usage history, included accessories, reason for selling..."
                        rows={5}
                        className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-body resize-none text-on-surface placeholder:text-outline"
                      />
                      {errors.description && <p className="text-xs text-error mt-1 ml-1">{errors.description.message}</p>}
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="font-headline text-xl font-bold text-on-surface border-b border-outline-variant/20 pb-3 mb-6">
                    Photos
                  </h2>
                  <div
                    onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={(e) => { e.preventDefault(); setDragging(false) }}
                    className={cn(
                      "border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center gap-4 text-center cursor-pointer transition-all",
                      dragging
                        ? "border-primary bg-primary/5"
                        : "border-outline-variant hover:border-primary/40 hover:bg-surface-container-low bg-surface-container-low"
                    )}
                  >
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                      <CloudUpload className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="font-headline text-base font-bold text-on-surface">
                        Drag & drop photos here
                      </p>
                      <p className="text-sm text-on-surface-variant font-body mt-1">
                        or <span className="text-primary font-semibold cursor-pointer hover:underline">browse files</span>
                      </p>
                    </div>
                    <p className="font-label text-xs text-outline uppercase tracking-wider">
                      JPG, PNG or WEBP · Up to 8 photos · Max 10MB each
                    </p>
                  </div>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-8">
                <div>
                  <h2 className="font-headline text-xl font-bold text-on-surface border-b border-outline-variant/20 pb-3 mb-6">
                    Pricing & Listing Type
                  </h2>
                  <div className="space-y-5">
                    <div>
                      <label className="font-label text-xs text-on-surface-variant block mb-3 ml-1 uppercase tracking-wider font-bold">Listing Type</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {(["sell", "rent", "exchange", "free"] as const).map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setValue("listingType", type)}
                            className={cn(
                              "py-3 rounded-xl border-2 font-label text-sm uppercase tracking-wider font-bold transition-all",
                              formValues.listingType === type
                                ? "border-primary bg-primary-container/20 text-primary shadow-sm"
                                : "border-outline-variant text-on-surface-variant hover:border-primary/30"
                            )}
                          >
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="font-label text-xs text-on-surface-variant block mb-1.5 ml-1 uppercase tracking-wider font-bold">
                        {formValues.listingType === "rent" ? "Price / Month ($)" : "Your Price ($)"}
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-body font-bold text-lg">$</span>
                        <Input
                          {...register("price")}
                          type="number"
                          placeholder="0.00"
                          className="pl-8 h-14 text-lg font-bold"
                        />
                      </div>
                      {errors.price && <p className="text-xs text-error mt-1 ml-1">{errors.price.message}</p>}
                    </div>

                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        {...register("negotiable")}
                        className="w-5 h-5 rounded text-primary focus:ring-primary border-outline-variant"
                      />
                      <div>
                        <span className="font-body font-medium text-on-surface group-hover:text-primary transition-colors">
                          Price is negotiable
                        </span>
                        <p className="font-body text-xs text-on-surface-variant">Allow buyers to send you offers</p>
                      </div>
                    </label>

                    <div>
                      <label className="font-label text-xs text-on-surface-variant block mb-1.5 ml-1 uppercase tracking-wider font-bold">
                        Preferred Meetup Location
                      </label>
                      <Input
                        {...register("meetupLocation")}
                        placeholder="e.g., Main Library, Student Union, Dorm A lobby..."
                        className="h-12"
                      />
                      {errors.meetupLocation && <p className="text-xs text-error mt-1 ml-1">{errors.meetupLocation.message}</p>}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="font-headline text-xl font-bold text-on-surface border-b border-outline-variant/20 pb-3">
                  Review your Listing
                </h2>

                <div className="bg-surface-container-low rounded-2xl p-6 space-y-4">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 rounded-xl bg-surface-container-highest flex items-center justify-center text-outline font-label text-xs shrink-0">
                      No Photo
                    </div>
                    <div>
                      <h3 className="font-headline text-lg font-bold text-on-surface">{formValues.title || "Untitled Listing"}</h3>
                      <p className="text-on-surface-variant font-body text-sm mt-1 capitalize">{formValues.category || "—"} · {formValues.condition || "—"}</p>
                      <p className="text-primary font-bold text-xl mt-2">${formValues.price || "0"}</p>
                    </div>
                  </div>
                  <p className="text-on-surface-variant font-body text-sm border-t border-outline-variant/30 pt-4">
                    {formValues.description || "No description provided."}
                  </p>
                </div>

                <div className="p-4 bg-primary/5 rounded-xl flex items-start gap-3 border border-primary/10">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-sm font-body text-on-surface-variant">
                    By publishing, your listing will be visible to all verified students at your university. You can edit or remove it at any time from your profile.
                  </p>
                </div>
              </div>
            )}
          </form>
        </div>

        <div className="flex justify-between items-center mt-8">
          <Button
            variant="ghost"
            size="lg"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>

          {step < STEPS.length - 1 ? (
            <Button
              size="lg"
              onClick={handleNext}
              className="gap-2 px-8 shadow-md"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              size="lg"
              type="submit"
              form="listing-form"
              disabled={isSubmitting}
              className="gap-2 px-8 shadow-md"
            >
              {isSubmitting ? "Publishing..." : "Publish Listing"}
            </Button>
          )}
        </div>
      </main>
    </div>
  )
}
