import React, { useState } from "react";
import { Trash2, Plus, BookOpen, LayoutGrid, ChevronRight, Sparkles, X } from "lucide-react";

import {
  useDeleteSectionMutation,
  useAddSectionValueMutation,
  useDeleteSectionValueMutation,
  useAddNewSectionMutation,
} from "@/redux/features/dashboard/dashboardApi";
import { useUserCV } from "@/context/UserCVContext";
import toastShow from "@/utils/toastShow";
import { toast } from "react-toastify";

const AddSection = () => {
  const { userCV, setUserCV } = useUserCV();
  const [formValue, setFormValue] = useState("");
  const [selectedSectionIndex, setSelectedSectionIndex] = useState(null);
  const [newContentInput, setNewContentInput] = useState("");

  const handleInput = (e) => setFormValue(e.target.value);
  const handleContentInput = (e) => setNewContentInput(e.target.value);

  const [addNewSection, { isLoading: addSectionLoading }] = useAddNewSectionMutation();
  const [deleteSection, { isLoading: deleteSectionLoading }] = useDeleteSectionMutation();
  const [addSectionValue, { isLoading: addSectionValueLoading }] = useAddSectionValueMutation();
  const [deleteSectionValue, { isLoading: deleteSectionValueLoading }] = useDeleteSectionValueMutation();

  const submitData = async () => {
    if (!formValue.trim()) return toastShow("Section name required", "error");
    try {
      const data = await addNewSection({
        cvId: userCV._id,
        sectionName: formValue,
      }).unwrap();

      setUserCV(data.updatedCV);
      setFormValue("");
      toastShow(data.message, "success");
    } catch (err) {
      console.error(err);
      toastShow("Error adding section", "error");
    }
  };

  const deleteSectionHandler = async (index) => {
    try {
      const data = await deleteSection({
        cvId: userCV._id,
        sectionIndex: index,
      }).unwrap();

      toastShow(data.message, "success");
      setUserCV(data.updatedCV);
      setSelectedSectionIndex(null);
    } catch (err) {
      console.error("Error deleting section:", err);
      toastShow("Server error", "error");
    }
  };

  const submitSectionValue = async (index) => {
    if (!newContentInput.trim()) return toastShow("Text is empty", "error");
    try {
      const data = await addSectionValue({
        cvId: userCV._id,
        sectionIndex: index,
        newValue: newContentInput,
      }).unwrap();

      setUserCV(data.updatedCV);
      setNewContentInput("");
      toastShow(data.message, "success");
    } catch (err) {
      console.error(err);
      toastShow("Error adding content", "error");
    }
  };

  const deleteSectionValueHandler = async (sectionIndex, valueIndex) => {
    try {
      const data = await deleteSectionValue({
        cvId: userCV._id,
        sectionIndex,
        valueIndex,
      }).unwrap();

      setUserCV(data.updatedCV);
      toastShow(data.message, "success");
    } catch (err) {
      console.error(err);
      toastShow("Error deleting content", "error");
    }
  };

  const selectedSection = selectedSectionIndex !== null ? userCV?.otherSection?.[selectedSectionIndex] : null;

  return (
    <div className="min-h-screen p-3">
      <div className="max-w-4xl mx-auto">

        {/* ── Page Header ── */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#4F1C51] to-[#A55B4B] flex items-center justify-center shadow-md">
              <LayoutGrid size={18} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#210F37] leading-tight">Custom Sections</h2>
              <p className="text-sm text-gray-400">Add extra sections to personalise your CV</p>
            </div>
          </div>
          {/* subtle divider */}
          <div className="mt-4 h-px bg-gradient-to-r from-[#4F1C51]/20 via-[#A55B4B]/10 to-transparent" />
        </div>

        {/* ── Create New Section ── */}
        <div className="mb-8 rounded-2xl border border-gray-200 bg-white shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={15} className="text-[#A55B4B]" />
            <span className="text-sm font-semibold text-gray-700">New Custom Section</span>
          </div>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="e.g. Hobbies, Languages, Certifications…"
              value={formValue}
              onChange={handleInput}
              onKeyDown={(e) => e.key === "Enter" && submitData()}
              className="flex-1 px-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50
                         focus:bg-white focus:border-[#4F1C51] focus:outline-none focus:ring-2 focus:ring-[#4F1C51]/10
                         placeholder:text-gray-300 transition-all duration-200"
            />
            <button
              onClick={submitData}
              disabled={addSectionLoading}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold
                         bg-[#210F37] hover:bg-[#4F1C51] text-white shadow-sm
                         disabled:opacity-50 transition-all duration-200 active:scale-95"
            >
              <Plus size={15} />
              {addSectionLoading ? "Adding…" : "Add"}
            </button>
          </div>
        </div>

        {/* ── Section Cards Grid ── */}
        {userCV?.otherSection?.length > 0 ? (
          <>
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                Your custom sections
              </span>
              <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                {userCV.otherSection.length} total
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {userCV.otherSection.map((section, index) => {
                const isSelected = selectedSectionIndex === index;
                return (
                  <div
                    key={index}
                    onClick={() =>
                      setSelectedSectionIndex(selectedSectionIndex === index ? null : index)
                    }
                    className={`
                      relative group flex items-center gap-4 p-4 rounded-2xl border cursor-pointer
                      transition-all duration-200
                      ${isSelected
                        ? "border-[#A55B4B] bg-gradient-to-r from-[#4F1C51]/5 to-[#A55B4B]/5 shadow-md"
                        : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                      }
                    `}
                  >
                    {/* Icon */}
                    <div className={`
                      flex-shrink-0 h-10 w-10 rounded-xl flex items-center justify-center transition-all duration-200
                      ${isSelected
                        ? "bg-gradient-to-br from-[#4F1C51] to-[#A55B4B] shadow-sm"
                        : "bg-gray-100 group-hover:bg-gray-200"
                      }
                    `}>
                      <BookOpen size={16} className={isSelected ? "text-white" : "text-gray-500"} />
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <div className={`font-semibold text-sm truncate ${isSelected ? "text-[#210F37]" : "text-gray-700"}`}>
                        {section.sectionName}
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5">
                        {section.sectionValues?.length > 0
                          ? `${section.sectionValues.length} item${section.sectionValues.length > 1 ? "s" : ""}`
                          : "No items yet"}
                      </div>
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <ChevronRight
                        size={14}
                        className={`transition-all duration-200 ${isSelected ? "text-[#A55B4B] rotate-90" : "text-gray-300 group-hover:text-gray-400"}`}
                      />
                      <button
                        className="ml-1 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-50
                                   text-gray-300 hover:text-red-500 transition-all duration-150"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteSectionHandler(index);
                        }}
                        title="Delete Section"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          /* Empty state */
          <div className="mb-8 rounded-2xl border border-dashed border-gray-200 bg-gray-50/50 p-12 text-center">
            <div className="mx-auto mb-3 w-fit rounded-2xl bg-gray-100 p-4">
              <LayoutGrid size={24} className="text-gray-400" />
            </div>
            <div className="text-sm font-semibold text-gray-600">No custom sections yet</div>
            <div className="text-xs text-gray-400 mt-1">Type a name above and click Add to create your first one.</div>
          </div>
        )}

        {/* ── Selected Section Editor ── */}
        {selectedSection && (
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            {/* Editor header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-[#4F1C51]/5 to-transparent">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#4F1C51] to-[#A55B4B] flex items-center justify-center">
                  <BookOpen size={14} className="text-white" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#210F37]">{selectedSection.sectionName}</div>
                  <div className="text-xs text-gray-400">Manage items in this section</div>
                </div>
              </div>
              <button
                onClick={() => setSelectedSectionIndex(null)}
                className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                title="Close editor"
              >
                <X size={16} />
              </button>
            </div>

            {/* Add value input */}
            <div className="px-5 py-4 border-b border-gray-100">
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder={`Add item to "${selectedSection.sectionName}"…`}
                  value={newContentInput}
                  onChange={handleContentInput}
                  onKeyDown={(e) => e.key === "Enter" && submitSectionValue(selectedSectionIndex)}
                  className="flex-1 px-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50
                             focus:bg-white focus:border-[#4F1C51] focus:outline-none focus:ring-2 focus:ring-[#4F1C51]/10
                             placeholder:text-gray-300 transition-all duration-200"
                />
                <button
                  onClick={() => submitSectionValue(selectedSectionIndex)}
                  disabled={addSectionValueLoading}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold
                             bg-[#A55B4B] hover:bg-[#4F1C51] text-white shadow-sm
                             disabled:opacity-50 transition-all duration-200 active:scale-95"
                >
                  <Plus size={15} />
                  {addSectionValueLoading ? "Adding…" : "Add"}
                </button>
              </div>
            </div>

            {/* Values list */}
            <div className="px-5 py-4">
              {selectedSection.sectionValues?.length > 0 ? (
                <ul className="space-y-2">
                  {selectedSection.sectionValues.map((val, idx) => (
                    <li
                      key={idx}
                      className="group flex items-center justify-between px-4 py-2.5 rounded-xl
                                 bg-gray-50 hover:bg-gray-100 border border-transparent hover:border-gray-200
                                 transition-all duration-150"
                    >
                      <div className="flex items-center gap-3">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#A55B4B] flex-shrink-0" />
                        <span className="text-sm text-gray-700">{val}</span>
                      </div>
                      <button
                        onClick={() => deleteSectionValueHandler(selectedSectionIndex, idx)}
                        disabled={deleteSectionValueLoading}
                        className="opacity-0 group-hover:opacity-100 p-1 rounded-lg
                                   text-gray-300 hover:text-red-500 hover:bg-red-50
                                   transition-all duration-150 disabled:opacity-30"
                        title="Remove item"
                      >
                        <i className="fa-solid fa-square-xmark text-sm"></i>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="py-6 text-center">
                  <div className="text-xs text-gray-400">
                    No items yet — add your first one above.
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AddSection;