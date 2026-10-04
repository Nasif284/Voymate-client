"use client"
import React, { useState } from 'react'
import ModalLayout from '../../../../components/Modal';
import CreateTrip from './CreateTrip';
const AddIcon = () => (
  <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
  </svg>
);
const AddTripButton = () => {
    const [modalOpen, setModalOpen] = useState(false);
    return (
      <>
        <button onClick={() => setModalOpen(true)} className="bg-[#0f6e56] text-white px-3.5 py-2 sm:px-5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-sm shrink-0">
          <span>Create new trip</span>
          <AddIcon />
        </button>
        {modalOpen && (
          <ModalLayout isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Create Trip">
            <CreateTrip onClose={() => setModalOpen(false)} />
          </ModalLayout>
        )}
      </>
    );
}

export default AddTripButton