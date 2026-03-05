"use client"

import { useEffect, useState } from "react"
import {
  Store, PlusCircle, Trash2, Upload, Star, Phone,
  Clock3, UtensilsCrossed, ChevronRight, AlertCircle,
} from "lucide-react"
import { toast, Toaster } from "sonner"

const API = process.env.NEXT_PUBLIC_API_URL

type Shop = {
  _id: string
  name: string
  cuisine: string
  shortDescription?: string
  longDescription?: string
  openTime?: string
  closeTime?: string
  rating?: number
  image?: string
  phone?: string
}

export default function AdminShops() {
  const [shops, setShops] = useState<Shop[]>([])
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [formOpen, setFormOpen] = useState(true)

  const [name, setName] = useState("")
  const [cuisine, setCuisine] = useState("")
  const [shortDescription, setShortDescription] = useState("")
  const [longDescription, setLongDescription] = useState("")
  const [openTime, setOpenTime] = useState("")
  const [closeTime, setCloseTime] = useState("")
  const [rating, setRating] = useState("4.5")
  const [phone, setPhone] = useState("")
  const [image, setImage] = useState<File | null>(null)

  const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null

  const fetchShops = async () => {
    try {
      const res = await fetch(`${API}/api/shops`)
      const data = await res.json()
      setShops(data)
    } catch {
      toast.error("Failed to load shops")
    } finally {
      setLoading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null
    setImage(f)
    setPreview(f ? URL.createObjectURL(f) : null)
  }

  const resetForm = () => {
    setName(""); setCuisine(""); setShortDescription(""); setLongDescription("")
    setOpenTime(""); setCloseTime(""); setRating("4.5"); setPhone("")
    setImage(null); setPreview(null)
  }

  const addShop = async () => {
    if (!name || !cuisine || !phone) {
      toast.warning("Name, Cuisine and WhatsApp number are required")
      return
    }
    try {
      setAdding(true)
      const formData = new FormData()
      formData.append("name", name)
      formData.append("cuisine", cuisine)
      formData.append("shortDescription", shortDescription)
      formData.append("longDescription", longDescription)
      formData.append("openTime", openTime)
      formData.append("closeTime", closeTime)
      formData.append("rating", rating)
      formData.append("phone", phone)
      if (image) formData.append("image", image)

      const res = await fetch(`${API}/api/shops`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      })
      if (!res.ok) throw new Error("Failed")
      const newShop = await res.json()
      setShops((prev) => [newShop, ...prev])
      toast.success(`"${name}" added successfully`)
      resetForm()
    } catch {
      toast.error("Failed to add shop")
    } finally {
      setAdding(false)
    }
  }

  const deleteShop = async (id: string, shopName: string) => {
    if (!confirm(`Delete "${shopName}"?`)) return
    try {
      setDeletingId(id)
      await fetch(`${API}/api/shops/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
      setShops((prev) => prev.filter((s) => s._id !== id))
      toast.success(`"${shopName}" deleted`)
    } catch {
      toast.error("Failed to delete shop")
    } finally {
      setDeletingId(null)
    }
  }

  useEffect(() => { fetchShops() }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-52 gap-3">
        <div className="w-8 h-8 border-[3px] border-gray-200 border-t-orange-500 rounded-full animate-spin" />
        <p className="text-sm text-gray-400">Loading shops…</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-6xl">
      <Toaster position="top-right" richColors />

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-gray-400 tracking-wide mb-1">Admin Panel &nbsp;/&nbsp; Shops</p>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Manage Shops</h1>
          <p className="text-sm text-gray-500 mt-1">Add, edit or remove food court shops</p>
        </div>
        <div className="flex items-center gap-2 bg-orange-50 text-orange-600 text-xs font-semibold px-4 py-2 rounded-full">
          <Store size={14} />
          {shops.length} Shops
        </div>
      </div>

      {/* Add Shop Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <button
          onClick={() => setFormOpen(!formOpen)}
          className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 rounded-2xl transition"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
              <PlusCircle size={16} className="text-orange-500" strokeWidth={1.8} />
            </div>
            <span className="text-sm font-bold text-gray-900">Add New Shop</span>
          </div>
          <ChevronRight size={16} className={`text-gray-400 transition-transform duration-200 ${formOpen ? "rotate-90" : ""}`} />
        </button>

        {formOpen && (
          <div className="px-6 pb-6 space-y-5 border-t border-gray-100 pt-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Left */}
              <div className="space-y-4">
                <Field label="Shop Name" required>
                  <input type="text" placeholder="e.g. Spice Garden" value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
                </Field>

                <Field label="Cuisine" required>
                  <div className="relative">
                    <UtensilsCrossed size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" strokeWidth={1.8} />
                    <input type="text" placeholder="e.g. North Indian, Chinese" value={cuisine} onChange={(e) => setCuisine(e.target.value)} className={`${inputCls} pl-9`} />
                  </div>
                </Field>

                <Field label="WhatsApp Number" required>
                  <div className="relative">
                    <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" strokeWidth={1.8} />
                    <input type="text" placeholder="919876543210" value={phone} onChange={(e) => setPhone(e.target.value)} className={`${inputCls} pl-9`} />
                  </div>
                </Field>

                <div className="grid grid-cols-2 gap-3">
                  <Field label="Opening Time">
                    <div className="relative">
                      <Clock3 size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" strokeWidth={1.8} />
                      <input type="text" placeholder="11 AM" value={openTime} onChange={(e) => setOpenTime(e.target.value)} className={`${inputCls} pl-8`} />
                    </div>
                  </Field>
                  <Field label="Closing Time">
                    <div className="relative">
                      <Clock3 size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" strokeWidth={1.8} />
                      <input type="text" placeholder="11 PM" value={closeTime} onChange={(e) => setCloseTime(e.target.value)} className={`${inputCls} pl-8`} />
                    </div>
                  </Field>
                </div>

                <Field label="Rating">
                  <div className="relative">
                    <Star size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-400" strokeWidth={1.8} />
                    <input type="number" step="0.1" min="0" max="5" value={rating} onChange={(e) => setRating(e.target.value)} className={`${inputCls} pl-9`} />
                  </div>
                </Field>
              </div>

              {/* Right */}
              <div className="space-y-4">
                <Field label="Short Description">
                  <textarea placeholder="Shown inside image card…" value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} rows={3} className={inputCls} />
                </Field>

                <Field label="Long Description">
                  <textarea placeholder="Shown on shop detail page…" value={longDescription} onChange={(e) => setLongDescription(e.target.value)} rows={3} className={inputCls} />
                </Field>

                <Field label="Shop Image">
                  <label className="flex items-center gap-3 border-2 border-dashed border-gray-200 hover:border-orange-400 bg-gray-50 hover:bg-orange-50/40 rounded-xl px-4 py-3 cursor-pointer transition group">
                    <Upload size={15} className="text-gray-400 group-hover:text-orange-500 transition" strokeWidth={1.8} />
                    <span className="text-sm text-gray-400 group-hover:text-orange-500 transition truncate">
                      {image ? image.name : "Click to choose a file"}
                    </span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                  </label>
                  {preview && (
                    <div className="mt-2 relative w-full aspect-video rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                      <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      <span className="absolute bottom-2 left-3 text-xs text-white/80 font-medium">Preview</span>
                    </div>
                  )}
                </Field>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={addShop}
                disabled={adding}
                className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
              >
                {adding ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Adding…
                  </>
                ) : (
                  <>
                    <PlusCircle size={15} strokeWidth={2} />
                    Add Shop
                  </>
                )}
              </button>
              <button onClick={resetForm} className="text-sm text-gray-400 hover:text-gray-600 transition">
                Clear form
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Shops Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
          <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
            <Store size={16} className="text-orange-500" strokeWidth={1.8} />
          </div>
          <span className="text-sm font-bold text-gray-900">All Shops</span>
        </div>

        {shops.length === 0 ? (
          <div className="py-16 flex flex-col items-center gap-3">
            <AlertCircle size={36} className="text-gray-300" strokeWidth={1.3} />
            <p className="text-sm font-medium text-gray-400">No shops found</p>
            <p className="text-xs text-gray-300">Add your first shop using the form above</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  {["Image", "Shop", "Cuisine", "WhatsApp", "Hours", "Rating", ""].map((h) => (
                    <th key={h} className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {shops.map((shop) => (
                  <tr key={shop._id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-5 py-3">
                      {shop.image ? (
                        <img src={`${API}${shop.image}`} alt="" className="w-16 h-11 object-cover rounded-lg border border-gray-100" />
                      ) : (
                        <div className="w-16 h-11 rounded-lg bg-gray-100 flex items-center justify-center">
                          <Store size={16} className="text-gray-300" />
                        </div>
                      )}
                    </td>
                    <td className="px-5 py-3 font-semibold text-gray-800">{shop.name}</td>
                    <td className="px-5 py-3">
                      <span className="inline-flex items-center gap-1 bg-orange-50 text-orange-600 text-xs font-medium px-2.5 py-1 rounded-full">
                        <UtensilsCrossed size={10} strokeWidth={2} />
                        {shop.cuisine}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span className="inline-flex items-center gap-1.5 text-green-600 text-xs font-medium">
                        <Phone size={11} strokeWidth={2} />
                        {shop.phone}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      {shop.openTime && shop.closeTime ? (
                        <span className="inline-flex items-center gap-1.5 text-gray-500 text-xs">
                          <Clock3 size={11} strokeWidth={1.8} />
                          {shop.openTime} – {shop.closeTime}
                        </span>
                      ) : <span className="text-gray-300 text-xs">—</span>}
                    </td>
                    <td className="px-5 py-3">
                      <span className="inline-flex items-center gap-1 text-amber-500 font-semibold text-xs">
                        <Star size={12} className="fill-amber-400 text-amber-400" strokeWidth={1.5} />
                        {shop.rating}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <button
                        onClick={() => deleteShop(shop._id, shop.name)}
                        disabled={deletingId === shop._id}
                        className="opacity-0 group-hover:opacity-100 flex items-center gap-1.5 text-xs font-medium text-red-400 hover:text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-all"
                      >
                        {deletingId === shop._id
                          ? <div className="w-3 h-3 border-2 border-red-300 border-t-red-500 rounded-full animate-spin" />
                          : <Trash2 size={13} strokeWidth={2} />
                        }
                        {deletingId === shop._id ? "Deleting…" : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  )
}

const inputCls =
  "w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition resize-none"