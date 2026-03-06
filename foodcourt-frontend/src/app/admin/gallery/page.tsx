"use client"

import { useEffect, useState } from "react"
import { Upload, Trash2, ImagePlus, Star, Images } from "lucide-react"
import { toast, Toaster } from "sonner"


type GalleryItem = {
  _id: string
  image: string
  title?: string
  featured?: boolean
}

export default function AdminGallery() {
  const [images, setImages] = useState<GalleryItem[]>([])
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [title, setTitle] = useState("")
  const [loading, setLoading] = useState(false)
  const [featured, setFeatured] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const fetchGallery = async () => {
    try {
      const res = await fetch(`${API}/api/gallery`)
      const data = await res.json()
      setImages(data)
    } catch {
      toast.error("Failed to load gallery")
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null
    setFile(selected)
    setPreview(selected ? URL.createObjectURL(selected) : null)
  }

  const uploadImage = async () => {
    if (!file) {
      toast.warning("Please select an image first")
      return
    }
    const token = localStorage.getItem("adminToken")
    if (!token) {
      window.location.href = "/admin/login"
      return
    }

    const formData = new FormData()
    formData.append("image", file)
    formData.append("title", title)
    formData.append("featured", featured.toString())

    try {
      setLoading(true)
      const res = await fetch(`${API}/api/gallery`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      })
      if (!res.ok) throw new Error("Upload failed")
      toast.success("Image uploaded successfully")
      setFile(null)
      setPreview(null)
      setTitle("")
      setFeatured(false)
      fetchGallery()
    } catch {
      toast.error("Failed to upload image")
    } finally {
      setLoading(false)
    }
  }

  const deleteImage = async (id: string) => {
    if (!confirm("Delete this image?")) return
    const token = localStorage.getItem("adminToken")
    try {
      setDeletingId(id)
      const res = await fetch(`${API}/api/gallery/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error("Delete failed")
      setImages((prev) => prev.filter((img) => img._id !== id))
      toast.success("Image deleted")
    } catch {
      toast.error("Failed to delete image")
    } finally {
      setDeletingId(null)
    }
  }

  useEffect(() => { fetchGallery() }, [])

  return (
    <div className="space-y-6 max-w-6xl">
      <Toaster position="top-right" richColors />

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-gray-400 tracking-wide mb-1">Admin Panel &nbsp;/&nbsp; Gallery</p>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Gallery</h1>
          <p className="text-sm text-gray-500 mt-1">Upload and manage food court images</p>
        </div>
        <div className="flex items-center gap-2 bg-violet-50 text-violet-600 text-xs font-semibold px-4 py-2 rounded-full">
          <Images size={14} />
          {images.length} Images
        </div>
      </div>

      {/* Upload Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center">
            <ImagePlus size={16} className="text-violet-500" strokeWidth={1.8} />
          </div>
          <h3 className="text-sm font-bold text-gray-900">Upload New Image</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: inputs */}
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Caption / Title</label>
              <input
                type="text"
                placeholder="e.g. Friday Special"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Image File</label>
              <label className="flex items-center gap-3 border-2 border-dashed border-gray-200 hover:border-violet-400 bg-gray-50 hover:bg-violet-50/40 rounded-xl px-4 py-3 cursor-pointer transition group">
                <Upload size={16} className="text-gray-400 group-hover:text-violet-500 transition" strokeWidth={1.8} />
                <span className="text-sm text-gray-400 group-hover:text-violet-500 transition">
                  {file ? file.name : "Click to choose a file"}
                </span>
                <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
              </label>
            </div>

            {/* Featured toggle */}
            <label className="flex items-center gap-3 cursor-pointer w-fit">
              <div
                onClick={() => setFeatured(!featured)}
                className={`w-10 h-5 rounded-full transition-colors duration-200 flex items-center px-0.5 ${featured ? "bg-violet-500" : "bg-gray-200"}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${featured ? "translate-x-5" : "translate-x-0"}`} />
              </div>
              <div className="flex items-center gap-1.5">
                <Star size={14} className={featured ? "text-amber-400" : "text-gray-400"} strokeWidth={1.8} />
                <span className="text-sm font-medium text-gray-600">Featured Image</span>
              </div>
            </label>

            <button
              onClick={uploadImage}
              disabled={loading || !file}
              className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Uploading…
                </>
              ) : (
                <>
                  <Upload size={15} strokeWidth={2} />
                  Upload Image
                </>
              )}
            </button>
          </div>

          {/* Right: preview */}
          <div className="flex items-center justify-center">
            {preview ? (
              <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <span className="absolute bottom-2 left-3 text-xs text-white/80 font-medium">Preview</span>
              </div>
            ) : (
              <div className="w-full aspect-video rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center gap-2">
                <Images size={28} className="text-gray-300" strokeWidth={1.5} />
                <p className="text-xs text-gray-400">Image preview will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      {images.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-gray-200 py-16 flex flex-col items-center gap-3">
          <Images size={36} className="text-gray-300" strokeWidth={1.3} />
          <p className="text-sm font-medium text-gray-400">No images uploaded yet</p>
          <p className="text-xs text-gray-300">Upload your first image above</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img) => (
            <div
              key={img._id}
              className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              <div className="relative aspect-video overflow-hidden bg-gray-100">
                <img
                  src={`${API}${img.image}`}
                  alt={img.title || ""}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
                {img.featured && (
                  <span className="absolute top-2 left-2 flex items-center gap-1 bg-amber-400 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    <Star size={9} strokeWidth={2.5} />
                    Featured
                  </span>
                )}
                <button
                  onClick={() => deleteImage(img._id)}
                  disabled={deletingId === img._id}
                  className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-white/90 hover:bg-red-500 text-gray-600 hover:text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-sm"
                >
                  {deletingId === img._id
                    ? <div className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                    : <Trash2 size={13} strokeWidth={2} />
                  }
                </button>
              </div>
              {img.title && (
                <div className="px-3 py-2">
                  <p className="text-xs font-medium text-gray-600 truncate">{img.title}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}